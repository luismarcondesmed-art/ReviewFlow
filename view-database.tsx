
import React, { useState, useMemo } from 'react';
import { Database, Search, ArrowDown, ChevronDown, ChevronUp, BarChart3, Edit, Trash2, TrendingUp, Target, Brain, CalendarClock, Layers, CheckCircle2, XCircle, Filter, Flame, Plus, Save, X, Calendar, Check, SlidersHorizontal } from 'lucide-react';
import { Topic, Simulado, UserConfig, AreaType, ImportanceType } from './types';
import { AREAS, formatDate, getPerformanceBgLight, getPerformanceColor, getTodayStr, addDays, IMPORTANCE_LEVELS } from './utils';
import { useAnalytics } from './hooks';
import { EvolutionChart } from './components';

// --- Local Component: Inline Database Creator ---
const DatabaseTopicCreator = ({ onAdd, onCancel }: { onAdd: (t: any) => void, onCancel: () => void }) => {
    const [title, setTitle] = useState('');
    const [area, setArea] = useState<AreaType>('clinica');
    const [importance, setImportance] = useState<ImportanceType>('medium');
    const [date, setDate] = useState(getTodayStr());
    
    // Advanced fields
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [intervalsStr, setIntervalsStr] = useState('');
    const [baseQuestions, setBaseQuestions] = useState<number | ''>('');

    const handleAdd = () => {
        if (!title.trim()) return;
        
        let customSettings = undefined;
        if (showAdvanced && (intervalsStr.trim() || baseQuestions)) {
            const intervals = intervalsStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
            const baseQ = typeof baseQuestions === 'number' ? baseQuestions : IMPORTANCE_LEVELS.find(i => i.id === importance)?.baseQ || 20;
            if (intervals.length > 0 || baseQuestions) {
                if (intervals.length > 0) customSettings = { intervals, baseQuestions: baseQ };
            }
        }

        onAdd({ title, area, importance, studyDate: date, customSettings });
        setTitle('');
        setShowAdvanced(false);
        setIntervalsStr('');
        setBaseQuestions('');
    };

    return (
        <div className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5 p-4 animate-slide-up">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                    <input 
                        autoFocus
                        type="text" 
                        placeholder="Título da matéria..." 
                        className="w-full p-2.5 rounded-lg bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-sm font-bold outline-none text-slate-900 dark:text-white"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAdd()}
                    />
                </div>
                <div className="flex gap-2">
                    <div className="relative w-32 sm:w-40">
                        <select 
                            value={area} 
                            onChange={(e) => setArea(e.target.value as AreaType)}
                            className="w-full h-full appearance-none px-3 py-2.5 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
                        >
                            {AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                    <div className="flex bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg p-1">
                        {['low','medium','high'].map((imp) => (
                            <button 
                                key={imp}
                                onClick={() => setImportance(imp as any)}
                                className={`px-2 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${importance === imp ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {imp === 'high' ? 'Alta' : imp === 'medium' ? 'Med' : 'Bai'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            {showAdvanced && (
                <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-200 dark:border-white/5 animate-scale-in">
                    <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Intervalos</label>
                        <input 
                            className="w-full p-2 rounded-lg bg-white dark:bg-black/20 text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-white/10"
                            placeholder="Ex: 1, 7, 30"
                            value={intervalsStr}
                            onChange={e => setIntervalsStr(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Questões</label>
                        <input 
                            type="number"
                            className="w-full p-2 rounded-lg bg-white dark:bg-black/20 text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-white/10"
                            placeholder="Ex: 20"
                            value={baseQuestions}
                            onChange={e => setBaseQuestions(parseInt(e.target.value) || '')}
                        />
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mt-3">
                <button onClick={() => setShowAdvanced(!showAdvanced)} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 hover:text-blue-500">
                    <SlidersHorizontal size={12}/> {showAdvanced ? 'Menos Opções' : 'Configuração do Módulo'}
                </button>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400">Cancelar</button>
                    <button onClick={handleAdd} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-blue-500 transition-colors">Adicionar</button>
                </div>
            </div>
        </div>
    );
};

// --- Helper: Workload Bar Chart ---
const WorkloadChart = ({ data }: { data: { day: string, count: number }[] }) => {
    const max = Math.max(...data.map(d => d.count), 1);
    return (
        <div className="flex items-end justify-between h-full gap-1">
            {data.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group relative">
                    <div 
                        className="w-full bg-blue-500/20 dark:bg-blue-500/40 rounded-t-sm hover:bg-blue-500 transition-colors"
                        style={{ height: `${(d.count / max) * 100}%` }}
                    ></div>
                    <div className="absolute bottom-full mb-1 text-[9px] font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {d.count}q
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- Global Evolution Chart (Topics) ---
const GlobalEvolutionChart = ({ topics, period }: { topics: Topic[], period: '7d'|'30d'|'all' }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const data = useMemo(() => {
        const dailyMap = new Map<string, { correct: number, total: number }>();
        
        const now = new Date();
        let minDate = new Date('2000-01-01');
        if (period === '7d') minDate = new Date(now.getTime() - 7 * 86400000);
        if (period === '30d') minDate = new Date(now.getTime() - 30 * 86400000);
        const minDateStr = minDate.toISOString().split('T')[0];

        topics.forEach(t => {
            if (t.deleted) return;
            t.reviews.forEach(r => {
                if (r.done && r.date >= minDateStr) {
                    const curr = dailyMap.get(r.date) || { correct: 0, total: 0 };
                    curr.correct += r.correct;
                    curr.total += r.total;
                    dailyMap.set(r.date, curr);
                }
            });
        });

        return Array.from(dailyMap.entries())
            .map(([date, stats]) => ({
                date,
                label: formatDate(date),
                acc: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
                total: stats.total
            }))
            .sort((a, b) => a.date.localeCompare(b.date));
    }, [topics, period]);

    if (data.length === 0) return (
        <div className="h-full w-full flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase tracking-wide opacity-50 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-xl">
            Sem dados no período
        </div>
    );

    const getX = (i: number) => data.length <= 1 ? 50 : (i / (data.length - 1)) * 100;
    const getY = (v: number) => 100 - Math.max(10, v); // Margin top/bottom

    let dPath = '';
    if (data.length > 1) {
        dPath = `M ${getX(0)} ${getY(data[0].acc)}`;
        for (let i = 0; i < data.length - 1; i++) {
            const curr = data[i];
            const next = data[i+1];
            const x0 = getX(i);
            const y0 = getY(curr.acc);
            const x1 = getX(i+1);
            const y1 = getY(next.acc);
            
            const cp1x = x0 + (x1 - x0) * 0.5;
            const cp2x = x1 - (x1 - x0) * 0.5;
            dPath += ` C ${cp1x} ${y0}, ${cp2x} ${y1}, ${x1} ${y1}`;
        }
    } else if (data.length === 1) {
        // Point only
        dPath = `M 0 ${getY(data[0].acc)} L 100 ${getY(data[0].acc)}`; // Line across if single point? Or just dot.
    }

    return (
        <div className="w-full h-full relative px-1 py-2">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="globalChartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
                    </linearGradient>
                </defs>
                
                {/* Guides */}
                <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" className="text-emerald-500/20" strokeWidth="0.5" strokeDasharray="2"/>
                <line x1="0" y1="40" x2="100" y2="40" stroke="currentColor" className="text-slate-200 dark:text-white/5" strokeWidth="0.5" strokeDasharray="2"/>

                {data.length > 1 && (
                    <>
                        <path d={`${dPath} L 100 120 L 0 120 Z`} fill="url(#globalChartGradient)" vectorEffect="non-scaling-stroke"/>
                        <path d={dPath} fill="none" stroke="currentColor" className="text-purple-500" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                    </>
                )}
            </svg>
            
            <div className="absolute inset-0 px-1 py-2 pointer-events-none">
                {data.map((d, i) => (
                    <div 
                        key={d.date} 
                        className="absolute w-2 h-2 bg-purple-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm transform -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer hover:scale-150 transition-transform"
                        style={{ left: `${getX(i)}%`, top: `${getY(d.acc)}%` }}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {hoveredIndex === i && (
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded shadow-xl whitespace-nowrap z-50 animate-scale-in">
                                {d.label}: {d.acc}% ({d.total}q)
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Mini Chart Component (Table) ---
export const MiniEvolutionChart = ({ reviews }: { reviews: any[] }) => {
    const data = useMemo(() => {
         return reviews
            .filter(r => r.done)
            .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map(r => ({
                date: r.date,
                label: formatDate(r.date),
                acc: r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0,
            }));
    }, [reviews]);

    if (data.length === 0) return (
        <div className="h-full w-full flex items-center justify-center text-[9px] text-slate-400 font-bold uppercase tracking-wide opacity-50 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-xl">
            Sem dados
        </div>
    );

    const getX = (i: number) => data.length <= 1 ? 50 : (i / (data.length - 1)) * 100;
    const getY = (v: number) => 100 - Math.max(20, v); // Ensure points don't hit bottom edge, min height 20%

    let dPath = '';
    if (data.length > 1) {
        dPath = `M ${getX(0)} ${getY(data[0].acc)}`;
        for (let i = 0; i < data.length - 1; i++) {
            const curr = data[i];
            const next = data[i+1];
            const x0 = getX(i);
            const y0 = getY(curr.acc);
            const x1 = getX(i+1);
            const y1 = getY(next.acc);
            
            const cp1x = x0 + (x1 - x0) * 0.5;
            const cp2x = x1 - (x1 - x0) * 0.5;
            dPath += ` C ${cp1x} ${y0}, ${cp2x} ${y1}, ${x1} ${y1}`;
        }
    }

    return (
        <div className="w-full h-full relative px-3 py-4">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="miniChartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                    </linearGradient>
                </defs>
                
                <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" className="text-emerald-500/30" strokeWidth="0.5" strokeDasharray="3"/>
                
                {data.length > 1 && (
                    <>
                        <path d={`${dPath} L 100 120 L 0 120 Z`} fill="url(#miniChartGradient)" vectorEffect="non-scaling-stroke"/>
                        <path d={dPath} fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                    </>
                )}
            </svg>
            
            <div className="absolute inset-0 px-3 py-4 pointer-events-none">
                {data.map((d, i) => (
                    <div 
                        key={i} 
                        className="absolute w-2 h-2 bg-blue-500 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm transform -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer hover:scale-125 transition-transform"
                        style={{ left: `${getX(i)}%`, top: `${getY(d.acc)}%` }}
                    >
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                            {d.acc}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const DatabaseView = ({ 
    topics, onEdit, onDelete, onUpdateTopic, onAddTopic, 
    simulados, onEditSimulado, onUpdateSimulado, onAddSimulado, onDeleteSimulado, 
    config, searchTerm, activeTab = 'topics', setActiveTab 
}: { 
    topics: Topic[], onEdit?: (t: Topic) => void, onDelete: (id: string) => void, onUpdateTopic: (t: Topic) => void, onAddTopic: (t: any) => void, 
    simulados?: Simulado[], onEditSimulado?: (s: Simulado) => void, onUpdateSimulado?: (s: Simulado) => void, onAddSimulado?: (s: any) => void, onDeleteSimulado?: (id: string) => void, 
    config?: UserConfig, searchTerm?: string, activeTab?: 'topics' | 'simulados', setActiveTab?: (t: 'topics'|'simulados') => void
}) => {
    const [period, setPeriod] = useState<'7d' | '30d' | 'all'>('30d');
    const [filterArea, setFilterArea] = useState('all');
    // Fallback if not controlled by parent
    const [internalActiveTab, setInternalActiveTab] = useState<'topics' | 'simulados'>('topics');
    const effectiveActiveTab = activeTab || internalActiveTab;
    const handleSetActiveTab = setActiveTab || setInternalActiveTab;

    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    
    // Inline Edit State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>(null);
    
    // Simulado Specific Filters
    const [simInstitution, setSimInstitution] = useState('all');
    const [simYear, setSimYear] = useState('all');

    const { institutions, years, groupedData, metrics, filteredSimuladosForChart } = useAnalytics(topics, simulados || [], { 
        period, 
        typeFilter: effectiveActiveTab, 
        areaFilter: filterArea, 
        simInstitution, 
        simYear 
    });

    const startEditing = (item: any) => {
        setEditingId(item.id);
        setEditForm({ ...item });
        // Prevent row expansion when clicking edit
        setExpandedId(null);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditForm(null);
    };

    const saveEditing = () => {
        if (!editForm) return;
        
        if (effectiveActiveTab === 'topics') {
            // Reconstruct Topic object
            const original = topics.find(t => t.id === editingId);
            if (original) {
                onUpdateTopic({ ...original, title: editForm.title, area: editForm.area });
            }
        } else {
            // Reconstruct Simulado object
            const original = simulados?.find(s => s.id === editingId);
            if (original) {
               // Assuming onUpdateSimulado exists
               if(onUpdateSimulado) onUpdateSimulado({ ...original, name: editForm.name || editForm.title, year: editForm.year });
            }
        }
        setEditingId(null);
        setEditForm(null);
    };

    // Workload calc
    const workload = useMemo(() => {
        const today = new Date();
        return Array.from({length: 7}).map((_, i) => {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            const dStr = d.toISOString().split('T')[0];
            let count = 0;
            topics.forEach(t => {
                if (!t.deleted) {
                    t.reviews.forEach(r => {
                        if (!r.done && r.date === dStr) count += r.targetQ;
                    });
                }
            });
            return { day: dStr, count };
        });
    }, [topics]);

    const areaStats = useMemo(() => {
        const map = new Map<string, {c:number, t:number}>();
        topics.forEach(t => {
            if(!t.deleted) {
                t.reviews.filter(r=>r.done).forEach(r => {
                    const curr = map.get(t.area) || {c:0, t:0};
                    curr.c += r.correct;
                    curr.t += r.total;
                    map.set(t.area, curr);
                });
            }
        });
        return Array.from(map.entries()).map(([k,v]) => ({
            area: k,
            acc: v.t > 0 ? Math.round((v.c/v.t)*100) : 0,
            total: v.t
        })).sort((a,b) => b.total - a.total);
    }, [topics]);

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
            {/* Header & Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                <div className="space-y-1">
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
                        <Database size={28} className="text-blue-500"/> Banco de Dados
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Analytics & Registros</p>
                </div>
                <button 
                    onClick={() => setIsCreating(!isCreating)} 
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${isCreating ? 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300' : 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg hover:scale-105 active:scale-95'}`}
                >
                    {isCreating ? <X size={16}/> : <Plus size={16}/>}
                    {isCreating ? 'Fechar' : 'Novo Registro'}
                </button>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col xl:flex-row gap-4 mb-6">
                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl p-1 flex w-fit shrink-0 shadow-sm">
                    {['7d', '30d', 'all'].map(p => (
                        <button 
                            key={p} 
                            onClick={() => setPeriod(p as any)} 
                            className={`px-4 rounded-lg text-[10px] font-bold uppercase transition-all py-2 ${period === p ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-sm' : 'text-slate-500'}`}
                        >
                            {p === 'all' ? 'Todo Período' : p.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="hidden lg:flex p-1 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl w-fit shrink-0 shadow-sm">
                    <button 
                        onClick={() => { handleSetActiveTab('topics'); setIsCreating(false); }}
                        className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${effectiveActiveTab === 'topics' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                    >
                        Matérias
                    </button>
                    <button 
                        onClick={() => { handleSetActiveTab('simulados'); setIsCreating(false); }}
                        className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${effectiveActiveTab === 'simulados' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                    >
                        Simulados
                    </button>
                </div>

                {effectiveActiveTab === 'topics' ? (
                    <div className="relative w-full sm:w-48">
                        <select 
                            value={filterArea} 
                            onChange={(e) => setFilterArea(e.target.value)} 
                            className="w-full h-full pl-4 pr-10 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold outline-none appearance-none cursor-pointer text-slate-800 dark:text-white shadow-sm"
                        >
                            <option value="all">Todas as Áreas</option>
                            {AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                        <ArrowDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                        <div className="relative w-32">
                             <select 
                                value={simInstitution}
                                onChange={(e) => setSimInstitution(e.target.value)}
                                className="w-full bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 outline-none appearance-none pr-4 cursor-pointer"
                            >
                                <option value="all">Instituição</option>
                                {institutions.map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                             <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                        </div>
                        <div className="w-px h-3 bg-slate-200 dark:bg-white/10"></div>
                         <div className="relative w-24">
                             <select 
                                value={simYear}
                                onChange={(e) => setSimYear(e.target.value)}
                                className="w-full bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 outline-none appearance-none pr-4 cursor-pointer"
                            >
                                <option value="all">Ano</option>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                             <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                        </div>
                    </div>
                )}
            </div>

            {/* --- VISUAL ANALYTICS SECTION --- */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                {/* ... (Metrics Cards - same as before) ... */}
                <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col justify-between h-28">
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                            <Brain size={14} className="text-blue-500"/>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Questões</span>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">{metrics.total.toLocaleString()}</span>
                            <div className="text-[10px] font-medium text-slate-500 mt-1">Total Realizado</div>
                        </div>
                    </div>
                    {/* ... other cards ... */}
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col justify-between h-28">
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                            <Target size={14} className={getPerformanceColor(metrics.acc, 80, 'text')}/>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Precisão</span>
                        </div>
                        <div>
                            <span className={`text-3xl font-black ${getPerformanceColor(metrics.acc, 80, 'text')}`}>{metrics.acc}%</span>
                            <div className="text-[10px] font-medium text-slate-500 mt-1">Taxa de Acerto</div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col justify-between h-28">
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                            <CheckCircle2 size={14} className="text-emerald-500"/>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Hits</span>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-emerald-500">{metrics.correct}</span>
                            <div className="text-[10px] font-medium text-slate-500 mt-1">Acertos</div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col justify-between h-28">
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                            <XCircle size={14} className="text-red-500"/>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Misses</span>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-red-500">{metrics.wrong}</span>
                            <div className="text-[10px] font-medium text-slate-500 mt-1">Erros</div>
                        </div>
                    </div>

                    <div className="col-span-2 sm:col-span-2 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm relative overflow-hidden h-36">
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="flex items-center gap-2 text-slate-400">
                                <TrendingUp size={14} className="text-purple-500"/>
                                <span className="text-[10px] font-bold uppercase tracking-wider">Evolução ({period})</span>
                            </div>
                        </div>
                        <div className="h-20 w-full relative z-10">
                            {effectiveActiveTab === 'simulados' ? (
                                <EvolutionChart simulados={filteredSimuladosForChart} targetAccuracy={config?.targetAccuracy || 80} />
                            ) : (
                                <GlobalEvolutionChart topics={topics} period={period} />
                            )}
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>
                    </div>

                    <div className="col-span-2 sm:col-span-2 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm h-36 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-400">
                                <CalendarClock size={14} className="text-blue-500"/>
                                <span className="text-[10px] font-bold uppercase tracking-wider">Previsão (7 dias)</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500">{workload.reduce((a,b) => a+b.count,0)} questões</span>
                        </div>
                        <div className="h-20 w-full pt-2">
                            <WorkloadChart data={workload} />
                        </div>
                    </div>
                </div>

                {/* Area Breakdown Side Panel */}
                <div className="md:col-span-4 bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col h-full min-h-[200px]">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Layers size={14} className="text-amber-500"/>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Desempenho por Área</span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-5 pr-2">
                        {areaStats.map(area => (
                            <div key={area.area} className="space-y-1.5">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-700 dark:text-white uppercase text-[10px] tracking-wide">{area.area}</span>
                                    <div className="flex gap-2">
                                        <span className="font-bold text-slate-500 text-[10px]">{area.total}q</span>
                                        <span className={`font-black text-[10px] ${getPerformanceColor(area.acc, 80, 'text')}`}>{area.acc}%</span>
                                    </div>
                                </div>
                                <div className="flex h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${getPerformanceColor(area.acc, 80, 'bg')}`} 
                                        style={{width: `${area.acc}%`}}
                                    ></div>
                                </div>
                            </div>
                        ))}
                        {areaStats.length === 0 && (
                            <div className="text-center text-xs text-slate-500 py-4">Nenhum dado registrado.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- DATA TABLE SECTION --- */}
            <div className="flex-1 bg-white dark:bg-[#0d0d0d] rounded-[24px] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#18181b] flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2">
                        {effectiveActiveTab === 'topics' ? 'Lista de Matérias' : 'Lista de Simulados'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest pr-2">{groupedData.length} registros</span>
                </div>
                
                {isCreating && effectiveActiveTab === 'topics' && (
                    <DatabaseTopicCreator 
                        onAdd={(t) => { onAddTopic(t); setIsCreating(false); }}
                        onCancel={() => setIsCreating(false)}
                    />
                )}
                
                {/* Simulado Creator Dropdown placeholder - reuse structure if needed or implement specific one */}
                {isCreating && effectiveActiveTab === 'simulados' && onAddSimulado && (
                     <div className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5 p-4 animate-slide-up">
                        {/* Simplified Simulado Form */}
                        <div className="text-center text-xs text-slate-400 font-bold mb-2">Adicionar Simulado Rápido</div>
                        {/* For simplicity in Database View, we might redirect or show a simple form. Using alert for now or basic implementation */}
                        <button onClick={() => { if(onEditSimulado) { onEditSimulado({} as any); setIsCreating(false); } }} className="w-full py-2 bg-purple-600 text-white rounded-lg text-xs font-bold">Abrir Editor Completo de Simulado</button>
                        <button onClick={() => setIsCreating(false)} className="w-full py-2 text-xs text-slate-500 mt-2">Cancelar</button>
                     </div>
                )}

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/80 dark:bg-[#18181b]/50 sticky top-0 backdrop-blur-sm z-10 border-b border-slate-100 dark:border-white/5">
                            <tr>
                                <th className="p-4 sm:p-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{effectiveActiveTab === 'topics' ? 'Matéria' : 'Instituição'}</th>
                                <th className="p-4 sm:p-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:table-cell">{effectiveActiveTab === 'topics' ? 'Área' : 'Ano'}</th>
                                <th className="p-4 sm:p-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">{effectiveActiveTab === 'topics' ? 'Prog.' : 'Data'}</th>
                                <th className="p-4 sm:p-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Nota</th>
                                <th className="p-4 sm:p-5 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {groupedData.length === 0 ? (
                                <tr><td colSpan={5} className="p-12 text-center text-slate-500 text-xs font-bold">Nenhum registro encontrado para os filtros selecionados.</td></tr>
                            ) : groupedData.map(item => {
                                const isExpanded = expandedId === item.id;
                                const isEditing = editingId === item.id;
                                const acc = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
                                const performanceBg = getPerformanceBgLight(acc, config?.targetAccuracy || 80);
                                
                                const originalTopic = effectiveActiveTab === 'topics' ? topics.find(t => t.id === item.id) : null;
                                const originalSimulado = effectiveActiveTab === 'simulados' ? simulados?.find(s => s.id === item.id) : null;

                                if (isEditing) {
                                    return (
                                        <tr key={item.id} className="bg-blue-50/30 dark:bg-blue-900/10">
                                            <td className="p-3">
                                                <input 
                                                    autoFocus
                                                    className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-2 py-1 text-sm font-bold text-slate-800 dark:text-white"
                                                    value={editForm.title || editForm.name}
                                                    onChange={e => setEditForm({ ...editForm, [effectiveActiveTab === 'topics' ? 'title' : 'name']: e.target.value })}
                                                />
                                            </td>
                                            <td className="p-3 hidden sm:table-cell">
                                                {effectiveActiveTab === 'topics' ? (
                                                    <select 
                                                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-2 py-1 text-xs font-bold"
                                                        value={editForm.area}
                                                        onChange={e => setEditForm({ ...editForm, area: e.target.value })}
                                                    >
                                                        {AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                                    </select>
                                                ) : (
                                                    <input 
                                                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-2 py-1 text-xs font-bold"
                                                        value={editForm.year}
                                                        onChange={e => setEditForm({ ...editForm, year: e.target.value })}
                                                    />
                                                )}
                                            </td>
                                            <td className="p-3" colSpan={2}>
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={cancelEditing} className="px-3 py-1 text-xs font-bold text-slate-500 bg-white dark:bg-white/5 rounded border border-slate-200 dark:border-white/10">Cancelar</button>
                                                    <button onClick={saveEditing} className="px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded shadow-sm hover:bg-blue-500">Salvar</button>
                                                </div>
                                            </td>
                                            <td className="p-3"></td>
                                        </tr>
                                    );
                                }

                                return (
                                    <React.Fragment key={item.id}>
                                        <tr onClick={() => setExpandedId(isExpanded ? null : item.id)} className={`group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${isExpanded ? 'bg-slate-50 dark:bg-white/5' : ''}`}>
                                            <td className="p-4 sm:p-5 font-bold text-sm text-slate-800 dark:text-white line-clamp-2 sm:line-clamp-1">{item.title}</td>
                                            <td className="p-4 sm:p-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase hidden sm:table-cell">{item.area}</td>
                                            <td className="p-4 sm:p-5">
                                                {effectiveActiveTab === 'topics' ? (
                                                    <div className="flex items-center justify-center gap-1 sm:gap-3">
                                                        <div className="w-10 sm:w-20 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                                            <div className="h-full bg-blue-600" style={{width: `${Math.min(100, (item.reviews?.length || 0) * 20)}%`}}></div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-center text-xs font-bold text-slate-400">{formatDate(item.lastDate)}</div>
                                                )}
                                            </td>
                                            <td className="p-4 sm:p-5">
                                                <div className="flex items-center justify-center">
                                                    <div className={`px-2 py-1 rounded-md text-[10px] font-black ${performanceBg}`}>
                                                        {acc}%
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 sm:p-5 text-right">
                                                <div className="text-slate-500">{isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</div>
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr className="bg-slate-50 dark:bg-black/40 animate-fade-in border-b border-slate-200 dark:border-white/5">
                                                <td colSpan={5} className="p-0">
                                                    <div className="p-4 sm:p-6 flex flex-col gap-6">
                                                        
                                                        {effectiveActiveTab === 'topics' && originalTopic ? (
                                                            <>
                                                                <div className="flex flex-col sm:flex-row gap-4">
                                                                    <div className="w-full h-48 sm:flex-1 bg-white dark:bg-[#18181b] rounded-xl border border-slate-200 dark:border-white/5 p-4 relative overflow-hidden flex flex-col min-w-0">
                                                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                                            <BarChart3 size={12}/> Histórico de Revisões
                                                                        </div>
                                                                        <div className="flex-1 w-full relative min-h-0">
                                                                            <MiniEvolutionChart reviews={originalTopic.reviews} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-full sm:w-48 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-500/20 p-4 flex flex-col justify-center items-center gap-1 shrink-0">
                                                                        <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                                                                            {item.correct} <span className="text-sm font-bold opacity-60 text-slate-500">/ {item.total}</span>
                                                                        </div>
                                                                        <span className="text-[9px] font-bold uppercase tracking-wide text-emerald-600/60 dark:text-emerald-400/60 text-center">Questões Acertadas</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-end gap-3 pt-2 border-t border-slate-200 dark:border-white/5">
                                                                    <button onClick={(e) => { e.stopPropagation(); startEditing(item); }} className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                                        <Edit size={14}/> Editar
                                                                    </button>
                                                                    <button onClick={(e) => { e.stopPropagation(); onDelete(originalTopic.id); }} className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                                                                        <Trash2 size={14}/> Excluir
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : effectiveActiveTab === 'simulados' && originalSimulado ? (
                                                            <>
                                                                <div className="flex flex-col gap-3">
                                                                    <div className="flex flex-wrap gap-2">
                                                                        <span className="text-[10px] font-bold text-slate-500 uppercase mr-2">Temas com Dificuldade:</span>
                                                                        {originalSimulado.difficultyTopics && originalSimulado.difficultyTopics.length > 0 ? (
                                                                            originalSimulado.difficultyTopics.map(tid => {
                                                                                const t = topics.find(tp => tp.id === tid);
                                                                                return t ? <span key={tid} className="px-2 py-1 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-300">{t.title}</span> : null;
                                                                            })
                                                                        ) : (
                                                                            <span className="text-[10px] text-slate-500 italic">Nenhum tema marcado.</span>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex justify-end gap-3 pt-2 border-t border-slate-200 dark:border-white/5">
                                                                        <button onClick={(e) => { e.stopPropagation(); startEditing(item); }} className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                                            <Edit size={14}/> Editar
                                                                        </button>
                                                                        <button onClick={(e) => { e.stopPropagation(); if(onDeleteSimulado) onDeleteSimulado(originalSimulado.id); }} className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                                                                            <Trash2 size={14}/> Excluir
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : null}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
