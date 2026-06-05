
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
    Check, ChevronDown, ChevronUp, Filter, LayoutGrid, List, Map as MapIcon, ArrowUpDown, Info, X, Zap, Search, Plus, Link as LinkIcon
} from 'lucide-react';
import { UserConfig, ScheduleProgress, AreaType, Topic, ImportanceType } from '../types';
import { getAreaTheme, getTodayStr } from '../utils';
import { MEDCOF_SCHEDULE } from '../services/medcofSchedule';
import { ESTRATEGIA_SCHEDULE } from '../services/estrategiaSchedule';
import { MEDREVIEW_SCHEDULE } from '../services/medreviewSchedule';
import { calculateEnamedStats, getAILessonSummary } from '../utils/enamedUtils';

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
    if (area.includes("Clínica")) return 'clinica';
    if (area.includes("Cirurgia")) return 'cirurgia';
    if (area.includes("Pediatria")) return 'pediatria';
    if (area.includes("Ginecologia") || area.includes("Obstetrícia") || area.includes("G.O.")) return 'go';
    if (area.includes("Preventiva")) return 'preventiva';
    return 'clinica';
};

// --- Components ---

const LessonItem = React.memo(({ item, isChecked, onToggle }: { item: any, isChecked: boolean, onToggle: (id: string) => void }) => {
    const pColor = getPriorityColor(item.importancia);
    
    return (
        <div 
            onClick={() => onToggle(item.id)}
            className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer group ${isChecked ? 'bg-slate-50 dark:bg-black/20 border-transparent opacity-60' : 'bg-white dark:bg-zinc-900 border-slate-100 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'}`}
        >
            <div className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-white/20 group-hover:border-slate-500'}`}>
                {isChecked && <Check size={12} className="text-slate-100" strokeWidth={3}/>}
            </div>
            <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug ${isChecked ? 'line-through text-slate-400' : ''}`}>
                    {item.aula}
                </div>
                <div className="flex items-center gap-2 mt-1">
                     <span className="text-[10px] font-bold text-slate-400">{item.disciplina}</span>
                     {item.professor && (
                         <>
                            <span className="text-[10px] text-slate-300">•</span>
                            <span className="text-[10px] text-slate-400">{formatProfessorName(item.professor)}</span>
                         </>
                     )}
                </div>
            </div>
            {item.importancia && (
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${pColor.dot}`} title={item.importancia}></div>
            )}
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
    existingTopic?: Topic;
    onUpdateTopic?: (topic: Topic) => void;
    onEditTopic?: (topic: Topic) => void;
}

