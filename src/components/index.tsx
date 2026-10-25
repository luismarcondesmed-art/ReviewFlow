import { EvolutionChart } from './StudyCharts';
export { EvolutionChart, HeatmapWidget, FutureLoadWidget, RetentionWidget } from './StudyCharts';

import { motion,PanInfo,useAnimation } from 'framer-motion';
import { Activity,AlertCircle,Award,BarChart2,BookOpen,BrainCircuit,Calendar,ChevronDown,ChevronLeft,ChevronRight,ClipboardList,Clock,Crown,Edit,Flame,Flower2,GraduationCap,Medal,Microscope,Play,Plus,Shield,Sparkles,Star,Stethoscope,Target,Trash2,TrendingUp,Trophy,User,Zap } from 'lucide-react';
import React,{ useEffect,useMemo,useRef,useState } from 'react';
import { createPortal } from 'react-dom';
import { AreaType,Simulado,Topic } from '../types';
import { APP_VERSION,AREAS,calculateDetailedStats,formatDate,getAreaTheme,getImportanceWeight,getLevelInfo,getPerformanceColor,getPriorityInfo,getTodayStr } from '../utils';

export const getAreaIcon = (area: AreaType) => {
    switch (area) {
        case 'geral': return BookOpen;
        case 'tecnico': return Activity;
        case 'idiomas': return Flower2;
        case 'exatas': return Zap;
        case 'humanas': return Microscope;
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
    if (level < 10) return { label: 'Iniciante', icon: BookOpen, color: 'text-slate-400', bg: 'from-slate-700 to-slate-900' };
    if (level < 20) return { label: 'Aprendiz', icon: Microscope, color: 'text-indigo-400', bg: 'from-indigo-600 to-indigo-900' };
    if (level < 30) return { label: 'Estudante', icon: Activity, color: 'text-cyan-400', bg: 'from-cyan-600 to-cyan-900' };
    if (level < 40) return { label: 'Aplicado', icon: Target, color: 'text-teal-400', bg: 'from-teal-600 to-teal-900' };
    if (level < 50) return { label: 'Focado', icon: Star, color: 'text-amber-400', bg: 'from-amber-600 to-amber-900' };
    if (level < 60) return { label: 'Constante', icon: Medal, color: 'text-orange-400', bg: 'from-orange-600 to-orange-900' };
    if (level < 70) return { label: 'Avançado', icon: Award, color: 'text-rose-400', bg: 'from-rose-600 to-rose-900' };
    if (level < 80) return { label: 'Especialista', icon: Trophy, color: 'text-emerald-400', bg: 'from-emerald-600 to-emerald-900' };
    if (level < 90) return { label: 'Mestre', icon: Crown, color: 'text-fuchsia-400', bg: 'from-fuchsia-600 to-fuchsia-900' };
    if (level < 100) return { label: 'Grão-Mestre', icon: Zap, color: 'text-purple-400', bg: 'from-purple-600 to-purple-900' };
    return { label: 'Lenda', icon: Crown, color: 'text-violet-400', bg: 'from-violet-600 to-violet-900' };
};



// --- Compact Level System (Sidebar) ---
import { calculateStreak } from '../utils';

export const USER_AVATAR_ICONS: Record<string, { label: string; icon: any }> = {
    user: { label: 'Padrão', icon: User },
    stethoscope: { label: 'Médico', icon: Stethoscope },
    graduation: { label: 'Residência', icon: GraduationCap },
    brain: { label: 'Cérebro', icon: BrainCircuit },
    trophy: { label: 'Troféu', icon: Trophy },
    flame: { label: 'Foco', icon: Flame },
    sparkles: { label: 'Brilho', icon: Sparkles },
    target: { label: 'Alvo', icon: Target },
    book: { label: 'Estudo', icon: BookOpen },
    award: { label: 'Mérito', icon: Award },
    zap: { label: 'Agilidade', icon: Zap },
    shield: { label: 'Proteção', icon: Shield },
    microscope: { label: 'Ciência', icon: Microscope },
    activity: { label: 'Vitalidade', icon: Activity },
};

export const UserStatsDropdown = React.memo(({ 
    totalXP, 
    totalQuestions, 
    topics, 
    simulados, 
    userRole,
    userIcon = 'user',
    onSelectUserIcon,
    dropPosition = 'up',
    size = 'md'
}: { 
    totalXP: number; 
    totalQuestions: number; 
    topics: Topic[]; 
    simulados: Simulado[]; 
    userRole: string;
    userIcon?: string;
    onSelectUserIcon?: (icon: string) => void;
    dropPosition?: 'up' | 'down';
    size?: 'sm' | 'md';
}) => {
    const { level, currentXP, nextLevelXP, progress } = getLevelInfo(totalXP);
    const rank = getRankInfo(level);
    const RankIcon = rank.icon;
    const [isOpen, setIsOpen] = useState(false);
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [selectedIconKey, setSelectedIconKey] = useState<string>(() => {
        return userIcon || 'user';
    });
    const streak = calculateStreak(topics, simulados);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => setSelectedIconKey(userIcon || 'user'), [userIcon]);

    const CurrentAvatarIcon = USER_AVATAR_ICONS[selectedIconKey]?.icon || User;

    const handleSelectIcon = (key: string) => {
        setSelectedIconKey(key);
        if (onSelectUserIcon) onSelectUserIcon(key);
    };

    // Fechar ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setShowIconPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative flex justify-end" ref={dropdownRef}>
            {/* Trigger Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Perfil do Usuário"
                title="Meu Perfil e Estatísticas"
                className={`flex items-center justify-center ${size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'} rounded-full transition-all duration-300 border ${isOpen ? 'bg-white/10 border-white/10 ring-2 ring-blue-500/30' : 'bg-slate-50 dark:bg-slate-200/5 border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10'}`}
            >
                <div className={`${size === 'sm' ? 'w-7 h-7' : 'w-8 h-8'} rounded-full bg-gradient-to-br ${rank.bg} flex items-center justify-center text-slate-100 shadow-sm relative`}>
                    <CurrentAvatarIcon size={size === 'sm' ? 14 : 16} fill="currentColor" className="opacity-95"/>
                </div>
            </button>

            {/* Popover / Dropdown */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-[95]" onClick={() => { setIsOpen(false); setShowIconPicker(false); }} />
                    <div className={`absolute ${dropPosition === 'down' ? 'top-full right-0 mt-2 origin-top-right' : 'bottom-full left-0 mb-2 origin-bottom-left'} w-72 p-4 bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl animate-scale-in z-[100]`}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rank.bg} flex items-center justify-center text-white shadow-md relative`}>
                            <CurrentAvatarIcon size={24} fill="currentColor" className="opacity-95"/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{rank.label}</div>
                            <div className="text-lg font-black text-slate-800 dark:text-slate-200 truncate">Nível {level}</div>
                            <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-0.5">{userRole === 'admin' ? 'Administrador' : userRole === 'colaborador' ? 'Colaborador' : 'Estudante'}</div>
                        </div>
                    </div>

                    {/* Choose Avatar Icon Section */}
                    <div className="mb-4 bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl border border-slate-100 dark:border-white/5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Ícone do Perfil</span>
                            <button 
                                onClick={() => setShowIconPicker(!showIconPicker)}
                                className="text-[10px] font-bold text-blue-500 hover:text-blue-600 transition-colors uppercase tracking-wider"
                            >
                                {showIconPicker ? 'Fechar' : 'Alterar'}
                            </button>
                        </div>
                        {showIconPicker && (
                            <div className="grid grid-cols-7 gap-1.5 pt-1 border-t border-slate-200/50 dark:border-white/5 animate-fade-in">
                                {Object.entries(USER_AVATAR_ICONS).map(([key, item]) => {
                                    const IconComponent = item.icon;
                                    const isSelected = selectedIconKey === key;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => handleSelectIcon(key)}
                                            title={item.label}
                                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                                                isSelected 
                                                    ? 'bg-blue-600 text-white shadow-sm scale-110' 
                                                    : 'bg-white dark:bg-zinc-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-zinc-700'
                                            }`}
                                        >
                                            <IconComponent size={13} />
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-white/5 rounded-lg">
                            <span className="text-xs font-bold text-slate-500">Questões Realizadas</span>
                            <span className="text-sm font-black text-slate-800 dark:text-white">{totalQuestions}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-white/5 rounded-lg">
                            <span className="text-xs font-bold text-slate-500">Ofensiva de Estudos</span>
                            <span className="text-sm font-black text-orange-500 flex items-center gap-1">
                                <Flame size={14} className="fill-orange-500"/> {streak} {streak === 1 ? 'dia' : 'dias'}
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
                </>
            )}
        </div>
    );
});

