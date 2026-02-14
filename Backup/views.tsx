import React, { useState } from 'react';
import { 
    Clock, CheckCircle2, ChevronRight, CalendarCheck, 
    ChevronLeft, Activity, Flame, ClipboardList, BookOpen,
    Sun, Database, ChevronDown, GraduationCap, X, Calendar as CalendarIcon, AlignJustify, ArrowDown,
    Edit, Trash2, Flag, Plus, Search, Filter
} from 'lucide-react';
import { Simulado, Topic, UserConfig } from './types';
import { getTodayStr, AREAS, formatDate, formatFullDate, getAreaTheme, getPerformanceBgLight, getPerformanceColor } from './utils';
import { SmartSuggestions, HeatmapWidget, EvolutionChart, SimuladosMiniWidget, TopicCard } from './components';
import { useAnalytics, useCalendar } from './hooks';

export const HubView = ({ topics, simulados, config, onReview, onEditTopic, children }: { topics: Topic[], simulados: Simulado[], config: UserConfig, onReview: (id: string, idx: number) => void, onEditTopic: (id: string) => void, children?: React.ReactNode }) => {
    const today = getTodayStr();
    
    // Stats calculation can stay here as it's specific to this dashboard view
    const stats = React.useMemo(() => {
        const active = topics.filter(t => !t.deleted);
        const due = active.filter(t => t.reviews.some(r => !r.done && r.date <= today)).length;
        const totalQ = active.reduce((acc, t) => acc + t.reviews.filter(r => r.done).reduce((s, r) => s + r.total, 0), 0) + simulados.reduce((acc,s) => acc + (s.totalQuestions || 0), 0);
        
        let daysToExam = 0;
        if (config.examDate) {
            const diff = new Date(config.examDate + 'T12:00:00').getTime() - new Date(today + 'T12:00:00').getTime();
            daysToExam = Math.ceil(diff / (1000 * 60 * 60 * 24));
        }

        return { due, totalQ, daysToExam };
    }, [topics, simulados, today, config.examDate]);

    return (
        <div className="flex flex-col gap-8 h-full pb-32 lg:pb-0">
            <div className="hidden lg:grid grid-cols-12 gap-8 h-full">
                <div className="col-span-8 flex flex-col gap-8">
                    {/* Header with Exam Date */}
                    {config.examDate && (
                         <div className="bg-slate-900 dark:bg-white text-white dark:text-black rounded-[20px] p-4 flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 dark:bg-black/10 rounded-xl">
                                    <Flag size={20}/>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Data da Prova</div>
                                    <div className="text-sm font-black">{formatFullDate(config.examDate)}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black leading-none">{stats.daysToExam}</div>
                                <div className="text-[10px] font-bold uppercase tracking-wide opacity-60">Dias Restantes</div>
                            </div>
                         </div>
                    )}

                    <div className="grid grid-cols-2 gap-6 h-40">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-8 rounded-[32px] shadow-lg shadow-blue-500/30 relative overflow-hidden flex flex-col justify-between group cursor-default">
                            <div className="absolute right-[-20px] bottom-[-30px] opacity-10 transform -rotate-12 group-hover:scale-110 transition-transform duration-700"><Clock size={140}/></div>
                            <div className="relative z-10 space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Revisões Hoje</span>
                                <div className="text-5xl font-black tracking-tight">{stats.due}</div>
                            </div>
                            <div className="relative z-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide opacity-90 bg-white/20 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                                <Flame size={12} fill="currentColor"/> {stats.due > 0 ? 'Mantenha o ritmo' : 'Tudo feito!'}
                            </div>
                        </div>
                        <div className="glass-panel p-8 rounded-[32px] shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                            <div className="absolute right-[-10px] bottom-[-10px] text-slate-100 dark:text-white/5 transform -rotate-12 group-hover:scale-110 transition-transform duration-700"><CheckCircle2 size={120}/></div>
                            <div className="relative z-10 space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Questões Totais</span>
                                <div className="text-5xl font-black text-slate-800 dark:text-white tracking-tight">{stats.totalQ}</div>
                            </div>
                            <div className="relative z-10 h-1.5 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-3/4 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 px-2">
                            <Sun size={16} className="text-amber-500"/> Foco Recomendado
                        </h3>
                        <SmartSuggestions topics={topics} onReview={onReview} />
                    </div>
                    <div className="flex-1 min-h-0 flex flex-col">{children}</div>
                </div>

                <div className="col-span-4 flex flex-col gap-6">
                    <div className="glass-panel rounded-[32px] p-6 shadow-sm flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 self-start relative z-10"><Flame size={16} className="text-orange-500"/> Constância</h4>
                        <div className="relative z-10"><HeatmapWidget topics={topics} simulados={simulados} /></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                    </div>
                    
                    <div className="h-56"><SimuladosMiniWidget simulados={simulados} targetAccuracy={config.targetAccuracy} /></div>

                    <div className="glass-panel rounded-[32px] p-6 shadow-sm flex-1 overflow-hidden flex flex-col min-h-[300px]">
                        <h4 className="font-bold text-xs text-slate-800 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2"><Activity size={14} className="text-blue-500"/> Feed de Estudos</h4>
                        <div className="overflow-y-auto custom-scrollbar flex-1 pr-1 space-y-2">
                            {(() => {
                                const recents = [];
                                topics.forEach(t => t.reviews.forEach(r => { if(r.done) recents.push({ ...r, title: t.title, k: t.id + r.date + r.type, id: t.id }); }));
                                recents.sort((a,b) => b.date.localeCompare(a.date));
                                const display = recents.slice(0, 15);
                                if (display.length === 0) return <div className="text-[10px] text-slate-400 text-center py-10 font-bold uppercase tracking-wide">Sem atividades recentes</div>;
                                return display.map((r, i) => {
                                    const acc = r.correct/r.total * 100;
                                    const pillClass = getPerformanceBgLight(acc, config.targetAccuracy);
                                    
                                    return (
                                        <div onClick={() => onEditTopic(r.id)} key={r.k} className="cursor-pointer flex justify-between items-center p-3 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 rounded-[18px] transition-all group border border-transparent hover:border-black/5 dark:hover:border-white/5">
                                            <div className="flex flex-col min-w-0 pr-3">
                                                <span className="truncate font-bold text-xs text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">{r.title}</span>
                                                <span className="text-slate-400 text-[9px] font-bold mt-0.5">{formatDate(r.date)} • {r.label.split(':')[0]}</span>
                                            </div>
                                            <div className={`font-bold px-2.5 py-1 rounded-lg text-[10px] ${pillClass}`}>
                                                {Math.round(acc)}%
                                            </div>
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden flex flex-col gap-6 px-1">
                {config.examDate && (
                     <div className="bg-slate-900 dark:bg-white text-white dark:text-black rounded-[20px] p-5 flex items-center justify-between shadow-lg">
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Data da Prova</div>
                            <div className="text-sm font-black">{formatFullDate(config.examDate)}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-black leading-none">{stats.daysToExam}</div>
                            <div className="text-[10px] font-bold uppercase tracking-wide opacity-60">Dias</div>
                        </div>
                     </div>
                )}
                <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-[28px] border border-black/5 shadow-sm">
                    <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400">
                        <Clock size={28} strokeWidth={2.5}/>
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Resumo do Dia</h2>
                        <p className="text-xs font-bold text-slate-500">{stats.due} tópicos para revisar hoje</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Sugestões</h3>
                    <SmartSuggestions topics={topics} onReview={onReview} />
                </div>
                
                {children}
            </div>
        </div>
    );
};

export const DatabaseView = ({ topics, onEdit, onDelete }: { topics: Topic[], onEdit: (t: Topic) => void, onDelete: (id: string) => void }) => {
    const [search, setSearch] = useState('');
    const [filterArea, setFilterArea] = useState('all');

    const filtered = topics.filter(t => !t.deleted).filter(t => {
        if (filterArea !== 'all' && t.area !== filterArea) return false;
        if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    }).sort((a,b) => a.title.localeCompare(b.title));

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <div className="space-y-1">
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3"><Database size={28} className="text-blue-500"/> Banco de Dados</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gerencie suas matérias</p>
                </div>
            </div>

            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                    <input 
                        type="text" 
                        placeholder="Buscar matéria..." 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl text-sm font-bold outline-none"
                    />
                </div>
                <div className="relative w-48">
                    <select 
                        value={filterArea} 
                        onChange={(e) => setFilterArea(e.target.value)} 
                        className="w-full h-full pl-4 pr-10 py-3 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl text-sm font-bold outline-none appearance-none cursor-pointer"
                    >
                        <option value="all">Todas as Áreas</option>
                        {AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                    <ArrowDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                </div>
            </div>

            <div className="flex-1 bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-black/20 sticky top-0 backdrop-blur-sm z-10">
                            <tr>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Matéria</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Área</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Progresso</th>
                                <th className="p-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {filtered.length === 0 ? (
                                <tr><td colSpan={4} className="p-8 text-center text-slate-400 text-xs font-bold">Nenhum registro encontrado.</td></tr>
                            ) : filtered.map(t => {
                                const completed = t.reviews.filter(r => r.done).length;
                                const total = t.reviews.length;
                                const percentage = Math.round((completed/total)*100);
                                
                                return (
                                    <tr key={t.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-bold text-sm text-slate-800 dark:text-white">{t.title}</td>
                                        <td className="p-4 text-xs font-bold text-slate-500 uppercase">{t.area}</td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-24 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500" style={{width: `${percentage}%`}}></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400">{percentage}%</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => onEdit(t)} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg text-slate-400 hover:text-blue-500 transition-colors"><Edit size={16}/></button>
                                                <button onClick={() => onDelete(t.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export const AnalyticsHub = ({ topics, simulados, config, onEditTopic, onEditHistory }: { topics: Topic[], simulados: Simulado[], config: UserConfig, onEditTopic: (id: string) => void, onEditHistory: (topicId: string, idx: number) => void }) => {
    const [period, setPeriod] = useState<'7d' | '30d' | 'all'>('30d');
    const [areaFilter, setAreaFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<'all' | 'topics' | 'simulados'>('all');
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
    const [simInstitution, setSimInstitution] = useState<string>('all');
    const [simYear, setSimYear] = useState<string>('all');

    // Use Custom Hook for Heavy Lifting
    const { institutions, years, groupedData, metrics, filteredSimuladosForChart } = useAnalytics(topics, simulados, { period, typeFilter, areaFilter, simInstitution, simYear });

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
             <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
                <div className="space-y-1">
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3"><Activity size={28} className="text-blue-500"/> Estatísticas</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Analytics & Performance</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
                <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl p-1 flex w-fit">
                    {['7d', '30d', 'all'].map(p => (
                        <button 
                            key={p} 
                            onClick={() => setPeriod(p as any)} 
                            className={`px-4 rounded-lg text-[10px] font-bold uppercase transition-all py-2 ${period === p ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-sm' : 'text-slate-500'}`}
                        >
                            {p === 'all' ? 'Tudo' : p.toUpperCase()}
                        </button>
                    ))}
                </div>
                
                <div className="relative w-36">
                    <select 
                        value={typeFilter}
                        onChange={(e) => { setTypeFilter(e.target.value as any); setAreaFilter('all'); setSimInstitution('all'); setSimYear('all'); }}
                        className="w-full h-full bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl px-4 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none appearance-none"
                    >
                        <option value="all">Tudo</option>
                        <option value="topics">Matérias</option>
                        <option value="simulados">Simulados</option>
                    </select>
                    <ArrowDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                </div>

                {typeFilter === 'topics' && (
                    <div className="relative w-40 animate-scale-in">
                        <select 
                            value={areaFilter} 
                            onChange={(e) => { setAreaFilter(e.target.value); }} 
                            className="w-full h-full bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl px-4 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none appearance-none"
                        >
                            <option value="all">Todas as Áreas</option>
                            {AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                        <ArrowDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                )}
            </div>

            {typeFilter === 'simulados' && (
                <div className="flex flex-wrap gap-3 mb-8 transition-all animate-scale-in">
                    <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/10 px-3 py-1.5 rounded-lg border border-purple-100 dark:border-purple-500/20">
                        <span className="text-[10px] font-bold text-purple-600 uppercase">Filtros de Simulado:</span>
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
                        <div className="w-px h-3 bg-purple-200 dark:bg-purple-800"></div>
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
                        {(simInstitution !== 'all' || simYear !== 'all') && (
                            <button onClick={() => { setSimInstitution('all'); setSimYear('all'); }} className="ml-2 text-slate-400 hover:text-red-500"><X size={12}/></button>
                        )}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="glass-panel rounded-[32px] p-6 shadow-sm flex flex-col justify-between items-center h-64 relative overflow-hidden">
                    <div className="w-full flex items-center justify-between mb-2 z-10">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2"><Flame size={16} className="text-orange-500"/> Atividade Recente</h4>
                    </div>
                    <div className="flex-1 flex items-center justify-center w-full z-10">
                        <HeatmapWidget topics={topics} simulados={simulados} />
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                </div>
                
                <div className="glass-panel rounded-[32px] p-6 shadow-sm flex flex-col h-64 relative overflow-visible">
                    <div className="w-full flex items-center justify-between mb-2 z-10">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2"><GraduationCap size={16} className="text-purple-500"/> Evolução nos Simulados</h4>
                    </div>
                    <div className="flex-1 w-full relative z-10">
                        <div className="absolute inset-0">
                            <EvolutionChart simulados={filteredSimuladosForChart} targetAccuracy={config.targetAccuracy} />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm">
                    <div className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-2">Aproveitamento</div>
                    <div className={`text-4xl font-black ${getPerformanceColor(metrics.acc, config.targetAccuracy, 'text')}`}>{metrics.acc}%</div>
                </div>
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm">
                    <div className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-2">Questões Feitas</div>
                    <div className="text-4xl font-black text-slate-800 dark:text-white">{metrics.total}</div>
                </div>
                <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-[24px] border border-emerald-100 dark:border-emerald-500/10 shadow-sm">
                    <div className="text-emerald-600/60 dark:text-emerald-400/60 text-[9px] font-bold uppercase tracking-widest mb-2">Acertos</div>
                    <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400">{metrics.correct}</div>
                </div>
                <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-[24px] border border-red-100 dark:border-red-500/10 shadow-sm">
                    <div className="text-red-600/60 dark:text-red-400/60 text-[9px] font-bold uppercase tracking-widest mb-2">Erros</div>
                    <div className="text-4xl font-black text-red-600 dark:text-red-400">{metrics.wrong}</div>
                </div>
            </div>
        </div>
    );
};

export const CalendarView = ({ topics, simulados, onOpenReview, config }: { topics: Topic[], simulados: Simulado[], onOpenReview: (id: string, idx: number) => void, config: UserConfig }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
    const [selectedDay, setSelectedDay] = useState<{ date: string, reviews: any[], sims: any[] } | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const { monthData, daysInMonth, firstDay, timelineDays } = useCalendar(topics, simulados, currentDate);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const handleToday = () => setCurrentDate(new Date());

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                     <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3"><CalendarCheck size={28} className="text-blue-500"/> Agenda</h3>
                     <div className="flex bg-slate-100 dark:bg-white/10 p-1 rounded-lg">
                        <button onClick={() => setViewMode('calendar')} className={`p-1.5 rounded-md transition-all ${viewMode === 'calendar' ? 'bg-white dark:bg-zinc-800 shadow-sm text-blue-500' : 'text-slate-400'}`}><CalendarIcon size={16}/></button>
                        <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-zinc-800 shadow-sm text-blue-500' : 'text-slate-400'}`}><AlignJustify size={16}/></button>
                     </div>
                </div>
                
                {viewMode === 'calendar' && (
                    <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-1 rounded-xl border border-black/5 dark:border-white/10 shadow-sm self-start sm:self-auto">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg"><ChevronLeft size={16}/></button>
                        <button onClick={handleToday} className="px-4 py-2 text-xs font-bold uppercase hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg whitespace-nowrap">{new Date(year, month).toLocaleString('default', { month: 'long' })} {year}</button>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg"><ChevronRight size={16}/></button>
                    </div>
                )}
            </div>

            {viewMode === 'calendar' ? (
                <div className="flex-1 bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
                    <div className="grid grid-cols-7 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                            <div key={d} className="py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d}</div>
                        ))}
                    </div>
                    <div className="flex-1 grid grid-cols-7 grid-rows-6">
                        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className="border-b border-r border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/[0.02]"></div>)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const d = new Date(year, month, day);
                            const y = d.getFullYear();
                            const m = String(d.getMonth() + 1).padStart(2, '0');
                            const dd = String(d.getDate()).padStart(2, '0');
                            const dateStr = `${y}-${m}-${dd}`;

                            const dayData = monthData[dateStr] || { reviews: [], sims: [] };
                            const isToday = dateStr === getTodayStr();
                            const isExamDay = dateStr === config.examDate;
                            const hasContent = dayData.reviews.length > 0 || dayData.sims.length > 0;

                            return (
                                <div 
                                    key={day} 
                                    onClick={() => hasContent && setSelectedDay({ date: dateStr, ...dayData })}
                                    className={`border-b border-r border-slate-100 dark:border-white/5 p-2 relative group transition-colors ${hasContent ? 'cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-900/10' : ''} ${isToday ? 'bg-blue-50/30 dark:bg-blue-900/5' : ''} ${isExamDay ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className={`text-xs font-bold flex items-center justify-center w-6 h-6 rounded-full mb-1 ${isToday ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500'}`}>{day}</span>
                                        {isExamDay && <Flag size={14} className="text-amber-500 fill-amber-500"/>}
                                    </div>
                                    
                                    <div className="space-y-1">
                                        {dayData.sims.slice(0, 2).map((s: any) => (
                                            <div key={s.id} className="text-[9px] font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded truncate">
                                                Simulado
                                            </div>
                                        ))}
                                        {dayData.reviews.slice(0, 3 - Math.min(2, dayData.sims.length)).map((r: any) => (
                                            <div key={r.topicId + r.idx} className={`text-[9px] font-bold px-1.5 py-0.5 rounded truncate ${r.done ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 opacity-60' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                                <span className="opacity-75 mr-1">{r.label.split(':')[0]}</span>
                                                {r.topicTitle}
                                            </div>
                                        ))}
                                        {(dayData.reviews.length + dayData.sims.length) > 3 && (
                                            <div className="text-[9px] text-slate-400 font-bold pl-1">
                                                +{(dayData.reviews.length + dayData.sims.length) - 3} itens
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex-1 bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
                     <div className="p-5 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-black/20">
                        <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500">Próximos 30 Dias</h4>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                        {timelineDays.length === 0 ? (
                             <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                <CalendarIcon size={48} className="mb-4 opacity-20"/>
                                <p className="text-sm font-bold">Nenhuma atividade prevista</p>
                            </div>
                        ) : timelineDays.map((day, i) => (
                             <div key={i} className={`flex gap-4 ${day.isToday ? 'bg-blue-50/50 dark:bg-blue-900/10 -mx-2 px-2 py-2 rounded-xl border border-blue-100 dark:border-blue-500/20' : ''}`}>
                                <div className="flex flex-col items-center min-w-[50px] pt-1">
                                     <span className="text-2xl font-black text-slate-800 dark:text-white leading-none">{day.date.split('-')[2]}</span>
                                     <span className="text-[10px] font-bold text-slate-400 uppercase">{new Date(day.date + 'T12:00:00').toLocaleString('default', { month: 'short' })}</span>
                                </div>
                                <div className="flex-1 space-y-2 pb-4 border-b border-slate-100 dark:border-white/5 last:border-0 last:pb-0">
                                     {day.date === config.examDate && (
                                         <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-500/20">
                                            <div className="p-2 bg-amber-100 dark:bg-amber-500/20 rounded-lg text-amber-600 dark:text-amber-400"><Flag size={16} fill="currentColor"/></div>
                                            <div className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Dia da Prova</div>
                                        </div>
                                     )}
                                     {day.sims.map((s: any) => (
                                         <div key={s.id} className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-500/20">
                                            <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400"><ClipboardList size={16}/></div>
                                            <div>
                                                <div className="text-xs font-bold text-slate-800 dark:text-white">{s.name}</div>
                                                <div className="text-[10px] font-bold text-slate-400">Simulado • {s.year}</div>
                                            </div>
                                        </div>
                                     ))}
                                     {day.reviews.map((r: any) => (
                                         <div key={r.topicId + r.idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${r.done ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600' : 'bg-blue-100 dark:bg-blue-500/20 text-blue-600'}`}>
                                                    {r.done ? <CheckCircle2 size={16}/> : <BookOpen size={16}/>}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1">{r.topicTitle}</div>
                                                    <div className="text-[10px] font-bold text-slate-400">{r.label}</div>
                                                </div>
                                            </div>
                                            {!r.done && (
                                                <button 
                                                    onClick={() => onOpenReview(r.topicId, r.idx)}
                                                    className="px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-bold rounded-lg hover:scale-105 active:scale-95 transition-all"
                                                >
                                                    Revisar
                                                </button>
                                            )}
                                        </div>
                                     ))}
                                </div>
                             </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedDay && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-md" onClick={() => setSelectedDay(null)} />
                    <div className="relative w-full max-w-sm bg-white dark:bg-[#1c1c1e] rounded-[2rem] shadow-2xl p-6 animate-scale-in">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{formatFullDate(selectedDay.date)}</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Detalhes do Dia</p>
                            </div>
                            <button onClick={() => setSelectedDay(null)} className="p-2 bg-black/5 dark:bg-white/10 rounded-full"><X size={18} className="text-slate-500"/></button>
                        </div>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {selectedDay.date === config.examDate && (
                                <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-500/20 mb-2">
                                    <Flag size={20} className="text-amber-500 fill-amber-500"/>
                                    <span className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Dia da Prova!</span>
                                </div>
                            )}
                            {selectedDay.sims.map((s: any) => (
                                <div key={s.id} className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-500/20">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400"><ClipboardList size={16}/></div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-800 dark:text-white">{s.name}</div>
                                        <div className="text-[10px] font-bold text-slate-400">Simulado • {s.year}</div>
                                    </div>
                                </div>
                            ))}
                            {selectedDay.reviews.map((r: any) => (
                                <div key={r.topicId + r.idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${r.done ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600' : 'bg-blue-100 dark:bg-blue-500/20 text-blue-600'}`}>
                                            {r.done ? <CheckCircle2 size={16}/> : <BookOpen size={16}/>}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1">{r.topicTitle}</div>
                                            <div className="text-[10px] font-bold text-slate-400">{r.label}</div>
                                        </div>
                                    </div>
                                    {!r.done && (
                                        <button 
                                            onClick={() => { onOpenReview(r.topicId, r.idx); setSelectedDay(null); }}
                                            className="px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-bold rounded-lg"
                                        >
                                            Revisar
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const SimuladosView = ({ simulados, topics, config, onDelete, onEdit }: { simulados: Simulado[], topics: Topic[], config: UserConfig, onDelete: (id: string) => void, onEdit: (s: Simulado) => void }) => {
    const [search, setSearch] = useState('');
    
    const filtered = simulados.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) || 
        s.year.toString().includes(search)
    ).sort((a,b) => new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime());

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <div className="space-y-1">
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3"><ClipboardList size={28} className="text-purple-500"/> Simulados</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Histórico de Provas</p>
                </div>
            </div>

            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                    <input 
                        type="text" 
                        placeholder="Buscar simulado..." 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl text-sm font-bold outline-none"
                    />
                </div>
            </div>

            <div className="flex-1 bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-black/20 sticky top-0 backdrop-blur-sm z-10">
                            <tr>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Instituição</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ano</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Data</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Desempenho</th>
                                <th className="p-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {filtered.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-slate-400 text-xs font-bold">Nenhum simulado registrado.</td></tr>
                            ) : filtered.map(s => {
                                const acc = s.totalQuestions > 0 ? Math.round((s.correctCount / s.totalQuestions) * 100) : 0;
                                const performanceBg = getPerformanceBgLight(acc, config.targetAccuracy);

                                return (
                                    <tr key={s.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-bold text-sm text-slate-800 dark:text-white">{s.name}</td>
                                        <td className="p-4 text-xs font-bold text-slate-500">{s.year}</td>
                                        <td className="p-4 text-xs font-bold text-slate-500">{formatDate(s.dateTaken.split('T')[0])}</td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center">
                                                <div className={`px-3 py-1 rounded-lg text-xs font-black ${performanceBg}`}>
                                                    {acc}% <span className="opacity-60 text-[10px] ml-1">({s.correctCount}/{s.totalQuestions})</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => onEdit(s)} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg text-slate-400 hover:text-blue-500 transition-colors"><Edit size={16}/></button>
                                                <button onClick={() => onDelete(s.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};