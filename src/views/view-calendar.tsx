
import React, { useState, useEffect, useRef } from 'react';
import { CalendarCheck, ChevronLeft, ChevronRight, ClipboardList, Flag, BookOpen, CheckCircle2, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Topic, Simulado, UserConfig } from '../types';
import { getTodayStr, getAreaTheme } from '../utils';
import { useCalendar } from '../hooks';

export const CalendarView = ({ topics, simulados, onOpenReview, config }: { topics: Topic[], simulados: Simulado[], onOpenReview: (id: string, idx: number) => void, config: UserConfig }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDateStr, setSelectedDateStr] = useState<string>(getTodayStr());
    const scrollRef = useRef<HTMLDivElement>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const { monthData, daysInMonth, firstDay } = useCalendar(topics, simulados, currentDate, config.examDate);

    // Scroll to selected date on mobile when month changes
    useEffect(() => {
        if (scrollRef.current) {
            const selectedEl = scrollRef.current.querySelector('[data-selected="true"]');
            if (selectedEl) {
                selectedEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [currentDate, selectedDateStr]);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const handleToday = () => {
        setCurrentDate(new Date());
        setSelectedDateStr(getTodayStr());
    };

    const selectedDayData = monthData[selectedDateStr] || { reviews: [], sims: [] };
    const isSelectedExam = selectedDateStr === config.examDate;

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in max-w-6xl mx-auto w-full">
            <div className="flex flex-row items-center justify-between gap-3 mb-6 px-2 hidden lg:flex">
                <div className="flex items-center gap-4">
                     <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                         <CalendarCheck size={20} className="lg:w-6 lg:h-6" />
                     </div>
                     <div>
                         <h3 className="text-xl lg:text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none">Agenda</h3>
                         <span className="text-xs lg:text-sm font-bold text-slate-400">Suas atividades</span>
                     </div>
                </div>
                
                <div className="flex items-center gap-1 lg:gap-2 bg-white dark:bg-[#18181b] p-1 lg:p-1.5 rounded-xl border border-black/5 dark:border-white/5 shadow-sm">
                    <button onClick={handlePrevMonth} className="p-1.5 lg:p-2 hover:bg-slate-50 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><ChevronLeft size={16}/></button>
                    <button onClick={handleToday} className="px-2 lg:px-3 py-1 text-[10px] lg:text-xs font-black uppercase text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 rounded-lg whitespace-nowrap transition-colors">{new Date(year, month).toLocaleString('pt-BR', { month: 'short' }).replace('.', '')} {year}</button>
                    <button onClick={handleNextMonth} className="p-1.5 lg:p-2 hover:bg-slate-50 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><ChevronRight size={16}/></button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
                {/* Mobile Horizontal Date Selector */}
                <div className="lg:hidden flex overflow-x-auto custom-scrollbar gap-2 pb-2 px-2 snap-x" ref={scrollRef}>
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const d = new Date(year, month, day);
                        const y = d.getFullYear();
                        const m = String(d.getMonth() + 1).padStart(2, '0');
                        const dd = String(d.getDate()).padStart(2, '0');
                        const dateStr = `${y}-${m}-${dd}`;

                        const dayData = monthData[dateStr] || { reviews: [], sims: [] };
                        const isToday = dateStr === getTodayStr();
                        const isSelected = selectedDateStr === dateStr;
                        const hasReviews = dayData.reviews.length > 0;
                        const hasSims = dayData.sims.length > 0;
                        const isExam = dateStr === config.examDate;
                        const dayOfWeek = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');

                        return (
                            <button
                                key={day}
                                data-selected={isSelected}
                                onClick={() => setSelectedDateStr(dateStr)}
                                className={`shrink-0 w-14 h-16 rounded-2xl flex flex-col items-center justify-center transition-all snap-center relative
                                    ${isSelected 
                                        ? 'bg-blue-600 text-white shadow-md scale-105' 
                                        : 'bg-white dark:bg-zinc-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5'
                                    }
                                    ${isToday && !isSelected ? 'border-blue-500/50 border-2' : ''}
                                `}
                            >
                                <span className={`text-[9px] font-bold uppercase opacity-80 ${isSelected ? 'text-blue-100' : ''}`}>{dayOfWeek}</span>
                                <span className="text-lg font-black leading-none mt-0.5">{day}</span>
                                
                                {/* Indicators */}
                                <div className="flex gap-0.5 mt-1 absolute bottom-1.5">
                                    {hasReviews && <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-500'}`}></div>}
                                    {hasSims && <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-purple-500'}`}></div>}
                                    {isExam && !hasReviews && !hasSims && <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-amber-500'}`}></div>}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Desktop Grid Calendar */}
                <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 flex-col bg-white dark:bg-zinc-900 rounded-[32px] border border-black/5 dark:border-white/5 shadow-sm p-6 h-fit">
                    <div className="grid grid-cols-7 mb-4">
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                            <div key={d} className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2 xl:gap-3 auto-rows-fr">
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
                            const isSelected = selectedDateStr === dateStr;
                            const hasReviews = dayData.reviews.length > 0;
                            const hasSims = dayData.sims.length > 0;
                            const isExam = dateStr === config.examDate;

                            return (
                                <div 
                                    key={day} 
                                    onClick={() => setSelectedDateStr(dateStr)}
                                    className={`aspect-square relative rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group
                                        ${isSelected 
                                            ? 'bg-blue-600 text-white shadow-lg scale-105 z-10' 
                                            : 'hover:bg-slate-50 dark:hover:bg-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-transparent'
                                        }
                                        ${isToday && !isSelected ? 'border-blue-500/50 border-2' : ''}
                                    `}
                                >
                                    <span className={`text-base xl:text-lg font-bold ${isExam && !isSelected ? 'text-amber-500' : ''}`}>{day}</span>
                                    
                                    {/* Indicators */}
                                    <div className="flex gap-1 mt-1">
                                        {hasReviews && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/80' : 'bg-blue-500'}`}></div>}
                                        {hasSims && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/80' : 'bg-purple-500'}`}></div>}
                                        {isExam && !hasReviews && !hasSims && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/80' : 'bg-amber-500'}`}></div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Selected Day Details */}
                <div className="flex-1 lg:w-1/2 xl:w-5/12 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[32px] border border-black/5 dark:border-white/5 shadow-sm overflow-hidden flex flex-col min-h-[400px] lg:min-h-0 lg:sticky lg:top-4 lg:h-[calc(100vh-140px)] animate-slide-up">
                    <div className="px-6 py-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-start bg-slate-50/50 dark:bg-black/20">
                        <div>
                            <h4 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1">
                                {selectedDateStr.split('-')[2]} de {new Date(selectedDateStr + 'T12:00:00').toLocaleString('pt-BR', { month: 'long' })}
                            </h4>
                            <span className="text-sm font-bold text-slate-400 uppercase">
                                {new Date(selectedDateStr + 'T12:00:00').toLocaleString('pt-BR', { weekday: 'long' })}
                            </span>
                        </div>
                        {isSelectedExam && (
                            <div className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                                <Flag size={12}/> Prova
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-6 space-y-4">
                        {selectedDayData.reviews.length === 0 && selectedDayData.sims.length === 0 && !isSelectedExam ? (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400 py-12 opacity-60">
                                <CalendarIcon size={48} className="mb-4 opacity-20"/>
                                <p className="text-sm font-bold text-center">Nenhuma atividade agendada<br/>para este dia.</p>
                            </div>
                        ) : (
                            <>
                                {isSelectedExam && (
                                     <div className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-amber-500/10 rounded-2xl border border-amber-200 dark:border-amber-500/20 shadow-sm">
                                        <div className="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0"><Flag size={20} fill="currentColor"/></div>
                                        <div>
                                            <div className="text-base font-black text-amber-900 dark:text-amber-100 tracking-tight">Dia da Prova</div>
                                            <div className="text-xs font-bold text-amber-700/70 dark:text-amber-400/70 uppercase tracking-wider">O grande dia chegou!</div>
                                        </div>
                                    </div>
                                )}
                                {selectedDayData.sims.map((s: any) => (
                                    <div key={s.id} className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-500/20">
                                        <div className="p-3 bg-white dark:bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400 shadow-sm"><ClipboardList size={20}/></div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-800 dark:text-white">{s.name}</div>
                                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Simulado • {s.year}</div>
                                        </div>
                                    </div>
                                ))}
                                {selectedDayData.reviews.sort((a: any, b: any) => (a.done === b.done ? 0 : a.done ? 1 : -1)).map((r: any) => {
                                     const theme = getAreaTheme(r.area || 'clinica'); 
                                     return (
                                        <div key={r.topicId + r.idx} className={`flex items-center justify-between p-4 bg-white dark:bg-zinc-800/50 rounded-2xl border shadow-sm transition-all gap-3
                                            ${r.done ? 'border-emerald-200 dark:border-emerald-500/30 opacity-70' : 'border-slate-100 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500/50'}
                                        `}>
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className={`p-2.5 rounded-xl shrink-0 ${r.done ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600' : 'bg-slate-100 dark:bg-white/10 text-slate-500'}`}>
                                                    {r.done ? <CheckCircle2 size={18}/> : <BookOpen size={18}/>}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className={`text-sm font-bold truncate ${r.done ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-800 dark:text-white'}`}>{r.topicTitle}</div>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${theme.bg} ${theme.text}`}>{r.area || 'Geral'}</span>
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><Clock size={10}/> {r.label}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {!r.done && (
                                                <button 
                                                    onClick={() => onOpenReview(r.topicId, r.idx)}
                                                    className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
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
        </div>
    );
};
