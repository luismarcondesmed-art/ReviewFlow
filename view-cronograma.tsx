
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
    Check, ChevronDown, ChevronUp, Filter, LayoutGrid, List, Map as MapIcon, ArrowUpDown, Info, X, Zap
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
    // Return First Name + First letter of second name
    return `${parts[0]} ${parts[1][0]}.`;
};

// Priority Colors Helper
const getPriorityData = (priority: string | undefined) => {
    const p = (priority || '').toLowerCase();
    // Weight 5 = Highest Priority
    if (p.includes('azul')) return { weight: 5, bg: 'bg-blue-500', text: 'text-blue-500', bgSoft: 'bg-blue-500/10', label: 'Muito Alta' };
    if (p.includes('verde')) return { weight: 4, bg: 'bg-emerald-500', text: 'text-emerald-500', bgSoft: 'bg-emerald-500/10', label: 'Alta' };
    if (p.includes('amarelo')) return { weight: 3, bg: 'bg-amber-500', text: 'text-amber-500', bgSoft: 'bg-amber-500/10', label: 'Média' };
    if (p.includes('vermelho')) return { weight: 2, bg: 'bg-red-500', text: 'text-red-500', bgSoft: 'bg-red-500/10', label: 'Baixa' };
    if (p.includes('roxo')) return { weight: 1, bg: 'bg-purple-500', text: 'text-purple-500', bgSoft: 'bg-purple-500/10', label: 'Mínima' };
    return { weight: 0, bg: 'bg-slate-300', text: 'text-slate-400', bgSoft: 'bg-slate-100 dark:bg-white/5', label: 'N/A' };
};

// Map Area Helper
const mapArea = (area: string): string => {
    if (area.includes("Clínica")) return 'clinica';
    if (area.includes("Cirurgia")) return 'cirurgia';
    if (area.includes("Pediatria")) return 'pediatria';
    if (area.includes("Ginecologia") || area.includes("Obstetrícia")) return 'go';
    if (area.includes("Preventiva")) return 'preventiva';
    return 'default';
};

