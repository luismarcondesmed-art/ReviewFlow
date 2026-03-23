
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CalendarCheck, ChevronLeft, ChevronRight, ChevronDown, ClipboardList, Flag, BookOpen, CheckCircle2, Calendar as CalendarIcon, Clock, Link as LinkIcon, ExternalLink, Plus, List, Grid } from 'lucide-react';
import { Topic, Simulado, UserConfig } from '../types';
import { getTodayStr, getAreaTheme, formatDate } from '../utils';
import { useCalendar } from '../hooks';

export const CalendarView = ({ topics, simulados, onOpenReview, config, onUpdateTopic, onEditTopic }: { topics: Topic[], simulados: Simulado[], onOpenReview: (id: string, idx: number) => void, config: UserConfig, onUpdateTopic?: (topic: Topic) => void, onEditTopic?: (topic: Topic) => void }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDateStr, setSelectedDateStr] = useState<string>(getTodayStr());
    const [mobileViewMode, setMobileViewMode] = useState<'agenda' | 'calendar' | 'list'>('agenda'); // agenda = day strip, calendar = grid, list = vertical list
    const scrollRef = useRef<HTMLDivElement>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const { monthData, daysInMonth, firstDay } = useCalendar(topics, simulados, currentDate, config.examDate);

    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

    const toggleCard = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleAddNotionLink = (topicId: string) => {
        if (!onUpdateTopic) return;
        const topic = topics.find(t => t.id === topicId);
        if (!topic) return;

        const currentLink = topic.notionLink || '';
        const newLink = window.prompt('Insira o link do Notion para esta matéria:', currentLink);
        
        if (newLink !== null) {
            onUpdateTopic({
                ...topic,
                notionLink: newLink.trim()
            });
        }
    };

    const renderReviewCard = (r: any, isListMode: boolean = false) => {
        const theme = getAreaTheme(r.area || 'clinica'); 
        const topic = topics.find(t => t.id === r.topicId);
        const notionLink = topic?.notionLink;
        const cardId = `${r.topicId}-${r.idx}`;
        const isExpanded = expandedCards[cardId];
        
        const previousReviews = topic?.reviews?.slice(0, r.idx).filter((rev: any) => rev.done) || [];
        const hasExtraInfo = (topic?.linkedLessons && topic.linkedLessons.length > 0) || previousReviews.length > 0;

        return (
            <div 
                key={cardId} 
                onClick={() => onEditTopic && topic && onEditTopic(topic)}
                className={`flex flex-col p-4 bg-white dark:bg-zinc-900/80 rounded-2xl border shadow-sm transition-all gap-3 cursor-pointer ${isListMode ? 'ml-4' : ''}
                ${r.done ? 'border-emerald-200 dark:border-emerald-500/30 opacity-70' : 'border-slate-100 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'}
            `}>
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`p-2.5 rounded-xl shrink-0 ${r.done ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600' : 'bg-slate-100 dark:bg-white/10 text-slate-500'}`}>
                            {r.done ? <CheckCircle2 size={18}/> : <BookOpen size={18}/>}
                        </div>
                        <div className="min-w-0">
                            <div className={`text-sm font-bold leading-tight ${r.done ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-800 dark:text-white'}`}>{r.topicTitle}</div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${theme.bg} ${theme.text}`}>{r.area || 'Geral'}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><Clock size={10}/> {r.label}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {!r.done && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); onOpenReview(r.topicId, r.idx); }}
                                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
                            >
                                REVISAR
                            </button>
                        )}

                        {hasExtraInfo || notionLink || !notionLink ? (
                            <button 
                                onClick={(e) => toggleCard(cardId, e)}
                                className="p-2 bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-black dark:hover:text-white rounded-xl transition-colors"
                            >
                                <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                        ) : null}
                    </div>
                </div>

                {/* Dropdown Content */}
                {isExpanded && (
                    <div className="mt-2 pt-3 border-t border-slate-100 dark:border-white/5 space-y-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                            {notionLink ? (
                                <a 
                                    href={notionLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 text-xs font-bold rounded-xl transition-colors"
                                >
                                    <ExternalLink size={14}/> Abrir no Notion
                                </a>
                            ) : (
                                <button 
                                    onClick={() => handleAddNotionLink(r.topicId)}
                                    className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-xs font-bold rounded-xl transition-colors"
                                >
                                    <LinkIcon size={14}/> Adicionar Link Notion
                                </button>
                            )}
                        </div>

                        {topic?.linkedLessons && topic.linkedLessons.length > 0 && (
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <BookOpen size={12} /> Aulas Vinculadas
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    {topic.linkedLessons.map((c: string, i: number) => (
                                        <span key={i} className="text-[10px] font-bold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 px-2.5 py-1.5 rounded-lg">
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {previousReviews.length > 0 && (
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <Clock size={12} /> Histórico de Revisões
                                </div>
                                <div className="space-y-1.5">
                                    {previousReviews.map((prevRev: any, i: number) => {
                                        const accuracy = prevRev.total > 0 ? Math.round((prevRev.correct / prevRev.total) * 100) : 0;
                                        return (
                                            <div key={i} className="flex items-center justify-between bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl text-xs">
                                                <span className="font-bold text-slate-600 dark:text-slate-300">
                                                    {prevRev.label} <span className="text-[10px] text-slate-400 font-normal ml-1">({formatDate(prevRev.date)})</span>
                                                </span>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-slate-500 dark:text-slate-400 font-bold">{prevRev.correct}/{prevRev.total}</span>
                                                    <span className={`font-black ${accuracy >= (config.targetAccuracy || 80) ? 'text-emerald-500' : accuracy >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                                                        {accuracy}%
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const hasEventsInMonth = useMemo(() => {
        for (let i = 1; i <= daysInMonth; i++) {
             const d = new Date(year, month, i);
             const y = d.getFullYear();
             const m = String(d.getMonth() + 1).padStart(2, '0');
             const dd = String(d.getDate()).padStart(2, '0');
             const s = `${y}-${m}-${dd}`;
             
             const data = monthData[s];
             if (data && (data.reviews.length > 0 || data.sims.length > 0 || s === config.examDate)) return true;
        }
        return false;
    }, [monthData, daysInMonth, year, month, config.examDate]);

    // Scroll to selected date on mobile when month changes (only in agenda mode)
    useEffect(() => {
        if (mobileViewMode === 'agenda' && scrollRef.current) {
            const selectedEl = scrollRef.current.querySelector('[data-selected="true"]');
            if (selectedEl) {
                selectedEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [currentDate, selectedDateStr, mobileViewMode]);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const handleToday = () => {
        setCurrentDate(new Date());
        setSelectedDateStr(getTodayStr());
    };

    const selectedDayData = monthData[selectedDateStr] || { reviews: [], sims: [] };
    const isSelectedExam = selectedDateStr === config.examDate;

    // Helper to render grid day
    const renderGridDay = (day: number, dateStr: string, isMobile: boolean = false) => {
        const dayData = monthData[dateStr] || { reviews: [], sims: [] };
        const isToday = dateStr === getTodayStr();
        const isSelected = selectedDateStr === dateStr;
        const hasReviews = dayData.reviews.length > 0;
        const hasSims = dayData.sims.length > 0;
        const isExam = dateStr === config.examDate;

        return (
            <div 
                key={day} 
                onClick={() => {
                    setSelectedDateStr(dateStr);
                    if (isMobile) setMobileViewMode('agenda'); // Switch back to details view on click
                }}
                className={`aspect-square relative rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group
                    ${isSelected 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg scale-105 z-10' 
                        : 'hover:bg-slate-50 dark:hover:bg-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-transparent'
                    }
                    ${isToday && !isSelected ? 'border-slate-500/50 border-2' : ''}
                `}
            >
                <span className={`text-base xl:text-lg font-bold ${isExam && !isSelected ? 'text-amber-500' : ''}`}>{day}</span>
                
                {/* Indicators */}
                <div className="flex gap-1 mt-1">
                    {hasReviews && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/80 dark:bg-black/80' : 'bg-slate-500'}`}></div>}
                    {hasSims && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/80' : 'bg-purple-500'}`}></div>}
                    {isExam && !hasReviews && !hasSims && <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/80' : 'bg-amber-500'}`}></div>}
                </div>
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in max-w-6xl mx-auto w-full">
            {/* Header */}
            <div className="flex flex-row items-center justify-between gap-3 mb-6 px-2">
                <div className="flex items-center gap-4">
                     <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black shadow-lg">
                         <CalendarCheck size={20} className="lg:w-6 lg:h-6" />
                     </div>
                     <div>
                         <h3 className="text-xl lg:text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none">Agenda</h3>
                         <span className="text-xs lg:text-sm font-bold text-slate-400">Suas atividades</span>
                     </div>
                </div>
                
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    {/* Mobile View Toggles */}
                    <div className="lg:hidden relative">
                        <select 
                            value={mobileViewMode} 
                            onChange={(e) => setMobileViewMode(e.target.value as any)}
                            className="appearance-none bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-xl pl-2.5 pr-6 py-2 outline-none focus:border-slate-500"
                        >
                            <option value="agenda">Agenda</option>
                            <option value="calendar">Mês</option>
                            <option value="list">Lista</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>

                    <div className="flex items-center gap-0.5 lg:gap-2 bg-white dark:bg-[#18181b] p-1 lg:p-1.5 rounded-xl border border-black/5 dark:border-white/5 shadow-sm">
                        <button onClick={handlePrevMonth} className="p-1 lg:p-2 hover:bg-slate-50 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><ChevronLeft size={14}/></button>
                        <button onClick={handleToday} className="px-1.5 lg:px-3 py-1 text-[9px] lg:text-xs font-black uppercase text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 rounded-lg whitespace-nowrap transition-colors">{new Date(year, month).toLocaleString('pt-BR', { month: 'short' }).replace('.', '')} {year}</button>
                        <button onClick={handleNextMonth} className="p-1 lg:p-2 hover:bg-slate-50 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"><ChevronRight size={14}/></button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
                {/* Mobile Views */}
                <div className="lg:hidden flex-1">
                    {mobileViewMode === 'agenda' && (
                        <div className="flex overflow-x-auto custom-scrollbar gap-2 pb-2 px-2 snap-x mb-4" ref={scrollRef}>
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
                                                ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-md scale-105' 
                                                : 'bg-white dark:bg-zinc-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5'
                                            }
                                            ${isToday && !isSelected ? 'border-slate-500/50 border-2' : ''}
                                        `}
                                    >
                                        <span className={`text-[9px] font-bold uppercase opacity-80 ${isSelected ? 'text-slate-300 dark:text-slate-600' : ''}`}>{dayOfWeek}</span>
                                        <span className="text-lg font-black leading-none mt-0.5">{day}</span>
                                        
                                        {/* Indicators */}
                                        <div className="flex gap-0.5 mt-1 absolute bottom-1.5">
                                            {hasReviews && <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white dark:bg-black' : 'bg-slate-500'}`}></div>}
                                            {hasSims && <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-purple-500'}`}></div>}
                                            {isExam && !hasReviews && !hasSims && <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-amber-500'}`}></div>}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {mobileViewMode === 'calendar' && (
                        <div className="bg-white dark:bg-zinc-900 rounded-[32px] border border-black/5 dark:border-white/5 shadow-sm p-4 mb-4">
                            <div className="grid grid-cols-7 mb-4">
                                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                                    <div key={d} className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">{d}</div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-2 auto-rows-fr">
                                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className="aspect-square"></div>)}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const d = new Date(year, month, day);
                                    const y = d.getFullYear();
                                    const m = String(d.getMonth() + 1).padStart(2, '0');
                                    const dd = String(d.getDate()).padStart(2, '0');
                                    const dateStr = `${y}-${m}-${dd}`;
                                    return renderGridDay(day, dateStr, true);
                                })}
                            </div>
                        </div>
                    )}

                    {mobileViewMode === 'list' && (
                        <div className="space-y-6 mb-4">
                            {!hasEventsInMonth ? (
                                <div className="flex flex-col items-center justify-center p-8 text-slate-400 opacity-60 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-white/5">
                                    <CalendarIcon size={48} className="mb-4 opacity-20"/>
                                    <p className="text-sm font-bold text-center">Nenhuma atividade neste mês.</p>
                                </div>
                            ) : (
                                Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const d = new Date(year, month, day);
                                    const y = d.getFullYear();
                                    const m = String(d.getMonth() + 1).padStart(2, '0');
                                    const dd = String(d.getDate()).padStart(2, '0');
                                    const dateStr = `${y}-${m}-${dd}`;
                                    const dayData = monthData[dateStr];

                                    if (!dayData || (dayData.reviews.length === 0 && dayData.sims.length === 0 && dateStr !== config.examDate)) return null;

                                    return (
                                        <div key={dateStr} className="space-y-3">
                                            <div className="flex items-center gap-3 sticky top-0 bg-[#f5f5f5] dark:bg-[#0a0a0a] py-2 z-10">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 font-black text-lg shadow-sm">
                                                    {day}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-slate-800 dark:text-white capitalize leading-none">
                                                        {d.toLocaleDateString('pt-BR', { weekday: 'long' })}
                                                    </div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                                                        {d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-3 pl-2 border-l-2 border-slate-100 dark:border-white/5 ml-5">
                                                {dateStr === config.examDate && (
                                                     <div className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-amber-500/10 rounded-2xl border border-amber-200 dark:border-amber-500/20 shadow-sm ml-4">
                                                        <div className="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0"><Flag size={20} fill="currentColor"/></div>
                                                        <div>
                                                            <div className="text-base font-black text-amber-900 dark:text-amber-100 tracking-tight">Dia da Prova</div>
                                                            <div className="text-xs font-bold text-amber-700/70 dark:text-amber-400/70 uppercase tracking-wider">O grande dia chegou!</div>
                                                        </div>
                                                    </div>
                                                )}
                                                {dayData.sims.map((s: any) => {
                                                    const accuracy = s.totalQuestions > 0 ? Math.round((s.correctCount / s.totalQuestions) * 100) : 0;
                                                    const errors = s.totalQuestions - s.correctCount;
                                                    return (
                                                        <div key={s.id} className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-500/20 ml-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className="p-3 bg-white dark:bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400 shadow-sm"><ClipboardList size={20}/></div>
                                                                <div>
                                                                    <div className="text-sm font-bold text-slate-800 dark:text-white">{s.name}</div>
                                                                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Simulado • {s.year}</div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-end">
                                                                <span className={`text-sm font-black ${accuracy >= 80 ? 'text-emerald-500' : accuracy >= 60 ? 'text-amber-500' : 'text-red-500'}`}>{accuracy}%</span>
                                                                <span className="text-[10px] font-bold text-slate-400">{s.correctCount} acertos • {errors} erros</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                                {dayData.reviews.sort((a: any, b: any) => (a.done === b.done ? 0 : a.done ? 1 : -1)).map((r: any) => renderReviewCard(r, true))}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
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
                            return renderGridDay(day, dateStr);
                        })}
                    </div>
                </div>

                {/* Selected Day Details (Visible on Desktop or when Agenda mode on Mobile) */}
                <div className={`flex-1 lg:w-1/2 xl:w-5/12 flex flex-col min-h-[400px] lg:min-h-0 lg:sticky lg:top-4 lg:h-[calc(100vh-140px)] animate-slide-up
                    ${mobileViewMode !== 'agenda' && window.innerWidth < 1024 ? 'hidden' : ''}
                    lg:bg-white/80 lg:dark:bg-zinc-900/80 lg:backdrop-blur-xl lg:rounded-[32px] lg:border lg:border-black/5 lg:dark:border-white/5 lg:shadow-sm lg:overflow-hidden
                `}>
                    <div className="px-2 lg:px-6 py-4 lg:py-6 lg:border-b lg:border-slate-100 lg:dark:border-white/5 flex justify-between items-start lg:bg-slate-50/50 lg:dark:bg-black/20">
                        <div>
                            <h4 className="text-xl lg:text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1">
                                {selectedDateStr.split('-')[2]} de {new Date(selectedDateStr + 'T12:00:00').toLocaleString('pt-BR', { month: 'long' })}
                            </h4>
                            <span className="text-xs lg:text-sm font-bold text-slate-400 uppercase">
                                {new Date(selectedDateStr + 'T12:00:00').toLocaleString('pt-BR', { weekday: 'long' })}
                            </span>
                        </div>
                        {isSelectedExam && (
                            <div className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                                <Flag size={12}/> Prova
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 lg:p-6 space-y-3 lg:space-y-4">
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
                                    {selectedDayData.sims.map((s: any) => {
                                        const accuracy = s.totalQuestions > 0 ? Math.round((s.correctCount / s.totalQuestions) * 100) : 0;
                                        const errors = s.totalQuestions - s.correctCount;
                                        return (
                                            <div key={s.id} className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-500/20">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white dark:bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400 shadow-sm"><ClipboardList size={20}/></div>
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-800 dark:text-white">{s.name}</div>
                                                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Simulado • {s.year}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className={`text-sm font-black ${accuracy >= 80 ? 'text-emerald-500' : accuracy >= 60 ? 'text-amber-500' : 'text-red-500'}`}>{accuracy}%</span>
                                                    <span className="text-[10px] font-bold text-slate-400">{s.correctCount} acertos • {errors} erros</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {selectedDayData.reviews.sort((a: any, b: any) => (a.done === b.done ? 0 : a.done ? 1 : -1)).map((r: any) => renderReviewCard(r, false))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
        </div>
    );
};
