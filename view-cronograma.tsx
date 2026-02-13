
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
    Check, ChevronDown, ChevronUp, Filter, LayoutGrid, List, Map as MapIcon, 
    Info, X, Zap, Layers, Stethoscope, Scissors, Baby, Flower2, Shield, Circle,
    Search, CheckCircle2, SlidersHorizontal, HelpCircle, SortAsc, ArrowDownUp,
    BookOpen, GraduationCap, Grid, AlignJustify
} from 'lucide-react';
import { UserConfig, ScheduleProgress } from './types';
import { MEDCOF_SCHEDULE as MEDCOF_DATA } from './medcofSchedule';
import { ESTRATEGIA_SCHEDULE as ESTRATEGIA_DATA } from './estrategiaSchedule';

// --- Constants & Helpers ---

const formatProfessorName = (name: string | undefined) => {
    if (!name) return "";
    const parts = name.split(' ').filter(Boolean);
    if (parts.length <= 1) return name;
    return `${parts[0]} ${parts.slice(1).map(p => p[0] + '.').join(' ')}`;
};

const mapAreaInfo = (area: string) => {
    const a = area ? area.toLowerCase() : "";
    if (a.includes("clínica") || a.includes("clinica")) return { id: 'clinica', icon: Stethoscope, label: 'Clínica Médica', color: 'blue' };
    if (a.includes("cirurgia")) return { id: 'cirurgia', icon: Scissors, label: 'Cirurgia', color: 'red' };
    if (a.includes("pediatria")) return { id: 'pediatria', icon: Baby, label: 'Pediatria', color: 'amber' };
    if (a.includes("ginecologia") || a.includes("obstetrícia") || a.includes("g.o") || a.includes("g.o.")) return { id: 'go', icon: Flower2, label: 'G.O.', color: 'purple' };
    if (a.includes("preventiva")) return { id: 'preventiva', icon: Shield, label: 'Preventiva', color: 'emerald' };
    return { id: 'default', icon: Circle, label: area || 'Geral', color: 'slate' };
};

const getBorderColor = (areaId: string) => {
    switch(areaId) {
        case 'cirurgia': return 'border-t-red-500';
        case 'clinica': return 'border-t-blue-500';
        case 'pediatria': return 'border-t-amber-500';
        case 'go': return 'border-t-purple-500';
        case 'preventiva': return 'border-t-emerald-500';
        default: return 'border-t-slate-500';
    }
};

const getBadgeColor = (areaId: string) => {
    switch(areaId) {
        case 'cirurgia': return 'bg-red-500/10 text-red-500';
        case 'clinica': return 'bg-blue-500/10 text-blue-500';
        case 'pediatria': return 'bg-amber-500/10 text-amber-500';
        case 'go': return 'bg-purple-500/10 text-purple-500';
        case 'preventiva': return 'bg-emerald-500/10 text-emerald-500';
        default: return 'bg-slate-500/10 text-slate-500';
    }
};

const getImportanceColor = (imp: string | undefined) => {
    const i = (imp || '').toLowerCase();
    if (i.includes('azul') || i.includes('high')) return { text: 'text-blue-500', dot: 'bg-blue-500', label: 'Muito Alta' };
    if (i.includes('verde') || i.includes('medium')) return { text: 'text-emerald-500', dot: 'bg-emerald-500', label: 'Alta' };
    if (i.includes('amarelo') || i.includes('low')) return { text: 'text-amber-500', dot: 'bg-amber-500', label: 'Média' };
    if (i.includes('vermelho')) return { text: 'text-red-500', dot: 'bg-red-500', label: 'Baixa' };
    if (i.includes('roxo')) return { text: 'text-purple-500', dot: 'bg-purple-500', label: 'Mínima' };
    return { text: 'text-slate-400', dot: 'bg-slate-500', label: 'Normal' };
};

const getImportanceOrder = (imp: string | undefined) => {
    const i = (imp || '').toLowerCase();
    if (i.includes('azul') || i.includes('high')) return 1;
    if (i.includes('verde') || i.includes('medium')) return 2;
    if (i.includes('amarelo') || i.includes('low')) return 3;
    if (i.includes('vermelho')) return 4;
    if (i.includes('roxo')) return 5;
    return 6;
};