export const CompactLevelSystem = React.memo(({ totalXP }: { totalXP: number }) => {
    const { level, currentXP, nextLevelXP, progress } = getLevelInfo(totalXP);
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
export const LevelSystem = React.memo(({ totalXP }: { totalXP: number }) => {
    const { level, currentXP, nextLevelXP, progress } = getLevelInfo(totalXP);
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
                            className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${range === r ? 'bg-blue-600 text-white dark:bg-blue-500 dark:text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                        >
                            {r === 'week' ? '7D' : r === 'month' ? '30D' : r === 'year' ? '1A' : 'Tudo'}
                        </button>
                    ))}
                </div>
            )}
            <div className={`grid ${compact ? 'grid-cols-2 gap-2 sm:gap-3' : 'grid-cols-2 md:grid-cols-4 gap-4'} w-full`}>
                <StatCard label="Total Hoje" value={stats.totalToday} subLabel="Questões" icon={Zap} colorClass="bg-amber-500 text-amber-500" />
                <StatCard label={`Total (${rangeLabel})`} value={stats.totalRange} subLabel="Questões" icon={BarChart2} colorClass="bg-blue-500 text-blue-500" />
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
                                                        <div className="bg-blue-600 text-white text-[9px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-xl border border-white/10">
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
                        <button onClick={() => onReview(item.topic.id, item.idx)} className="p-2 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all">
                            <ChevronRight size={18}/>
                        </button>
                    </div>
                )
            })}
        </div>
    )
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
                ? 'border-blue-300 dark:border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
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
                            {topic.hasDifficultLesson && (
                                <div className="text-amber-400" title="Contém aulas difíceis (+10% carga)">
                                    <Star size={14} fill="currentColor" />
                                </div>
                            )}
                            {heatIcon}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{AREAS.find(a => a.id === topic.area)?.name || topic.area}</span>
                            <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full ${priority.bg} ${priority.text}`}>{priority.label}</span>
                            <span className="text-[9px] font-medium text-slate-400 flex items-center gap-1">
                                <Clock size={10}/> {lastReviewText}
                            </span>
                        </div>
                        {topic.linkedLessons && topic.linkedLessons.length > 0 && (
                            <div className="mt-2 flex flex-col gap-1 w-full">
                                <span className="text-[9px] font-bold text-slate-400 uppercase">Aulas do Bloco:</span>
                                <div className="flex flex-wrap gap-1">
                                    {topic.linkedLessons.map((lesson, idx) => (
                                        <span key={idx} className="text-[10px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md border border-slate-200 dark:border-white/10 whitespace-normal text-left">
                                            {lesson.replace(/ \(~\d+q\)$/, '')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
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
                            className="w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-md ml-1"
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
                            className="w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-md ml-1"
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
                                    <div className="bg-blue-600 text-white text-[9px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-xl border border-white/10">
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
export const WeeklyGoalsWidget = React.memo(({ config, topics, simulados }: { config: any, topics: Topic[], simulados: Simulado[] }) => {
    const goals = config.weeklyGoals || [];
    
    if (goals.length === 0) {
        return (
            <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Target size={24} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">Metas Semanais</h3>
                    <p className="text-xs text-slate-500 mt-1">Defina metas em Configurações para acompanhar seu progresso.</p>
                </div>
            </div>
        );
    }

    // Calculate current week's progress
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    const startOfWeek = new Date(today.setDate(diff));
    startOfWeek.setHours(0,0,0,0);
    const startOfWeekStr = startOfWeek.toISOString().split('T')[0];

    let currentQuestions = 0;
    let currentTopics = 0;

    topics.forEach(t => {
        let topicCompletedThisWeek = false;
        t.reviews.forEach(r => {
            if (r.done && r.completedAt && r.completedAt >= startOfWeekStr) {
                currentQuestions += r.total;
                topicCompletedThisWeek = true;
            }
        });
        if (topicCompletedThisWeek) currentTopics++;
    });

    simulados.forEach(s => {
        if (s.dateTaken >= startOfWeekStr) {
            currentQuestions += s.totalQuestions || 0;
        }
    });

    return (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Target size={20} />
                </div>
                <div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-white">Metas da Semana</h3>
                    <p className="text-xs text-slate-500">Acompanhe seu progresso</p>
                </div>
            </div>
            <div className="space-y-4">
                {goals.filter((g: any) => g.target > 0).map((goal: any) => {
                    const current = goal.type === 'questions' ? currentQuestions : currentTopics;
                    const progress = Math.min(100, (current / goal.target) * 100);
                    const isCompleted = current >= goal.target;
                    return (
                        <div key={goal.id} className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-slate-700 dark:text-slate-300">
                                    {goal.type === 'questions' ? 'Questões' : 'Temas'}
                                </span>
                                <span className={`font-bold ${isCompleted ? 'text-emerald-500' : 'text-slate-500'}`}>
                                    {current} / {goal.target}
                                </span>
                            </div>
                            <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className={`h-full rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export const SimuladosMiniWidget = React.memo(({ simulados, targetAccuracy, onAdd }: { simulados: Simulado[], targetAccuracy: number, onAdd: () => void }) => (
    <section className="rf-exam-chart">
        <div className="rf-chart-toolbar"><h3>Seus últimos simulados</h3><button className="rf-secondary" onClick={onAdd}><Plus size={16}/> Registrar simulado</button></div>
        <EvolutionChart simulados={simulados} targetAccuracy={targetAccuracy} limit={10} />
    </section>
));