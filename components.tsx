
import React, { useMemo, useState, useEffect } from 'react';
import { Trophy, Zap, Flame, TrendingUp, Calendar, AlertCircle, ChevronRight, BookOpen, Trash2, Edit, Check, Target, ClipboardList, Star, Crown, Medal, ChevronUp, Clock, AlertTriangle, X, Minus, Plus, Smile, Meh, Frown, MoreHorizontal, CheckCircle2, Play } from 'lucide-react';
import { Topic, Simulado } from './types';
import { AREAS, getLevelInfo, getTodayStr, getStreak, formatDate, getAreaTheme, getPerformanceColor, calculateNextLoad, getPriorityInfo, getPerformanceBgLight } from './utils';

// --- Helper: Get Rank Name ---
const getRankInfo = (level: number) => {
    if (level < 10) return { label: 'Estudante', icon: BookOpen, color: 'text-zinc-400', bg: 'from-zinc-700 to-zinc-900' };
    if (level < 20) return { label: 'Interno', icon: Star, color: 'text-blue-400', bg: 'from-blue-600 to-blue-900' };
    if (level < 30) return { label: 'Residente', icon: Medal, color: 'text-amber-400', bg: 'from-amber-600 to-amber-900' };
    if (level < 50) return { label: 'Especialista', icon: Trophy, color: 'text-emerald-400', bg: 'from-emerald-600 to-emerald-900' };
    return { label: 'Chefe', icon: Crown, color: 'text-purple-400', bg: 'from-purple-600 to-purple-900' };
};

// --- Compact Level System (Sidebar) ---
export const CompactLevelSystem = React.memo(({ totalQuestions }: { totalQuestions: number }) => {
    const { level, currentXP, nextLevelXP, progress } = getLevelInfo(totalQuestions);
    const rank = getRankInfo(level);
    const RankIcon = rank.icon;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-full mb-2">
            {isOpen && (
                <div className="absolute bottom-full left-0 w-full mb-3 p-4 bg-white/10 dark:bg-[#1c1c1e]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-scale-in z-50">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Próximo Nível</span>
                        <span className="text-xs font-black text-white">{level + 1}</span>
                    </div>
                    <div className="h-1 bg-black/20 rounded-full overflow-hidden mb-2">
                        <div className={`h-full bg-gradient-to-r ${rank.bg}`} style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="text-right text-[9px] font-bold text-slate-500">
                        {Math.round(nextLevelXP - currentXP).toLocaleString()} XP restantes
                    </div>
                </div>
            )}

            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-300 border ${isOpen ? 'bg-white/5 border-white/5' : 'bg-transparent border-transparent hover:bg-white/5'}`}
            >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${rank.bg} flex items-center justify-center text-white shadow-lg shrink-0`}>
                    <RankIcon size={14} fill="currentColor" className="opacity-90"/>
                </div>
                <div className="flex-1 text-left min-w-0">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{rank.label}</div>
                    <div className="text-xs font-black text-slate-800 dark:text-white truncate">Lvl {level}</div>
                </div>
            </button>
        </div>
    );
});