const generateStableId = (item: any) => {
    return `${item.bloco}-${item.disciplina}-${item.aula}`.replace(/\s+/g, '-').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// --- Components ---

const ScheduleCard = React.memo(({ item, isChecked, onToggle }: { item: any, isChecked: boolean, onToggle: (id: string, item: any) => void }) => {
    const areaInfo = mapAreaInfo(item.grandeArea);
    const borderColor = getBorderColor(areaInfo.id);
    const badgeColor = getBadgeColor(areaInfo.id);
    const importance = getImportanceColor(item.importancia);

    return (
        <div 
            onClick={() => onToggle(item.id, item)}
            className={`
                relative flex flex-col justify-between p-4 rounded-xl bg-white dark:bg-[#18181b] shadow-sm border border-slate-200 dark:border-white/5 
                border-t-4 ${borderColor} cursor-pointer group transition-all duration-200 hover:shadow-md hover:-translate-y-0.5
                ${isChecked ? 'opacity-60' : 'opacity-100'}
            `}
        >
            <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${badgeColor}`}>
                    {item.disciplina}
                </span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-white/20 group-hover:border-blue-500'}`}>
                    {isChecked && <Check size={14} className="text-white" strokeWidth={3}/>}
                </div>
            </div>

            <h4 className={`text-sm font-bold leading-tight mb-4 line-clamp-3 ${isChecked ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-white'}`}>
                {item.aula}
            </h4>

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-white/5">
                <span className="text-[10px] font-semibold text-slate-400 truncate max-w-[60%]">
                    {formatProfessorName(item.professor)}
                </span>
                {item.importancia && (
                    <div className="flex items-center gap-1.5" title={`Prioridade ${importance.label}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${importance.dot}`}></div>
                        <span className={`text-[10px] font-bold uppercase ${importance.text}`}>
                            {importance.label}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
});

// --- Main Component ---

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
    // States
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [collapsedBlocks, setCollapsedBlocks] = useState<Set<string>>(new Set());
    const [autoReview, setAutoReview] = useState(false);
    
    // Filters & View Options
    const [filterArea, setFilterArea] = useState('all');
    const [groupBy, setGroupBy] = useState<'bloco' | 'area'>('bloco');
    const [sortOrder, setSortOrder] = useState<'default' | 'progress'>('default');
    
    const activeScheduleCode = config.activeSchedule || 'MEDCOF';
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = (e: React.MouseEvent, name: string) => {
        e.stopPropagation();
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    // Raw Data Memo
    const currentScheduleData = useMemo(() => {
        const raw = activeScheduleCode === 'MEDCOF' ? MEDCOF_DATA : ESTRATEGIA_DATA;
        return raw.map(item => ({ ...item, id: generateStableId(item) }));
    }, [activeScheduleCode]);

    // --- Main Grouping Logic ---
    const groupedSchedule = useMemo(() => {
        let items = currentScheduleData;

        // 1. Filter
        if (filterArea !== 'all') {
            items = items.filter(item => mapAreaInfo(item.grandeArea).id === filterArea);
        }
        if (searchTerm) {
            const s = searchTerm.toLowerCase();
            items = items.filter(item => 
                item.aula.toLowerCase().includes(s) || 
                (item.professor && item.professor.toLowerCase().includes(s)) ||
                item.disciplina.toLowerCase().includes(s)
            );
        }

        const groups: any[] = [];

        if (groupBy === 'bloco') {
            // Group by Block
            const blockMap: Record<string, { total: number, completed: number, areas: Record<string, any[]> }> = {};
            
            items.forEach(item => {
                if (!blockMap[item.bloco]) blockMap[item.bloco] = { total: 0, completed: 0, areas: {} };
                
                const b = blockMap[item.bloco];
                b.total++;
                if (scheduleProgress[item.id]) b.completed++;

                const areaKey = item.grandeArea || 'Outros';
                if (!b.areas[areaKey]) b.areas[areaKey] = [];
                b.areas[areaKey].push(item);
            });

            Object.entries(blockMap).forEach(([blockKey, data]) => {
                groups.push({
                    id: blockKey,
                    label: isNaN(Number(blockKey)) ? blockKey : (activeScheduleCode === 'ESTRATEGIA' ? `Semana ${blockKey}` : `Bloco ${blockKey}`),
                    sortKey: parseInt(blockKey) || 999,
                    total: data.total,
                    completed: data.completed,
                    progress: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
                    subGroups: Object.entries(data.areas).map(([aName, aItems]) => ({
                        name: aName,
                        info: mapAreaInfo(aName),
                        // Sort Items by Priority Color (Azul -> Verde -> Amarelo -> Vermelho -> Roxo)
                        items: aItems.sort((a, b) => getImportanceOrder(a.importancia) - getImportanceOrder(b.importancia)),
                        completed: aItems.filter(i => scheduleProgress[i.id]).length
                    })).sort((a,b) => a.name.localeCompare(b.name))
                });
            });

            // Default Sort for blocks
            groups.sort((a,b) => a.sortKey - b.sortKey);

        } else {
            // Group by Area
            const areaMap: Record<string, { total: number, completed: number, items: any[] }> = {};
            
            items.forEach(item => {
                const areaKey = item.grandeArea || 'Outros';
                if (!areaMap[areaKey]) areaMap[areaKey] = { total: 0, completed: 0, items: [] };
                
                const a = areaMap[areaKey];
                a.total++;
                if (scheduleProgress[item.id]) a.completed++;
                a.items.push(item);
            });

            Object.entries(areaMap).forEach(([areaName, data]) => {
                groups.push({
                    id: areaName,
                    label: areaName,
                    sortKey: 0, // Alphabetic sort
                    total: data.total,
                    completed: data.completed,
                    progress: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
                    subGroups: [{
                        name: 'Aulas',
                        info: mapAreaInfo(areaName),
                        items: data.items.sort((a, b) => {
                            // Sort by Block first, then by Priority
                            const blockDiff = parseInt(a.bloco) - parseInt(b.bloco);
                            if (blockDiff !== 0) return blockDiff;
                            return getImportanceOrder(a.importancia) - getImportanceOrder(b.importancia);
                        }),
                        completed: data.completed
                    }]
                });
            });

            // Default Sort for areas
            groups.sort((a,b) => a.label.localeCompare(b.label));
        }

        // Apply Sorting Override
        if (sortOrder === 'progress') {
            groups.sort((a,b) => a.progress - b.progress); // Least completed first
        }

        return groups;

    }, [searchTerm, filterArea, groupBy, sortOrder, currentScheduleData, scheduleProgress, activeScheduleCode]);

    // Initial Collapse logic (Auto-collapse completed)
    useEffect(() => {
        if (groupedSchedule.length === 0) return;
        setCollapsedBlocks(prev => {
            const next = new Set(prev);
            groupedSchedule.forEach(g => {
                if (g.progress === 100 && !next.has(g.id)) next.add(g.id);
            });
            return next;
        });
    }, [activeScheduleCode, groupBy]);

    const toggleCheck = useCallback((id: string, item: any) => {
        setScheduleProgress((prev) => {
            const isChecking = !prev[id];
            return { ...prev, [id]: isChecking };
        });
        if (!scheduleProgress[id] && autoReview && onAutoCreateTopic) {
            onAutoCreateTopic(item);
        }
    }, [scheduleProgress, autoReview, onAutoCreateTopic]);
    
    const toggleGroup = (id: string) => {
        setCollapsedBlocks(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
            {/* Header - Optimized for Mobile Sticky with Offset */}
            <div className="flex flex-col mb-4 pt-4 sticky top-14 lg:top-0 z-30 bg-[#f2f4f7] dark:bg-black transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
                        <List size={24} className="text-blue-500"/> <span className="inline">Cronograma</span>
                    </h3>
                    
                    {/* Compact Toggle Integrated with Title Row on mobile */}
                    <div className="flex bg-white dark:bg-[#18181b] p-0.5 rounded-xl border border-black/5 dark:border-white/10 shadow-sm self-start sm:self-auto">
                        <button 
                            onClick={() => onScheduleChange('MEDCOF')} 
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${activeScheduleCode === 'MEDCOF' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500'}`}
                        >
                            MEDCOF
                        </button>
                        <button 
                            onClick={() => onScheduleChange('ESTRATEGIA')} 
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${activeScheduleCode === 'ESTRATEGIA' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-500'}`}
                        >
                            ESTRATÉGIA
                        </button>
                    </div>
                </div>

                {/* Toolbar: One clean line */}
                <div className="bg-[#18181b] p-1.5 rounded-2xl flex items-center gap-1 shadow-lg shadow-black/20" ref={dropdownRef}>
                    <div className="flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar">
                        {/* 1. Filter Button */}
                        <div className="relative">
                            <button 
                                onClick={(e) => toggleDropdown(e, 'filter')} 
                                className={`h-8 px-2.5 rounded-xl text-[10px] font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${filterArea !== 'all' || activeDropdown === 'filter' ? 'bg-white text-black' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
                            >
                                <Filter size={12}/> 
                                <span>{filterArea === 'all' ? 'Todos' : filterArea}</span>
                            </button>
                            {activeDropdown === 'filter' && (
                                <div className="absolute top-full left-0 mt-2 w-40 bg-[#1c1c1e] border border-white/10 rounded-xl shadow-xl p-1 z-50 animate-scale-in origin-top-left">
                                    {['all', 'clinica', 'cirurgia', 'pediatria', 'go', 'preventiva'].map(a => (
                                        <button key={a} onClick={() => { setFilterArea(a); setActiveDropdown(null); }} className="w-full text-left px-3 py-2 text-[10px] font-bold rounded-lg text-slate-400 hover:bg-white/5 hover:text-white uppercase">
                                            {a === 'all' ? 'Todos' : a}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="w-px h-3 bg-white/10 shrink-0"></div>

                        {/* 2. Group Button */}
                        <div className="relative">
                            <button 
                                onClick={(e) => toggleDropdown(e, 'group')} 
                                className={`h-8 px-2.5 rounded-xl text-[10px] font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${activeDropdown === 'group' ? 'bg-white text-black' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
                            >
                                <Layers size={12}/> <span>{groupBy === 'bloco' ? 'Por Bloco' : 'Por Área'}</span>
                            </button>
                            {activeDropdown === 'group' && (
                                <div className="absolute top-full left-0 mt-2 w-40 bg-[#1c1c1e] border border-white/10 rounded-xl shadow-xl p-1 z-50 animate-scale-in origin-top-left">
                                    <button onClick={() => { setGroupBy('bloco'); setActiveDropdown(null); }} className="w-full text-left px-3 py-2 text-[10px] font-bold rounded-lg text-slate-400 hover:bg-white/5 hover:text-white">Por Bloco</button>
                                    <button onClick={() => { setGroupBy('area'); setActiveDropdown(null); }} className="w-full text-left px-3 py-2 text-[10px] font-bold rounded-lg text-slate-400 hover:bg-white/5 hover:text-white">Por Área</button>
                                </div>
                            )}
                        </div>
                        
                        <div className="w-px h-3 bg-white/10 shrink-0"></div>

                        {/* 3. Auto Toggle */}
                        <button 
                            onClick={() => setAutoReview(!autoReview)}
                            className={`h-8 px-2.5 rounded-xl flex items-center gap-1.5 transition-all text-[10px] font-bold whitespace-nowrap ${autoReview ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.4)]' : 'text-slate-400 hover:bg-white/10'}`}
                        >
                            <Zap size={12} fill={autoReview ? "currentColor" : "none"}/>
                            <span>{autoReview ? 'Auto Ativo' : 'Manual'}</span>
                        </button>
                    </div>

                    {/* Right Tools */}
                    <div className="flex items-center gap-1 border-l border-white/10 pl-1 shrink-0">
                        <div className="relative">
                            <button 
                                onClick={(e) => toggleDropdown(e, 'info')}
                                className={`h-8 w-8 rounded-xl flex items-center justify-center transition-all ${activeDropdown === 'info' ? 'bg-white text-black' : 'text-slate-400 hover:bg-white/10'}`}
                            >
                                <Info size={14}/>
                            </button>
                            {activeDropdown === 'info' && (
                                <div className="absolute top-full right-0 mt-2 w-64 bg-[#1c1c1e] border border-white/10 rounded-2xl shadow-xl p-4 z-50 animate-scale-in origin-top-right">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                                            <Zap size={16} fill="currentColor"/>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-[10px] uppercase tracking-wide mb-1">Modo Automático</h4>
                                            <p className="text-[9px] text-slate-400 leading-relaxed">
                                                Marking "Done" creates an AI-priority review card in your Dashboard automatically.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border-t border-white/5 pt-3 space-y-2">
                                        <div className="flex items-center justify-between text-[8px] font-bold text-slate-500 uppercase tracking-widest">Priority Legend</div>
                                        {[
                                            { c: 'blue', l: 'Very High', d: 'High incidence' },
                                            { c: 'emerald', l: 'High', d: 'Mid incidence' },
                                            { c: 'amber', l: 'Medium', d: 'Low incidence' },
                                            { c: 'red', l: 'Low', d: 'Rarely seen' }
                                        ].map(p => (
                                            <div key={p.l} className="flex justify-between items-center text-[9px]">
                                                <span className={`text-${p.c}-400 font-bold flex items-center gap-1.5`}><div className={`w-1.5 h-1.5 rounded-full bg-${p.c}-500`}></div> {p.l}</span>
                                                <span className="text-slate-500 italic">{p.d}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button 
                                onClick={(e) => toggleDropdown(e, 'sort')} 
                                className={`h-8 w-8 rounded-xl flex items-center justify-center transition-all ${sortOrder === 'progress' || activeDropdown === 'sort' ? 'bg-white text-black' : 'text-slate-400 hover:bg-white/10'}`}
                            >
                                <LayoutGrid size={14}/>
                            </button>
                            {activeDropdown === 'sort' && (
                                <div className="absolute top-full right-0 mt-2 w-40 bg-[#1c1c1e] border border-white/10 rounded-xl shadow-xl p-1 z-50 animate-scale-in origin-top-right">
                                    <button onClick={() => { setSortOrder('default'); setActiveDropdown(null); }} className={`w-full text-left px-3 py-2 text-[10px] font-bold rounded-lg mb-1 ${sortOrder === 'default' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}>PADRÃO</button>
                                    <button onClick={() => { setSortOrder('progress'); setActiveDropdown(null); }} className={`w-full text-left px-3 py-2 text-[10px] font-bold rounded-lg ${sortOrder === 'progress' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}>LEAST DONE FIRST</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pb-24 space-y-6">
                {groupedSchedule.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-400"><MapIcon size={48} className="mb-4 opacity-20"/><p className="text-sm font-bold">Nenhuma aula encontrada.</p></div>
                ) : (
                    groupedSchedule.map((group) => {
                        const isCollapsed = collapsedBlocks.has(group.id);
                        const isCompleted = group.progress === 100;

                        return (
                            <div key={group.id} className={`rounded-[20px] overflow-hidden transition-all duration-300 ${isCompleted && isCollapsed ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                                {/* Group Header */}
                                <div 
                                    className="bg-zinc-800 dark:bg-zinc-900 p-3.5 cursor-pointer hover:brightness-110 transition-all relative overflow-hidden"
                                    onClick={() => toggleGroup(group.id)}
                                >
                                    <div className="relative z-10 flex items-center justify-between">
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0">
                                                {groupBy === 'bloco' ? group.id : <Layers size={16}/>}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-black text-sm leading-none uppercase tracking-wide">{group.label}</h4>
                                                <div className="flex items-center gap-2.5 mt-1.5">
                                                    <div className="w-16 sm:w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-500 transition-all duration-500" style={{width: `${group.progress}%`}}></div>
                                                    </div>
                                                    <span className="text-[9px] font-bold text-slate-400 tracking-widest">{group.progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-slate-500">
                                            {isCollapsed ? <ChevronDown size={20}/> : <ChevronUp size={20}/>}
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>
                                </div>

                                {/* Content Body */}
                                {!isCollapsed && (
                                    <div className="bg-[#f8f9fc] dark:bg-[#09090b] p-3 sm:p-5 space-y-6 border-x border-b border-slate-200 dark:border-white/5 rounded-b-[20px]">
                                        {group.subGroups.map((sub: any) => (
                                            <div key={sub.name}>
                                                {/* Subgroup Header */}
                                                <div className="flex items-center justify-between px-1 mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <sub.info.icon size={14} className={`text-${sub.info.color}-500`}/>
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                                            {sub.name}
                                                        </span>
                                                    </div>
                                                    <span className="text-[9px] font-bold text-slate-400 bg-slate-200 dark:bg-white/5 px-2 py-0.5 rounded-full">
                                                        {sub.completed}/{sub.items.length}
                                                    </span>
                                                </div>

                                                {/* Cards Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                                    {sub.items.map((item: any) => (
                                                        <ScheduleCard 
                                                            key={item.id}
                                                            item={item}
                                                            isChecked={!!scheduleProgress[item.id]}
                                                            onToggle={toggleCheck}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
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
