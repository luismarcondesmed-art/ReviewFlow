
import React, { useMemo } from 'react';
import { 
    Clock, Activity, Flame, CheckCircle2, ChevronRight, Sun, ArrowUpDown, Filter, PlayCircle
} from 'lucide-react';
import { Topic, Simulado, UserConfig } from './types';
import { getTodayStr, getAreaTheme, formatDate, getPerformanceBgLight } from './utils';
import { SmartSuggestions, HeatmapWidget, SimuladosMiniWidget, TopicCard } from './components';

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
    children, setSortOrder, setFilterArea, sortOrder, filterArea, searchTerm 
}: { 
    topics: Topic[], simulados: Simulado[], config: UserConfig, 
    onReview: (id: string, idx: number) => void, onEditTopic: (id: string) => void, 
    children?: React.ReactNode, setSortOrder: any, setFilterArea: any, 
    sortOrder: string, filterArea: string, searchTerm?: string 
}) => {
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
                 const pMap = { high: 3, medium: 2, low: 1 };
                 return (pMap[b.topic.importance] || 2) - (pMap[a.topic.importance] || 2);
            });
    }, [filteredActiveTopics, today]);

    const startQuickSession = () => {
        if (dueItems.length > 0) {
            onReview(dueItems[0].topic.id, dueItems[0].idx);
        }
    };

    return (
        <div className="flex flex-col gap-6 lg:gap-8 h-full pb-32 lg:pb-0 animate-scale-in">
            <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
                {/* LEFT COLUMN (MAIN PANEL - FOCUS) */}
                <div className="col-span-8 flex flex-col gap-6">
                    {/* Control Panel */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 tracking-tight hidden lg:block">Painel de Estudos</h3>
                            <div className="flex gap-2">
                                <div className="relative group">
                                    <button className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 hover:text-blue-500 transition-colors">
                                        <ArrowUpDown size={18} />
                                    </button>
                                    <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1 z-50 hidden group-hover:block animate-scale-in">
                                        {['date', 'priority', 'questions'].map(opt => (
                                            <button 
                                                key={opt}
                                                onClick={() => setSortOrder(opt)}
                                                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg ${sortOrder === opt ? 'bg-blue-50 text-blue-600 dark:bg-white/10 dark:text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                            >
                                                {opt === 'date' ? 'Data (Recentes)' : opt === 'priority' ? 'Prioridade' : 'Questões'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 hover:text-blue-500 transition-colors">
                                    <Filter size={18} />
                                </button>
                            </div>
                        </div>
                        
                        {/* Topic List */}
                        <div className="min-h-0">
                             {children}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN (SIDEBAR - WIDGETS) */}
                <div className="col-span-4 flex flex-col gap-6 sticky top-24">
                    
                    {/* --- TO DO TODAY WIDGET --- */}
                    <div className="relative w-full bg-white dark:bg-[#18181b] border border-blue-100 dark:border-blue-900/30 rounded-[32px] p-6 shadow-sm overflow-hidden group hover:border-blue-300 dark:hover:border-blue-800/50 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent dark:from-blue-900/10 rounded-bl-[60px] pointer-events-none -z-0"></div>
                        
                        <div className="relative z-10 flex flex-col gap-5">
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                        <Clock size={24} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Para Hoje</div>
                                        <div className="text-3xl font-black text-slate-800 dark:text-white tracking-tight leading-none">{dueItems.length}</div>
                                    </div>
                                </div>
                                {dueItems.length > 0 && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>}
                            </div>

                            {/* Action Button */}
                            {dueItems.length > 0 ? (
                                <button 
                                    onClick={startQuickSession}
                                    className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <PlayCircle size={18} strokeWidth={2.5}/>
                                    <span className="text-xs font-black uppercase tracking-wide">Iniciar Sessão</span>
                                </button>
                            ) : (
                                <div className="w-full py-3 bg-slate-50 dark:bg-white/5 text-slate-400 rounded-xl flex items-center justify-center gap-2 border border-slate-100 dark:border-white/5">
                                    <CheckCircle2 size={16}/>
                                    <span className="text-xs font-bold">Tudo feito!</span>
                                </div>
                            )}

                            {/* Mini List */}
                            <div className="flex flex-col gap-2">
                                {dueItems.slice(0, 3).map((item) => {
                                    const theme = getAreaTheme(item.topic.area);
                                    const initials = getAreaInitials(item.topic.area);
                                    return (
                                        <div 
                                            key={`${item.topic.id}-${item.idx}`} 
                                            onClick={() => onReview(item.topic.id, item.idx)}
                                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-100 dark:hover:border-blue-500/20 transition-all cursor-pointer group/item"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${theme.bg} ${theme.text}`}>
                                                    {initials}
                                                </div>
                                                <div className="truncate">
                                                    <h4 className="font-bold text-xs text-slate-700 dark:text-slate-200 truncate">{item.topic.title}</h4>
                                                    <div className="text-[9px] font-bold text-slate-400">{item.label}</div>
                                                </div>
                                            </div>
                                            <ChevronRight size={14} className="text-slate-300 group-hover/item:text-blue-500 transition-colors"/>
                                        </div>
                                    );
                                })}
                                {dueItems.length > 3 && (
                                    <div className="text-center">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase cursor-pointer hover:text-blue-500 transition-colors">
                                            + {dueItems.length - 3} outros
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel rounded-[32px] p-6 shadow-sm flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden shrink-0">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 self-start relative z-10"><Flame size={16} className="text-orange-500"/> Constância</h4>
                        <div className="relative z-10"><HeatmapWidget topics={activeTopics} simulados={activeSimulados} /></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                    </div>
                    
                    <div className="h-56 shrink-0"><SimuladosMiniWidget simulados={activeSimulados} targetAccuracy={config.targetAccuracy} /></div>

                    <div className="glass-panel rounded-[32px] p-6 shadow-sm flex-1 overflow-hidden flex flex-col min-h-[300px]">
                        <h4 className="font-bold text-xs text-slate-800 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2"><Activity size={14} className="text-blue-500"/> Feed</h4>
                        <div className="overflow-y-auto custom-scrollbar flex-1 pr-1 space-y-2">
                            {(() => {
                                const recents = [];
                                activeTopics.forEach(t => t.reviews.forEach(r => { if(r.done) recents.push({ ...r, title: t.title, k: t.id + r.date + r.type, id: t.id }); }));
                                recents.sort((a,b) => b.date.localeCompare(a.date));
                                const display = recents.slice(0, 15);
                                if (display.length === 0) return <div className="text-[10px] text-slate-400 text-center py-10 font-bold uppercase tracking-wide">Sem atividades</div>;
                                return display.map((r, i) => {
                                    const acc = r.correct/r.total * 100;
                                    const pillClass = getPerformanceBgLight(acc, config.targetAccuracy);
                                    
                                    return (
                                        <div onClick={() => onEditTopic(r.id)} key={r.k} className="cursor-pointer flex justify-between items-center p-3 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 rounded-[18px] transition-all group border border-transparent hover:border-black/5 dark:hover:border-white/5">
                                            <div className="flex flex-col min-w-0 pr-3">
                                                <span className="truncate font-bold text-xs text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">{r.title}</span>
                                                <span className="text-slate-400 text-[9px] font-bold mt-0.5">{formatDate(r.date)} • {r.label.split(':')[0]}</span>
                                            </div>
                                            <div className={`font-bold px-2.5 py-1 rounded-lg text-[10px] ${pillClass}`}>
                                                {Math.round(acc)}%
                                            </div>
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden flex flex-col gap-6 px-1">
                <div className="bg-white dark:bg-[#18181b] p-5 rounded-[28px] border border-black/5 dark:border-white/5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">PARA FAZER HOJE</h2>
                            <div className="text-3xl font-black text-slate-800 dark:text-white">{dueItems.length} <span className="text-sm text-slate-400">pendentes</span></div>
                        </div>
                        {dueItems.length > 0 ? (
                            <button onClick={startQuickSession} className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg active:scale-95 transition-transform">
                                <PlayCircle size={24} strokeWidth={2.5}/>
                            </button>
                        ) : (
                            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400">
                                <Clock size={24} strokeWidth={2.5}/>
                            </div>
                        )}
                    </div>
                    {dueItems.length > 0 ? (
                        <div className="space-y-2">
                            {dueItems.slice(0,3).map(item => (
                                <div key={item.topic.id + item.idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-black/20 rounded-xl" onClick={() => onReview(item.topic.id, item.idx)}>
                                    <div className="truncate pr-2">
                                        <div className="font-bold text-xs text-slate-800 dark:text-white truncate">{item.topic.title}</div>
                                        <div className="text-[10px] text-slate-400">{item.label} • {item.topic.area}</div>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-400"/>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-4 text-xs font-bold text-slate-400">Tudo em dia!</div>
                    )}
                </div>

                <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Sugestões</h3>
                    <SmartSuggestions topics={filteredActiveTopics} onReview={onReview} />
                </div>
                
                {children}
            </div>
        </div>
    );
};
