
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
    Check, ChevronDown, ChevronUp, Filter, LayoutGrid, List, Map as MapIcon, 
    Info, X, Zap, Layers, Stethoscope, Scissors, Baby, Flower2, Shield, Circle
} from 'lucide-react';
import { UserConfig, ScheduleProgress } from './types';
import { getAreaTheme } from './utils';
import { MEDCOF_SCHEDULE } from './medcofSchedule';
import { ESTRATEGIA_SCHEDULE } from './estrategiaSchedule';

// Helper to abbreviate name
const formatProfessorName = (name: string | undefined) => {
    if (!name) return "";
    const parts = name.split(' ').filter(Boolean);
    if (parts.length <= 1) return name;
    return `${parts[0]} ${parts[1][0]}.`;
};

// Priority Colors Helper
const getPriorityData = (priority: string | undefined) => {
    const p = (priority || '').toLowerCase();
    if (p.includes('azul')) return { weight: 5, bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-200 dark:border-blue-500/30', bgSoft: 'bg-blue-50 dark:bg-blue-500/10', label: 'Muito Alta' };
    if (p.includes('verde')) return { weight: 4, bg: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-200 dark:border-emerald-500/30', bgSoft: 'bg-emerald-50 dark:bg-emerald-500/10', label: 'Alta' };
    if (p.includes('amarelo')) return { weight: 3, bg: 'bg-amber-500', text: 'text-amber-500', border: 'border-amber-200 dark:border-amber-500/30', bgSoft: 'bg-amber-50 dark:bg-amber-500/10', label: 'Média' };
    if (p.includes('vermelho')) return { weight: 2, bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-200 dark:border-red-500/30', bgSoft: 'bg-red-50 dark:bg-red-500/10', label: 'Baixa' };
    if (p.includes('roxo')) return { weight: 1, bg: 'bg-purple-500', text: 'text-purple-500', border: 'border-purple-200 dark:border-purple-500/30', bgSoft: 'bg-purple-50 dark:bg-purple-900/20', label: 'Mínima' };
    return { weight: 0, bg: 'bg-slate-300', text: 'text-slate-400', border: 'border-slate-200', bgSoft: 'bg-slate-100 dark:bg-white/5', label: 'N/A' };
};

// Map Area Helper & Icon
const mapAreaInfo = (area: string) => {
    if (area.includes("Clínica")) return { id: 'clinica', icon: Stethoscope, label: 'Clínica Médica' };
    if (area.includes("Cirurgia")) return { id: 'cirurgia', icon: Scissors, label: 'Cirurgia' };
    if (area.includes("Pediatria")) return { id: 'pediatria', icon: Baby, label: 'Pediatria' };
    if (area.includes("Ginecologia") || area.includes("Obstetrícia")) return { id: 'go', icon: Flower2, label: 'Ginecologia & Obstetrícia' };
    if (area.includes("Preventiva")) return { id: 'preventiva', icon: Shield, label: 'Preventiva' };
    return { id: 'default', icon: Circle, label: area };
};

// Memoized Card Component
const ScheduleCard = React.memo(({ item, isChecked, viewMode, onToggle }: { item: any, isChecked: boolean, viewMode: 'list' | 'grid', onToggle: (id: string, item: any) => void }) => {
    const pData = getPriorityData(item.importancia);
    const areaInfo = mapAreaInfo(item.grandeArea);
    const theme = getAreaTheme(areaInfo.id as any);

    if (viewMode === 'grid') {
        return (
            <div 
                onClick={() => onToggle(item.id, item)} 
                className={`relative group rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between
                    ${isChecked 
                        ? 'bg-slate-50 dark:bg-white/5 border-transparent opacity-60 grayscale-[0.5]' 
                        : 'bg-white dark:bg-zinc-900 border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200 dark:hover:border-blue-500/30'
                    }
                `}
            >
                {/* Status Indicator Stripe */}
                <div className={`absolute top-0 left-0 w-full h-1 ${isChecked ? 'bg-emerald-500' : theme.bg.replace('100','500').replace('/10','')}`}></div>

                <div className="p-4 flex flex-col gap-3 h-full">
                    {/* Header: Discipline & Checkbox */}
                    <div className="flex justify-between items-start">
                        <span className={`text-[9px] font-bold px-2 py-1 rounded-lg uppercase tracking-wide ${theme.bg} ${theme.text} truncate max-w-[75%]`}>
                            {item.disciplina}
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${isChecked ? 'bg-emerald-500 border-emerald-500 scale-110' : 'border-slate-200 dark:border-white/20 group-hover:border-blue-500 bg-white dark:bg-black/20'}`}>
                            {isChecked && <Check size={12} className="text-white" strokeWidth={3}/>}
                        </div>
                    </div>
                    
                    {/* Main Content */}
                    <div>
                        <h4 className={`font-bold text-sm leading-snug transition-colors ${isChecked ? 'text-slate-500 line-through decoration-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                            {item.aula}
                        </h4>
                    </div>
                    
                    {/* Footer: Professor & Priority */}
                    <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-50 dark:border-white/5">
                        <span className="text-[10px] font-semibold text-slate-400 truncate max-w-[50%] flex items-center gap-1">
                            {formatProfessorName(item.professor)}
                        </span>
                        {item.importancia && (
                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${pData.bgSoft} border ${pData.border} dark:border-0`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${pData.bg}`}></div>
                                <span className={`text-[9px] font-bold uppercase ${pData.text}`}>{item.importancia.split(' ')[0]}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // List Mode
    return (
        <div 
            onClick={() => onToggle(item.id, item)} 
            className={`group flex items-center gap-4 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${isChecked ? 'bg-slate-50 dark:bg-white/5 border-transparent opacity-60' : 'bg-white dark:bg-zinc-900 border-slate-100 dark:border-white/5 hover:border-blue-500/30 shadow-sm'}`}
        >
            <div className={`w-1 h-8 rounded-full ${theme.bg.replace('100', '500').replace('/10', '')}`}></div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-white/20 group-hover:border-blue-500'}`}>
                {isChecked && <Check size={12} className="text-white" strokeWidth={3}/>}
            </div>
            <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold truncate ${isChecked ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>{item.aula}</div>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold text-slate-500">{item.disciplina}</span>
                    <span className="text-[10px] text-slate-300">•</span>
                    <span className="text-[10px] text-slate-400 truncate">{formatProfessorName(item.professor)}</span>
                </div>
            </div>
            {item.importancia && (
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${pData.bgSoft} ${pData.text}`}>{item.importancia}</span>
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
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
    const [groupByArea, setGroupByArea] = useState(true);
    const [filterArea, setFilterArea] = useState('all');
    const [showLegend, setShowLegend] = useState(false);
    const [autoReview, setAutoReview] = useState(false);
    
    const [collapsedBlocks, setCollapsedBlocks] = useState<Set<string>>(new Set());
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const activeScheduleCode = config.activeSchedule || 'MEDCOF';

    useEffect(() => {
        const handleClickOutside = () => setActiveDropdown(null);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const toggleDropdown = (e: React.MouseEvent, name: string) => {
        e.stopPropagation();
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const currentScheduleData = useMemo(() => {
        return activeScheduleCode === 'MEDCOF' ? MEDCOF_SCHEDULE : ESTRATEGIA_SCHEDULE;
    }, [activeScheduleCode]);

    const groupedSchedule = useMemo(() => {
        let filtered = currentScheduleData.filter(item => {
            if (filterArea !== 'all' && mapAreaInfo(item.grandeArea).id !== filterArea) return false;
            if (searchTerm) {
                const s = searchTerm.toLowerCase();
                return item.aula.toLowerCase().includes(s) || 
                       (item.professor && item.professor.toLowerCase().includes(s)) ||
                       item.disciplina.toLowerCase().includes(s);
            }
            return true;
        });

        // Group by Block
        const groupedByBlock: Record<string, typeof currentScheduleData> = {};
        filtered.forEach(item => {
            if (!groupedByBlock[item.bloco]) groupedByBlock[item.bloco] = [];
            groupedByBlock[item.bloco].push(item);
        });

        return Object.keys(groupedByBlock).sort((a,b) => parseInt(a) - parseInt(b)).map(blockKey => {
            const items = groupedByBlock[blockKey];
            
            // If grouping by area is active, we structure it further
            let areas: { key: string, label: string, icon: any, items: any[] }[] = [];
            
            if (groupByArea) {
                const areaMap: Record<string, any[]> = {};
                items.forEach(item => {
                    const areaKey = item.grandeArea;
                    if (!areaMap[areaKey]) areaMap[areaKey] = [];
                    areaMap[areaKey].push(item);
                });
                
                areas = Object.keys(areaMap).map(areaKey => {
                    const info = mapAreaInfo(areaKey);
                    return {
                        key: areaKey,
                        label: info.label,
                        icon: info.icon,
                        items: areaMap[areaKey]
                    };
                }).sort((a,b) => a.label.localeCompare(b.label));
            }

            return {
                block: blockKey,
                items: items, // All items for progress calc
                groupedAreas: areas // For display if enabled
            };
        });
    }, [searchTerm, filterArea, currentScheduleData, groupByArea]);

    // Initial collapse logic
    useEffect(() => {
        if (groupedSchedule.length === 0) return;
        const firstActiveBlock = groupedSchedule.find(g => g.items.some(i => !scheduleProgress[i.id]));
        if (firstActiveBlock) {
            const newSet = new Set<string>();
            groupedSchedule.forEach(g => {
                if (g.block !== firstActiveBlock.block) newSet.add(g.block);
            });
            setCollapsedBlocks(newSet);
        }
    }, [activeScheduleCode]);

    const toggleCheck = useCallback((id: string, item: any) => {
        setScheduleProgress((prev) => {
            const isChecking = !prev[id];
            return { ...prev, [id]: isChecking };
        });
        
        if (!scheduleProgress[id] && autoReview && onAutoCreateTopic) {
            onAutoCreateTopic(item);
        }
    }, [scheduleProgress, autoReview, onAutoCreateTopic]);
    
    const toggleBlock = (block: string) => setCollapsedBlocks(p => { const s = new Set(p); if(s.has(block)) s.delete(block); else s.add(block); return s; });
    
    const renderItems = (items: any[]) => (
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3' : 'flex flex-col gap-2'}`}>
            {items.map((item) => (
                <ScheduleCard 
                    key={item.id} 
                    item={item} 
                    isChecked={!!scheduleProgress[item.id]} 
                    viewMode={viewMode} 
                    onToggle={toggleCheck} 
                />
            ))}
        </div>
    );

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 mb-6 sticky top-0 z-30 pt-2 pb-2 bg-[#f2f4f7] dark:bg-black/95 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <h3 className="hidden sm:flex text-2xl font-black text-slate-800 dark:text-white tracking-tight items-center gap-2">Cronograma</h3>
                        
                        <div className="relative">
                            <button onClick={(e) => toggleDropdown(e, 'schedule')} className="px-3 py-2 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                                {activeScheduleCode === 'MEDCOF' ? 'MedCof' : 'Estratégia'} <ChevronDown size={12}/>
                            </button>
                            {activeDropdown === 'schedule' && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1 z-50 animate-scale-in">
                                    <button onClick={() => onScheduleChange('MEDCOF')} className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> MedCof</button>
                                    <button onClick={() => onScheduleChange('ESTRATEGIA')} className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Estratégia</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white dark:bg-[#18181b] p-1.5 rounded-xl border border-black/5 dark:border-white/10 shadow-sm overflow-x-auto no-scrollbar">
                        <div className="relative">
                            <button onClick={(e) => toggleDropdown(e, 'filter')} className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${filterArea !== 'all' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                                <Filter size={14}/> <span>{filterArea === 'all' ? 'Todos' : filterArea}</span>
                            </button>
                            {activeDropdown === 'filter' && (
                                <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1 z-50 animate-scale-in">
                                    <button onClick={() => setFilterArea('all')} className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5">Todos</button>
                                    <button onClick={() => setFilterArea('clinica')} className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5">Clínica</button>
                                    <button onClick={() => setFilterArea('cirurgia')} className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5">Cirurgia</button>
                                    <button onClick={() => setFilterArea('pediatria')} className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5">Pediatria</button>
                                    <button onClick={() => setFilterArea('go')} className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5">G.O.</button>
                                    <button onClick={() => setFilterArea('preventiva')} className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5">Preventiva</button>
                                </div>
                            )}
                        </div>
                        
                        <div className="w-px h-4 bg-slate-200 dark:bg-white/10"></div>
                        
                        {/* Group By Area Toggle */}
                        <button 
                            onClick={() => setGroupByArea(!groupByArea)} 
                            className={`p-1.5 rounded-lg transition-all flex items-center gap-1.5 ${groupByArea ? 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`} 
                            title="Agrupar por Área"
                        >
                            <Layers size={16}/>
                            <span className="text-[10px] font-bold uppercase hidden sm:inline">Agrupar</span>
                        </button>

                        <div className="w-px h-4 bg-slate-200 dark:bg-white/10"></div>

                        <button 
                            onClick={() => setShowLegend(!showLegend)} 
                            className={`p-1.5 rounded-lg transition-all ${showLegend ? 'bg-slate-100 dark:bg-white/10 text-blue-500' : 'text-slate-400 hover:text-slate-600'}`} 
                            title="Ajuda"
                        >
                            <Info size={16}/>
                        </button>
                        <button 
                            onClick={() => setAutoReview(!autoReview)} 
                            className={`p-1.5 rounded-lg transition-all flex items-center gap-2 ${autoReview ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-slate-400 hover:text-slate-600'}`} 
                            title="Criar revisão automaticamente"
                        >
                            <Zap size={16} fill={autoReview ? "currentColor" : "none"}/>
                            {autoReview && <span className="text-[10px] font-bold uppercase mr-1">Auto</span>}
                        </button>
                        
                        <div className="w-px h-4 bg-slate-200 dark:bg-white/10"></div>
                        
                        <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}><LayoutGrid size={16}/></button>
                        <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}><List size={16}/></button>
                    </div>
                </div>

                {/* Legend Panel */}
                {showLegend && (
                    <div className="flex flex-col gap-3 p-4 bg-white dark:bg-[#18181b] border border-black/5 dark:border-white/10 rounded-xl animate-scale-in shadow-sm relative">
                        <button onClick={() => setShowLegend(false)} className="absolute top-2 right-2 p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full"><X size={14}/></button>
                        
                        <div className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-white/5">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400 mt-0.5">
                                <Zap size={16} fill="currentColor"/>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-800 dark:text-white">Modo Automático</h4>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                                    Quando <span className="font-bold text-purple-500">Auto</span> está ativo, marcar uma aula cria automaticamente um card de revisão no Dashboard com a prioridade correta (Azul = Alta).
                                </p>
                            </div>
                        </div>

                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Prioridades:</span>
                            <div className="flex flex-wrap gap-2">
                                {['Azul: Muito Alta', 'Verde: Alta', 'Amarelo: Média', 'Vermelho: Baixa', 'Roxo: Mínima'].map(label => {
                                    const color = label.split(':')[0].toLowerCase();
                                    const bg = color === 'azul' ? 'bg-blue-500' : color === 'verde' ? 'bg-emerald-500' : color === 'amarelo' ? 'bg-amber-500' : color === 'vermelho' ? 'bg-red-500' : 'bg-purple-500';
                                    return (
                                        <div key={label} className="flex items-center gap-1.5 bg-slate-50 dark:bg-white/5 px-2 py-1 rounded-md border border-slate-100 dark:border-white/5">
                                            <div className={`w-2 h-2 rounded-full ${bg}`}></div>
                                            <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 uppercase">{label.split(':')[1]}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pb-20 space-y-6">
                {groupedSchedule.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-400"><MapIcon size={48} className="mb-4 opacity-20"/><p className="text-sm font-bold">Nenhuma aula encontrada.</p></div>
                ) : (
                    groupedSchedule.map((group) => {
                        const isCollapsed = collapsedBlocks.has(group.block);
                        const completedCount = group.items.filter(i => scheduleProgress[i.id]).length;
                        const totalCount = group.items.length;
                        const progress = Math.round((completedCount / totalCount) * 100);
                        const isCompleted = progress === 100;
                        const blockLabel = isNaN(Number(group.block)) ? group.block : (activeScheduleCode === 'ESTRATEGIA' ? 'Semana' : 'Bloco');

                        return (
                            <div key={group.block} className={`relative transition-all duration-500 ${isCompleted ? 'opacity-60' : ''}`}>
                                {/* Sticky Block Header */}
                                <div 
                                    className="sticky top-0 z-20 mb-3 cursor-pointer group/header"
                                    onClick={() => toggleBlock(group.block)}
                                >
                                    <div className="absolute inset-0 bg-[#f2f4f7]/90 dark:bg-black/90 backdrop-blur-xl -mx-4"></div>
                                    <div className="relative flex items-center justify-between p-2 rounded-xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 shadow-sm hover:border-blue-300 dark:hover:border-blue-500/30 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-black shadow-sm transition-colors ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white'}`}>
                                                {isCompleted ? <Check size={20} strokeWidth={3}/> : group.block}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-base text-slate-800 dark:text-white leading-none mb-1">{blockLabel} {group.block}</h4>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                        <div className={`h-full transition-all duration-700 ${isCompleted ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{width: `${progress}%`}}></div>
                                                    </div>
                                                    <span className={`text-[10px] font-bold ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`}>{progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                                            {isCollapsed ? <ChevronDown size={18} className="text-slate-400"/> : <ChevronUp size={18} className="text-slate-400"/>}
                                        </button>
                                    </div>
                                </div>

                                {!isCollapsed && (
                                    <div className="animate-slide-up space-y-6 pl-1">
                                        {groupByArea && group.groupedAreas ? (
                                            // Grouped by Area View
                                            group.groupedAreas.map((areaGroup) => {
                                                const AreaIcon = areaGroup.icon;
                                                const areaTheme = getAreaTheme(mapAreaInfo(areaGroup.key).id as any);
                                                const areaCompleted = areaGroup.items.filter(i => scheduleProgress[i.id]).length;
                                                const areaTotal = areaGroup.items.length;
                                                const areaProgress = Math.round((areaCompleted / areaTotal) * 100);

                                                return (
                                                    <div key={areaGroup.key} className="flex flex-col gap-3">
                                                        {/* Area Sub-Header */}
                                                        <div className="flex items-center gap-2 pb-1 border-b border-slate-200/50 dark:border-white/5">
                                                            <div className={`p-1.5 rounded-lg ${areaTheme.bg} ${areaTheme.text}`}>
                                                                <AreaIcon size={14} />
                                                            </div>
                                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide flex-1">{areaGroup.label}</span>
                                                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full">
                                                                {areaCompleted}/{areaTotal}
                                                            </span>
                                                        </div>
                                                        {renderItems(areaGroup.items)}
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            // Flat View
                                            renderItems(group.items)
                                        )}
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
