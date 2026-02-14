
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { X, ChevronRight, Trash2, ArrowRight, Target, Key, Save, Download, Upload, Sun, Moon, Zap, Minus, Plus, Search, Check, ClipboardList, Calendar, LayoutList, History, Info, AlertTriangle, Edit2, Cloud, BookOpen, Smartphone, HelpCircle, GraduationCap, BarChart3, SlidersHorizontal, Link as LinkIcon } from 'lucide-react';
import { Topic, AreaType, ImportanceType, Simulado, UserConfig, Review } from './types';
import { AREAS, formatDate, formatFullDate, getAreaTheme, getTodayStr, getPerformanceColor, OptimizationChange, getPerformanceBgLight, IMPORTANCE_LEVELS, generateSmartSchedule } from './utils';
import { MEDCOF_SCHEDULE } from './medcofSchedule';
import { ESTRATEGIA_SCHEDULE } from './estrategiaSchedule';

// ... (Modal, TutorialModal - no changes) ...
export const Modal = ({ isOpen, onClose, title, children, headerContent }: { isOpen: boolean; onClose: () => void; title: string; children?: React.ReactNode; headerContent?: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
            <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/90 backdrop-blur-md transition-opacity duration-300" onClick={onClose} />
            <div className="relative w-full max-w-md bg-[#f2f4f7] dark:bg-[#0d0d0d] rounded-t-[2rem] sm:rounded-[2rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-slide-up sm:animate-scale-in border border-white/20 dark:border-white/5 overflow-hidden">
                <div className="px-6 py-5 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-[#f2f4f7]/95 dark:bg-[#0d0d0d]/95 backdrop-blur-xl z-10 sticky top-0">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{title}</h3>
                        {headerContent}
                    </div>
                    <button onClick={onClose} className="p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors">
                        <X size={18} className="text-slate-500 dark:text-slate-300"/>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-0 scroll-smooth custom-scrollbar bg-[#f2f4f7] dark:bg-[#0d0d0d]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const TutorialModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    // ... (Keep existing implementation) ...
    const [step, setStep] = useState(0);
    const steps = [
        { title: "O Método ReviewFlow", icon: <Zap size={24} className="text-amber-500"/>, content: <div className="space-y-4"><p className="text-sm text-slate-600 dark:text-slate-300">Bem-vindo! Este app utiliza <strong>Repetição Espaçada</strong> automática.</p></div> },
        { title: "Cronograma & Automação", icon: <Calendar size={24} className="text-blue-500"/>, content: <div className="space-y-4"><p className="text-sm text-slate-600 dark:text-slate-300">Acompanhe suas aulas.</p></div> },
        { title: "Simulados & Métricas", icon: <BarChart3 size={24} className="text-emerald-500"/>, content: <div className="space-y-4"><p className="text-sm text-slate-600 dark:text-slate-300">Registre seus simulados.</p></div> }
    ];
    if (!isOpen) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Guia Rápido">
            <div className="flex flex-col h-full min-h-[400px]">
                <div className="flex-1 p-6 flex flex-col items-center text-center justify-center">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 animate-scale-in">{steps[step].icon}</div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-3">{steps[step].title}</h3>
                    <div className="w-full text-left">{steps[step].content}</div>
                </div>
                <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#0d0d0d]"><button onClick={onClose} className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold shadow-lg">Fechar</button></div>
            </div>
        </Modal>
    );
};

export const EditTopicModal = ({ isOpen, onClose, topic, onSave, onDelete, onEditReview, config }: { isOpen: boolean; onClose: () => void; topic: Topic | null; onSave: (t: Topic) => void; onDelete?: (id: string) => void; onEditReview?: (idx: number) => void; config?: UserConfig }) => {
    const [activeTab, setActiveTab] = useState<'details' | 'history'>('details');
    
    // Custom settings state
    const [intervalsStr, setIntervalsStr] = useState('');
    const [baseQuestions, setBaseQuestions] = useState<number | ''>('');
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Linked Lessons State
    const [linkedLessons, setLinkedLessons] = useState<string[]>([]);
    const [newLessonInput, setNewLessonInput] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen) {
            setActiveTab('details');
            if (topic) {
                if (topic.customSettings) {
                    setIntervalsStr(topic.customSettings.intervals.join(', '));
                    setBaseQuestions(topic.customSettings.baseQuestions);
                    setShowAdvanced(true);
                } else {
                    setIntervalsStr('');
                    setBaseQuestions('');
                    setShowAdvanced(false);
                }
                setLinkedLessons(topic.linkedLessons || []);
            } else {
                setIntervalsStr(''); 
                setBaseQuestions('');
                setShowAdvanced(false);
                setLinkedLessons([]);
            }
            setNewLessonInput('');
            setSuggestions([]);
        }
    }, [isOpen, topic]);

    // Lesson Autocomplete Logic
    const availableLessons = useMemo(() => {
        const schedule = config?.activeSchedule === 'ESTRATEGIA' ? ESTRATEGIA_SCHEDULE : MEDCOF_SCHEDULE;
        return schedule.map(s => s.aula);
    }, [config?.activeSchedule]);

    useEffect(() => {
        if (newLessonInput.length > 2) {
            const matches = availableLessons
                .filter(l => l.toLowerCase().includes(newLessonInput.toLowerCase()))
                .slice(0, 5); // Limit to 5 suggestions
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
    }, [newLessonInput, availableLessons]);

    if (!isOpen) return null;

    const safeTopic = topic || {} as Topic;
    const isNew = !safeTopic.id;

    const handleAddLesson = (lesson: string) => {
        if (lesson && !linkedLessons.includes(lesson)) {
            setLinkedLessons([...linkedLessons, lesson]);
            setNewLessonInput('');
            setSuggestions([]);
        }
    };

    const handleRemoveLesson = (index: number) => {
        setLinkedLessons(linkedLessons.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        
        const title = fd.get('title') as string;
        const subarea = fd.get('subarea') as string;
        const area = fd.get('area') as AreaType;
        const importance = fd.get('importance') as ImportanceType;
        const studyDate = fd.get('date') as string;

        let customSettings = undefined;
        if (showAdvanced && intervalsStr.trim()) {
            const intervals = intervalsStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
            const baseQ = typeof baseQuestions === 'number' ? baseQuestions : IMPORTANCE_LEVELS.find(i => i.id === importance)?.baseQ || 20;
            if (intervals.length > 0) {
                customSettings = { intervals, baseQuestions: baseQ };
            }
        }

        let reviews = safeTopic.reviews || [];
        
        const needsRegeneration = isNew || 
            (JSON.stringify(safeTopic.customSettings) !== JSON.stringify(customSettings)) ||
            (safeTopic.studyDate !== studyDate);

        if (needsRegeneration) {
            const newSchedule = generateSmartSchedule(
                studyDate, 
                undefined, 
                importance, 
                [], 
                safeTopic.id,
                customSettings
            );

            if (isNew) {
                reviews = newSchedule;
            } else {
                reviews = newSchedule.map((newR, i) => {
                    const existing = safeTopic.reviews.find(r => r.type === newR.type);
                    if (existing && existing.done) {
                        return { ...existing, label: newR.label };
                    }
                    return newR;
                });
            }
        }

        const updated = {
            ...safeTopic,
            title,
            subarea: subarea || '', 
            area,
            importance,
            studyDate,
            reviews,
            linkedLessons, // Save the linked lessons
            customSettings,
            updatedAt: Date.now()
        };
        onSave(updated);
        onClose(); 
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isNew ? "Nova Matéria" : "Editar Matéria"}>
            <div className="flex flex-col h-full">
                {!isNew && (
                    <div className="flex p-2 bg-slate-50 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
                        <button 
                            onClick={() => setActiveTab('details')}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${activeTab === 'details' ? 'bg-white dark:bg-white/5 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500'}`}
                        >
                            <LayoutList size={14}/> Detalhes
                        </button>
                        <button 
                            onClick={() => setActiveTab('history')}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${activeTab === 'history' ? 'bg-white dark:bg-white/5 shadow-sm text-purple-600 dark:text-purple-400' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500'}`}
                        >
                            <History size={14}/> Histórico
                        </button>
                    </div>
                )}

                {activeTab === 'details' ? (
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Tema</label>
                            <input name="title" defaultValue={safeTopic.title || ''} type="text" className="w-full text-lg font-bold bg-white dark:bg-[#151515] p-4 rounded-2xl outline-none text-slate-900 dark:text-white border border-slate-200 dark:border-white/5 focus:border-blue-500/50 transition-all appearance-none" required placeholder="Ex: Diabetes, HAS..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Área</label>
                                <div className="relative">
                                    <select name="area" defaultValue={safeTopic.area || 'clinica'} className="w-full p-4 rounded-2xl bg-white dark:bg-[#151515] text-sm font-bold outline-none appearance-none cursor-pointer text-slate-900 dark:text-white border border-slate-200 dark:border-white/5 focus:border-blue-500/50">
                                        {AREAS.map(a => <option key={a.id} value={a.id}>{a.full}</option>)}
                                    </select>
                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={16}/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Disciplina</label>
                                <input name="subarea" type="text" defaultValue={safeTopic.subarea || ''} placeholder="Ex: Cardio" className="w-full p-4 rounded-2xl bg-white dark:bg-[#151515] text-sm font-bold outline-none text-slate-900 dark:text-white border border-slate-200 dark:border-white/5 focus:border-blue-500/50 appearance-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Início</label>
                            <input name="date" type="date" defaultValue={safeTopic.studyDate || getTodayStr()} className="w-full p-4 rounded-2xl bg-white dark:bg-[#151515] text-sm font-bold outline-none text-slate-900 dark:text-white border border-slate-200 dark:border-white/5 focus:border-blue-500/50 appearance-none min-h-[54px]" required />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Prioridade</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['low','medium','high'].map(lvl => (
                                    <label key={lvl} className="cursor-pointer">
                                        <input type="radio" name="importance" value={lvl} className="peer hidden" defaultChecked={safeTopic.importance === lvl || (!safeTopic.importance && lvl === 'medium')}/>
                                        <div className="py-3 text-center rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#151515] text-xs font-bold text-slate-500 peer-checked:bg-slate-900 dark:peer-checked:bg-white peer-checked:text-white dark:peer-checked:text-black transition-all uppercase peer-checked:border-transparent">{lvl === 'high' ? 'Alta' : lvl === 'medium' ? 'Média' : 'Baixa'}</div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Linked Lessons Section */}
                        <div className="pt-2">
                             <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-2 block flex items-center gap-2"><LinkIcon size={12}/> Aulas Vinculadas</label>
                             <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 space-y-3">
                                <div className="relative">
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={newLessonInput}
                                            onChange={(e) => setNewLessonInput(e.target.value)}
                                            placeholder="Buscar aula no cronograma..."
                                            className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-black/20 text-xs font-bold outline-none border border-transparent focus:border-blue-500/50"
                                        />
                                        <button type="button" onClick={() => handleAddLesson(newLessonInput)} className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"><Plus size={16}/></button>
                                    </div>
                                    {/* Suggestions Dropdown */}
                                    {suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-black border border-slate-100 dark:border-white/10 rounded-xl shadow-xl z-20 overflow-hidden">
                                            {suggestions.map((suggestion, idx) => (
                                                <div 
                                                    key={idx} 
                                                    onClick={() => handleAddLesson(suggestion)}
                                                    className="px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 cursor-pointer"
                                                >
                                                    {suggestion}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="max-h-32 overflow-y-auto custom-scrollbar space-y-1">
                                    {linkedLessons.length === 0 && <p className="text-[10px] text-slate-400 italic">Nenhuma aula vinculada.</p>}
                                    {linkedLessons.map((lesson, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-2 bg-white dark:bg-black/20 rounded-lg group">
                                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate pr-2">{lesson}</span>
                                            <button type="button" onClick={() => handleRemoveLesson(idx)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
                                        </div>
                                    ))}
                                </div>
                             </div>
                        </div>

                        {/* Custom Settings Toggle */}
                        <div className="pt-2">
                            <button 
                                type="button" 
                                onClick={() => setShowAdvanced(!showAdvanced)} 
                                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-500 transition-colors"
                            >
                                <SlidersHorizontal size={14}/> {showAdvanced ? 'Ocultar Personalização' : 'Configuração Personalizada'}
                            </button>

                            {showAdvanced && (
                                <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-4 animate-scale-in">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Intervalos (dias)</label>
                                        <input 
                                            type="text" 
                                            value={intervalsStr} 
                                            onChange={(e) => setIntervalsStr(e.target.value)} 
                                            placeholder="Ex: 1, 7, 15, 30" 
                                            className="w-full p-3 rounded-xl bg-white dark:bg-black/20 text-xs font-bold outline-none border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                                        />
                                        <p className="text-[9px] text-slate-400">Separe os dias por vírgula.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meta de Questões</label>
                                        <input 
                                            type="number" 
                                            value={baseQuestions} 
                                            onChange={(e) => setBaseQuestions(parseInt(e.target.value) || '')} 
                                            placeholder="Ex: 20" 
                                            className="w-full p-3 rounded-xl bg-white dark:bg-black/20 text-xs font-bold outline-none border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-4 flex gap-4">
                            {onDelete && !isNew && (
                                <button type="button" onClick={() => { if(window.confirm('Tem certeza que deseja excluir?')) { onDelete(safeTopic.id); onClose(); } }} className="flex-[1] py-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold rounded-2xl active:scale-95 transition-all uppercase tracking-wide text-xs flex items-center justify-center gap-2 border border-red-100 dark:border-red-500/20">
                                    <Trash2 size={16}/> <span className="hidden sm:inline">Excluir</span>
                                </button>
                            )}
                            <button type="submit" className={`flex-[2] py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-wide text-xs ${isNew ? 'w-full' : ''}`}>Salvar</button>
                        </div>
                    </form>
                ) : (
                    // ... (Keep existing history tab) ...
                    <div className="p-4 space-y-3">
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wide text-center mb-2">Cronograma de Revisões</div>
                        {safeTopic.reviews.map((r, i) => {
                            const isDone = r.done;
                            const isLate = !isDone && r.date < getTodayStr();
                            const acc = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
                            return (
                                <div key={i} className={`p-3 rounded-xl border ${isDone ? 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/5' : 'bg-slate-50 dark:bg-white/5 border-dashed border-slate-200 dark:border-white/5'} flex items-center justify-between group`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase ${isDone ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20' : 'bg-slate-200 text-slate-500 dark:bg-white/10'}`}>
                                            {r.label.split(':')[0]}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{formatDate(r.date)}</div>
                                            <div className="text-[10px] font-bold text-slate-400">{r.label}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {isDone ? (
                                            <div className="text-right">
                                                <div className={`text-xs font-black ${getPerformanceColor(acc, 80, 'text')}`}>{acc}%</div>
                                                <div className="text-[9px] font-bold text-slate-400">{r.correct}/{r.total}</div>
                                            </div>
                                        ) : (
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                                                {isLate ? <span className="text-red-400">Atrasado</span> : 'Pendente'}
                                            </div>
                                        )}
                                        {onEditReview && (
                                            <button onClick={() => onEditReview(i)} className="p-1.5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg text-slate-400 hover:text-blue-500 transition-colors">
                                                <Edit2 size={12}/>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </Modal>
    );
};

// ... (Rest of modals.tsx remain unchanged) ...
export const EditReviewHistoryModal = ({ isOpen, onClose, topic, reviewIdx, onSave }: { isOpen: boolean; onClose: () => void; topic: Topic | null; reviewIdx: number | null; onSave: (data: { date: string, correct: number, total: number }) => void }) => {
    if (!isOpen || !topic || reviewIdx === null) return null;
    const review = topic.reviews[reviewIdx];
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSave({
            date: fd.get('date') as string,
            correct: parseInt(fd.get('correct') as string),
            total: parseInt(fd.get('total') as string),
        });
        onClose();
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar Registro">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="text-center pb-2">
                    <h4 className="font-bold text-slate-800 dark:text-white">{topic.title}</h4>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{review.label}</span>
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Data Realizada</label>
                    <input name="date" type="date" defaultValue={review.date} className="w-full p-4 rounded-2xl bg-white dark:bg-[#151515] text-sm font-bold outline-none text-slate-900 dark:text-white border border-slate-200 dark:border-white/5 appearance-none min-h-[54px]" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest pl-1">Acertos</label>
                        <input name="correct" type="number" defaultValue={review.correct} className="w-full p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 font-black text-2xl text-center outline-none border border-emerald-100 dark:border-emerald-500/20 appearance-none" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Total</label>
                        <input name="total" type="number" defaultValue={review.total} className="w-full p-4 rounded-2xl bg-white dark:bg-[#151515] text-slate-700 dark:text-slate-200 font-black text-2xl text-center outline-none border border-slate-200 dark:border-white/5 appearance-none" required />
                    </div>
                </div>
                <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-sm rounded-2xl shadow-xl active:scale-[0.98] transition-all uppercase tracking-wide">Atualizar Registro</button>
            </form>
        </Modal>
    )
}

export const OptimizationResultModal = ({ isOpen, onClose, onConfirm, changes }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; changes: OptimizationChange[] }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Resultado da Otimização">
            <div className="flex flex-col h-[70vh]">
                <div className="p-6 pb-2">
                    <p className="text-sm text-slate-500 font-medium mb-4">
                        O algoritmo reorganizou sua agenda para equilibrar a carga diária.
                        {changes.length === 0 ? " Nenhuma alteração foi necessária." : ` Foram propostas ${changes.length} alterações.`}
                    </p>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar px-6">
                    {changes.length > 0 && (
                        <div className="space-y-2">
                            {changes.map((change, i) => (
                                <div key={i} className="bg-slate-50 dark:bg-white/5 rounded-xl p-3 border border-slate-100 dark:border-white/5 flex items-center justify-between">
                                    <div className="overflow-hidden">
                                        <div className="font-bold text-xs text-slate-800 dark:text-white truncate">{change.title}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">{change.label}</div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                                        <div className="text-[10px] font-bold text-red-400 line-through decoration-red-400">{formatDate(change.from)}</div>
                                        <ArrowRight size={12} className="text-slate-400"/>
                                        <div className="text-[10px] font-bold text-emerald-500">{formatDate(change.to)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="p-6 pt-4 border-t border-slate-100 dark:border-white/5 mt-auto bg-[#f2f4f7] dark:bg-[#0d0d0d] z-10 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-4 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-bold rounded-2xl active:scale-95 transition-all uppercase tracking-wide text-xs">Cancelar</button>
                    <button onClick={onConfirm} className="flex-[2] py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl active:scale-95 transition-all uppercase tracking-wide shadow-lg text-xs">Confirmar & Sincronizar</button>
                </div>
            </div>
        </Modal>
    );
};

export const SettingsModal = ({ isOpen, onClose, config, onSaveConfig, syncKey, onSaveKey, onExport, onImport, themeMode, setThemeMode, runOptimization, onShowOptimizationInfo, status, installPrompt, onInstallApp, onOpenTutorial }: any) => {
    const [tempKey, setTempKey] = useState(syncKey);
    const [tempConfig, setTempConfig] = useState(config);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { setTempKey(syncKey); }, [syncKey]);
    useEffect(() => { setTempConfig(config); }, [config]);

    const handleSave = () => { onSaveConfig(tempConfig); onClose(); };

    const statusContent = (
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-full border border-black/5 dark:border-white/5">
            {status === 'online' && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>}
            {status === 'offline' && <div className="w-2 h-2 rounded-full bg-slate-400"></div>}
            {status === 'syncing' && <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>}
            {status === 'error' && <div className="w-2 h-2 rounded-full bg-red-500"></div>}
            <span className="text-[10px] font-bold text-slate-500 uppercase">{status}</span>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Ajustes" headerContent={statusContent}>
            <div className="p-6 space-y-6">
                <button onClick={onOpenTutorial} className="w-full p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl flex items-center justify-between gap-3 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-transform group">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-xl"><HelpCircle size={20}/></div>
                        <div className="text-left"><div className="text-xs font-bold opacity-80 uppercase">Novo aqui?</div><div className="font-black text-sm">Como usar o App</div></div>
                    </div>
                    <ChevronRight size={20} className="opacity-60 group-hover:translate-x-1 transition-transform"/>
                </button>
                {installPrompt && (
                    <button onClick={onInstallApp} className="w-full p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-transform animate-scale-in">
                        <div className="p-2 bg-white/20 rounded-xl"><Smartphone size={20}/></div>
                        <div className="text-left"><div className="text-xs font-bold opacity-80 uppercase">Disponível</div><div className="font-black text-sm">Instalar Aplicativo</div></div>
                    </button>
                )}
                <div className="p-5 bg-white dark:bg-white/5 rounded-3xl space-y-4 border border-slate-100 dark:border-white/5">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2"><BookOpen size={18} className="text-purple-500"/> Cronograma Ativo</h4>
                    <div className="relative">
                        <select 
                            value={tempConfig.activeSchedule || 'MEDCOF'} 
                            onChange={(e) => setTempConfig((prev: any) => ({ ...prev, activeSchedule: e.target.value }))}
                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#151515] text-xs font-bold outline-none border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white appearance-none"
                        >
                            <option value="MEDCOF">MedCof Extensivo</option>
                            <option value="ESTRATEGIA">Estratégia MED 2025</option>
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={14}/>
                    </div>
                </div>
                <div className="p-5 bg-white dark:bg-white/5 rounded-3xl space-y-4 border border-slate-100 dark:border-white/5">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2"><Target size={18} className="text-blue-500"/> Metas de Estudo</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Data da Prova</label>
                            <input type="date" value={tempConfig.examDate} onChange={e => setTempConfig((prev: any) => ({ ...prev, examDate: e.target.value }))} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#151515] text-xs font-bold outline-none border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white appearance-none min-h-[44px]" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Meta Acerto (%)</label>
                            <input type="number" value={tempConfig.targetAccuracy} onChange={e => setTempConfig((prev: any) => ({ ...prev, targetAccuracy: Number(e.target.value) }))} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#151515] text-xs font-bold outline-none border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white appearance-none" />
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-white dark:bg-white/5 rounded-3xl space-y-4 border border-slate-100 dark:border-white/5">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2"><Key size={18} className="text-amber-500"/> Sincronização</h4>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Chave Firebase (Sync Key)</label>
                        <input type="text" value={tempKey} onChange={e => setTempKey(e.target.value)} placeholder="Cole sua chave aqui..." className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#151515] text-xs font-bold outline-none border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white appearance-none" />
                    </div>
                    <button onClick={() => { onSaveKey(tempKey); }} className="w-full p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center gap-2 active:scale-95 border border-blue-100 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase"><Cloud size={16}/> Salvar & Sincronizar</button>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} className="flex-1 p-4 bg-white dark:bg-white/5 rounded-2xl flex flex-col items-center gap-2 transition-all hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-100 dark:border-white/5">
                        {themeMode === 'light' ? <Sun size={20} className="text-amber-500"/> : <Moon size={20} className="text-blue-400"/>}
                        <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">Tema</span>
                    </button>
                    <div className="flex-1 flex gap-2">
                        <button onClick={onShowOptimizationInfo} className="w-12 flex items-center justify-center p-4 bg-white dark:bg-white/5 rounded-2xl active:scale-95 text-slate-400 hover:text-blue-500 transition-colors border border-slate-100 dark:border-white/5"><Info size={20}/></button>
                        <button onClick={runOptimization} className="flex-1 p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex flex-col items-center gap-2 active:scale-95 shadow-lg shadow-purple-500/20"><Zap size={20} className="text-white"/><span className="text-[10px] font-bold uppercase text-white">Otimizar</span></button>
                    </div>
                </div>
                <button onClick={handleSave} className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-sm rounded-2xl shadow-xl active:scale-[0.98] transition-all uppercase tracking-wide">Salvar Tudo</button>
            </div>
        </Modal>
    );
};

export const SimuladoModal = ({ isOpen, onClose, simulado, onSave, onDelete, topics }: { isOpen: boolean; onClose: () => void; simulado: Simulado | null; onSave: (s: any) => void; onDelete?: (id: string) => void; topics: Topic[] }) => {
    // ... (Keep existing implementation) ...
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
    const [simTopicSearch, setSimTopicSearch] = useState('');
    useEffect(() => {
        if (isOpen && simulado) { setSelectedDifficulties(simulado.difficultyTopics || []); } else { setSelectedDifficulties([]); }
        setSimTopicSearch('');
    }, [isOpen, simulado]);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const newS = {
            id: simulado?.id, 
            name: fd.get('institution') as string, 
            year: fd.get('year') as string,
            totalQuestions: parseInt(fd.get('total') as string) || 0,
            correctCount: parseInt(fd.get('correct') as string) || 0,
            dateTaken: new Date(fd.get('date') as string + 'T12:00:00').toISOString(),
            difficultyTopics: selectedDifficulties,
            updatedAt: Date.now()
        };
        onSave(newS);
        onClose();
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={simulado ? "Editar Simulado" : "Novo Simulado"}>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[11px] font-bold text-purple-600 uppercase tracking-widest pl-1">Instituição</label>
                    <input name="institution" defaultValue={simulado?.name} autoFocus type="text" placeholder="Ex: USP, UNIFESP..." className="w-full text-lg font-bold bg-white dark:bg-zinc-900 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-900 dark:text-white border border-slate-200 dark:border-white/5 appearance-none" required />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Data</label>
                        <input name="date" type="date" defaultValue={simulado ? simulado.dateTaken.split('T')[0] : getTodayStr()} className="w-full p-4 rounded-2xl bg-white dark:bg-zinc-900 text-sm font-bold outline-none text-slate-900 dark:text-white border border-slate-200 dark:border-white/5 appearance-none min-h-[54px]" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Ano</label>
                        <input name="year" type="number" placeholder="2025" defaultValue={simulado?.year || new Date().getFullYear()} className="w-full p-4 rounded-2xl bg-white dark:bg-zinc-900 text-sm font-bold outline-none text-slate-900 dark:text-white border border-slate-200 dark:border-white/5 appearance-none" required />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest pl-1">Acertos</label>
                        <input name="correct" type="number" defaultValue={simulado?.correctCount} className="w-full p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 font-black text-2xl text-center outline-none border-2 border-transparent focus:border-emerald-500/20 appearance-none focus:bg-emerald-100 dark:focus:bg-emerald-900/30 transition-colors" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Total</label>
                        <input name="total" type="number" defaultValue={simulado?.totalQuestions || 100} className="w-full p-4 rounded-2xl bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-200 font-black text-2xl text-center outline-none border border-slate-200 dark:border-white/5 appearance-none" required />
                    </div>
                 </div>
                 <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 space-y-3">
                     <div className="flex items-center justify-between"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Target size={12}/> Temas com Dificuldade</label><span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">{selectedDifficulties.length} selecionados</span></div>
                     <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14}/><input type="text" placeholder="Buscar matéria..." value={simTopicSearch} onChange={(e) => setSimTopicSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-black/20 rounded-xl text-xs font-bold outline-none appearance-none"/></div>
                     <div className="max-h-32 overflow-y-auto custom-scrollbar space-y-1">
                         {topics.filter(t => !t.deleted && t.title.toLowerCase().includes(simTopicSearch.toLowerCase())).map(t => {
                             const isSelected = selectedDifficulties.includes(t.id);
                             return (<div key={t.id} onClick={() => { if (isSelected) setSelectedDifficulties(p => p.filter(id => id !== t.id)); else setSelectedDifficulties(p => [...p, t.id]); }} className={`p-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'}`}><span className="text-xs font-bold truncate pr-2">{t.title}</span>{isSelected && <Check size={12}/>}</div>)
                         })}
                         {topics.filter(t => !t.deleted).length === 0 && <div className="text-center text-[10px] text-slate-400 py-2">Nenhuma matéria cadastrada.</div>}
                     </div>
                     <p className="text-[9px] text-slate-400 leading-tight">Marque os temas que você errou.</p>
                 </div>
                 <div className="flex gap-4">
                    {onDelete && simulado && <button type="button" onClick={() => { if(window.confirm('Tem certeza que deseja excluir?')) { onDelete(simulado.id); onClose(); } }} className="flex-[1] bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold py-4 rounded-2xl shadow-sm active:scale-[0.98] transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-red-100 dark:border-red-500/20"><Trash2 size={16}/> <span className="hidden sm:inline">Excluir</span></button>}
                    <button type="submit" className={`flex-[2] bg-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all text-sm uppercase tracking-wider ${!simulado ? 'w-full' : ''}`}>Salvar Resultado</button>
                 </div>
            </form>
        </Modal>
    );
};

export const ReviewModal = ({ isOpen, onClose, topic, reviewIdx, onSubmit, targetAccuracy }: any) => {
    // ... (Keep existing implementation) ...
    const [formState, setFormState] = useState({ correct: 0, total: 20, difficulty: 'medium' });
    useEffect(() => { if (isOpen && topic && reviewIdx !== null) { const target = topic.reviews[reviewIdx]?.targetQ || 20; setFormState({ correct: 0, total: target, difficulty: 'medium' }); } }, [isOpen, topic, reviewIdx]);
    if (!isOpen || !topic || reviewIdx === null) return null;
    const currentReview = topic.reviews[reviewIdx];
    const scorePercentage = formState.total > 0 ? Math.round((formState.correct / formState.total) * 100) : 0;
    const handleFormSubmit = (e: React.FormEvent) => { e.preventDefault(); onSubmit(formState); onClose(); };
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Registrar Resultado">
            <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
                <div className="text-center pb-2">
                    <h4 className="font-black text-xl text-slate-800 dark:text-white leading-tight mb-1">{topic.title}</h4>
                    <div className="flex items-center justify-center gap-2"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getAreaTheme(topic.area).bg} ${getAreaTheme(topic.area).text}`}>{topic.area}</span><span className="text-xs text-slate-400 font-medium">{currentReview?.label}</span></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col items-center">
                        <label className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Acertos</label>
                        <div className="flex items-center gap-3"><button type="button" onClick={() => setFormState(s => ({...s, correct: Math.max(0, s.correct - 1)}))} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 shadow-sm flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-colors"><Minus size={14}/></button><input type="number" value={formState.correct} onChange={(e) => setFormState(s => ({...s, correct: parseInt(e.target.value) || 0}))} className="w-12 text-center text-2xl font-black bg-transparent outline-none text-slate-800 dark:text-white p-0 appearance-none" /><button type="button" onClick={() => setFormState(s => ({...s, correct: s.correct + 1}))} className="w-8 h-8 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center active:scale-90 transition-transform"><Plus size={14}/></button></div>
                    </div>
                    <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col items-center">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total</label>
                        <div className="flex items-center gap-3"><button type="button" onClick={() => setFormState(s => ({...s, total: Math.max(1, s.total - 1)}))} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors"><Minus size={14}/></button><input type="number" value={formState.total} onChange={(e) => setFormState(s => ({...s, total: parseInt(e.target.value) || 1}))} className="w-12 text-center text-2xl font-black bg-transparent outline-none text-slate-800 dark:text-white p-0 appearance-none" /><button type="button" onClick={() => setFormState(s => ({...s, total: s.total + 1}))} className="w-8 h-8 rounded-full bg-slate-800 dark:bg-white text-white dark:text-black shadow-lg flex items-center justify-center active:scale-90 transition-transform"><Plus size={14}/></button></div>
                    </div>
                </div>
                <div className="flex items-center justify-between px-2"><span className="text-xs font-bold text-slate-400">Aproveitamento</span><span className={`text-3xl font-black tracking-tight ${getPerformanceColor(scorePercentage, targetAccuracy, 'text')}`}>{scorePercentage}%</span></div>
                <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block px-1">Dificuldade Sentida</label>
                    <div className="grid grid-cols-3 gap-2">{[{ id: 'easy', label: 'Fácil', emoji: '😄', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' }, { id: 'medium', label: 'Médio', emoji: '😐', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' }, { id: 'hard', label: 'Difícil', emoji: '😓', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }].map(lvl => (<button key={lvl.id} type="button" onClick={() => setFormState(prev => ({ ...prev, difficulty: lvl.id }))} className={`py-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all border-2 ${formState.difficulty === lvl.id ? 'border-current shadow-sm scale-[1.02]' : 'border-transparent bg-slate-50 dark:bg-white/5 opacity-60 grayscale hover:opacity-100 hover:grayscale-0'} ${formState.difficulty === lvl.id ? lvl.color : ''}`}><span className="text-lg leading-none">{lvl.emoji}</span><span className="text-[9px] font-bold uppercase tracking-wide">{lvl.label}</span></button>))}</div>
                </div>
                <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-sm rounded-2xl shadow-xl shadow-slate-900/10 active:scale-[0.98] transition-all uppercase tracking-wide">Concluir Revisão</button>
            </form>
        </Modal>
    );
};

export const OptimizationInfoModal = ({ isOpen, onClose }: any) => {
    if (!isOpen) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Como Funciona a Otimização?">
            <div className="p-6 space-y-6">
                <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                    <p>O algoritmo de otimização reajusta seu cronograma para garantir que você não perca revisões importantes.</p>
                    <div className="flex gap-3"><div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0 font-bold">1</div><div><h4 className="font-bold text-slate-800 dark:text-white">Identificação de Atrasos</h4><p className="text-xs mt-1 opacity-80">O sistema varre todo o banco de dados procurando revisões que deveriam ter sido feitas ontem ou antes (atraso maior que 1 dia).</p></div></div>
                    <div className="flex gap-3"><div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 shrink-0 font-bold">2</div><div><h4 className="font-bold text-slate-800 dark:text-white">Priorização Inteligente</h4><p className="text-xs mt-1 opacity-80">As revisões são ordenadas. Matérias mais antigas e de alta importância ganham prioridade para serem agendadas para <strong>Hoje</strong>.</p></div></div>
                    <div className="flex gap-3"><div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shrink-0 font-bold">3</div><div><h4 className="font-bold text-slate-800 dark:text-white">Remanejamento Futuro</h4><p className="text-xs mt-1 opacity-80">Se uma revisão R1 atrasada é movida para hoje, as revisões futuras (R2, R3) desse tópico também são empurradas para frente, mantendo o intervalo de espaçamento correto.</p></div></div>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl text-xs font-medium text-slate-500 border border-slate-100 dark:border-white/5 flex gap-2"><Info className="shrink-0" size={16}/><p>Use esta função quando acumular muitas matérias. O sistema tentará limpar seu backlog trazendo o essencial para hoje.</p></div>
                <button onClick={onClose} className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-sm rounded-2xl uppercase tracking-wide">Entendi</button>
            </div>
        </Modal>
    );
};
