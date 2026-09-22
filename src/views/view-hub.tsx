import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Clock, Activity, Flame, CheckCircle2, ChevronRight, PlayCircle, Plus, 
    BarChart2, ChevronDown, ChevronUp, Lightbulb, BookOpen, ClipboardList, 
    AlertCircle, Calendar, X, BrainCircuit, Target, PlusCircle, ArrowRight, 
    Sparkles, Check, Award, TrendingUp, Layers, ExternalLink
} from 'lucide-react';
import { Topic, Simulado, UserConfig } from '../types';
import { 
    getTodayStr, getAreaTheme, formatDate, getPerformanceBgLight, 
    getPerformanceColor, AREAS, getTopicTrack, getTrackBadgeInfo 
} from '../utils';
import { 
    SmartSuggestions, HeatmapWidget, SimuladosMiniWidget, 
    FutureLoadWidget, RetentionWidget, WeeklyGoalsWidget 
} from '../components';
import { DailyTodoContent } from '../modals';

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
    onAddSimulado, onNavigateToView, onOpenNewTopic, onUpdateTopic
}: { 
    topics: Topic[], simulados: Simulado[], config: UserConfig, 
    dailyNotes: Record<string, string>, setDailyNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    onReview: (id: string, idx: number) => void, onEditTopic: (id: string) => void, onDeleteTopic?: (id: string) => void,
    setSortOrder?: any, setFilterArea?: any, 
    sortOrder?: string, filterArea?: string, searchTerm?: string,
    onAddSimulado?: () => void,
    onNavigateToView?: (view: string) => void,
    onOpenNewTopic?: () => void,
    onUpdateTopic?: (topic: Topic) => void
}) => {
    const [isPendingExpanded, setIsPendingExpanded] = useState(false);
    const [isChecklistExpanded, setIsChecklistExpanded] = useState(false);
    const [deepFocusOpen, setDeepFocusOpen] = useState(false);
    
    // Study Track Filter (Concurso vs. Residência vs. Todas)
    const [trackFilter, setTrackFilter] = useState<'all' | 'concurso' | 'residencia'>(() => {
        try {
            return (localStorage.getItem('study_hub_track_filter') as any) || 'all';
        } catch(e) {
            return 'all';
        }
    });

    const handleSetTrackFilter = (track: 'all' | 'concurso' | 'residencia') => {
        setTrackFilter(track);
        try {
            localStorage.setItem('study_hub_track_filter', track);
        } catch(e) {}
    };

    const containerRef = useRef<HTMLDivElement>(null);
    
    const today = getTodayStr();
    const activeTopics = useMemo(() => topics.filter(t => !t.deleted), [topics]);
    const activeSimulados = useMemo(() => simulados.filter(s => !s.deleted), [simulados]);

    // Track counts
    const trackCounts = useMemo(() => {
        let concurso = 0;
        let residencia = 0;
        for (const t of activeTopics) {
            const tr = getTopicTrack(t);
            if (tr === 'concurso') concurso++;
            else if (tr === 'residencia') residencia++;
        }
        return {
            concurso,
            residencia,
            all: activeTopics.length
        };
    }, [activeTopics]);

    // Active topics filtered by selected Track
    const trackFilteredTopics = useMemo(() => {
        if (trackFilter === 'all') return activeTopics;
        return activeTopics.filter(t => getTopicTrack(t) === trackFilter);
    }, [activeTopics, trackFilter]);

    // Sub-filtered by search term
    const filteredActiveTopics = useMemo(() => {
        let result = trackFilteredTopics;
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(t => t.title.toLowerCase().includes(lower));
        }
        return result;
    }, [trackFilteredTopics, searchTerm]);

    // Pending reviews for today
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

    // Today's completion stats for current track filter
    const { todaysDone, todaysTotal } = useMemo(() => {
        const allUpToToday = filteredActiveTopics.flatMap(t => t.reviews.map((r, idx) => ({ ...r, topic: t, idx }))).filter(r => r.date <= today);
        return {
            todaysDone: allUpToToday.filter(r => r.done).length,
            todaysTotal: allUpToToday.length
        };
    }, [filteredActiveTopics, today]);

    const todaysProgress = todaysTotal > 0 ? Math.round((todaysDone / todaysTotal) * 100) : 100;

    // KPI Metrics calculation
    const kpiMetrics = useMemo(() => {
        let totalQuestions = 0;
        let totalCorrect = 0;
        let completedReviews = 0;

        for (const t of trackFilteredTopics) {
            for (const r of t.reviews) {
                if (r.done) {
                    completedReviews++;
                    totalQuestions += (r.total || 0);
                    totalCorrect += (r.correct || 0);
                }
            }
        }

        const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

        // Days until target exam
        let daysToExam: number | null = null;
        if (config?.examDate) {
            const examD = new Date(config.examDate).getTime();
            const nowD = new Date(today).getTime();
            const diff = Math.ceil((examD - nowD) / (1000 * 3600 * 24));
            if (diff >= 0) daysToExam = diff;
        }

        return {
            totalQuestions,
            totalCorrect,
            overallAccuracy,
            completedReviews,
            daysToExam
        };
    }, [trackFilteredTopics, config?.examDate, today]);

    const startQuickSession = () => {
        if (dueItems.length > 0) {
            onReview(dueItems[0].topic.id, dueItems[0].idx);
        }
    };

    if (deepFocusOpen) {
        return (
            <div ref={containerRef} className="flex flex-col gap-6 h-full pb-32 lg:pb-0 w-full relative">
                <DeepFocusContent onClose={() => setDeepFocusOpen(false)} dueItems={dueItems} onReview={onReview} />
            </div>
        );
    }

    return (
        <div ref={containerRef} className="flex flex-col gap-4 sm:gap-6 h-full pb-32 lg:pb-6 animate-scale-in w-full relative">
            
            {/* 1. TOP HEADER & INTEGRATED ACTION STRIP */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-[24px] p-3.5 sm:p-5 shadow-xs flex flex-col gap-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    
                    {/* Track Selection Switcher */}
                    <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 dark:bg-zinc-800/80 rounded-xl border border-slate-200/50 dark:border-white/5 overflow-x-auto shrink-0 custom-scrollbar">
                        <button 
                            onClick={() => handleSetTrackFilter('all')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                                trackFilter === 'all'
                                    ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-xs font-black'
                                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                            }`}
                        >
                            <span>🌐 Todos</span>
                            <span className="text-[10px] px-1.5 py-0.2 bg-slate-200/60 dark:bg-white/10 rounded-md text-slate-600 dark:text-slate-300 font-semibold">{trackCounts.all}</span>
                        </button>
                        <button 
                            onClick={() => handleSetTrackFilter('concurso')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                                trackFilter === 'concurso'
                                    ? 'bg-emerald-600 text-white shadow-xs font-black'
                                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                            }`}
                        >
                            <span>🎯 Concurso FAFIPA</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold ${trackFilter === 'concurso' ? 'bg-white/20 text-white' : 'bg-slate-200/60 dark:bg-white/10 text-slate-600 dark:text-slate-300'}`}>{trackCounts.concurso}</span>
                        </button>
                        <button 
                            onClick={() => handleSetTrackFilter('residencia')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                                trackFilter === 'residencia'
                                    ? 'bg-indigo-600 text-white shadow-xs font-black'
                                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                            }`}
                        >
                            <span>🩺 Residência</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold ${trackFilter === 'residencia' ? 'bg-white/20 text-white' : 'bg-slate-200/60 dark:bg-white/10 text-slate-600 dark:text-slate-300'}`}>{trackCounts.residencia}</span>
                        </button>
                    </div>

                    {/* Quick Bridges to Other Modules */}
                    <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                        {onNavigateToView && (
                            <>
                                <button 
                                    onClick={() => onNavigateToView('database')}
                                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all whitespace-nowrap active:scale-95"
                                    title="Acessar Acervo Completo"
                                >
                                    <BookOpen size={13} className="text-blue-500"/>
                                    <span>Acervo</span>
                                </button>
                                <button 
                                    onClick={() => onNavigateToView('simulados')}
                                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all whitespace-nowrap active:scale-95"
                                    title="Ver Simulados Realizados"
                                >
                                    <ClipboardList size={13} className="text-emerald-500"/>
                                    <span>Simulados</span>
                                </button>
                                <button 
                                    onClick={() => onNavigateToView('cronograma')}
                                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all whitespace-nowrap active:scale-95"
                                    title="Ver Cronograma e Frequência de Revisões"
                                >
                                    <Calendar size={13} className="text-amber-500"/>
                                    <span>Cronograma</span>
                                </button>
                            </>
                        )}
                        {onOpenNewTopic && (
                            <button 
                                onClick={onOpenNewTopic}
                                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-black font-black text-xs flex items-center gap-1.5 transition-all whitespace-nowrap shadow-xs active:scale-95 ml-auto md:ml-0"
                            >
                                <Plus size={13}/>
                                <span>Novo Tema</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Compact KPI Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-2 border-t border-slate-100 dark:border-white/5">
                    
                    {/* KPI 1: Progresso Hoje */}
                    <div className="p-2.5 sm:p-3 bg-slate-50/80 dark:bg-black/20 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            <span className="flex items-center gap-1"><Target size={11} className="text-blue-500"/> Meta do Dia</span>
                            <span className="text-blue-600 dark:text-blue-400 font-black">{todaysProgress}%</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tabular-nums">{todaysDone}</span>
                            <span className="text-xs font-semibold text-slate-400">/ {todaysTotal} {todaysTotal === 1 ? 'revisão' : 'revisões'}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200/70 dark:bg-zinc-800 rounded-full overflow-hidden mt-1.5">
                            <div 
                                className={`h-full transition-all duration-500 ${todaysProgress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                                style={{ width: `${todaysProgress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* KPI 2: Precisão Geral */}
                    <div className="p-2.5 sm:p-3 bg-slate-50/80 dark:bg-black/20 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            <span className="flex items-center gap-1"><TrendingUp size={11} className="text-emerald-500"/> Aproveitamento</span>
                            <span className={`text-[10px] font-black px-1.5 py-0.2 rounded ${getPerformanceBgLight(kpiMetrics.overallAccuracy, 80)}`}>
                                {kpiMetrics.overallAccuracy >= 80 ? 'Excelente' : kpiMetrics.overallAccuracy >= 65 ? 'Bom' : 'Atenção'}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tabular-nums">{kpiMetrics.overallAccuracy}%</span>
                            <span className="text-xs font-semibold text-slate-400">médio</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-400 truncate mt-1">
                            {kpiMetrics.totalCorrect} certas de {kpiMetrics.totalQuestions}
                        </span>
                    </div>

                    {/* KPI 3: Questões Resolvidas */}
                    <div className="p-2.5 sm:p-3 bg-slate-50/80 dark:bg-black/20 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            <span className="flex items-center gap-1"><CheckCircle2 size={11} className="text-indigo-500"/> Qs Resolvidas</span>
                            <span className="text-[10px] text-slate-400 font-bold">{kpiMetrics.completedReviews} revs</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tabular-nums">{kpiMetrics.totalQuestions}</span>
                            <span className="text-xs font-semibold text-slate-400">questões</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-400 truncate mt-1">
                            Total acumulado
                        </span>
                    </div>

                    {/* KPI 4: Contagem Prova / Fila */}
                    <div className="p-2.5 sm:p-3 bg-slate-50/80 dark:bg-black/20 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            <span className="flex items-center gap-1"><Clock size={11} className="text-amber-500"/> 
                                {kpiMetrics.daysToExam !== null ? 'Contagem Prova' : 'Pendências'}
                            </span>
                            {dueItems.length > 0 && (
                                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.2 rounded">
                                    {dueItems.length} hoje
                                </span>
                            )}
                        </div>
                        <div className="flex items-baseline gap-1">
                            {kpiMetrics.daysToExam !== null ? (
                                <>
                                    <span className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tabular-nums">{kpiMetrics.daysToExam}</span>
                                    <span className="text-xs font-semibold text-slate-400">dias restantes</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tabular-nums">{dueItems.length}</span>
                                    <span className="text-xs font-semibold text-slate-400">na fila</span>
                                </>
                            )}
                        </div>
                        <span className="text-[10px] font-medium text-slate-400 truncate mt-1">
                            {config?.examDate ? formatDate(config.examDate) : `${dueItems.length} matérias para rever`}
                        </span>
                    </div>

                </div>
            </div>

            {/* 2. FOCO DE HOJE / MISSÃO DO DIA (COMPACT & DIRECT HERO) */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-[24px] p-4 sm:p-5 shadow-xs flex flex-col gap-3 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                    <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${dueItems.length > 0 ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'}`}>
                            {dueItems.length > 0 ? <Target size={18} /> : <CheckCircle2 size={18} />}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white tracking-tight">
                                    {dueItems.length > 0 ? `Foco de Hoje (${dueItems.length})` : 'Revisões em dia!'}
                                </h3>
                                {trackFilter !== 'all' && (
                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                                        trackFilter === 'concurso' 
                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' 
                                            : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
                                    }`}>
                                        {trackFilter === 'concurso' ? 'Concurso' : 'Residência'}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {dueItems.length > 0 
                                    ? `${todaysDone} de ${todaysTotal} concluídos • Clique em um item para responder as questões` 
                                    : 'Parabéns, você completou todas as revisões programadas para hoje!'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        {dueItems.length > 0 && (
                            <>
                                <button 
                                    onClick={startQuickSession}
                                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                                >
                                    <PlayCircle size={14}/> Começar Agora
                                </button>
                                <button 
                                    onClick={() => setDeepFocusOpen(true)}
                                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                                    title="Modo Foco Profundo Pomodoro"
                                >
                                    <BrainCircuit size={14} className="text-purple-500"/> Foco
                                </button>
                            </>
                        )}
                        {config.studyLink && (
                            <a 
                                href={config.studyLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
                            >
                                <ExternalLink size={13}/> Plataforma
                            </a>
                        )}
                    </div>
                </div>

                {/* Due Items List */}
                {dueItems.length > 0 && (
                    <div className="flex flex-col gap-2 pt-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {dueItems.slice(0, 3).map((item: any) => {
                                const theme = getAreaTheme(item.topic.area);
                                const isOverdue = item.date < today;
                                const numQuestions = item.topic.reviews[item.idx]?.targetQ || 0;
                                const tr = getTopicTrack(item.topic);
                                const trackBadge = getTrackBadgeInfo(tr);
                                const trackIcon = tr === 'concurso' ? '🎯' : tr === 'residencia' ? '🩺' : '🌐';
                                const areaObj = AREAS.find(a => a.id === item.topic.area);
                                const areaName = item.topic.subarea || areaObj?.name || item.topic.area;

                                return (
                                    <div 
                                        key={`${item.topic.id}-${item.idx}`} 
                                        onClick={() => onReview(item.topic.id, item.idx)}
                                        className="bg-slate-50 hover:bg-white dark:bg-black/20 dark:hover:bg-zinc-800/60 p-3 rounded-xl border border-slate-200/70 hover:border-blue-400 dark:border-white/5 dark:hover:border-blue-500/40 cursor-pointer shadow-xs transition-all flex flex-col justify-between gap-2 group"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-black border ${trackBadge.badgeBg} ${trackBadge.badgeText} ${trackBadge.border}`}>
                                                    {trackIcon} {trackBadge.shortLabel}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate max-w-[130px]">
                                                    {areaName}
                                                </span>
                                            </div>
                                            <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0 ${
                                                isOverdue 
                                                    ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400' 
                                                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                                            }`}>
                                                {isOverdue && <AlertCircle size={9}/>}
                                                {isOverdue ? 'Atrasado' : 'Hoje'}
                                            </span>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {item.topic.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1 text-slate-500 text-[10px]">
                                                <span className="font-bold uppercase tracking-wider">{item.label.split(':')[0]}</span>
                                                {numQuestions > 0 && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="font-semibold flex items-center gap-0.5">
                                                            <ClipboardList size={10}/> {numQuestions} Questões
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 dark:border-white/5 text-[10px]">
                                            <span className="text-slate-400 font-medium">Revisão programada</span>
                                            <span className="font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center gap-0.5">
                                                Revisar <ArrowRight size={10}/>
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* View More Expander if > 3 items */}
                        {dueItems.length > 3 && (
                            <div className="flex flex-col gap-2 mt-1">
                                <button 
                                    onClick={() => setIsPendingExpanded(!isPendingExpanded)}
                                    className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 dark:bg-black/20 dark:hover:bg-white/5 rounded-xl border border-slate-200/60 dark:border-white/5 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                                >
                                    <span>{isPendingExpanded ? 'Ocultar pendências adicionais' : `Ver todas as outras pendências (${dueItems.length - 3})`}</span>
                                    {isPendingExpanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                                </button>

                                <AnimatePresence>
                                    {isPendingExpanded && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 overflow-hidden"
                                        >
                                            {dueItems.slice(3).map((item: any) => {
                                                const tr = getTopicTrack(item.topic);
                                                const trackBadge = getTrackBadgeInfo(tr);
                                                const trackIcon = tr === 'concurso' ? '🎯' : tr === 'residencia' ? '🩺' : '🌐';
                                                const isOverdue = item.date < today;
                                                const numQuestions = item.topic.reviews[item.idx]?.targetQ || 0;

                                                return (
                                                    <div 
                                                        key={`${item.topic.id}-${item.idx}`}
                                                        onClick={() => onReview(item.topic.id, item.idx)}
                                                        className="bg-slate-50 hover:bg-white dark:bg-black/20 dark:hover:bg-zinc-800/60 p-3 rounded-xl border border-slate-200/70 hover:border-blue-400 dark:border-white/5 cursor-pointer shadow-xs transition-all flex items-center justify-between gap-3 group"
                                                    >
                                                        <div className="flex flex-col min-w-0 flex-1">
                                                            <div className="flex items-center gap-1.5 mb-1">
                                                                <span className={`px-1 py-0.2 rounded text-[8px] font-black ${trackBadge.badgeBg} ${trackBadge.badgeText}`}>
                                                                    {trackIcon}
                                                                </span>
                                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{item.label.split(':')[0]}</span>
                                                                {numQuestions > 0 && <span className="text-[9px] font-semibold text-slate-400">• {numQuestions} Qs</span>}
                                                            </div>
                                                            <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 transition-colors">
                                                                {item.topic.title}
                                                            </h5>
                                                        </div>
                                                        <button className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold shrink-0">
                                                            Iniciar
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 3. TWO-COLUMN BALANCED WORKSPACE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
                
                {/* LEFT 2 COLUMNS: Intelligent Recommendations, Retention, Heatmap */}
                <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
                    
                    {/* Smart Suggestions Card */}
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-[24px] p-4 sm:p-5 shadow-xs relative">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-black text-xs sm:text-sm text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                <Lightbulb size={16} className="text-amber-500"/> Sugestões Inteligentes de Estudo
                            </h4>
                            <span className="text-[11px] font-bold text-slate-400">
                                {trackFilter === 'all' ? 'Todas as Áreas' : trackFilter === 'concurso' ? 'Concurso FAFIPA' : 'Residência Médica'}
                            </span>
                        </div>
                        <SmartSuggestions topics={trackFilteredTopics} onReview={onReview} />
                    </div>

                    {/* Compact Retention and Future Load Side by Side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Retention Widget */}
                        <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-[24px] p-4 sm:p-5 shadow-xs overflow-hidden flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-black text-xs text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                                    <BrainCircuit size={15} className="text-purple-500"/> Retenção Geral
                                </h4>
                            </div>
                            <div className="h-36 sm:h-40">
                                <RetentionWidget topics={trackFilteredTopics} />
                            </div>
                        </div>

                        {/* Future Workload Widget */}
                        <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-[24px] p-4 sm:p-5 shadow-xs overflow-hidden flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-black text-xs text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                                    <Activity size={15} className="text-blue-500"/> Previsão de Carga
                                </h4>
                            </div>
                            <div className="h-36 sm:h-40">
                                <FutureLoadWidget topics={trackFilteredTopics} />
                            </div>
                        </div>

                    </div>

                    {/* Constancy / Heatmap Widget */}
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-[24px] p-4 sm:p-5 shadow-xs overflow-hidden">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-black text-xs text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                                <Flame size={15} className="text-orange-500"/> Constância e Frequência de Estudos
                            </h4>
                            <span className="text-[11px] font-bold text-slate-400">Atividade diária</span>
                        </div>
                        <div 
                            className="flex justify-center overflow-x-auto custom-scrollbar pt-1 pb-1"
                            onPointerDownCapture={(e) => e.stopPropagation()}
                        >
                            <HeatmapWidget topics={trackFilteredTopics} simulados={activeSimulados} />
                        </div>
                    </div>

                </div>

                {/* RIGHT 1 COLUMN: Checklist, Metas, Simulados */}
                <div className="flex flex-col gap-4 sm:gap-6">
                    
                    {/* Checklist Integrada (Directly visible with toggle on mobile) */}
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-[24px] shadow-xs overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center">
                                    <ClipboardList size={14} />
                                </div>
                                <h3 className="font-black text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">Checklist do Dia</h3>
                            </div>
                            <button 
                                onClick={() => setIsChecklistExpanded(!isChecklistExpanded)}
                                className="sm:hidden text-xs font-bold text-slate-400 flex items-center gap-1"
                            >
                                {isChecklistExpanded ? 'Recolher' : 'Expandir'}
                                <ChevronDown size={14} className={`transition-transform ${isChecklistExpanded ? 'rotate-180' : ''}`}/>
                            </button>
                        </div>
                        
                        <div className={`p-4 ${isChecklistExpanded ? 'block' : 'hidden sm:block'}`}>
                            <div className="h-[320px] overflow-hidden flex flex-col">
                                <DailyTodoContent 
                                    dailyNotes={dailyNotes} 
                                    setDailyNotes={setDailyNotes} 
                                    hideHeader={true}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Metas Semanais */}
                    <WeeklyGoalsWidget 
                        config={config} 
                        topics={trackFilteredTopics} 
                        simulados={activeSimulados} 
                    />

                    {/* Simulados Recentes Widget */}
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-[24px] p-4 sm:p-5 shadow-xs overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-black text-xs text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                                <Award size={15} className="text-blue-500"/> Últimos Simulados
                            </h4>
                            {onAddSimulado && (
                                <button 
                                    onClick={onAddSimulado}
                                    className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                                >
                                    <Plus size={11}/> Novo
                                </button>
                            )}
                        </div>
                        <SimuladosMiniWidget 
                            simulados={activeSimulados} 
                            targetAccuracy={config?.targetAccuracy || 80} 
                            onAdd={onAddSimulado || (() => {})} 
                        />
                    </div>

                </div>

            </div>

        </div>
    );
};
