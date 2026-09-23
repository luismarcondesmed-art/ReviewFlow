import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Clock, Activity, Flame, CheckCircle2, ChevronRight, PlayCircle, Plus, 
    BarChart2, ChevronDown, ChevronUp, Lightbulb, BookOpen, ClipboardList, 
    AlertCircle, Calendar, X, BrainCircuit, Target, PlusCircle, ArrowRight, 
    Sparkles, Check, Award, TrendingUp, Layers, ExternalLink, Zap
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
        <div className="flex flex-col items-center justify-start flex-1 h-full w-full bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-white/5 rounded-2xl relative pt-12 sm:pt-16 pb-8 animate-fade-in shadow-xs">
            <button onClick={() => { setIsActive(false); onClose(); }} className="absolute top-4 right-4 p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-all active:scale-95 text-slate-500 font-semibold text-xs flex items-center gap-2">
                <span>Encerrar Foco</span>
                <X size={15} />
            </button>
            <div className="flex gap-1.5 bg-slate-100/90 dark:bg-zinc-800/90 p-1 rounded-xl w-full max-w-[260px] border border-slate-200/50 dark:border-white/5 mx-auto shrink-0 mt-4 sm:mt-0 mb-8 sm:mb-10">
                <button onClick={() => setTimerMode('focus')} className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${mode === 'focus' ? 'bg-white dark:bg-zinc-700 shadow-xs text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'}`}>Foco Profundo</button>
                <button onClick={() => setTimerMode('break')} className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${mode === 'break' ? 'bg-white dark:bg-zinc-700 shadow-xs text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'}`}>Pausa</button>
            </div>

            <div className="relative group flex justify-center items-center w-full mb-10 shrink-0 flex-1 min-h-[260px]">
                <div className={`w-56 h-56 sm:w-72 sm:h-72 rounded-full flex flex-col items-center justify-center border-4 relative bg-white dark:bg-zinc-900 shadow-sm transition-all duration-300 ${mode === 'focus' ? 'border-blue-500/30 text-blue-600 dark:text-blue-400' : 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400'}`}>
                    <span className="text-6xl sm:text-7xl font-bold tracking-tight tabular-nums">{mins}:{secs}</span>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-2">{mode === 'focus' ? 'Tempo de Estudo' : 'Intervalo'}</span>
                </div>
            </div>

            <div className="flex gap-4 justify-center w-full shrink-0 mb-8">
                <button onClick={toggleTimer} className={`px-6 py-3 rounded-xl flex items-center gap-2 text-white font-semibold text-sm shadow-sm active:scale-95 transition-all ${mode === 'focus' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                    {isActive ? <><Activity size={18} className="animate-pulse" /><span>Pausar</span></> : <><PlayCircle size={18} /><span>Iniciar Cronômetro</span></>}
                </button>
            </div>
            
            {mode === 'focus' && dueItems.length > 0 && (
                <div className="w-full max-w-md mx-auto shrink-0 px-4">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">Foco da Sessão ({dueItems.length} restantes)</h3>
                    <div 
                        className="bg-slate-50 hover:bg-white dark:bg-zinc-800/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 flex items-center justify-between group cursor-pointer transition-all" 
                        onClick={() => {
                            setIsActive(false);
                            onReview(dueItems[0].topic.id, dueItems[0].idx);
                        }}
                    >
                        <div className="truncate pr-3 flex-1 text-slate-800 dark:text-slate-200 font-semibold text-sm">{dueItems[0].topic.title}</div>
                        <button className="text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0">Praticar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export const HubView = ({ 
    topics, simulados, config, dailyNotes, setDailyNotes, onReview, onEditTopic, onDeleteTopic,
    setSortOrder, setFilterArea, sortOrder, filterArea, searchTerm,
    onAddSimulado, onNavigateToView, onOpenNewTopic, onUpdateTopic, onQuickCompleteReview
}: { 
    topics: Topic[], simulados: Simulado[], config: UserConfig, 
    dailyNotes: Record<string, string>, setDailyNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    onReview: (id: string, idx: number) => void, onEditTopic: (id: string) => void, onDeleteTopic?: (id: string) => void,
    setSortOrder?: any, setFilterArea?: any, 
    sortOrder?: string, filterArea?: string, searchTerm?: string,
    onAddSimulado?: () => void,
    onNavigateToView?: (view: string) => void,
    onOpenNewTopic?: () => void,
    onUpdateTopic?: (topic: Topic) => void,
    onQuickCompleteReview?: (id: string, idx: number) => void
}) => {
    const [isPendingExpanded, setIsPendingExpanded] = useState(false);
    const [deepFocusOpen, setDeepFocusOpen] = useState(false);
    
    // Tab selector for the bottom analytics workstation
    const [leftWorkstationTab, setLeftWorkstationTab] = useState<'sugestoes' | 'frequencia' | 'retencao'>('sugestoes');
    const [rightWorkstationTab, setRightWorkstationTab] = useState<'checklist' | 'metas' | 'simulados'>('checklist');

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
            <div ref={containerRef} className="flex flex-col gap-6 min-h-full pb-4 lg:pb-0 w-full relative">
                <DeepFocusContent onClose={() => setDeepFocusOpen(false)} dueItems={dueItems} onReview={onReview} />
            </div>
        );
    }

    return (
        <div ref={containerRef} className="flex flex-col gap-5 sm:gap-6 min-h-full pb-6 w-full relative animate-fade-in">
            
            {/* 1. CLEAN WORKSPACE HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-white/5">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                        <Activity size={22} className="text-blue-600 dark:text-blue-400" />
                        <span>Painel de Estudos</span>
                    </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Track Selection Switcher */}
                    <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-zinc-800/80 rounded-xl border border-slate-200/60 dark:border-white/5">
                        <button 
                            onClick={() => handleSetTrackFilter('all')}
                            title="Todas as matérias cadastradas"
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                trackFilter === 'all'
                                    ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                            }`}
                        >
                            <span>Geral</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200/60 dark:bg-zinc-600 text-slate-600 dark:text-slate-300 font-bold">{trackCounts.all}</span>
                        </button>
                        <button 
                            onClick={() => handleSetTrackFilter('concurso')}
                            title="Trilha do Concurso FAFIPA"
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                trackFilter === 'concurso'
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                            }`}
                        >
                            <span>🎯 FAFIPA</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/15 text-inherit font-bold">{trackCounts.concurso}</span>
                        </button>
                        <button 
                            onClick={() => handleSetTrackFilter('residencia')}
                            title="Trilha de Residência Médica"
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                trackFilter === 'residencia'
                                    ? 'bg-indigo-600 text-white shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                            }`}
                        >
                            <span>🩺 Residência</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/15 text-inherit font-bold">{trackCounts.residencia}</span>
                        </button>
                    </div>

                    {/* Quick navigation bridges */}
                    {onNavigateToView && (
                        <div className="flex items-center gap-1">
                            <button 
                                onClick={() => onNavigateToView('cronograma')}
                                title="Abrir Cronograma"
                                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all active:scale-95"
                            >
                                <Calendar size={15} className="text-amber-500" />
                            </button>
                            <button 
                                onClick={() => onNavigateToView('database')}
                                title="Abrir Acervo"
                                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all active:scale-95"
                            >
                                <BookOpen size={15} className="text-blue-500" />
                            </button>
                        </div>
                    )}

                    {onOpenNewTopic && (
                        <button 
                            onClick={onOpenNewTopic}
                            title="Novo Tema de Estudo"
                            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-black font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
                        >
                            <Plus size={14} />
                            <span>Novo</span>
                        </button>
                    )}
                </div>
            </div>

            {/* 2. UNIFIED METRIC BAR (COMPACT & ICON-DRIVEN) */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-white/5 rounded-2xl p-3.5 sm:p-4 shadow-xs">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-white/5">
                    
                    {/* METRIC 1: Progresso Diário */}
                    <div className="flex flex-col justify-between pt-1 md:pt-0 md:px-2 first:px-0">
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <span className="flex items-center gap-1.5"><Target size={14} className="text-blue-600 dark:text-blue-400" /> Meta</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{todaysProgress}%</span>
                        </div>
                        <div className="flex items-baseline gap-1 my-1">
                            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">{todaysDone}</span>
                            <span className="text-xs text-slate-400 font-medium">/ {todaysTotal}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                                className={`h-full transition-all duration-300 ${todaysProgress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                                style={{ width: `${todaysProgress}%` }}
                            />
                        </div>
                    </div>

                    {/* METRIC 2: Aproveitamento Geral */}
                    <div className="flex flex-col justify-between pt-2.5 md:pt-0 md:px-3">
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-emerald-500" /> Acertos</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getPerformanceBgLight(kpiMetrics.overallAccuracy, 80)}`}>
                                {kpiMetrics.overallAccuracy >= 80 ? 'Excelente' : kpiMetrics.overallAccuracy >= 65 ? 'Bom' : 'Atenção'}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1 my-1">
                            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">{kpiMetrics.overallAccuracy}%</span>
                        </div>
                        <span className="text-[11px] text-slate-400 truncate">
                            {kpiMetrics.totalCorrect} / {kpiMetrics.totalQuestions} questões
                        </span>
                    </div>

                    {/* METRIC 3: Questões Feitas */}
                    <div className="flex flex-col justify-between pt-2.5 md:pt-0 md:px-3">
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-indigo-500" /> Resolvidas</span>
                            <span className="text-[11px] font-semibold text-slate-400">{kpiMetrics.completedReviews} ciclos</span>
                        </div>
                        <div className="flex items-baseline gap-1 my-1">
                            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">{kpiMetrics.totalQuestions}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 truncate">
                            Total acumulado
                        </span>
                    </div>

                    {/* METRIC 4: Contagem Regressiva / Fila */}
                    <div className="flex flex-col justify-between pt-2.5 md:pt-0 md:pl-3">
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <span className="flex items-center gap-1.5"><Clock size={14} className="text-amber-500" /> 
                                {kpiMetrics.daysToExam !== null ? 'Prova' : 'Pendentes'}
                            </span>
                            {dueItems.length > 0 && (
                                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded">
                                    {dueItems.length}
                                </span>
                            )}
                        </div>
                        <div className="flex items-baseline gap-1 my-1">
                            {kpiMetrics.daysToExam !== null ? (
                                <>
                                    <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">{kpiMetrics.daysToExam}</span>
                                    <span className="text-xs text-slate-400 font-medium">dias</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">{dueItems.length}</span>
                                    <span className="text-xs text-slate-400 font-medium">a revisar</span>
                                </>
                            )}
                        </div>
                        <span className="text-[11px] text-slate-400 truncate">
                            {config?.examDate ? formatDate(config.examDate) : `${dueItems.length} na fila`}
                        </span>
                    </div>

                </div>
            </div>

            {/* 3. PRIMARY ACTION ZONE: "FOCO DE HOJE" (CLEAN, DIRECT, 1-CLICK ACTIONS) */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-white/5 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                                <Clock size={18} className="text-blue-600 dark:text-blue-400" />
                                <span>{dueItems.length > 0 ? `Revisões de Hoje (${dueItems.length})` : 'Revisões em Dia'}</span>
                            </h3>
                            {trackFilter !== 'all' && (
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300">
                                    {trackFilter === 'concurso' ? '🎯 FAFIPA' : '🩺 Residência'}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {dueItems.length > 0 
                                ? `${todaysDone} de ${todaysTotal} concluídas hoje` 
                                : 'Excelente! Nenhuma revisão acumulada para o dia de hoje.'}
                        </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                        {dueItems.length > 0 && (
                            <>
                                <button 
                                    onClick={startQuickSession}
                                    title="Iniciar primeira revisão da fila"
                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                                >
                                    <PlayCircle size={14} />
                                    <span>Iniciar</span>
                                </button>
                                <button 
                                    onClick={() => setDeepFocusOpen(true)}
                                    className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-purple-600 dark:text-purple-400 rounded-xl transition-all active:scale-95"
                                    title="Modo Foco Profundo (Pomodoro)"
                                    aria-label="Modo Foco"
                                >
                                    <BrainCircuit size={15} />
                                </button>
                            </>
                        )}
                        {config.studyLink && (
                            <a 
                                href={config.studyLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                title="Abrir Plataforma de Estudos"
                                aria-label="Plataforma de Estudos"
                                className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 rounded-xl transition-all"
                            >
                                <ExternalLink size={15} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Items List */}
                {dueItems.length > 0 ? (
                    <div className="flex flex-col gap-2">
                        {/* First 4 items */}
                        <div className="flex flex-col gap-1.5">
                            {dueItems.slice(0, 4).map((item: any) => {
                                const isOverdue = item.date < today;
                                const numQuestions = item.topic.reviews[item.idx]?.targetQ || 10;
                                const tr = getTopicTrack(item.topic);
                                const areaObj = AREAS.find(a => a.id === item.topic.area);
                                const areaName = item.topic.subarea || areaObj?.name || item.topic.area;

                                return (
                                    <div 
                                        key={`${item.topic.id}-${item.idx}`} 
                                        className="bg-slate-50/80 hover:bg-slate-50 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/80 p-2.5 sm:p-3 rounded-xl border border-slate-200/70 hover:border-slate-300 dark:border-white/5 dark:hover:border-zinc-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 group"
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                                <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-500 dark:text-slate-400">
                                                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                                                        {tr === 'concurso' ? '🎯 FAFIPA' : tr === 'residencia' ? '🩺 Residência' : 'Geral'}
                                                    </span>
                                                    <span>·</span>
                                                    <span className="truncate max-w-[150px]">{areaName}</span>
                                                    <span>·</span>
                                                    <span>{item.label.split(':')[0]} ({numQuestions}q)</span>
                                                </div>

                                                <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                                                    {item.topic.title}
                                                </h4>
                                            </div>
                                        </div>

                                        {/* Status & Action Buttons */}
                                        <div className="flex items-center gap-1.5 justify-end shrink-0 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-white/5">
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                                                isOverdue 
                                                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' 
                                                    : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                                            }`}>
                                                {isOverdue ? 'Atrasada' : 'Hoje'}
                                            </span>

                                            {/* Fast 1-Click Complete */}
                                            {onQuickCompleteReview && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onQuickCompleteReview(item.topic.id, item.idx);
                                                    }}
                                                    title="Concluir revisão em 1 clique (100% de aproveitamento)"
                                                    aria-label="Concluir revisão"
                                                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-emerald-100 dark:bg-zinc-800 dark:hover:bg-emerald-950/60 text-slate-600 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400 flex items-center justify-center transition-colors active:scale-95"
                                                >
                                                    <Check size={14} strokeWidth={2.5} />
                                                </button>
                                            )}

                                            {/* Primary Review Button */}
                                            <button 
                                                onClick={() => onReview(item.topic.id, item.idx)}
                                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs flex items-center gap-1 transition-all shadow-xs active:scale-95"
                                            >
                                                <span>Revisar</span>
                                                <ArrowRight size={13} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Expander for remaining items */}
                        {dueItems.length > 4 && (
                            <div className="flex flex-col gap-2 mt-1">
                                <button 
                                    onClick={() => setIsPendingExpanded(!isPendingExpanded)}
                                    className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800/40 dark:hover:bg-zinc-800 rounded-xl border border-slate-200/60 dark:border-white/5 text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors"
                                >
                                    <span>{isPendingExpanded ? 'Ocultar revisões adicionais' : `Ver todas as outras revisões (${dueItems.length - 4} restantes)`}</span>
                                    {isPendingExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>

                                <AnimatePresence>
                                    {isPendingExpanded && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex flex-col gap-2 overflow-hidden"
                                        >
                                            {dueItems.slice(4).map((item: any) => {
                                                const tr = getTopicTrack(item.topic);
                                                const isOverdue = item.date < today;
                                                const numQuestions = item.topic.reviews[item.idx]?.targetQ || 10;
                                                const areaObj = AREAS.find(a => a.id === item.topic.area);
                                                const areaName = item.topic.subarea || areaObj?.name || item.topic.area;

                                                return (
                                                    <div 
                                                        key={`${item.topic.id}-${item.idx}`} 
                                                        className="bg-slate-50/80 hover:bg-slate-50 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/80 p-3 rounded-xl border border-slate-200/70 hover:border-slate-300 dark:border-white/5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                                                    >
                                                        <div className="flex flex-col min-w-0 flex-1">
                                                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                                <span className="font-semibold text-slate-700 dark:text-slate-300">
                                                                    {tr === 'concurso' ? '🎯 FAFIPA' : tr === 'residencia' ? '🩺 Residência' : 'Geral'}
                                                                </span>
                                                                <span aria-hidden="true">·</span>
                                                                <span className="truncate">{areaName}</span>
                                                                <span aria-hidden="true">·</span>
                                                                <span>{item.label.split(':')[0]} ({numQuestions} questões)</span>
                                                            </div>
                                                            <h5 className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate mt-0.5">
                                                                {item.topic.title}
                                                            </h5>
                                                        </div>

                                                        <div className="flex items-center gap-2 justify-end shrink-0">
                                                            {onQuickCompleteReview && (
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        onQuickCompleteReview(item.topic.id, item.idx);
                                                                    }}
                                                                    title="Concluir em 1 clique"
                                                                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 dark:bg-zinc-800 dark:hover:bg-emerald-950/60 text-slate-600 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400 text-xs font-semibold transition-colors flex items-center gap-1 active:scale-95"
                                                                >
                                                                    <Check size={13} strokeWidth={2.5} />
                                                                    <span>Concluir</span>
                                                                </button>
                                                            )}
                                                            <button 
                                                                onClick={() => onReview(item.topic.id, item.idx)}
                                                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
                                                            >
                                                                Revisar
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Zero Due Items Clean State */
                    <div className="p-6 bg-slate-50/60 dark:bg-zinc-800/30 rounded-xl border border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                <CheckCircle2 size={22} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                                    Todas as revisões de hoje estão completas!
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    Sua retenção de memória está protegida. Você pode adiantar temas ou treinar simulados.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            {onNavigateToView && (
                                <button 
                                    onClick={() => onNavigateToView('cronograma')}
                                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-xs transition-colors"
                                >
                                    Ver Cronograma
                                </button>
                            )}
                            {onAddSimulado && (
                                <button 
                                    onClick={onAddSimulado}
                                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-colors shadow-xs"
                                >
                                    Fazer Simulado
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* 4. MODERN 2-PANEL WORKSPACE (REPLACES FRAGMENTED BENTOS) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
                
                {/* LEFT 2 COLUMNS: Intelligent Studies & Analytics Workspace */}
                <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-white/5 rounded-2xl shadow-xs overflow-hidden flex flex-col">
                    
                    {/* Header with Segmented Workspace Tabs */}
                    <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                                <Sparkles size={16} className="text-amber-500" />
                                <span>Análise & Reforço</span>
                            </h3>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center gap-1 p-1 bg-slate-100/80 dark:bg-zinc-800/80 rounded-xl border border-slate-200/50 dark:border-white/5">
                            <button 
                                onClick={() => setLeftWorkstationTab('sugestoes')}
                                title="Sugestões de reforço"
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                    leftWorkstationTab === 'sugestoes'
                                        ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-xs'
                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                                }`}
                            >
                                <Lightbulb size={13} className="text-amber-500" />
                                <span>Reforço</span>
                            </button>
                            <button 
                                onClick={() => setLeftWorkstationTab('frequencia')}
                                title="Mapa de constância"
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                    leftWorkstationTab === 'frequencia'
                                        ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-xs'
                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                                }`}
                            >
                                <Flame size={13} className="text-orange-500" />
                                <span>Constância</span>
                            </button>
                            <button 
                                onClick={() => setLeftWorkstationTab('retencao')}
                                title="Retenção de memória e carga"
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                    leftWorkstationTab === 'retencao'
                                        ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-xs'
                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                                }`}
                            >
                                <BrainCircuit size={13} className="text-purple-500" />
                                <span>Retenção</span>
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-4 sm:p-5">
                        {leftWorkstationTab === 'sugestoes' && (
                            <div>
                                <SmartSuggestions topics={trackFilteredTopics} onReview={onReview} />
                            </div>
                        )}

                        {leftWorkstationTab === 'frequencia' && (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between text-xs text-slate-500">
                                    <span>Mapa de frequência nos últimos meses</span>
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">Cada bloco representa um dia de estudo</span>
                                </div>
                                <div 
                                    className="flex justify-center overflow-x-auto py-2 custom-scrollbar"
                                    onPointerDownCapture={(e) => e.stopPropagation()}
                                >
                                    <HeatmapWidget topics={trackFilteredTopics} simulados={activeSimulados} />
                                </div>
                            </div>
                        )}

                        {leftWorkstationTab === 'retencao' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50/70 dark:bg-black/20 rounded-xl border border-slate-200/60 dark:border-white/5 flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                            <BrainCircuit size={14} className="text-purple-500" /> Curva de Retenção
                                        </h4>
                                    </div>
                                    <div className="h-36 sm:h-40">
                                        <RetentionWidget topics={trackFilteredTopics} />
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50/70 dark:bg-black/20 rounded-xl border border-slate-200/60 dark:border-white/5 flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                            <Activity size={14} className="text-blue-500" /> Previsão de Carga
                                        </h4>
                                    </div>
                                    <div className="h-36 sm:h-40">
                                        <FutureLoadWidget topics={trackFilteredTopics} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* RIGHT 1 COLUMN: Daily Execution & Goals */}
                <div className="flex flex-col gap-4 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-white/5 rounded-2xl shadow-xs overflow-hidden">
                    
                    {/* Header with Segmented Tabs */}
                    <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1 p-1 bg-slate-100/80 dark:bg-zinc-800/80 rounded-xl border border-slate-200/50 dark:border-white/5 w-full">
                            <button 
                                onClick={() => setRightWorkstationTab('checklist')}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                                    rightWorkstationTab === 'checklist'
                                        ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-xs'
                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                                }`}
                            >
                                <ClipboardList size={13} className="text-emerald-500" />
                                <span>Checklist</span>
                            </button>
                            <button 
                                onClick={() => setRightWorkstationTab('metas')}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                                    rightWorkstationTab === 'metas'
                                        ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-xs'
                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                                }`}
                            >
                                <Target size={13} className="text-blue-500" />
                                <span>Metas</span>
                            </button>
                            <button 
                                onClick={() => setRightWorkstationTab('simulados')}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                                    rightWorkstationTab === 'simulados'
                                        ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-xs'
                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                                }`}
                            >
                                <Award size={13} className="text-purple-500" />
                                <span>Simulados</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        {rightWorkstationTab === 'checklist' && (
                            <div className="h-[340px] overflow-hidden flex flex-col">
                                <DailyTodoContent 
                                    dailyNotes={dailyNotes} 
                                    setDailyNotes={setDailyNotes} 
                                    hideHeader={true}
                                />
                            </div>
                        )}

                        {rightWorkstationTab === 'metas' && (
                            <WeeklyGoalsWidget 
                                config={config} 
                                topics={trackFilteredTopics} 
                                simulados={activeSimulados} 
                            />
                        )}

                        {rightWorkstationTab === 'simulados' && (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs text-slate-400">Histórico de provas simuladas</span>
                                    {onAddSimulado && (
                                        <button 
                                            onClick={onAddSimulado}
                                            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                        >
                                            <Plus size={12} /> Novo Simulado
                                        </button>
                                    )}
                                </div>
                                <SimuladosMiniWidget 
                                    simulados={activeSimulados} 
                                    targetAccuracy={config?.targetAccuracy || 80} 
                                    onAdd={onAddSimulado || (() => {})} 
                                />
                            </div>
                        )}
                    </div>

                </div>

            </div>

        </div>
    );
};
