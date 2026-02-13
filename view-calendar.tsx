
import React, { useState, useEffect, useRef } from 'react';
import { CalendarCheck, ChevronLeft, ChevronRight, ClipboardList, Flag, BookOpen, CheckCircle2, Calendar as CalendarIcon, AlignJustify, X } from 'lucide-react';
import { Topic, Simulado, UserConfig } from './types';
import { getTodayStr, formatFullDate } from './utils';
import { useCalendar } from './hooks';

export const CalendarView = ({ topics, simulados, onOpenReview, config, viewMode = 'calendar', setViewMode }: { topics: Topic[], simulados: Simulado[], onOpenReview: (id: string, idx: number) => void, config: UserConfig, viewMode?: 'calendar' | 'list', setViewMode?: (v: 'calendar' | 'list') => void }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    // Internal state backup if prop not provided (for desktop compatibility)
    const [internalViewMode, setInternalViewMode] = useState<'calendar' | 'list'>('calendar');
    const actualViewMode = viewMode || internalViewMode;
    const handleSetViewMode = setViewMode || setInternalViewMode;

    const [activeDropdownDay, setActiveDropdownDay] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const { monthData, daysInMonth, firstDay, timelineDays } = useCalendar(topics, simulados, currentDate);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdownDay(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const handleToday = () => setCurrentDate(new Date());

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
             <div className="flex flex-row items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-4">
                     <h3 className="hidden sm:flex text-3xl font-black text-slate-800 dark:text-white tracking-tight items-center gap-3"><CalendarCheck size={28} className="text-blue-500"/> Agenda</h3>
                     {/* Desktop Toggle (Hidden on Mobile) */}
                     <div className="hidden lg:flex bg-slate-100 dark:bg-[#18181b] p-1 rounded-lg shrink-0 border border-transparent dark:border-white/5">
                        <button onClick={() => handleSetViewMode('calendar')} className={`p-1.5 rounded-md transition-all ${actualViewMode === 'calendar' ? 'bg-white dark:bg-zinc-800 shadow-sm text-blue-500' : 'text-slate-400'}`}><CalendarIcon size={16}/></button>
                        <button onClick={() => handleSetViewMode('list')} className={`p-1.5 rounded-md transition-all ${actualViewMode === 'list' ? 'bg-white dark:bg-zinc-800 shadow-sm text-blue-500' : 'text-slate-400'}`}><AlignJustify size={16}/></button>
                     </div>
                </div>
                
                {actualViewMode === 'calendar' && (
                    <div className="flex items-center gap-1 bg-white dark:bg-[#18181b] p-1 rounded-lg border border-black/5 dark:border-white/5 shadow-sm sm:self-auto flex-1 sm:flex-none justify-between sm:justify-start">
                        <button onClick={handlePrevMonth} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400"><ChevronLeft size={16}/></button>
                        <button onClick={handleToday} className="px-2 py-1.5 text-xs font-black uppercase text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg whitespace-nowrap">{new Date(year, month).toLocaleString('default', { month: 'short' }).replace('.', '')} {year}</button>
                        <button onClick={handleNextMonth} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400"><ChevronRight size={16}/></button>
                    </div>
                )}
            </div>

            {actualViewMode === 'calendar' ? (
                <div className="flex flex-col gap-4 flex-1 min-h-0 relative">
                    {/* Calendar Grid */}
                    <div className="bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-200 dark:border-white/5 shadow-sm overflow-visible flex flex-col shrink-0">
                        <div className="grid grid-cols-7 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
                            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                                <div key={d} className="py-3 text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">{d}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 grid-rows-6" ref={dropdownRef}>
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
                                const isExamDay = dateStr === config.examDate;
                                const totalItems = dayData.reviews.length + dayData.sims.length;
                                const isActive = activeDropdownDay === dateStr;
                                const isRightSide = (i + firstDay) % 7 > 3; // Detect if column is on the right side to flip dropdown

                                return (
                                    <div 
                                        key={day} 
                                        className={`border-b border-r border-slate-100 dark:border-white/5 relative group min-h-[40px] sm:min-h-[60px] 
                                            ${isToday ? 'bg-blue-50/30 dark:bg-blue-900/5' : ''}
                                            ${isActive ? 'z-20 bg-slate-100 dark:bg-white/5' : 'hover:bg-slate-50 dark:hover:bg-white/[0.03]'}
                                        `}
                                    >
                                        <div 
                                            onClick={() => setActiveDropdownDay(isActive ? null : dateStr)}
                                            className="w-full h-full p-1 sm:p-2 cursor-pointer"
                                        >
                                            <div className="flex justify-center sm:justify-between items-start">
                                                <span className={`text-[10px] sm:text-xs font-bold flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full ${isToday ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400'} ${isActive && !isToday ? 'bg-slate-200 dark:bg-white/20 text-slate-800 dark:text-white' : ''}`}>{day}</span>
                                                {/* Dots for mobile */}
                                                <div className="flex sm:hidden gap-0.5 mt-1 absolute bottom-1 left-1/2 -translate-x-1/2">
                                                    {totalItems > 0 && <div className={`w-1 h-1 rounded-full ${dayData.sims.length > 0 ? 'bg-purple-500' : 'bg-blue-400'}`}></div>}
                                                </div>
                                            </div>
                                            
                                            {/* Desktop Content Preview */}
                                            <div className="hidden sm:block space-y-1 mt-1">
                                                {totalItems > 0 && (
                                                    <div className="text-[9px] font-bold text-slate-400 pl-1">
                                                        {totalItems} itens
                                                    </div>
                                                )}
                                                {isExamDay && <div className="text-[8px] font-bold text-amber-500 uppercase px-1">Prova!</div>}
                                            </div>
                                        </div>

                                        {/* DROPDOWN POPOVER */}
                                        {isActive && (
                                            <div className={`absolute top-[90%] ${isRightSide ? 'right-0 origin-top-right' : 'left-0 origin-top-left'} w-64 bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-[0_10px_40px_-5px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-white/10 p-3 z-50 animate-scale-in flex flex-col gap-2`}>
                                                <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-white/5">
                                                    <div>
                                                        <h4 className="text-xs font-black text-slate-800 dark:text-white">{formatFullDate(dateStr)}</h4>
                                                        {isExamDay && <span className="text-[9px] font-bold text-amber-500 uppercase">Dia da Prova</span>}
                                                    </div>
                                                    <button onClick={() => setActiveDropdownDay(null)} className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full"><X size={14} className="text-slate-400"/></button>
                                                </div>
                                                
                                                <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1.5">
                                                    {totalItems === 0 && (
                                                        <div className="text-center py-4 text-[10px] text-slate-400 font-bold">Nada agendado.</div>
                                                    )}
                                                    {dayData.sims.map((s: any) => (
                                                        <div key={s.id} className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-500/20 flex items-start gap-2">
                                                            <ClipboardList size={12} className="text-purple-500 mt-0.5"/>
                                                            <div>
                                                                <div className="text-[10px] font-bold text-slate-800 dark:text-white leading-tight">{s.name}</div>
                                                                <div className="text-[9px] text-slate-500 dark:text-slate-400">{s.year}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {dayData.reviews.map((r: any) => (
                                                        <div key={r.topicId + r.idx} className="p-2 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30 flex items-center justify-between group">
                                                            <div className="flex items-start gap-2 min-w-0">
                                                                <div className={`mt-0.5 ${r.done ? 'text-emerald-500' : 'text-blue-500'}`}>
                                                                    {r.done ? <CheckCircle2 size={12}/> : <BookOpen size={12}/>}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <div className="text-[10px] font-bold text-slate-800 dark:text-white leading-tight truncate">{r.topicTitle}</div>
                                                                    <div className="text-[9px] text-slate-500 dark:text-slate-400">{r.label}</div>
                                                                </div>
                                                            </div>
                                                            {!r.done && (
                                                                <button onClick={() => onOpenReview(r.topicId, r.idx)} className="opacity-0 group-hover:opacity-100 p-1 bg-slate-900 dark:bg-white text-white dark:text-black rounded text-[9px] font-bold">Go</button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Backdrop for mobile focus */}
                    {activeDropdownDay && <div className="fixed inset-0 bg-black/20 z-10 sm:hidden" onClick={() => setActiveDropdownDay(null)}></div>}
                </div>
            ) : (
                <div className="flex-1 bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
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
