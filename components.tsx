
import React, { useMemo, useState, useEffect } from 'react';
import { Trophy, Zap, Flame, TrendingUp, Calendar, AlertCircle, ChevronRight, BookOpen, Trash2, Edit, Check, Target, ClipboardList, Star, Crown, Medal, ChevronUp, Clock, AlertTriangle, X, Minus, Plus, Smile, Meh, Frown } from 'lucide-react';
import { Topic, Simulado } from './types';
import { AREAS, getLevelInfo, getTodayStr, getStreak, formatDate, getAreaTheme, getPerformanceColor, calculateNextLoad, getPriorityInfo, getPerformanceBgLight } from './utils';

// --- Helper: Get Rank Name ---
const getRankInfo = (level: number) => {
    if (level < 10) return { label: 'Estudante', icon: BookOpen, color: 'text-slate-400', bg: 'from-slate-700 to-slate-900' };
    if (level < 20) return { label: 'Interno', icon: Star, color: 'text-blue-400', bg: 'from-blue-600 to-blue-900' };
    if (level < 30) return { label: 'Residente', icon: Medal, color: 'text-amber-400', bg: 'from-amber-600 to-amber-900' };
    if (level < 50) return { label: 'Especialista', icon: Trophy, color: 'text-emerald-400', bg: 'from-emerald-600 to-emerald-900' };
    return { label: 'Chefe de Serviço', icon: Crown, color: 'text-purple-400', bg: 'from-purple-600 to-purple-900' };
};

