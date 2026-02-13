
import React, { useState, useMemo, useEffect } from 'react';
import { CalendarCheck, ChevronLeft, ChevronRight, ClipboardList, Flag, BookOpen, CheckCircle2, X, Calendar as CalendarIcon, AlignJustify } from 'lucide-react';
import { Topic, Simulado, UserConfig } from './types';
import { getTodayStr, formatFullDate, getAreaTheme } from './utils';
import { useCalendar } from './hooks';

export const CalendarView = ({ topics, simulados, onOpenReview, config }: { topics: Topic[], simulados: Simulado[], onOpenReview: (id: string, idx: number) => void, config: UserConfig }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<{ date: string, reviews: any[], sims: any[] } | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const { monthData, daysInMonth, firstDay } = useCalendar(topics, simulados, currentDate);

    // Set today as selected day initially if not set
    useEffect(() => {
        if (!selectedDay) {
            const todayStr = getTodayStr();
            if (monthData[todayStr]) {
                setSelectedDay({ date: todayStr, ...monthData[todayStr] });
            } else {
                setSelectedDay({ date: todayStr, reviews: [], sims: [] });
            }
        }
    }, [monthData]);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const handleToday = () => {
        const now = new Date();
        setCurrentDate(now);
        const todayStr = getTodayStr();
        setSelectedDay({ date: todayStr, ...(monthData[todayStr] || { reviews: [], sims: [] }) });
    };

    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    return (
        <div className="h-full flex flex-col pb-20 animate-scale-in gap-4">
            {/* Header */}
            <div className="flex items-center justify-between px-2">
                <h3 className="hidden sm:flex text-3xl font-black text-slate-800 dark:text-white tracking-tight items-center gap-3">
                    <CalendarCheck size={28} className="text-blue-500"/> Agenda
                </h3>
                
                <div className="flex items-center gap-2 bg-white dark:bg-[#18181b] p-1 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm w-full sm:w-auto justify-between">
                    <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl text-slate-500 dark:text-slate-400 transition-colors"><ChevronLeft size={18}/></button>
                    <button onClick={handleToday} className="px-4 py-2 text-sm font-black uppercase text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                        {new Date(year, month).toLocaleString('default', { month: 'long' })} {year}
                    </button>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl text-slate-500 dark:text-slate-400 transition-colors"><ChevronRight size={18}/></button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
                {/* Calendar Grid */}
                <div className="lg:w-7/12 xl:w-8/12 bg-white dark:bg-[#18181b] rounded-[32px] p-6 border border-black/5 dark:border-white/5 shadow-sm flex flex-col">
                    <div className="grid grid-cols-7 mb-4">
                        {weekDays.map((d, i) => (
                            <div key={i} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 grid-rows-6 gap-1 sm:gap-2 flex-1">
                        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`}></div>)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const d = new Date(year, month, day);
                            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                            
                            const dayData = monthData[dateStr] || { reviews: [], sims: [] };
                            const isToday = dateStr === getTodayStr();
                            const isSelected = selectedDay?.date === dateStr;
                            const isExamDay = dateStr === config.examDate;
                            
                            const reviewCount = dayData.reviews.filter((r:any) => !r.done).length;
                            const doneCount = dayData.reviews.filter((r:any) => r.done).length;
                            const simCount = dayData.sims.length;

                            return (
                                <div 
                                    key={day} 
                                    onClick={() => setSelectedDay({ date: dateStr, ...dayData })}
                                    className={`
                                        aspect-square relative rounded-2xl flex flex-col items-center justify-start pt-2 cursor-pointer transition-all duration-200 border
                                        ${isSelected 
                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-transparent shadow-lg scale-105 z-10' 
                                            : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                                        }
                                        ${isToday && !isSelected ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 border-blue-100 dark:border-blue-500/20' : ''}
                                        ${isExamDay && !isSelected ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-500/20' : ''}
                                    `}
                                >
                                    <span className={`text-sm font-bold ${isToday && !isSelected ? 'text-blue-600 dark:text-blue-400' : ''}`}>{day}</span>
                                    
                                    {isExamDay && (
                                        <div className="absolute top-1 right-1">
                                            <Flag size={10} className={`${isSelected ? 'text-white dark:text-black' : 'text-amber-500 fill-amber-500'}`}/>
                                        </div>
                                    )}

                                    {/* Dots Indicator */}
                                    <div className="flex gap-1 mt-1 flex-wrap justify-center px-1">
                                        {/* Pending Reviews Dot */}
                                        {reviewCount > 0 && (
                                            <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/50 dark:bg-black/50' : 'bg-blue-500'}`}></div>
                                        )}
                                        {/* Completed Reviews Dot (Green) */}
                                        {doneCount > 0 && (
                                            <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/50 dark:bg-black/50' : 'bg-emerald-500'}`}></div>
                                        )}
                                        {/* Simulados Dot (Purple) */}
                                        {simCount > 0 && (
                                            <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/50 dark:bg-black/50' : 'bg-purple-500'}`}></div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Details Panel */}
                <div className="lg:w-5/12 xl:w-4/12 flex flex-col h-full bg-white dark:bg-[#18181b] rounded-[32px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden animate-slide-up">
                    <div className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
                        <div>
                            <h4 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                                {selectedDay ? formatFullDate(selectedDay.date) : 'Selecione um dia'}
                            </h4>
                            {selectedDay?.date === getTodayStr() && (
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">Hoje</span>
                            )}
                        </div>
                        {selectedDay?.date === config.examDate && (
                            <div className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                                <Flag size={14}/> Dia da Prova
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                        {!selectedDay || (selectedDay.reviews.length === 0 && selectedDay.sims.length === 0 && selectedDay.date !== config.examDate) ? (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400 py-10 opacity-60">
                                <CalendarIcon size={48} className="mb-4 opacity-20"/>
                                <p className="text-sm font-bold">Agenda livre</p>
                            </div>
                        ) : (
                            <>
                                {selectedDay.sims.map((s: any) => (
                                    <div key={s.id} className="group flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-500/20 transition-transform active:scale-95">
                                        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-sm">
                                            <ClipboardList size={20}/>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-800 dark:text-white">{s.name}</div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Simulado • {s.year}</div>
                                        </div>
                                    </div>
                                ))}
                                
                                {selectedDay.reviews.map((r: any) => (
                                    <div key={r.topicId + r.idx} className="group flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all">
                                        <div className="flex items-center gap-4 overflow-hidden">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 transition-colors ${r.done ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600' : 'bg-slate-100 dark:bg-white/10 text-slate-500'}`}>
                                                {r.done ? <CheckCircle2 size={20}/> : <BookOpen size={20}/>}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-xs font-bold text-slate-800 dark:text-white truncate pr-2">{r.topicTitle}</div>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{r.label.split(':')[0]}</span>
                                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${getAreaTheme(r.area).bg} ${getAreaTheme(r.area).text} uppercase tracking-wide opacity-80`}>{r.area}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {!r.done && (
                                            <button 
                                                onClick={() => onOpenReview(r.topicId, r.idx)}
                                                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shrink-0"
                                            >
                                                REVISAR
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
