
import React, { useState, useMemo } from 'react';
import { Database, Search, ArrowDown, ChevronDown, ChevronUp, BarChart3, Edit, Trash2, TrendingUp, Target, Brain, CalendarClock, Layers, CheckCircle2, XCircle } from 'lucide-react';
import { Topic, Simulado, UserConfig } from './types';
import { AREAS, formatDate, getPerformanceBgLight, getPerformanceColor, getTodayStr, addDays } from './utils';

// --- Helper: SVG Line Chart for Evolution ---
const TinyLineChart = ({ data, color, height = 40 }: { data: number[], color: string, height?: number }) => {
    if (data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((val - min) / range) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <polyline fill="none" stroke={color} strokeWidth="2" points={points} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

// --- Helper: Workload Bar Chart ---
const WorkloadChart = ({ data }: { data: { day: string, count: number }[] }) => {
    const max = Math.max(...data.map(d => d.count), 1);
    return (
        <div className="flex items-end justify-between h-full gap-1">
            {data.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group relative">
                    <div 
                        className="w-full bg-blue-500/20 dark:bg-blue-500/40 rounded-t-sm hover:bg-blue-500 transition-colors"
                        style={{ height: `${(d.count / max) * 100}%` }}
                    ></div>
                    <div className="absolute bottom-full mb-1 text-[9px] font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {d.count}q
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- NEW: Database Analytics Component ---
const DatabaseAnalytics = ({ topics, simulados }: { topics: Topic[], simulados: Simulado[] }) => {
    const stats = useMemo(() => {
        // 1. Aggregation
        let totalCorrect = 0;
        let totalAnswered = 0;
        const historyMap = new Map<string, {c: number, t: number}>();
        const areaStats = new Map<string, {correct: number, total: number, topics: number}>();

        // Process Topics
        topics.forEach(t => {
            if (t.deleted) return;
            
            // Area Stats
            const aStat = areaStats.get(t.area) || { correct: 0, total: 0, topics: 0 };
            aStat.topics += 1;
            
            t.reviews.forEach(r => {
                if (r.done) {
                    totalCorrect += r.correct;
                    totalAnswered += r.total;
                    
                    const d = r.date;
                    const h = historyMap.get(d) || { c: 0, t: 0 };
                    h.c += r.correct;
                    h.t += r.total;
                    historyMap.set(d, h);

                    aStat.correct += r.correct;
                    aStat.total += r.total;
                }
            });
            areaStats.set(t.area, aStat);
        });

        // Process Simulados
        simulados.forEach(s => {
            if (s.deleted) return;
            totalCorrect += s.correctCount;
            totalAnswered += s.totalQuestions;
            
            const d = s.dateTaken.split('T')[0];
            const h = historyMap.get(d) || { c: 0, t: 0 };
            h.c += s.correctCount;
            h.t += s.totalQuestions;
            historyMap.set(d, h);
        });

        // 2. Metrics
        const globalAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
        const totalWrong = totalAnswered - totalCorrect;

        // 3. Evolution Data (Last 30 Active Days)
        const sortedDates = Array.from(historyMap.keys()).sort();
        const evolutionData = sortedDates.slice(-30).map(date => {
            const h = historyMap.get(date)!;
            return Math.round((h.c / h.t) * 100);
        });

        // 4. Future Workload (Next 7 Days)
        const today = new Date();
        const workload = Array.from({length: 7}).map((_, i) => {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            const dStr = d.toISOString().split('T')[0];
            let count = 0;
            topics.forEach(t => {
                if (!t.deleted) {
                    t.reviews.forEach(r => {
                        if (!r.done && r.date === dStr) count += r.targetQ;
                    });
                }
            });
            return { day: dStr, count };
        });

        // 5. Area Breakdown List
        const areaList = Array.from(areaStats.entries()).map(([area, data]) => ({
            area,
            accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
            volume: data.total,
            topicsCount: data.topics
        })).sort((a,b) => b.volume - a.volume);

        return { totalCorrect, totalWrong, totalAnswered, globalAccuracy, evolutionData, workload, areaList };
    }, [topics, simulados]);

    if (stats.totalAnswered === 0 && stats.workload.every(w => w.count === 0)) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 animate-scale-in">
            {/* Main Stats Card */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <Brain size={14} className="text-blue-500"/>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Questões</span>
                    </div>
                    <div>
                        <span className="text-2xl font-black text-slate-800 dark:text-white">{stats.totalAnswered.toLocaleString()}</span>
                        <div className="text-[10px] font-medium text-slate-400 mt-1">Total Realizado</div>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <Target size={14} className={getPerformanceColor(stats.globalAccuracy, 80, 'text')}/>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Precisão</span>
                    </div>
                    <div>
                        <span className={`text-2xl font-black ${getPerformanceColor(stats.globalAccuracy, 80, 'text')}`}>{stats.globalAccuracy}%</span>
                        <div className="text-[10px] font-medium text-slate-400 mt-1">Taxa de Acerto</div>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <CheckCircle2 size={14} className="text-emerald-500"/>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Hits</span>
                    </div>
                    <div className="flex items-end gap-2">
                        <div>
                            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{stats.totalCorrect}</span>
                            <div className="text-[10px] font-medium text-slate-400 mt-1">Acertos</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <XCircle size={14} className="text-red-500"/>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Misses</span>
                    </div>
                    <div>
                        <span className="text-2xl font-black text-red-500">{stats.totalWrong}</span>
                        <div className="text-[10px] font-medium text-slate-400 mt-1">Erros</div>
                    </div>
                </div>

                {/* Evolution Graph Card - Spans full width of the 4 columns on mobile, 2 columns on desktop */}
                <div className="col-span-2 sm:col-span-2 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="flex items-center gap-2 text-slate-400">
                            <TrendingUp size={14} className="text-purple-500"/>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Evolução (30d)</span>
                        </div>
                    </div>
                    <div className="h-12 w-full relative z-10">
                        {stats.evolutionData.length > 1 ? (
                            <TinyLineChart data={stats.evolutionData} color="#a855f7" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-[9px] text-slate-300 uppercase font-bold">Dados insuficientes</div>
                        )}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>
                </div>

                {/* Workload Forecast Card */}
                <div className="col-span-2 sm:col-span-2 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-slate-400">
                            <CalendarClock size={14} className="text-blue-500"/>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Previsão (7 dias)</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">{stats.workload.reduce((a,b) => a+b.count,0)} questões</span>
                    </div>
                    <div className="h-12 w-full">
                        <WorkloadChart data={stats.workload} />
                    </div>
                </div>
            </div>

            {/* Area Breakdown Side Panel */}
            <div className="md:col-span-4 bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm flex flex-col h-full min-h-[200px]">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Layers size={14} className="text-amber-500"/>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Desempenho por Área</span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
                    {stats.areaList.map(area => (
                        <div key={area.area} className="space-y-1">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px]">{area.area}</span>
                                <div className="flex gap-2">
                                    <span className="font-bold text-slate-400 text-[10px]">{area.volume}q</span>
                                    <span className={`font-black text-[10px] ${getPerformanceColor(area.accuracy, 80, 'text')}`}>{area.accuracy}%</span>
                                </div>
                            </div>
                            <div className="flex h-1.5 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full ${getPerformanceColor(area.accuracy, 80, 'bg')}`} 
                                    style={{width: `${area.accuracy}%`}}
                                ></div>
                            </div>
                        </div>
                    ))}
                    {stats.areaList.length === 0 && (
                        <div className="text-center text-xs text-slate-400 py-4">Nenhum dado registrado.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Mini Chart Component (CSS Bar Chart for Robustness) ---
export const MiniEvolutionChart = ({ reviews }: { reviews: any[] }) => {
    const doneReviews = useMemo(() => {
         return reviews.filter(r => r.done).sort((a,b) => a.date.localeCompare(b.date));
    }, [reviews]);

    if (doneReviews.length === 0) return (
        <div className="h-full w-full flex items-center justify-center text-[9px] text-slate-400 font-bold uppercase tracking-wide opacity-50 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-xl">
            Sem dados
        </div>
    );

    return (
        <div className="w-full h-full flex flex-col justify-end relative px-2 pb-2">
            {/* Background Grid Lines */}
            <div className="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none z-0 px-2 opacity-30">
                <div className="w-full h-px bg-slate-200 dark:bg-white/10 border-t border-dashed border-slate-300 dark:border-white/20"></div>
                <div className="w-full h-px bg-slate-200 dark:bg-white/10 border-t border-dashed border-slate-300 dark:border-white/20"></div>
                <div className="w-full h-px bg-slate-200 dark:bg-white/10 border-t border-dashed border-slate-300 dark:border-white/20"></div>
            </div>

            {/* Bars Container */}
            <div className="flex items-end justify-around h-full gap-2 sm:gap-4 z-10 w-full pb-1">
                {doneReviews.map((r, i) => {
                    const acc = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
                    
                    // Determine Color based on performance
                    let barColor = 'bg-red-500';
                    let textColor = 'text-red-500';
                    
                    if (acc >= 80) { 
                        barColor = 'bg-emerald-500'; 
                        textColor = 'text-emerald-600 dark:text-emerald-400';
                    } else if (acc >= 60) { 
                        barColor = 'bg-amber-500'; 
                        textColor = 'text-amber-600 dark:text-amber-400';
                    }

                    return (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group max-w-[60px] min-w-[20px] relative">
                            
                            {/* Floating Tooltip */}
                            <div className="absolute bottom-[calc(100%+8px)] opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-20 pointer-events-none">
                                <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl whitespace-nowrap flex flex-col items-center">
                                    <span>{formatDate(r.date)}</span>
                                    <span className="opacity-80 font-medium">{r.correct}/{r.total}</span>
                                </div>
                                <div className="w-2 h-2 bg-slate-900 rotate-45 mx-auto -mt-1"></div>
                            </div>
                            
                            {/* Percentage Label */}
                            <span className={`text-[10px] sm:text-xs font-black mb-1 transition-all ${textColor}`}>
                                {acc}%
                            </span>
                            
                            {/* The Bar */}
                            <div 
                                className={`w-full ${barColor} rounded-t-md opacity-90 group-hover:opacity-100 transition-all duration-500 relative shadow-sm`}
                                style={{ height: `${Math.max(acc, 10)}%` }}
                            >
                                {/* Gradient Overlay for depth */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-md"></div>
                            </div>
                            
                            {/* X-Axis Label */}
                            <div className="h-5 flex items-center justify-center w-full mt-2 border-t border-slate-200 dark:border-white/10 pt-1">
                                <span className="text-[9px] font-bold text-slate-400 uppercase truncate w-full text-center tracking-tight">
                                    {r.label.split(':')[0].replace('R', 'R')}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const DatabaseView = ({ topics, onEdit, onDelete, simulados, onEditSimulado, onDeleteSimulado, config, searchTerm }: { topics: Topic[], onEdit: (t: Topic) => void, onDelete: (id: string) => void, simulados?: Simulado[], onEditSimulado?: (s: Simulado) => void, onDeleteSimulado?: (id: string) => void, config?: UserConfig, searchTerm?: string }) => {
    const [filterArea, setFilterArea] = useState('all');
    const [activeTab, setActiveTab] = useState<'topics' | 'simulados'>('topics');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filteredTopics = useMemo(() => {
        return topics.filter(t => !t.deleted).filter(t => {
            if (filterArea !== 'all' && t.area !== filterArea) return false;
            if (searchTerm && !t.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        }).sort((a,b) => a.title.localeCompare(b.title));
    }, [topics, filterArea, searchTerm]);

    const filteredSimulados = useMemo(() => {
        if (!simulados) return [];
        return simulados.filter(s => !s.deleted).filter(s => {
            if (searchTerm && !s.name.toLowerCase().includes(searchTerm.toLowerCase()) && !s.year.includes(searchTerm)) return false;
            return true;
        }).sort((a,b) => new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime());
    }, [simulados, searchTerm]);

    // Combined filtered data for the Analytics component
    // We only pass what's visible to make the analytics "Context Aware"
    const analyticsTopics = useMemo(() => {
        return topics.filter(t => !t.deleted).filter(t => {
            if (filterArea !== 'all' && t.area !== filterArea) return false;
            return true;
        });
    }, [topics, filterArea]);

    const analyticsSimulados = useMemo(() => simulados?.filter(s => !s.deleted) || [], [simulados]);

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
            {/* Header: Tabs + Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex p-1 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl w-full sm:w-auto">
                    <button 
                        onClick={() => setActiveTab('topics')}
                        className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${activeTab === 'topics' ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-md' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                    >
                        Matérias
                    </button>
                    <button 
                        onClick={() => setActiveTab('simulados')}
                        className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${activeTab === 'simulados' ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-md' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                    >
                        Simulados
                    </button>
                </div>

                {activeTab === 'topics' && (
                    <div className="relative w-full sm:w-48">
                        <select 
                            value={filterArea} 
                            onChange={(e) => setFilterArea(e.target.value)} 
                            className="w-full h-full pl-4 pr-10 py-3 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl text-sm font-bold outline-none appearance-none cursor-pointer text-slate-800 dark:text-slate-200"
                        >
                            <option value="all">Todas as Áreas</option>
                            {AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                        <ArrowDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                )}
            </div>

            {/* --- NEW ANALYTICS SECTION --- */}
            <DatabaseAnalytics topics={analyticsTopics} simulados={analyticsSimulados} />

            <div className="flex-1 bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/10 shadow-sm overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-black/20 sticky top-0 backdrop-blur-sm z-10">
                            <tr>
                                <th className="p-4 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeTab === 'topics' ? 'Matéria' : 'Instituição'}</th>
                                <th className="p-4 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell">{activeTab === 'topics' ? 'Área' : 'Ano'}</th>
                                <th className="p-4 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">{activeTab === 'topics' ? 'Prog.' : 'Data'}</th>
                                <th className="p-4 sm:p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Nota</th>
                                <th className="p-4 sm:p-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {activeTab === 'topics' ? (
                                filteredTopics.length === 0 ? (
                                    <tr><td colSpan={5} className="p-8 text-center text-slate-400 text-xs font-bold">Nenhum registro encontrado.</td></tr>
                                ) : filteredTopics.map(t => {
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
                                                <td className="p-3 sm:p-4 font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 line-clamp-2 sm:line-clamp-1">{t.title}</td>
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
                                    )
                                })
                            ) : (
                                filteredSimulados.length === 0 ? (
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
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