// --- Compact Level System (Sidebar) ---
export const CompactLevelSystem = React.memo(({ totalQuestions }: { totalQuestions: number }) => {
    const { level, currentXP, nextLevelXP, progress } = getLevelInfo(totalQuestions);
    const rank = getRankInfo(level);
    const RankIcon = rank.icon;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-full mb-2">
            {/* Popover / Dropup */}
            {isOpen && (
                <div className="absolute bottom-full left-0 w-full mb-3 p-4 bg-white/10 dark:bg-[#1c1c1e]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-scale-in z-50">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Próximo Nível</span>
                        <span className="text-xs font-black text-white">{level + 1}</span>
                    </div>
                    <div className="h-1.5 bg-black/20 rounded-full overflow-hidden mb-2">
                        <div className={`h-full bg-gradient-to-r ${rank.bg}`} style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="text-right text-[9px] font-bold text-slate-500">
                        {Math.round(nextLevelXP - currentXP).toLocaleString()} XP restantes
                    </div>
                </div>
            )}

            {/* Trigger Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 border ${isOpen ? 'bg-white/10 border-white/10' : 'bg-transparent border-transparent hover:bg-white/5'}`}
            >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${rank.bg} flex items-center justify-center text-white shadow-lg shrink-0`}>
                    <RankIcon size={18} fill="currentColor" className="opacity-90"/>
                </div>
                <div className="flex-1 text-left min-w-0">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">{rank.label}</div>
                    <div className="text-xs font-black text-slate-800 dark:text-white truncate">Nível {level}</div>
                </div>
                <ChevronUp size={16} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
            </button>
        </div>
    );
});

// --- Level System (Full Widget - for Dashboard) ---
export const LevelSystem = React.memo(({ totalQuestions }: { totalQuestions: number }) => {
    const { level, currentXP, nextLevelXP, progress } = getLevelInfo(totalQuestions);
    const rank = getRankInfo(level);
    const RankIcon = rank.icon;

    return (
        <div className="relative w-full mb-8 group select-none">
            <div className={`absolute inset-0 bg-gradient-to-r ${rank.bg} opacity-10 blur-2xl rounded-3xl -z-10 transition-colors duration-700`}></div>
            <div className="bg-white/60 dark:bg-[#121214]/80 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-[28px] p-5 shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${rank.bg} flex items-center justify-center shadow-lg text-white shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                            <RankIcon size={24} fill="currentColor" className="opacity-90"/>
                        </div>
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rank Atual</div>
                            <div className={`text-sm font-black tracking-tight ${rank.color} drop-shadow-sm`}>{rank.label}</div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nível</div>
                        <div className="text-3xl font-black text-slate-800 dark:text-white leading-none">{level}</div>
                    </div>
                </div>
                <div className="relative z-10">
                    <div className="flex justify-between text-[9px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                        <span>{currentXP.toLocaleString()} XP</span>
                        <span>{nextLevelXP.toLocaleString()} XP</span>
                    </div>
                    <div className="h-4 bg-slate-200/50 dark:bg-black/40 rounded-full overflow-hidden border border-white/50 dark:border-white/5 backdrop-blur-md shadow-inner">
                        <div 
                            className={`h-full bg-gradient-to-r ${rank.bg} relative shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all duration-1000 ease-out`} 
                            style={{width: `${progress}%`}}
                        >
                            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                        </div>
                    </div>
                    <div className="text-right mt-1">
                        <span className="text-[9px] font-bold text-slate-400">{Math.round(nextLevelXP - currentXP).toLocaleString()} XP para o próximo nível</span>
                    </div>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                    <RankIcon size={120} />
                </div>
            </div>
        </div>
    );
});

// --- Activity Bar Chart ---
export const ActivityBarChart = React.memo(({ topics, simulados }: { topics: Topic[], simulados: Simulado[] }) => {
    // ... (Implementation remains the same)
    const data = useMemo(() => {
        const days = [];
        const today = new Date();
        const start = new Date();
        start.setDate(today.getDate() - 13); 

        for (let i = 0; i < 14; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            const dateStr = d.toISOString().split('T')[0];
            const dayLabel = d.getDate();
            const weekDay = ['D','S','T','Q','Q','S','S'][d.getDay()];
            
            let qCount = 0;
            topics.forEach(t => {
                if(!t.deleted) t.reviews.forEach(r => { if(r.done && r.date === dateStr) qCount += r.total; });
            });
            simulados.forEach(s => {
                if(s.dateTaken.split('T')[0] === dateStr) qCount += s.totalQuestions;
            });
            days.push({ day: dayLabel, weekDay, count: qCount });
        }
        return days;
    }, [topics, simulados]);

    const maxQ = Math.max(...data.map(d => d.count), 10);

    return (
        <div className="flex items-end justify-between h-24 w-full gap-1 pt-2">
            {data.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group cursor-default">
                    <div className="relative w-full flex items-end justify-center h-16 bg-slate-100/50 dark:bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm">
                        <div 
                            className="w-full bg-blue-500 group-hover:bg-blue-400 transition-all duration-500 rounded-t-[3px] shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                            style={{ height: `${(d.count / maxQ) * 100}%` }}
                        ></div>
                        {d.count > 0 && (
                            <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">{d.count}</div>
                        )}
                    </div>
                    <div className="mt-1.5 flex flex-col items-center">
                        <span className="text-[8px] font-bold text-slate-400 group-hover:text-blue-500 transition-colors">{d.weekDay}</span>
                    </div>
                </div>
            ))}
        </div>
    )
});

// --- Evolution Chart (Simulados) with Spline Smoothing ---
export const EvolutionChart = React.memo(({ simulados, targetAccuracy }: { simulados: Simulado[], targetAccuracy: number }) => {
    // ... (Implementation remains the same as provided previously)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const data = useMemo(() => {
        if (!simulados || simulados.length === 0) return [];
        const sorted = [...simulados].sort((a,b) => new Date(a.dateTaken).getTime() - new Date(b.dateTaken).getTime());
        return sorted.map(s => ({
            id: s.id,
            date: s.dateTaken.split('T')[0],
            formattedDate: formatDate(s.dateTaken.split('T')[0]),
            name: s.name,
            year: s.year,
            acc: Math.round((s.correctCount / (s.totalQuestions || 1)) * 100),
            correct: s.correctCount,
            total: s.totalQuestions
        }));
    }, [simulados]);

    if (data.length === 0) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center text-slate-400 opacity-60 rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 backdrop-blur-sm">
                <TrendingUp size={24} className="mb-2 opacity-50"/>
                <span className="text-[10px] font-bold uppercase tracking-wide">Sem dados</span>
            </div>
        );
    }

    const minVal = 30; // Better baseline for charts
    const maxVal = 100;
    const valRange = maxVal - minVal;
    const paddingY = 20; 

    const getX = (index: number) => {
        if (data.length <= 1) return 50;
        return (index / (data.length - 1)) * 100;
    }
    
    const getY = (val: number) => {
        const clamped = Math.max(minVal, Math.min(val, maxVal));
        const normalized = (clamped - minVal) / valRange; 
        return (100 - paddingY) - (normalized * (100 - paddingY * 2));
    }

    // Helper for Bezier Control Points
    const getControlPoint = (current: {x:number,y:number}, previous: {x:number,y:number}, next: {x:number,y:number}, reverse?: boolean) => {
        const p = previous || current;
        const n = next || current;
        const smoothing = 0.2;
        const o = {
            x: (n.x - p.x) * smoothing,
            y: (n.y - p.y) * smoothing
        };
        return reverse ? { x: current.x - o.x, y: current.y - o.y } : { x: current.x + o.x, y: current.y + o.y };
    };

    let dPath = '';
    const points = data.map((d, i) => ({ x: getX(i), y: getY(d.acc) }));

    if (points.length > 1) {
        dPath = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const cp1 = getControlPoint(points[i], points[i-1], points[i+1]);
            const cp2 = getControlPoint(points[i+1], points[i], points[i+2], true);
            dPath += ` C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${points[i+1].x} ${points[i+1].y}`;
        }
    } else if (points.length === 1) {
        dPath = `M 0 ${points[0].y} L 100 ${points[0].y}`;
    }

    const areaPath = points.length > 1 ? `${dPath} L 100 100 L 0 100 Z` : '';
    const targetY = getY(targetAccuracy);

    return (
        <div className="w-full h-full relative group/chart select-none px-4 pb-4 pt-6">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
                    </linearGradient>
                </defs>
                {/* Guidelines */}
                {[50, 75, 100].map(val => (
                    <line key={val} x1="0" y1={getY(val)} x2="100" y2={getY(val)} stroke="currentColor" className="text-slate-200 dark:text-white/5" strokeWidth="0.5" strokeDasharray="4" vectorEffect="non-scaling-stroke"/>
                ))}
                {/* Target Line */}
                <line x1="0" y1={targetY} x2="100" y2={targetY} stroke="currentColor" className="text-emerald-500/50" strokeWidth="1" strokeDasharray="4" vectorEffect="non-scaling-stroke"/>
                {/* Chart Paths */}
                {data.length > 1 && (
                    <>
                        <path d={areaPath} fill="url(#chartGradient)" vectorEffect="non-scaling-stroke" />
                        <path d={dPath} fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" className="drop-shadow-sm"/>
                    </>
                )}
            </svg>
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {data.map((point, i) => {
                    const left = getX(i);
                    const top = getY(point.acc);
                    const isHovered = hoveredIndex === i;
                    const isHigh = top < 30;

                    return (
                        <div 
                            key={point.id}
                            className="absolute flex items-center justify-center pointer-events-auto"
                            style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)', zIndex: isHovered ? 50 : 10 }}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="w-8 h-8 rounded-full bg-transparent cursor-pointer"></div>
                            <div className={`absolute rounded-full border-2 border-white dark:border-zinc-900 transition-all duration-300 ease-out shadow-sm ${isHovered ? 'w-4 h-4 bg-purple-600 shadow-[0_0_15px_rgba(139,92,246,0.5)] scale-110' : 'w-2 h-2 bg-purple-500'}`}></div>
                            {isHovered && (
                                <div className={`absolute ${isHigh ? 'top-full mt-3' : 'bottom-full mb-3'} flex flex-col items-center animate-scale-in z-[60]`}>
                                    <div className="bg-slate-900/95 dark:bg-black/95 backdrop-blur-xl text-white p-3 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 min-w-[140px] text-center transform transition-transform">
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{point.formattedDate}</div>
                                        <div className="font-bold text-xs text-white mb-1 whitespace-nowrap">{point.name}</div>
                                        <div className="flex items-center justify-center gap-2 mt-1">
                                            <span className="text-xl font-black text-purple-400">{point.acc}%</span>
                                            <span className="text-[9px] font-bold text-slate-400 bg-white/10 px-1.5 py-0.5 rounded">{point.correct}/{point.total}</span>
                                        </div>
                                    </div>
                                    <div className={`w-2.5 h-2.5 bg-slate-900/95 dark:bg-black/95 rotate-45 border-r border-b border-white/10 absolute ${isHigh ? '-top-1 rotate-[225deg]' : '-bottom-1 rotate-45'}`}></div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
});

export const SmartSuggestions = React.memo(({ topics, onReview }: { topics: Topic[], onReview: (id: string, idx: number) => void }) => {
    // ... (Implementation remains the same)
    const today = getTodayStr();
    const suggestions = useMemo(() => topics
        .filter(t => !t.deleted)
        .flatMap(t => t.reviews.map((r, idx) => ({ ...r, topic: t, idx })))
        .filter(r => !r.done && r.date <= today)
        .sort((a,b) => {
            if (a.date !== b.date) return a.date.localeCompare(b.date);
            if (a.topic.importance === 'high' && b.topic.importance !== 'high') return -1;
            if (a.topic.importance !== 'high' && b.topic.importance === 'high') return 1;
            return 0;
        })
        .slice(0, 3), [topics, today]);

    if (suggestions.length === 0) return (
        <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-[20px] border border-dashed border-slate-200 dark:border-white/10 text-center">
            <p className="text-xs font-bold text-slate-400">Nenhuma sugestão imediata.</p>
        </div>
    );

    return (
        <div className="space-y-3">
            {suggestions.map((item) => {
                const theme = getAreaTheme(item.topic.area);
                const isOverdue = item.date < today;
                const priority = getPriorityInfo(item.topic.importance);
                return (
                    <div key={`${item.topic.id}-${item.idx}`} className="bg-white dark:bg-zinc-900/50 backdrop-blur-sm p-4 rounded-[20px] border border-black/5 dark:border-white/5 shadow-sm flex items-center justify-between group hover:border-blue-500/30 transition-all">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-sm ${theme.bg} ${theme.text}`}>
                                {isOverdue ? <AlertCircle size={20}/> : <Calendar size={20}/>}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-800 dark:text-white line-clamp-1">{item.topic.title}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${isOverdue ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-slate-100 text-slate-500 dark:bg-white/10'}`}>
                                        {isOverdue ? 'Atrasado' : 'Hoje'}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <div className={`w-1.5 h-1.5 rounded-full ${priority.dot}`}></div>
                                        <span className="text-[10px] text-slate-400 font-bold">{item.label.split(':')[0]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => onReview(item.topic.id, item.idx)} className="p-2 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                            <ChevronRight size={18}/>
                        </button>
                    </div>
                )
            })}
        </div>
    )
});

// --- Heatmap Widget - Modern Dot Matrix ---
export const HeatmapWidget = React.memo(({ topics, simulados }: { topics: Topic[], simulados: Simulado[] }) => {
    // ... (Implementation remains the same)
    const days = useMemo(() => {
        const dArr = [];
        const today = new Date();
        const start = new Date(today);
        start.setDate(today.getDate() - 34); 

        for (let i = 0; i < 35; i++) {
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
        <div className="w-full flex flex-col items-center">
             <div className="grid grid-cols-7 gap-2.5">
                {days.map((d, i) => {
                    let colorClass = 'bg-slate-100 dark:bg-white/5 scale-90';
                    let glow = '';
                    
                    if (d.count > 0) {
                        colorClass = 'bg-emerald-300 dark:bg-emerald-500/40 scale-100';
                        glow = 'shadow-[0_0_8px_rgba(16,185,129,0.3)]';
                    }
                    if (d.count > 20) {
                        colorClass = 'bg-emerald-400 dark:bg-emerald-500/70 scale-105';
                        glow = 'shadow-[0_0_12px_rgba(16,185,129,0.5)]';
                    }
                    if (d.count > 50) {
                        colorClass = 'bg-emerald-500 dark:bg-emerald-500 scale-110';
                        glow = 'shadow-[0_0_15px_rgba(16,185,129,0.7)]';
                    }

                    return (
                        <div key={d.date} className="relative group cursor-default">
                             <div 
                                className={`w-3 h-3 rounded-full transition-all duration-500 ease-out ${colorClass} ${glow}`}
                            />
                            {/* Simple tooltip */}
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                <div className="bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded-md whitespace-nowrap">
                                    {d.dayObj.getDate()}/{d.dayObj.getMonth()+1}: {d.count}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
});

// --- Topic Card (Redesigned with Inline Review) ---
export const TopicCard = React.memo(({ topic, onReview, onDelete, onEdit, onQuickReview }: { topic: Topic; onReview: (id: string, idx: number) => void; onDelete?: (id: string) => void; onEdit: () => void; onQuickReview?: (id: string, idx: number, data: {correct:number, total:number, difficulty:string}) => void }) => {
    const theme = getAreaTheme(topic.area);
    const nextReviewIdx = topic.reviews.findIndex(r => !r.done);
    const nextReview = topic.reviews[nextReviewIdx];
    const today = getTodayStr();
    const priority = getPriorityInfo(topic.importance);

    // Inline Review State
    const [isReviewing, setIsReviewing] = useState(false);
    const [reviewForm, setReviewForm] = useState({ correct: 0, total: 20, difficulty: 'medium' });

    // Initialize Review Form when entering review mode
    useEffect(() => {
        if (isReviewing && nextReview) {
            setReviewForm({ 
                correct: 0, 
                total: nextReview.targetQ || 20, 
                difficulty: 'medium' 
            });
        }
    }, [isReviewing, nextReview]);

    const handleSubmitQuickReview = () => {
        if (onQuickReview && nextReview) {
            onQuickReview(topic.id, nextReviewIdx, reviewForm);
            setIsReviewing(false);
        }
    };

    // Status Determination
    const isDue = nextReview && nextReview.date <= today;
    const isOverdue = nextReview && nextReview.date < today;
    const daysLate = isOverdue ? Math.floor((new Date(today).getTime() - new Date(nextReview.date).getTime()) / (1000*60*60*24)) : 0;

    return (
        <div className={`
            bg-white dark:bg-zinc-900 rounded-3xl border shadow-sm relative group hover:border-blue-500/30 transition-all overflow-hidden flex flex-col sm:flex-row
            ${isDue ? 'border-blue-200 dark:border-blue-900/30' : 'border-black/5 dark:border-white/5'}
        `}>
            {/* Urgency Strip */}
            {isOverdue && <div className="absolute top-0 left-0 w-full sm:w-1.5 h-1.5 sm:h-full bg-red-500 z-10"></div>}
            {!isOverdue && isDue && <div className="absolute top-0 left-0 w-full sm:w-1.5 h-1.5 sm:h-full bg-blue-500 z-10"></div>}

            <div className="p-5 flex-1 flex flex-col gap-4">
                {/* Header */}
                <div className="flex justify-between items-start pl-1 sm:pl-3">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg ${theme.bg} ${theme.text}`}>
                            <BookOpen size={20}/>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 dark:text-white leading-tight line-clamp-1">{topic.title}</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{topic.area}</span>
                                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${priority.bg} ${priority.text} border border-transparent`}>{priority.label}</span>
                            </div>
                        </div>
                    </div>
                    {!isReviewing && (
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={onEdit} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl text-slate-400 hover:text-blue-500 transition-colors"><Edit size={16}/></button>
                             {onDelete && (
                                 <button onClick={() => onDelete(topic.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                             )}
                        </div>
                    )}
                </div>

                {/* Timeline Visualization */}
                <div className="flex items-center gap-1 pl-1 sm:pl-3 relative h-8">
                    <div className="absolute top-1/2 left-3 right-3 h-0.5 bg-slate-100 dark:bg-white/5 -z-0"></div>
                    {topic.reviews.map((r, i) => {
                        const isDone = r.done;
                        const isCurrent = !isDone && i === nextReviewIdx;
                        let dotClass = 'w-2 h-2 bg-slate-200 dark:bg-white/10';
                        if (isDone) dotClass = 'w-2.5 h-2.5 bg-emerald-500 ring-2 ring-white dark:ring-zinc-900';
                        if (isCurrent) dotClass = 'w-3 h-3 bg-white dark:bg-black border-2 border-blue-500 ring-2 ring-blue-500/30';

                        return (
                            <div key={i} className="flex-1 flex flex-col items-center justify-center relative group/dot z-10">
                                <div className={`rounded-full transition-all ${dotClass}`}></div>
                                <div className={`absolute top-full mt-1.5 text-[9px] font-bold uppercase whitespace-nowrap transition-colors ${isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-slate-300 dark:text-slate-600'}`}>
                                    {r.label.split(':')[0]}
                                </div>
                                <div className="absolute bottom-full mb-2 opacity-0 group-hover/dot:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] px-2 py-1 rounded pointer-events-none whitespace-nowrap">
                                    {formatDate(r.date)}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Action Panel (Right Side / Bottom) */}
            <div className={`
                p-4 sm:w-56 flex flex-col justify-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-50 dark:border-white/5
                ${isDue && !isReviewing ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'bg-slate-50/30 dark:bg-white/[0.02]'}
                ${isReviewing ? 'bg-white dark:bg-[#18181b]' : ''}
            `}>
                {isReviewing ? (
                    // Inline Review Form
                    <div className="flex flex-col gap-3 animate-fade-in w-full">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-bold uppercase text-slate-400">Registrar</span>
                            <button onClick={() => setIsReviewing(false)} className="text-slate-400 hover:text-red-500"><X size={14}/></button>
                        </div>
                        
                        {/* Score Inputs */}
                        <div className="flex gap-2">
                            <div className="flex-1 bg-slate-50 dark:bg-black/20 rounded-xl p-1.5 flex flex-col items-center">
                                <span className="text-[9px] font-bold text-emerald-500 uppercase mb-1">Acertos</span>
                                <div className="flex items-center gap-1 w-full justify-between">
                                    <button onClick={() => setReviewForm(s => ({...s, correct: Math.max(0, s.correct - 1)}))} className="w-5 h-5 flex items-center justify-center rounded bg-white dark:bg-white/10 shadow-sm text-slate-500 hover:text-emerald-500"><Minus size={10}/></button>
                                    <input 
                                        className="w-6 text-center text-sm font-black bg-transparent outline-none text-slate-800 dark:text-white p-0" 
                                        value={reviewForm.correct}
                                        onChange={e => setReviewForm(s => ({...s, correct: parseInt(e.target.value)||0}))}
                                    />
                                    <button onClick={() => setReviewForm(s => ({...s, correct: s.correct + 1}))} className="w-5 h-5 flex items-center justify-center rounded bg-emerald-500 text-white shadow-sm"><Plus size={10}/></button>
                                </div>
                            </div>
                            <div className="flex-1 bg-slate-50 dark:bg-black/20 rounded-xl p-1.5 flex flex-col items-center">
                                <span className="text-[9px] font-bold text-slate-400 uppercase mb-1">Total</span>
                                <div className="flex items-center gap-1 w-full justify-between">
                                    <button onClick={() => setReviewForm(s => ({...s, total: Math.max(1, s.total - 1)}))} className="w-5 h-5 flex items-center justify-center rounded bg-white dark:bg-white/10 shadow-sm text-slate-500"><Minus size={10}/></button>
                                    <input 
                                        className="w-6 text-center text-sm font-black bg-transparent outline-none text-slate-800 dark:text-white p-0" 
                                        value={reviewForm.total}
                                        onChange={e => setReviewForm(s => ({...s, total: parseInt(e.target.value)||1}))}
                                    />
                                    <button onClick={() => setReviewForm(s => ({...s, total: s.total + 1}))} className="w-5 h-5 flex items-center justify-center rounded bg-white dark:bg-white/10 shadow-sm text-slate-500"><Plus size={10}/></button>
                                </div>
                            </div>
                        </div>

                        {/* Difficulty */}
                        <div className="flex gap-1">
                            {[
                                { id: 'easy', icon: Smile, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/20', active: 'ring-1 ring-emerald-500' },
                                { id: 'medium', icon: Meh, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/20', active: 'ring-1 ring-amber-500' },
                                { id: 'hard', icon: Frown, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/20', active: 'ring-1 ring-red-500' }
                            ].map(d => (
                                <button 
                                    key={d.id} 
                                    onClick={() => setReviewForm(s => ({...s, difficulty: d.id}))}
                                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center transition-all ${reviewForm.difficulty === d.id ? `${d.bg} ${d.color} ${d.active}` : 'bg-slate-50 dark:bg-white/5 text-slate-300 hover:text-slate-500'}`}
                                >
                                    <d.icon size={16}/>
                                </button>
                            ))}
                        </div>

                        <button onClick={handleSubmitQuickReview} className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold shadow-lg active:scale-95 transition-all">
                            Confirmar
                        </button>
                    </div>
                ) : (
                    // Standard View
                    <>
                        {nextReview ? (
                            <>
                                <div className="text-center">
                                    {isOverdue ? (
                                        <div className="flex items-center gap-1.5 text-red-500 mb-1 justify-center">
                                            <AlertTriangle size={14}/>
                                            <span className="text-[10px] font-bold uppercase tracking-wide">Atrasado {daysLate}d</span>
                                        </div>
                                    ) : isDue ? (
                                        <div className="flex items-center gap-1.5 text-blue-500 mb-1 justify-center">
                                            <Clock size={14}/>
                                            <span className="text-[10px] font-bold uppercase tracking-wide">Para Hoje</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-slate-400 mb-1 justify-center">
                                            <Calendar size={14}/>
                                            <span className="text-[10px] font-bold uppercase tracking-wide">{formatDate(nextReview.date)}</span>
                                        </div>
                                    )}
                                    
                                    <div className="text-xs font-black text-slate-700 dark:text-slate-200 mb-2">{nextReview.label}</div>
                                </div>

                                <button 
                                    onClick={() => {
                                        if (onQuickReview) setIsReviewing(true);
                                        else onReview(topic.id, nextReviewIdx);
                                    }}
                                    className={`
                                        w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide shadow-sm active:scale-95 transition-all
                                        ${isDue 
                                            ? 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-500' 
                                            : 'bg-white dark:bg-white/10 text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/15'}
                                    `}
                                >
                                    {isDue ? 'Revisar Agora' : 'Adiantar'}
                                </button>
                            </>
                        ) : (
                            <div className="text-center text-emerald-500">
                                <Check size={24} className="mx-auto mb-1"/>
                                <span className="text-[10px] font-bold uppercase tracking-wide">Concluído</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
});

// --- Simulado Card (New) ---
export const SimuladoCard = React.memo(({ simulado, onDelete, onEdit }: { simulado: Simulado; onDelete?: (id: string) => void; onEdit?: (s: Simulado) => void }) => {
    const acc = simulado.totalQuestions > 0 ? Math.round((simulado.correctCount / simulado.totalQuestions) * 100) : 0;
    const pillClass = getPerformanceBgLight(acc, 80);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm relative group hover:border-purple-500/30 transition-all p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-sm">
                    <ClipboardList size={22}/>
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-white leading-tight">{simulado.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{simulado.year}</span>
                        <span className="text-[10px] font-bold text-slate-300">•</span>
                        <span className="text-[10px] font-bold text-slate-400">{formatDate(simulado.dateTaken.split('T')[0])}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className={`px-3 py-1.5 rounded-xl font-black text-sm ${pillClass} flex items-center gap-1.5`}>
                    {acc}% <span className="text-[10px] opacity-60 font-bold hidden sm:inline">({simulado.correctCount}/{simulado.totalQuestions})</span>
                </div>
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onEdit && (
                        <button onClick={() => onEdit(simulado)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl text-slate-400 hover:text-blue-500 transition-colors"><Edit size={16}/></button>
                    )}
                    {onDelete && (
                        <button onClick={() => onDelete(simulado.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                    )}
                </div>
            </div>
        </div>
    );
});

// --- Simulados Mini Widget ---
export const SimuladosMiniWidget = React.memo(({ simulados, targetAccuracy }: { simulados: Simulado[], targetAccuracy: number }) => {
    // ... existing implementation
    const displayData = useMemo(() => {
        if (!simulados || simulados.length === 0) return null;
        const sorted = [...simulados].sort((a,b) => new Date(a.dateTaken).getTime() - new Date(b.dateTaken).getTime());
        const last10 = sorted.slice(-10); 
        const avg = Math.round(sorted.reduce((acc, s) => acc + ((s.correctCount || 0) / (s.totalQuestions || 1)), 0) / sorted.length * 100);
        return { avg, history: last10 };
    }, [simulados]);

    if (!displayData) return (
        <div className="bg-white/50 dark:bg-white/5 p-6 rounded-[32px] border border-black/5 dark:border-white/5 flex items-center justify-center text-center h-full backdrop-blur-md">
            <div><ClipboardList className="mx-auto text-slate-300 mb-2" size={24}/><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sem simulados</p></div>
        </div>
    );

    return (
        <div className="glass-panel p-6 rounded-[32px] shadow-sm h-full flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 relative z-10">
                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-xs uppercase tracking-wide"><ClipboardList size={16} className="text-purple-500"/> Simulados</h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Média: <span className={getPerformanceColor(displayData.avg, targetAccuracy, 'text')}>{displayData.avg}%</span></span>
            </div>
            
            <div className="flex items-end gap-1.5 h-24 w-full relative z-10">
                 <div className="absolute w-full border-t border-dashed border-slate-300 dark:border-white/10 z-0 pointer-events-none" style={{ bottom: `${targetAccuracy}%` }}></div>

                {displayData.history.map((s, i) => {
                    const acc = Math.round(((s.correctCount || 0) / (s.totalQuestions || 1)) * 100);
                    const colorClass = getPerformanceColor(acc, targetAccuracy, 'bg');
                    
                    return (
                        <div key={s.id} className="flex-1 flex flex-col justify-end gap-1 group relative h-full z-10">
                            <div className={`w-full rounded-t-sm transition-all duration-500 ${colorClass} opacity-80 group-hover:opacity-100 group-hover:scale-y-105 origin-bottom`} style={{height: `${acc}%`}}></div>
                        </div>
                    );
                })}
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full z-0 pointer-events-none"></div>
        </div>
    );
});