// Memoized Card Component
const ScheduleCard = React.memo(({ item, isChecked, viewMode, onToggle }: { item: any, isChecked: boolean, viewMode: 'list' | 'grid', onToggle: (id: string, item: any) => void }) => {
    const pData = getPriorityData(item.importancia);
    const theme = getAreaTheme(mapArea(item.grandeArea) as any);

    if (viewMode === 'grid') {
        return (
            <div 
                onClick={() => onToggle(item.id, item)} 
                className={`relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group
                    ${isChecked 
                        ? 'bg-slate-50 dark:bg-white/5 border-transparent opacity-60' 
                        : 'bg-white dark:bg-zinc-900 border-black/5 dark:border-white/5 hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-blue-900/10'
                    }
                `}
            >
                {/* Color Strip */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${theme.bg.replace('100', '500').replace('/10', '')}`}></div>
                
                <div className="pl-3 flex flex-col h-full gap-3">
                    <div className="flex justify-between items-start">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${theme.bg} ${theme.text} w-fit`}>
                            {item.disciplina}
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-white/20 group-hover:border-blue-500'}`}>
                            {isChecked && <Check size={12} className="text-white" strokeWidth={3}/>}
                        </div>
                    </div>
                    
                    <h4 className={`font-bold text-sm text-slate-800 dark:text-white leading-snug ${isChecked ? 'line-through decoration-slate-400 text-slate-400' : ''}`}>
                        {item.aula}
                    </h4>
                    
                    <div className="mt-auto pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                        <span className="text-[10px] font-bold text-slate-400 truncate max-w-[120px]">
                            {formatProfessorName(item.professor)}
                        </span>
                        {item.importancia && (
                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${pData.bgSoft}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${pData.bg}`}></div>
                                <span className={`text-[9px] font-bold uppercase ${pData.text}`}>{item.importancia}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div 
            onClick={() => onToggle(item.id, item)} 
            className={`group flex items-center gap-4 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${isChecked ? 'bg-slate-50 dark:bg-white/5 border-transparent opacity-60' : 'bg-white dark:bg-zinc-900 border-black/5 dark:border-white/5 hover:border-blue-500/30'}`}
        >
            <div className={`w-1 h-8 rounded-full ${theme.bg.replace('100', '500').replace('/10', '')}`}></div>
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-white/20 group-hover:border-blue-500'}`}>
                {isChecked && <Check size={12} className="text-white" strokeWidth={3}/>}
            </div>
            <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold text-slate-800 dark:text-white truncate ${isChecked ? 'line-through text-slate-400' : ''}`}>{item.aula}</div>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold text-slate-400">{item.disciplina}</span>
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
    const [filterArea, setFilterArea] = useState('all');
    const [sortBy, setSortBy] = useState<'default' | 'priority' | 'area'>('default');
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
            if (filterArea !== 'all' && mapArea(item.grandeArea) !== filterArea) return false;
            if (searchTerm) {
                const s = searchTerm.toLowerCase();
                return item.aula.toLowerCase().includes(s) || 
                       (item.professor && item.professor.toLowerCase().includes(s)) ||
                       item.disciplina.toLowerCase().includes(s);
            }
            return true;
        });

        const grouped: Record<string, typeof currentScheduleData> = {};
        filtered.forEach(item => {
            if (!grouped[item.bloco]) grouped[item.bloco] = [];
            grouped[item.bloco].push(item);
        });

        Object.keys(grouped).forEach(key => {
            grouped[key].sort((a, b) => {
                if (sortBy === 'priority') {
                    const wA = a.importancia ? getPriorityData(a.importancia).weight : 0;
                    const wB = b.importancia ? getPriorityData(b.importancia).weight : 0;
                    return wB - wA;
                }
                if (sortBy === 'area') return a.grandeArea.localeCompare(b.grandeArea);
                return a.disciplina.localeCompare(b.disciplina);
            });
        });

        return Object.keys(grouped).sort((a,b) => parseInt(a) - parseInt(b)).map(blockKey => ({
            block: blockKey,
            items: grouped[blockKey]
        }));
    }, [searchTerm, filterArea, sortBy, currentScheduleData]);

    // Optimize initial collapse: only on mount or major schedule change
    useEffect(() => {
        if (groupedSchedule.length === 0) return;
        // Check if user has interacted with blocks already? If collapsedBlocks is empty, do logic.
        // Actually, we want to auto-collapse completed or future blocks initially.
        // Let's just expand the first block that has uncompleted items.
        
        const firstActiveBlock = groupedSchedule.find(g => g.items.some(i => !scheduleProgress[i.id]));
        if (firstActiveBlock) {
            const newSet = new Set<string>();
            groupedSchedule.forEach(g => {
                if (g.block !== firstActiveBlock.block) newSet.add(g.block);
            });
            setCollapsedBlocks(newSet);
        }
    }, [activeScheduleCode]); // Changed dependency to prevent re-collapsing on every check

    const toggleCheck = useCallback((id: string, item: any) => {
        setScheduleProgress((prev) => {
            const isChecking = !prev[id];
            // Side effect needs to be handled carefully. 
            // We can't access `autoReview` state here safely inside the setter if we want to be pure.
            // But for this simple app, we can just trigger the callback outside.
            return { ...prev, [id]: isChecking };
        });
        
        // This is a bit dirty (using state value directly), but standard for this scale.
        // Ideally we would use an effect but that's overkill.
        if (!scheduleProgress[id] && autoReview && onAutoCreateTopic) {
            onAutoCreateTopic(item);
        }
    }, [scheduleProgress, autoReview, onAutoCreateTopic]);
    
    const toggleBlock = (block: string) => setCollapsedBlocks(p => { const s = new Set(p); if(s.has(block)) s.delete(block); else s.add(block); return s; });
    
    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <h3 className="hidden sm:flex text-2xl font-black text-slate-800 dark:text-white tracking-tight items-center gap-2">Cronograma</h3>
                        <div className="relative">
                            <button onClick={(e) => toggleDropdown(e, 'schedule')} className="px-3 py-1.5 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-white/10 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
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

                    <div className="flex items-center gap-2 bg-white dark:bg-[#18181b] p-1 rounded-xl border border-black/5 dark:border-white/10 shadow-sm">
                        <div className="relative">
                            <button onClick={(e) => toggleDropdown(e, 'filter')} className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${filterArea !== 'all' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}>
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
                        <button 
                            onClick={() => setShowLegend(!showLegend)} 
                            className={`p-1.5 rounded-lg transition-all ${showLegend ? 'bg-slate-100 dark:bg-white/10 text-blue-500' : 'text-slate-400 hover:text-slate-600'}`} 
                            title="Legenda e Ajuda"
                        >
                            <Info size={16}/>
                        </button>
                        <button 
                            onClick={() => setAutoReview(!autoReview)} 
                            className={`p-1.5 rounded-lg transition-all flex items-center gap-2 ${autoReview ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-slate-400 hover:text-slate-600'}`} 
                            title="Criar revisão automaticamente ao concluir"
                        >
                            <Zap size={16} fill={autoReview ? "currentColor" : "none"}/>
                            {autoReview && <span className="text-[10px] font-bold uppercase mr-1">Auto</span>}
                        </button>
                        <div className="w-px h-4 bg-slate-200 dark:bg-white/10"></div>
                        <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}><LayoutGrid size={16}/></button>
                        <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}><List size={16}/></button>
                    </div>
                </div>

                {/* Info Panel / Legend */}
                {showLegend && (
                    <div className="flex flex-col gap-3 p-4 bg-white dark:bg-[#18181b] border border-black/5 dark:border-white/10 rounded-xl animate-scale-in shadow-sm relative">
                        <button onClick={() => setShowLegend(false)} className="absolute top-2 right-2 p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full"><X size={14}/></button>
                        
                        {/* Auto Mode Explanation */}
                        <div className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-white/5">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400 mt-0.5">
                                <Zap size={16} fill="currentColor"/>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-800 dark:text-white">Modo Automático</h4>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                                    Quando o botão <span className="font-bold text-purple-500">Auto</span> está ativo no topo, marcar uma aula como concluída cria automaticamente um card de revisão no seu Dashboard.
                                </p>
                            </div>
                        </div>

                        {/* Priority Legend */}
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Prioridades:</span>
                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-md border border-blue-100 dark:border-blue-500/20">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase">Muito Alta</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-100 dark:border-emerald-500/20">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Alta</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-md border border-amber-100 dark:border-amber-500/20">
                                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                    <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase">Média</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/10 px-2 py-1 rounded-md border border-red-100 dark:border-red-500/20">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <span className="text-[9px] font-bold text-red-600 dark:text-red-400 uppercase">Baixa</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-900/10 px-2 py-1 rounded-md border border-purple-100 dark:border-purple-500/20">
                                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                    <span className="text-[9px] font-bold text-purple-600 dark:text-purple-400 uppercase">Mínima</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pb-10 space-y-8">
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
                            <div key={group.block} className={`relative transition-all duration-500 ${isCompleted ? 'opacity-50 hover:opacity-100 grayscale' : ''}`}>
                                <div 
                                    className="sticky top-0 z-20 bg-[#f2f4f7]/80 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 py-4 mb-4 flex items-center justify-between cursor-pointer group/header"
                                    onClick={() => toggleBlock(group.block)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white font-black text-sm shadow-sm">{group.block}</div>
                                        <div>
                                            <h4 className="font-black text-lg text-slate-800 dark:text-white leading-none mb-1">{blockLabel} {group.block}</h4>
                                            <div className="flex items-center gap-2">
                                                <div className="w-32 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500 transition-all duration-700" style={{width: `${progress}%`}}></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400">{progress}%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                                        {isCollapsed ? <ChevronDown size={18} className="text-slate-500"/> : <ChevronUp size={18} className="text-slate-500"/>}
                                    </button>
                                </div>

                                {!isCollapsed && (
                                    <div className={`animate-slide-up ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3' : 'flex flex-col gap-2'}`}>
                                        {group.items.map((item) => (
                                            <ScheduleCard 
                                                key={item.id} 
                                                item={item} 
                                                isChecked={!!scheduleProgress[item.id]} 
                                                viewMode={viewMode} 
                                                onToggle={toggleCheck} 
                                            />
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
