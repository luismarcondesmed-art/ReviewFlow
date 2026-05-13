
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Clock, Activity, Flame, CheckCircle2, ChevronRight, Sun, ArrowUpDown, Filter, PlayCircle, Plus, BarChart2, ChevronDown, ChevronUp, Lightbulb, BookOpen, ClipboardList, AlertCircle, Calendar, X, LayoutGrid, BrainCircuit, Target, PlusCircle
} from 'lucide-react';
import { Topic, Simulado, UserConfig } from '../types';
import { getTodayStr, getAreaTheme, formatDate, getPerformanceBgLight, getPerformanceColor, AREAS, getPriorityInfo } from '../utils';
import { SmartSuggestions, HeatmapWidget, SimuladosMiniWidget, TopicCard, DetailedStatsWidget, FutureLoadWidget, RetentionWidget, AreaStatsWidget, getAreaIcon, WeeklyGoalsWidget } from '../components';
import { Modal, TodoModal, DailyTodoContent } from '../modals';

const DeepFocusContent = ({ onClose, dueItems, onReview }: { onClose: () => void; dueItems: any[]; onReview: (id: string, idx: number) => void }) => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'focus' | 'break'>('focus');

    useEffect(() => {
        let interval: any = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((t) => t - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            const nextMode = mode === 'focus' ? 'break' : 'focus';
            setMode(nextMode);
            setTimeLeft(nextMode === 'focus' ? 25 * 60 : 5 * 60);
            try {
                if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
            } catch(e) {}
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode]);

    const toggleTimer = () => setIsActive(!isActive);
    const setTimerMode = (newMode: 'focus' | 'break') => {
        setIsActive(false);
        setMode(newMode);
        setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');

    return (
        <div className="flex flex-col items-center justify-start flex-1 h-full w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-3xl relative pt-12 sm:pt-16 pb-8 animate-fade-in shadow-sm">
            <button onClick={() => { setIsActive(false); onClose(); }} className="absolute top-4 right-4 p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-2xl transition-all active:scale-95 text-slate-500 font-bold text-xs flex items-center gap-2">
                Sair
                <X size={16} />
            </button>
            <div className="flex gap-2 bg-slate-100/80 dark:bg-zinc-800/80 p-1.5 rounded-2xl w-full max-w-[280px] shadow-inner border border-slate-200/50 dark:border-white/5 mx-auto shrink-0 mt-4 sm:mt-0 mb-8 sm:mb-12">
                <button onClick={() => setTimerMode('focus')} className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${mode === 'focus' ? 'bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>Foco Profundo</button>
                <button onClick={() => setTimerMode('break')} className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${mode === 'break' ? 'bg-white dark:bg-zinc-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>Pausa</button>
            </div>

            <div className="relative group flex justify-center items-center w-full mb-12 sm:mb-16 shrink-0 flex-1 min-h-[300px]">
                <div className={`absolute inset-0 blur-3xl opacity-20 transition-all duration-1000 rounded-full w-64 h-64 sm:w-96 sm:h-96 mx-auto ${isActive ? 'opacity-40 scale-105' : 'opacity-20 scale-100'} ${mode === 'focus' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                <div className={`w-64 h-64 sm:w-80 sm:h-80 rounded-[3rem] flex flex-col items-center justify-center border-[8px] sm:border-[16px] relative bg-white dark:bg-zinc-900 shadow-2xl transition-all duration-500 ${mode === 'focus' ? 'border-blue-50 dark:border-blue-900/40 text-blue-600 dark:text-blue-400' : 'border-emerald-50 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400'}`}>
                    <span className="text-7xl sm:text-8xl font-black tracking-tighter tabular-nums">{mins}:{secs}</span>
                </div>
            </div>

            <div className="flex gap-4 justify-center w-full shrink-0 mb-10 sm:mb-16">
                <button onClick={toggleTimer} className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white shadow-xl active:scale-95 transition-all duration-300 ${mode === 'focus' ? 'bg-gradient-to-tr from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-500/30' : 'bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-emerald-500/30'}`}>
                    {isActive ? <span className="font-black text-sm sm:text-base uppercase tracking-widest">Pausar</span> : <PlayCircle size={40} className="sm:w-12 sm:h-12 ml-1" fill="currentColor" />}
                </button>
            </div>
            
            {mode === 'focus' && dueItems.length > 0 ? (
                <div className="w-full max-w-lg mx-auto shrink-0 px-4">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 text-center">Foco de Hoje ({dueItems.length})</h3>
                    <div 
                        className="bg-slate-50 dark:bg-zinc-800/80 p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 flex items-center justify-between group cursor-pointer hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-md transition-all font-bold text-sm sm:text-base" 
                        onClick={() => {
                            setIsActive(false);
                            onReview(dueItems[0].topic.id, dueItems[0].idx);
                        }}
                    >
                        <div className="truncate pr-4 flex-1 text-slate-800 dark:text-slate-200">{dueItems[0].topic.title}</div>
                        <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl shrink-0 transition-colors shadow-sm shadow-blue-500/20 text-xs sm:text-sm uppercase tracking-wide">Começar</button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-lg mx-auto h-[80px] sm:h-[100px] shrink-0 px-4"></div>
            )}
        </div>
    );
};

export const HubView = ({ 
    topics, simulados, config, dailyNotes, setDailyNotes, onReview, onEditTopic, onDeleteTopic,
    setSortOrder, setFilterArea, sortOrder, filterArea, searchTerm,
    onAddSimulado
}: { 
    topics: Topic[], simulados: Simulado[], config: UserConfig, 
    dailyNotes: Record<string, string>, setDailyNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    onReview: (id: string, idx: number) => void, onEditTopic: (id: string) => void, onDeleteTopic?: (id: string) => void,
    setSortOrder: any, setFilterArea: any, 
    sortOrder: string, filterArea: string, searchTerm?: string,
    onAddSimulado?: () => void
}) => {
    const [isPendingExpanded, setIsPendingExpanded] = useState(false);
    const [isChecklistExpanded, setIsChecklistExpanded] = useState(false);
    const [deepFocusOpen, setDeepFocusOpen] = useState(false);
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
             if (sortOrder === 'area') {
                 const areaCompare = a.area.localeCompare(b.area);
                 if (areaCompare !== 0) return areaCompare;
                 return (b.updatedAt || 0) - (a.updatedAt || 0);
             }
             if (sortOrder === 'date') return (b.updatedAt || 0) - (a.updatedAt || 0);
             if (sortOrder === 'priority') {
                 const pMap: any = { high: 3, medium: 2, low: 1 };
                 return (pMap[b.importance] || 1) - (pMap[a.importance] || 1);
             }
             if (sortOrder === 'questions') {
                 const getQ = (t: Topic) => t.reviews.filter(r => r.done).reduce((acc, r) => acc + r.total, 0);
                 return getQ(b) - getQ(a);
             }
             if (sortOrder === 'name') {
                 return a.title.localeCompare(b.title);
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

    const { todaysDone, todaysTotal } = useMemo(() => {
        const allUpToToday = activeTopics.flatMap(t => t.reviews.map((r, idx) => ({ ...r, topic: t, idx }))).filter(r => r.date <= today);
        return {
            todaysDone: allUpToToday.filter(r => r.done).length,
            todaysTotal: allUpToToday.length
        };
    }, [activeTopics, today]);

    const todaysProgress = todaysTotal > 0 ? Math.round((todaysDone / todaysTotal) * 100) : 100;

    const startQuickSession = () => {
        if (dueItems.length > 0) {
            onReview(dueItems[0].topic.id, dueItems[0].idx);
        }
    };

    const handlePendingClick = (e: React.MouseEvent) => {
        setIsPendingExpanded(!isPendingExpanded);
    };

    if (deepFocusOpen) {
        return (
            <div ref={containerRef} className="flex flex-col gap-6 h-full pb-32 lg:pb-0 max-w-6xl mx-auto w-full relative">
                <DeepFocusContent onClose={() => setDeepFocusOpen(false)} dueItems={dueItems} onReview={onReview} />
            </div>
        );
    }

    return (
        <div ref={containerRef} className="flex flex-col gap-6 h-full pb-32 lg:pb-0 animate-scale-in max-w-6xl mx-auto w-full relative">
            <motion.div className="pt-2">
                <div className="flex flex-col gap-6 animate-fade-in">
                    {/* HUB HERO: Missão do Dia */}
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[24px] p-4 lg:p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden">
                        {/* Decorative background blur */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>

                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10 w-full mb-2">
                            <div className="flex-1 w-full">
                                <h2 className="text-xl lg:text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2 mb-2">
                                    {dueItems.length > 0 ? (
                                        <><Target size={20} className="text-blue-500"/> Foco de Hoje</>
                                    ) : (
                                        <><CheckCircle2 size={20} className="text-emerald-500"/> Tudo em dia!</>
                                    )}
                                </h2>
                                
                                {todaysTotal > 0 && (
                                    <div className="flex flex-col gap-1.5 w-full md:w-2/3 lg:w-1/2">
                                         <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400">
                                            <span>{todaysDone} de {todaysTotal} {todaysTotal === 1 ? 'concluído' : 'concluídos'}</span>
                                            <span className="text-blue-600 dark:text-blue-400">{todaysProgress}%</span>
                                         </div>
                                         <div className="h-2.5 w-full bg-slate-100 dark:bg-black/40 rounded-full overflow-hidden shadow-inner">
                                            <div 
                                                className={`h-full rounded-full transition-all duration-1000 ${todaysProgress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-cyan-400 to-blue-500'}`}
                                                style={{ width: `${todaysProgress}%` }}
                                            ></div>
                                         </div>
                                    </div>
                                )}
                                {todaysTotal === 0 && (
                                    <p className="text-slate-500 dark:text-slate-400 text-xs lg:text-sm font-medium">Nenhuma revisão agendada para hoje.</p>
                                )}
                            </div>

                            {dueItems.length > 0 && (
                                <div className="flex bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl w-full md:w-auto shrink-0 border border-slate-200/50 dark:border-white/5">
                                    <button 
                                        onClick={startQuickSession}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white dark:bg-zinc-700 text-slate-900 dark:text-white rounded-lg font-bold text-xs shadow-sm transition-all active:scale-95"
                                    >
                                        <PlayCircle size={14} className="text-blue-500"/> Começar a Revisar
                                    </button>
                                    <button 
                                        onClick={() => setDeepFocusOpen(true)}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-white/50 dark:hover:bg-zinc-700/50 rounded-lg font-bold text-xs transition-all active:scale-95"
                                    >
                                        <BrainCircuit size={14}/> Foco Profundo
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Direct Display of Pending Reviews - Horizontal Scroll on Mobile */}
                        {dueItems.length > 0 && (
                            <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10 pb-2 md:pb-0 custom-scrollbar snap-x">
                                {dueItems.slice(0, 3).map((item: any) => {
                                    const theme = getAreaTheme(item.topic.area);
                                    const isOverdue = item.date < today;
                                    const numQuestions = item.topic.reviews[item.idx]?.targetQ || 0;
                                    return (
                                        <div 
                                            key={`${item.topic.id}-${item.idx}`} 
                                            onClick={() => onReview(item.topic.id, item.idx)}
                                            className="w-[240px] md:w-auto shrink-0 snap-start bg-slate-50 dark:bg-black/20 p-3 rounded-2xl border border-slate-200/60 dark:border-white/5 cursor-pointer hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-md hover:bg-white dark:hover:bg-black/40 transition-all group flex flex-col gap-2"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${theme.bg} ${theme.text}`}>
                                                    <BookOpen size={14}/>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md flex items-center gap-1 ${isOverdue ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400' : 'bg-slate-200/50 text-slate-500 dark:bg-white/5 dark:text-slate-400'}`}>
                                                        {isOverdue && <AlertCircle size={10}/>}
                                                        {isOverdue ? 'Atrasado' : 'Hoje'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xs lg:text-sm text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.topic.title}</h4>
                                                <div className="flex items-center gap-1.5 mt-1 opacity-70">
                                                    <span className="text-[9px] lg:text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">{item.label.split(':')[0]}</span>
                                                    {numQuestions > 0 && (
                                                        <>
                                                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                                            <span className="text-[9px] lg:text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1"><ClipboardList size={10}/> {numQuestions} Qs</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {dueItems.length > 3 && (
                                    <div 
                                        onClick={() => setIsPendingExpanded(!isPendingExpanded)}
                                        className="w-[120px] md:w-auto shrink-0 snap-start bg-slate-50/50 dark:bg-black/10 p-3 rounded-2xl border border-slate-200/50 dark:border-white/5 cursor-pointer hover:bg-slate-100 dark:hover:bg-black/20 hover:border-slate-300 dark:hover:border-white/10 transition-all flex flex-col items-center justify-center gap-1 text-slate-500"
                                    >
                                        <PlusCircle size={20} className="opacity-50"/>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-center">Ver Mais<br/>({dueItems.length - 3})</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Expanded List */}
                        <AnimatePresence>
                            {isPendingExpanded && dueItems.length > 3 && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="border-t border-slate-100 dark:border-white/5 pt-4"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
                                        {dueItems.slice(3).map((item: any) => {
                                            const theme = getAreaTheme(item.topic.area);
                                            const isOverdue = item.date < today;
                                            const numQuestions = item.topic.reviews[item.idx]?.targetQ || 0;
                                            return (
                                                <div 
                                                    key={`${item.topic.id}-${item.idx}`} 
                                                    onClick={() => onReview(item.topic.id, item.idx)}
                                                    className="bg-slate-50 dark:bg-black/20 p-3 rounded-2xl border border-slate-200/60 dark:border-white/5 cursor-pointer hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-md hover:bg-white dark:hover:bg-black/40 transition-all group flex items-center justify-between gap-3"
                                                >
                                                    <div className="flex flex-col flex-1 min-w-0">
                                                        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.topic.title}</h4>
                                                        <div className="flex items-center gap-2 mt-1 opacity-70">
                                                            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">{item.label.split(':')[0]}</span>
                                                            <span className={`text-[10px] font-bold uppercase tracking-wider ml-auto ${isOverdue ? 'text-red-500' : 'text-slate-400'}`}>
                                                                {isOverdue ? 'Atrasado' : 'Hoje'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                        {/* Mobile: Toggle Checklist Dropdown */}
                        {!isDesktop && (
                            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] shadow-sm overflow-hidden">
                                <button 
                                    onClick={() => setIsChecklistExpanded(!isChecklistExpanded)}
                                    className="w-full p-4 flex items-center justify-between text-left active:bg-slate-50 dark:active:bg-white/5 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center">
                                            <ClipboardList size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">Checklist do Dia</h3>
                                            <p className="text-xs text-slate-500">Toque para ver suas atividades</p>
                                        </div>
                                    </div>
                                    <ChevronDown size={20} className={`text-slate-400 transition-transform ${isChecklistExpanded ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {isChecklistExpanded && (
                                    <div className="border-t border-slate-100 dark:border-white/5 animate-scale-in">
                                        <DailyTodoContent 
                                            dailyNotes={dailyNotes} 
                                            setDailyNotes={setDailyNotes} 
                                            onClose={() => setIsChecklistExpanded(false)} 
                                            hideHeader={true} 
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                {/* Smart Suggestions */}
                                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm relative overflow-hidden group">
                                    <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2"><Lightbulb size={16} className="text-amber-500"/> Sugestões Inteligentes</h4>
                                    <SmartSuggestions topics={activeTopics} onReview={onReview} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Retention */}
                                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm overflow-hidden">
                                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2"><BrainCircuit size={16} className="text-purple-500"/> Retenção Global</h4>
                                        <div className="h-40">
                                            <RetentionWidget topics={activeTopics} />
                                        </div>
                                    </div>
                                    {/* Future Load */}
                                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm overflow-hidden">
                                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2"><Activity size={16} className="text-slate-500"/> Previsão de Carga</h4>
                                        <div className="h-40">
                                            <FutureLoadWidget topics={activeTopics} />
                                        </div>
                                    </div>
                                </div>

                                {/* Constância */}
                                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm overflow-hidden">
                                    <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2"><Flame size={16} className="text-orange-500"/> Constância</h4>
                                    <div 
                                        className="flex justify-center overflow-x-auto"
                                        onPointerDownCapture={(e) => e.stopPropagation()}
                                    >
                                        <HeatmapWidget topics={activeTopics} simulados={activeSimulados} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                {/* Desktop Checklist */}
                                {isDesktop && (
                                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] shadow-sm flex flex-col h-[400px] overflow-hidden">
                                        <DailyTodoContent dailyNotes={dailyNotes} setDailyNotes={setDailyNotes} />
                                    </div>
                                )}

                                {/* Metas Semanais */}
                                <WeeklyGoalsWidget config={config} topics={activeTopics} simulados={activeSimulados} />

                                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm overflow-hidden">
                                    <div className="flex items-center justify-between mb-6">
                                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2"><ClipboardList size={16} className="text-blue-500"/> Simulados</h4>
                                    </div>
                                    <SimuladosMiniWidget simulados={activeSimulados} targetAccuracy={config?.targetAccuracy || 80} onAdd={onAddSimulado || (() => {})} />
                                </div>
                            </div>
                        </div>
                    </div>
            </motion.div>
        </div>
    );
};
