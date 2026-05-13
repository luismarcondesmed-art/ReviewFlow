
import React, { useMemo, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Clock, Activity, Flame, CheckCircle2, ChevronRight, Sun, ArrowUpDown, Filter, PlayCircle, Plus, BarChart2, ChevronDown, ChevronUp, Lightbulb, BookOpen, ClipboardList, AlertCircle, Calendar, X, LayoutGrid, BrainCircuit
} from 'lucide-react';
import { Topic, Simulado, UserConfig } from '../types';
import { getTodayStr, getAreaTheme, formatDate, getPerformanceBgLight, getPerformanceColor, AREAS, getPriorityInfo } from '../utils';
import { SmartSuggestions, HeatmapWidget, SimuladosMiniWidget, TopicCard, DetailedStatsWidget, FutureLoadWidget, RetentionWidget, AreaStatsWidget, getAreaIcon, WeeklyGoalsWidget } from '../components';
import { Modal, TodoModal, DailyTodoContent, DeepFocusModal } from '../modals';

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

    const startQuickSession = () => {
        if (dueItems.length > 0) {
            onReview(dueItems[0].topic.id, dueItems[0].idx);
        }
    };

    const handlePendingClick = (e: React.MouseEvent) => {
        setIsPendingExpanded(!isPendingExpanded);
    };

    return (
        <div ref={containerRef} className="flex flex-col gap-6 h-full pb-32 lg:pb-0 animate-scale-in max-w-6xl mx-auto w-full relative">
            <motion.div className="pt-2">
                <div className="flex flex-col gap-6 animate-fade-in">
                        {/* HERO: Para fazer hoje */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-100 dark:border-blue-800/30 rounded-[32px] p-6 shadow-sm relative overflow-hidden">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="relative z-10">
                                    <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-200 tracking-tight mb-1">
                                        {dueItems.length > 0 ? 'Pronto para estudar?' : 'Tudo em dia!'}
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                                        {dueItems.length > 0 ? (
                                            <>Você tem <button onClick={handlePendingClick} className="font-bold text-slate-800 dark:text-slate-200 lg:hover:text-slate-600 dark:lg:hover:text-slate-300 active:text-slate-600 dark:active:text-slate-300 underline decoration-slate-800/30 dark:decoration-white/30 underline-offset-4 transition-colors flex items-center gap-1 inline-flex">{dueItems.length} revisões ({dueItems.reduce((acc, item) => acc + (item.targetQ || 0), 0)} questões) <ChevronDown size={14} className={`transition-transform ${isPendingExpanded ? 'rotate-180' : ''}`} /></button> pendentes hoje.</>
                                        ) : (
                                            <>Nenhuma revisão pendente. Aproveite para descansar ou adiantar temas.</>
                                        )}
                                    </p>
                                </div>
                                
                                {dueItems.length > 0 && (
                                    <div className="relative z-10 flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                                        <motion.button 
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setDeepFocusOpen(true)}
                                            className="bg-white/80 dark:bg-black/20 border-2 border-blue-100 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 lg:hover:bg-blue-50 dark:lg:hover:bg-white/5 px-4 py-2.5 md:px-5 md:py-3 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
                                        >
                                            <BrainCircuit size={18} />
                                            Deep Focus
                                        </motion.button>
                                        <motion.button 
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={startQuickSession} 
                                            className="bg-blue-600 dark:bg-blue-500 text-white lg:hover:bg-blue-700 dark:lg:hover:bg-blue-600 shadow-md shadow-blue-500/20 px-4 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors w-auto text-sm md:text-base"
                                        >
                                            <PlayCircle size={18} fill="currentColor" className="text-white" />
                                            Revisão Rápida
                                        </motion.button>
                                    </div>
                                )}
                            </div>
                            
                            {/* Inline Dropdown for Pending Reviews */}
                            {isPendingExpanded && dueItems.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        <AnimatePresence>
                                        {dueItems.map((item: any, i: number) => {
                                            const theme = getAreaTheme(item.topic.area);
                                            const isOverdue = item.date < today;
                                            const reviewObj = item.topic.reviews[item.idx];
                                            const numQuestions = reviewObj?.targetQ || 0;
                                            
                                            return (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    key={`${item.topic.id}-${item.idx}`} 
                                                    className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white dark:hover:bg-white/10 hover:shadow-sm hover:border-slate-300 dark:hover:border-white/20 transition-all" 
                                                    onClick={() => onReview(item.topic.id, item.idx)}
                                                >
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-sm shrink-0 ${theme.bg} ${theme.text}`}>
                                                            {isOverdue ? <AlertCircle size={14} className="animate-pulse"/> : <Calendar size={14}/>}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">{item.topic.title}</h4>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                <span className={`text-[9px] font-bold uppercase px-1 py-0.5 rounded leading-none ${isOverdue ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-300'}`}>
                                                                    {isOverdue ? 'Atrasado' : 'Hoje'}
                                                                </span>
                                                                <span className="text-[9px] text-slate-500 font-bold">{item.label.split(':')[0]}</span>
                                                                {numQuestions > 0 && (
                                                                    <span className="text-[9px] text-slate-500 font-bold flex items-center gap-1"><BookOpen size={10}/> {numQuestions}q</span>
                                                                )}
                                                            </div>
                                                            {item.topic.linkedLessons && item.topic.linkedLessons.length > 0 && (
                                                                <div className="mt-1 flex flex-wrap gap-1">
                                                                    {item.topic.linkedLessons.map((lesson: string, lIdx: number) => (
                                                                        <span key={lIdx} className="text-[8px] font-medium text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-white/5 px-1.5 py-0.5 rounded truncate max-w-[100px]">
                                                                            {lesson.replace(/ \(~\d+q\)$/, '')}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button className="p-2 bg-white dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg shadow-sm transition-colors shrink-0">
                                                        <PlayCircle size={16}/>
                                                    </button>
                                                </motion.div>
                                            );
                                        })}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )}
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

            <DeepFocusModal 
                isOpen={deepFocusOpen} 
                onClose={() => setDeepFocusOpen(false)} 
                dueItems={dueItems} 
                onReview={onReview} 
            />
        </div>
    );
};
