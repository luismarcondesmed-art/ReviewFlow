import { withNextFSRSReview } from './services/fsrsService';

import React, { useState, useMemo, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, BookOpen, Calendar, ClipboardList, Home, PieChart, Plus, Search, Settings, 
    Cloud, Check, LayoutGrid, Database, List, MoreHorizontal, ChevronDown, X, Zap, Menu, Flag, Map as MapIcon, GraduationCap,
    ArrowLeft, Download, LogOut, Moon, Sun, Monitor, RefreshCw, AlertCircle, BrainCircuit, Heart,
    PanelLeftClose, PanelLeftOpen
} from 'lucide-react';
import { 
    AreaType, Topic, Simulado, ImportanceType
} from './types';
import { 
    AREAS, generateId, generateSmartSchedule, calculateNextLoad, getTodayStr, 
    triggerConfetti, optimizeSchedule, OptimizationChange, formatFullDate, APP_ID, calculateStreak, getLevelInfo
} from './utils';
import { useSync, useVibration } from './hooks';
import { NotificationService } from './services/notificationService';
import { LevelSystem, TopicCard, CompactLevelSystem, UserStatsDropdown } from './components';
import { EditTopicModal, EditReviewHistoryModal, OptimizationResultModal, ReviewModal, SettingsModal, SimuladoModal, OptimizationInfoModal, TutorialModal, SyncAdModal, SupportModal, DeepFocusModal } from './modals';
import { Toaster, toast } from 'sonner';

// --- Lazy Loaded Views for Performance ---
const HubView = lazy(() => import('./views/view-hub').then(module => ({ default: module.HubView })));
const CalendarView = lazy(() => import('./views/view-calendar').then(module => ({ default: module.CalendarView })));
const DatabaseView = lazy(() => import('./views/view-database').then(module => ({ default: module.DatabaseView })));
const SimuladosView = lazy(() => import('./views/view-simulados').then(module => ({ default: module.SimuladosView })));
const CronogramaView = lazy(() => import('./views/view-cronograma').then(module => ({ default: module.CronogramaView })));
const StatsView = lazy(() => import('./views/view-stats').then(module => ({ default: module.StatsView })));
const LandingView = lazy(() => import('./views/view-landing').then(module => ({ default: module.LandingView })));

// --- Loading Skeleton ---
const LoadingSpinner = () => (
    <div className="flex flex-col h-full w-full items-center justify-center p-10 gap-4 animate-fade-in">
        <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-slate-100 dark:border-white/10"></div>
            <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-slate-500 border-t-transparent animate-spin"></div>
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Carregando</span>
    </div>
);

