
import React, { useState, useMemo, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import { 
    Activity, BookOpen, Calendar, ClipboardList, Home, PieChart, Plus, Search, Settings, 
    Cloud, Check, LayoutGrid, Database, List, MoreHorizontal, ChevronDown, X, Zap, Menu, Flag, Map as MapIcon, GraduationCap,
    ArrowLeft, Download, LogOut, Moon, Sun, Monitor
} from 'lucide-react';
import { 
    AreaType, Topic, Simulado, ImportanceType
} from './types';
import { 
    AREAS, generateId, generateSmartSchedule, calculateNextLoad, getTodayStr, 
    triggerConfetti, optimizeSchedule, OptimizationChange, formatFullDate, APP_ID
} from './utils';
import { useSync, useVibration } from './hooks';
import { NotificationService } from './services/notificationService';
import { LevelSystem, TopicCard, CompactLevelSystem, UserStatsDropdown } from './components';
import { EditTopicModal, EditReviewHistoryModal, OptimizationResultModal, ReviewModal, SettingsModal, SimuladoModal, OptimizationInfoModal, TutorialModal } from './modals';

// --- Lazy Loaded Views for Performance ---
const HubView = lazy(() => import('./views/view-hub').then(module => ({ default: module.HubView })));
const CalendarView = lazy(() => import('./views/view-calendar').then(module => ({ default: module.CalendarView })));
const DatabaseView = lazy(() => import('./views/view-database').then(module => ({ default: module.DatabaseView })));
const SimuladosView = lazy(() => import('./views/view-simulados').then(module => ({ default: module.SimuladosView })));
const CronogramaView = lazy(() => import('./views/view-cronograma').then(module => ({ default: module.CronogramaView })));
const StatsView = lazy(() => import('./views/view-stats').then(module => ({ default: module.StatsView })));

// --- Loading Skeleton ---
const LoadingSpinner = () => (
    <div className="flex flex-col h-full w-full items-center justify-center p-10 gap-4 animate-fade-in">
        <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-slate-100 dark:border-white/10"></div>
            <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Carregando</span>
    </div>
);

export function App() {
    const { topics, setTopics, simulados, setSimulados, config, setConfig, scheduleProgress, setScheduleProgress, loaded, status, syncKey, setSyncKey } = useSync();
    const vibration = useVibration();
    
    // UI State
    const [view, setView] = useState<'list' | 'cronograma' | 'simulados' | 'calendar' | 'database' | 'stats'>('list');
    const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(() => (localStorage.getItem('theme') as any) || 'system');
    const [desktopNewMenuOpen, setDesktopNewMenuOpen] = useState(false);
    
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
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

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
    
    const [optimizationResult, setOptimizationResult] = useState<{topics: Topic[], changes: OptimizationChange[]} | null>(null);

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
        return { totalAnswered: totalQ + activeSimulados.reduce((acc, s) => acc + (s.totalQuestions || 0), 0) };
    }, [activeTopics, activeSimulados]);

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
        const reviews = generateSmartSchedule(t.studyDate, config.examDate, t.importance, topics, newTopicId);
        const newTopic: Topic = { ...t, id: newTopicId, reviews: reviews, deleted: false, updatedAt: Date.now() };
        setTopics(prev => [newTopic, ...prev]);
        setAddModalOpen(false);
        vibration.success();
    };

    const handleCreateAggregatedTopic = useCallback((title: string, area: AreaType, lessons: string[], priority: ImportanceType, baseQuestions?: number, blockId?: string, tags?: string[]) => {
        const existing = topics.find(t => t.title === title && !t.deleted);
        
        if (existing) {
            const updated: Topic = {
                ...existing,
                linkedLessons: lessons,
                source: blockId || existing.source,
                tags: tags || existing.tags,
                updatedAt: Date.now()
            };
            setTopics(prev => prev.map(t => t.id === existing.id ? updated : t));
            vibration.success();
            alert("Matéria atualizada com as novas aulas do bloco!");
        } else {
            const newTopicId = generateId();
            // Pass baseQuestions as overrideBaseQuestions to maintain AI schedule
            const reviews = generateSmartSchedule(getTodayStr(), config.examDate, priority, topics, newTopicId, undefined, baseQuestions);
            const newTopic: Topic = {
                id: newTopicId,
                title,
                area,
                subarea: tags && tags.length > 0 ? tags[0] : 'Cronograma',
                importance: priority,
                studyDate: getTodayStr(),
                reviews,
                linkedLessons: lessons,
                source: blockId,
                tags: tags,
                deleted: false,
                updatedAt: Date.now()
            };
            setTopics(prev => [newTopic, ...prev]);
            triggerConfetti();
            vibration.success();
        }
    }, [topics, config.examDate]);

    const handleUpdateTopic = (updated: Topic) => {
        const old = topics.find(t => t.id === updated.id);
        let reviews = updated.reviews;
        if (old && old.studyDate !== updated.studyDate) {
             if (confirm("Recalcular cronograma devido à mudança de data?")) {
                 reviews = generateSmartSchedule(updated.studyDate, config.examDate, updated.importance, topics, updated.id);
             } else { updated.studyDate = old.studyDate; }
        } else if (old && old.importance !== updated.importance) {
            reviews = reviews.map(r => r.done ? r : { ...r, targetQ: calculateNextLoad(updated.importance, null, r.type, null) });
        }
        const finalTopic = { ...updated, reviews, updatedAt: Date.now() };
        setTopics(prev => prev.map(t => t.id === finalTopic.id ? finalTopic : t));
        vibration.success();
    };

    const handleReviewSubmit = (data: { correct: number; total: number; difficulty: string; timeSpent?: number }) => {
        if (!reviewData) return;
        const { correct, total, difficulty, timeSpent } = data;
        setTopics(prev => prev.map(t => {
            if (t.id !== reviewData.tId) return t;
            const newReviews = [...t.reviews];
            newReviews[reviewData.rIdx] = { 
                ...newReviews[reviewData.rIdx], 
                done: true, 
                correct, 
                total, 
                difficulty: difficulty as any, 
                completedAt: new Date().toISOString(),
                timeSpent
            };
            if (reviewData.rIdx + 1 < newReviews.length) {
                const acc = total > 0 ? correct/total : 0;
                newReviews[reviewData.rIdx+1].targetQ = calculateNextLoad(t.importance, difficulty, newReviews[reviewData.rIdx+1].type, acc);
            }
            return { ...t, reviews: newReviews, updatedAt: Date.now() };
        }));
        setReviewData(null);
        vibration.complete();
        triggerConfetti();
    };

    const handleHistoryEdit = (data: { date: string, correct: number, total: number }) => {
        if (!historyEditData) return;
        setTopics(prev => prev.map(t => {
            if (t.id !== historyEditData.tId) return t;
            const newReviews = [...t.reviews];
            if (newReviews[historyEditData.rIdx]) {
                newReviews[historyEditData.rIdx] = { ...newReviews[historyEditData.rIdx], date: data.date, correct: data.correct, total: data.total };
            }
            return { ...t, reviews: newReviews, updatedAt: Date.now() };
        }));
        setHistoryEditData(null);
        vibration.success();
    };

    const handleSaveSimulado = (newS: Simulado) => {
        const sWithId = { ...newS, id: newS.id || generateId() };
        if (editingSimulado) {
            setSimulados(prev => prev.map(s => s.id === editingSimulado.id ? sWithId : s));
        } else {
            setSimulados(prev => [...prev, sWithId]);
        }
        setSimuladoModalOpen(false);
        setEditingSimulado(null);
        vibration.success();
    };

    const runOptimization = () => {
        const result = optimizeSchedule(topics);
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
        const data = { version: 1, date: new Date().toISOString(), topics, simulados, config };
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
                if (data.topics) setTopics(data.topics);
                if (data.simulados) setSimulados(data.simulados);
                if (data.config) setConfig(data.config);
                alert('Importado!'); setSettingsOpen(false); vibration.success();
            } catch (err) { alert('Erro.'); vibration.error(); }
        };
        reader.readAsText(file);
    };

    if (!loaded) return <div className="flex h-screen w-full items-center justify-center bg-[#f2f4f7] dark:bg-black"><Activity size={40} className="animate-spin text-blue-600"/></div>;

    const currentReviewTopic = reviewData ? topics.find(t => t.id === reviewData.tId) || null : null;
    const historyEditTopic = historyEditData ? topics.find(t => t.id === historyEditData.tId) || null : null;

    const NAV_ITEMS = [
        { id: 'list', label: 'Dashboard', icon: LayoutGrid, title: 'Dashboard' },
        { id: 'cronograma', label: 'Cronograma', icon: MapIcon, title: 'Cronograma' },
        { id: 'calendar', label: 'Agenda', icon: Calendar, title: 'Agenda' },
        { id: 'database', label: 'Banco', icon: Database, title: 'Banco de Dados' },
        { id: 'stats', label: 'Estatísticas', icon: PieChart, title: 'Estatísticas ENAMED' },
    ];

    const currentViewTitle = NAV_ITEMS.find(n => n.id === view)?.title || 'ReviewFlow';

    return (
        <div 
            className="min-h-[100dvh] bg-[#f2f4f7] dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-200 flex flex-col font-sans overflow-x-hidden selection:bg-blue-500/30 touch-manipulation"
        >
            
            {/* --- MINIMALIST TOP NAVIGATION (DESKTOP) --- */}
            <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-zinc-900/80 border-b border-slate-200 dark:border-white/5 backdrop-blur-2xl sticky top-0 z-50">
                <div className="flex items-center gap-12 w-1/3">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('list')}>
                        <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                             <Activity size={16} strokeWidth={2.5}/>
                        </div>
                        <h1 className="text-lg font-black tracking-tight text-slate-800 dark:text-white mr-4">ReviewFlow</h1>
                        <div className="hidden lg:block mr-6">
                            <UserStatsDropdown totalQuestions={stats.totalAnswered} topics={topics} simulados={simulados} />
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex justify-center">
                    <nav className="flex items-center gap-2">
                        {NAV_ITEMS.map(item => {
                            const isActive = view === item.id;
                            return (
                                <button 
                                    key={item.id}
                                    onClick={() => setView(item.id as any)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${isActive ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white' : 'text-slate-500 lg:hover:text-slate-800 dark:lg:hover:text-white lg:hover:bg-slate-50 dark:lg:hover:bg-white/5'}`}
                                >
                                    <item.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                                    {item.label}
                                </button>
                            )
                        })}
                    </nav>
                </div>
                <div className="flex items-center justify-end gap-6 w-1/3">
                    <div className="flex items-center gap-2">
                        {/* Add Button (Desktop) */}
                        <div className="relative">
                            <button 
                                onClick={() => setDesktopNewMenuOpen(!desktopNewMenuOpen)} 
                                className="w-9 h-9 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-md lg:hover:scale-105 active:scale-90 transition-all duration-300"
                            >
                                <Plus size={18} strokeWidth={2.5} className={`transition-transform duration-300 ${desktopNewMenuOpen ? 'rotate-45' : ''}`} />
                            </button>
                            {desktopNewMenuOpen && (
                                <div className="absolute top-full right-0 mt-3 w-56 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl p-2 animate-scale-in z-50">
                                    <button onClick={() => { setAddModalOpen(true); setDesktopNewMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl text-left text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center"><BookOpen size={16}/></div>
                                        Novo Tema
                                    </button>
                                    <button onClick={() => { setSimuladoModalOpen(true); setDesktopNewMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl text-left text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center"><ClipboardList size={16}/></div>
                                        Novo Simulado
                                    </button>
                                </div>
                            )}
                        </div>
                        <button onClick={() => setSettingsOpen(true)} className="w-9 h-9 flex items-center justify-center text-slate-500 lg:hover:text-slate-800 dark:lg:hover:text-white rounded-full lg:hover:bg-slate-100 dark:lg:hover:bg-white/10 transition-all">
                            <Settings size={18} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Top Navigation (Floating & Dynamic) */}
            <div className="lg:hidden fixed top-[calc(1rem+env(safe-area-inset-top))] left-4 right-4 z-[80] animate-slide-down">
                <nav className="bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-black/50 rounded-2xl p-1.5 grid grid-cols-5 gap-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive = view === item.id;
                        return (
                            <button 
                                key={item.id} 
                                onClick={() => { 
                                    vibration.tick(); 
                                    setView(item.id as any);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }} 
                                className={`h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-md' : 'text-slate-400 dark:text-slate-500 active:bg-slate-100 dark:active:bg-white/5'}`}
                            >
                                <item.icon 
                                    size={20} 
                                    strokeWidth={isActive ? 2.5 : 2} 
                                />
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen relative pb-28 lg:pb-12 pt-[calc(6rem+env(safe-area-inset-top))] lg:pt-8 transition-all duration-500 max-w-7xl mx-auto w-full px-4 lg:px-8">
                
                {/* Search Overlay (When active) */}
                {isSearchActive && (
                    <div className="fixed inset-0 z-[100] bg-white/95 dark:bg-black/95 backdrop-blur-xl animate-fade-in flex flex-col p-4 pt-[calc(1rem+env(safe-area-inset-top))]">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 bg-slate-100 dark:bg-white/10 rounded-2xl flex items-center px-4 py-3">
                                <Search className="text-slate-400 mr-3" size={20} />
                                <input 
                                    ref={searchInputRef}
                                    type="text" 
                                    placeholder="O que você procura?"
                                    className="w-full bg-transparent outline-none text-base font-semibold text-slate-800 dark:text-white placeholder-slate-400"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} className="p-1 rounded-full bg-slate-200 dark:bg-white/20">
                                        <X size={14} className="text-slate-500 dark:text-slate-300"/>
                                    </button>
                                )}
                            </div>
                            <button onClick={() => { setIsSearchActive(false); setSearchTerm(''); }} className="font-bold text-slate-500 dark:text-slate-400">
                                Cancelar
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {/* Search results would go here if we wanted a dedicated search UI, 
                                but currently search filters the views. 
                                So we just show a hint or recent searches. */}
                            <div className="text-center text-slate-400 text-sm mt-10">
                                <Search size={48} className="mx-auto mb-4 opacity-20"/>
                                <p>Digite para buscar em {currentViewTitle}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex-1 w-full">
                    <Suspense fallback={<LoadingSpinner />}>
                        {view === 'list' && (
                            <HubView 
                                topics={activeTopics} 
                                simulados={activeSimulados}
                                config={config}
                                onReview={(id, idx) => setReviewData({tId: id, rIdx: idx})}
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
                            />
                        )}
                        {view === 'calendar' && <CalendarView topics={activeTopics} simulados={activeSimulados} onOpenReview={(id, idx) => setReviewData({tId: id, rIdx: idx})} config={config} onUpdateTopic={handleUpdateTopic} onEditTopic={(t) => setEditTopic(t)} />}
                        
                        {view === 'database' && (
                            <DatabaseView 
                                topics={activeTopics} 
                                onEdit={(t) => setEditTopic(t)} 
                                onDelete={handleDeleteTopic}
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
                            />
                        )}

                        {view === 'stats' && <StatsView />}
                    </Suspense>
                </div>
            </main>

            {/* --- Mobile Action Button (Bottom Right) --- */}
            <div className="lg:hidden fixed bottom-6 right-4 z-[90]">
                <div className="relative pointer-events-auto">
                    {isActionMenuOpen && (
                        <>
                            <div className="fixed inset-0 z-[95]" onClick={() => setIsActionMenuOpen(false)}></div>
                            <div className="absolute bottom-full right-0 mb-3 w-56 bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-xl rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/20 dark:border-white/10 p-2 flex flex-col gap-1 z-[100] animate-scale-in origin-bottom-right">
                                {installPrompt && (
                                    <button 
                                        onClick={() => { handleInstallApp(); setIsActionMenuOpen(false); }}
                                        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl active:bg-black/5 lg:hover:bg-black/5 dark:active:bg-white/10 dark:lg:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
                                    >
                                        <div className="p-1.5 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-lg"><Download size={16}/></div>
                                        Instalar App
                                    </button>
                                )}
                                <button 
                                    onClick={() => { setAddModalOpen(true); setIsActionMenuOpen(false); }}
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl active:bg-black/5 lg:hover:bg-black/5 dark:active:bg-white/10 dark:lg:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
                                >
                                    <div className="p-1.5 bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 rounded-lg"><BookOpen size={16}/></div>
                                    Nova Matéria
                                </button>
                                <button 
                                    onClick={() => { setSimuladoModalOpen(true); setEditingSimulado(null); setIsActionMenuOpen(false); }}
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl active:bg-black/5 lg:hover:bg-black/5 dark:active:bg-white/10 dark:lg:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
                                >
                                    <div className="p-1.5 bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 rounded-lg"><ClipboardList size={16}/></div>
                                    Novo Simulado
                                </button>
                                <button 
                                    onClick={() => { 
                                        setIsActionMenuOpen(false); 
                                        setIsSearchActive(true);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl active:bg-black/5 lg:hover:bg-black/5 dark:active:bg-white/10 dark:lg:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
                                >
                                    <div className="p-1.5 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-lg"><Search size={16}/></div>
                                    Pesquisar
                                </button>
                                <button 
                                    onClick={() => { setSettingsOpen(true); setIsActionMenuOpen(false); }}
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl active:bg-black/5 lg:hover:bg-black/5 dark:active:bg-white/10 dark:lg:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
                                >
                                    <div className="p-1.5 bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 rounded-lg"><Settings size={16}/></div>
                                    Ajustes
                                </button>
                            </div>
                        </>
                    )}

                    <button 
                        onClick={() => { vibration.tick(); setIsActionMenuOpen(!isActionMenuOpen); }} 
                        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] dark:shadow-black/50 border transition-all duration-300 ${isActionMenuOpen ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-transparent rotate-90 scale-90' : 'bg-white dark:bg-zinc-800 border-white/20 dark:border-white/10 text-slate-800 dark:text-white lg:hover:scale-105'}`}
                    >
                        {isActionMenuOpen ? <X size={24} /> : <MoreHorizontal size={24} />}
                    </button>
                </div>
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
                onSaveConfig={(c) => { setConfig(c); vibration.success(); }}
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

            <TutorialModal 
                isOpen={tutorialOpen}
                onClose={() => setTutorialOpen(false)}
            />
        </div>
    );
}