const AreaGroup: React.FC<AreaGroupProps> = ({ 
    areaName, 
    items, 
    blockId, 
    scheduleProgress, 
    toggleCheck, 
    onBulkComplete,
    onCreateTopic, 
    existingTopic,
    onUpdateTopic,
    onEditTopic
}) => {
    const mappedArea = mapArea(areaName);
    const theme = getAreaTheme(mappedArea);
    
    const completedCount = items.filter(i => scheduleProgress[i.id]).length;
    const totalCount = items.length;
    const progress = Math.round((completedCount / totalCount) * 100);
    const isComplete = progress === 100;
    
    const topicStatus = existingTopic ? 'created' : 'none';

    const handleCreateClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        const topicTitle = `Bloco ${blockId} - ${areaName}`;
        const rawLessonNames = items.map(i => i.aula);
        
        // Use ENAMED stats to calculate priority and questions
        const { priority: finalPriority, questions: baseQuestions, lessonQuestions } = calculateEnamedStats(areaName, rawLessonNames);
        
        // Append estimated questions to lesson names based on ENAMED stats
        const lessonNames = items.map((i, idx) => {
            const q = lessonQuestions[idx] || 5;
            return `${i.aula} (~${q}q)`;
        });
        
        // Auto-complete all lessons in this group
        const allIds = items.map(i => i.id);
        onBulkComplete(allIds);

        const tags = Array.from(new Set(items.map(i => i.disciplina).filter(Boolean)));

        onCreateTopic(topicTitle, mappedArea, lessonNames, finalPriority, baseQuestions, `Bloco ${blockId}`, tags);
    };

    const handleNotionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!existingTopic || !onUpdateTopic) return;

        const currentLink = existingTopic.notionLink || '';
        const newLink = prompt('Insira o link do Notion para este bloco:', currentLink);
        
        if (newLink !== null) {
            onUpdateTopic({ ...existingTopic, notionLink: newLink });
        }
    };

    return (
        <div className="mb-4 last:mb-0">
            <div className={`p-4 rounded-2xl border bg-white dark:bg-zinc-800/50 border-slate-100 dark:border-white/5`}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${theme.bg} ${theme.text} border border-transparent`}>
                            {areaName}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">{completedCount}/{totalCount}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {/* Notion Link Button */}
                        {existingTopic && (
                            <button 
                                onClick={handleNotionClick}
                                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all shadow-sm ${existingTopic.notionLink ? 'bg-slate-800 dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-zinc-800 text-slate-400 border border-slate-200 dark:border-white/10 hover:border-slate-400'}`}
                                title={existingTopic.notionLink ? "Editar Link Notion" : "Adicionar Link Notion"}
                            >
                                <LinkIcon size={14}/>
                            </button>
                        )}

                        {/* Create/Update Topic Button */}
                        <button 
                            onClick={(e) => {
                                if (topicStatus === 'created' && existingTopic && onEditTopic) {
                                    e.stopPropagation();
                                    onEditTopic(existingTopic);
                                } else {
                                    handleCreateClick(e);
                                }
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all shadow-sm 
                                ${topicStatus === 'created' 
                                    ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30' 
                                    : 'bg-white dark:bg-zinc-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-slate-400'
                                }`}
                        >
                            {topicStatus === 'created' ? <Check size={12}/> : <Plus size={12}/>}
                            {topicStatus === 'created' ? 'Ver Matéria' : 'Criar Matéria'}
                        </button>
                    </div>
                </div>
                
                <div className="flex flex-col gap-2">
                    {items.map(item => (
                        <LessonItem 
                            key={item.id} 
                            item={item} 
                            isChecked={!!scheduleProgress[item.id]} 
                            onToggle={toggleCheck} 
                        />
                    ))}
                </div>

                {/* Dica da IA para Revisões (Apenas Estilo Visual) */}
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
    onScheduleChange: (s: 'MEDCOF' | 'ESTRATEGIA' | 'MEDREVIEW') => void,
    onCreateAggregatedTopic: (title: string, area: AreaType, lessons: string[], priority: ImportanceType, baseQuestions?: number) => void,
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
    const activeScheduleCode = config.activeSchedule || 'MEDCOF';

    useEffect(() => {
        localStorage.setItem('reviewflow_collapsed_blocks', JSON.stringify(Array.from(collapsedBlocks)));
    }, [collapsedBlocks]);

    const finalSearch = searchTerm || searchLocal;

    const currentScheduleData = useMemo(() => {
        if (activeScheduleCode === 'MEDREVIEW') return MEDREVIEW_SCHEDULE;
        return activeScheduleCode === 'MEDCOF' ? MEDCOF_SCHEDULE : ESTRATEGIA_SCHEDULE;
    }, [activeScheduleCode]);

    // ... (groupedData and useEffect remain the same)

    const groupedData = useMemo(() => {
        const blocks: Record<string, Record<string, any[]>> = {};
        
        currentScheduleData.forEach(item => {
            if (finalSearch) {
                 const s = finalSearch.toLowerCase();
                 const matches = item.aula.toLowerCase().includes(s) || 
                                 item.disciplina.toLowerCase().includes(s) ||
                                 (item.professor || '').toLowerCase().includes(s);
                 if (!matches) return;
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

        const sortedBlocks = Object.keys(blocks).sort((a,b) => parseInt(a) - parseInt(b)).map(blk => ({
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

    return (
        <div className="h-full flex flex-col pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0 animate-scale-in">
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-3 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sticky top-[56px] lg:top-4 z-40 shadow-sm border border-slate-200/50 dark:border-white/5">
                <div className="flex items-center justify-between gap-2 w-full sm:w-auto">
                    <div className="relative shrink-0 flex-1 sm:flex-none">
                        <button 
                            onClick={() => setScheduleMenuOpen(!scheduleMenuOpen)}
                            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 w-full sm:w-auto bg-slate-100 dark:bg-zinc-800 rounded-xl text-xs font-bold text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                            {activeScheduleCode === 'MEDREVIEW' ? 'MedReview 2026' : activeScheduleCode === 'MEDCOF' ? 'MedCof' : 'Estratégia'}
                            <ChevronDown size={14} className={`transition-transform ${scheduleMenuOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {scheduleMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-40 sm:hidden" onClick={() => setScheduleMenuOpen(false)}></div>
                                <div className="absolute top-[calc(100%+8px)] left-0 mt-2 w-full sm:w-56 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden animate-slide-down">
                                    <button 
                                        onClick={() => { onScheduleChange('MEDCOF'); setScheduleMenuOpen(false); }} 
                                        className={`w-full text-left px-5 py-4 sm:py-3 text-sm sm:text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-between ${activeScheduleCode === 'MEDCOF' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-500/10' : 'text-slate-700 dark:text-slate-300'}`}
                                    >
                                        MedCof Extensivo
                                        {activeScheduleCode === 'MEDCOF' && <Check size={16}/>}
                                    </button>
                                    <button 
                                        onClick={() => { onScheduleChange('ESTRATEGIA'); setScheduleMenuOpen(false); }} 
                                        className={`w-full text-left px-5 py-4 sm:py-3 text-sm sm:text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-between ${activeScheduleCode === 'ESTRATEGIA' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-500/10' : 'text-slate-700 dark:text-slate-300'}`}
                                    >
                                        Estratégia MED
                                        {activeScheduleCode === 'ESTRATEGIA' && <Check size={16}/>}
                                    </button>
                                    <button 
                                        onClick={() => { onScheduleChange('MEDREVIEW'); setScheduleMenuOpen(false); }} 
                                        className={`w-full text-left px-5 py-4 sm:py-3 text-sm sm:text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-between ${activeScheduleCode === 'MEDREVIEW' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-500/10' : 'text-slate-700 dark:text-slate-300'}`}
                                    >
                                        MedReview 2026
                                        {activeScheduleCode === 'MEDREVIEW' && <Check size={16}/>}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    
                    <div className="flex gap-1 sm:gap-2 shrink-0 sm:hidden">
                        <button onClick={expandAll} className="px-2.5 py-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-zinc-800 rounded-xl transition-colors">Exp.</button>
                        <button onClick={collapseAll} className="px-2.5 py-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-zinc-800 rounded-xl transition-colors">Rec.</button>
                        <button 
                            onClick={() => setInfoOpen(!infoOpen)}
                            className={`p-2 rounded-xl transition-colors shrink-0 flex items-center justify-center ${infoOpen ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                        >
                            <Info size={14} />
                        </button>
                    </div>
                </div>
                
                <div className="flex-1 w-full relative group">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"/>
                    <input 
                        type="text" 
                        placeholder="Filtrar cronograma..." 
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

            {infoOpen && (
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 mb-6 border border-slate-200 dark:border-white/10 shadow-sm animate-slide-down">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-slate-800 dark:text-white">Modo Cronograma</h3>
                        <button onClick={() => setInfoOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={16}/></button>
                    </div>
                    <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                        <p>O modo Cronograma ajuda você a acompanhar o progresso das suas aulas de acordo com o cursinho escolhido.</p>
                        <h4 className="font-bold text-slate-800 dark:text-white mt-4 mb-2">Prioridade das Aulas (MedCof)</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-slate-500 shrink-0"></div>
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
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-purple-500 shrink-0"></div>
                                <span className="font-bold text-slate-800 dark:text-white">Aula opcional (Roxo)</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6">
                {groupedData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <MapIcon size={48} className="mb-4 text-slate-300"/>
                        <p className="text-sm font-bold text-slate-400">Nenhum bloco encontrado</p>
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

                        return (
                            <div key={block.id} className={`bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden transition-all duration-500 ${isComplete ? 'opacity-70 grayscale-[0.5]' : ''}`}>
                                <div 
                                    onClick={() => toggleBlock(block.id)}
                                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-white font-black text-lg shadow-inner">
                                            {block.id}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-lg text-slate-800 dark:text-white leading-none mb-1.5">
                                                {isNaN(Number(block.id)) ? block.id : `Bloco ${block.id}`}
                                            </h3>
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-slate-900 dark:bg-white transition-all duration-700" style={{width: `${progress}%`}}></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400">{progress}%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 transition-colors">
                                        {isCollapsed ? <ChevronDown size={20}/> : <ChevronUp size={20}/>}
                                    </div>
                                </div>

                                {!isCollapsed && (
                                    <div className="p-5 pt-0 animate-slide-up">
                                        {areas.map(areaName => {
                                            const topicTitle = `Bloco ${block.id} - ${areaName}`;
                                            const existing = existingTopics.find(t => t.title === topicTitle && !t.deleted);
                                            
                                            return (
                                                <AreaGroup 
                                                    key={areaName}
                                                    areaName={areaName}
                                                    items={block.areas[areaName]}
                                                    blockId={block.id}
                                                    scheduleProgress={scheduleProgress}
                                                    toggleCheck={toggleCheck}
                                                    onBulkComplete={handleBulkComplete}
                                                    onCreateTopic={onCreateAggregatedTopic}
                                                    existingTopic={existing}
                                                    onUpdateTopic={onUpdateTopic}
                                                    onEditTopic={onEditTopic}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
