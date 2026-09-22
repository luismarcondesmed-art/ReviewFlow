import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
    Check, ChevronDown, ChevronUp, Filter, LayoutGrid, List, Map as MapIcon, ArrowUpDown, 
    Info, X, Zap, Search, Plus, Link as LinkIcon, BrainCircuit, Sparkles, Target, 
    BookOpen, Layers, CheckSquare, Square, Stethoscope, Baby, ShieldCheck, Eye, FileText
} from 'lucide-react';
import { UserConfig, ScheduleProgress, AreaType, Topic, ImportanceType } from '../types';
import { getAreaTheme, getTodayStr } from '../utils';
import { MEDCOF_SCHEDULE } from '../services/medcofSchedule';
import { ESTRATEGIA_SCHEDULE } from '../services/estrategiaSchedule';
import { MEDREVIEW_SCHEDULE } from '../services/medreviewSchedule';
import { FAFIPA_SCHEDULE } from '../services/fafipaSchedule';
import { calculateEnamedStats, getAILessonSummary } from '../utils/enamedUtils';
import { FafipaQuestionModal } from '../modals/FafipaQuestionModal';
import { FafipaTopicAnalysisModal } from '../modals/FafipaTopicAnalysisModal';
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
    if (p.includes('azul')) return { dot: 'bg-blue-500', text: 'text-blue-500', bg: 'bg-blue-500/10' };
    if (p.includes('verde')) return { dot: 'bg-emerald-500', text: 'text-emerald-500', bg: 'bg-emerald-500/10' };
    if (p.includes('amarelo')) return { dot: 'bg-amber-500', text: 'text-amber-500', bg: 'bg-amber-500/10' };
    if (p.includes('vermelho')) return { dot: 'bg-red-500', text: 'text-red-500', bg: 'bg-red-500/10' };
    if (p.includes('roxo')) return { dot: 'bg-purple-500', text: 'text-purple-500', bg: 'bg-purple-500/10' };
    return { dot: 'bg-slate-300', text: 'text-slate-400', bg: 'bg-slate-100 dark:bg-slate-200/5' };
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
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl border transition-all group ${
                isSelectedForAggregate 
                    ? 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-400 dark:border-blue-600 ring-1 ring-blue-400/30' 
                    : isChecked 
                        ? 'bg-slate-50/80 dark:bg-black/20 border-slate-100 dark:border-white/5 opacity-70' 
                        : 'bg-white dark:bg-zinc-900 border-slate-100 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'
            }`}
        >
            <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* Checkbox de Conclusão da Aula */}
                <button 
                    onClick={(e) => { e.stopPropagation(); onToggleCheck(item.id); }}
                    title={isChecked ? "Marcar como não concluída" : "Marcar como concluída"}
                    className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                        isChecked 
                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                            : 'border-slate-300 dark:border-white/20 hover:border-slate-500'
                    }`}
                >
                    {isChecked && <Check size={12} strokeWidth={3}/>}
                </button>

                {/* Seleção para Agregar */}
                <button
                    onClick={(e) => { e.stopPropagation(); onToggleAggregateSelect(item.id); }}
                    title={isSelectedForAggregate ? "Desmarcar da agregação" : "Selecionar para criar matéria agregada"}
                    className={`mt-0.5 p-0.5 rounded text-slate-400 hover:text-blue-600 transition-colors shrink-0`}
                >
                    {isSelectedForAggregate ? (
                        <CheckSquare size={16} className="text-blue-600 dark:text-blue-400" />
                    ) : (
                        <Square size={16} className="text-slate-300 dark:text-zinc-600 group-hover:text-slate-400" />
                    )}
                </button>

                {/* Conteúdo da Aula */}
                <div className="flex-1 min-w-0">
                    <div className={`text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug ${isChecked ? 'line-through text-slate-400 dark:text-zinc-500' : ''}`}>
                        {item.aula}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-slate-400">{item.disciplina}</span>
                        {item.professor && (
                            <>
                                <span className="text-[10px] text-slate-300 dark:text-zinc-700">•</span>
                                <span className="text-[10px] text-slate-400">{formatProfessorName(item.professor)}</span>
                            </>
                        )}
                        {item.importancia && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-slate-400">
                                <span className={`w-1.5 h-1.5 rounded-full ${pColor.dot}`}></span>
                                {item.importancia}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Ações Específicas da Aula */}
            <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/5 w-full sm:w-auto justify-end">
                {/* Botão Treinar Questões FAFIPA com IA */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onPracticeWithAI(item.aula, [item.disciplina]);
                    }}
                    title="Treinar Questões FAFIPA com IA para este tema"
                    className="h-7 px-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/30 hover:bg-blue-100 text-[10px] font-bold flex items-center gap-1 transition-all"
                >
                    <BrainCircuit size={12} />
                    <span className="hidden xs:inline">Questões IA</span>
                </button>

                {/* Botão Raio-X FAFIPA com IA */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAnalyzeWithAI(item);
                    }}
                    title="Ver Raio-X e perfil de cobrança da banca FAFIPA"
                    className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/30 hover:bg-purple-100 flex items-center justify-center transition-all"
                >
                    <Target size={12} />
                </button>

                {/* Botão Criar Matéria Individual */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onCreateIndividualTopic(item);
                    }}
                    title={isExistingIndividualTopic ? "Matéria já adicionada às revisões" : "Criar matéria individual desta aula"}
                    className={`h-7 px-2.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                        isExistingIndividualTopic
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                    }`}
                >
                    {isExistingIndividualTopic ? <Check size={11} /> : <Plus size={11} />}
                    <span>{isExistingIndividualTopic ? 'Criada' : 'Criar Matéria'}</span>
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
    const isComplete = progress === 100;
    
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
            <div className="p-4 rounded-2xl border bg-white dark:bg-zinc-800/50 border-slate-100 dark:border-white/5 transition-colors">
                
                {/* Cabeçalho da Área */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className={`px-2.5 py-1 rounded-xl text-xs font-bold uppercase tracking-wider ${theme.bg} ${theme.text} border border-transparent`}>
                            {areaName}
                        </div>
                        <span className="text-xs font-bold text-slate-400">{completedCount}/{totalCount} concluídas</span>

                        {selectedAggregateIds.size > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                                {selectedAggregateIds.size} selecionadas
                            </span>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Botão Treinar Questões da Área */}
                        <button
                            onClick={() => onPracticeWithAI(areaName, items.map(i => i.disciplina))}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/30 hover:bg-blue-100 transition-all shadow-sm"
                            title="Treinar simulador FAFIPA para toda esta área"
                        >
                            <BrainCircuit size={13} />
                            <span>Simular FAFIPA</span>
                        </button>

                        {/* Botão Raio-X da Área */}
                        <button
                            onClick={() => onAnalyzeWithAI(areaName, areaName, items.map(i => i.aula), mappedArea)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/30 hover:bg-purple-100 transition-all shadow-sm"
                            title="Ver análise de banca para esta área"
                        >
                            <Target size={13} />
                            <span className="hidden sm:inline">Raio-X</span>
                        </button>

                        {/* Notion Link */}
                        {existingAreaTopic && (
                            <button 
                                onClick={handleNotionClick}
                                className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all shadow-sm ${existingAreaTopic.notionLink ? 'bg-slate-800 dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-zinc-800 text-slate-400 border border-slate-200 dark:border-white/10 hover:border-slate-400'}`}
                                title={existingAreaTopic.notionLink ? "Editar Link Notion" : "Adicionar Link Notion"}
                            >
                                <LinkIcon size={14}/>
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
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all shadow-sm 
                                ${topicStatus === 'created' 
                                    ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30' 
                                    : 'bg-white dark:bg-zinc-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-slate-400'
                                }`}
                        >
                            {topicStatus === 'created' ? <Check size={12}/> : <Plus size={12}/>}
                            {topicStatus === 'created' ? 'Ver Área' : 'Criar Área Completa'}
                        </button>
                    </div>
                </div>

                {/* Barra de Ação de Agregação Customizada (Aparece se houver selecionados) */}
                {selectedAggregateIds.size > 0 && (
                    <div className="mb-3 p-3 rounded-xl bg-blue-600 text-white flex items-center justify-between gap-3 shadow-md shadow-blue-500/20 animate-slide-down">
                        <div className="flex items-center gap-2">
                            <Layers size={16} />
                            <span className="text-xs font-bold">
                                {selectedAggregateIds.size} aulas selecionadas para agregar
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleCreateSelectedAggregate}
                                className="px-3 py-1.5 rounded-lg bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 transition-colors shadow-sm"
                            >
                                Criar Matéria com Selecionadas
                            </button>
                            <button
                                onClick={() => {
                                    const selectedItems = items.filter(i => selectedAggregateIds.has(i.id));
                                    onPracticeWithAI(`${areaName} (Aulas Selecionadas)`, selectedItems.map(i => i.aula));
                                }}
                                className="px-3 py-1.5 rounded-lg bg-blue-700 text-white font-bold text-xs hover:bg-blue-800 transition-colors"
                            >
                                Treinar Selecionadas
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
                
                {/* Lista de Aulas / Subtemas */}
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

                {/* Dica da IA para Revisões */}
                <div className="mt-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 p-3 rounded-xl flex items-start gap-2.5">
                    <div className="mt-0.5">
                        <Zap size={14} className="text-blue-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 capitalize mb-0.5 tracking-tight">Dica de Revisão por IA</p>
                        <p className="text-[10px] font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                            {getAILessonSummary(areaName, items.map((i: any) => i.aula))}
                        </p>
                    </div>
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
    const [scheduleMenuOpen, setScheduleMenuOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);

    // Estados para os Modais de IA da FAFIPA
    const [activeQuestionTopic, setActiveQuestionTopic] = useState<{ topic: string, subtopics: string[] } | null>(null);
    const [activeAnalysisTopic, setActiveAnalysisTopic] = useState<{ topicName: string, areaName: string, subtopics: string[], mappedArea: AreaType } | null>(null);

    const activeScheduleCode = config.activeSchedule || 'MEDCOF';

    useEffect(() => {
        localStorage.setItem('reviewflow_collapsed_blocks', JSON.stringify(Array.from(collapsedBlocks)));
    }, [collapsedBlocks]);

    const finalSearch = searchTerm || searchLocal;

    const currentScheduleData = useMemo(() => {
        if (activeScheduleCode === 'FAFIPA') return FAFIPA_SCHEDULE;
        if (activeScheduleCode === 'MEDREVIEW') return MEDREVIEW_SCHEDULE;
        return activeScheduleCode === 'MEDCOF' ? MEDCOF_SCHEDULE : ESTRATEGIA_SCHEDULE;
    }, [activeScheduleCode]);

    const groupedData = useMemo(() => {
        const blocks: { [key: string]: { [key: string]: any[] } } = {};
        
        currentScheduleData.forEach(item => {
            if (finalSearch) {
                const term = finalSearch.toLowerCase();
                const match = item.aula.toLowerCase().includes(term) ||
                              item.disciplina.toLowerCase().includes(term) ||
                              item.grandeArea.toLowerCase().includes(term) ||
                              (item.professor && item.professor.toLowerCase().includes(term));
                if (!match) return;
            }

            if (!blocks[item.bloco]) blocks[item.bloco] = {};
            if (!blocks[item.bloco][item.grandeArea]) blocks[item.bloco][item.grandeArea] = [];
            blocks[item.bloco][item.grandeArea].push(item);
        });

        Object.keys(blocks).forEach(blk => {
            Object.keys(blocks[blk]).forEach(area => {
                blocks[blk][area].sort((a, b) => getPriorityWeight(b.importancia) - getPriorityWeight(a.importancia));
            });
        });

        // Preserva a ordem original do edital/cronograma
        const blockOrder = Array.from(new Set(currentScheduleData.map(item => item.bloco)));
        const sortedBlocks = blockOrder
            .filter(blk => blocks[blk])
            .map(blk => ({
                id: blk,
                areas: blocks[blk]
            }));

        return sortedBlocks;
    }, [currentScheduleData, finalSearch]);

    useEffect(() => {
        if (groupedData.length > 0) {
             const newSet = new Set<string>();
             let foundActive = false;
             groupedData.forEach(g => {
                 const allItems = Object.values(g.areas).flat();
                 const isComplete = allItems.every((i: any) => scheduleProgress[i.id]);
                 
                 if (isComplete && !foundActive) {
                     newSet.add(g.id);
                 } else if (!foundActive) {
                     foundActive = true; 
                 } else {
                     newSet.add(g.id); 
                 }
             });
             setCollapsedBlocks(newSet);
        }
    }, [activeScheduleCode]);

    const toggleCheck = useCallback((id: string) => {
        setScheduleProgress(prev => ({ ...prev, [id]: !prev[id] }));
    }, []);

    const handleBulkComplete = useCallback((ids: string[]) => {
        setScheduleProgress(prev => {
            const next = { ...prev };
            ids.forEach(id => next[id] = true);
            return next;
        });
    }, []);

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

    // Abertura de modais de IA
    const handleOpenQuestions = (topic: string, subtopics: string[] = []) => {
        setActiveQuestionTopic({ topic, subtopics });
    };

    const handleOpenAnalysis = (topicName: string, areaName: string, subtopics: string[] = [], mappedArea: AreaType) => {
        setActiveAnalysisTopic({ topicName, areaName, subtopics, mappedArea });
    };

    return (
        <div className="h-full flex flex-col pb-4 lg:pb-0 animate-scale-in">
            
            {/* Top Toolbar */}
            <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl p-3 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sticky top-0 sm:top-2 lg:top-4 z-30 shadow-xs border border-slate-200/60 dark:border-white/5">
                <div className="flex items-center justify-between gap-2 w-full sm:w-auto">
                    <div className="relative shrink-0 flex-1 sm:flex-none">
                        <button 
                            onClick={() => setScheduleMenuOpen(!scheduleMenuOpen)}
                            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 w-full sm:w-auto bg-slate-100 dark:bg-zinc-800 rounded-xl text-xs font-bold text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                            {activeScheduleCode === 'FAFIPA' ? 'Concurso FAFIPA' : activeScheduleCode === 'MEDREVIEW' ? 'Extensivo MedReview' : activeScheduleCode === 'MEDCOF' ? 'Extensivo Medcof' : 'Extensivo Estratégia'}
                            <ChevronDown size={14} className={`transition-transform ${scheduleMenuOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {scheduleMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-[85]" onClick={() => setScheduleMenuOpen(false)}></div>
                                <div className="absolute top-[calc(100%+8px)] left-0 mt-2 w-full sm:w-64 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl z-[90] overflow-hidden animate-slide-down p-1.5 space-y-1">
                                    <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        Residência Médica
                                    </div>
                                    <button 
                                        onClick={() => { onScheduleChange('MEDCOF'); setScheduleMenuOpen(false); }} 
                                        className={`w-full text-left px-3.5 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-between rounded-xl transition-colors ${activeScheduleCode === 'MEDCOF' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-500/10' : 'text-slate-700 dark:text-slate-300'}`}
                                    >
                                        <span>Extensivo Medcof</span>
                                        {activeScheduleCode === 'MEDCOF' && <Check size={16}/>}
                                    </button>
                                    <button 
                                        onClick={() => { onScheduleChange('ESTRATEGIA'); setScheduleMenuOpen(false); }} 
                                        className={`w-full text-left px-3.5 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-between rounded-xl transition-colors ${activeScheduleCode === 'ESTRATEGIA' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-500/10' : 'text-slate-700 dark:text-slate-300'}`}
                                    >
                                        <span>Extensivo Estratégia</span>
                                        {activeScheduleCode === 'ESTRATEGIA' && <Check size={16}/>}
                                    </button>
                                    <button 
                                        onClick={() => { onScheduleChange('MEDREVIEW'); setScheduleMenuOpen(false); }} 
                                        className={`w-full text-left px-3.5 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-between rounded-xl transition-colors ${activeScheduleCode === 'MEDREVIEW' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-500/10' : 'text-slate-700 dark:text-slate-300'}`}
                                    >
                                        <span>Extensivo MedReview</span>
                                        {activeScheduleCode === 'MEDREVIEW' && <Check size={16}/>}
                                    </button>

                                    <div className="pt-2 px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-t border-slate-100 dark:border-white/5">
                                        Concursos Públicos
                                    </div>
                                    <button 
                                        onClick={() => { onScheduleChange('FAFIPA'); setScheduleMenuOpen(false); }} 
                                        className={`w-full text-left px-3.5 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-between rounded-xl transition-colors ${activeScheduleCode === 'FAFIPA' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-500/10' : 'text-slate-700 dark:text-slate-300'}`}
                                    >
                                        <div className="flex flex-col">
                                            <span>Concurso FAFIPA</span>
                                            <span className="text-[10px] font-normal text-slate-400">Médico & Provas Gerais</span>
                                        </div>
                                        {activeScheduleCode === 'FAFIPA' && <Check size={16}/>}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex-1 w-full relative group">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"/>
                    <input 
                        type="text" 
                        placeholder="Filtrar matérias, aulas ou bancas..." 
                        value={searchLocal}
                        onChange={(e) => setSearchLocal(e.target.value)}
                        className="w-full h-full bg-slate-100 dark:bg-zinc-800 border border-transparent rounded-xl pl-9 pr-8 text-xs font-bold outline-none focus:bg-white dark:focus:bg-zinc-900 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all py-2.5 text-slate-800 dark:text-white"
                    />
                    {searchLocal && (
                        <button onClick={() => setSearchLocal('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            <X size={14}/>
                        </button>
                    )}
                </div>

                <div className="hidden sm:flex gap-2 shrink-0">
                    <button onClick={expandAll} className="px-3 py-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-zinc-800 rounded-xl transition-colors">Expandir</button>
                    <button onClick={collapseAll} className="px-3 py-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-zinc-800 rounded-xl transition-colors">Recolher</button>
                    <button 
                        onClick={() => setInfoOpen(!infoOpen)}
                        className={`p-2 rounded-xl transition-colors shrink-0 flex items-center justify-center ${infoOpen ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-700'}`}
                        title="Informações do Cronograma"
                    >
                        <Info size={16} />
                    </button>
                </div>
            </div>

            {/* Banner Especial FAFIPA: Gerador com IA */}
            {activeScheduleCode === 'FAFIPA' && (
                <div className="mb-6 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white shadow-xl shadow-blue-950/20 relative overflow-hidden border border-blue-500/20">
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                        <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-blue-300 shrink-0 shadow-inner">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base font-black text-white">
                                        Simulador FAFIPA com Inteligência Artificial
                                    </h3>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">
                                        Novo
                                    </span>
                                </div>
                                <p className="text-xs text-blue-100/80 font-medium mt-0.5 max-w-xl">
                                    Crie matérias individualmente para cada tema ou agregue tópicos. Pratique questões inéditas no rigor e pegadinhas da banca examinadora.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
                            <button
                                onClick={() => handleOpenQuestions('Língua Portuguesa e Legislação')}
                                className="flex-1 sm:flex-none h-10 px-4 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-black/20 transition-all cursor-pointer"
                            >
                                <BrainCircuit size={15} />
                                Gerar Simulado Geral
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {infoOpen && (
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 mb-6 border border-slate-200 dark:border-white/10 shadow-sm animate-slide-down">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-slate-800 dark:text-white">Modo Cronograma</h3>
                        <button onClick={() => setInfoOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={16}/></button>
                    </div>
                    <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                        <p>O modo Cronograma permite estudar os temas individualmente ou agrupados, acompanhando o progresso aula a aula com repetição espaçada.</p>
                        <h4 className="font-bold text-slate-800 dark:text-white mt-4 mb-2">Prioridade das Aulas</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-blue-500 shrink-0"></div>
                                <span className="font-bold text-slate-800 dark:text-white">Ver primeiro (Azul)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-emerald-500 shrink-0"></div>
                                <span className="font-bold text-slate-800 dark:text-white">Alta prioridade (Verde)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-amber-500 shrink-0"></div>
                                <span className="font-bold text-slate-800 dark:text-white">Média prioridade (Amarelo)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-red-500 shrink-0"></div>
                                <span className="font-bold text-slate-800 dark:text-white">Baixa prioridade (Vermelho)</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Lista dos Blocos / Grandes Áreas */}
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6">
                {groupedData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <MapIcon size={48} className="mb-4 text-slate-300"/>
                        <p className="text-sm font-bold text-slate-400">Nenhum conteúdo encontrado</p>
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
                            <div key={block.id} className={`bg-white dark:bg-zinc-900 rounded-[28px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden transition-all duration-500 ${isComplete ? 'opacity-70 grayscale-[0.5]' : ''}`}>
                                
                                {/* Cabeçalho do Bloco / Grande Área */}
                                <div 
                                    onClick={() => toggleBlock(block.id)}
                                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-white font-black text-lg shadow-inner shrink-0">
                                            {isNamedBlock ? getBlockIcon(block.id) : block.id}
                                        </div>
                                        <div>
                                            {/* Nome da Grande Área ao invés de BLOCO 1 */}
                                            <h3 className="font-black text-base sm:text-lg text-slate-800 dark:text-white leading-tight mb-1.5">
                                                {isNamedBlock ? block.id : `Bloco ${block.id}`}
                                            </h3>
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-slate-900 dark:bg-white transition-all duration-700" style={{width: `${progress}%`}}></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400">{progress}% concluído</span>
                                                <span className="text-slate-300 dark:text-zinc-700">•</span>
                                                <span className="text-[10px] font-bold text-slate-400">{totalCount} {totalCount === 1 ? 'aula' : 'aulas'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 transition-colors">
                                        {isCollapsed ? <ChevronDown size={20}/> : <ChevronUp size={20}/>}
                                    </div>
                                </div>

                                {!isCollapsed && (
                                    <div className="p-5 pt-0 animate-slide-up space-y-4">
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

            {/* Modal Interativo de Questões FAFIPA com IA */}
            <FafipaQuestionModal 
                isOpen={!!activeQuestionTopic}
                onClose={() => setActiveQuestionTopic(null)}
                initialTopic={activeQuestionTopic?.topic || 'FAFIPA'}
                subtopics={activeQuestionTopic?.subtopics || []}
                onCreateTopic={(title, area, lessons, priority) => {
                    onCreateAggregatedTopic(title, area, lessons, priority);
                }}
            />

            {/* Modal de Raio-X da Banca FAFIPA com IA */}
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

        </div>
    );
};
