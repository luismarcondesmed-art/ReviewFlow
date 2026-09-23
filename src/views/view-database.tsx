import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, ArrowDown, ChevronDown, ChevronUp, BarChart3, Edit, Trash2, LayoutGrid, Check, Filter, List, Kanban, Bookmark, ClipboardList, GraduationCap, Stethoscope, Compass, Sparkles, BookOpen } from 'lucide-react';
import { Topic, Simulado, UserConfig } from '../types';
import { AREAS, formatDate, getPerformanceBgLight, getPerformanceColor, getTopicTrack, getTrackBadgeInfo, getAreaTheme } from '../utils';

// --- Mini Chart Component (SVG Line Chart for Better Visuals) ---
export const MiniEvolutionChart = ({ reviews }: { reviews: any[] }) => {
    const [tooltipData, setTooltipData] = useState<{ p: any, rect: DOMRect } | null>(null);

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
                <div className="w-full h-px bg-slate-200 dark:bg-slate-200/10 border-t border-dashed border-slate-300 dark:border-white/20"></div>
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
                        className="text-slate-500 dark:text-slate-400 drop-shadow-sm"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    
                    {/* Points */}
                    {points.map((p, i) => {
                        let dotColor = 'text-red-500';
                        if (p.acc >= 80) dotColor = 'text-emerald-500';
                        else if (p.acc >= 60) dotColor = 'text-amber-500';

                        return (
                            <g 
                                key={i} 
                                className="group cursor-pointer"
                                onMouseEnter={(e) => {
                                    setTooltipData({ p, rect: e.currentTarget.getBoundingClientRect() });
                                }}
                                onMouseLeave={() => setTooltipData(null)}
                            >
                                <circle
                                    cx={`${(p.x / maxPoints) * 100}%`}
                                    cy={`${100 - p.y}%`}
                                    r="4"
                                    fill="currentColor"
                                    className={`${dotColor} transition-all group-hover:r-6`}
                                    strokeWidth="2"
                                    stroke="white"
                                />
                            </g>
                        );
                    })}
                </svg>
                
                {tooltipData && createPortal(
                    <div 
                        className="fixed z-[9999] pointer-events-none animate-fade-in"
                        style={{
                            top: tooltipData.rect.top - 8,
                            left: tooltipData.rect.left + tooltipData.rect.width / 2,
                            transform: 'translate(-50%, -100%)'
                        }}
                    >
                        <div className="bg-slate-800 text-slate-100 text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl whitespace-nowrap flex flex-col items-center">
                            <span>{formatDate(tooltipData.p.date)}</span>
                            <span className="opacity-80 font-medium">{tooltipData.p.correct}/{tooltipData.p.total} ({tooltipData.p.acc}%)</span>
                        </div>
                    </div>,
                    document.body
                )}
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

const KanbanBoard = ({ topics, onEdit }: { topics: Topic[], onEdit: (t: Topic) => void }) => {
    const columns = [
        { id: 'backlog', title: 'A Fazer', color: 'bg-slate-100 dark:bg-zinc-800' },
        { id: 'studying', title: 'Estudando', color: 'bg-blue-50 dark:bg-blue-900/20' },
        { id: 'reviewing', title: 'Revisando', color: 'bg-amber-50 dark:bg-amber-900/20' },
        { id: 'mastered', title: 'Dominado', color: 'bg-emerald-50 dark:bg-emerald-900/20' }
    ];

    const getColumnTopics = (statusId: string) => {
        return topics.filter(t => (t.status || 'backlog') === statusId);
    };

    return (
        <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-4 h-full min-h-[500px]">
            {columns.map(col => {
                const colTopics = getColumnTopics(col.id);
                return (
                    <div key={col.id} className={`flex-1 min-w-[280px] rounded-2xl p-4 flex flex-col gap-3 ${col.color} border border-black/5 dark:border-white/5`}>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs">{col.title}</h3>
                            <span className="text-xs font-bold text-slate-500 bg-white dark:bg-black/20 px-2 py-1 rounded-lg shadow-sm">{colTopics.length}</span>
                        </div>
                        <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar flex-1 pr-1">
                            <AnimatePresence>
                            {colTopics.map((t, index) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={t.id} 
                                    onClick={() => onEdit(t)}
                                    className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-white/10 cursor-pointer hover:border-blue-300 dark:hover:border-blue-500/50 hover:scale-[1.01] hover:-translate-y-0.5 transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{t.area}</span>
                                        {t.importance === 'extreme' && <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>}
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t.title}</h4>
                                    {t.source && <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mb-2">{t.source}</p>}
                                    {t.linkedLessons && t.linkedLessons.length > 0 && (
                                        <div className="mb-3 flex flex-wrap gap-1">
                                            {t.linkedLessons.map((lesson, idx) => (
                                                <span key={idx} className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-[9px] font-medium text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                                                    {lesson.replace(/ \(~\d+q\)$/, '')}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-white/5">
                                        <div className="flex items-center gap-1">
                                            <div className="w-12 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600" style={{width: `${Math.round((t.reviews.filter(r => r.done).length / Math.max(t.reviews.length, 1)) * 100)}%`}}></div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400">
                                            {t.reviews.filter(r => r.done).length}/{t.reviews.length}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                            </AnimatePresence>
                            {colTopics.length === 0 && (
                                <div className="text-center p-4 text-xs font-bold text-slate-400 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl flex flex-col items-center justify-center gap-2">
                                    <Bookmark size={20} className="text-slate-300 dark:text-slate-600" />
                                    Vazio
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const DatabaseView = ({ 
    topics, 
    onEdit, 
    onDelete, 
    simulados, 
    onEditSimulado, 
    onDeleteSimulado, 
    config, 
    searchTerm,
    onUpdateTopic
}: { 
    topics: Topic[], 
    onEdit: (t: Topic) => void, 
    onDelete: (id: string) => void, 
    simulados?: Simulado[], 
    onEditSimulado?: (s: Simulado) => void, 
    onDeleteSimulado?: (id: string) => void, 
    config?: UserConfig, 
    searchTerm?: string,
    onUpdateTopic?: (t: Topic) => void
}) => {
    const [filterArea, setFilterArea] = useState('all');
    const [trackFilter, setTrackFilter] = useState<'all' | 'concurso' | 'residencia'>('all');
    const [groupBy, setGroupBy] = useState<'none' | 'track' | 'area' | 'block' | 'tag'>('track');
    const [activeTab, setActiveTab] = useState<'topics' | 'simulados'>('topics');
    const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Dropdown states
    const [viewMenuOpen, setViewMenuOpen] = useState(false);
    const [groupMenuOpen, setGroupMenuOpen] = useState(false);
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const trackCounts = useMemo(() => {
        const active = topics.filter(t => !t.deleted);
        let concurso = 0;
        let residencia = 0;
        active.forEach(t => {
            const tr = getTopicTrack(t);
            if (tr === 'concurso') concurso++;
            else if (tr === 'residencia') residencia++;
        });
        return { all: active.length, concurso, residencia };
    }, [topics]);

    const filteredTopics = useMemo(() => {
        return topics.filter(t => !t.deleted).filter(t => {
            if (trackFilter !== 'all') {
                const tr = getTopicTrack(t);
                if (tr !== trackFilter) return false;
            }
            if (filterArea !== 'all' && t.area !== filterArea) return false;
            if (searchTerm && !t.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        }).sort((a,b) => a.title.localeCompare(b.title));
    }, [topics, trackFilter, filterArea, searchTerm]);

    const groupedTopics = useMemo(() => {
        if (groupBy === 'none') return { 'Todos': filteredTopics };
        
        const groups: Record<string, Topic[]> = {};
        
        filteredTopics.forEach(t => {
            if (groupBy === 'track') {
                const tr = getTopicTrack(t);
                const key = tr === 'concurso' ? '🎯 Concursos Públicos (FAFIPA)' : tr === 'residencia' ? '🩺 Residência Médica' : '🌐 Conhecimentos Gerais';
                if (!groups[key]) groups[key] = [];
                groups[key].push(t);
            } else if (groupBy === 'tag') {
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
                    if (t.subarea) {
                        key = t.subarea;
                    } else {
                        const areaObj = AREAS.find(a => a.id === t.area);
                        key = areaObj ? areaObj.full : 'Outros';
                    }
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
        <div className="h-full flex flex-col pb-4 lg:pb-0 animate-scale-in">
            {/* Header: Controls */}
            <div className="flex flex-col gap-2.5 mb-5 z-20 relative px-1">
                {/* Track Selector Bar (Concurso vs Residência) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-white dark:bg-zinc-900 p-2 sm:p-2.5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                    <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar p-0.5">
                        <button
                            onClick={() => setTrackFilter('all')}
                            title="Todas as matérias cadastradas"
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                                trackFilter === 'all' 
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs' 
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                            }`}
                        >
                            <span>Geral</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${trackFilter === 'all' ? 'bg-white/20 text-white dark:bg-black/20 dark:text-slate-900 font-bold' : 'bg-slate-200 dark:bg-white/10 text-slate-500'}`}>{trackCounts.all}</span>
                        </button>
                        <button
                            onClick={() => setTrackFilter('concurso')}
                            title="Concurso FAFIPA"
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                                trackFilter === 'concurso' 
                                    ? 'bg-emerald-600 text-white shadow-xs' 
                                    : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
                            }`}
                        >
                            <span>🎯 FAFIPA</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${trackFilter === 'concurso' ? 'bg-black/20 text-white font-bold' : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'}`}>{trackCounts.concurso}</span>
                        </button>
                        <button
                            onClick={() => setTrackFilter('residencia')}
                            title="Residência Médica"
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                                trackFilter === 'residencia' 
                                    ? 'bg-indigo-600 text-white shadow-xs' 
                                    : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/20'
                            }`}
                        >
                            <span>🩺 Residência</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${trackFilter === 'residencia' ? 'bg-black/20 text-white font-bold' : 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300'}`}>{trackCounts.residencia}</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                        {/* View Switcher (Segmented Control) */}
                        <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
                            <button 
                                onClick={() => setActiveTab('topics')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'topics' ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                            >
                                <Database size={13}/>
                                <span>Matérias</span>
                            </button>
                            <button 
                                onClick={() => setActiveTab('simulados')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'simulados' ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                            >
                                <ClipboardList size={13}/>
                                <span>Simulados</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sub-bar: View controls and filters */}
                {activeTab === 'topics' && (
                    <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                            <BookOpen size={13} className="text-slate-400" />
                            <span className="font-bold text-slate-800 dark:text-slate-200">{filteredTopics.length}</span>
                            <span>{filteredTopics.length === 1 ? 'matéria' : 'matérias'}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Group By */}
                            <div className="relative">
                                <button 
                                    onClick={() => setGroupMenuOpen(!groupMenuOpen)}
                                    className={`px-3 py-1.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all border ${groupBy !== 'none' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs' : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-50'}`}
                                >
                                    <LayoutGrid size={13}/>
                                    <span>Agrupar</span>
                                    <ChevronDown size={13} className="opacity-60" />
                                </button>
                                {groupMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden animate-scale-in z-30">
                                        <button onClick={() => { setGroupBy('track'); setGroupMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                            <span>Por Modalidade (Concurso / Residência)</span>
                                            {groupBy === 'track' && <Check size={14} className="text-blue-500"/>}
                                        </button>
                                        <button onClick={() => { setGroupBy('area'); setGroupMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                            <span>Por Área de Conhecimento</span>
                                            {groupBy === 'area' && <Check size={14} className="text-blue-500"/>}
                                        </button>
                                        <button onClick={() => { setGroupBy('tag'); setGroupMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                            <span>Por Disciplina</span>
                                            {groupBy === 'tag' && <Check size={14} className="text-blue-500"/>}
                                        </button>
                                        <button onClick={() => { setGroupBy('block'); setGroupMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                            <span>Por Bloco / Origem</span>
                                            {groupBy === 'block' && <Check size={14} className="text-blue-500"/>}
                                        </button>
                                        <div className="border-t border-slate-100 dark:border-white/5 my-1"></div>
                                        <button onClick={() => { setGroupBy('none'); setGroupMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                            <span>Sem Agrupamento (Lista Contínua)</span>
                                            {groupBy === 'none' && <Check size={14} className="text-blue-500"/>}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
                                <button 
                                    onClick={() => setViewMode('list')}
                                    className={`px-2.5 py-1 rounded-lg flex items-center justify-center gap-1 text-[11px] font-bold transition-all ${viewMode === 'list' ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                    title="Visualização em Tabela / Lista"
                                >
                                    <List size={13}/>
                                    <span className="hidden sm:inline">Lista</span>
                                </button>
                                <button 
                                    onClick={() => setViewMode('kanban')}
                                    className={`px-2.5 py-1 rounded-lg flex items-center justify-center gap-1 text-[11px] font-bold transition-all ${viewMode === 'kanban' ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                    title="Visualização em Quadro Kanban"
                                >
                                    <Kanban size={13}/>
                                    <span className="hidden sm:inline">Kanban</span>
                                </button>
                            </div>

                            {/* Filter Area */}
                            <div className="relative">
                                <button 
                                    onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                                    className={`px-3 py-1.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all border ${filterArea !== 'all' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-emerald-200 dark:border-emerald-500/30 shadow-xs' : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-50'}`}
                                >
                                    <Filter size={13}/>
                                    <span>{filterArea === 'all' ? 'Área' : AREAS.find(a => a.id === filterArea)?.name || 'Área'}</span>
                                </button>
                                {filterMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-y-auto max-h-64 animate-scale-in z-30 custom-scrollbar">
                                        <button onClick={() => { setFilterArea('all'); setFilterMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                            <span>Todas as Áreas</span>
                                            {filterArea === 'all' && <Check size={14} className="text-blue-500"/>}
                                        </button>
                                        {AREAS.map(a => (
                                            <button key={a.id} onClick={() => { setFilterArea(a.id); setFilterMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 truncate flex items-center justify-between">
                                                <span>{a.name}</span>
                                                {filterArea === a.id && <Check size={14} className="text-blue-500"/>}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
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
                    viewMode === 'kanban' ? (
                        <KanbanBoard topics={filteredTopics} onEdit={onEdit} />
                    ) : (
                        Object.keys(groupedTopics).length === 0 ? (
                        <div className="p-8 text-center text-slate-400 text-xs font-bold bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5">Nenhum registro encontrado.</div>
                    ) : (
                        Object.entries(groupedTopics).map(([groupName, groupTopics]) => (
                            <div key={groupName} className="bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm flex flex-col relative z-0">
                                {groupBy !== 'none' && (
                                    <div className="bg-slate-50/50 dark:bg-black/20 p-4 border-b border-slate-100 dark:border-white/5 flex items-center gap-3 rounded-t-[24px]">
                                        <div className="w-2 h-6 bg-slate-900 dark:bg-white rounded-full"></div>
                                        <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">{groupName}</h3>
                                        <span className="text-xs font-bold text-slate-400 bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded-md">{groupTopics.length}</span>
                                    </div>
                                )}
                                <div 
                                    className="overflow-x-auto custom-scrollbar overflow-y-visible"
                                    onPointerDownCapture={(e) => e.stopPropagation()}
                                >
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-slate-50/50 dark:bg-black/20 sticky top-0 backdrop-blur-sm z-10">
                                            <tr>
                                                <th className={`p-3 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest ${groupBy === 'none' ? 'rounded-tl-[24px]' : ''}`}>Matéria</th>
                                                <th className="p-3 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell w-44">Modalidade & Área</th>
                                                <th className="p-3 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-20 sm:w-28">Progresso</th>
                                                <th className="p-3 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-14 sm:w-20">Nota</th>
                                                <th className={`p-3 sm:p-4 text-right w-10 sm:w-16 ${groupBy === 'none' ? 'rounded-tr-[24px]' : ''}`}></th>
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
                                                const track = getTopicTrack(t);
                                                const areaObj = AREAS.find(a => a.id === t.area);
                                                const areaName = t.subarea || areaObj?.name || t.area;
                                                
                                                return (
                                                    <React.Fragment key={t.id}>
                                                        <tr onClick={() => setExpandedId(isExpanded ? null : t.id)} className={`group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${isExpanded ? 'bg-slate-50 dark:bg-white/5' : ''}`}>
                                                            <td className="p-3 sm:p-4">
                                                                <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 line-clamp-2 sm:line-clamp-1">{t.title}</div>
                                                                {/* Mobile track and area tags */}
                                                                <div className="flex sm:hidden items-center gap-1.5 mt-1.5 flex-wrap">
                                                                    {track === 'concurso' ? (
                                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                                                            🎯 Concurso
                                                                        </span>
                                                                    ) : track === 'residencia' ? (
                                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                                                                            🩺 Residência
                                                                        </span>
                                                                    ) : (
                                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-slate-400">
                                                                            Geral
                                                                        </span>
                                                                    )}
                                                                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                                                                        {areaName}
                                                                    </span>
                                                                </div>
                                                                {t.source && <div className="text-[10px] text-slate-400 font-medium mt-0.5">{t.source}</div>}
                                                                {t.tags && t.tags.length > 0 && (
                                                                    <div className="mt-1 flex flex-wrap gap-1">
                                                                        {t.tags.map((tag, idx) => (
                                                                            <span key={idx} className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white rounded text-[9px] font-bold uppercase tracking-wide">
                                                                                {tag}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                {t.linkedLessons && t.linkedLessons.length > 0 && (
                                                                    <div className="mt-2 flex flex-wrap gap-1">
                                                                        {t.linkedLessons.map((lesson, idx) => (
                                                                            <span key={idx} className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-[9px] font-medium text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                                                                                {lesson.replace(/ \(~\d+q\)$/, '')}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="p-3 sm:p-4 hidden sm:table-cell">
                                                                <div className="flex flex-col gap-1 items-start">
                                                                    {track === 'concurso' ? (
                                                                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/40 inline-flex items-center gap-1 shadow-xs">
                                                                            <span>🎯</span> Concurso
                                                                        </span>
                                                                    ) : track === 'residencia' ? (
                                                                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-300/60 dark:border-indigo-800/40 inline-flex items-center gap-1 shadow-xs">
                                                                            <span>🩺</span> Residência
                                                                        </span>
                                                                    ) : (
                                                                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-slate-300 inline-flex items-center gap-1">
                                                                            <span>🌐</span> Geral
                                                                        </span>
                                                                    )}
                                                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate max-w-[170px]" title={areaName}>
                                                                        {areaName}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="p-3 sm:p-4">
                                                                <div className="flex items-center justify-center gap-1 sm:gap-2">
                                                                    <div className="w-8 sm:w-16 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                                        <div className="h-full bg-slate-900 dark:bg-white" style={{width: `${progressPercentage}%`}}></div>
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
                                                                        
                                                                        {/* Classification & Metadata Section */}
                                                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white dark:bg-black/20 rounded-xl border border-slate-100 dark:border-white/5">
                                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Modalidade:</span>
                                                                                <div className="flex items-center gap-1.5">
                                                                                    <button 
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            if (onUpdateTopic) {
                                                                                                onUpdateTopic({ ...t, targetTrack: 'concurso' });
                                                                                            }
                                                                                        }}
                                                                                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                                                                            getTopicTrack(t) === 'concurso' 
                                                                                                ? 'bg-emerald-600 text-white shadow-xs' 
                                                                                                : 'bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-300'
                                                                                        }`}
                                                                                    >
                                                                                        🎯 Concurso
                                                                                    </button>
                                                                                    <button 
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            if (onUpdateTopic) {
                                                                                                onUpdateTopic({ ...t, targetTrack: 'residencia' });
                                                                                            }
                                                                                        }}
                                                                                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                                                                            getTopicTrack(t) === 'residencia' 
                                                                                                ? 'bg-indigo-600 text-white shadow-xs' 
                                                                                                : 'bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-300'
                                                                                        }`}
                                                                                    >
                                                                                        🩺 Residência
                                                                                    </button>
                                                                                    <button 
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            if (onUpdateTopic) {
                                                                                                onUpdateTopic({ ...t, targetTrack: 'geral' });
                                                                                            }
                                                                                        }}
                                                                                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                                                                            getTopicTrack(t) === 'geral' 
                                                                                                ? 'bg-slate-700 text-white shadow-xs' 
                                                                                                : 'bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-300'
                                                                                        }`}
                                                                                    >
                                                                                        🌐 Geral
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Área:</span>
                                                                                <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300">
                                                                                    {areaName}
                                                                                </span>
                                                                            </div>
                                                                        </div>

                                                                        {/* Source & Lessons Section */}
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
                                                                            <div className="w-full h-64 sm:h-48 sm:flex-1 bg-white dark:bg-black/20 rounded-xl border border-black/5 dark:border-white/5 p-4 relative flex flex-col min-w-0">
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
                                                                                <div key={i} className="flex flex-col p-3 rounded-xl bg-white dark:bg-black/20 border border-slate-100 dark:border-white/5 transition-all hover:border-slate-300 dark:hover:border-white/20">
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
                                                                            <button onClick={() => onEdit(t)} className="flex items-center gap-2 px-4 py-2 hover:bg-white dark:hover:bg-white/10 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
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
                    ))
                ) : (
                    <div className="bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
                        <div 
                            className="overflow-x-auto custom-scrollbar"
                            onPointerDownCapture={(e) => e.stopPropagation()}
                        >
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50/50 dark:bg-black/20 sticky top-0 backdrop-blur-sm z-10">
                                    <tr>
                                        <th className="p-3 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Simulado</th>
                                        <th className="p-3 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell w-32">Ano</th>
                                        <th className="p-3 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-24 sm:w-32">Data</th>
                                        <th className="p-3 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-16 sm:w-24">Nota</th>
                                        <th className="p-3 sm:p-4 text-right w-10 sm:w-16"></th>
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