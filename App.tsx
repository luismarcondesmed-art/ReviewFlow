
import React, { useState, useMemo, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import { 
    Activity, BookOpen, Calendar, ClipboardList, Home, PieChart, Plus, Search, Settings, 
    Cloud, Check, LayoutGrid, Database, List, MoreHorizontal, ChevronDown, X, Zap, Menu, Flag, Map as MapIcon, GraduationCap,
    ArrowLeft, Download, Filter, Sidebar
} from 'lucide-react';
import { 
    AreaType, Topic, Simulado, ImportanceType
} from './types';
import { 
    AREAS, generateId, generateSmartSchedule, calculateNextLoad, getTodayStr, 
    triggerConfetti, optimizeSchedule, OptimizationChange, formatFullDate, calculateFSRS
} from './utils';
import { useSync, useVibration } from './hooks';
import { CompactLevelSystem } from './components';
import { EditTopicModal, EditReviewHistoryModal, OptimizationResultModal, ReviewModal, SettingsModal, SimuladoModal, OptimizationInfoModal, TutorialModal } from './modals';

const HubView = lazy(() => import('./view-hub').then(module => ({ default: module.HubView })));
const CalendarView = lazy(() => import('./view-calendar').then(module => ({ default: module.CalendarView })));
const DatabaseView = lazy(() => import('./view-database').then(module => ({ default: module.DatabaseView })));
const CronogramaView = lazy(() => import('./view-cronograma').then(module => ({ default: module.CronogramaView })));

const LoadingSpinner = () => (
    <div className="flex h-full w-full items-center justify-center p-10">
        <Activity size={24} className="animate-spin text-zinc-400 opacity-50"/>
    </div>
);

export function App() {
    const { topics, setTopics, simulados, setSimulados, config, setConfig, scheduleProgress, setScheduleProgress, loaded, status, syncKey, setSyncKey } = useSync();
    const vibration = useVibration();
    
    // UI State
    const [view, setView] = useState<'list' | 'cronograma' | 'calendar' | 'database'>('list');
    const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(() => (localStorage.getItem('theme') as any) || 'system');
    
    // View Control States
    const [hubTab, setHubTab] = useState<'topics' | 'simulados'>('topics');
    const [calendarMode, setCalendarMode] = useState<'calendar' | 'list'>('calendar');
    const [dbTab, setDbTab] = useState<'topics' | 'simulados' | 'schedule'>('topics');
    
    // PWA Install State
    const [installPrompt, setInstallPrompt] = useState<any>(null);
    
    // Global Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    
    // Filter & Sort State for HubView
    const [sortOrder, setSortOrder] = useState<string>('date');
    const [filterArea, setFilterArea] = useState<string>('all');
    
    // New Feature State
    const [isCreatingTopic, setIsCreatingTopic] = useState(false);
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
    const [desktopAddMenuOpen, setDesktopAddMenuOpen] = useState(false);

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
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = themeMode === 'dark' || (themeMode === 'system' && isSystemDark);
        if (isDark) root.classList.add('dark'); else root.classList.remove('dark');
        localStorage.setItem('theme', themeMode);
        
        const metaColor = isDark ? '#000000' : '#f2f4f7';
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'theme-color');
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', metaColor);
    }, [themeMode]);

    useEffect(() => {
        if (isSearchActive && searchInputRef.current) searchInputRef.current.focus();
    }, [isSearchActive]);

    useEffect(() => {
        const handler = (e: any) => { e.preventDefault(); setInstallPrompt(e); };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallApp = async () => {
        if (!installPrompt) return;
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        if (outcome === 'accepted') setInstallPrompt(null);
    };

    const activeTopics = useMemo(() => topics.filter(t => !t.deleted), [topics]);
    const activeSimulados = useMemo(() => simulados.filter(s => !s.deleted), [simulados]);
    const stats = useMemo(() => {
        const totalQ = activeTopics.reduce((acc, t) => acc + t.reviews.filter(r => r.done).reduce((s, r) => s + r.total, 0), 0);
        return { totalAnswered: totalQ + activeSimulados.reduce((acc, s) => acc + (s.totalQuestions || 0), 0) };
    }, [activeTopics, activeSimulados]);

    // --- Action Handlers ---
    const handleDeleteTopic = (id: string) => { setTopics(prev => prev.map(t => t.id === id ? { ...t, deleted: true, updatedAt: Date.now() } : t)); setEditTopic(null); vibration.success(); };
    const handleDeleteSimulado = (id: string) => { setSimulados(prev => prev.map(s => s.id === id ? { ...s, deleted: true, updatedAt: Date.now() } : s)); setSimuladoModalOpen(false); setEditingSimulado(null); vibration.success(); };
    const handleAddTopic = (t: Topic) => { const newTopicId = generateId(); const reviews = generateSmartSchedule(t.studyDate, config.examDate, t.importance, topics, newTopicId, t.customSettings); setTopics(prev => [{ ...t, id: newTopicId, reviews, deleted: false, updatedAt: Date.now() }, ...prev]); setAddModalOpen(false); vibration.success(); };
    const handleUpdateTopic = (updated: Topic) => { 
        const old = topics.find(t => t.id === updated.id); let reviews = updated.reviews;
        // Check if schedule needs regeneration (date change or custom settings change)
        const dateChanged = old && old.studyDate !== updated.studyDate;
        const customChanged = old && JSON.stringify(old.customSettings) !== JSON.stringify(updated.customSettings);
        
        if (dateChanged || customChanged) { 
            if(confirm("Recalcular agendamento? Histórico de revisões feitas será mantido, mas datas futuras mudarão.")) {
                 const newSchedule = generateSmartSchedule(updated.studyDate, config.examDate, updated.importance, topics, updated.id, updated.customSettings);
                 const doneReviews = old?.reviews.filter(r => r.done) || [];
                 // Filter new schedule to remove types already done
                 reviews = [...doneReviews, ...newSchedule.filter(r => !doneReviews.some(dr => dr.type === r.type))];
                 reviews.sort((a,b) => a.date.localeCompare(b.date));
            } else {
                updated.studyDate = old.studyDate; 
                updated.customSettings = old.customSettings;
            }
        } else if (old && old.importance !== updated.importance) {
             reviews = reviews.map(r => r.done ? r : { ...r, targetQ: calculateNextLoad(updated.importance, null, r.type, null) });
        }
        
        setTopics(prev => prev.map(t => t.id === updated.id ? { ...updated, reviews, updatedAt: Date.now() } : t)); 
        vibration.success(); 
    };

    const processReviewSubmission = (tId: string, rIdx: number, data: any) => {
        setTopics(prev => prev.map(t => { 
            if (t.id !== tId) return t; 
            
            const nr = [...t.reviews]; 
            const completedReview = { ...nr[rIdx], done: true, ...data, completedAt: new Date().toISOString() };
            nr[rIdx] = completedReview;
            
            // --- FSRS INTEGRATION ---
            const lastReviewDate = t.fsrs?.lastReview || t.studyDate;
            const daysSince = Math.max(1, (new Date().getTime() - new Date(lastReviewDate + 'T12:00:00').getTime()) / 86400000);
            const accuracy = data.total > 0 ? (data.correct / data.total) : 0;
            
            // Calculate new FSRS state
            const newFSRS = calculateFSRS(t.fsrs, data.difficulty, accuracy, daysSince);
            
            // Update next review load based on new Difficulty
            if (rIdx + 1 < nr.length) {
                nr[rIdx+1].targetQ = calculateNextLoad(t.importance, data.difficulty, nr[rIdx+1].type, accuracy, newFSRS.difficulty);
            }

            return { ...t, reviews: nr, fsrs: newFSRS, updatedAt: Date.now() }; 
        })); 
        vibration.complete(); 
        triggerConfetti();
    };

    const handleReviewModalSubmit = (d: any) => { if (reviewData) { processReviewSubmission(reviewData.tId, reviewData.rIdx, d); setReviewData(null); }};
    const handleQuickReview = (tId: string, rIdx: number, d: any) => processReviewSubmission(tId, rIdx, d);
    const handleHistoryEdit = (d: any) => { if(historyEditData) { setTopics(prev => prev.map(t => { if(t.id !== historyEditData.tId) return t; const nr = [...t.reviews]; if(nr[historyEditData.rIdx]) nr[historyEditData.rIdx] = { ...nr[historyEditData.rIdx], ...d }; return { ...t, reviews: nr, updatedAt: Date.now() }; })); setHistoryEditData(null); vibration.success(); }};
    const handleSaveSimulado = (s: Simulado) => { setSimulados(prev => { const ex = prev.find(p => p.id === s.id); return ex ? prev.map(p => p.id === s.id ? s : p) : [...prev, { ...s, id: s.id || generateId() }]; }); setSimuladoModalOpen(false); setEditingSimulado(null); vibration.success(); };
    const runOptimization = () => { const r = optimizeSchedule(topics); if(r.changes.length === 0) alert("Nada a otimizar."); else setOptimizationResult(r); setSettingsOpen(false); };
    const applyOptimization = () => { if(optimizationResult) { setTopics(optimizationResult.topics); setOptimizationResult(null); vibration.success(); }};
    const handleExport = () => { const b = new Blob([JSON.stringify({ version: 1, date: new Date().toISOString(), topics, simulados, config }, null, 2)], { type: 'application/json' }); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = `backup-${getTodayStr()}.json`; document.body.appendChild(a); a.click(); document.body.removeChild(a); };
    const handleImport = (e: any) => { const f = e.target.files?.[0]; if(!f) return; const r = new FileReader(); r.onload = (ev) => { try { const d = JSON.parse(ev.target?.result as string); if(d.topics) setTopics(d.topics); if(d.simulados) setSimulados(d.simulados); if(d.config) setConfig(d.config); alert('Importado!'); setSettingsOpen(false); } catch(err){ alert('Erro'); }}; r.readAsText(f); };
    const handleAutoCreateFromSchedule = useCallback((item: any) => {
        let area: AreaType = 'clinica';
        const ga = (item.grandeArea || '').toLowerCase();
        if (ga.includes('cirurgia')) area = 'cirurgia'; else if (ga.includes('pediatria')) area = 'pediatria'; else if (ga.includes('ginecologia') || ga.includes('obstetrícia') || ga.includes('g.o')) area = 'go'; else if (ga.includes('preventiva')) area = 'preventiva';
        // When auto-creating, we can link the schedule item ID immediately
        handleAddTopic({ 
            id: '', 
            title: item.aula, 
            area, 
            subarea: item.disciplina, 
            importance: item.importancia?.toLowerCase().includes('azul') ? 'high' : 'medium', 
            studyDate: getTodayStr(), 
            reviews: [], 
            deleted: false, 
            updatedAt: 0,
            linkedScheduleIds: [item.id]
        }); 
        triggerConfetti();
    }, [config.examDate, topics]);

    if (!loaded) return <LoadingSpinner />;

    const currentViewTitle = { list: 'Dashboard', cronograma: 'Cronograma', database: 'Banco', calendar: 'Agenda' }[view];

    const MobileControlHub = () => (
        <div className="flex-1 flex justify-center">
            {view === 'list' && <div className="flex gap-4 text-[10px] font-black text-slate-400"><button onClick={() => setHubTab('topics')} className={hubTab === 'topics' ? 'text-black dark:text-white' : ''}>MATÉRIAS</button><button onClick={() => setHubTab('simulados')} className={hubTab === 'simulados' ? 'text-black dark:text-white' : ''}>SIMULADOS</button></div>}
            {view === 'calendar' && <div className="flex gap-4 text-[10px] font-black text-slate-400"><button onClick={() => setCalendarMode('calendar')} className={calendarMode === 'calendar' ? 'text-black dark:text-white' : ''}>MÊS</button><button onClick={() => setCalendarMode('list')} className={calendarMode === 'list' ? 'text-black dark:text-white' : ''}>LISTA</button></div>}
            {view === 'database' && <div className="flex gap-4 text-[10px] font-black text-slate-400"><button onClick={() => setDbTab('topics')} className={dbTab === 'topics' ? 'text-black dark:text-white' : ''}>MATÉRIAS</button><button onClick={() => setDbTab('simulados')} className={dbTab === 'simulados' ? 'text-black dark:text-white' : ''}>SIMULADOS</button><button onClick={() => setDbTab('schedule')} className={dbTab === 'schedule' ? 'text-black dark:text-white' : ''}>AULAS</button></div>}
        </div>
    );

    const historyEditTopic = historyEditData ? topics.find(t => t.id === historyEditData.tId) || null : null;

    return (
        <div className="min-h-screen bg-[#f2f4f7] dark:bg-black text-slate-900 dark:text-slate-200 flex flex-col lg:flex-row font-sans overflow-x-hidden selection:bg-blue-500/30">
            
            {/* --- REINVENTED DESKTOP SIDEBAR (Floating Modern Style) --- */}
            <aside className="hidden lg:flex flex-col w-72 fixed left-4 top-4 bottom-4 rounded-[32px] bg-white/80 dark:bg-[#121214]/80 backdrop-blur-2xl border border-white/40 dark:border-white/5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] dark:shadow-black/50 p-5 z-50 overflow-hidden">
                {/* Brand */}
                <div className="flex items-center gap-4 mb-8 px-2 mt-2">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                        <Activity size={20} strokeWidth={2.5}/>
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tight leading-none text-slate-800 dark:text-white">ReviewFlow</h1>
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">Medical AI</p>
                    </div>
                </div>

                {/* Primary Action Button (Desktop) */}
                <div className="relative mb-6 z-20">
                    <button 
                        onClick={() => setDesktopAddMenuOpen(!desktopAddMenuOpen)} 
                        className="w-full h-12 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center gap-3 font-bold text-sm shadow-xl active:scale-[0.98] transition-all hover:shadow-2xl group"
                    >
                        <Plus size={18} strokeWidth={3} className={`transition-transform duration-300 ${desktopAddMenuOpen ? 'rotate-45' : ''}`}/> 
                        <span className="tracking-wide">Novo Item</span>
                    </button>
                    
                    {/* Floating Dropdown */}
                    <div className={`absolute top-full left-0 w-full mt-2 bg-white dark:bg-[#1c1c1e] border border-black/5 dark:border-white/10 rounded-2xl p-1.5 shadow-2xl transition-all duration-300 origin-top ${desktopAddMenuOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                        <button onClick={() => { setIsCreatingTopic(true); setDesktopAddMenuOpen(false); if(view !== 'list') setView('list'); setHubTab('topics'); }} className="flex items-center gap-3 w-full p-3 hover:bg-slate-50 dark:hover:bg-white/10 rounded-xl transition-colors text-slate-700 dark:text-slate-200 text-xs font-bold">
                            <BookOpen size={16} className="text-blue-500"/> Matéria
                        </button>
                        <button onClick={() => { setSimuladoModalOpen(true); setEditingSimulado(null); setDesktopAddMenuOpen(false); }} className="flex items-center gap-3 w-full p-3 hover:bg-slate-50 dark:hover:bg-white/10 rounded-xl transition-colors text-slate-700 dark:text-slate-200 text-xs font-bold">
                            <ClipboardList size={16} className="text-purple-500"/> Simulado
                        </button>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-1">
                    {[
                        { id: 'list', label: 'Dashboard', icon: LayoutGrid },
                        { id: 'cronograma', label: 'Cronograma', icon: MapIcon },
                        { id: 'database', label: 'Banco de Dados', icon: Database },
                        { id: 'calendar', label: 'Agenda', icon: Calendar },
                    ].map(item => (
                        <button 
                            key={item.id} 
                            onClick={() => setView(item.id as any)} 
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all relative overflow-hidden group ${view === item.id ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}
                        >
                            <item.icon size={20} strokeWidth={view === item.id ? 2.5 : 2} className="relative z-10"/>
                            <span className="relative z-10">{item.label}</span>
                            {view === item.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"></div>}
                        </button>
                    ))}
                </nav>

                {/* Footer Stats & Settings */}
                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
                    <CompactLevelSystem totalQuestions={stats.totalAnswered} />
                    <button onClick={() => setSettingsOpen(true)} className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full mt-2">
                        <Settings size={16} /> Configurações
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col min-h-screen relative pb-36 lg:pb-0 lg:ml-80 lg:mr-4 transition-all duration-300">
                
                {/* Mobile Header (Minimal) */}
                <div className="lg:hidden sticky top-0 z-[60] bg-[#f2f4f7]/80 dark:bg-black/80 backdrop-blur-xl px-4 py-3 safe-top border-b border-slate-200/50 dark:border-white/5 flex items-center justify-between h-14">
                    {isSearchActive ? (
                        <div className="flex-1 flex items-center bg-white dark:bg-zinc-800 rounded-full px-3 py-1.5 animate-fade-in border border-slate-200 dark:border-white/10">
                            <input ref={searchInputRef} className="bg-transparent border-none outline-none text-sm font-medium w-full text-black dark:text-white placeholder-slate-400" placeholder="Buscar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onBlur={() => !searchTerm && setIsSearchActive(false)}/>
                            <button onClick={() => { setIsSearchActive(false); setSearchTerm(''); }}><X size={14} className="text-slate-400"/></button>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-sm font-black tracking-tight flex items-center gap-2 uppercase">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400">
                                    {{ list: 'Dashboard', cronograma: 'Cronograma', database: 'Banco', calendar: 'Agenda' }[view]}
                                </span>
                            </h1>
                            <div className="flex gap-4 items-center">
                                <MobileControlHub />
                                <button onClick={() => setIsSearchActive(true)} className="p-2 bg-white dark:bg-white/10 rounded-full shadow-sm text-slate-600 dark:text-white"><Search size={16}/></button>
                            </div>
                        </>
                    )}
                </div>

                {/* Content Container */}
                <div className="flex-1 p-4 lg:py-8 w-full max-w-[1600px] mx-auto">
                    <Suspense fallback={<LoadingSpinner />}>
                        {view === 'list' && (
                            <HubView 
                                topics={activeTopics} 
                                simulados={activeSimulados}
                                config={config}
                                activeTab={hubTab} 
                                setActiveTab={setHubTab} 
                                onReview={(id, idx) => setReviewData({tId: id, rIdx: idx})}
                                onEditTopic={(id) => { const t = topics.find(topic => topic.id === id); if(t) setEditTopic(t); }}
                                onUpdateTopic={handleUpdateTopic}
                                onDeleteTopic={handleDeleteTopic}
                                searchTerm={searchTerm}
                                sortOrder={sortOrder}
                                setSortOrder={setSortOrder}
                                filterArea={filterArea}
                                setFilterArea={setFilterArea}
                                onQuickReview={handleQuickReview}
                                isCreatingTopic={isCreatingTopic}
                                setIsCreatingTopic={setIsCreatingTopic}
                                onAddTopic={handleAddTopic}
                                onOpenFullAddModal={() => setAddModalOpen(true)}
                                onAddSimulado={handleSaveSimulado}
                                onDeleteSimulado={handleDeleteSimulado}
                                onEditSimulado={(s) => { setEditingSimulado(s); setSimuladoModalOpen(true); }}
                            />
                        )}
                        {view === 'calendar' && <CalendarView topics={activeTopics} simulados={activeSimulados} onOpenReview={(id, idx) => setReviewData({tId: id, rIdx: idx})} config={config} viewMode={calendarMode} setViewMode={setCalendarMode} />}
                        {view === 'database' && <DatabaseView 
                            topics={activeTopics} 
                            onEdit={(t) => setEditTopic(t)} 
                            onUpdateTopic={handleUpdateTopic} 
                            onAddTopic={handleAddTopic} 
                            onDelete={handleDeleteTopic} 
                            simulados={activeSimulados} 
                            onEditSimulado={(s) => { setEditingSimulado(s); setSimuladoModalOpen(true); }} 
                            onUpdateSimulado={handleSaveSimulado} 
                            onAddSimulado={handleSaveSimulado} 
                            onDeleteSimulado={handleDeleteSimulado} 
                            config={config} 
                            searchTerm={searchTerm} 
                            activeTab={dbTab} 
                            setActiveTab={setDbTab}
                            scheduleProgress={scheduleProgress}
                            setScheduleProgress={setScheduleProgress} 
                        />}
                        {view === 'cronograma' && <CronogramaView scheduleProgress={scheduleProgress} setScheduleProgress={setScheduleProgress} config={config} searchTerm={searchTerm} onScheduleChange={(schedule) => { setConfig(prev => ({ ...prev, activeSchedule: schedule })); vibration.tick(); }} onAutoCreateTopic={handleAutoCreateFromSchedule} />}
                    </Suspense>
                </div>
            </main>

            {/* Mobile Bottom Floating Nav (Glass) */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.15)] p-1.5 flex gap-2 items-center max-w-[92%] overflow-x-auto no-scrollbar ring-1 ring-black/5 mb-safe">
                {[
                    { id: 'list', icon: LayoutGrid },
                    { id: 'cronograma', icon: MapIcon },
                    { id: 'database', icon: Database },
                    { id: 'calendar', icon: Calendar },
                ].map(item => (
                    <button key={item.id} onClick={() => { vibration.tick(); setView(item.id as any); }} className={`p-3.5 rounded-full transition-all duration-300 ${view === item.id ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
                        <item.icon size={22} strokeWidth={2.5}/>
                    </button>
                ))}
            </div>

            {/* Mobile Action FAB - Adjusted Position */}
            <div className="lg:hidden fixed bottom-28 right-6 z-[80] mb-safe">
                {isActionMenuOpen && (
                    <>
                        <div className="fixed inset-0 z-[85] bg-black/10 backdrop-blur-[2px]" onClick={() => setIsActionMenuOpen(false)}></div>
                        <div className="absolute bottom-full right-0 mb-4 w-48 bg-white dark:bg-[#1c1c1e] rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-white/20 dark:border-white/10 p-2 flex flex-col gap-1 z-[90] animate-scale-in origin-bottom-right">
                            <button onClick={() => { setIsCreatingTopic(true); setIsActionMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors text-xs font-bold text-slate-800 dark:text-white">
                                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 rounded-xl"><BookOpen size={18}/></div> Nova Matéria
                            </button>
                            <button onClick={() => { setSimuladoModalOpen(true); setEditingSimulado(null); setIsActionMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors text-xs font-bold text-slate-800 dark:text-white">
                                <div className="p-2 bg-purple-100 dark:bg-purple-500/20 text-purple-600 rounded-xl"><ClipboardList size={18}/></div> Novo Simulado
                            </button>
                            <div className="h-px bg-slate-100 dark:bg-white/5 my-1"></div>
                            <button onClick={() => { setSettingsOpen(true); setIsActionMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors text-xs font-bold text-slate-500">
                                <Settings size={18}/> Ajustes
                            </button>
                        </div>
                    </>
                )}
                <button onClick={() => { vibration.tick(); setIsActionMenuOpen(!isActionMenuOpen); }} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 ${isActionMenuOpen ? 'bg-slate-800 dark:bg-zinc-800 rotate-45' : 'bg-black dark:bg-white hover:scale-105'}`}>
                    <Plus size={26} className={isActionMenuOpen ? 'text-white' : 'text-white dark:text-black'} strokeWidth={2.5}/>
                </button>
            </div>

            {/* Modals Injection */}
            <EditTopicModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} topic={null} onSave={handleAddTopic} config={config} />
            <EditTopicModal isOpen={!!editTopic} onClose={() => setEditTopic(null)} topic={editTopic} onSave={handleUpdateTopic} onDelete={handleDeleteTopic} onEditReview={(rIdx) => editTopic && setHistoryEditData({tId: editTopic.id, rIdx})} config={config} />
            <SimuladoModal isOpen={simuladoModalOpen} onClose={() => setSimuladoModalOpen(false)} simulado={editingSimulado} onSave={handleSaveSimulado} onDelete={handleDeleteSimulado} topics={topics} />
            <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} config={config} onSaveConfig={(c) => { setConfig(c); vibration.success(); }} syncKey={syncKey} onSaveKey={setSyncKey} onExport={handleExport} onImport={handleImport} themeMode={themeMode} setThemeMode={setThemeMode} runOptimization={runOptimization} onShowOptimizationInfo={() => setOptimizationInfoOpen(true)} status={status} installPrompt={installPrompt} onInstallApp={handleInstallApp} onOpenTutorial={() => { setSettingsOpen(false); setTutorialOpen(true); }} />
            <ReviewModal isOpen={!!reviewData} onClose={() => setReviewData(null)} topic={reviewData ? topics.find(t => t.id === reviewData.tId) || null : null} reviewIdx={reviewData?.rIdx ?? null} onSubmit={handleReviewModalSubmit} targetAccuracy={config.targetAccuracy} />
            <EditReviewHistoryModal isOpen={!!historyEditData} onClose={() => setHistoryEditData(null)} topic={historyEditTopic} reviewIdx={historyEditData?.rIdx ?? null} onSave={handleHistoryEdit} />
            <OptimizationResultModal isOpen={!!optimizationResult} onClose={() => setOptimizationResult(null)} onConfirm={applyOptimization} changes={optimizationResult?.changes || []} />
            <OptimizationInfoModal isOpen={optimizationInfoOpen} onClose={() => setOptimizationInfoOpen(false)} />
            <TutorialModal isOpen={tutorialOpen} onClose={() => setTutorialOpen(false)} />
        </div>
    );
}
