
import React, { useMemo, useState } from 'react';
import { 
    Clock, Activity, Flame, CheckCircle2, ChevronRight, Sun, ArrowUpDown, Filter, PlayCircle, Plus, BarChart2, ChevronDown, ChevronUp, Lightbulb
} from 'lucide-react';
import { Topic, Simulado, UserConfig } from './types';
import { getTodayStr, getAreaTheme, formatDate, getPerformanceBgLight, getPerformanceColor, AREAS } from './utils';
import { SmartSuggestions, HeatmapWidget, SimuladosMiniWidget, TopicCard, DetailedStatsWidget } from './components';

const getAreaInitials = (area: string) => {
    switch(area) {
        case 'clinica': return 'CL';
        case 'cirurgia': return 'CR';
        case 'pediatria': return 'PE';
        case 'go': return 'GO';
        case 'preventiva': return 'PR';
        default: return 'G';
    }
};

export const HubView = ({ 
    topics, simulados, config, onReview, onEditTopic, 
    children, setSortOrder, setFilterArea, sortOrder, filterArea, searchTerm,
    onAddSimulado
}: { 
    topics: Topic[], simulados: Simulado[], config: UserConfig, 
    onReview: (id: string, idx: number) => void, onEditTopic: (id: string) => void, 
    children?: React.ReactNode, setSortOrder: any, setFilterArea: any, 
    sortOrder: string, filterArea: string, searchTerm?: string,
    onAddSimulado?: () => void
}) => {
    const [showMobileStats, setShowMobileStats] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    
    const today = getTodayStr();
    const activeTopics = topics.filter(t => !t.deleted);
    const activeSimulados = simulados.filter(s => !s.deleted);

    const filteredActiveTopics = useMemo(() => {
        if (!searchTerm) return activeTopics;
        const lower = searchTerm.toLowerCase();
        return activeTopics.filter(t => t.title.toLowerCase().includes(lower));
    }, [activeTopics, searchTerm]);

    const stats = useMemo(() => {
        const totalQ = activeTopics.reduce((acc, t) => acc + t.reviews.filter(r => r.done).reduce((s, r) => s + r.total, 0), 0) + activeSimulados.reduce((acc,s) => acc + (s.totalQuestions || 0), 0);
        return { totalQ };
    }, [activeTopics, activeSimulados]);

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

    const simuladosAvg = useMemo(() => {
        if (activeSimulados.length === 0) return 0;
        return Math.round(activeSimulados.reduce((acc, s) => acc + ((s.correctCount || 0) / (s.totalQuestions || 1)), 0) / activeSimulados.length * 100);
    }, [activeSimulados]);

    return (
        <div className="flex flex-col gap-6 lg:gap-8 h-full pb-32 lg:pb-0 animate-scale-in">
            {/* DESKTOP LAYOUT (Grid) */}
            <div className="hidden lg:grid grid-cols-12 gap-8 h-full">
                {/* ... (Desktop layout remains mostly same, can be refined if needed, but focus is mobile) ... */}
                <div className="col-span-8 flex flex-col gap-8">
                     {/* Desktop Header Content matches functionality */}
                     <div className="relative w-full bg-white dark:bg-[#18181b] border-2 border-blue-100 dark:border-blue-900/30 rounded-[32px] p-8 shadow-sm overflow-hidden group hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-500">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent dark:from-blue-900/10 rounded-bl-[100px] pointer-events-none -z-0"></div>
                        
                        <div className="relative z-10 flex flex-col gap-6">
                            {/* Header Row */}
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                        <Clock size={32} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Para Fazer Hoje</span>
                                            {dueItems.length > 0 && <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>}
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-black text-slate-800 dark:text-white tracking-tighter">{dueItems.length}</span>
                                            <span className="text-xl font-bold text-slate-400">pendentes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* Quick Start Button */}
                                    {dueItems.length > 0 && (
                                        <button 
                                            onClick={startQuickSession}
                                            className="flex flex-col items-center justify-center w-20 h-20 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all group/btn"
                                        >
                                            <PlayCircle size={28} strokeWidth={2} className="mb-1"/>
                                            <span className="text-[9px] font-black uppercase">Iniciar</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* List Area */}
                            <div className="flex flex-col gap-3 mt-2">
                                {dueItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-8 bg-slate-50/50 dark:bg-black/20 rounded-3xl border border-dashed border-slate-200 dark:border-white/5">
                                        <CheckCircle2 size={32} className="text-emerald-500 mb-2 opacity-50" />
                                        <span className="text-xs font-bold text-slate-400">Tudo em dia por hoje!</span>
                                    </div>
                                ) : (
                                    dueItems.slice(0, 4).map((item) => {
                                        const theme = getAreaTheme(item.topic.area);
                                        const initials = getAreaInitials(item.topic.area);
                                        return (
                                            <div 
                                                key={`${item.topic.id}-${item.idx}`} 
                                                onClick={() => onReview(item.topic.id, item.idx)}
                                                className="group/card flex items-center justify-between p-4 bg-white dark:bg-black/20 border border-slate-100 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-500/30 transition-all cursor-pointer"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black shrink-0 ${theme.bg} ${theme.text}`}>
                                                        {initials}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">{item.topic.title}</h4>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className={`text-[10px] font-bold uppercase tracking-wide bg-slate-100 dark:bg-white/10 text-slate-500 px-2 py-0.5 rounded-md`}>{item.topic.area}</span>
                                                            <span className="text-[10px] text-slate-300">•</span>
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="opacity-0 group-hover/card:opacity-100 transform translate-x-2 group-hover/card:translate-x-0 transition-all duration-300">
                                                    <button className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-bold rounded-lg shadow-lg">
                                                        REVISAR
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Detailed Stats Row */}
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 tracking-tight mb-4 px-2">Performance</h4>
                        <DetailedStatsWidget topics={activeTopics} simulados={activeSimulados} />
                    </div>

                    {children}
                </div>
                {/* Right Column Desktop */}
                <div className="col-span-4 flex flex-col gap-6">
                    <div className="glass-panel rounded-[32px] p-6 shadow-sm flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 self-start relative z-10"><Flame size={16} className="text-orange-500"/> Constância</h4>
                        <div className="relative z-10"><HeatmapWidget topics={activeTopics} simulados={activeSimulados} /></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                    </div>
                    <div className="h-64">
                        <SimuladosMiniWidget simulados={activeSimulados} targetAccuracy={config.targetAccuracy} onAdd={onAddSimulado || (() => {})} />
                    </div>
                </div>
            </div>

            {/* MOBILE LAYOUT (Minimalist & Stacked) */}
            <div className="lg:hidden flex flex-col gap-6 px-1">
                
                {/* Hero Card: To Do Today */}
                <div className="bg-white dark:bg-[#18181b] p-5 rounded-[28px] border border-black/5 dark:border-white/5 shadow-sm relative overflow-hidden mt-2">
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                <Clock size={12}/> Meta Diária
                            </h2>
                            <div className="text-3xl font-black text-slate-800 dark:text-white">{dueItems.length} <span className="text-sm text-slate-400 font-bold">pendentes</span></div>
                        </div>
                        {dueItems.length > 0 && (
                            <button onClick={startQuickSession} className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg active:scale-95 transition-transform">
                                <PlayCircle size={24} strokeWidth={2.5}/>
                            </button>
                        )}
                    </div>
                    
                    {dueItems.length > 0 ? (
                        <div className="space-y-2 relative z-10">
                            {dueItems.slice(0, 3).map(item => (
                                <div key={item.topic.id + item.idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5 active:scale-[0.98] transition-transform" onClick={() => onReview(item.topic.id, item.idx)}>
                                    <div className="truncate pr-2">
                                        <div className="font-bold text-xs text-slate-800 dark:text-white truncate">{item.topic.title}</div>
                                        <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                            <span className={`w-1.5 h-1.5 rounded-full ${item.topic.importance === 'high' ? 'bg-red-500' : item.topic.importance === 'medium' ? 'bg-amber-500' : 'bg-blue-500'}`}></span>
                                            {item.label}
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-300"/>
                                </div>
                            ))}
                            {dueItems.length > 3 && <div className="text-center text-[10px] font-bold text-slate-400 pt-1">+ {dueItems.length - 3} outros</div>}
                        </div>
                    ) : (
                        <div className="text-center py-6 relative z-10">
                            <div className="inline-flex p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-full text-emerald-500 mb-2"><CheckCircle2 size={24}/></div>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Tudo pronto por hoje!</p>
                        </div>
                    )}
                    
                    {/* Subtle BG Decoration */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
                </div>

                {/* Quick Actions & Collapsible Sections */}
                <div className="flex gap-3 px-1">
                    {/* Stats Toggle */}
                    <button 
                        onClick={() => { setShowMobileStats(!showMobileStats); setShowSuggestions(false); }}
                        className={`flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all border ${showMobileStats ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-transparent shadow-md' : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-300 border-black/5 dark:border-white/10'}`}
                    >
                        <BarChart2 size={16}/> {showMobileStats ? 'Ocultar' : 'Desempenho'}
                    </button>
                    
                    {/* Toggle Suggestions */}
                    <button 
                        onClick={() => { setShowSuggestions(!showSuggestions); setShowMobileStats(false); }}
                        className={`flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all border ${showSuggestions ? 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-300 border-orange-200 dark:border-orange-500/30' : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-300 border-black/5 dark:border-white/10'}`}
                    >
                        <Lightbulb size={16}/> {showSuggestions ? 'Ocultar' : 'Sugestões'}
                    </button>
                </div>

                {/* Collapsible Stats Area */}
                {showMobileStats && (
                    <div className="animate-slide-up space-y-4">
                        <DetailedStatsWidget topics={activeTopics} simulados={activeSimulados} />
                        
                        {/* Moved Simulados Summary Inside Stats */}
                        <div className="bg-white dark:bg-zinc-900 p-4 rounded-[24px] border border-black/5 dark:border-white/5 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-purple-100 dark:bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400">
                                    <Activity size={18}/>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Média Simulados</div>
                                    <div className={`text-xl font-black ${getPerformanceColor(simuladosAvg, config.targetAccuracy, 'text')}`}>
                                        {simuladosAvg}% <span className="text-xs text-slate-400 font-bold ml-1">geral</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Suggestions Area */}
                {showSuggestions && (
                    <div className="animate-slide-up space-y-3">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 flex items-center gap-2">
                            <Flame size={12} className="text-orange-500"/> Sugestões para agora
                        </h3>
                        <SmartSuggestions topics={filteredActiveTopics} onReview={onReview} />
                    </div>
                )}
                
                <div className="px-2 pt-2 pb-6 border-t border-slate-200 dark:border-white/5 mt-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-black text-slate-800 dark:text-white">Todas as Matérias</h3>
                        <div className="flex gap-2">
                            {/* Filter Button */}
                            <div className="relative">
                                <button 
                                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                                    className={`p-2 rounded-lg shadow-sm border transition-all ${filterArea !== 'all' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white dark:bg-zinc-800 border-slate-100 dark:border-white/5 text-slate-500'}`}
                                >
                                    <Filter size={14}/>
                                </button>
                                {showFilterMenu && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1 z-50 animate-scale-in">
                                        <button onClick={() => { setFilterArea('all'); setShowFilterMenu(false); }} className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg ${filterArea === 'all' ? 'bg-slate-100 dark:bg-white/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'}`}>Todas as Áreas</button>
                                        {AREAS.map(a => (
                                            <button key={a.id} onClick={() => { setFilterArea(a.id); setShowFilterMenu(false); }} className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg ${filterArea === a.id ? 'bg-slate-100 dark:bg-white/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                                                {a.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Sort Button */}
                            <div className="relative">
                                <button 
                                    onClick={() => setShowSortMenu(!showSortMenu)}
                                    className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-slate-100 dark:border-white/5 text-slate-500 active:bg-slate-50"
                                >
                                    <ArrowUpDown size={14}/>
                                </button>
                                {showSortMenu && (
                                    <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1 z-50 animate-scale-in">
                                        {['date', 'priority', 'questions'].map(opt => (
                                            <button 
                                                key={opt}
                                                onClick={() => { setSortOrder(opt); setShowSortMenu(false); }}
                                                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg ${sortOrder === opt ? 'bg-blue-50 text-blue-600 dark:bg-white/10 dark:text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                            >
                                                {opt === 'date' ? 'Data (Recentes)' : opt === 'priority' ? 'Prioridade' : 'Questões'}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};
