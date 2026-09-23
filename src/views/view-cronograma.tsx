import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
    Check, ChevronDown, ChevronUp, Filter, Map as MapIcon, 
    Info, X, Zap, Search, Plus, Link as LinkIcon, BrainCircuit, Sparkles, Target, 
    BookOpen, Layers, CheckSquare, Square, Stethoscope, Baby, ShieldCheck, Eye, FileText,
    CheckCircle2, Clock, ChevronsDown, ChevronsUp, GraduationCap, Calendar, ListFilter, FolderCheck
} from 'lucide-react';
import { UserConfig, ScheduleProgress, AreaType, Topic, ImportanceType } from '../types';
import { getAreaTheme } from '../utils';
import { MEDCOF_SCHEDULE } from '../services/medcofSchedule';
import { ESTRATEGIA_SCHEDULE } from '../services/estrategiaSchedule';
import { MEDREVIEW_SCHEDULE } from '../services/medreviewSchedule';
import { FAFIPA_SCHEDULE } from '../services/fafipaSchedule';
import { calculateEnamedStats, getAILessonSummary } from '../utils/enamedUtils';
import { FafipaQuestionModal } from '../modals/FafipaQuestionModal';
import { FafipaTopicAnalysisModal } from '../modals/FafipaTopicAnalysisModal';
import { FafipaTemasModal } from '../modals/FafipaTemasModal';
import { toast } from 'sonner';

// --- Helpers ---
const formatProfessorName = (name: string | undefined) => {
    if (!name) return "";
    const parts = name.split(' ').filter(Boolean);
    if (parts.length <= 1) return name;
    return `${parts[0]} ${parts[1][0]}.`;
};

const getPriorityWeight = (priority: string | undefined): number => {
    const p = (priority || '').toLowerCase();
    if (p.includes('azul')) return 5;
    if (p.includes('verde')) return 4;
    if (p.includes('amarelo')) return 3;
    if (p.includes('vermelho')) return 2;
    if (p.includes('roxo')) return 1;
    return 0;
};

