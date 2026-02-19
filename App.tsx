
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
import { LevelSystem, TopicCard, CompactLevelSystem } from './components';
import { EditTopicModal, EditReviewHistoryModal, OptimizationResultModal, ReviewModal, SettingsModal, SimuladoModal, OptimizationInfoModal, TutorialModal } from './modals';

// --- Lazy Loaded Views for Performance ---
const HubView = lazy(() => import('./view-hub').then(module => ({ default: module.HubView })));
const CalendarView = lazy(() => import('./view-calendar').then(module => ({ default: module.CalendarView })));
const DatabaseView = lazy(() => import('./view-database').then(module => ({ default: module.DatabaseView })));
const SimuladosView = lazy(() => import('./view-simulados').then(module => ({ default: module.SimuladosView })));
const CronogramaView = lazy(() => import('./view-cronograma').then(module => ({ default: module.CronogramaView })));

// --- Loading Skeleton ---
const LoadingSpinner = () => (
    <div className="flex h-full w-full items-center justify-center p-10">
        <Activity size={32} className="animate-spin text-blue-500 opacity-50"/>
    </div>
);

export function App() {
    const { topics, setTopics, simulados, setSimulados, config, setConfig, scheduleProgress, setScheduleProgress, loaded, status, syncKey, setSyncKey } = useSync();
    const vibration = useVibration();
    
    // UI State
    const [view, setView] = useState<'list' | 'cronograma' | 'simulados' | 'calendar' | 'database'>('list');
    const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(() => (localStorage.getItem('theme') as any) || 'system');
    const [desktopNewMenuOpen, setDesktopNewMenuOpen] = useState(false);
    
    // PWA Install State
    const [installPrompt, setInstallPrompt] = useState<any>(null);
    
    // Global Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    
    // Filter & Sort State for HubView
    const [sortOrder, setSortOrder] = useState<string>('date');
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

    const handleCreateAggregatedTopic = useCallback((title: string, area: AreaType, lessons: string[], priority: ImportanceType) => {
        const existing = topics.find(t => t.title === title && !t.deleted);
        
        if (existing) {
            const updated: Topic = {
                ...existing,
                linkedLessons: lessons,
                updatedAt: Date.now()
            };
            setTopics(prev => prev.map(t => t.id === existing.id ? updated : t));
            vibration.success();
            alert("Matéria atualizada com as novas aulas do bloco!");
        } else {
            const newTopicId = generateId();
            const reviews = generateSmartSchedule(getTodayStr(), config.examDate, priority, topics, newTopicId);
            const newTopic: Topic = {
                id: newTopicId,
                title,
                area,
                subarea: 'Cronograma',
                importance: priority,
                studyDate: getTodayStr(),
                reviews,
                linkedLessons: lessons,
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

    const handleReviewSubmit = (data: { correct: number; total: number; difficulty: string }) => {
        if (!reviewData) return;
        const { correct, total, difficulty } = data;
        setTopics(prev => prev.map(t => {
            if (t.id !== reviewData.tId) return t;
            const newReviews = [...t.reviews];
            newReviews[reviewData.rIdx] = { ...newReviews[reviewData.rIdx], done: true, correct, total, difficulty: difficulty as any, completedAt: new Date().toISOString() };
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
        { id: 'simulados', label: 'Simulados', icon: ClipboardList, title: 'Simulados' },
        { id: 'calendar', label: 'Agenda', icon: Calendar, title: 'Agenda' },
        { id: 'database', label: 'Banco', icon: Database, title: 'Banco de Dados' },
    ];

    const currentViewTitle = NAV_ITEMS.find(n => n.id === view)?.title || 'ReviewFlow';

    return (
        <div className="min-h-screen bg-[#f2f4f7] dark:bg-black text-slate-900 dark:text-slate-200 flex flex-col lg:flex-row font-sans overflow-x-hidden selection:bg-blue-500/30">
            
            {/* --- FLOATING MODERN SIDEBAR (DESKTOP) --- */}
            <aside className="hidden lg:flex flex-col fixed left-4 top-4 bottom-4 w-64 bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-white/5 backdrop-blur-2xl z-50 p-4 rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out will-change-transform">
                {/* Logo Area */}
                <div className="flex items-center gap-3 px-3 mt-4 mb-8">
                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg relative z-10 border border-white/10">
                             <Activity size={20} strokeWidth={2.5}/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-black tracking-tight text-slate-800 dark:text-white leading-none">ReviewFlow</h1>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Medical Plan</span>
                    </div>
                </div>

                {/* Main Navigation */}
                <div className="space-y-1.5 mb-auto">
                    {NAV_ITEMS.map(item => {
                        const isActive = view === item.id;
                        return (
                            <button 
                                key={item.id}
                                onClick={() => setView(item.id as any)}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                                    isActive 
                                    ? 'bg-white dark:bg-white/10 text-blue-600 dark:text-white font-bold shadow-md dark:shadow-none' 
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-white/5 font-medium hover:pl-5'
                                }`}
                            >
                                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} className={`relative z-10 transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                <span className="relative z-10">{item.label}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Bottom Section */}
                <div className="pt-6 border-t border-slate-200/50 dark:border-white/5 space-y-4">
                    <CompactLevelSystem totalQuestions={stats.totalAnswered} />
                    
                    <button onClick={() => setSettingsOpen(true)} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold text-slate-500 hover:bg-white/50 dark:hover:bg-white/5 transition-all w-full border border-transparent hover:border-white/20 dark:hover:border-white/5 group">
                        <Settings size={16} className="group-hover:rotate-90 transition-transform duration-700" /> Configurações
                    </button>
                </div>
            </aside>

            {/* Mobile Top Navigation (Fixed) */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-[80] bg-[#f2f4f7]/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 safe-top">
                <nav className="flex items-center justify-between px-4 py-2 overflow-x-auto no-scrollbar">
                    {NAV_ITEMS.map((item) => {
                        const isActive = view === item.id;
                        return (
                            <button 
                                key={item.id} 
                                onClick={() => { 
                                    vibration.tick(); 
                                    setView(item.id as any);
                                }} 
                                className={`flex flex-col items-center justify-center min-w-[60px] py-1 gap-1 rounded-xl transition-all duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400 scale-105' : 'text-slate-400 dark:text-slate-500'}`}
                            >
                                <item.icon 
                                    size={20} 
                                    strokeWidth={isActive ? 2.5 : 2} 
                                />
                                <span className={`text-[9px] font-bold whitespace-nowrap transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`}>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content Area - Adjusted Margins for Floating Sidebar */}
            <main className="flex-1 lg:ml-[280px] flex flex-col min-h-screen relative pb-28 lg:pb-0 pt-[72px] lg:pt-0 transition-all duration-500">
                
                {/* Floating Sticky Header (Desktop & Mobile) */}
                <header className="sticky top-0 z-[60] px-4 pt-4 pb-2 pointer-events-none safe-top">
                    <div className="mx-auto max-w-[1000px] w-full flex justify-center">
                        <div className="glass-panel pointer-events-auto shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-black/40 rounded-full px-5 py-2 flex items-center justify-between gap-4 w-full animate-slide-up backdrop-blur-xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-zinc-900/60 transition-all duration-300">
                            
                            <div className="flex-1 flex items-center">
                                {isSearchActive ? (
                                    <div className="flex items-center w-full animate-fade-in">
                                        <Search className="text-blue-500 mr-2 shrink-0" size={16} />
                                        <input 
                                            ref={searchInputRef}
                                            type="text" 
                                            placeholder={`Buscar em ${currentViewTitle}...`}
                                            className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400 min-w-0"
                                            value={searchTerm}
                                            onChange={e => setSearchTerm(e.target.value)}
                                            onBlur={() => !searchTerm && setIsSearchActive(false)}
                                        />
                                        <button onClick={() => { setIsSearchActive(false); setSearchTerm(''); }} className="p-1 rounded-full bg-slate-100 dark:bg-white/10 ml-2 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                                            <X size={14} className="text-slate-500"/>
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsSearchActive(true)} className="flex items-center gap-2 text-left w-full group py-1">
                                        <h2 className="text-sm font-black text-slate-800 dark:text-white tracking-tight pl-2">{currentViewTitle}</h2>
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Install App Button */}
                                {installPrompt && (
                                    <button 
                                        onClick={handleInstallApp}
                                        className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full text-[10px] font-bold shadow-md active:scale-95 transition-all"
                                    >
                                        <Download size={12} strokeWidth={2.5}/> Instalar App
                                    </button>
                                )}

                                {/* Sync Status */}
                                {status === 'syncing' && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>}
                                {status === 'online' && <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>}
                                {status === 'offline' && <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>}
                                
                                <div className="w-px h-3 bg-slate-200 dark:bg-white/10"></div>

                                {/* Add Button (Desktop) */}
                                <div className="relative hidden lg:block">
                                    <button 
                                        onClick={() => setDesktopNewMenuOpen(!desktopNewMenuOpen)} 
                                        className="w-9 h-9 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-90 transition-all duration-300"
                                    >
                                        <Plus size={18} strokeWidth={3}/>
                                    </button>
                                    {desktopNewMenuOpen && (
                                        <div className="absolute top-full right-0 mt-3 w-56 bg-white/90 dark:bg-[#121214]/90 backdrop-blur-xl rounded-[24px] shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden animate-scale-in origin-top-right p-2 pointer-events-auto z-50">
                                            <button onClick={() => { setAddModalOpen(true); setDesktopNewMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl flex items-center gap-3 transition-colors text-slate-700 dark:text-slate-200 group">
                                                <div className="p-1.5 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"><BookOpen size={16}/></div> Nova Matéria
                                            </button>
                                            <button onClick={() => { setSimuladoModalOpen(true); setEditingSimulado(null); setDesktopNewMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-xl flex items-center gap-3 transition-colors text-slate-700 dark:text-slate-200 group">
                                                <div className="p-1.5 bg-purple-100 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform"><ClipboardList size={16}/></div> Novo Simulado
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-4 lg:p-8 pt-2 max-w-[1200px] mx-auto w-full">
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
                                searchTerm={searchTerm}
                                sortOrder={sortOrder}
                                setSortOrder={setSortOrder}
                                filterArea={filterArea}
                                setFilterArea={setFilterArea}
                                onAddSimulado={() => { setSimuladoModalOpen(true); setEditingSimulado(null); }}
                            >
                                <div className="grid grid-cols-1 gap-4">
                                    {filteredTopics.length === 0 ? ( 
                                        <div className="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 rounded-[2rem]">
                                            <div className="w-16 h-16 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                                <BookOpen size={24}/>
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Nada encontrado</h4>
                                            <p className="text-sm text-slate-500">Tente ajustar os filtros.</p>
                                        </div>
                                    ) : (
                                        filteredTopics.map(t => (
                                            <TopicCard 
                                                key={t.id} 
                                                topic={t} 
                                                onReview={(id, idx) => setReviewData({tId: id, rIdx: idx})} 
                                                onDelete={handleDeleteTopic} 
                                                onEdit={() => setEditTopic(t)} 
                                            />
                                        ))
                                    )}
                                </div>
                            </HubView>
                        )}
                        {view === 'calendar' && <CalendarView topics={activeTopics} simulados={activeSimulados} onOpenReview={(id, idx) => setReviewData({tId: id, rIdx: idx})} config={config} />}
                        
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
                            />
                        )}
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
                                        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
                                    >
                                        <div className="p-1.5 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-lg"><Download size={16}/></div>
                                        Instalar App
                                    </button>
                                )}
                                <button 
                                    onClick={() => { setAddModalOpen(true); setIsActionMenuOpen(false); }}
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
                                >
                                    <div className="p-1.5 bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 rounded-lg"><BookOpen size={16}/></div>
                                    Nova Matéria
                                </button>
                                <button 
                                    onClick={() => { setSimuladoModalOpen(true); setEditingSimulado(null); setIsActionMenuOpen(false); }}
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
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
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
                                >
                                    <div className="p-1.5 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-lg"><Search size={16}/></div>
                                    Pesquisar
                                </button>
                                <button 
                                    onClick={() => { setSettingsOpen(true); setIsActionMenuOpen(false); }}
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
                                >
                                    <div className="p-1.5 bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 rounded-lg"><Settings size={16}/></div>
                                    Ajustes
                                </button>
                            </div>
                        </>
                    )}

                    <button 
                        onClick={() => { vibration.tick(); setIsActionMenuOpen(!isActionMenuOpen); }} 
                        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] dark:shadow-black/50 border transition-all duration-300 ${isActionMenuOpen ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-transparent rotate-90 scale-90' : 'bg-white dark:bg-zinc-800 border-white/20 dark:border-white/10 text-slate-800 dark:text-white hover:scale-105'}`}
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
