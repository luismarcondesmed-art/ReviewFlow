
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { Trophy, Zap, Flame, TrendingUp, Calendar, AlertCircle, ChevronRight, BookOpen, Trash2, Edit, Check, Target, ClipboardList, Star, Crown, Medal, ChevronUp, ChevronDown, Plus, BarChart2, CalendarDays, Clock, PlayCircle, Play, User, Stethoscope, Scissors, Baby, Flower2, ShieldAlert, MoreHorizontal, X, ChevronLeft } from 'lucide-react';
import { Topic, Simulado, AreaType } from '../types';
import { AREAS, getLevelInfo, getTodayStr, getStreak, formatDate, getAreaTheme, getPerformanceColor, calculateNextLoad, getPriorityInfo, getPerformanceBgLight, calculateDetailedStats, APP_VERSION, getImportanceWeight } from '../utils';

export const getAreaIcon = (area: AreaType) => {
    switch (area) {
        case 'clinica': return Stethoscope;
        case 'cirurgia': return Scissors;
        case 'pediatria': return Baby;
        case 'go': return Flower2;
        case 'preventiva': return ShieldAlert;
        default: return BookOpen;
    }
};

export const Tooltip = ({ children, content, className = "relative inline-flex items-center justify-center" }: { children: React.ReactNode, content: React.ReactNode, className?: string }) => {
    const [rect, setRect] = useState<DOMRect | null>(null);

    return (
        <div 
            className={className}
            onMouseEnter={(e) => setRect(e.currentTarget.getBoundingClientRect())}
            onMouseLeave={() => setRect(null)}
        >
            {children}
            {rect && createPortal(
                <div 
                    className="fixed z-[9999] pointer-events-none animate-fade-in"
                    style={{
                        top: rect.top - 8,
                        left: rect.left + rect.width / 2,
                        transform: 'translate(-50%, -100%)'
                    }}
                >
                    {content}
                </div>,
                document.body
            )}
        </div>
    );
};

// --- Helper: Get Rank Name ---
const getRankInfo = (level: number) => {
    if (level < 10) return { label: 'Estudante', icon: BookOpen, color: 'text-slate-400', bg: 'from-slate-700 to-slate-900' };
    if (level < 20) return { label: 'Interno', icon: Star, color: 'text-slate-400', bg: 'from-slate-600 to-slate-900' };
    if (level < 30) return { label: 'Residente', icon: Medal, color: 'text-amber-400', bg: 'from-amber-600 to-amber-900' };
    if (level < 50) return { label: 'Especialista', icon: Trophy, color: 'text-emerald-400', bg: 'from-emerald-600 to-emerald-900' };
    return { label: 'Chefe de Serviço', icon: Crown, color: 'text-purple-400', bg: 'from-purple-600 to-purple-900' };
};



// --- Compact Level System (Sidebar) ---
import { calculateStreak } from '../utils';

export const UserStatsDropdown = React.memo(({ totalQuestions, topics, simulados }: { totalQuestions: number, topics: Topic[], simulados: Simulado[] }) => {
    const { level, currentXP, nextLevelXP, progress } = getLevelInfo(totalQuestions);
    const rank = getRankInfo(level);
    const RankIcon = rank.icon;
    const [isOpen, setIsOpen] = useState(false);
    const streak = calculateStreak(topics, simulados);

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Perfil do Usuário"
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 border ${isOpen ? 'bg-white/10 border-white/10' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10'}`}
            >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${rank.bg} flex items-center justify-center text-white shadow-sm`}>
                    <User size={16} fill="currentColor" className="opacity-90"/>
                </div>
            </button>

            {/* Popover / Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 p-4 bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl animate-scale-in z-50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rank.bg} flex items-center justify-center text-white shadow-md`}>
                            <RankIcon size={24} fill="currentColor" className="opacity-90"/>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{rank.label}</div>
                            <div className="text-lg font-black text-slate-800 dark:text-white">Nível {level}</div>
                        </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-white/5 rounded-lg">
                            <span className="text-xs font-bold text-slate-500">Questões Feitas</span>
                            <span className="text-sm font-black text-slate-800 dark:text-white">{totalQuestions}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-white/5 rounded-lg">
                            <span className="text-xs font-bold text-slate-500">Ofensiva Atual</span>
                            <span className="text-sm font-black text-orange-500 flex items-center gap-1">
                                <Flame size={14} className="fill-orange-500"/> {streak} dias
                            </span>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Próximo Nível</span>
                            <span className="text-[10px] font-black text-slate-800 dark:text-white">{level + 1}</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 dark:bg-black/20 rounded-full overflow-hidden mb-1">
                            <div className={`h-full bg-gradient-to-r ${rank.bg}`} style={{width: `${progress}%`}}></div>
                        </div>
                        <div className="text-right text-[9px] font-bold text-slate-500">
                            {Math.round(nextLevelXP - currentXP).toLocaleString()} XP restantes
                        </div>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-center">
                        <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600">v{APP_VERSION}</span>
                    </div>
                </div>
            )}
        </div>
    );
});

