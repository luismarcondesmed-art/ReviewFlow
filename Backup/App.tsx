import React, { useState, useMemo, useEffect } from 'react';
import { 
    Activity, BookOpen, Calendar, ClipboardList, Home, PieChart, Plus, Search, Settings, 
    Cloud, Check, LayoutGrid, Database
} from 'lucide-react';
import { 
    AreaType, Topic, Simulado, ImportanceType
} from './types';
import { 
    AREAS, generateId, generateSmartSchedule, calculateNextLoad, getTodayStr, 
    triggerConfetti, optimizeSchedule, OptimizationChange
} from './utils';
import { useSync, useVibration } from './hooks';
import { LevelSystem, TopicCard } from './components';
import { EditTopicModal, EditReviewHistoryModal, OptimizationResultModal, ReviewModal, SettingsModal, SimuladoModal } from './modals';
import { AnalyticsHub, CalendarView, SimuladosView, HubView, DatabaseView } from './views';

export function App() {
    const { topics, setTopics, simulados, setSimulados, config, setConfig, loaded, status, syncKey, setSyncKey } = useSync();
    const vibration = useVibration();
    
    // UI State
    const [view, setView] = useState<'list' | 'calendar' | 'dashboard' | 'simulados' | 'database'>('list');
    const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(() => (localStorage.getItem('theme') as any) || 'system');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterArea, setFilterArea] = useState<string>('all');
    const [desktopNewMenuOpen, setDesktopNewMenuOpen] = useState(false);
    
    // Modals
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editTopic, setEditTopic] = useState<Topic | null>(null);
    const [reviewData, setReviewData] = useState<{tId: string, rIdx: number} | null>(null);
    const [historyEditData, setHistoryEditData] = useState<{tId: string, rIdx: number} | null>(null);
    
    const [simuladoModalOpen, setSimuladoModalOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [editingSimulado, setEditingSimulado] = useState<Simulado | null>(null);
    
    // Optimization State
    const [optimizationResult, setOptimizationResult] = useState<{topics: Topic[], changes: OptimizationChange[]} | null>(null);

    useEffect(() => {
        const root = window.document.documentElement;
        const isDark = themeMode === 'dark' || (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) root.classList.add('dark'); else root.classList.remove('dark');
        localStorage.setItem('theme', themeMode);
    }, [themeMode]);

    const activeTopics = useMemo(() => topics.filter(t => !t.deleted), [topics]);
    const filteredTopics = useMemo(() => {
        return activeTopics.filter(t => {
            if (filterArea !== 'all' && t.area !== filterArea) return false;
            if (searchTerm && !t.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        }).sort((a,b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    }, [activeTopics, filterArea, searchTerm]);

    const stats = useMemo(() => {
        const totalQ = activeTopics.reduce((acc, t) => acc + t.reviews.filter(r => r.done).reduce((s, r) => s + r.total, 0), 0);
        return { totalAnswered: totalQ + simulados.reduce((acc, s) => acc + (s.totalQuestions || 0), 0) };
    }, [activeTopics, simulados]);

    // --- Actions ---

    const handleDeleteTopic = (id: string) => {
        if (confirm("Deseja realmente excluir este tópico?")) {
            setTopics(prev => prev.map(t => t.id === id ? { ...t, deleted: true, updatedAt: Date.now() } : t));
            vibration.error();
        }
    };

    const handleAddTopic = (t: Topic) => {
        const newTopicId = generateId();
        // Use Smart Schedule with Collision Detection
        const reviews = generateSmartSchedule(
            t.studyDate, 
            config.examDate, 
            t.importance, 
            topics, // Pass existing topics to check collisions
            newTopicId // Pass ID so it doesn't collide with itself
        );

        const newTopic: Topic = { 
            ...t, 
            id: newTopicId, 
            reviews: reviews, 
            deleted: false, 
            updatedAt: Date.now() 
        };
        setTopics(prev => [newTopic, ...prev]);
        setAddModalOpen(false);
        vibration.success();
    };

    const handleUpdateTopic = (updated: Topic) => {
        // Recalculate schedule if date changed
        const old = topics.find(t => t.id === updated.id);
        let reviews = updated.reviews;
        
        // If study date changed, we need to regenerate the whole schedule starting from that date
        if (old && old.studyDate !== updated.studyDate) {
             if (confirm("Mudar a data de início irá recalcular todo o cronograma deste tópico. Continuar?")) {
                 reviews = generateSmartSchedule(
                     updated.studyDate,
                     config.examDate,
                     updated.importance,
                     topics,
                     updated.id
                 );
             } else {
                 // Revert date change
                 updated.studyDate = old.studyDate;
             }
        } else if (old && old.importance !== updated.importance) {
            // Just update target questions for future reviews
            reviews = reviews.map(r => {
                if (r.done) return r;
                // Simple update of target, keeping dates
                return { ...r, targetQ: calculateNextLoad(updated.importance, null, r.type, null) }; 
            });
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
            newReviews[reviewData.rIdx] = { 
                ...newReviews[reviewData.rIdx], 
                done: true, 
                correct, 
                total, 
                difficulty: difficulty as any 
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
            // If the index exists
            if (newReviews[historyEditData.rIdx]) {
                newReviews[historyEditData.rIdx] = {
                    ...newReviews[historyEditData.rIdx],
                    date: data.date,
                    correct: data.correct,
                    total: data.total
                };
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
        if(confirm("Reorganizar agenda?\n\nAtrasados virão para hoje e o fluxo futuro será otimizado (máx 120q/dia).")) {
            const result = optimizeSchedule(topics);
            setOptimizationResult(result);
            setSettingsOpen(false);
        }
    };
    
    const applyOptimization = () => {
        if (optimizationResult) {
            setTopics(optimizationResult.topics);
            setOptimizationResult(null);
            vibration.success();
        }
    };

    // Import/Export Logic
    const handleExport = () => {
        const data = {
            version: 1,
            date: new Date().toISOString(),
            topics,
            simulados,
            config
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reviewflow-backup-${getTodayStr()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        vibration.success();
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target?.result as string);
                if (data.topics && Array.isArray(data.topics)) setTopics(data.topics);
                if (data.simulados && Array.isArray(data.simulados)) setSimulados(data.simulados);
                if (data.config) setConfig(data.config);
                alert('Dados importados com sucesso!');
                setSettingsOpen(false);
                vibration.success();
            } catch (err) {
                alert('Erro ao ler arquivo. Verifique o formato.');
                vibration.error();
            }
        };
        reader.readAsText(file);
    };

    if (!loaded) return <div className="flex h-screen w-full items-center justify-center bg-[#f2f4f7] dark:bg-black"><Activity size={40} className="animate-spin text-blue-600"/></div>;

    const currentReviewTopic = reviewData ? topics.find(t => t.id === reviewData.tId) || null : null;
    const historyEditTopic = historyEditData ? topics.find(t => t.id === historyEditData.tId) || null : null;

    return (
        <div className="min-h-screen bg-[#f2f4f7] dark:bg-black text-slate-900 dark:text-slate-100 flex flex-col lg:flex-row font-sans overflow-x-hidden selection:bg-blue-500/30">
            {/* Desktop Navigation */}
            <aside className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 glass-panel border-r border-white/20 dark:border-white/5 p-6 z-50">
                {/* Logo Area */}
                <div className="flex items-center gap-4 mb-8 px-2 mt-2">
                    <div className="w-12 h-12 rounded-[16px] bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm border border-white/50 dark:border-white/10">
                        <Activity size={24} strokeWidth={2.5}/>
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tight leading-none text-slate-800 dark:text-white">ReviewFlow</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 opacity-80">Medical Plan</p>
                    </div>
                </div>

                <LevelSystem totalQuestions={stats.totalAnswered} />

                <nav className="space-y-2 mt-2">
                    {[
                        { id: 'list', label: 'Dashboard', icon: LayoutGrid },
                        { id: 'calendar', label: 'Agenda', icon: Calendar },
                        { id: 'dashboard', label: 'Estatísticas', icon: Activity },
                        { id: 'database', label: 'Database', icon: Database },
                        { id: 'simulados', label: 'Simulados', icon: ClipboardList }
                    ].map((item) => (
                        <button 
                            key={item.id} 
                            onClick={() => setView(item.id as any)} 
                            className={`w-full group flex items-center gap-3.5 px-4 py-3.5 rounded-[16px] transition-all duration-300 relative overflow-hidden ${
                                view === item.id 
                                ? 'bg-white dark:bg-white/10 shadow-sm text-slate-900 dark:text-white font-bold' 
                                : 'text-slate-500 hover:bg-black/5 dark:hover:bg-white/5 font-medium'
                            }`}
                        >
                            <item.icon size={20} className={`${view === item.id ? 'text-blue-600 dark:text-blue-400 stroke-[2.5px]' : 'stroke-[2px]'} transition-colors`}/>
                            <span className="text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <button onClick={() => setSettingsOpen(true)} className="mt-auto flex items-center gap-3 px-4 py-3.5 rounded-[16px] text-sm font-bold text-slate-500 hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                    <Settings size={20} /> Ajustes
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-72 flex flex-col min-h-screen relative">
                {/* Floating Pill Header */}
                <header className="px-6 py-6 sticky top-0 z-50 pointer-events-none safe-top">
                    <div className="pointer-events-auto max-w-[900px] mx-auto h-14 glass-panel rounded-full px-2 py-1.5 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none transition-transform hover:scale-[1.005]">
                        <div className="flex items-center flex-1 pl-4 gap-3 min-w-0">
                            <Search className="text-slate-400 flex-shrink-0" size={18} />
                            <input 
                                type="text" 
                                placeholder="Pesquisar matéria..." 
                                className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 dark:text-slate-200 placeholder-slate-400 min-w-0"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 pr-2 flex-shrink-0">
                            {/* Sync Status Indicator */}
                            {status === 'syncing' && (
                                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest animate-pulse flex items-center gap-1">
                                    <Cloud size={10}/> <span className="hidden sm:inline">Sync...</span>
                                </span>
                            )}
                            {status === 'online' && (
                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                                    <Check size={10}/> <span className="hidden sm:inline">Online</span>
                                </span>
                            )}
                            {status === 'offline' && (
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                    <Cloud size={10} className="text-slate-300"/> <span className="hidden sm:inline">Offline</span>
                                </span>
                            )}
                            
                            <div className="w-px h-4 bg-slate-200 dark:bg-white/10 mx-2"></div>

                            <button onClick={() => setSettingsOpen(true)} className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 lg:hidden transition-colors">
                                <Settings size={20} />
                            </button>
                            <div className="relative">
                                <button 
                                    onClick={() => setDesktopNewMenuOpen(!desktopNewMenuOpen)} 
                                    className="bg-slate-900 dark:bg-white text-white dark:text-black px-5 h-10 rounded-full text-xs font-bold shadow-md flex items-center gap-2 active:scale-95 transition-all hover:brightness-110"
                                >
                                    <Plus size={16} strokeWidth={3}/> <span className="hidden sm:inline">Adicionar</span>
                                </button>
                                {desktopNewMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setDesktopNewMenuOpen(false)}></div>
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-xl border border-black/5 dark:border-white/10 z-[110] p-1.5 overflow-hidden animate-scale-in origin-top-right">
                                            <button onClick={() => { setAddModalOpen(true); setDesktopNewMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/10 rounded-xl flex items-center gap-3 transition-colors text-slate-700 dark:text-slate-200">
                                                <BookOpen size={16} className="text-blue-500"/> Matéria
                                            </button>
                                            <button onClick={() => { setSimuladoModalOpen(true); setEditingSimulado(null); setDesktopNewMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/10 rounded-xl flex items-center gap-3 transition-colors text-slate-700 dark:text-slate-200">
                                                <ClipboardList size={16} className="text-purple-500"/> Simulado
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-4 lg:p-10 pt-0 max-w-[1200px] mx-auto w-full">
                    {view === 'list' && (
                        <HubView 
                            topics={topics} 
                            simulados={simulados}
                            config={config}
                            onReview={(id, idx) => setReviewData({tId: id, rIdx: idx})}
                            onEditTopic={(id) => {
                                const t = topics.find(topic => topic.id === id);
                                if(t) setEditTopic(t);
                            }}
                        >
                            <div className="flex items-center justify-between mt-6 mb-6">
                                <h3 className="font-bold text-2xl text-slate-800 dark:text-white tracking-tight">Painel de Estudos</h3>
                                <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl p-1">
                                    <select 
                                        value={filterArea} 
                                        onChange={(e) => setFilterArea(e.target.value)} 
                                        className="bg-transparent text-slate-600 dark:text-slate-300 py-1.5 px-3 rounded-lg font-bold text-xs outline-none cursor-pointer"
                                    >
                                        <option value="all">Todas as Áreas</option>
                                        {AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            
                            {filteredTopics.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 rounded-[2rem]">
                                    <div className="w-16 h-16 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                        <BookOpen size={24}/>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Comece seus estudos</h4>
                                    <p className="text-sm text-slate-500 mb-6">Adicione matérias para gerar seu cronograma.</p>
                                    <button onClick={() => setAddModalOpen(true)} className="bg-slate-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-bold text-xs hover:scale-105 active:scale-95 transition-all">Criar Matéria</button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {filteredTopics.map(t => (
                                        <TopicCard 
                                            key={t.id} 
                                            topic={t} 
                                            onReview={(id, idx) => setReviewData({tId: id, rIdx: idx})} 
                                            onDelete={handleDeleteTopic} 
                                            onEdit={() => setEditTopic(t)} 
                                        />
                                    ))}
                                </div>
                            )}
                        </HubView>
                    )}
                    {view === 'calendar' && <CalendarView topics={topics} simulados={simulados} onOpenReview={(id, idx) => setReviewData({tId: id, rIdx: idx})} config={config} />}
                    
                    {view === 'dashboard' && (
                        <AnalyticsHub 
                            topics={topics} 
                            simulados={simulados} 
                            config={config} 
                            onEditTopic={(id) => {
                                const t = topics.find(topic => topic.id === id);
                                if(t) setEditTopic(t);
                            }}
                            onEditHistory={(tId, rIdx) => setHistoryEditData({tId, rIdx})}
                        />
                    )}

                    {view === 'database' && (
                        <DatabaseView 
                            topics={topics} 
                            onEdit={(t) => setEditTopic(t)} 
                            onDelete={handleDeleteTopic} 
                        />
                    )}
                    
                    {view === 'simulados' && <SimuladosView simulados={simulados} topics={topics} config={config} onDelete={(id) => setSimulados(p => p.filter(s => s.id !== id))} onEdit={(s) => { setEditingSimulado(s); setSimuladoModalOpen(true); }} />}
                </div>
            </main>

            {/* iOS Mobile Tab Bar */}
            <nav className="lg:hidden fixed bottom-0 left-0 w-full h-[88px] glass-panel border-t border-black/5 dark:border-white/5 pb-[env(safe-area-inset-bottom)] z-[90] flex items-center px-6">
                <div className="flex items-center justify-between w-full max-w-md mx-auto">
                    {[
                        { id: 'list', icon: Home, label: 'Home' },
                        { id: 'calendar', icon: Calendar, label: 'Agenda' },
                        { id: 'dashboard', icon: Activity, label: 'Stats' },
                        { id: 'database', icon: Database, label: 'Data' },
                        { id: 'simulados', icon: ClipboardList, label: 'Provas' }
                    ].map(item => (
                        <button 
                            key={item.id} 
                            onClick={() => { vibration.tick(); setView(item.id as any); }} 
                            className={`flex flex-col items-center justify-center gap-1.5 w-16 transition-all duration-300 ${view === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}
                        >
                            <item.icon size={24} strokeWidth={view === item.id ? 2.5 : 2} className={view === item.id ? "scale-110 transition-transform" : ""} />
                            <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Modals - Clean Implementation via Imports */}
            
            <EditTopicModal 
                isOpen={addModalOpen} 
                onClose={() => setAddModalOpen(false)} 
                topic={null} // Pass null for new
                onSave={handleAddTopic}
                onDelete={() => {}} 
            />

            <EditTopicModal 
                isOpen={!!editTopic} 
                onClose={() => setEditTopic(null)} 
                topic={editTopic} 
                onSave={handleUpdateTopic} 
                onDelete={handleDeleteTopic} 
            />

            <SimuladoModal 
                isOpen={simuladoModalOpen} 
                onClose={() => setSimuladoModalOpen(false)} 
                simulado={editingSimulado} 
                onSave={handleSaveSimulado} 
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
        </div>
    );
}