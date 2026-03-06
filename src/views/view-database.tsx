import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Database, Search, ArrowDown, ChevronDown, ChevronUp, BarChart3, Edit, Trash2, LayoutGrid, Check, Filter, List } from 'lucide-react';
import { Topic, Simulado, UserConfig } from '../types';
import { AREAS, formatDate, getPerformanceBgLight, getPerformanceColor } from '../utils';

// --- Mini Chart Component (SVG Line Chart for Better Visuals) ---
export const MiniEvolutionChart = ({ reviews }: { reviews: any[] }) => {
    const doneReviews = useMemo(() => {
         return reviews.filter(r => r.done).sort((a,b) => a.date.localeCompare(b.date));
    }, [reviews]);

    if (doneReviews.length === 0) return (
        <div className="h-full w-full flex items-center justify-center text-[9px] text-slate-400 font-bold uppercase tracking-wide opacity-50 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-xl">
            Sem dados
        </div>
    );

    const points = doneReviews.map((r, i) => {
        const acc = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
        return { x: i, y: acc, label: r.label.split(':')[0].replace('R', 'R'), date: r.date, acc, correct: r.correct, total: r.total };
    });

    const maxPoints = Math.max(points.length - 1, 1);
    
    return (
        <div className="w-full h-full flex flex-col justify-end relative px-2 pb-2">
            {/* Background Grid Lines */}
            <div className="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none z-0 px-2 opacity-30">
                <div className="w-full h-px bg-slate-200 dark:bg-white/10 border-t border-dashed border-slate-300 dark:border-white/20"></div>
                <div className="w-full h-px bg-slate-200 dark:bg-white/10 border-t border-dashed border-slate-300 dark:border-white/20"></div>
                <div className="w-full h-px bg-slate-200 dark:bg-white/10 border-t border-dashed border-slate-300 dark:border-white/20"></div>
            </div>

            <div className="flex-1 relative w-full mt-4 mb-6">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    {/* Line */}
                    <polyline
                        points={points.map(p => `${(p.x / maxPoints) * 100}%,${100 - p.y}%`).join(' ')}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-blue-500 dark:text-blue-400 drop-shadow-sm"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    
                    {/* Points */}
                    {points.map((p, i) => {
                        let dotColor = 'text-red-500';
                        if (p.acc >= 80) dotColor = 'text-emerald-500';
                        else if (p.acc >= 60) dotColor = 'text-amber-500';

                        return (
                            <g key={i} className="group cursor-pointer">
                                <circle
                                    cx={`${(p.x / maxPoints) * 100}%`}
                                    cy={`${100 - p.y}%`}
                                    r="4"
                                    fill="currentColor"
                                    className={`${dotColor} transition-all group-hover:r-6`}
                                    strokeWidth="2"
                                    stroke="white"
                                />
                                {/* Tooltip */}
                                <foreignObject 
                                    x={`${(p.x / maxPoints) * 100 - 15}%`} 
                                    y={`${100 - p.y - 30}%`} 
                                    width="100" 
                                    height="40" 
                                    className="opacity-0 group-hover:opacity-100 transition-opacity overflow-visible pointer-events-none"
                                >
                                    <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl whitespace-nowrap flex flex-col items-center w-max -translate-x-1/2">
                                        <span>{formatDate(p.date)}</span>
                                        <span className="opacity-80 font-medium">{p.correct}/{p.total} ({p.acc}%)</span>
                                    </div>
                                </foreignObject>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* X-Axis Labels */}
            <div className="h-5 flex justify-between w-full border-t border-slate-200 dark:border-white/10 pt-1 relative">
                {points.map((p, i) => (
                    <div 
                        key={i} 
                        className="absolute text-[9px] font-bold text-slate-400 uppercase tracking-tight -translate-x-1/2"
                        style={{ left: `${(p.x / maxPoints) * 100}%` }}
                    >
                        {p.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const DatabaseView = ({ topics, onEdit, onDelete, simulados, onEditSimulado, onDeleteSimulado, config, searchTerm }: { topics: Topic[], onEdit: (t: Topic) => void, onDelete: (id: string) => void, simulados?: Simulado[], onEditSimulado?: (s: Simulado) => void, onDeleteSimulado?: (id: string) => void, config?: UserConfig, searchTerm?: string }) => {
    const [filterArea, setFilterArea] = useState('all');
    const [groupBy, setGroupBy] = useState<'none' | 'area' | 'block' | 'tag'>('area');
    const [activeTab, setActiveTab] = useState<'topics' | 'simulados'>('topics');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showLinkedLessons, setShowLinkedLessons] = useState(false);

    // Dropdown states
    const [viewMenuOpen, setViewMenuOpen] = useState(false);
    const [groupMenuOpen, setGroupMenuOpen] = useState(false);
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);

    const filteredTopics = useMemo(() => {
        return topics.filter(t => !t.deleted).filter(t => {
            if (filterArea !== 'all' && t.area !== filterArea) return false;
            if (searchTerm && !t.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        }).sort((a,b) => a.title.localeCompare(b.title));
    }, [topics, filterArea, searchTerm]);

    const groupedTopics = useMemo(() => {
        if (groupBy === 'none') return { 'Todos': filteredTopics };
        
        const groups: Record<string, Topic[]> = {};
        
        filteredTopics.forEach(t => {
            if (groupBy === 'tag') {
                if (!t.tags || t.tags.length === 0) {
                    if (!groups['Sem Disciplina']) groups['Sem Disciplina'] = [];
                    groups['Sem Disciplina'].push(t);
                } else {
                    t.tags.forEach(tag => {
                        if (!groups[tag]) groups[tag] = [];
                        groups[tag].push(t);
                    });
                }
            } else {
                let key = 'Outros';
                if (groupBy === 'area') {
                    const areaObj = AREAS.find(a => a.id === t.area);
                    key = areaObj ? areaObj.full : 'Outros';
                } else if (groupBy === 'block') {
                    key = t.source || 'Sem Bloco';
                }
                
                if (!groups[key]) groups[key] = [];
                groups[key].push(t);
            }
        });
        
        const sortedKeys = Object.keys(groups).sort();
        const sortedGroups: Record<string, Topic[]> = {};
        sortedKeys.forEach(k => sortedGroups[k] = groups[k]);
        
        return sortedGroups;
    }, [filteredTopics, groupBy]);

    const filteredSimulados = useMemo(() => {
        if (!simulados) return [];
        return simulados.filter(s => !s.deleted).filter(s => {
            if (searchTerm && !s.name.toLowerCase().includes(searchTerm.toLowerCase()) && !s.year.includes(searchTerm)) return false;
            return true;
        }).sort((a,b) => new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime());
    }, [simulados, searchTerm]);

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
            {/* Header: Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 z-20 relative">
                {/* View Switcher (Dropdown) */}
                <div className="relative w-full sm:w-auto">
                    <button 
                        onClick={() => setViewMenuOpen(!viewMenuOpen)}
                        className="w-full sm:w-48 px-4 py-3 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl flex items-center justify-between shadow-sm active:scale-95 transition-all"
                    >
                        <div className="flex items-center gap-2">
                            <Database size={16} className="text-slate-500"/>
                            <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wide">
                                {activeTab === 'topics' ? 'Matérias' : 'Simulados'}
                            </span>
                        </div>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform ${viewMenuOpen ? 'rotate-180' : ''}`}/>
                    </button>
                    
                    {viewMenuOpen && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden animate-scale-in z-30">
                            <button onClick={() => { setActiveTab('topics'); setViewMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-between text-slate-700 dark:text-slate-300">
                                <span>Matérias</span>
                                {activeTab === 'topics' && <Check size={14} className="text-blue-500"/>}
                            </button>
                            <button onClick={() => { setActiveTab('simulados'); setViewMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-between text-slate-700 dark:text-slate-300">
                                <span>Simulados</span>
                                {activeTab === 'simulados' && <Check size={14} className="text-blue-500"/>}
                            </button>
                        </div>
                    )}
                </div>

                {/* Filters & Grouping */}
                {activeTab === 'topics' && (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        {/* Group By */}
                        <div className="relative flex-1 sm:flex-none">
                            <button 
                                onClick={() => setGroupMenuOpen(!groupMenuOpen)}
                                className={`w-full sm:w-auto px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide transition-all border ${groupBy !== 'none' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 border-blue-200 dark:border-blue-500/30' : 'bg-white dark:bg-zinc-900 text-slate-500 border-black/5 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                            >
                                <LayoutGrid size={16}/>
                                <span className="hidden sm:inline">Agrupar</span>
                            </button>
                            {groupMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden animate-scale-in z-30">
                                    <button onClick={() => { setGroupBy('none'); setGroupMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                        <span>Sem Agrupar</span>
                                        {groupBy === 'none' && <Check size={14} className="text-blue-500"/>}
                                    </button>
                                    <button onClick={() => { setGroupBy('area'); setGroupMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                        <span>Por Área</span>
                                        {groupBy === 'area' && <Check size={14} className="text-blue-500"/>}
                                    </button>
                                    <button onClick={() => { setGroupBy('tag'); setGroupMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                        <span>Por Disciplina</span>
                                        {groupBy === 'tag' && <Check size={14} className="text-blue-500"/>}
                                    </button>
                                    <button onClick={() => { setGroupBy('block'); setGroupMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                        <span>Por Bloco</span>
                                        {groupBy === 'block' && <Check size={14} className="text-blue-500"/>}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Show Lessons Toggle */}
                        <div className="relative flex-1 sm:flex-none">
                            <button 
                                onClick={() => setShowLinkedLessons(!showLinkedLessons)}
                                className={`w-full sm:w-auto px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide transition-all border ${showLinkedLessons ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 border-purple-200 dark:border-purple-500/30' : 'bg-white dark:bg-zinc-900 text-slate-500 border-black/5 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                title="Mostrar Aulas Vinculadas"
                            >
                                <List size={16}/>
                                <span className="hidden sm:inline">Aulas</span>
                            </button>
                        </div>

                        {/* Filter Area */}
                        <div className="relative flex-1 sm:flex-none">
                            <button 
                                onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                                className={`w-full sm:w-auto px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide transition-all border ${filterArea !== 'all' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-emerald-200 dark:border-emerald-500/30' : 'bg-white dark:bg-zinc-900 text-slate-500 border-black/5 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                            >
                                <Filter size={16}/>
                                <span className="hidden sm:inline">Filtrar</span>
                            </button>
                            {filterMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-y-auto max-h-60 animate-scale-in z-30 custom-scrollbar">
                                    <button onClick={() => { setFilterArea('all'); setFilterMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                        <span>Todas as Áreas</span>
                                        {filterArea === 'all' && <Check size={14} className="text-blue-500"/>}
                                    </button>
                                    {AREAS.map(a => (
                                        <button key={a.id} onClick={() => { setFilterArea(a.id); setFilterMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 truncate flex items-center justify-between">
                                            <span>{a.name}</span>
                                            {filterArea === a.id && <Check size={14} className="text-blue-500"/>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <motion.div 
                className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = offset.x;
                    if (swipe < -50 && activeTab === 'topics') {
                        setActiveTab('simulados');
                    } else if (swipe > 50 && activeTab === 'simulados') {
                        setActiveTab('topics');
                    }
                }}
            >
                {activeTab === 'topics' ? (
                    Object.keys(groupedTopics).length === 0 ? (
                        <div className="p-8 text-center text-slate-400 text-xs font-bold bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5">Nenhum registro encontrado.</div>
                    ) : (
                        Object.entries(groupedTopics).map(([groupName, groupTopics]) => (
                            <div key={groupName} className="bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
                                {groupBy !== 'none' && (
                                    <div className="bg-slate-50/50 dark:bg-black/20 p-4 border-b border-slate-100 dark:border-white/5 flex items-center gap-3">
                                        <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                                        <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">{groupName}</h3>
                                        <span className="text-xs font-bold text-slate-400 bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded-md">{groupTopics.length}</span>
                                    </div>
                                )}
                                <div className="overflow-x-auto custom-scrollbar">
                                    <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-full">
                                        <thead className="bg-slate-50/50 dark:bg-black/20 sticky top-0 backdrop-blur-sm z-10">
                                            <tr>
                                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Matéria</th>
                                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell w-32">Área</th>
                                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-32">Prog.</th>
                                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-24">Nota</th>
                                                <th className="p-4 text-right w-16"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                            {groupTopics.map(t => {
                                                const completed = t.reviews.filter(r => r.done).length;
                                                const totalReviews = t.reviews.length;
                                                const progressPercentage = Math.round((completed/totalReviews)*100);
                                                
                                                const doneReviews = t.reviews.filter(r => r.done);
                                                const totalCorrect = doneReviews.reduce((acc, r) => acc + r.correct, 0);
                                                const totalPossible = doneReviews.reduce((acc, r) => acc + r.total, 0);
                                                const accuracy = totalPossible > 0 ? Math.round((totalCorrect / totalPossible) * 100) : 0;
                                                const hasData = totalPossible > 0;
                                                const isExpanded = expandedId === t.id;
                                                
                                                return (
                                                    <React.Fragment key={t.id}>
                                                        <tr onClick={() => setExpandedId(isExpanded ? null : t.id)} className={`group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${isExpanded ? 'bg-slate-50 dark:bg-white/5' : ''}`}>
                                                            <td className="p-3 sm:p-4">
                                                                <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 line-clamp-2 sm:line-clamp-1">{t.title}</div>
                                                                {t.source && <div className="text-[10px] text-slate-400 font-medium mt-0.5">{t.source}</div>}
                                                                {t.tags && t.tags.length > 0 && (
                                                                    <div className="mt-1 flex flex-wrap gap-1">
                                                                        {t.tags.map((tag, idx) => (
                                                                            <span key={idx} className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-[9px] font-bold uppercase tracking-wide">
                                                                                {tag}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                {showLinkedLessons && t.linkedLessons && t.linkedLessons.length > 0 && (
                                                                    <div className="mt-2 flex flex-wrap gap-1">
                                                                        {t.linkedLessons.map((lesson, idx) => (
                                                                            <span key={idx} className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-[9px] font-medium text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                                                                                {lesson}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="p-3 sm:p-4 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase hidden sm:table-cell">{t.area}</td>
                                                            <td className="p-3 sm:p-4">
                                                                <div className="flex items-center justify-center gap-1 sm:gap-2">
                                                                    <div className="w-8 sm:w-16 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                                        <div className="h-full bg-blue-500" style={{width: `${progressPercentage}%`}}></div>
                                                                    </div>
                                                                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-400">{progressPercentage}%</span>
                                                                </div>
                                                            </td>
                                                            <td className="p-3 sm:p-4">
                                                                <div className="flex items-center justify-center">
                                                                    {hasData ? (
                                                                        <div className={`px-2 py-0.5 sm:py-1 rounded-lg text-[10px] font-black ${getPerformanceBgLight(accuracy, 80)}`}>
                                                                            {accuracy}%
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600">-</span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="p-3 sm:p-4 text-right">
                                                                <div className="text-slate-400">{isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</div>
                                                            </td>
                                                        </tr>
                                                        {isExpanded && (
                                                            <tr className="bg-slate-50 dark:bg-white/5 animate-fade-in border-b border-slate-100 dark:border-white/5">
                                                                <td colSpan={5} className="p-0">
                                                                    <div className="p-4 sm:p-6 flex flex-col gap-6">
                                                                        
                                                                        {/* Metadata Section */}
                                                                        {(t.source || (t.linkedLessons && t.linkedLessons.length > 0)) && (
                                                                            <div className="flex flex-col gap-2 p-3 bg-white dark:bg-black/20 rounded-xl border border-slate-100 dark:border-white/5">
                                                                                {t.source && (
                                                                                    <div className="flex items-center gap-2">
                                                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Origem:</span>
                                                                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.source}</span>
                                                                                    </div>
                                                                                )}
                                                                                {t.linkedLessons && t.linkedLessons.length > 0 && (
                                                                                    <div className="flex flex-col gap-1">
                                                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aulas Vinculadas:</span>
                                                                                        <div className="flex flex-wrap gap-1">
                                                                                            {t.linkedLessons.map((lesson, idx) => (
                                                                                                <span key={idx} className="px-2 py-1 bg-slate-100 dark:bg-white/10 rounded text-[10px] font-medium text-slate-600 dark:text-slate-400">
                                                                                                    {lesson}
                                                                                                </span>
                                                                                            ))}
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}

                                                                        {/* Chart & Stats Section */}
                                                                        <div className="flex flex-col sm:flex-row gap-4">
                                                                            <div className="w-full h-64 sm:h-48 sm:flex-1 bg-white dark:bg-black/20 rounded-xl border border-black/5 dark:border-white/5 p-4 relative overflow-hidden flex flex-col min-w-0">
                                                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                                                    <BarChart3 size={12}/> Evolução de Acertos
                                                                                </div>
                                                                                <div className="flex-1 w-full relative min-h-0">
                                                                                    <MiniEvolutionChart reviews={t.reviews} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="w-full sm:w-48 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-500/20 p-4 flex flex-col justify-center items-center gap-1 shrink-0">
                                                                                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                                                                                    {totalCorrect} <span className="text-sm font-bold opacity-60 text-slate-500">/ {totalPossible}</span>
                                                                                </div>
                                                                                <span className="text-[9px] font-bold uppercase tracking-wide text-emerald-600/60 dark:text-emerald-400/60 text-center">Questões Acertadas</span>
                                                                            </div>
                                                                        </div>

                                                                        {/* Review Cards */}
                                                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                                                            {t.reviews.map((r, i) => (
                                                                                <div key={i} className="flex flex-col p-3 rounded-xl bg-white dark:bg-black/20 border border-slate-100 dark:border-white/5 transition-all hover:border-blue-500/30">
                                                                                    <div className="flex justify-between items-center mb-2">
                                                                                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{r.label}</span>
                                                                                        <span className={`text-[9px] font-bold ${r.done ? 'text-emerald-500' : 'text-slate-300'}`}>{formatDate(r.date)}</span>
                                                                                    </div>
                                                                                    <div className="mt-auto">
                                                                                        {r.done ? (
                                                                                            <div className="flex items-end justify-between">
                                                                                                <div className="text-xl font-black text-slate-800 dark:text-white leading-none">
                                                                                                    {Math.round(r.correct/r.total*100)}%
                                                                                                </div>
                                                                                                <div className="text-[9px] font-bold text-slate-400">{r.correct}/{r.total}</div>
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="h-6 flex items-center">
                                                                                                <div className="h-1 w-full bg-slate-100 dark:bg-white/5 rounded-full"></div>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>

                                                                        {/* Actions */}
                                                                        <div className="flex justify-end gap-3 pt-2 border-t border-slate-200/50 dark:border-white/5">
                                                                            <button onClick={() => onEdit(t)} className="flex items-center gap-2 px-4 py-2 hover:bg-white dark:hover:bg-white/10 rounded-lg text-xs font-bold text-slate-500 hover:text-blue-500 transition-colors">
                                                                                <Edit size={14}/> Editar
                                                                            </button>
                                                                            <button onClick={() => onDelete(t.id)} className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-xs font-bold text-slate-500 hover:text-red-500 transition-colors">
                                                                                <Trash2 size={14}/> Excluir
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    <div className="bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-full">
                                <thead className="bg-slate-50/50 dark:bg-black/20 sticky top-0 backdrop-blur-sm z-10">
                                    <tr>
                                        <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Simulado</th>
                                        <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell w-32">Ano</th>
                                        <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-32">Data</th>
                                        <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-24">Nota</th>
                                        <th className="p-4 text-right w-16"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                    {filteredSimulados.length === 0 ? (
                                        <tr><td colSpan={5} className="p-8 text-center text-slate-400 text-xs font-bold">Nenhum simulado registrado.</td></tr>
                                    ) : filteredSimulados.map(s => {
                                    const acc = s.totalQuestions > 0 ? Math.round((s.correctCount / s.totalQuestions) * 100) : 0;
                                    const performanceBg = getPerformanceBgLight(acc, config?.targetAccuracy || 80);
                                    const isExpanded = expandedId === s.id;

                                    return (
                                        <React.Fragment key={s.id}>
                                            <tr onClick={() => setExpandedId(isExpanded ? null : s.id)} className={`group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${isExpanded ? 'bg-slate-50 dark:bg-white/5' : ''}`}>
                                                <td className="p-3 sm:p-4 font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">{s.name}</td>
                                                <td className="p-3 sm:p-4 text-xs font-bold text-slate-500 hidden sm:table-cell">{s.year}</td>
                                                <td className="p-3 sm:p-4 text-xs font-bold text-slate-500 text-center">{formatDate(s.dateTaken.split('T')[0])}</td>
                                                <td className="p-3 sm:p-4">
                                                    <div className="flex items-center justify-center">
                                                        <div className={`px-2 py-0.5 sm:py-1 rounded-lg text-[10px] font-black ${performanceBg}`}>
                                                            {acc}%
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-3 sm:p-4 text-right">
                                                    <div className="text-slate-400">{isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</div>
                                                </td>
                                            </tr>
                                            {isExpanded && (
                                                <tr className="bg-slate-50 dark:bg-white/5 animate-fade-in border-b border-slate-100 dark:border-white/5">
                                                    <td colSpan={5} className="p-4">
                                                        <div className="flex flex-col gap-3">
                                                            <div className="flex flex-wrap gap-2">
                                                                {s.difficultyTopics && s.difficultyTopics.length > 0 ? (
                                                                    s.difficultyTopics.map(tid => {
                                                                        const t = topics.find(tp => tp.id === tid);
                                                                        return t ? <span key={tid} className="px-2 py-1 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-300">{t.title}</span> : null;
                                                                    })
                                                                ) : (
                                                                    <span className="text-[10px] text-slate-400 italic">Nenhum tema marcado.</span>
                                                                )}
                                                            </div>
                                                            <div className="flex gap-2 lg:hidden mt-2">
                                                                <button onClick={(e) => { e.stopPropagation(); if(onEditSimulado) onEditSimulado(s); }} className="flex-1 py-3 bg-white dark:bg-white/10 rounded-xl text-xs font-bold shadow-sm">Editar</button>
                                                                <button onClick={(e) => { e.stopPropagation(); if(onDeleteSimulado) onDeleteSimulado(s.id); }} className="flex-1 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl text-xs font-bold">Excluir</button>
                                                            </div>
                                                            <div className="hidden sm:flex justify-end gap-2">
                                                                <button onClick={() => { if(onEditSimulado) onEditSimulado(s); }} className="p-2 hover:bg-white dark:hover:bg-white/10 rounded-lg"><Edit size={16}/></button>
                                                                <button onClick={() => { if(onDeleteSimulado) onDeleteSimulado(s.id); }} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Trash2 size={16}/></button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                )}
            </motion.div>
        </div>
    );
};