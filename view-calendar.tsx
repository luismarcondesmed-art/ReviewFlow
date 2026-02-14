
import React, { useState, useMemo, useEffect } from 'react';
import { CalendarCheck, ChevronLeft, ChevronRight, ClipboardList, Flag, BookOpen, CheckCircle2, X, Calendar as CalendarIcon, AlignJustify } from 'lucide-react';
import { Topic, Simulado, UserConfig } from './types';
import { getTodayStr, formatFullDate, getAreaTheme } from './utils';
import { useCalendar } from './hooks';

export const CalendarView = ({ topics, simulados, onOpenReview, config }: { topics: Topic[], simulados: Simulado[], onOpenReview: (id: string, idx: number) => void, config: UserConfig }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
    const [selectedDay, setSelectedDay] = useState<{ date: string, reviews: any[], sims: any[] } | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const { monthData, daysInMonth, firstDay, timelineDays } = useCalendar(topics, simulados, currentDate);

    // Set today as selected day initially
    useEffect(() => {
        const todayStr = getTodayStr();
        if (monthData[todayStr]) {
            setSelectedDay({ date: todayStr, ...monthData[todayStr] });
        }
    }, [monthData]);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const handleToday = () => setCurrentDate(new Date());

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
             <div className="flex flex-row items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-4">
                     <h3 className="hidden sm:flex text-3xl font-black text-slate-800 dark:text-white tracking-tight items-center gap-3"><CalendarCheck size={28} className="text-blue-500"/> Agenda</h3>
                     
                     <div className="flex bg-slate-100 dark:bg-black/40 p-1 rounded-xl shrink-0 border border-transparent dark:border-white/5">
                        <button onClick={() => setViewMode('calendar')} className={`p-2 rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-white dark:bg-zinc-800 shadow-sm text-blue-500' : 'text-slate-400 hover:text-slate-600'}`}><CalendarIcon size={18}/></button>
                        <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-zinc-800 shadow-sm text-blue-500' : 'text-slate-400 hover:text-slate-600'}`}><AlignJustify size={18}/></button>
                     </div>
                </div>
                
                {viewMode === 'calendar' && (
                    <div className="flex items-center gap-2 bg-white dark:bg-[#18181b] p-1.5 rounded-xl border border-black/5 dark:border-white/5 shadow-sm">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-50 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><ChevronLeft size={16}/></button>
                        <button onClick={handleToday} className="px-3 py-1 text-xs font-black uppercase text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 rounded-lg whitespace-nowrap transition-colors">{new Date(year, month).toLocaleString('default', { month: 'long' })} {year}</button>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-slate-50 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><ChevronRight size={16}/></button>
                    </div>
                )}
            </div>

            {viewMode === 'calendar' ? (
                <div className="flex flex-col gap-6 flex-1 min-h-0">
                    {/* Modern Grid Calendar */}
                    <div className="bg-white dark:bg-zinc-900 rounded-[32px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden flex flex-col shrink-0 p-4">
                        <div className="grid grid-cols-7 mb-2">
                            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                                <div key={d} className="py-2 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1 sm:gap-2">
                            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className="aspect-square"></div>)}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const d = new Date(year, month, day);
                                const y = d.getFullYear();
                                const m = String(d.getMonth() + 1).padStart(2, '0');
                                const dd = String(d.getDate()).padStart(2, '0');
                                const dateStr = `${y}-${m}-${dd}`;

                                const dayData = monthData[dateStr] || { reviews: [], sims: [] };
                                const isToday = dateStr === getTodayStr();
                                const isSelected = selectedDay?.date === dateStr;
                                const hasReviews = dayData.reviews.length > 0;
                                const hasSims = dayData.sims.length > 0;
                                const isExam = dateStr === config.examDate;

                                return (
                                    <div 
                                        key={day} 
                                        onClick={() => setSelectedDay({ date: dateStr, ...dayData })}
                                        className={`aspect-square relative rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group
                                            ${isSelected 
                                                ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg scale-105 z-10' 
                                                : 'hover:bg-slate-50 dark:hover:bg-white/10 bg-transparent text-slate-700 dark:text-slate-300'
                                            }
                                            ${isToday && !isSelected ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''}
                                        `}
                                    >
                                        <span className={`text-sm font-bold ${isExam && !isSelected ? 'text-amber-500' : ''}`}>{day}</span>
                                        
                                        {/* Indicators */}
                                        <div className="flex gap-1 mt-1">
                                            {hasReviews && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/50 dark:bg-black/30' : 'bg-blue-400'}`}></div>}
                                            {hasSims && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/50 dark:bg-black/30' : 'bg-purple-400'}`}></div>}
                                            {isExam && !hasReviews && !hasSims && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/50 dark:bg-black/30' : 'bg-amber-400'}`}></div>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Details Panel */}
                    <div className="flex-1 bg-white dark:bg-zinc-900 rounded-[32px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden flex flex-col min-h-0 animate-slide-up">
                        <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20 flex justify-between items-center backdrop-blur-sm">
                            <div>
                                <h4 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
                                    {selectedDay ? formatFullDate(selectedDay.date) : 'Selecione um dia'}
                                </h4>
                            </div>
                            {selectedDay?.date === config.examDate && (
                                <div className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                                    <Flag size={12}/> Dia da Prova
                                </div>
                            )}
                        </div>
                        
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-3">
                            {!selectedDay || (selectedDay.reviews.length === 0 && selectedDay.sims.length === 0) ? (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 py-8 opacity-60">
                                    <CalendarIcon size={40} className="mb-3 opacity-20"/>
                                    <p className="text-xs font-bold">Agenda livre</p>
                                </div>
                            ) : (
                                <>
                                    {selectedDay.sims.map((s: any) => (
                                        <div key={s.id} className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-500/20">
                                            <div className="p-3 bg-white dark:bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400 shadow-sm"><ClipboardList size={20}/></div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-800 dark:text-white">{s.name}</div>
                                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Simulado • {s.year}</div>
                                            </div>
                                        </div>
                                    ))}
                                    {selectedDay.reviews.map((r: any) => {
                                         const theme = getAreaTheme(r.area || 'clinica'); // We need area here, passed down or default
                                         return (
                                            <div key={r.topicId + r.idx} className="flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm group hover:border-blue-200 dark:hover:border-blue-500/30 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-xl ${r.done ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600' : 'bg-slate-100 dark:bg-white/10 text-slate-500'}`}>
                                                        {r.done ? <CheckCircle2 size={20}/> : <BookOpen size={20}/>}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">{r.topicTitle}</div>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase">{r.label}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {!r.done && (
                                                    <button 
                                                        onClick={() => onOpenReview(r.topicId, r.idx)}
                                                        className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md"
                                                    >
                                                        REVISAR
                                                    </button>
                                                )}
                                            </div>
                                         )
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 bg-white dark:bg-zinc-900 rounded-[32px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
                     <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-black/20">
                        <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500">Timeline (30 Dias)</h4>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 relative">
                         {/* Timeline Line */}
                         <div className="absolute left-[2.35rem] top-6 bottom-6 w-0.5 bg-slate-100 dark:bg-white/10"></div>

                        {timelineDays.length === 0 ? (
                             <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                <CalendarIcon size={48} className="mb-4 opacity-20"/>
                                <p className="text-sm font-bold">Nenhuma atividade prevista</p>
                            </div>
                        ) : timelineDays.map((day, i) => (
                             <div key={i} className="relative pl-12">
                                {/* Date Bubble */}
                                <div className={`absolute left-0 top-0 w-16 flex flex-col items-center justify-center p-2 rounded-xl border border-slate-100 dark:border-white/10 z-10 ${day.isToday ? 'bg-blue-600 text-white shadow-lg border-blue-600' : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-300'}`}>
                                     <span className="text-xl font-black leading-none">{day.date.split('-')[2]}</span>
                                     <span className="text-[9px] font-bold uppercase opacity-80">{new Date(day.date + 'T12:00:00').toLocaleString('default', { month: 'short' })}</span>
                                </div>
                                
                                <div className="space-y-3 pt-1">
                                     {day.date === config.examDate && (
                                         <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-500/20">
                                            <div className="p-2 bg-amber-100 dark:bg-amber-500/20 rounded-lg text-amber-600 dark:text-amber-400"><Flag size={18} fill="currentColor"/></div>
                                            <div className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Dia da Prova</div>
                                        </div>
                                     )}
                                     {day.sims.map((s: any) => (
                                         <div key={s.id} className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-500/20">
                                            <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400"><ClipboardList size={18}/></div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-800 dark:text-white">{s.name}</div>
                                                <div className="text-[10px] font-bold text-slate-400">Simulado • {s.year}</div>
                                            </div>
                                        </div>
                                     ))}
                                     {day.reviews.map((r: any) => (
                                         <div key={r.topicId + r.idx} className="flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:border-blue-200 dark:hover:border-blue-500/30 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2.5 rounded-xl ${r.done ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600' : 'bg-slate-100 dark:bg-white/10 text-slate-500'}`}>
                                                    {r.done ? <CheckCircle2 size={18}/> : <BookOpen size={18}/>}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">{r.topicTitle}</div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{r.label}</div>
                                                </div>
                                            </div>
                                            {!r.done && (
                                                <button 
                                                    onClick={() => onOpenReview(r.topicId, r.idx)}
                                                    className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md"
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
        </div>
    );
};