// --- Error Boundary ---
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
    constructor(props: {children: React.ReactNode}) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 dark:bg-[#141415] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-red-100 dark:border-red-900/30">
                        <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-200 mb-2">Ops, algo deu errado!</h1>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                            Ocorreu um erro inesperado. Tente recarregar a página ou limpar os dados locais se o problema persistir.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={() => window.location.reload()} 
                                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                Recarregar Página
                            </button>
                            <button 
                                onClick={() => {
                                    if (!window.confirm('Isso apagará os dados locais. Exporte um backup nas configurações antes de continuar. Deseja apagar?')) return;
                                    Object.keys(localStorage).filter(key => key.startsWith('reviewflow_')).forEach(key => localStorage.removeItem(key));
                                    window.location.reload();
                                }} 
                                className="w-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-bold py-3 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                            >
                                Limpar Dados e Recarregar
                            </button>
                        </div>
                        {this.state.error && (
                            <div className="mt-6 p-3 bg-slate-100 dark:bg-black/50 rounded-lg text-left overflow-auto max-h-32">
                                <p className="text-xs font-mono text-slate-600 dark:text-slate-400 break-all">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

function AppContent() {
    const { topics, setTopics, simulados, setSimulados, config, setConfig, scheduleProgress, setScheduleProgress, dailyNotes, setDailyNotes, loaded, status, syncKey, setSyncKey, syncNow, userRole } = useSync();
    const vibration = useVibration();
    
    // UI State
    const [hasStarted, setHasStarted] = useState(() => localStorage.getItem('reviewflow_has_started') === 'true');
    const [landingView, setLandingView] = useState<'main' | 'privacy' | 'terms'>('main');
    const [view, setView] = useState<'list' | 'cronograma' | 'simulados' | 'calendar' | 'database' | 'stats'>('list');
    const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(() => (localStorage.getItem('theme') as any) || 'system');
    const [desktopNewMenuOpen, setDesktopNewMenuOpen] = useState(false);
    // Modo Foco: barra lateral oculta por padrão
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // Initialize Notification Service
    useEffect(() => {
        if (config) {
            NotificationService.getInstance().startService(config);
        }
        return () => {
            NotificationService.getInstance().stopService();
        };
    }, [config]);

    // PWA Install State
    const [installPrompt, setInstallPrompt] = useState<any>(null);
    
    // Global Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    
    // Filter & Sort State for HubView
    const [sortOrder, setSortOrder] = useState<string>('area');
    const [filterArea, setFilterArea] = useState<string>('all');
    
    // Mobile Navigation
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Modals
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editTopic, setEditTopic] = useState<Topic | null>(null);
    const [reviewData, setReviewData] = useState<{tId: string, rIdx: number} | null>(null);
    const [historyEditData, setHistoryEditData] = useState<{tId: string, rIdx: number} | null>(null);
    
    const [simuladoModalOpen, setSimuladoModalOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [editingSimulado, setEditingSimulado] = useState<Simulado | null>(null);
    const [optimizationInfoOpen, setOptimizationInfoOpen] = useState(false);
    const [tutorialOpen, setTutorialOpen] = useState(false);
    const [syncAdOpen, setSyncAdOpen] = useState(false);
    const [supportModalOpen, setSupportModalOpen] = useState(false);
    
    const [optimizationResult, setOptimizationResult] = useState<{topics: Topic[], changes: OptimizationChange[]} | null>(null);

    const handleSyncClick = () => {
        void syncNow(true);
    };

    useEffect(() => {
        const root = window.document.documentElement;
        const isDark = themeMode === 'dark' || (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) root.classList.add('dark'); else root.classList.remove('dark');
        localStorage.setItem('theme', themeMode);
    }, [themeMode]);

    // Focus search when activated
    useEffect(() => {
        if (isSearchActive && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchActive]);

    // PWA Install Prompt Listener
    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setInstallPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    // Daily Login Bonus
    useEffect(() => {
        if (!loaded) return;
        const todayStr = getTodayStr();
        const lastLogin = localStorage.getItem('reviewflow_last_login');
        if (lastLogin !== todayStr) {
            localStorage.setItem('reviewflow_last_login', todayStr);
            setConfig(prev => ({ ...prev, bonusXP: (prev.bonusXP || 0) + 50 }));
            setTimeout(() => {
                triggerConfetti();
                toast.success('+50 XP!', { description: 'Bônus de login diário!' });
            }, 1000);
        }
    }, [loaded]);

    // PWA Badges
    useEffect(() => {
        const today = getTodayStr();
        const pending = topics.reduce((acc, t) => {
            if (t.deleted) return acc;
            return acc + t.reviews.filter(r => r.date <= today && !r.done).length;
        }, 0);
        if ('setAppBadge' in navigator) {
            (navigator as any).setAppBadge(pending).catch(() => {});
        }
    }, [topics]);

    // Auto Optimize
    useEffect(() => {
        if (loaded && hasStarted && config.isPremium && config.autoOptimize) {
            const today = getTodayStr();
            if (config.lastAutoOptimization !== today) {
                const result = optimizeSchedule(topics, config);
                if (result.changes.length > 0) {
                    setTopics(result.topics);
                    toast.success("Agenda otimizada automaticamente!", { description: `${result.changes.length} revisões ajustadas.` });
                }
                setConfig(prev => ({ ...prev, lastAutoOptimization: today }));
            }
        }
    }, [loaded, hasStarted, config?.isPremium, config?.autoOptimize, config?.lastAutoOptimization]);

    const handleInstallApp = async () => {
        if (!installPrompt) return;
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        if (outcome === 'accepted') {
            setInstallPrompt(null);
        }
    };

    const activeTopics = useMemo(() => topics.filter(t => !t.deleted), [topics]);
    const activeSimulados = useMemo(() => simulados.filter(s => !s.deleted), [simulados]);

    const filteredTopics = useMemo(() => {
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

    const stats = useMemo(() => {
        const totalQ = activeTopics.reduce((acc, t) => acc + t.reviews.filter(r => r.done).reduce((s, r) => s + r.total, 0), 0);
        const totalAnswered = totalQ + activeSimulados.reduce((acc, s) => acc + (s.totalQuestions || 0), 0);
        const streak = calculateStreak(activeTopics, activeSimulados);
        const totalXP = totalAnswered * 10 + streak * 50 + (config.bonusXP || 0);
        return { totalAnswered, totalXP };
    }, [activeTopics, activeSimulados, config.bonusXP]);

    // Level up celebration
    const prevLevelRef = useRef(1);
    const hasLoadedRef = useRef(false);

    useEffect(() => {
        // Reset level tracking when account changes
        hasLoadedRef.current = false;
    }, [syncKey]);

    useEffect(() => {
        if (!loaded) return;

        const currentLevel = getLevelInfo(stats.totalXP).level;
        
        if (!hasLoadedRef.current) {
            prevLevelRef.current = currentLevel;
            hasLoadedRef.current = true;
            return;
        }

        if (currentLevel > prevLevelRef.current) {
            triggerConfetti();
            toast.success(`Nível ${currentLevel} Alcançado!`, {
                description: 'Parabéns pela sua dedicação! Continue assim.',
                icon: '🎉',
            });
            prevLevelRef.current = currentLevel;
        } else if (currentLevel < prevLevelRef.current) {
            // Se o nível caiu (ex: trocou de conta ou limpou dados), atualiza a referência
            prevLevelRef.current = currentLevel;
        }
    }, [stats.totalXP, loaded, syncKey]);

    // --- Actions ---
    const handleDeleteTopic = (id: string) => {
        const deletionTimestamp = Date.now() + 1000;
        setTopics(prev => prev.map(t => t.id === id ? { ...t, deleted: true, deletedAt: null, updatedAt: deletionTimestamp } : t));
        setEditTopic(null);
        vibration.success();
    };

    const handleDeleteSimulado = (id: string) => {
        const deletionTimestamp = Date.now() + 1000;
        setSimulados(prev => prev.map(s => s.id === id ? { ...s, deleted: true, deletedAt: null, updatedAt: deletionTimestamp } : s));
        setSimuladoModalOpen(false);
        setEditingSimulado(null);
        vibration.success();
    };

    const handleAddTopic = (t: Topic) => {
        const newTopicId = generateId();
        const customSettings = t.customSettings || (config.customReviewIntervals?.length ? { intervals: config.customReviewIntervals, baseQuestions: t.reviews?.[0]?.targetQ || 25 } : undefined);
        const schedule = generateSmartSchedule(t.studyDate, config.examDate, t.importance, topics, newTopicId, customSettings);
        const reviews = config.useFSRS ? schedule.slice(0, 1) : schedule;
        const newTopic: Topic = { ...t, id: newTopicId, reviews: reviews, deleted: false, updatedAt: Date.now() };
        setTopics(prev => [newTopic, ...prev]);
        setAddModalOpen(false);
        vibration.success();
    };

    const handleCreateAggregatedTopic = useCallback((title: string, area: AreaType, lessons: string[], priority: ImportanceType, baseQuestions?: number, blockId?: string, tags?: string[]) => {
        const existing = topics.find(t => t.title === title && !t.deleted);
        
        if (existing) {
            const hasDifficultLesson = lessons.some(l => activeSimulados.some(s => s.difficultyLessons?.includes(l)));
            const updatedReviews = existing.reviews.map(r => {
                if (r.done) return r;
                // If it wasn't difficult before but is now, we should increase it
                // To be safe, we just recalculate
                let nextTargetQ = calculateNextLoad(existing.importance, null, r.type, null, existing.reviews[0].targetQ);
                if (hasDifficultLesson) nextTargetQ = Math.ceil(nextTargetQ * 1.1);
                return { ...r, targetQ: nextTargetQ };
            });

            const updated: Topic = {
                ...existing,
                linkedLessons: lessons,
                hasDifficultLesson,
                source: blockId || existing.source,
                tags: tags || existing.tags,
                reviews: updatedReviews,
                updatedAt: Date.now()
            };
            setTopics(prev => prev.map(t => t.id === existing.id ? updated : t));
            vibration.success();
            toast.success("Matéria atualizada com as novas aulas do bloco!");
        } else {
            const newTopicId = generateId();
            // Pass baseQuestions as overrideBaseQuestions to maintain AI schedule
            let reviews = generateSmartSchedule(getTodayStr(), config.examDate, priority, topics, newTopicId, undefined, baseQuestions);
            if (config.useFSRS) reviews = reviews.slice(0, 1);
            
            const hasDifficultLesson = lessons.some(l => activeSimulados.some(s => s.difficultyLessons?.includes(l)));
            if (hasDifficultLesson) {
                reviews = reviews.map(r => ({ ...r, targetQ: Math.ceil(r.targetQ * 1.1) }));
            }

            const newTopic: Topic = {
                id: newTopicId,
                title,
                area,
                subarea: tags && tags.length > 0 ? tags[0] : 'Cronograma',
                importance: priority,
                studyDate: getTodayStr(),
                reviews,
                linkedLessons: lessons,
                hasDifficultLesson,
                source: blockId,
                tags: tags,
                deleted: false,
                updatedAt: Date.now()
            };
            setTopics(prev => [newTopic, ...prev]);
            triggerConfetti();
            vibration.success();
        }
    }, [topics, config.examDate, config.useFSRS, activeSimulados]);

    const handleUpdateTopic = (updated: Topic) => {
        const old = topics.find(t => t.id === updated.id);
        let reviews = updated.reviews;
        const baseQ = old ? old.reviews[0].targetQ : undefined;
        if (old && old.studyDate !== updated.studyDate) {
             if (confirm("Recalcular cronograma devido à mudança de data?")) {
                 reviews = generateSmartSchedule(updated.studyDate, config.examDate, updated.importance, topics, updated.id, undefined, baseQ);
             } else { updated.studyDate = old.studyDate; }
        } else if (old && old.importance !== updated.importance) {
            reviews = reviews.map(r => {
                if (r.done) return r;
                let nextTargetQ = calculateNextLoad(updated.importance, null, r.type, null, baseQ);
                if (updated.hasDifficultLesson) nextTargetQ = Math.ceil(nextTargetQ * 1.1);
                return { ...r, targetQ: nextTargetQ };
            });
        }
        let finalTopic = { ...updated, reviews, updatedAt: Date.now() };
        if (config.useFSRS) {
            const history = old?.reviews.filter(r => r.done) || [];
            finalTopic = history.length ? withNextFSRSReview({ ...finalTopic, reviews: [...history, ...reviews.filter(r => !r.done)] }, config, baseQ || 20) : { ...finalTopic, reviews: reviews.slice(0, 1) };
        }
        setTopics(prev => prev.map(t => t.id === finalTopic.id ? finalTopic : t));
        vibration.success();
    };

    const handleReviewSubmit = (data: { correct: number; total: number; difficulty: string; timeSpent?: number }) => {
        if (!reviewData) return;
        const { correct, total, difficulty, timeSpent } = data;
        if (!Number.isInteger(total) || total <= 0 || !Number.isInteger(correct) || correct < 0 || correct > total) {
            toast.error('Informe um total positivo e acertos entre zero e o total de questões.');
            return;
        }
        setTopics(prev => prev.map(t => {
            if (t.id !== reviewData.tId) return t;
            if (!t.reviews[reviewData.rIdx] || t.reviews[reviewData.rIdx].done) return t;
            const newReviews = [...t.reviews];
            const acc = total > 0 ? Math.round((correct/total)*100) : 0;
            
            newReviews[reviewData.rIdx] = { 
                ...newReviews[reviewData.rIdx], 
                done: true, 
                correct, 
                total, 
                difficulty: difficulty as any, 
                completedAt: new Date().toISOString(),
                timeSpent
            };
            
            if (config.useFSRS) {
                const targetQ = calculateNextLoad(t.importance, difficulty, 'extra', acc / 100, newReviews[0].targetQ);
                return withNextFSRSReview({ ...t, reviews: newReviews, updatedAt: Date.now() }, config, targetQ);
            } else if (reviewData.rIdx + 1 < newReviews.length) {
                const baseQ = t.reviews[0].targetQ;
                const hasDifficultLesson = t.linkedLessons?.some(l => activeSimulados.some(s => s.difficultyLessons?.includes(l)));
                let nextTargetQ = calculateNextLoad(t.importance, difficulty, newReviews[reviewData.rIdx+1].type, acc/100, baseQ);
                if (hasDifficultLesson) nextTargetQ = Math.ceil(nextTargetQ * 1.1);
                newReviews[reviewData.rIdx+1].targetQ = nextTargetQ;
            }
            return { ...t, reviews: newReviews, updatedAt: Date.now() };
        }));
        setReviewData(null);
        vibration.complete();
        triggerConfetti();
        toast.success(`+${total * 10} XP!`, { description: 'Revisão concluída com sucesso!' });
    };

    const handleQuickCompleteReview = (topicId: string, reviewIdx: number) => {
        setTopics(prev => prev.map(t => {
            if (t.id !== topicId) return t;
            const newReviews = [...t.reviews];
            const r = newReviews[reviewIdx];
            if (!r || r.done) return t;
            const targetQ = r.targetQ || 10;
            newReviews[reviewIdx] = {
                ...r,
                done: true,
                correct: targetQ,
                total: targetQ,
                difficulty: 'medium' as any,
                completedAt: new Date().toISOString()
            };
            const updated = { ...t, reviews: newReviews, updatedAt: Date.now() };
            return config.useFSRS ? withNextFSRSReview(updated, config, targetQ) : updated;
        }));
        vibration.success();
        triggerConfetti();
        toast.success("Revisão concluída em 1 clique!", {
            description: "Registrada com aproveitamento integral."
        });
    };

    const handleHistoryEdit = (data: { date: string, correct: number, total: number }) => {
        if (!historyEditData) return;
        setTopics(prev => prev.map(t => {
            if (t.id !== historyEditData.tId) return t;
            const newReviews = [...t.reviews];
            if (newReviews[historyEditData.rIdx]) {
                newReviews[historyEditData.rIdx] = { ...newReviews[historyEditData.rIdx], date: data.date, correct: data.correct, total: data.total };
            }
            const updated = { ...t, reviews: newReviews, updatedAt: Date.now() };
            return config.useFSRS ? withNextFSRSReview(updated, config, newReviews[0]?.targetQ || 20) : updated;
        }));
        setHistoryEditData(null);
        vibration.success();
    };

    const handleSaveSimulado = (newS: Simulado) => {
        const sWithId = { ...newS, id: newS.id || generateId(), updatedAt: Date.now() };
        if (editingSimulado) {
            setSimulados(prev => prev.map(s => s.id === editingSimulado.id ? sWithId : s));
        } else {
            setSimulados(prev => [...prev, sWithId]);
        }

        // Update hasDifficultLesson on topics
        if (newS.difficultyLessons && newS.difficultyLessons.length > 0) {
            setTopics(prev => prev.map(t => {
                const hasDifficult = t.linkedLessons?.some(l => newS.difficultyLessons?.includes(l));
                if (hasDifficult && !t.hasDifficultLesson) {
                    return { ...t, hasDifficultLesson: true, updatedAt: Date.now() };
                }
                return t;
            }));
        }

        setSimuladoModalOpen(false);
        setEditingSimulado(null);
        vibration.success();
        triggerConfetti();
        toast.success(`+${(newS.totalQuestions || 100) * 10} XP!`, { description: 'Simulado salvo com sucesso!' });
    };

    const runOptimization = () => {
        const result = optimizeSchedule(topics, config);
        if (result.changes.length === 0) { alert("Nenhuma otimização necessária."); return; }
        setOptimizationResult(result);
        setSettingsOpen(false);
    };
    
    const applyOptimization = () => {
        if (optimizationResult) {
            setTopics(optimizationResult.topics);
            setOptimizationResult(null);
            vibration.success();
        }
    };

    const handleExport = () => {
        const data = { version: 2, date: new Date().toISOString(), topics, simulados, config, scheduleProgress, dailyNotes };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `reviewflow-backup-${getTodayStr()}.json`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url); vibration.success();
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target?.result as string);
                if (!Array.isArray(data.topics) || !data.topics.every(t => t && typeof t.id === 'string' && typeof t.title === 'string' && Array.isArray(t.reviews) && t.reviews.every(r => r && typeof r.date === 'string' && Number.isFinite(r.total) && Number.isFinite(r.correct)))) throw new Error('Temas inválidos');
                if (data.simulados !== undefined && (!Array.isArray(data.simulados) || !data.simulados.every(s => s && typeof s.id === 'string' && Number.isFinite(s.totalQuestions) && Number.isFinite(s.correctCount)))) throw new Error('Simulados inválidos');
                for (const key of ['config', 'scheduleProgress', 'dailyNotes']) if (data[key] !== undefined && (!data[key] || typeof data[key] !== 'object' || Array.isArray(data[key]))) throw new Error('Formato inválido');
                localStorage.setItem('reviewflow_pre_import_backup_' + Date.now(), JSON.stringify({ topics, simulados, config, scheduleProgress, dailyNotes }));
                const importedAt = Date.now();
                setTopics(data.topics.map(t => ({ ...t, updatedAt: importedAt })));
                if (data.simulados) setSimulados(data.simulados.map(s => ({ ...s, updatedAt: importedAt })));
                if (data.config) setConfig(data.config);
                if (data.scheduleProgress) setScheduleProgress(data.scheduleProgress);
                if (data.dailyNotes) setDailyNotes(data.dailyNotes);
                alert('Importado!'); setSettingsOpen(false); vibration.success();
            } catch (err) { alert('Erro.'); vibration.error(); }
        };
        reader.readAsText(file);
    };

    if (!loaded) return <div className="flex h-screen w-full items-center justify-center bg-transparent"><Activity size={40} className="animate-spin text-slate-500"/></div>;

    const currentReviewTopic = reviewData ? topics.find(t => t.id === reviewData.tId) || null : null;
    const historyEditTopic = historyEditData ? topics.find(t => t.id === historyEditData.tId) || null : null;

    const NAV_ITEMS = [
        { id: 'list', label: 'Hoje', icon: Home, title: 'Hoje' },
        { id: 'cronograma', label: 'Cronograma', icon: MapIcon, title: 'Cronograma' },
        { id: 'calendar', label: 'Agenda', icon: Calendar, title: 'Agenda' },
        { id: 'database', label: 'Acervo', icon: Database, title: 'Acervo de Estudos' },
        { id: 'stats', label: 'Estatísticas', icon: PieChart, title: 'Estatísticas' },
    ];

    const currentViewTitle = NAV_ITEMS.find(n => n.id === view)?.title || 'ReviewFlow';

    if (!hasStarted) {
        return (
            <Suspense fallback={<LoadingSpinner />}>
                <LandingView 
                    currentView={landingView}
                    onChangeView={setLandingView}
                    onStart={() => {
                        localStorage.setItem('reviewflow_has_started', 'true');
                        setHasStarted(true);
                    }} 
                />
            </Suspense>
        );
    }

    return (
        <div 
            className="rf-app flex h-[100dvh] bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-slate-300 font-sans overflow-hidden touch-manipulation selection:bg-slate-500/30"
        >
            <Toaster position="top-center" richColors />
            
            <div className="rf-shell">
              <header className="rf-header">
                <button className="rf-brand" onClick={() => setView('list')} aria-label="ReviewFlow — início"><BookOpen size={25} strokeWidth={1.3} /><span>ReviewFlow<span className="rf-brand-dot">.</span></span></button>
                <nav className="rf-desktop-nav" aria-label="Navegação principal">{NAV_ITEMS.map(item => <button key={item.id} aria-current={view === item.id ? 'page' : undefined} onClick={() => setView(item.id as any)}>{item.label}</button>)}</nav>
                <div className="rf-header-actions">
                  <button className="rf-icon-button" onClick={() => setIsSearchActive(true)} aria-label="Pesquisar"><Search size={19} strokeWidth={1.6} /></button>
                  <button className="rf-icon-button rf-sync-button" onClick={() => syncKey ? handleSyncClick() : setSettingsOpen(true)} disabled={status === 'syncing'} aria-label={syncKey ? 'Sincronizar dados' : 'Configurar sincronização'}><RefreshCw size={18} strokeWidth={1.6} className={status === 'syncing' ? 'animate-spin' : ''} /></button>
                  <button className="rf-icon-button" onClick={() => setSettingsOpen(true)} aria-label="Configurações"><Settings size={19} strokeWidth={1.6} /></button>
                  <UserStatsDropdown totalXP={stats.totalXP} totalQuestions={stats.totalAnswered} topics={topics} simulados={simulados} userRole={userRole} userIcon={config.userIcon} onSelectUserIcon={userIcon => setConfig(prev => ({ ...prev, userIcon }))} dropPosition="down" size="sm" />
                  <button className="rf-header-new" onClick={() => setAddModalOpen(true)}><Plus size={16} /><span>Novo tema</span></button>
                </div>
              </header>
              <nav className="rf-mobile-nav" aria-label="Navegação principal">{NAV_ITEMS.map(item => <button key={item.id} aria-current={view === item.id ? 'page' : undefined} onClick={() => { vibration.tick(); setView(item.id as any); }}><item.icon size={21} strokeWidth={1.6} /><span>{item.label}</span></button>)}</nav>
                <main className="rf-main">
                    <div className="rf-page">
                {isSearchActive && <section className="rf-search" role="search" aria-label="Buscar temas e simulados">
                  <div className="rf-search-field"><Search size={20} /><input ref={searchInputRef} aria-label="Buscar temas e simulados" type="search" placeholder="Qual assunto você quer encontrar?" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyDown={e => { if (e.key === 'Escape') { setIsSearchActive(false); setSearchTerm(''); } }} /><button className="rf-icon-button" aria-label="Fechar pesquisa" onClick={() => { setIsSearchActive(false); setSearchTerm(''); }}><X size={18} /></button></div>
                  {searchTerm.trim() && <div className="rf-search-results" aria-live="polite">
                    {activeTopics.filter(t => t.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())).slice(0, 6).map(t => <button key={t.id} onClick={() => setEditTopic(t)}><span>{t.title}</span><small>Tema de estudo</small><ArrowLeft size={16} className="rotate-180" /></button>)}
                    {activeSimulados.filter(s => s.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())).slice(0, 3).map(s => <button key={s.id} onClick={() => { setEditingSimulado(s); setSimuladoModalOpen(true); }}><span>{s.name}</span><small>Simulado</small><ArrowLeft size={16} className="rotate-180" /></button>)}
                    {!activeTopics.some(t => t.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) && !activeSimulados.some(s => s.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) && <p>Nenhum tema ou simulado encontrado. Tente outro nome.</p>}
                  </div>}
                </section>}

                <div className="flex-1 w-full">
                    <Suspense fallback={<LoadingSpinner />}>
                        {view === 'list' && (
                            <HubView 
                                topics={activeTopics} 
                                simulados={activeSimulados}
                                config={config}
                                dailyNotes={dailyNotes}
                                setDailyNotes={setDailyNotes}
                                onReview={(id, idx) => setReviewData({tId: id, rIdx: idx})}
                                onQuickCompleteReview={handleQuickCompleteReview}
                                onEditTopic={(id) => {
                                    const t = topics.find(topic => topic.id === id);
                                    if(t) setEditTopic(t);
                                }}
                                onDeleteTopic={handleDeleteTopic}
                                searchTerm={searchTerm}
                                sortOrder={sortOrder}
                                setSortOrder={setSortOrder}
                                filterArea={filterArea}
                                setFilterArea={setFilterArea}
                                onAddSimulado={() => { setSimuladoModalOpen(true); setEditingSimulado(null); }}
                                onNavigateToView={(v) => setView(v as any)}
                                onOpenNewTopic={() => setAddModalOpen(true)}
                                onUpdateTopic={handleUpdateTopic}
                            />
                        )}
                        {view === 'calendar' && <CalendarView topics={activeTopics} simulados={activeSimulados} onOpenReview={(id, idx) => setReviewData({tId: id, rIdx: idx})} config={config} onUpdateTopic={handleUpdateTopic} onEditTopic={(t) => setEditTopic(t)} />}
                        
                        {view === 'database' && (
                            <DatabaseView 
                                topics={activeTopics} 
                                onEdit={(t) => setEditTopic(t)} 
                                onDelete={handleDeleteTopic}
                                onUpdateTopic={handleUpdateTopic}
                                simulados={activeSimulados}
                                onEditSimulado={(s) => { setEditingSimulado(s); setSimuladoModalOpen(true); }}
                                onDeleteSimulado={handleDeleteSimulado}
                                config={config}
                                searchTerm={searchTerm}
                            />
                        )}
                        
                        {view === 'simulados' && <SimuladosView simulados={activeSimulados} topics={activeTopics} config={config} onDelete={handleDeleteSimulado} onEdit={(s) => { setEditingSimulado(s); setSimuladoModalOpen(true); }} searchTerm={searchTerm} />}

                        {view === 'cronograma' && (
                            <CronogramaView 
                                scheduleProgress={scheduleProgress} 
                                setScheduleProgress={setScheduleProgress} 
                                config={config} 
                                searchTerm={searchTerm} 
                                onScheduleChange={(schedule) => {
                                    setConfig(prev => ({ ...prev, activeSchedule: schedule }));
                                    vibration.tick();
                                }}
                                onCreateAggregatedTopic={handleCreateAggregatedTopic}
                                existingTopics={activeTopics}
                                onUpdateTopic={handleUpdateTopic}
                                onEditTopic={(topic) => {
                                    setEditTopic(topic);
                                }}
                            />
                        )}

                        {view === 'stats' && <StatsView topics={activeTopics} simulados={activeSimulados} />}
                    </Suspense>
                </div>
                </div>
                </main>
            </div>

            {/* Modals */}
            <EditTopicModal 
                isOpen={addModalOpen} 
                onClose={() => setAddModalOpen(false)} 
                topic={null} 
                onSave={handleAddTopic}
                config={config} 
            />

            <EditTopicModal 
                isOpen={!!editTopic} 
                onClose={() => setEditTopic(null)} 
                topic={editTopic} 
                onSave={handleUpdateTopic} 
                onDelete={handleDeleteTopic}
                onEditReview={(rIdx) => editTopic && setHistoryEditData({tId: editTopic.id, rIdx})} 
                config={config} 
            />

            <SimuladoModal 
                isOpen={simuladoModalOpen} 
                onClose={() => setSimuladoModalOpen(false)} 
                simulado={editingSimulado} 
                onSave={handleSaveSimulado} 
                onDelete={handleDeleteSimulado}
                topics={topics} 
            />

            <SettingsModal 
                isOpen={settingsOpen} 
                onClose={() => setSettingsOpen(false)} 
                config={config} 
                onSaveConfig={(c) => {
                    if (c.useFSRS && (!config.useFSRS || c.fsrsRetention !== config.fsrsRetention || c.fsrsMaximumInterval !== config.fsrsMaximumInterval)) {
                        setTopics(prev => prev.map(t => t.deleted ? t : t.reviews.some(r => r.done) ? withNextFSRSReview({ ...t, updatedAt: Date.now() }, c, t.reviews.find(r => !r.done)?.targetQ || t.reviews[0]?.targetQ || 20) : { ...t, reviews: t.reviews.slice(0, 1), updatedAt: Date.now() }));
                    }
                    setConfig(c); vibration.success();
                }}
                syncKey={syncKey}
                onSaveKey={setSyncKey}
                onExport={handleExport}
                onImport={handleImport}
                themeMode={themeMode}
                setThemeMode={setThemeMode}
                runOptimization={runOptimization}
                onShowOptimizationInfo={() => setOptimizationInfoOpen(true)}
                status={status}
                installPrompt={installPrompt}
                onInstallApp={handleInstallApp}
                onOpenTutorial={() => { setSettingsOpen(false); setTutorialOpen(true); }}
            />

            <ReviewModal 
                isOpen={!!reviewData} 
                onClose={() => setReviewData(null)} 
                topic={currentReviewTopic} 
                reviewIdx={reviewData?.rIdx ?? null} 
                onSubmit={handleReviewSubmit}
                targetAccuracy={config.targetAccuracy}
                onEditTopic={() => {
                    setReviewData(null);
                    if (currentReviewTopic) setEditTopic(currentReviewTopic);
                }}
            />

            <EditReviewHistoryModal
                isOpen={!!historyEditData}
                onClose={() => setHistoryEditData(null)}
                topic={historyEditTopic}
                reviewIdx={historyEditData?.rIdx ?? null}
                onSave={handleHistoryEdit}
            />

            <OptimizationResultModal 
                isOpen={!!optimizationResult} 
                onClose={() => setOptimizationResult(null)} 
                onConfirm={applyOptimization}
                changes={optimizationResult?.changes || []} 
            />

            <OptimizationInfoModal
                isOpen={optimizationInfoOpen}
                onClose={() => setOptimizationInfoOpen(false)}
            />

            <SupportModal 
                isOpen={supportModalOpen}
                onClose={() => setSupportModalOpen(false)}
            />

            <TutorialModal 
                isOpen={tutorialOpen}
                onClose={() => setTutorialOpen(false)}
            />

            <SyncAdModal
                isOpen={syncAdOpen}
                onClose={() => setSyncAdOpen(false)}
                onConfirm={() => syncNow(true)}
            />
        </div>
    );
}

export function App() {
    return (
        <ErrorBoundary>
            <AppContent />
        </ErrorBoundary>
    );
}
