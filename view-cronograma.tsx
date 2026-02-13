
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
    Check, ChevronDown, ChevronUp, Filter, LayoutGrid, List, Map as MapIcon, 
    ArrowUpDown, Info, X, Zap, Layers, Calendar, Search, CheckCircle2, Circle
} from 'lucide-react';
import { UserConfig, ScheduleProgress, ScheduleItem } from './types';
import { getAreaTheme } from './utils';
import { MEDCOF_SCHEDULE } from './medcofSchedule';
import { ESTRATEGIA_SCHEDULE } from './estrategiaSchedule';

// Priority Colors Helper
const getPriorityData = (priority: string | undefined) => {
    const p = (priority || '').toLowerCase();
    if (p.includes('azul')) return { weight: 5, bg: 'bg-blue-500', text: 'text-blue-500', bgSoft: 'bg-blue-500/10', label: 'Muito Alta' };
    if (p.includes('verde')) return { weight: 4, bg: 'bg-emerald-500', text: 'text-emerald-500', bgSoft: 'bg-emerald-500/10', label: 'Alta' };
    if (p.includes('amarelo')) return { weight: 3, bg: 'bg-amber-500', text: 'text-amber-500', bgSoft: 'bg-amber-500/10', label: 'Média' };
    if (p.includes('vermelho')) return { weight: 2, bg: 'bg-red-500', text: 'text-red-500', bgSoft: 'bg-red-500/10', label: 'Baixa' };
    if (p.includes('roxo')) return { weight: 1, bg: 'bg-purple-500', text: 'text-purple-500', bgSoft: 'bg-purple-500/10', label: 'Mínima' };
    return { weight: 0, bg: 'bg-slate-300', text: 'text-slate-400', bgSoft: 'bg-slate-100 dark:bg-white/5', label: 'N/A' };
};

// Map Area Helper
const mapAreaId = (area: string): any => {
    const a = area.toLowerCase();
    if (a.includes("clínica") || a.includes("clinica")) return 'clinica';
    if (a.includes("cirurgia")) return 'cirurgia';
    if (a.includes("pediatria")) return 'pediatria';
    if (a.includes("ginecologia") || a.includes("obstetrícia") || a.includes("g.o")) return 'go';
    if (a.includes("preventiva")) return 'preventiva';
    return 'default';
};

const ScheduleCard = React.memo(({ item, isChecked, onToggle }: { item: ScheduleItem, isChecked: boolean, onToggle: (id: string, item: any) => void }) => {
    const pData = getPriorityData(item.importancia);
    const areaId = mapAreaId(item.grandeArea);
    const theme = getAreaTheme(areaId);

    return (
        <div 
            onClick={() => onToggle(item.id, item)} 
            className={`group flex items-center gap-3 p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isChecked 
                ? 'bg-slate-50 dark:bg-white/[0.02] border-transparent opacity-60' 
                : 'bg-white dark:bg-[#1c1c1e] border-black/5 dark:border-white/5 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5'
            }`}
        >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                isChecked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-200 dark:border-white/10 group-hover:border-blue-500'
            }`}>
                {isChecked && <Check size={14} className="text-white" strokeWidth={4}/>}
            </div>
            
            <div className="flex-1 min-w-0">
                <div className={`text-xs font-bold text-slate-800 dark:text-slate-200 truncate ${isChecked ? 'line-through opacity-50' : ''}`}>
                    {item.aula}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[9px] font-black uppercase tracking-wider ${theme.text}`}>{item.disciplina}</span>
                    {item.professor && (
                        <>
                            <span className="text-[9px] text-slate-300">•</span>
                            <span className="text-[9px] font-medium text-slate-400 truncate">{item.professor}</span>
                        </>
                    )}
                </div>
            </div>

            {item.importancia && !isChecked && (
                <div className={`w-2 h-2 rounded-full ${pData.bg} shadow-sm shrink-0`} title={pData.label}></div>
            )}
        </div>
    );
});

