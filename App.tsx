
import React, { useState, useMemo, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import { 
    Activity, BookOpen, Calendar, ClipboardList, Home, PieChart, Plus, Search, Settings, 
    Cloud, Check, LayoutGrid, Database, List, MoreHorizontal, ChevronDown, X, Zap, Menu, Flag, Map as MapIcon, GraduationCap,
    ArrowLeft, Download
} from 'lucide-react';
import { 
    AreaType, Topic, Simulado, ImportanceType
} from './types';
import { 
    AREAS, generateId, generateSmartSchedule, calculateNextLoad, getTodayStr, 
    triggerConfetti, optimizeSchedule, OptimizationChange, formatFullDate
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
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setInstallPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallApp = async () => {
        if (!installPrompt) return;
        // Show the install prompt
        installPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await installPrompt.userChoice;
        if (outcome === 'accepted') {
            setInstallPrompt(null);
        }
    };

    const activeTopics = useMemo(() => topics.filter(t => !t.deleted), [topics]);
    const activeSimulados = useMemo(() => simulados.filter(s => !s.deleted), [simulados]);

    const stats = useMemo(() => {
        const totalQ = activeTopics.reduce((acc, t) => acc + t.reviews.filter(r => r.done).reduce((s, r) => s + r.total, 0), 0);
        return { totalAnswered: totalQ + activeSimulados.reduce((acc, s) => acc + (s.totalQuestions || 0), 0) };
    }, [activeTopics, activeSimulados]);

    // Filtered Topics Logic
    const filteredTopics = useMemo(() => {
        let filtered = activeTopics.filter(t => {
            if (filterArea !== 'all' && t.area !== filterArea) return false;
            if (searchTerm && !t.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        });

        return filtered.sort((a, b) => {
            if (sortOrder === 'date') {
                return (b.updatedAt || 0) - (a.updatedAt || 0);
            }
            if (sortOrder === 'priority') {
                const pMap = { high: 3, medium: 2, low: 1 };
                const pA = pMap[a.importance] || 2;
                const pB = pMap[b.importance] || 2;
                return pB - pA;
            }
            if (sortOrder === 'questions') {
                const totalA = a.reviews.filter(r => r.done).reduce((s, r) => s + r.total, 0);
                const totalB = b.reviews.filter(r => r.done).reduce((s, r) => s + r.total, 0);
                return totalB - totalA;
            }
            return 0;
        });
    }, [activeTopics, filterArea, searchTerm, sortOrder]);

    // --- Actions ---
    const handleDeleteTopic = (id: string) => {
        const deletionTimestamp = Date.now() + 1000;
        setTopics(prev => prev.map(t => t.id === id ? { ...t, deleted: true, updatedAt: deletionTimestamp } : t));
        setEditTopic(null);
        vibration.success();
    };

    const handleDeleteSimulado = (id: string) => {
        const deletionTimestamp = Date.now() + 1000;
        setSimulados(prev => prev.map(s => s.id === id ? { ...s, deleted: true, updatedAt: deletionTimestamp } : s));
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

    const handleAutoCreateFromSchedule = useCallback((item: any) => {
        // Map Area
        let area: AreaType = 'clinica';
        const ga = (item.grandeArea || '').toLowerCase();
        if (ga.includes('cirurgia')) area = 'cirurgia';
        else if (ga.includes('pediatria')) area = 'pediatria';
        else if (ga.includes('ginecologia') || ga.includes('obstetrícia') || ga.includes('g.o')) area = 'go';
        else if (ga.includes('preventiva')) area = 'preventiva';

        // Determine Priority: "Azul" in Medcof = High, otherwise Medium
        const isHighPriority = item.importancia && item.importancia.toLowerCase().includes('azul');
        const importance: ImportanceType = isHighPriority ? 'high' : 'medium';

        const draftTopic: Topic = {
            id: '', // Will be generated
            title: item.aula,
            area: area,
            subarea: item.disciplina,
            importance: importance,
            studyDate: getTodayStr(),
            reviews: [], // Will be generated
            deleted: false,
            updatedAt: 0
        };

        handleAddTopic(draftTopic);
        triggerConfetti();
    }, [config.examDate, topics]);

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
            
            {/* Desktop Navigation (Sidebar) */}
            <aside className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 glass-panel border-r border-white/20 dark:border-white/5 p-6 z-50">
                <div className="flex items-center gap-4 mb-8 px-2 mt-2">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                        <Activity size={20} strokeWidth={2.5}/>
                    </div>
                    <div>
                        <h1 className="text-lg font-black tracking-tight leading-none text-slate-800 dark:text-white">ReviewFlow</h1>
                    </div>
                </div>

                <nav className="space-y-1.5 mt-2 mb-auto">
                    {NAV_ITEMS.map((item) => (
                        <button 
                            key={item.id} 
                            onClick={() => setView(item.id as any)} 
                            className={`w-full group flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-200 relative overflow-hidden ${
                                view === item.id 
                                ? 'bg-white dark:bg-white/10 shadow-sm text-slate-900 dark:text-white font-bold' 
                                : 'text-slate-500 hover:bg-black/5 dark:hover:bg-white/5 font-medium'
                            }`}
                        >
                            <item.icon size={18} className={`${view === item.id ? 'text-blue-600 dark:text-blue-400 stroke-[2.5px]' : 'stroke-[2px]'} transition-colors`}/>
                            <span className="text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/5">
                    <CompactLevelSystem totalQuestions={stats.totalAnswered} />
                    <button onClick={() => setSettingsOpen(true)} className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-black/5 dark:hover:bg-white/5 transition-all w-full">
                        <Settings size={18} /> Ajustes
                    </button>
                </div>
            </aside>

            {/* Mobile Top Navigation (Clean) */}
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
                                className={`flex flex-col items-center justify-center min-w-[60px] py-1 gap-1 rounded-xl transition-all duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}
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

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 flex flex-col min-h-screen relative pb-28 lg:pb-0 pt-[72px] lg:pt-0">
                
                {/* Floating Sticky Header */}
                <header className="sticky top-0 z-[60] px-4 pt-safe pointer-events-none">
                    <div className="mx-auto max-w-[600px] w-full pt-4 pb-2 flex justify-center">
                        <div className="glass-panel pointer-events-auto shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-black/20 rounded-full px-5 py-2 flex items-center justify-between gap-4 w-full animate-slide-up backdrop-blur-xl border border-white/40 dark:border-white/10 bg-[#f2f4f7]/50 dark:bg-black/50">
                            
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
                                        <button onClick={() => { setIsSearchActive(false); setSearchTerm(''); }} className="p-1 rounded-full bg-slate-100 dark:bg-white/10 ml-2">
                                            <X size={14} className="text-slate-500"/>
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsSearchActive(true)} className="flex items-center gap-2 text-left w-full group">
                                        <h2 className="text-sm font-black text-slate-800 dark:text-white tracking-tight pl-2">{currentViewTitle}</h2>
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Install App Button (Visible when prompted) */}
                                {installPrompt && (
                                    <button 
                                        onClick={handleInstallApp}
                                        className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full text-[10px] font-bold shadow-md active:scale-95 transition-all"
                                    >
                                        <Download size={12} strokeWidth={2.5}/> Instalar App
                                    </button>
                                )}

                                {/* Sync Status Dot */}
                                {status === 'syncing' && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>}
                                {status === 'online' && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                                {status === 'offline' && <div className="w-2 h-2 rounded-full bg-slate-300"></div>}
                                
                                <div className="w-px h-3 bg-slate-200 dark:bg-white/10"></div>

                                {/* Add Button (Desktop only, mobile has FAB) */}
                                <div className="relative hidden lg:block">
                                    <button 
                                        onClick={() => setDesktopNewMenuOpen(!desktopNewMenuOpen)} 
                                        className="w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
                                    >
                                        <Plus size={16} strokeWidth={3}/>
                                    </button>
                                    {desktopNewMenuOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl border border-black/5 dark:border-white/10 overflow-hidden animate-scale-in origin-top-right p-1.5 pointer-events-auto">
                                            <button onClick={() => { setAddModalOpen(true); setDesktopNewMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/10 rounded-xl flex items-center gap-3 transition-colors text-slate-700 dark:text-slate-200">
                                                <BookOpen size={16} className="text-blue-500"/> Nova Matéria
                                            </button>
                                            <button onClick={() => { setSimuladoModalOpen(true); setEditingSimulado(null); setDesktopNewMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/10 rounded-xl flex items-center gap-3 transition-colors text-slate-700 dark:text-slate-200">
                                                <ClipboardList size={16} className="text-purple-500"/> Novo Simulado
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="lg:hidden text-slate-400">
                                    <Activity size={16}/>
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
                                onAutoCreateTopic={handleAutoCreateFromSchedule}
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
                            <div className="absolute bottom-full right-0 mb-3 w-48 bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-xl rounded-[24px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-white/20 dark:border-white/10 p-2 flex flex-col gap-1 z-[100] animate-scale-in origin-bottom-right">
                                {installPrompt && (
                                    <button 
                                        onClick={() => { handleInstallApp(); setIsActionMenuOpen(false); }}
                                        className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
                                    >
                                        <div className="p-1.5 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-lg"><Download size={16}/></div>
                                        Instalar App
                                    </button>
                                )}
                                <button 
                                    onClick={() => { setAddModalOpen(true); setIsActionMenuOpen(false); }}
                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
                                >
                                    <div className="p-1.5 bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 rounded-lg"><BookOpen size={16}/></div>
                                    Nova Matéria
                                </button>
                                <button 
                                    onClick={() => { setSimuladoModalOpen(true); setEditingSimulado(null); setIsActionMenuOpen(false); }}
                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
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
                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
                                >
                                    <div className="p-1.5 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-lg"><Search size={16}/></div>
                                    Pesquisar
                                </button>
                                <button 
                                    onClick={() => { setSettingsOpen(true); setIsActionMenuOpen(false); }}
                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-800 dark:text-white font-bold text-xs"
                                >
                                    <div className="p-1.5 bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400 rounded-lg"><Settings size={16}/></div>
                                    Ajustes
                                </button>
                            </div>
                        </>
                    )}

                    <button 
                        onClick={() => { vibration.tick(); setIsActionMenuOpen(!isActionMenuOpen); }} 
                        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.15)] border transition-all duration-300 ${isActionMenuOpen ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-transparent' : 'bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-xl border-white/20 dark:border-white/10 text-slate-800 dark:text-white'}`}
                    >
                        {isActionMenuOpen ? <X size={22} /> : <MoreHorizontal size={22} />}
                    </button>
                </div>
            </div>

            {/* Modals */}
            <EditTopicModal 
                isOpen={addModalOpen} 
                onClose={() => setAddModalOpen(false)} 
                topic={null} 
                onSave={handleAddTopic}
            />

            <EditTopicModal 
                isOpen={!!editTopic} 
                onClose={() => setEditTopic(null)} 
                topic={editTopic} 
                onSave={handleUpdateTopic} 
                onDelete={handleDeleteTopic}
                onEditReview={(rIdx) => editTopic && setHistoryEditData({tId: editTopic.id, rIdx})} 
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