// --- Evolution Chart (Minimalist) ---
export const EvolutionChart = React.memo(({ simulados, targetAccuracy }: { simulados: Simulado[], targetAccuracy: number }) => {
    const data = useMemo(() => {
        if (!simulados || simulados.length === 0) return [];
        const sorted = [...simulados].sort((a,b) => new Date(a.dateTaken).getTime() - new Date(b.dateTaken).getTime());
        return sorted.map(s => ({
            id: s.id,
            formattedDate: formatDate(s.dateTaken.split('T')[0]),
            acc: Math.round((s.correctCount / (s.totalQuestions || 1)) * 100),
        }));
    }, [simulados]);

    if (data.length === 0) return <div className="h-full w-full flex items-center justify-center text-[10px] text-zinc-500 uppercase font-bold tracking-widest opacity-50">Sem dados</div>;

    const minVal = 30; 
    const maxVal = 100;
    const paddingY = 10; 

    const getX = (index: number) => data.length <= 1 ? 50 : (index / (data.length - 1)) * 100;
    const getY = (val: number) => {
        const clamped = Math.max(minVal, Math.min(val, maxVal));
        const normalized = (clamped - minVal) / (maxVal - minVal); 
        return (100 - paddingY) - (normalized * (100 - paddingY * 2));
    }

    let dPath = '';
    const points = data.map((d, i) => ({ x: getX(i), y: getY(d.acc) }));

    if (points.length > 1) {
        dPath = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const p = points[i];
            const n = points[i+1];
            const cp1x = p.x + (n.x - p.x) * 0.5;
            const cp2x = n.x - (n.x - p.x) * 0.5;
            dPath += ` C ${cp1x} ${p.y}, ${cp2x} ${n.y}, ${n.x} ${n.y}`;
        }
    }

    return (
        <div className="w-full h-full relative group/chart px-2 py-2">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                <line x1="0" y1={getY(targetAccuracy)} x2="100" y2={getY(targetAccuracy)} stroke="currentColor" className="text-emerald-500/30" strokeWidth="0.5" strokeDasharray="2"/>
                {data.length > 1 && <path d={dPath} fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"/>}
            </svg>
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {data.map((point, i) => (
                    <div key={i} className="absolute w-1.5 h-1.5 bg-zinc-900 dark:bg-white rounded-full transition-all" style={{ left: `${getX(i)}%`, top: `${getY(point.acc)}%`, transform: 'translate(-50%, -50%)' }} />
                ))}
            </div>
        </div>
    );
});

// --- NEW: Topic List Item (Productivity Style) ---
export const TopicListItem = React.memo(({ topic, onReview, onDelete, onEdit }: { topic: Topic; onReview: (id: string, idx: number) => void; onDelete?: (id: string) => void; onEdit: () => void }) => {
    const theme = getAreaTheme(topic.area);
    const nextReviewIdx = topic.reviews.findIndex(r => !r.done);
    const nextReview = topic.reviews[nextReviewIdx];
    const isDone = nextReviewIdx === -1;
    const today = getTodayStr();
    
    const isDue = nextReview && nextReview.date <= today;
    const isLate = nextReview && nextReview.date < today;

    return (
        <div className="group relative flex items-center gap-4 bg-white dark:bg-[#121214] p-4 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-200">
            {/* Status Indicator Bar */}
            <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${isDone ? 'bg-emerald-500' : isLate ? 'bg-red-500' : isDue ? 'bg-blue-500' : 'bg-slate-200 dark:bg-white/10'}`}></div>

            {/* Icon Box */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${theme.bg} ${theme.text}`}>
                {isDone ? <Check size={20} strokeWidth={3}/> : <BookOpen size={20}/>}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-0.5">
                    <h3 className={`font-bold text-sm truncate ${isDone ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-800 dark:text-white'}`}>
                        {topic.title}
                    </h3>
                    {topic.importance === 'high' && !isDone && (
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" title="Alta Prioridade"></div>
                    )}
                </div>
                
                <div className="flex items-center gap-3 text-[10px] font-medium text-slate-400">
                    <span className="uppercase tracking-wider">{topic.area}</span>
                    {nextReview && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20"></span>
                            <span className={`${isLate ? 'text-red-500 font-bold' : isDue ? 'text-blue-500 font-bold' : ''}`}>
                                {nextReview.label} • {isLate ? 'Atrasado' : isDue ? 'Hoje' : formatDate(nextReview.date)}
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Action Area */}
            <div className="flex items-center gap-2">
                {!isDone && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onReview(topic.id, nextReviewIdx); }}
                        className={`
                            h-9 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2
                            ${isDue 
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg hover:scale-105 active:scale-95' 
                                : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10'
                            }
                        `}
                    >
                        {isDue && <Play size={10} fill="currentColor"/>}
                        {isDue ? 'Revisar' : 'Adiantar'}
                    </button>
                )}
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-400 hover:text-blue-500"><Edit size={16}/></button>
                    {onDelete && <button onClick={(e) => { e.stopPropagation(); onDelete(topic.id); }} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>}
                </div>
            </div>
        </div>
    );
});