export const CronogramaView = ({ 
    scheduleProgress, 
    setScheduleProgress, 
    config, 
    searchTerm, 
    onScheduleChange,
    onAutoCreateTopic 
}: { 
    scheduleProgress: ScheduleProgress, 
    setScheduleProgress: React.Dispatch<React.SetStateAction<ScheduleProgress>>, 
    config: UserConfig, 
    searchTerm?: string, 
    onScheduleChange: (s: 'MEDCOF' | 'ESTRATEGIA') => void,
    onAutoCreateTopic?: (item: any) => void
}) => {
    const [groupBy, setGroupBy] = useState<'bloco' | 'area'>('bloco');
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'done'>('all');
    const [autoReview, setAutoReview] = useState(true);
    const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

    const activeScheduleCode = config.activeSchedule || 'MEDCOF';
    const scheduleData = activeScheduleCode === 'MEDCOF' ? MEDCOF_SCHEDULE : ESTRATEGIA_SCHEDULE;

    // --- Dynamic Grouping Logic ---
    const structuredSchedule = useMemo(() => {
        let filtered = scheduleData.filter(item => {
            const matchesSearch = !searchTerm || 
                item.aula.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.disciplina.toLowerCase().includes(searchTerm.toLowerCase());
            
            const isDone = !!scheduleProgress[item.id];
            const matchesStatus = statusFilter === 'all' || 
                (statusFilter === 'pending' && !isDone) || 
                (statusFilter === 'done' && isDone);

            return matchesSearch && matchesStatus;
        });

        if (groupBy === 'bloco') {
            const groups: Record<string, ScheduleItem[]> = {};
            filtered.forEach(item => {
                const key = item.bloco;
                if (!groups[key]) groups[key] = [];
                groups[key].push(item);
            });
            return Object.keys(groups).sort((a,b) => parseInt(a) - parseInt(b)).map(key => ({
                id: key,
                title: `${activeScheduleCode === 'ESTRATEGIA' ? 'Semana' : 'Bloco'} ${key}`,
                items: groups[key]
            }));
        } else {
            // Group by Area
            const groups: Record<string, any> = {};
            filtered.forEach(item => {
                const areaKey = item.grandeArea;
                if (!groups[areaKey]) groups[areaKey] = { subareas: {} };
                
                const subKey = item.disciplina;
                if (!groups[areaKey].subareas[subKey]) groups[areaKey].subareas[subKey] = [];
                groups[areaKey].subareas[subKey].push(item);
            });

            return Object.keys(groups).sort().map(area => ({
                id: area,
                title: area,
                subgroups: Object.keys(groups[area].subareas).sort().map(sub => ({
                    title: sub,
                    items: groups[area].subareas[sub]
                }))
            }));
        }
    }, [scheduleData, groupBy, searchTerm, statusFilter, scheduleProgress, activeScheduleCode]);

    const toggleCheck = useCallback((id: string, item: any) => {
        const isNowChecked = !scheduleProgress[id];
        setScheduleProgress(prev => ({ ...prev, [id]: isNowChecked }));
        if (isNowChecked && autoReview && onAutoCreateTopic) {
            onAutoCreateTopic(item);
        }
    }, [scheduleProgress, autoReview, onAutoCreateTopic]);

    const toggleGroup = (id: string) => {
        setCollapsedGroups(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const expandAll = () => setCollapsedGroups(new Set());
    const collapseAll = () => setCollapsedGroups(new Set(structuredSchedule.map(g => g.id)));

    return (
        <div className="h-full flex flex-col gap-6 animate-scale-in pb-20">
            
            {/* Header / Config Bar */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500 rounded-xl text-white shadow-lg shadow-blue-500/20">
                            <MapIcon size={20}/>
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800 dark:text-white leading-none">Cronograma</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{activeScheduleCode} 2025</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white dark:bg-[#18181b] p-1 rounded-xl border border-black/5 dark:border-white/10">
                        <button 
                            onClick={() => { onScheduleChange(activeScheduleCode === 'MEDCOF' ? 'ESTRATEGIA' : 'MEDCOF'); setCollapsedGroups(new Set()); }}
                            className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center gap-2"
                        >
                            <Layers size={14}/> Mudar Curso
                        </button>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-1 bg-white dark:bg-[#18181b] p-1 rounded-xl border border-black/5 dark:border-white/10">
                        <button 
                            onClick={() => setGroupBy('bloco')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${groupBy === 'bloco' ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Calendar size={14}/> Cronológico
                        </button>
                        <button 
                            onClick={() => setGroupBy('area')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${groupBy === 'area' ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Filter size={14}/> Áreas
                        </button>
                    </div>

                    <div className="flex items-center gap-1">
                        <div className="flex bg-slate-200/50 dark:bg-white/5 p-1 rounded-xl border border-transparent dark:border-white/5">
                            {(['all', 'pending', 'done'] as const).map(f => (
                                <button 
                                    key={f}
                                    onClick={() => setStatusFilter(f)}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${statusFilter === f ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-400'}`}
                                >
                                    {f === 'all' ? 'Tudo' : f === 'pending' ? 'Faltam' : 'Feito'}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={() => setAutoReview(!autoReview)}
                            className={`p-2 rounded-xl border transition-all ${autoReview ? 'bg-purple-500 border-transparent text-white shadow-lg shadow-purple-500/20' : 'bg-white dark:bg-[#18181b] border-black/5 dark:border-white/10 text-slate-400'}`}
                            title="Auto-Review: Cria card no Dashboard ao marcar aula"
                        >
                            <Zap size={18} fill={autoReview ? "currentColor" : "none"}/>
                        </button>
                    </div>
                </div>
            </div>

            {/* List Content */}
            <div className="flex-1 space-y-6">
                {structuredSchedule.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white/50 dark:bg-white/[0.02] border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[32px]">
                        <Search size={48} strokeWidth={1} className="mb-4 opacity-20"/>
                        <p className="font-bold text-sm">Nenhuma aula encontrada</p>
                        <p className="text-xs">Tente ajustar os filtros ou a busca.</p>
                    </div>
                ) : (
                    structuredSchedule.map((group: any) => {
                        const isCollapsed = collapsedGroups.has(group.id);
                        
                        // Calculate stats for the group
                        const allItems = group.subgroups 
                            ? group.subgroups.flatMap((s: any) => s.items) 
                            : group.items;
                        const doneCount = allItems.filter((i: any) => !!scheduleProgress[i.id]).length;
                        const totalCount = allItems.length;
                        const progress = Math.round((doneCount / totalCount) * 100);
                        const areaId = groupBy === 'area' ? mapAreaId(group.id) : null;
                        const theme = areaId ? getAreaTheme(areaId) : null;

                        return (
                            <div key={group.id} className={`group/block transition-all duration-300 ${progress === 100 ? 'opacity-60 grayscale hover:opacity-100 hover:grayscale-0' : ''}`}>
                                <div 
                                    onClick={() => toggleGroup(group.id)}
                                    className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border ${
                                        theme 
                                        ? `${theme.bg} ${theme.border} hover:border-current` 
                                        : 'bg-white dark:bg-[#18181b] border-black/5 dark:border-white/10 hover:border-blue-500/20'
                                    }`}
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shadow-sm ${
                                            theme ? 'bg-white/80 dark:bg-white/10' : 'bg-slate-100 dark:bg-white/5'
                                        }`}>
                                            {progress === 100 ? <CheckCircle2 size={20} className="text-emerald-500"/> : group.id.toString().substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`text-sm font-black uppercase tracking-tight ${theme ? theme.text : 'text-slate-800 dark:text-white'}`}>
                                                {group.title}
                                            </h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="flex-1 max-w-[120px] h-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                                    <div className={`h-full transition-all duration-700 ${theme ? 'bg-current' : 'bg-blue-500'}`} style={{width: `${progress}%`}}></div>
                                                </div>
                                                <span className="text-[10px] font-bold opacity-60">{doneCount}/{totalCount} aulas</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className={`p-2 rounded-lg transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'} opacity-40 group-hover/block:opacity-100`}>
                                        <ChevronDown size={18}/>
                                    </button>
                                </div>

                                {!isCollapsed && (
                                    <div className="mt-3 grid grid-cols-1 gap-2 pl-2 animate-slide-up">
                                        {group.subgroups ? (
                                            // Nested Grouping for Estrategia / Area Mode
                                            group.subgroups.map((sub: any) => (
                                                <div key={sub.title} className="mb-4 last:mb-0">
                                                    <div className="flex items-center gap-2 mb-2 px-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20"></div>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sub.title}</span>
                                                        <div className="h-px flex-1 bg-slate-100 dark:bg-white/5"></div>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {sub.items.map((item: any) => (
                                                            <ScheduleCard key={item.id} item={item} isChecked={!!scheduleProgress[item.id]} onToggle={toggleCheck} />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            // Simple List for Bloco mode
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {group.items.map((item: any) => (
                                                    <ScheduleCard key={item.id} item={item} isChecked={!!scheduleProgress[item.id]} onToggle={toggleCheck} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Float Actions */}
            <div className="fixed bottom-24 right-6 flex flex-col gap-2 z-40 lg:bottom-10">
                <button 
                    onClick={expandAll}
                    className="p-3 bg-white dark:bg-[#1c1c1e] text-slate-600 dark:text-slate-300 rounded-full shadow-xl border border-black/5 dark:border-white/10 hover:scale-110 active:scale-95 transition-all"
                    title="Expandir Tudo"
                >
                    <ChevronDown size={20}/>
                </button>
                <button 
                    onClick={collapseAll}
                    className="p-3 bg-white dark:bg-[#1c1c1e] text-slate-600 dark:text-slate-300 rounded-full shadow-xl border border-black/5 dark:border-white/10 hover:scale-110 active:scale-95 transition-all"
                    title="Recolher Tudo"
                >
                    <ChevronUp size={20}/>
                </button>
            </div>
        </div>
    );
};
