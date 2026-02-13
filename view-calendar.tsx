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
             <div className="flex flex-row items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-4">
                     <h3 className="hidden sm:flex text-3xl font-black text-slate-800 dark:text-white tracking-tight items-center gap-3"><CalendarCheck size={28} className="text-blue-500"/> Agenda</h3>
                     <div className="flex bg-slate-100 dark:bg-[#18181b] p-1 rounded-lg shrink-0 border border-transparent dark:border-white/5">
                        <button onClick={() => setViewMode('calendar')} className={`p-1.5 rounded-md transition-all ${viewMode === 'calendar' ? 'bg-white dark:bg-zinc-800 shadow-sm text-blue-500' : 'text-slate-400'}`}><CalendarIcon size={16}/></button>
                        <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-zinc-800 shadow-sm text-blue-500' : 'text-slate-400'}`}><AlignJustify size={16}/></button>
                     </div>
                </div>
                
                {viewMode === 'calendar' && (
                    <div className="flex items-center gap-1 bg-white dark:bg-[#18181b] p-1 rounded-lg border border-black/5 dark:border-white/5 shadow-sm sm:self-auto flex-1 sm:flex-none justify-between sm:justify-start">
                        <button onClick={handlePrevMonth} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400"><ChevronLeft size={16}/></button>
                        <button onClick={handleToday} className="px-2 py-1.5 text-xs font-black uppercase text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg whitespace-nowrap">{new Date(year, month).toLocaleString('default', { month: 'short' }).replace('.', '')} {year}</button>
                        <button onClick={handleNextMonth} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400"><ChevronRight size={16}/></button>
                    </div>
                )}
            </div>

            {viewMode === 'calendar' ? (
                <div className="flex flex-col gap-4 flex-1 min-h-0">
                    {/* Calendar Grid */}
                    <div className="bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden flex flex-col shrink-0">
                        <div className="grid grid-cols-7 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
                            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                                <div key={d} className="py-3 text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">{d}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 grid-rows-6">
                            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className="border-b border-r border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/[0.02] min-h-[40px] sm:min-h-[60px]"></div>)}
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
                                const hasContent = dayData.reviews.length > 0 || dayData.sims.length > 0;
                                const totalItems = dayData.reviews.length + dayData.sims.length;

                                return (
                                    <div 
                                        key={day} 
                                        onClick={() => setSelectedDay({ date: dateStr, ...dayData })}
                                        className={`border-b border-r border-slate-100 dark:border-white/5 p-1 sm:p-2 relative group transition-all cursor-pointer min-h-[40px] sm:min-h-[60px] 
                                            ${isSelected ? 'bg-blue-50/80 dark:bg-blue-900/20 ring-inset ring-2 ring-blue-500/50 z-10' : ''}
                                            ${isToday && !isSelected ? 'bg-blue-50/30 dark:bg-blue-900/5' : ''}
                                        `}
                                    >
                                        <div className="flex justify-center sm:justify-between items-start">
                                            <span className={`text-[10px] sm:text-xs font-bold flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full ${isToday ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500'} ${isSelected && !isToday ? 'text-blue-500' : ''}`}>{day}</span>
                                            {/* Dots for mobile */}
                                            <div className="flex sm:hidden gap-0.5 mt-1 absolute bottom-1 left-1/2 -translate-x-1/2">
                                                {hasContent && <div className={`w-1 h-1 rounded-full ${dayData.sims.length > 0 ? 'bg-purple-500' : 'bg-blue-400'}`}></div>}
                                            </div>
                                        </div>
                                        
                                        {/* Desktop Content Preview */}
                                        <div className="hidden sm:block space-y-1 mt-1">
                                            {totalItems > 0 && (
                                                <div className="text-[9px] font-bold text-slate-400 pl-1">
                                                    {totalItems} itens
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Details Panel (Split View) */}
                    <div className="flex-1 bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden flex flex-col min-h-0 animate-slide-up">
                        <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20 flex justify-between items-center">
                            <div>
                                <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">
                                    {selectedDay ? formatFullDate(selectedDay.date) : 'Selecione um dia'}
                                </h4>
                                <p className="text-[10px] font-bold text-slate-400">Detalhes do Dia</p>
                            </div>
                            {selectedDay?.date === config.examDate && (
                                <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                                    <Flag size={12}/> Dia da Prova
                                </div>
                            )}
                        </div>
                        
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                            {!selectedDay || (selectedDay.reviews.length === 0 && selectedDay.sims.length === 0) ? (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 py-8">
                                    <CalendarIcon size={32} className="mb-3 opacity-20"/>
                                    <p className="text-xs font-bold">Nenhuma atividade para este dia.</p>
                                </div>
                            ) : (
                                <>
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
                                                    onClick={() => onOpenReview(r.topicId, r.idx)}
                                                    className="px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-bold rounded-lg"
                                                >
                                                    Revisar
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
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
        </div>
    );
};