const getPriorityColor = (priority: string | undefined) => {
    const p = (priority || '').toLowerCase();
    if (p.includes('azul')) return { dot: 'bg-blue-500', text: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Ver primeiro' };
    if (p.includes('verde')) return { dot: 'bg-emerald-500', text: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Alta prioridade' };
    if (p.includes('amarelo')) return { dot: 'bg-amber-500', text: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Média prioridade' };
    if (p.includes('vermelho')) return { dot: 'bg-red-500', text: 'text-red-500', bg: 'bg-red-500/10', label: 'Baixa prioridade' };
    if (p.includes('roxo')) return { dot: 'bg-purple-500', text: 'text-purple-500', bg: 'bg-purple-500/10', label: 'Especial' };
    return { dot: 'bg-slate-300', text: 'text-slate-400', bg: 'bg-slate-100 dark:bg-slate-200/5', label: 'Geral' };
};

const mapArea = (area: string): AreaType => {
    const a = area.toLowerCase();
    if (a.includes("técnico") || a.includes("cirurgia") || a.includes("pediatria") || a.includes("g.o.") || a.includes("medicina") || a.includes("informática") || a.includes("saúde") || a.includes("clínica") || a.includes("oftalmo") || a.includes("criança") || a.includes("mulher")) return 'tecnico';
    if (a.includes("exatas") || a.includes("matemática") || a.includes("rlm")) return 'exatas';
    if (a.includes("humanas") || a.includes("preventiva") || a.includes("legislação") || a.includes("administração") || a.includes("gerais") || a.includes("municipal") || a.includes("edital") || a.includes("vigilância")) return 'humanas';
    if (a.includes("idiomas") || a.includes("português") || a.includes("portuguesa") || a.includes("língua")) return 'idiomas';
    return 'geral';
};

const HeartIcon = ({ size, className }: { size: number, className: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
);

const getBlockIcon = (blockTitle: string) => {
    const lower = blockTitle.toLowerCase();
    if (lower.includes('portugu')) return <BookOpen size={20} className="text-blue-500" />;
    if (lower.includes('matem') || lower.includes('racioc')) return <BrainCircuit size={20} className="text-purple-500" />;
    if (lower.includes('criança') || lower.includes('pediat')) return <Baby size={20} className="text-pink-500" />;
    if (lower.includes('mulher') || lower.includes('gineco')) return <HeartIcon size={20} className="text-rose-500" />;
    if (lower.includes('oftalmo') || lower.includes('orl')) return <Eye size={20} className="text-cyan-500" />;
    if (lower.includes('vigil') || lower.includes('prote')) return <ShieldCheck size={20} className="text-emerald-500" />;
    if (lower.includes('legisla') || lower.includes('edital')) return <FileText size={20} className="text-amber-500" />;
    if (lower.includes('medicina') || lower.includes('clínica')) return <Stethoscope size={20} className="text-indigo-500" />;
    return <Layers size={20} className="text-slate-500" />;
};

// --- Components ---

interface LessonItemProps {
    item: any;
    isChecked: boolean;
    isSelectedForAggregate: boolean;
    onToggleCheck: (id: string) => void;
    onToggleAggregateSelect: (id: string) => void;
    onCreateIndividualTopic: (item: any) => void;
    onPracticeWithAI: (topicTitle: string, subtopics: string[]) => void;
    onAnalyzeWithAI: (item: any) => void;
    isExistingIndividualTopic: boolean;
}

const LessonItem: React.FC<LessonItemProps> = React.memo(({ 
    item, 
    isChecked, 
    isSelectedForAggregate,
    onToggleCheck,
    onToggleAggregateSelect,
    onCreateIndividualTopic,
    onPracticeWithAI,
    onAnalyzeWithAI,
    isExistingIndividualTopic
}) => {
    const pColor = getPriorityColor(item.importancia);
    
    return (
        <div 
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all group ${
                isSelectedForAggregate 
                    ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-400 dark:border-blue-600 ring-1 ring-blue-400/30 shadow-xs' 
                    : isChecked 
                        ? 'bg-slate-50/70 dark:bg-black/20 border-slate-200/50 dark:border-white/5 opacity-75' 
                        : 'bg-white dark:bg-zinc-900 border-slate-200/70 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xs'
            }`}
        >
            <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                {/* Checkbox de Conclusão da Aula */}
                <button 
                    onClick={(e) => { e.stopPropagation(); onToggleCheck(item.id); }}
                    aria-label={isChecked ? "Marcar como não concluída" : "Marcar como concluída"}
                    title={isChecked ? "Marcar como não concluída" : "Marcar como concluída"}
                    className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all active:scale-95 ${
                        isChecked 
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs' 
                            : 'border-slate-300 dark:border-white/20 hover:border-slate-500 bg-white dark:bg-zinc-800'
                    }`}
                >
                    {isChecked && <Check size={12} strokeWidth={3}/>}
                </button>

                {/* Seleção para Agregar com outras aulas */}
                <button
                    onClick={(e) => { e.stopPropagation(); onToggleAggregateSelect(item.id); }}
                    aria-label={isSelectedForAggregate ? "Desmarcar da agregação" : "Selecionar para criar matéria agregada"}
                    title={isSelectedForAggregate ? "Desmarcar da agregação" : "Selecionar para matéria agrupada"}
                    className="mt-0.5 p-0.5 rounded-sm text-slate-400 hover:text-blue-600 transition-colors shrink-0 active:scale-95"
                >
                    {isSelectedForAggregate ? (
                        <CheckSquare size={16} className="text-blue-600 dark:text-blue-400" />
                    ) : (
                        <Square size={16} className="text-slate-300 dark:text-zinc-600 group-hover:text-slate-400" />
                    )}
                </button>

                {/* Conteúdo da Aula */}
                <div className="flex-1 min-w-0">
                    <div className={`text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug break-words ${isChecked ? 'line-through text-slate-400 dark:text-zinc-500' : ''}`}>
                        {item.aula}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{item.disciplina}</span>
                        {item.professor && (
                            <>
                                <span className="text-[10px] text-slate-300 dark:text-zinc-700">•</span>
                                <span className="text-[10px] text-slate-400 dark:text-zinc-400">{formatProfessorName(item.professor)}</span>
                            </>
                        )}
                        {item.importancia && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-zinc-800/80 px-1.5 py-0.5 rounded-md">
                                <span className={`w-1.5 h-1.5 rounded-full ${pColor.dot}`}></span>
                                {item.importancia}
                            </span>
                        )}
                        {item.semana !== undefined && (
                            <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${
                                item.semana === 0 
                                    ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200/50 dark:border-sky-800/40' 
                                    : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200/50 dark:border-indigo-800/40'
                            }`}>
                                <Calendar size={10} />
                                {item.semana === 0 ? 'Contínuo' : `Semana ${item.semana}`}
                            </span>
                        )}
                        {item.grupo && (
                            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium hidden sm:inline" title={item.conteudo}>
                                • {item.grupo}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Ações Específicas da Aula (Ícones Limpos com Tooltip) */}
            <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/5 w-full sm:w-auto justify-end">
                {/* Botão Treinar Questões com IA */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onPracticeWithAI(item.aula, [item.disciplina]);
                    }}
                    title="Simular questões de prova com IA"
                    aria-label="Questões IA"
                    className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/30 flex items-center justify-center transition-all active:scale-95 shadow-2xs"
                >
                    <BrainCircuit size={13} />
                </button>

                {/* Botão Raio-X com IA */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAnalyzeWithAI(item);
                    }}
                    title="Raio-X e incidência na banca"
                    aria-label="Raio-X da Banca"
                    className="w-7 h-7 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/50 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/30 flex items-center justify-center transition-all active:scale-95 shadow-2xs"
                >
                    <Target size={13} />
                </button>

                {/* Botão Criar Matéria Individual */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onCreateIndividualTopic(item);
                    }}
                    title={isExistingIndividualTopic ? "Matéria já adicionada ao acervo" : "Adicionar às revisões espaçadas"}
                    aria-label={isExistingIndividualTopic ? "No Acervo" : "Adicionar ao acervo"}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all active:scale-95 shadow-2xs ${
                        isExistingIndividualTopic
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10'
                    }`}
                >
                    {isExistingIndividualTopic ? <Check size={13} strokeWidth={2.5} /> : <Plus size={13} strokeWidth={2.5} />}
                </button>
            </div>
        </div>
    );
});

interface AreaGroupProps {
    areaName: string;
    items: any[];
    blockId: string;
    scheduleProgress: ScheduleProgress;
    toggleCheck: (id: string) => void;
    onBulkComplete: (ids: string[]) => void;
    onCreateTopic: (title: string, area: AreaType, lessons: string[], priority: ImportanceType, baseQuestions?: number, blockId?: string, tags?: string[]) => void;
    existingTopics: Topic[];
    onUpdateTopic?: (topic: Topic) => void;
    onEditTopic?: (topic: Topic) => void;
    onPracticeWithAI: (topicTitle: string, subtopics: string[]) => void;
    onAnalyzeWithAI: (topicName: string, areaName: string, subtopics: string[], mappedArea: AreaType) => void;
}

const AreaGroup: React.FC<AreaGroupProps> = ({ 
    areaName, 
    items, 
    blockId, 
    scheduleProgress, 
    toggleCheck, 
    onBulkComplete,
    onCreateTopic, 
    existingTopics,
    onUpdateTopic,
    onEditTopic,
    onPracticeWithAI,
    onAnalyzeWithAI
}) => {
    const mappedArea = mapArea(areaName);
    const theme = getAreaTheme(mappedArea);
    
    const [selectedAggregateIds, setSelectedAggregateIds] = useState<Set<string>>(new Set());

    const completedCount = items.filter(i => scheduleProgress[i.id]).length;
    const totalCount = items.length;
    const progress = Math.round((completedCount / totalCount) * 100);
    
    // Título da matéria da área completa
    const areaTopicTitle = isNaN(Number(blockId)) ? areaName : `Bloco ${blockId} - ${areaName}`;
    const existingAreaTopic = existingTopics.find(t => t.title === areaTopicTitle && !t.deleted);
    const topicStatus = existingAreaTopic ? 'created' : 'none';

    const toggleAggregateSelect = (id: string) => {
        setSelectedAggregateIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    // Criar matéria individual para 1 aula
    const handleCreateIndividualTopic = (item: any) => {
        const topicTitle = item.aula;
        const existing = existingTopics.find(t => t.title === topicTitle && !t.deleted);
        
        if (existing && onEditTopic) {
            onEditTopic(existing);
            return;
        }

        const priority: ImportanceType = item.importancia === 'Azul' || item.importancia === 'Verde' ? 'high' : 'medium';
        const baseQuestions = item.importancia === 'Azul' ? 20 : 15;
        
        toggleCheck(item.id);
        onCreateTopic(topicTitle, mappedArea, [item.aula], priority, baseQuestions, blockId, [item.disciplina]);
        toast.success(`Matéria criada: "${item.aula}"`);
    };

    // Criar matéria agregada com os itens selecionados
    const handleCreateSelectedAggregate = () => {
        const selectedItems = items.filter(i => selectedAggregateIds.has(i.id));
        if (selectedItems.length === 0) return;

        const aggregateTitle = selectedItems.length === 1 
            ? selectedItems[0].aula 
            : `${areaName}: ${selectedItems.length} temas selecionados`;

        const rawLessonNames = selectedItems.map(i => i.aula);
        const { priority: finalPriority, questions: baseQuestions } = calculateEnamedStats(areaName, rawLessonNames);
        const tags = Array.from(new Set(selectedItems.map(i => i.disciplina).filter(Boolean)));

        onBulkComplete(selectedItems.map(i => i.id));
        onCreateTopic(aggregateTitle, mappedArea, rawLessonNames, finalPriority, baseQuestions, blockId, tags);
        setSelectedAggregateIds(new Set());
        toast.success(`Matéria agregada criada com ${selectedItems.length} aulas!`);
    };

    // Criar matéria para a área completa
    const handleCreateWholeAreaClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        const rawLessonNames = items.map(i => i.aula);
        const { priority: finalPriority, questions: baseQuestions, lessonQuestions } = calculateEnamedStats(areaName, rawLessonNames);
        
        const lessonNames = items.map((i, idx) => {
            const q = lessonQuestions[idx] || 5;
            return `${i.aula} (~${q}q)`;
        });
        
        onBulkComplete(items.map(i => i.id));
        const tags = Array.from(new Set(items.map(i => i.disciplina).filter(Boolean)));

        onCreateTopic(areaTopicTitle, mappedArea, lessonNames, finalPriority, baseQuestions, blockId, tags);
        toast.success(`Matéria completa criada para ${areaName}`);
    };

    const handleNotionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!existingAreaTopic || !onUpdateTopic) return;

        const currentLink = existingAreaTopic.notionLink || '';
        const newLink = prompt('Insira o link do Notion para esta área:', currentLink);
        
        if (newLink !== null) {
            onUpdateTopic({ ...existingAreaTopic, notionLink: newLink });
        }
    };

    return (
        <div className="mb-4 last:mb-0">
            <div className="p-3.5 sm:p-4 rounded-2xl border bg-white dark:bg-zinc-800/50 border-slate-200/70 dark:border-white/5 transition-colors">
                
                {/* Cabeçalho da Área */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className={`px-2.5 py-1 rounded-xl text-xs font-bold uppercase tracking-wider ${theme.bg} ${theme.text} border border-transparent`}>
                            {areaName}
                        </div>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            {completedCount}/{totalCount} concluídas ({progress}%)
                        </span>

                        {selectedAggregateIds.size > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                                {selectedAggregateIds.size} selecionadas
                            </span>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
                        {/* Botão Treinar Questões da Área */}
                        <button
                            onClick={() => onPracticeWithAI(areaName, items.map(i => i.disciplina))}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all active:scale-95 shadow-2xs"
                            title="Simular questões para toda esta área"
                        >
                            <BrainCircuit size={13} />
                            <span>Simular</span>
                        </button>

                        {/* Botão Raio-X da Área */}
                        <button
                            onClick={() => onAnalyzeWithAI(areaName, areaName, items.map(i => i.aula), mappedArea)}
                            className="flex items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all active:scale-95 shadow-2xs"
                            title="Raio-X de incidência da área"
                        >
                            <Target size={13} />
                            <span>Raio-X</span>
                        </button>

                        {/* Notion Link */}
                        {existingAreaTopic && (
                            <button 
                                onClick={handleNotionClick}
                                className={`flex items-center justify-center w-7 h-7 rounded-xl transition-all shadow-2xs active:scale-95 ${existingAreaTopic.notionLink ? 'bg-slate-800 dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-zinc-800 text-slate-400 border border-slate-200 dark:border-white/10 hover:border-slate-400'}`}
                                title={existingAreaTopic.notionLink ? "Editar Link Notion" : "Adicionar Link Notion"}
                            >
                                <LinkIcon size={13}/>
                            </button>
                        )}

                        {/* Botão Criar/Ver Matéria Completa */}
                        <button 
                            onClick={(e) => {
                                if (topicStatus === 'created' && existingAreaTopic && onEditTopic) {
                                    e.stopPropagation();
                                    onEditTopic(existingAreaTopic);
                                } else {
                                    handleCreateWholeAreaClick(e);
                                }
                            }}
                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-all active:scale-95 shadow-2xs 
                                ${topicStatus === 'created' 
                                    ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30' 
                                    : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 hover:border-slate-400'
                                }`}
                        >
                            {topicStatus === 'created' ? <Check size={12} strokeWidth={2.5} /> : <Plus size={12} strokeWidth={2.5} />}
                            <span>{topicStatus === 'created' ? 'No Acervo' : 'Acervo'}</span>
                        </button>
                    </div>
                </div>

                {/* Barra de Agregação Customizada */}
                {selectedAggregateIds.size > 0 && (
                    <div className="mb-3 p-2.5 sm:p-3 rounded-xl bg-blue-600 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-md shadow-blue-500/20 animate-slide-down">
                        <div className="flex items-center gap-2">
                            <Layers size={15} />
                            <span className="text-xs font-bold">
                                {selectedAggregateIds.size} {selectedAggregateIds.size === 1 ? 'aula selecionada' : 'aulas selecionadas'}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end flex-wrap">
                            <button
                                onClick={handleCreateSelectedAggregate}
                                className="px-2.5 py-1.5 rounded-lg bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 transition-colors shadow-2xs active:scale-95"
                            >
                                Criar Matéria Agrupada
                            </button>
                            <button
                                onClick={() => {
                                    const selectedItems = items.filter(i => selectedAggregateIds.has(i.id));
                                    onPracticeWithAI(`${areaName} (Selecionadas)`, selectedItems.map(i => i.aula));
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-blue-700 text-white font-bold text-xs hover:bg-blue-800 transition-colors active:scale-95"
                            >
                                Simular
                            </button>
                            <button
                                onClick={() => setSelectedAggregateIds(new Set())}
                                className="p-1 rounded text-white/80 hover:text-white"
                                title="Limpar seleção"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Lista de Aulas */}
                <div className="flex flex-col gap-2">
                    {items.map(item => {
                        const isExistingIndiv = existingTopics.some(t => t.title === item.aula && !t.deleted);
                        return (
                            <LessonItem 
                                key={item.id} 
                                item={item} 
                                isChecked={!!scheduleProgress[item.id]} 
                                isSelectedForAggregate={selectedAggregateIds.has(item.id)}
                                onToggleCheck={toggleCheck}
                                onToggleAggregateSelect={toggleAggregateSelect}
                                onCreateIndividualTopic={handleCreateIndividualTopic}
                                onPracticeWithAI={onPracticeWithAI}
                                onAnalyzeWithAI={(it) => onAnalyzeWithAI(it.aula, areaName, [it.disciplina], mappedArea)}
                                isExistingIndividualTopic={isExistingIndiv}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export const CronogramaView = ({ 
    scheduleProgress, 
    setScheduleProgress, 
    config, 
    searchTerm, 
    onScheduleChange,
    onCreateAggregatedTopic,
    existingTopics,
    onUpdateTopic,
    onEditTopic
}: { 
    scheduleProgress: ScheduleProgress, 
    setScheduleProgress: React.Dispatch<React.SetStateAction<ScheduleProgress>>, 
    config: UserConfig, 
    searchTerm?: string, 
    onScheduleChange: (s: 'MEDCOF' | 'ESTRATEGIA' | 'MEDREVIEW' | 'FAFIPA') => void,
    onCreateAggregatedTopic: (title: string, area: AreaType, lessons: string[], priority: ImportanceType, baseQuestions?: number, blockId?: string, tags?: string[]) => void,
    existingTopics: Topic[],
    onUpdateTopic?: (topic: Topic) => void,
    onEditTopic?: (topic: Topic) => void
}) => {
    const [collapsedBlocks, setCollapsedBlocks] = useState<Set<string>>(() => {
        const saved = localStorage.getItem('reviewflow_collapsed_blocks');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });
    const [searchLocal, setSearchLocal] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
    const [infoOpen, setInfoOpen] = useState(false);
    const [bannerDismissed, setBannerDismissed] = useState(false);
    const [isTemasModalOpen, setIsTemasModalOpen] = useState(false);
    const [fafipaViewMode, setFafipaViewMode] = useState<'materias' | 'semanas'>('materias');

    // Estados para os Modais de IA da FAFIPA
    const [activeQuestionTopic, setActiveQuestionTopic] = useState<{ topic: string, subtopics: string[] } | null>(null);
    const [activeAnalysisTopic, setActiveAnalysisTopic] = useState<{ topicName: string, areaName: string, subtopics: string[], mappedArea: AreaType } | null>(null);

    const activeScheduleCode = config.activeSchedule || 'FAFIPA';

    useEffect(() => {
        localStorage.setItem('reviewflow_collapsed_blocks', JSON.stringify(Array.from(collapsedBlocks)));
    }, [collapsedBlocks]);

    const finalSearch = searchTerm || searchLocal;

    const currentScheduleData = useMemo(() => {
        if (activeScheduleCode === 'FAFIPA') return FAFIPA_SCHEDULE;
        if (activeScheduleCode === 'MEDREVIEW') return MEDREVIEW_SCHEDULE;
        return activeScheduleCode === 'MEDCOF' ? MEDCOF_SCHEDULE : ESTRATEGIA_SCHEDULE;
    }, [activeScheduleCode]);

    // Rótulos e agrupamento das semanas da FAFIPA
    const FAFIPA_WEEK_LABELS: Record<number, string> = useMemo(() => ({
        0: 'Semana 0: Estudo Contínuo (Português, RLM, Informática e Atualidades)',
        1: 'Semana 1: SUS, APS, CF/88 e Políticas Públicas',
        2: 'Semana 2: Legislação Federal, Adm. Pública e Leis Municipais',
        3: 'Semana 3: Cardiovascular (HAS, DAC, IC, Arritmias, PCR)',
        4: 'Semana 4: Endócrino e Metabólico (DM, Tireoide, Obesidade, HE)',
        5: 'Semana 5: Respiratório (Asma, DPOC, Pneumonias, TB, TEP)',
        6: 'Semana 6: Gastro, Hepato e Cirurgia/Pediatria Digestiva',
        7: 'Semana 7: Infectologia e Imunologia (Antibióticos, IST, Hanseníase, Dengue)',
        8: 'Semana 8: Saúde da Criança (Puericultura, Vacinas, Exantemáticas, IVAS)',
        9: 'Semana 9: Saúde da Mulher (Pré-Natal, Rastreio, Climatério, Sangramentos)',
        10: 'Semana 10: Neurologia (Cefaleias, AVC, Epilepsia, Vertigem)',
        11: 'Semana 11: Psiquiatria e Reumatologia (Depressão, Ansiedade, AR, Gota)',
        12: 'Semana 12: Renal/Uro, Hemato, Oftalmo/ORL, Vigilância e SINAN',
        13: 'Semana 13: Prevenção, Ciclos de Vida e Urgências Médicas',
        14: 'Semana 14: Revisão Transversal FAFIPA e Conhecimentos Regionais'
    }), []);

    // Resumo Geral do Cronograma Atual
    const totalLessons = currentScheduleData.length;
    const completedLessons = useMemo(() => {
        return currentScheduleData.filter(item => scheduleProgress[item.id]).length;
    }, [currentScheduleData, scheduleProgress]);
    const overallPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const createdTopicsCount = useMemo(() => {
        const titlesSet = new Set(existingTopics.map(t => t.title.toLowerCase()));
        return currentScheduleData.filter(item => titlesSet.has(item.aula.toLowerCase())).length;
    }, [currentScheduleData, existingTopics]);

    // Agrupamento com filtro de busca e filtro de status
    const groupedData = useMemo(() => {
        const blocks: { [key: string]: { [key: string]: any[] } } = {};
        const isWeekMode = activeScheduleCode === 'FAFIPA' && fafipaViewMode === 'semanas';
        
        currentScheduleData.forEach(item => {
            const isDone = !!scheduleProgress[item.id];
            if (statusFilter === 'pending' && isDone) return;
            if (statusFilter === 'completed' && !isDone) return;

            if (finalSearch) {
                const term = finalSearch.toLowerCase();
                const match = item.aula.toLowerCase().includes(term) ||
                              item.disciplina.toLowerCase().includes(term) ||
                              item.grandeArea.toLowerCase().includes(term) ||
                              (item.grupo && item.grupo.toLowerCase().includes(term)) ||
                              (item.conteudo && item.conteudo.toLowerCase().includes(term)) ||
                              (item.professor && item.professor.toLowerCase().includes(term));
                if (!match) return;
            }

            const blockKey = isWeekMode 
                ? (FAFIPA_WEEK_LABELS[item.semana ?? 0] || `Semana ${item.semana ?? 0}`)
                : item.bloco;
            const areaKey = isWeekMode 
                ? (item.grupo ? `${item.disciplina}: ${item.grupo}` : item.disciplina)
                : item.grandeArea;

            if (!blocks[blockKey]) blocks[blockKey] = {};
            if (!blocks[blockKey][areaKey]) blocks[blockKey][areaKey] = [];
            blocks[blockKey][areaKey].push(item);
        });

        Object.keys(blocks).forEach(blk => {
            Object.keys(blocks[blk]).forEach(area => {
                blocks[blk][area].sort((a, b) => getPriorityWeight(b.importancia) - getPriorityWeight(a.importancia));
            });
        });

        let blockOrder: string[];
        if (isWeekMode) {
            blockOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                .map(w => FAFIPA_WEEK_LABELS[w])
                .filter(Boolean);
        } else {
            blockOrder = Array.from(new Set(currentScheduleData.map(item => item.bloco)));
        }

        return blockOrder
            .filter(blk => blocks[blk] && Object.keys(blocks[blk]).length > 0)
            .map(blk => ({
                id: blk,
                areas: blocks[blk]
            }));
    }, [currentScheduleData, finalSearch, statusFilter, scheduleProgress, activeScheduleCode, fafipaViewMode, FAFIPA_WEEK_LABELS]);

    const toggleCheck = useCallback((id: string) => {
        setScheduleProgress(prev => ({ ...prev, [id]: !prev[id] }));
    }, [setScheduleProgress]);

    const handleBulkComplete = useCallback((ids: string[]) => {
        setScheduleProgress(prev => {
            const next = { ...prev };
            ids.forEach(id => next[id] = true);
            return next;
        });
    }, [setScheduleProgress]);

    const toggleBlock = (id: string) => {
        setCollapsedBlocks(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const expandAll = () => setCollapsedBlocks(new Set());
    const collapseAll = () => {
        const allIds = groupedData.map(g => g.id);
        setCollapsedBlocks(new Set(allIds));
    };

    const handleOpenQuestions = (topic: string, subtopics: string[] = []) => {
        setActiveQuestionTopic({ topic, subtopics });
    };

    const handleOpenAnalysis = (topicName: string, areaName: string, subtopics: string[] = [], mappedArea: AreaType) => {
        setActiveAnalysisTopic({ topicName, areaName, subtopics, mappedArea });
    };

    const isMedicalResidency = activeScheduleCode !== 'FAFIPA';

    return (
        <div className="flex flex-col gap-4 sm:gap-6 min-h-full pb-4 lg:pb-6 animate-scale-in w-full">
            
            {/* 1. SELETOR DE TRILHA & CRONOGRAMA */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-[24px] p-3.5 sm:p-5 shadow-xs flex flex-col gap-3.5">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    {/* Switcher Principal: Concurso vs Residência */}
                    <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-zinc-800/80 rounded-xl w-full sm:w-auto">
                        <button
                            onClick={() => onScheduleChange('FAFIPA')}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-black transition-all ${
                                activeScheduleCode === 'FAFIPA'
                                    ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-xs'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            <Target size={14} className={activeScheduleCode === 'FAFIPA' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'} />
                            <span>Concurso FAFIPA</span>
                        </button>

                        <button
                            onClick={() => onScheduleChange(isMedicalResidency ? activeScheduleCode : 'MEDCOF')}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-black transition-all ${
                                isMedicalResidency
                                    ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-xs'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            <GraduationCap size={14} className={isMedicalResidency ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'} />
                            <span>Residência Médica</span>
                        </button>
                    </div>

                    {/* Sub-seleção para FAFIPA */}
                    {activeScheduleCode === 'FAFIPA' && (
                        <div className="flex items-center gap-1.5 self-stretch sm:self-auto overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
                            <button
                                onClick={() => setIsTemasModalOpen(true)}
                                className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center gap-1.5 transition-all whitespace-nowrap active:scale-95 shadow-2xs"
                                title="Abrir matriz dos 56 temas oficiais da FAFIPA"
                            >
                                <Target size={13} />
                                <span>Matriz dos 56 Temas</span>
                            </button>

                            <div className="h-4 w-px bg-slate-200 dark:bg-white/10 mx-0.5" />

                            <div className="flex items-center bg-slate-100 dark:bg-zinc-800 rounded-lg p-0.5">
                                <button
                                    onClick={() => setFafipaViewMode('materias')}
                                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all whitespace-nowrap ${
                                        fafipaViewMode === 'materias'
                                            ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                                            : 'text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200'
                                    }`}
                                >
                                    Por Disciplinas
                                </button>
                                <button
                                    onClick={() => setFafipaViewMode('semanas')}
                                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                                        fafipaViewMode === 'semanas'
                                            ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-2xs'
                                            : 'text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200'
                                    }`}
                                >
                                    <Calendar size={12} />
                                    <span>Por Semanas (0-14)</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Sub-seleção para Residência */}
                    {isMedicalResidency && (
                        <div className="flex items-center gap-1 self-stretch sm:self-auto overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
                            {(['MEDCOF', 'ESTRATEGIA', 'MEDREVIEW'] as const).map(code => (
                                <button
                                    key={code}
                                    onClick={() => onScheduleChange(code)}
                                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                                        activeScheduleCode === code
                                            ? 'bg-blue-600 text-white shadow-2xs'
                                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-600 dark:text-slate-300'
                                    }`}
                                >
                                    {code === 'MEDCOF' ? 'Medcof' : code === 'ESTRATEGIA' ? 'Estratégia' : 'MedReview'}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Barra de Resumo Compacta com Ícones */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs">
                        <div className="flex items-center gap-1.5" title="Total de aulas do cronograma">
                            <BookOpen size={14} className="text-slate-400" />
                            <span className="font-bold text-slate-800 dark:text-white">{totalLessons}</span>
                            <span className="text-slate-400 text-[11px]">aulas</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Aulas concluídas">
                            <CheckCircle2 size={14} className="text-emerald-500" />
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{completedLessons}</span>
                            <span className="text-slate-400 text-[11px]">({overallPercentage}%)</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Matérias criadas no acervo">
                            <FolderCheck size={14} className="text-blue-500" />
                            <span className="font-bold text-blue-600 dark:text-blue-400">{createdTopicsCount}</span>
                            <span className="text-slate-400 text-[11px]">no acervo</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-1 sm:flex-initial sm:min-w-[150px]">
                        <div className="flex-1 h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500" style={{ width: `${overallPercentage}%` }} />
                        </div>
                        <span className="text-xs font-black text-slate-700 dark:text-slate-300 tabular-nums">{overallPercentage}%</span>
                    </div>
                </div>
            </div>

            {/* 2. TOP TOOLBAR: BUSCA, FILTROS E EXPANDIR/RECOLHER (Sem sticky) */}
            <div className="bg-white dark:bg-zinc-900 p-2.5 sm:p-3 rounded-2xl flex flex-col sm:flex-row gap-2 relative z-10 shadow-xs border border-slate-200/70 dark:border-white/5">
                
                {/* Campo de Busca */}
                <div className="flex-1 relative group min-w-0">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"/>
                    <input 
                        type="text" 
                        placeholder="Buscar aula, matéria, professor..." 
                        value={searchLocal}
                        onChange={(e) => setSearchLocal(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-zinc-800 border border-transparent rounded-xl pl-9 pr-8 text-xs font-medium outline-none focus:bg-white dark:focus:bg-zinc-900 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all py-2 text-slate-800 dark:text-white"
                    />
                    {searchLocal && (
                        <button 
                            onClick={() => setSearchLocal('')} 
                            aria-label="Limpar busca"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                        >
                            <X size={13}/>
                        </button>
                    )}
                </div>

                {/* Filtros de Status (Todas / A Fazer / Concluídas) */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800/80 p-1 rounded-xl shrink-0">
                    <button
                        onClick={() => setStatusFilter('all')}
                        title="Todas as aulas"
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                            statusFilter === 'all'
                                ? 'bg-white dark:bg-zinc-900 text-slate-800 dark:text-white shadow-2xs'
                                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                        }`}
                    >
                        <ListFilter size={12} />
                        <span>Todas</span>
                    </button>
                    <button
                        onClick={() => setStatusFilter('pending')}
                        title="Aulas pendentes"
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                            statusFilter === 'pending'
                                ? 'bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 shadow-2xs'
                                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                        }`}
                    >
                        <Clock size={12} />
                        <span>A Fazer</span>
                    </button>
                    <button
                        onClick={() => setStatusFilter('completed')}
                        title="Aulas concluídas"
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                            statusFilter === 'completed'
                                ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                        }`}
                    >
                        <CheckCircle2 size={12} />
                        <span>Concluídas</span>
                    </button>
                </div>

                {/* Ações de Expandir/Recolher & Info (Icon Buttons) */}
                <div className="flex items-center gap-1 shrink-0 justify-end">
                    <button 
                        onClick={expandAll} 
                        className="w-8 h-8 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-all flex items-center justify-center active:scale-95"
                        title="Expandir todas as seções"
                        aria-label="Expandir todas as seções"
                    >
                        <ChevronsDown size={15} />
                    </button>
                    <button 
                        onClick={collapseAll} 
                        className="w-8 h-8 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-all flex items-center justify-center active:scale-95"
                        title="Recolher todas as seções"
                        aria-label="Recolher todas as seções"
                    >
                        <ChevronsUp size={15} />
                    </button>
                    <button 
                        onClick={() => setInfoOpen(!infoOpen)}
                        className={`w-8 h-8 rounded-xl transition-all shrink-0 flex items-center justify-center active:scale-95 ${
                            infoOpen 
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                                : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-700'
                        }`}
                        title="Guia de Prioridades e Cores"
                        aria-label="Guia de Cores"
                    >
                        <Info size={15} />
                    </button>
                </div>
            </div>

            {/* Banner Especial FAFIPA: Gerador com IA */}
            {activeScheduleCode === 'FAFIPA' && !bannerDismissed && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-indigo-950 via-blue-950 to-slate-900 text-white shadow-md relative overflow-hidden border border-blue-500/20">
                    <button 
                        onClick={() => setBannerDismissed(true)} 
                        aria-label="Ocultar banner"
                        className="absolute top-2.5 right-2.5 text-white/40 hover:text-white transition-colors p-1"
                    >
                        <X size={15} />
                    </button>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10 pr-6">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-blue-300 shrink-0">
                                <Sparkles size={16} />
                            </div>
                            <div>
                                <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                                    <span>Simulador de Questões FAFIPA</span>
                                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">IA</span>
                                </h3>
                                <p className="text-[11px] text-blue-200/70">
                                    Pratique questões no estilo e pegadinhas da banca examinadora.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
                            <button
                                onClick={() => setIsTemasModalOpen(true)}
                                className="h-8 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1 border border-white/20 transition-all active:scale-95"
                            >
                                <Target size={13} className="text-blue-300" />
                                <span>Matriz 56 Temas</span>
                            </button>
                            <button
                                onClick={() => handleOpenQuestions('Língua Portuguesa e Legislação')}
                                className="h-8 px-3 rounded-lg bg-white text-blue-950 hover:bg-blue-50 font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-all active:scale-95"
                            >
                                <BrainCircuit size={13} />
                                <span>Simulador Geral</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Painel Informativo / Legenda de Cores */}
            {infoOpen && (
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-white/10 shadow-sm animate-slide-down">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-sm text-slate-800 dark:text-white">Legenda e Funcionamento do Cronograma</h3>
                        <button onClick={() => setInfoOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                            <X size={15}/>
                        </button>
                    </div>
                    <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                        <p>
                            Acompanhe cada aula do seu edital ou curso preparatório. Você pode marcar aulas como concluídas, simular questões com IA ou criar matérias individuais/agrupadas diretamente no seu acervo de revisões espaçadas.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/50">
                                <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
                                <span className="font-bold text-[11px] text-slate-800 dark:text-white">Azul: Ver primeiro</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/50">
                                <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                                <span className="font-bold text-[11px] text-slate-800 dark:text-white">Verde: Alta prioridade</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/50">
                                <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                                <span className="font-bold text-[11px] text-slate-800 dark:text-white">Amarelo: Média prioridade</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/50">
                                <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                                <span className="font-bold text-[11px] text-slate-800 dark:text-white">Vermelho: Baixa prioridade</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 3. LISTA DOS BLOCOS / GRANDES ÁREAS (Fluxo contínuo sem scroll interno travado) */}
            <div className="space-y-4 sm:space-y-6">
                {groupedData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-white/5 shadow-xs">
                        <MapIcon size={44} className="mb-3 text-slate-300 dark:text-zinc-600"/>
                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Nenhum conteúdo corresponde ao filtro</p>
                        <p className="text-xs text-slate-400 mt-1 max-w-sm">Tente limpar os termos de busca ou selecionar "Todas" no filtro de status acima.</p>
                        {(finalSearch || statusFilter !== 'all') && (
                            <button
                                onClick={() => { setSearchLocal(''); setStatusFilter('all'); }}
                                className="mt-3 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors"
                            >
                                Limpar Filtros
                            </button>
                        )}
                    </div>
                ) : (
                    groupedData.map(block => {
                        const isCollapsed = collapsedBlocks.has(block.id);
                        const areas = Object.keys(block.areas).sort();
                        const allItems = Object.values(block.areas).flat();
                        const completedCount = allItems.filter((i: any) => scheduleProgress[i.id]).length;
                        const totalCount = allItems.length;
                        const progress = Math.round((completedCount / totalCount) * 100);
                        const isComplete = progress === 100;
                        const isNamedBlock = isNaN(Number(block.id));

                        return (
                            <div 
                                key={block.id} 
                                className={`bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-[28px] border border-slate-200/80 dark:border-white/5 shadow-xs overflow-hidden transition-all duration-300 ${
                                    isComplete ? 'opacity-80' : ''
                                }`}
                            >
                                {/* Cabeçalho do Bloco / Grande Área */}
                                <div 
                                    onClick={() => toggleBlock(block.id)}
                                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors select-none"
                                >
                                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-white font-black text-base sm:text-lg shadow-inner shrink-0">
                                            {isNamedBlock ? getBlockIcon(block.id) : block.id}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-black text-sm sm:text-base text-slate-800 dark:text-white leading-tight mb-1 truncate">
                                                {isNamedBlock ? block.id : `Semana ${block.id}`}
                                            </h3>
                                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                                <div className="w-20 sm:w-24 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden shrink-0">
                                                    <div className="h-full bg-slate-800 dark:bg-white transition-all duration-500" style={{ width: `${progress}%` }} />
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{progress}% concluído</span>
                                                <span className="text-slate-300 dark:text-zinc-700">•</span>
                                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{completedCount}/{totalCount} aulas</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 transition-colors shrink-0 ml-2">
                                        {isCollapsed ? <ChevronDown size={18}/> : <ChevronUp size={18}/>}
                                    </div>
                                </div>

                                {!isCollapsed && (
                                    <div className="p-3.5 sm:p-5 pt-0 animate-slide-up space-y-3 sm:space-y-4 border-t border-slate-100 dark:border-white/5">
                                        {areas.map(areaName => (
                                            <AreaGroup 
                                                key={areaName}
                                                areaName={areaName}
                                                items={block.areas[areaName]}
                                                blockId={block.id}
                                                scheduleProgress={scheduleProgress}
                                                toggleCheck={toggleCheck}
                                                onBulkComplete={handleBulkComplete}
                                                onCreateTopic={onCreateAggregatedTopic}
                                                existingTopics={existingTopics}
                                                onUpdateTopic={onUpdateTopic}
                                                onEditTopic={onEditTopic}
                                                onPracticeWithAI={handleOpenQuestions}
                                                onAnalyzeWithAI={handleOpenAnalysis}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Modal Interativo de Questões com IA */}
            <FafipaQuestionModal 
                isOpen={!!activeQuestionTopic}
                onClose={() => setActiveQuestionTopic(null)}
                initialTopic={activeQuestionTopic?.topic || 'FAFIPA'}
                subtopics={activeQuestionTopic?.subtopics || []}
                onCreateTopic={(title, area, lessons, priority) => {
                    onCreateAggregatedTopic(title, area, lessons, priority);
                }}
            />

            {/* Modal de Raio-X da Banca com IA */}
            {activeAnalysisTopic && (
                <FafipaTopicAnalysisModal
                    isOpen={!!activeAnalysisTopic}
                    onClose={() => setActiveAnalysisTopic(null)}
                    topicName={activeAnalysisTopic.topicName}
                    areaName={activeAnalysisTopic.areaName}
                    subtopics={activeAnalysisTopic.subtopics}
                    mappedArea={activeAnalysisTopic.mappedArea}
                    onStartQuestions={(topic, subs) => {
                        handleOpenQuestions(topic, subs);
                    }}
                    onCreateTopic={(title, area, lessons, priority, baseQ) => {
                        onCreateAggregatedTopic(title, area, lessons, priority, baseQ);
                    }}
                />
            )}

            {/* Modal da Matriz dos 56 Temas Oficiais FAFIPA */}
            <FafipaTemasModal 
                isOpen={isTemasModalOpen}
                onClose={() => setIsTemasModalOpen(false)}
                scheduleProgress={scheduleProgress}
                onSelectTemaFilter={(filterText) => {
                    setSearchLocal(filterText);
                }}
                onOpenQuestions={(topicName) => {
                    handleOpenQuestions(topicName);
                }}
            />

        </div>
    );
};
