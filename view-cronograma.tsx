
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
    Check, ChevronDown, ChevronUp, Filter, LayoutGrid, List, Map as MapIcon, ArrowUpDown, Info, X, Zap, Search, Plus
} from 'lucide-react';
import { UserConfig, ScheduleProgress, AreaType, Topic, ImportanceType } from './types';
import { getAreaTheme, getTodayStr } from './utils';
import { MEDCOF_SCHEDULE } from './medcofSchedule';
import { ESTRATEGIA_SCHEDULE } from './estrategiaSchedule';

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
    return { dot: 'bg-slate-300', text: 'text-slate-400', bg: 'bg-slate-100 dark:bg-white/5' };
};

const mapArea = (area: string): AreaType => {
    if (area.includes("Clínica")) return 'clinica';
    if (area.includes("Cirurgia")) return 'cirurgia';
    if (area.includes("Pediatria")) return 'pediatria';
    if (area.includes("Ginecologia") || area.includes("Obstetrícia")) return 'go';
    if (area.includes("Preventiva")) return 'preventiva';
    return 'clinica';
};

// --- Components ---

const LessonItem = React.memo(({ item, isChecked, onToggle }: { item: any, isChecked: boolean, onToggle: (id: string) => void }) => {
    const pColor = getPriorityColor(item.importancia);
    
    return (
        <div 
            onClick={() => onToggle(item.id)}
            className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer group ${isChecked ? 'bg-slate-50 dark:bg-black/20 border-transparent opacity-60' : 'bg-white dark:bg-zinc-900 border-slate-100 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500/30'}`}
        >
            <div className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-white/20 group-hover:border-blue-500'}`}>
                {isChecked && <Check size={12} className="text-white" strokeWidth={3}/>}
            </div>
            <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold text-slate-800 dark:text-white leading-snug ${isChecked ? 'line-through text-slate-400' : ''}`}>
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
    onCreateTopic: (title: string, area: AreaType, lessons: string[], priority: ImportanceType) => void;
    existingTopic?: Topic;
}

const AreaGroup: React.FC<AreaGroupProps> = ({ 
    areaName, 
    items, 
    blockId, 
    scheduleProgress, 
    toggleCheck, 
    onBulkComplete,
    onCreateTopic, 
    existingTopic 
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
        
        let maxWeight = 0;
        let finalPriority: ImportanceType = 'medium';

        items.forEach(i => {
            const w = getPriorityWeight(i.importancia);
            if (w > maxWeight) {
                maxWeight = w;
                if (w >= 5) finalPriority = 'high';
                else if (w >= 4) finalPriority = 'high';
                else if (w <= 2) finalPriority = 'low';
                else finalPriority = 'medium';
            }
        });

        const hasBlue = items.some(i => (i.importancia || '').toLowerCase().includes('azul'));
        if (hasBlue) finalPriority = 'high';
        else {
             const hasGreen = items.some(i => (i.importancia || '').toLowerCase().includes('verde'));
             finalPriority = hasGreen ? 'medium' : 'low';
        }

        const topicTitle = `Bloco ${blockId} - ${areaName}`;
        const lessonNames = items.map(i => i.aula);
        
        // Auto-complete all lessons in this group
        const allIds = items.map(i => i.id);
        onBulkComplete(allIds);

        onCreateTopic(topicTitle, mappedArea, lessonNames, finalPriority);
    };

    return (
        <div className="mb-4 last:mb-0">
            <div className={`p-4 rounded-2xl border bg-slate-50/50 dark:bg-white/[0.02] border-slate-200/60 dark:border-white/5`}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${theme.bg} ${theme.text} border border-transparent`}>
                            {areaName}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">{completedCount}/{totalCount}</span>
                    </div>
                    
                    {/* Create/Update Topic Button */}
                    <button 
                        onClick={handleCreateClick}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all shadow-sm 
                            ${topicStatus === 'created' 
                                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30' 
                                : 'bg-white dark:bg-zinc-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-blue-400'
                            }`}
                    >
                        {topicStatus === 'created' ? <Check size={12}/> : <Plus size={12}/>}
                        {topicStatus === 'created' ? 'Matéria Criada' : 'Criar Matéria'}
                    </button>
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
    existingTopics
}: { 
    scheduleProgress: ScheduleProgress, 
    setScheduleProgress: React.Dispatch<React.SetStateAction<ScheduleProgress>>, 
    config: UserConfig, 
    searchTerm?: string, 
    onScheduleChange: (s: 'MEDCOF' | 'ESTRATEGIA') => void,
    onCreateAggregatedTopic: (title: string, area: AreaType, lessons: string[], priority: ImportanceType) => void,
    existingTopics: Topic[]
}) => {
    const [collapsedBlocks, setCollapsedBlocks] = useState<Set<string>>(new Set());
    const [searchLocal, setSearchLocal] = useState('');
    const activeScheduleCode = config.activeSchedule || 'MEDCOF';

    const finalSearch = searchTerm || searchLocal;

    const currentScheduleData = useMemo(() => {
        return activeScheduleCode === 'MEDCOF' ? MEDCOF_SCHEDULE : ESTRATEGIA_SCHEDULE;
    }, [activeScheduleCode]);

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

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
            <div className="glass-panel p-2 rounded-2xl mb-6 flex flex-col sm:flex-row gap-2 sticky top-[72px] lg:top-4 z-40 shadow-sm border border-white/40 dark:border-white/10">
                <div className="flex bg-slate-100 dark:bg-black/40 rounded-xl p-1 shrink-0">
                    <button 
                        onClick={() => onScheduleChange('MEDCOF')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeScheduleCode === 'MEDCOF' ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        MedCof
                    </button>
                    <button 
                        onClick={() => onScheduleChange('ESTRATEGIA')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeScheduleCode === 'ESTRATEGIA' ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Estratégia
                    </button>
                </div>
                
                <div className="flex-1 relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                    <input 
                        type="text" 
                        placeholder="Filtrar cronograma..." 
                        value={searchLocal}
                        onChange={(e) => setSearchLocal(e.target.value)}
                        className="w-full h-full bg-slate-50 dark:bg-black/20 rounded-xl pl-9 pr-4 text-xs font-bold outline-none border border-transparent focus:border-blue-500/30 transition-all"
                    />
                </div>
            </div>

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
                                                    <div className="h-full bg-blue-500 transition-all duration-700" style={{width: `${progress}%`}}></div>
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