// --- Simulado Card (Compact) ---
export const SimuladoCard = React.memo(({ simulado, onDelete, onEdit }: { simulado: Simulado; onDelete?: (id: string) => void; onEdit?: (s: Simulado) => void }) => {
    const acc = simulado.totalQuestions > 0 ? Math.round((simulado.correctCount / simulado.totalQuestions) * 100) : 0;
    const colorClass = getPerformanceColor(acc, 80, 'text');

    return (
        <div className="group flex items-center justify-between p-4 bg-white dark:bg-[#121214] rounded-2xl border border-slate-100 dark:border-white/5 hover:border-purple-200 dark:hover:border-purple-500/20 transition-all duration-200">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <ClipboardList size={18} strokeWidth={2.5}/>
                </div>
                <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{simulado.name}</h4>
                    <div className="text-[10px] font-medium text-slate-400 flex items-center gap-1.5">
                        <span className="bg-slate-100 dark:bg-white/10 px-1.5 rounded">{simulado.year}</span>
                        <span>{formatDate(simulado.dateTaken.split('T')[0])}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    <div className={`text-lg font-black ${colorClass}`}>{acc}%</div>
                    <div className="text-[9px] font-bold text-slate-400">{simulado.correctCount}/{simulado.totalQuestions}</div>
                </div>
                
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onEdit && <button onClick={() => onEdit(simulado)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-400 hover:text-blue-600"><Edit size={14}/></button>}
                    {onDelete && <button onClick={() => onDelete(simulado.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500"><Trash2 size={14}/></button>}
                </div>
            </div>
        </div>
    );
});

// --- Heatmap Widget (Compact Vertical) ---
export const HeatmapWidget = React.memo(({ topics, simulados }: { topics: Topic[], simulados: Simulado[] }) => {
    const days = useMemo(() => {
        const dArr = [];
        const today = new Date();
        const start = new Date(today);
        start.setDate(today.getDate() - 27); // 4 weeks
        for (let i = 0; i < 28; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            const dStr = d.toISOString().split('T')[0];
            let count = 0;
            topics.forEach(t => { if(!t.deleted) t.reviews.forEach(r => { if(r.done && r.date === dStr) count += r.total; })});
            simulados.forEach(s => { if(s.dateTaken.split('T')[0] === dStr) count += s.totalQuestions; });
            dArr.push({ date: dStr, count, dayObj: d });
        }
        return dArr;
    }, [topics, simulados]);

    return (
        <div className="grid grid-cols-7 gap-2">
            {days.map((d, i) => {
                let colorClass = 'bg-slate-100 dark:bg-white/5';
                if (d.count > 0) colorClass = 'bg-emerald-300 dark:bg-emerald-500/40';
                if (d.count > 30) colorClass = 'bg-emerald-500 dark:bg-emerald-500';
                
                return (
                    <div key={i} className={`w-full pt-[100%] relative rounded-md ${colorClass} transition-all`} title={`${d.count} questions`}>
                    </div>
                );
            })}
        </div>
    )
});

export const SmartSuggestions = React.memo(({ topics, onReview }: { topics: Topic[], onReview: (id: string, idx: number) => void }) => {
    // Kept for mobile compatibility, but less used in new Hub
    const today = getTodayStr();
    const suggestions = useMemo(() => topics
        .filter(t => !t.deleted)
        .flatMap(t => t.reviews.map((r, idx) => ({ ...r, topic: t, idx })))
        .filter(r => !r.done && r.date <= today)
        .sort((a,b) => a.date.localeCompare(b.date))
        .slice(0, 3), [topics, today]);

    if (suggestions.length === 0) return null;

    return (
        <div className="space-y-2">
            {suggestions.map((item) => (
                <div key={`${item.topic.id}-${item.idx}`} onClick={() => onReview(item.topic.id, item.idx)} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-500/20 cursor-pointer">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                            <Clock size={14}/>
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">{item.topic.title}</h4>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Revisão Sugerida</div>
                        </div>
                    </div>
                    <ChevronRight size={14} className="text-blue-400"/>
                </div>
            ))}
        </div>
    )
});