export const CompactLevelSystem = React.memo(({ totalQuestions }: { totalQuestions: number }) => {
    const { level, currentXP, nextLevelXP, progress } = getLevelInfo(totalQuestions);
    const rank = getRankInfo(level);
    const RankIcon = rank.icon;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-full mb-2">
            {/* Popover / Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-3 p-4 bg-white/10 dark:bg-[#1c1c1e]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-scale-in z-50">
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
                className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 border ${isOpen ? 'bg-white/10 border-white/10' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10'}`}
            >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${rank.bg} flex items-center justify-center text-white shadow-lg shrink-0`}>
                    <RankIcon size={18} fill="currentColor" className="opacity-90"/>
                </div>
                <div className="flex-1 text-left min-w-0">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">{rank.label}</div>
                    <div className="text-xs font-black text-slate-800 dark:text-white truncate">Nível {level}</div>
                </div>
                <ChevronDown size={16} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
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

// --- Detailed Stats Widget ---
export const DetailedStatsWidget = React.memo(({ topics, simulados, compact = false }: { topics: Topic[], simulados: Simulado[], compact?: boolean }) => {
    const [range, setRange] = useState<'week' | 'month' | 'year' | 'all'>('week');
    const stats = useMemo(() => calculateDetailedStats(topics, simulados, range), [topics, simulados, range]);

    // Calculate Accuracy for the range
    const accuracy = useMemo(() => {
        let correct = 0;
        let total = 0;
        const today = new Date();
        const cutoff = new Date(today);
        if (range === 'week') cutoff.setDate(today.getDate() - 7);
        if (range === 'month') cutoff.setMonth(today.getMonth() - 1);
        if (range === 'year') cutoff.setFullYear(today.getFullYear() - 1);
        const cutoffStr = range === 'all' ? '1970-01-01' : cutoff.toISOString().split('T')[0];

        topics.forEach(t => {
            if (t.deleted) return;
            t.reviews.forEach(r => {
                if (r.done && r.date >= cutoffStr) {
                    correct += r.correct;
                    total += r.total;
                }
            });
        });
        simulados.forEach(s => {
            if (s.dateTaken >= cutoffStr) {
                 correct += s.correctCount;
                 total += s.totalQuestions;
            }
        });
        return total > 0 ? Math.round((correct / total) * 100) : 0;
    }, [topics, simulados, range]);

    const StatCard = ({ label, value, subLabel, icon: Icon, colorClass }: any) => (
        <div className={`flex-1 bg-white dark:bg-zinc-900 rounded-2xl ${compact ? 'p-3' : 'p-4'} border border-slate-100 dark:border-white/5 shadow-sm flex items-center justify-between group hover:border-slate-500/20 transition-all`}>
            <div>
                <div className={`text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1`}>{label}</div>
                <div className={`${compact ? 'text-xl' : 'text-2xl'} font-black text-slate-800 dark:text-white leading-none`}>{value}</div>
                {!compact && subLabel && <div className="text-[9px] font-bold text-slate-400 mt-1">{subLabel}</div>}
            </div>
            <div className={`p-2 sm:p-3 rounded-xl ${colorClass} bg-opacity-10 dark:bg-opacity-20`}>
                <Icon size={compact ? 16 : 20} className={colorClass.replace('bg-', 'text-')}/>
            </div>
        </div>
    );

    const rangeLabel = range === 'week' ? 'Semana' : range === 'month' ? 'Mês' : range === 'year' ? 'Ano' : 'Total';

    return (
        <div className="w-full space-y-4">
            {!compact && (
                <div className="flex justify-end gap-1 mb-2">
                    {(['week', 'month', 'year', 'all'] as const).map((r) => (
                        <button 
                            key={r}
                            onClick={() => setRange(r)}
                            className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${range === r ? 'bg-slate-800 text-white dark:bg-white dark:text-black' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                        >
                            {r === 'week' ? '7D' : r === 'month' ? '30D' : r === 'year' ? '1A' : 'Tudo'}
                        </button>
                    ))}
                </div>
            )}
            <div className={`grid ${compact ? 'grid-cols-2 gap-2 sm:gap-3' : 'grid-cols-2 md:grid-cols-4 gap-4'} w-full`}>
                <StatCard label="Total Hoje" value={stats.totalToday} subLabel="Questões" icon={Zap} colorClass="bg-amber-500 text-amber-500" />
                <StatCard label={`Total (${rangeLabel})`} value={stats.totalRange} subLabel="Questões" icon={BarChart2} colorClass="bg-slate-500 text-slate-500" />
                <StatCard label="Taxa de Acerto" value={`${accuracy}%`} subLabel={`em ${rangeLabel.toLowerCase()}`} icon={Target} colorClass="bg-emerald-500 text-emerald-500" />
                {stats.avgTimePerQuestion ? (
                     <StatCard label="Velocidade" value={`${stats.avgTimePerQuestion}s`} subLabel="por questão" icon={Clock} colorClass="bg-rose-500 text-rose-500" />
                ) : (
                    <StatCard label="Média Diária" value={Math.round(stats.totalRange / (range === 'week' ? 7 : range === 'month' ? 30 : range === 'year' ? 365 : 1))} subLabel="Estimada" icon={TrendingUp} colorClass="bg-purple-500 text-purple-500" />
                )}
            </div>
        </div>
    );
});

// --- Area Stats Widget ---
export const AreaStatsWidget = React.memo(({ topics, simulados }: { topics: Topic[], simulados: Simulado[] }) => {
    const stats = useMemo(() => {
        const counts: Record<string, number> = {};
        AREAS.forEach(a => counts[a.id] = 0);

        topics.forEach(t => {
            if (t.deleted) return;
            t.reviews.forEach(r => {
                if (r.done) counts[t.area] = (counts[t.area] || 0) + r.total;
            });
        });

        // Simulados don't strictly have an area unless we parse it, assuming they are general for now or mixed.
        // If simulados have areas, we'd add them here. For now, just topics.
        
        return AREAS.map(area => ({
            ...area,
            count: counts[area.id] || 0,
            icon: getAreaIcon(area.id)
        })).sort((a, b) => b.count - a.count);
    }, [topics]);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {stats.map((area) => {
                const Icon = area.icon;
                const theme = getAreaTheme(area.id);
                return (
                    <div key={area.id} className="bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm flex flex-col items-center text-center gap-2 group hover:border-slate-300 dark:hover:border-white/20 transition-all">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme.bg} ${theme.text} group-hover:scale-110 transition-transform`}>
                            <Icon size={20} />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{area.name}</div>
                            <div className="text-lg font-black text-slate-800 dark:text-white">{area.count}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});

// --- Evolution Chart (Simulados) with Limit ---
export const EvolutionChart = React.memo(({ simulados, targetAccuracy, limit }: { simulados: Simulado[], targetAccuracy: number, limit?: number }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const data = useMemo(() => {
        if (!simulados || simulados.length === 0) return [];
        const sorted = [...simulados].sort((a,b) => new Date(a.dateTaken).getTime() - new Date(b.dateTaken).getTime());
        
        // Apply Limit if provided (Get last N)
        const displayData = limit ? sorted.slice(-limit) : sorted;

        return displayData.map(s => ({
            id: s.id,
            date: s.dateTaken.split('T')[0],
            formattedDate: formatDate(s.dateTaken.split('T')[0]),
            name: s.name,
            year: s.year,
            acc: Math.round((s.correctCount / (s.totalQuestions || 1)) * 100),
            correct: s.correctCount,
            total: s.totalQuestions
        }));
    }, [simulados, limit]);

    if (data.length === 0) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center text-slate-400 opacity-60 rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 backdrop-blur-sm">
                <TrendingUp size={24} className="mb-2 opacity-50"/>
                <span className="text-[10px] font-bold uppercase tracking-wide">Sem dados</span>
            </div>
        );
    }

    const minVal = 40; 
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

    let dPath = '';
    if (data.length > 1) {
        dPath = `M ${getX(0)} ${getY(data[0].acc)}`;
        for (let i = 0; i < data.length - 1; i++) {
            const x0 = getX(i);
            const y0 = getY(data[i].acc);
            const x1 = getX(i + 1);
            const y1 = getY(data[i+1].acc);
            const cX = (x0 + x1) / 2;
            dPath += ` C ${cX} ${y0}, ${cX} ${y1}, ${x1} ${y1}`;
        }
    } else if (data.length === 1) {
        dPath = `M ${getX(0)} ${getY(data[0].acc)}`;
    }

    const areaPath = data.length > 1 ? `${dPath} L 100 100 L 0 100 Z` : '';
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
                {[60, 80, 100].map(val => (
                    <line key={val} x1="0" y1={getY(val)} x2="100" y2={getY(val)} stroke="currentColor" className="text-slate-200 dark:text-white/5" strokeWidth="0.5" strokeDasharray="4" vectorEffect="non-scaling-stroke"/>
                ))}
                <line x1="0" y1={targetY} x2="100" y2={targetY} stroke="currentColor" className="text-emerald-500/50" strokeWidth="1" strokeDasharray="4" vectorEffect="non-scaling-stroke"/>
                {data.length > 1 && (
                    <>
                        <path d={areaPath} fill="url(#chartGradient)" vectorEffect="non-scaling-stroke" />
                        <path d={dPath} fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" className="drop-shadow-sm"/>
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
    const today = getTodayStr();
    const suggestions = useMemo(() => topics
        .filter(t => !t.deleted)
        .flatMap(t => t.reviews.map((r, idx) => ({ ...r, topic: t, idx })))
        .filter(r => !r.done && r.date <= today)
        .sort((a,b) => {
            if (a.date !== b.date) return a.date.localeCompare(b.date);
            return getImportanceWeight(b.topic.importance) - getImportanceWeight(a.topic.importance);
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
                    <div key={`${item.topic.id}-${item.idx}`} className="bg-white dark:bg-zinc-900/50 backdrop-blur-sm p-4 rounded-[20px] border border-black/5 dark:border-white/5 shadow-sm flex items-center justify-between group hover:border-slate-500/30 transition-all">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-sm ${theme.bg} ${theme.text}`}>
                                {isOverdue ? <AlertCircle size={20}/> : <Calendar size={20}/>}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-800 dark:text-white line-clamp-1">{item.topic.title}</h4>
                                <div className="flex flex-col gap-1.5 mt-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${isOverdue ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-slate-100 text-slate-500 dark:bg-white/10'}`}>
                                            {isOverdue ? 'Atrasado' : 'Hoje'}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <div className={`w-1.5 h-1.5 rounded-full ${priority.dot}`}></div>
                                            <span className="text-[10px] text-slate-400 font-bold">{item.label.split(':')[0]}</span>
                                        </div>
                                    </div>
                                    {/* Timeline Dots */}
                                    <div className="flex items-center gap-1">
                                        {item.topic.reviews.map((r, i) => {
                                            const isDone = r.done;
                                            const isToday = r.date === today;
                                            const isNext = !isDone && i === item.idx;
                                            
                                            let dotColor = 'bg-slate-200 dark:bg-zinc-700'; // Future
                                            if (isDone) dotColor = 'bg-emerald-500';
                                            else if (isToday || isNext) dotColor = 'bg-slate-500';

                                            return (
                                                <Tooltip 
                                                    key={i}
                                                    content={
                                                        <div className="bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-xl border border-white/10">
                                                            {r.label} ({formatDate(r.date)})
                                                            <div className="text-[8px] text-slate-400 font-normal mt-0.5">
                                                                {r.done ? `${r.correct}/${r.total} acertos (${r.total > 0 ? Math.round((r.correct/r.total)*100) : 0}%)` : `${r.targetQ} questões`}
                                                            </div>
                                                        </div>
                                                    }
                                                >
                                                    <div className="flex items-center">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${dotColor} ${isNext ? 'ring-2 ring-slate-500/30' : ''}`} />
                                                        {i < item.topic.reviews.length - 1 && (
                                                            <div className={`w-2 h-px ${isDone ? 'bg-emerald-500/50' : 'bg-slate-200 dark:bg-zinc-700'}`} />
                                                        )}
                                                    </div>
                                                </Tooltip>
                                            );
                                        })}
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

// --- Heatmap Widget - GitHub Style Calendar ---
export const HeatmapWidget = React.memo(({ topics, simulados }: { topics: Topic[], simulados: Simulado[] }) => {
    const [range, setRange] = useState<7 | 14 | 30 | 60>(30);
    const [offsetDays, setOffsetDays] = useState(0);
    const [tooltipData, setTooltipData] = useState<{ day: any, rect: DOMRect } | null>(null);

    const calendarData = useMemo(() => {
        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(today.getDate() - offsetDays);
        
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - (range - 1));

        // Align to Sunday
        const alignedStartDate = new Date(startDate);
        alignedStartDate.setDate(startDate.getDate() - startDate.getDay());

        // Align to Saturday
        const alignedEndDate = new Date(endDate);
        alignedEndDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

        const dataMap = new Map<string, { count: number, correct: number, total: number }>();
        topics.forEach(t => { 
            if(!t.deleted) t.reviews.forEach(r => { 
                if(r.done) {
                    const d = r.date;
                    const current = dataMap.get(d) || { count: 0, correct: 0, total: 0 };
                    dataMap.set(d, { 
                        count: current.count + r.total, 
                        correct: current.correct + r.correct, 
                        total: current.total + r.total 
                    });
                }
            });
        });
        simulados.forEach(s => { 
            const d = s.dateTaken.split('T')[0];
            const current = dataMap.get(d) || { count: 0, correct: 0, total: 0 };
            dataMap.set(d, { 
                count: current.count + s.totalQuestions, 
                correct: current.correct + s.correctCount, 
                total: current.total + s.totalQuestions 
            }); 
        });

        const days = [];
        const currentDate = new Date(alignedStartDate);
        const todayStr = today.toISOString().split('T')[0];
        const startStr = startDate.toISOString().split('T')[0];
        const endStr = endDate.toISOString().split('T')[0];

        while (currentDate <= alignedEndDate) {
            const dateStr = currentDate.toISOString().split('T')[0];
            const data = dataMap.get(dateStr) || { count: 0, correct: 0, total: 0 };
            
            days.push({
                date: dateStr,
                count: data.count,
                correct: data.correct,
                total: data.total,
                dayObj: new Date(currentDate),
                isToday: dateStr === todayStr,
                isHidden: dateStr < startStr || dateStr > endStr
            });
            
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return days;
    }, [topics, simulados, range, offsetDays]);

    const handlePrev = () => setOffsetDays(prev => prev + range);
    const handleNext = () => setOffsetDays(prev => Math.max(0, prev - range));
    const handleReset = () => setOffsetDays(0);

    const displayedStart = new Date();
    displayedStart.setDate(displayedStart.getDate() - offsetDays - (range - 1));
    const displayedEnd = new Date();
    displayedEnd.setDate(displayedEnd.getDate() - offsetDays);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
                    {[7, 14, 30, 60].map(r => (
                        <button
                            key={r}
                            onClick={() => { setRange(r as any); setOffsetDays(0); }}
                            className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${range === r ? 'bg-white dark:bg-zinc-800 text-slate-500 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                        >
                            {r}D
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handlePrev} className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                        <ChevronLeft size={14} />
                    </button>
                    {offsetDays > 0 && (
                        <button onClick={handleReset} className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900/20 text-slate-600 dark:text-slate-400 text-[10px] font-bold hover:bg-slate-200 dark:hover:bg-slate-900/40 transition-colors">
                            Hoje
                        </button>
                    )}
                    <button onClick={handleNext} disabled={offsetDays === 0} className={`p-1.5 rounded-lg transition-colors ${offsetDays === 0 ? 'bg-slate-50 dark:bg-white/5 text-slate-300 dark:text-slate-600 cursor-not-allowed' : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10'}`}>
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            <div 
                className="flex justify-center w-full overflow-x-auto custom-scrollbar pb-2"
                onPointerDownCapture={(e) => e.stopPropagation()}
            >
                <div className="grid grid-rows-7 grid-flow-col gap-1 sm:gap-1.5">
                    {calendarData.map((day, i) => {
                        if (day.isHidden) {
                            return <div key={`hidden-${i}`} className="w-3 h-3 sm:w-4 sm:h-4 rounded-[4px]" />;
                        }

                        let colorClass = 'bg-slate-100 dark:bg-white/5 border border-transparent';
                        if (day.count > 0) colorClass = 'bg-slate-200 dark:bg-slate-900/50 border-slate-300 dark:border-slate-800';
                        if (day.count > 10) colorClass = 'bg-slate-300 dark:bg-slate-700/60 border-slate-400 dark:border-slate-600';
                        if (day.count > 30) colorClass = 'bg-slate-400 dark:bg-slate-600/80 border-slate-500 dark:border-slate-500';
                        if (day.count > 60) colorClass = 'bg-slate-500 dark:bg-slate-500 border-slate-600 dark:border-slate-400';

                        return (
                            <div 
                                key={day.date} 
                                className="relative group cursor-pointer"
                                onMouseEnter={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setTooltipData({ day, rect });
                                }}
                                onMouseLeave={() => setTooltipData(null)}
                            >
                                <div 
                                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-[4px] transition-all ${colorClass} ${day.isToday ? 'ring-2 ring-slate-500 ring-offset-1 dark:ring-offset-zinc-900' : ''}`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
                <div className="text-[10px] font-bold text-slate-400">
                    {displayedStart.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} - {displayedEnd.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                </div>
                <div className="flex items-center gap-2 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    <span>Menos</span>
                    <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[3px] bg-slate-100 dark:bg-white/5"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[3px] bg-slate-200 dark:bg-slate-900/50"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[3px] bg-slate-400 dark:bg-slate-600/80"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[3px] bg-slate-500 dark:bg-slate-500"></div>
                    </div>
                    <span>Mais</span>
                </div>
            </div>

            {tooltipData && createPortal(
                <div 
                    className="fixed z-[9999] pointer-events-none animate-fade-in"
                    style={{
                        top: tooltipData.rect.top - 8,
                        left: tooltipData.rect.left + tooltipData.rect.width / 2,
                        transform: 'translate(-50%, -100%)'
                    }}
                >
                    <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1.5 rounded-lg shadow-xl border border-white/10 flex flex-col items-center min-w-[80px]">
                        <span className="text-slate-400 mb-0.5">{tooltipData.day.dayObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
                        {tooltipData.day.count > 0 ? (
                            <span className="text-slate-400">{tooltipData.day.correct}/{tooltipData.day.total} ({Math.round(tooltipData.day.correct/tooltipData.day.total*100)}%)</span>
                        ) : (
                            <span className="opacity-50">Sem atividade</span>
                        )}
                    </div>
                    <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-white/10"></div>
                </div>,
                document.body
            )}
        </div>
    )
});

// --- Future Load Widget ---
export const FutureLoadWidget = React.memo(({ topics }: { topics: Topic[] }) => {
    const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'total'>('week');
    
    const chartData = useMemo(() => {
        const todayStr = getTodayStr();
        const todayDate = new Date(todayStr + 'T12:00:00');
        
        let daysCount = 7;
        if (period === 'day') daysCount = 1;
        if (period === 'month') daysCount = 30;
        if (period === 'total') daysCount = 90; // Limit to 90 days for visualization

        const days = Array.from({ length: daysCount }).map((_, i) => {
            const d = new Date(todayDate);
            d.setDate(todayDate.getDate() + i);
            const dateStr = d.toISOString().split('T')[0];
            const dayOfWeek = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
            return { dateStr, dayOfWeek, load: 0, dateObj: d };
        });

        let totalLoad = 0;

        topics.forEach(t => {
            if (t.deleted) return;
            t.reviews.forEach(r => {
                if (!r.done && r.date >= todayStr) {
                    totalLoad += r.targetQ;
                    const day = days.find(d => d.dateStr === r.date);
                    if (day) day.load += r.targetQ;
                    else if (period === 'total') {
                        // If it's beyond 90 days, add to the last bar or just count in total
                        const lastDay = days[days.length - 1];
                        if (r.date > lastDay.dateStr) {
                            lastDay.load += r.targetQ;
                        }
                    }
                }
            });
        });

        return { days, totalLoad };
    }, [topics, period]);

    const maxLoad = Math.max(...chartData.days.map(d => d.load), 10); // Minimum scale of 10

    return (
        <div className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-slate-500">
                    Total: <span className="text-slate-500">{chartData.totalLoad}q</span>
                </div>
                <div className="flex bg-slate-100 dark:bg-white/5 rounded-lg p-1">
                    <button onClick={() => setPeriod('day')} className={`px-2 py-1 text-[9px] font-bold rounded-md transition-all ${period === 'day' ? 'bg-white dark:bg-zinc-800 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}>Dia</button>
                    <button onClick={() => setPeriod('week')} className={`px-2 py-1 text-[9px] font-bold rounded-md transition-all ${period === 'week' ? 'bg-white dark:bg-zinc-800 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}>Semana</button>
                    <button onClick={() => setPeriod('month')} className={`px-2 py-1 text-[9px] font-bold rounded-md transition-all ${period === 'month' ? 'bg-white dark:bg-zinc-800 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}>Mês</button>
                    <button onClick={() => setPeriod('total')} className={`px-2 py-1 text-[9px] font-bold rounded-md transition-all ${period === 'total' ? 'bg-white dark:bg-zinc-800 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}>Total</button>
                </div>
            </div>
            <div className="flex items-end justify-between gap-0.5 sm:gap-1 h-24 sm:h-32 mt-2">
                {chartData.days.map((day, i) => {
                    const heightPct = Math.max((day.load / maxLoad) * 100, 2); // Minimum 2% height for visibility
                    const isToday = i === 0;
                    const showLabel = period === 'day' || period === 'week' || (period === 'month' && i % 5 === 0) || (period === 'total' && i % 15 === 0);
                    
                    return (
                        <Tooltip
                            key={day.dateStr}
                            className="flex-1 h-full w-full"
                            content={
                                <div className="bg-slate-900 text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-lg">
                                    {day.dateObj.getDate()}/{day.dateObj.getMonth()+1}: {day.load}q
                                </div>
                            }
                        >
                            <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-1 group relative h-full w-full">
                                <div className="w-full bg-slate-100 dark:bg-white/5 rounded-t-sm sm:rounded-t-md flex items-end justify-center relative overflow-hidden h-full">
                                    <div 
                                        className={`w-full rounded-t-sm sm:rounded-t-md transition-all duration-500 ${isToday ? 'bg-slate-500' : 'bg-indigo-400 dark:bg-indigo-500/80 group-hover:bg-indigo-500'}`}
                                        style={{ height: `${heightPct}%` }}
                                    ></div>
                                </div>
                                {showLabel && (
                                    <span className={`text-[7px] sm:text-[9px] font-bold uppercase ${isToday ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400'} absolute -bottom-4`}>
                                        {isToday ? 'Hoj' : (period === 'week' ? day.dayOfWeek.substring(0, 3) : `${day.dateObj.getDate()}/${day.dateObj.getMonth()+1}`)}
                                    </span>
                                )}
                            </div>
                        </Tooltip>
                    );
                })}
            </div>
            <div className="h-4"></div> {/* Spacer for labels */}
        </div>
    );
});

// --- Retention Widget ---
export const RetentionWidget = React.memo(({ topics }: { topics: Topic[] }) => {
    const stats = useMemo(() => {
        let hot = 0, warm = 0, cold = 0, freezing = 0;
        const today = new Date();
        
        topics.forEach(t => {
            if (t.deleted) return;
            const lastReview = [...t.reviews].filter(r => r.done).sort((a,b) => b.date.localeCompare(a.date))[0];
            if (!lastReview) {
                freezing++;
                return;
            }
            
            const diffTime = Math.abs(today.getTime() - new Date(lastReview.date + 'T12:00:00').getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays <= 3) hot++;
            else if (diffDays <= 7) warm++;
            else if (diffDays <= 30) cold++;
            else freezing++;
        });
        
        const total = hot + warm + cold + freezing;
        return { hot, warm, cold, freezing, total };
    }, [topics]);

    const getPct = (val: number) => stats.total > 0 ? Math.round((val / stats.total) * 100) : 0;

    return (
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-[24px] border border-slate-100 dark:border-white/5 shadow-sm h-full">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-xs uppercase tracking-wide mb-4">
                <Flame size={16} className="text-orange-500"/> Retenção
            </h3>
            
            <div className="space-y-4">
                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        <span>Quente (0-3d)</span>
                        <span>{stats.hot} ({getPct(stats.hot)}%)</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{width: `${getPct(stats.hot)}%`}}></div>
                    </div>
                </div>
                
                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        <span>Morno (4-7d)</span>
                        <span>{stats.warm} ({getPct(stats.warm)}%)</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400" style={{width: `${getPct(stats.warm)}%`}}></div>
                    </div>
                </div>
                
                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        <span>Frio (8-30d)</span>
                        <span>{stats.cold} ({getPct(stats.cold)}%)</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400" style={{width: `${getPct(stats.cold)}%`}}></div>
                    </div>
                </div>
                
                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        <span>Congelado ({'>'}30d)</span>
                        <span>{stats.freezing} ({getPct(stats.freezing)}%)</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-300 dark:bg-slate-700" style={{width: `${getPct(stats.freezing)}%`}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
});

// --- Topic Card ---
export const TopicCard = React.memo(({ topic, onReview, onDelete, onEdit }: { topic: Topic; onReview: (id: string, idx: number) => void; onDelete?: (id: string) => void; onEdit: () => void }) => {
    const theme = getAreaTheme(topic.area);
    const nextReviewIdx = topic.reviews.findIndex(r => !r.done);
    const nextReview = topic.reviews[nextReviewIdx];
    const prevReview = nextReviewIdx > 0 ? topic.reviews[nextReviewIdx - 1] : null;
    const errorRate = prevReview && prevReview.total > 0 ? Math.round(((prevReview.total - prevReview.correct) / prevReview.total) * 100) : null;
    const today = getTodayStr();
    const priority = getPriorityInfo(topic.importance);
    const isPico = topic.importance === 'high' || topic.importance === 'extreme';
    const isOverdue = nextReview && nextReview.date < today;

    // Calculate days since last review
    let lastReviewText = "Não iniciado";
    let heatIcon = <div className="text-slate-400" title="Frio"><Flame size={14} /></div>; // Default cold
    
    if (prevReview) {
        const prevDate = new Date(prevReview.date + 'T12:00:00');
        const todayDate = new Date(today + 'T12:00:00');
        const diffTime = Math.abs(todayDate.getTime() - prevDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            lastReviewText = "Hoje";
            heatIcon = <div className="text-red-500" title="Quente"><Flame size={14} fill="currentColor" /></div>;
        } else if (diffDays === 1) {
            lastReviewText = "Ontem";
            heatIcon = <div className="text-orange-500" title="Morno"><Flame size={14} fill="currentColor" /></div>;
        } else {
            lastReviewText = `Há ${diffDays} dias`;
            if (diffDays <= 3) heatIcon = <div className="text-orange-400" title="Morno"><Flame size={14} fill="currentColor" /></div>;
            else if (diffDays <= 7) heatIcon = <div className="text-amber-400" title="Esfriando"><Flame size={14} /></div>;
            // else remains cold (slate)
        }
    }

    const AreaIcon = getAreaIcon(topic.area);

    // Mobile Swipe Logic
    const controls = useAnimation();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleDragEnd = (event: any, info: PanInfo) => {
        if (info.offset.x > 50) {
            controls.start({ x: 100 });
        } else {
            controls.start({ x: 0 });
        }
    };

    const CardContent = () => (
        <div className={`bg-white dark:bg-zinc-900 p-4 rounded-2xl border shadow-sm relative group transition-all w-full
            ${isPico 
                ? 'border-indigo-300 dark:border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)] dark:shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                : 'border-black/5 dark:border-white/5 hover:border-slate-500/30'
            }
        `}>
            {isOverdue && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.5)]" title="Revisão Atrasada"></div>
            )}
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${theme.bg} ${theme.text}`}>
                        <AreaIcon size={16}/>
                    </div>
                    <div className="min-w-0 pr-4"> {/* Added padding right to avoid overlapping with the dot */}
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-slate-800 dark:text-white truncate">{topic.title}</h4>
                            {heatIcon}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{topic.area}</span>
                            <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full ${priority.bg} ${priority.text}`}>{priority.label}</span>
                            <span className="text-[9px] font-medium text-slate-400 flex items-center gap-1">
                                <Clock size={10}/> {lastReviewText}
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-1 shrink-0">
                    <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={onEdit} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-400 hover:text-slate-500"><Edit size={14}/></button>
                        {onDelete && (
                            <button onClick={() => onDelete(topic.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500"><Trash2 size={14}/></button>
                        )}
                    </div>
                    {nextReview && (
                        <button 
                            onClick={() => onReview(topic.id, nextReviewIdx)} 
                            className="w-8 h-8 flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-md ml-1"
                            title="Revisar"
                        >
                            <Play size={14} fill="currentColor" className="text-white dark:text-black ml-0.5" />
                        </button>
                    )}
                </div>
                
                {/* Mobile Play Button (Always visible) */}
                <div className="md:hidden flex items-center gap-1 shrink-0">
                    {nextReview && (
                        <button 
                            onClick={() => onReview(topic.id, nextReviewIdx)} 
                            className="w-8 h-8 flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-black rounded-full shadow-md ml-1"
                        >
                            <Play size={14} fill="currentColor" className="text-white dark:text-black ml-0.5" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between">
                {/* Timeline Dots */}
                <div className="flex items-center gap-1.5">
                    {topic.reviews.map((r, i) => {
                        const isDone = r.done;
                        const isToday = r.date === today;
                        const isNext = !isDone && i === nextReviewIdx;
                        
                        let dotColor = 'bg-slate-200 dark:bg-zinc-700'; // Future
                        if (isDone) dotColor = 'bg-emerald-500';
                        else if (isToday || isNext) dotColor = 'bg-slate-500';

                        return (
                            <Tooltip
                                key={i}
                                content={
                                    <div className="bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-xl border border-white/10">
                                        {r.label} ({formatDate(r.date)})
                                        {/* Show questions count */}
                                        <div className="text-[8px] text-slate-400 font-normal mt-0.5">
                                            {r.done ? `${r.correct}/${r.total} acertos (${r.total > 0 ? Math.round((r.correct/r.total)*100) : 0}%)` : `${r.targetQ} questões`}
                                        </div>
                                    </div>
                                }
                            >
                                <div className="flex items-center">
                                    <div className={`w-2 h-2 rounded-full ${dotColor} ${isNext ? 'ring-2 ring-slate-500/30' : ''}`} />
                                    {i < topic.reviews.length - 1 && (
                                        <div className={`w-3 h-px ${isDone ? 'bg-emerald-500/50' : 'bg-slate-200 dark:bg-zinc-700'}`} />
                                    )}
                                </div>
                            </Tooltip>
                        );
                    })}
                </div>

                {/* Next Target & Error Rate */}
                <div className="flex items-center gap-2">
                    {errorRate !== null && (
                        <div className="text-[9px] font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <AlertCircle size={10}/> {errorRate}% Erro
                        </div>
                    )}
                    {nextReview && (
                        <div className="text-[9px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Target size={10}/> {nextReview.targetQ}q
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative group overflow-hidden rounded-2xl">
            {/* Mobile Actions (Left) - Revealed on Swipe Right */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 gap-2 md:hidden z-0 w-full bg-slate-100 dark:bg-zinc-800/50">
                 <button onClick={onEdit} className="p-2 bg-white dark:bg-zinc-700 rounded-full text-slate-600 dark:text-white shadow-sm"><Edit size={18}/></button>
                 {onDelete && <button onClick={() => onDelete(topic.id)} className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-500 shadow-sm"><Trash2 size={18}/></button>}
            </div>

            <motion.div
                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 100 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                animate={controls}
                className="relative z-10"
            >
                <CardContent />
            </motion.div>
        </div>
    );
});

// --- Simulados Mini Widget with Actions ---
export const SimuladosMiniWidget = React.memo(({ simulados, targetAccuracy, onAdd }: { simulados: Simulado[], targetAccuracy: number, onAdd: () => void }) => {
    const displayData = useMemo(() => {
        if (!simulados || simulados.length === 0) return null;
        const sorted = [...simulados].sort((a,b) => new Date(a.dateTaken).getTime() - new Date(b.dateTaken).getTime());
        const last10 = sorted.slice(-10); 
        const avg = Math.round(sorted.reduce((acc, s) => acc + ((s.correctCount || 0) / (s.totalQuestions || 1)), 0) / sorted.length * 100);
        return { avg, history: last10 };
    }, [simulados]);

    return (
        <div className="glass-panel p-6 rounded-[32px] shadow-sm h-full flex flex-col relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4 relative z-10">
                <div className="flex flex-col">
                    <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-xs uppercase tracking-wide"><ClipboardList size={16} className="text-purple-500"/> Simulados</h3>
                    {displayData && <span className="text-[10px] font-bold text-slate-400 mt-1">Média Geral: <span className={getPerformanceColor(displayData.avg, targetAccuracy, 'text')}>{displayData.avg}%</span></span>}
                </div>
                <button onClick={onAdd} className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-xl hover:scale-105 active:scale-95 transition-all">
                    <Plus size={18}/>
                </button>
            </div>
            
            {displayData ? (
                <div className="flex-1 flex flex-col justify-end">
                    <div className="flex items-end gap-1.5 h-20 w-full relative z-10">
                        {displayData.history.map((s, i) => {
                            const acc = Math.round(((s.correctCount || 0) / (s.totalQuestions || 1)) * 100);
                            const colorClass = getPerformanceColor(acc, targetAccuracy, 'bg');
                            
                            return (
                                <div key={s.id} className="flex-1 flex flex-col justify-end gap-1 group/bar relative h-full z-10">
                                    <div className={`w-full rounded-t-sm transition-all duration-500 ${colorClass} opacity-80 group-hover/bar:opacity-100 origin-bottom`} style={{height: `${acc}%`}}></div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Recent List */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
                        {displayData.history.slice(-2).reverse().map(s => (
                            <div key={s.id} className="flex justify-between items-center text-[10px]">
                                <span className="font-bold text-slate-600 dark:text-slate-300 truncate max-w-[120px]">{s.name} {s.year}</span>
                                <span className={`font-black ${getPerformanceColor((s.correctCount/s.totalQuestions)*100, targetAccuracy, 'text')}`}>{Math.round((s.correctCount/s.totalQuestions)*100)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
                    <ClipboardList className="mx-auto text-slate-300 mb-2" size={24}/>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">Sem simulados</p>
                    <button onClick={onAdd} className="text-[10px] text-purple-500 font-bold hover:underline">Adicionar Primeiro</button>
                </div>
            )}
            
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full z-0 pointer-events-none"></div>
        </div>
    );
});
