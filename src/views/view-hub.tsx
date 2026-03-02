
import React, { useMemo, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
    Clock, Activity, Flame, CheckCircle2, ChevronRight, Sun, ArrowUpDown, Filter, PlayCircle, Plus, BarChart2, ChevronDown, ChevronUp, Lightbulb, BookOpen, ClipboardList, AlertCircle, Calendar, X
} from 'lucide-react';
import { Topic, Simulado, UserConfig } from '../types';
import { getTodayStr, getAreaTheme, formatDate, getPerformanceBgLight, getPerformanceColor, AREAS, getPriorityInfo } from '../utils';
import { SmartSuggestions, HeatmapWidget, SimuladosMiniWidget, TopicCard, DetailedStatsWidget, FutureLoadWidget, RetentionWidget, AreaStatsWidget } from '../components';
import { Modal } from '../modals';

export const HubView = ({ 
    topics, simulados, config, onReview, onEditTopic, onDeleteTopic,
    setSortOrder, setFilterArea, sortOrder, filterArea, searchTerm,
    onAddSimulado
}: { 
    topics: Topic[], simulados: Simulado[], config: UserConfig, 
    onReview: (id: string, idx: number) => void, onEditTopic: (id: string) => void, onDeleteTopic?: (id: string) => void,
    setSortOrder: any, setFilterArea: any, 
    sortOrder: string, filterArea: string, searchTerm?: string,
    onAddSimulado?: () => void
}) => {
    const [activeTab, setActiveTab] = useState<'temas' | 'stats' | 'simulados'>('temas');
    const [popoverPosition, setPopoverPosition] = useState<{rect: DOMRect, position: 'above' | 'below'} | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Custom hook for media query
    const useMediaQuery = (query: string) => {
        const [matches, setMatches] = useState(false);
        React.useEffect(() => {
            const media = window.matchMedia(query);
            if (media.matches !== matches) {
                setMatches(media.matches);
            }
            const listener = () => setMatches(media.matches);
            media.addEventListener('change', listener);
            return () => media.removeEventListener('change', listener);
        }, [matches, query]);
        return matches;
    };

    const isDesktop = useMediaQuery('(min-width: 1024px)');
    
    const today = getTodayStr();
    const activeTopics = topics.filter(t => !t.deleted);
    const activeSimulados = simulados.filter(s => !s.deleted);

    // ... (keep filteredActiveTopics and dueItems logic unchanged) ...

    const filteredActiveTopics = useMemo(() => {
        let result = activeTopics;
        
        if (filterArea !== 'all') {
            result = result.filter(t => t.area === filterArea);
        }

        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(t => t.title.toLowerCase().includes(lower));
        }

        result.sort((a, b) => {
             if (sortOrder === 'date') return (b.updatedAt || 0) - (a.updatedAt || 0);
             if (sortOrder === 'priority') {
                 const pMap: any = { high: 3, medium: 2, low: 1 };
                 return (pMap[b.importance] || 1) - (pMap[a.importance] || 1);
             }
             if (sortOrder === 'questions') {
                 const getQ = (t: Topic) => t.reviews.filter(r => r.done).reduce((acc, r) => acc + r.total, 0);
                 return getQ(b) - getQ(a);
             }
             return 0;
        });
        
        return result;
    }, [activeTopics, filterArea, searchTerm, sortOrder]);

    const dueItems = useMemo(() => {
        return filteredActiveTopics
            .flatMap(t => t.reviews.map((r, idx) => ({ ...r, topic: t, idx })))
            .filter(r => !r.done && r.date <= today)
            .sort((a,b) => {
                 if (a.date !== b.date) return a.date.localeCompare(b.date);
                 const pMap: any = { high: 3, medium: 2, low: 1 };
                 return (pMap[b.topic.importance] || 2) - (pMap[a.topic.importance] || 2);
             });
    }, [filteredActiveTopics, today]);

    const startQuickSession = () => {
        if (dueItems.length > 0) {
            onReview(dueItems[0].topic.id, dueItems[0].idx);
        }
    };

    const handlePendingClick = (e: React.MouseEvent) => {
        const targetRect = e.currentTarget.getBoundingClientRect();
        const showAbove = targetRect.top > window.innerHeight / 2;
        
        setPopoverPosition({ 
            rect: targetRect,
            position: showAbove ? 'above' : 'below'
        });
    };

    return (
        <div ref={containerRef} className="flex flex-col gap-6 h-full pb-32 lg:pb-0 animate-scale-in max-w-6xl mx-auto w-full relative">
            
            {/* HERO: Para fazer hoje */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent dark:from-blue-900/10 rounded-bl-[100px] pointer-events-none -z-0"></div>
                
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-2">
                        {dueItems.length > 0 ? 'Olá, pronto para estudar?' : 'Tudo em dia!'}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base">
                        {dueItems.length > 0 ? (
                            <>Você tem <button onClick={handlePendingClick} className="font-bold text-blue-500 lg:hover:text-blue-600 dark:lg:hover:text-blue-400 active:text-blue-600 dark:active:text-blue-400 underline decoration-blue-500/30 underline-offset-4 transition-colors">{dueItems.length} revisões</button> pendentes para hoje.</>
                        ) : (
                            <>Você não tem revisões pendentes para hoje. Aproveite para descansar ou adiantar temas.</>
                        )}
                    </p>
                </div>
                
                {dueItems.length > 0 && (
                    <button 
                        onClick={startQuickSession} 
                        className="relative z-10 bg-slate-900 dark:bg-white text-white dark:text-black lg:hover:scale-105 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 shadow-xl shadow-slate-900/10 w-full md:w-auto justify-center"
                    >
                        <PlayCircle size={20} fill="currentColor" className="text-white dark:text-black" />
                        Começar Revisões
                    </button>
                )}
            </div>

            {/* Pending Reviews Popover (Portal) */}
            {popoverPosition && createPortal(
                <>
                    <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-0" onClick={() => setPopoverPosition(null)}></div>
                    
                    {/* Mobile: Modal on the Left */}
                    {!isDesktop && (
                        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-[10000] w-[calc(100%-2rem)] max-w-sm bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 p-2 animate-scale-in">
                             <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-white/5 mb-1">
                                <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wide">Pendentes</h3>
                                <button onClick={() => setPopoverPosition(null)} className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full"><X size={14} className="text-slate-400"/></button>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar space-y-1">
                                {dueItems.length === 0 ? (
                                    <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                                        <CheckCircle2 size={32} className="mx-auto mb-2 text-emerald-500 opacity-50" />
                                        <p className="font-bold text-xs">Tudo feito!</p>
                                    </div>
                                ) : (
                                    dueItems.map((item: any) => {
                                        const theme = getAreaTheme(item.topic.area);
                                        const isOverdue = item.date < today;
                                        
                                        return (
                                            <div key={`${item.topic.id}-${item.idx}`} className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5 flex items-center justify-between group active:scale-[0.98] transition-all" onClick={() => { setPopoverPosition(null); onReview(item.topic.id, item.idx); }}>
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-sm shrink-0 ${theme.bg} ${theme.text}`}>
                                                        {isOverdue ? <AlertCircle size={14}/> : <Calendar size={14}/>}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-xs text-slate-800 dark:text-white truncate">{item.topic.title}</h4>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <span className={`text-[9px] font-bold uppercase px-1 py-0.5 rounded leading-none ${isOverdue ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-slate-100 text-slate-500 dark:bg-white/10'}`}>
                                                                {isOverdue ? 'Atrasado' : 'Hoje'}
                                                            </span>
                                                            <span className="text-[9px] text-slate-400 font-bold">{item.label.split(':')[0]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-2 bg-white dark:bg-white/10 text-slate-600 dark:text-slate-300 rounded-lg shadow-sm">
                                                    <PlayCircle size={16}/>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}

                    {/* Desktop: Fixed Popover */}
                    {isDesktop && (
                        <div 
                            className={`fixed z-[10000] w-80 bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 p-2 animate-scale-in ${popoverPosition.position === 'above' ? 'origin-bottom' : 'origin-top'}`}
                            style={{ 
                                top: popoverPosition.position === 'above' ? popoverPosition.rect.top : popoverPosition.rect.bottom,
                                left: popoverPosition.rect.left + popoverPosition.rect.width / 2,
                                transform: popoverPosition.position === 'above' 
                                    ? 'translate(-50%, calc(-100% - 6px))' 
                                    : 'translate(-50%, 6px)' 
                            }}
                        >
                            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-white/5 mb-1">
                                <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wide">Pendentes</h3>
                                <button onClick={() => setPopoverPosition(null)} className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full"><X size={14} className="text-slate-400"/></button>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto custom-scrollbar space-y-1">
                                {dueItems.length === 0 ? (
                                    <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                                        <CheckCircle2 size={32} className="mx-auto mb-2 text-emerald-500 opacity-50" />
                                        <p className="font-bold text-xs">Tudo feito!</p>
                                    </div>
                                ) : (
                                    dueItems.map((item: any) => {
                                        const theme = getAreaTheme(item.topic.area);
                                        const isOverdue = item.date < today;
                                        
                                        return (
                                            <div key={`${item.topic.id}-${item.idx}`} className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5 flex items-center justify-between group hover:border-blue-500/30 transition-all">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-sm shrink-0 ${theme.bg} ${theme.text}`}>
                                                        {isOverdue ? <AlertCircle size={14}/> : <Calendar size={14}/>}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-xs text-slate-800 dark:text-white truncate">{item.topic.title}</h4>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <span className={`text-[9px] font-bold uppercase px-1 py-0.5 rounded leading-none ${isOverdue ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-slate-100 text-slate-500 dark:bg-white/10'}`}>
                                                                {isOverdue ? 'Atrasado' : 'Hoje'}
                                                            </span>
                                                            <span className="text-[9px] text-slate-400 font-bold">{item.label.split(':')[0]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => {
                                                        setPopoverPosition(null);
                                                        onReview(item.topic.id, item.idx);
                                                    }} 
                                                    className="p-2 bg-white dark:bg-white/10 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                                                >
                                                    <PlayCircle size={16}/>
                                                </button>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                            {/* Arrow */}
                            <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-[#1c1c1e] border-slate-200 dark:border-white/10 rotate-45 ${popoverPosition.position === 'above' ? 'bottom-[-6px] border-b border-r' : 'top-[-6px] border-t border-l'}`}></div>
                        </div>
                    )}
                </>,
                document.body
            )}

            {/* TABS */}
            <div className="flex gap-2 border-b border-slate-200 dark:border-white/10 px-2 overflow-x-auto custom-scrollbar pb-2" role="tablist" aria-label="Seções do Hub">
                {[
                    { id: 'temas', label: 'Banco de Temas', icon: BookOpen, color: 'blue' },
                    { id: 'stats', label: 'Estatísticas', icon: BarChart2, color: 'emerald' },
                    { id: 'simulados', label: 'Simulados', icon: ClipboardList, color: 'purple' }
                ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    const colorClass = isActive 
                        ? (tab.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' : 
                           tab.color === 'emerald' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 
                           'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400')
                        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 dark:text-slate-400';
                        
                    return (
                        <button 
                            key={tab.id}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`panel-${tab.id}`}
                            id={`tab-${tab.id}`}
                            className={`h-10 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${isActive ? `px-4 ${colorClass}` : 'px-0 w-10 justify-center'}`} 
                            onClick={() => setActiveTab(tab.id as any)}
                        >
                            <tab.icon size={18} strokeWidth={isActive ? 2.5 : 2} /> 
                            {isActive && <span>{tab.label}</span>}
                        </button>
                    );
                })}
            </div>

            {/* TAB CONTENT */}
            <div className="pt-2">
                {activeTab === 'temas' && (
                    <div role="tabpanel" id="panel-temas" aria-labelledby="tab-temas" className="flex flex-col gap-6 animate-fade-in">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 custom-scrollbar w-full sm:w-auto">
                                <div className="relative flex-1 sm:flex-none">
                                    <select 
                                        aria-label="Filtrar por área"
                                        className="w-full appearance-none bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl pl-3 pr-8 py-2.5 outline-none focus:border-blue-500"
                                        value={filterArea}
                                        onChange={(e) => setFilterArea(e.target.value)}
                                    >
                                        <option value="all">Todas Áreas</option>
                                        {AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                    </select>
                                    <Filter size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                                </div>
                                
                                <div className="relative flex-1 sm:flex-none">
                                    <select 
                                        aria-label="Ordenar por"
                                        className="w-full appearance-none bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl pl-3 pr-8 py-2.5 outline-none focus:border-blue-500"
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}
                                    >
                                        <option value="date">Data (Próximos)</option>
                                        <option value="priority">Prioridade</option>
                                        <option value="name">Nome (A-Z)</option>
                                    </select>
                                    <ArrowUpDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filteredActiveTopics.length === 0 ? (
                                <div className="col-span-full py-12 text-center bg-white/50 dark:bg-white/5 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
                                    <p className="text-slate-500 dark:text-slate-400 font-bold">Nenhum tema encontrado.</p>
                                </div>
                            ) : (
                                filteredActiveTopics.map(topic => (
                                    <TopicCard 
                                        key={topic.id} 
                                        topic={topic} 
                                        onReview={onReview} 
                                        onEdit={() => onEditTopic(topic.id)} 
                                        onDelete={onDeleteTopic}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="flex flex-col gap-6 animate-fade-in">
                        {/* Performance */}
                        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm">
                            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2"><BarChart2 size={16} className="text-indigo-500"/> Performance Geral</h4>
                            <DetailedStatsWidget topics={activeTopics} simulados={activeSimulados} />
                        </div>

                        {/* Desempenho por Área */}
                        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm">
                             <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2"><Lightbulb size={16} className="text-amber-500"/> Desempenho por Área</h4>
                             <AreaStatsWidget topics={activeTopics} simulados={activeSimulados} />
                        </div>

                        {/* Constância */}
                        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm overflow-hidden">
                             <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2"><Flame size={16} className="text-orange-500"/> Constância</h4>
                             <div className="flex justify-center overflow-x-auto">
                                <HeatmapWidget topics={activeTopics} simulados={activeSimulados} />
                             </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Retenção */}
                            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm">
                                <RetentionWidget topics={activeTopics} />
                            </div>

                            {/* Previsão de Carga */}
                            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm">
                                <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2"><Activity size={16} className="text-blue-500"/> Previsão de Carga</h4>
                                <div className="h-48">
                                    <FutureLoadWidget topics={activeTopics} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'simulados' && (
                    <div className="animate-fade-in h-[600px]">
                        <SimuladosMiniWidget simulados={activeSimulados} targetAccuracy={config.targetAccuracy} onAdd={onAddSimulado || (() => {})} />
                    </div>
                )}
            </div>
        </div>
    );
};
