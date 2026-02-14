import React, { useRef, useState, useEffect } from 'react';
import { X, ChevronRight, Trash2, ArrowRight, Target, Key, Save, Download, Upload, Sun, Moon, Zap, Minus, Plus, Search, Check, ClipboardList, Calendar, LayoutList, History } from 'lucide-react';
import { Topic, AreaType, ImportanceType, Simulado, UserConfig, Review } from './types';
import { AREAS, formatDate, formatFullDate, getAreaTheme, getTodayStr, getPerformanceColor, OptimizationChange, getPerformanceBgLight } from './utils';

// --- Generic Modal ---
export const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children?: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300" onClick={onClose} />
            <div className="relative w-full max-w-md bg-[#ffffff] dark:bg-[#1c1c1e] md:rounded-[2rem] rounded-[2rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] flex flex-col max-h-[85vh] animate-scale-in border border-white/20 dark:border-white/10 overflow-hidden">
                <div className="px-6 py-5 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-white/50 dark:bg-white/5 backdrop-blur-xl z-10 sticky top-0">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{title}</h3>
                    <button onClick={onClose} className="p-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 rounded-full transition-colors">
                        <X size={18} className="text-slate-500 dark:text-slate-300"/>
                    </button>
                </div>
                <div className="overflow-y-auto p-0 scroll-smooth custom-scrollbar bg-[#fcfcfc] dark:bg-[#1c1c1e]">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- Unified Edit Topic Modal ---
export const EditTopicModal = ({ isOpen, onClose, topic, onSave, onDelete }: { isOpen: boolean; onClose: () => void; topic: Topic | null; onSave: (t: Topic) => void; onDelete: (id: string) => void }) => {
    const [activeTab, setActiveTab] = useState<'details' | 'history'>('details');
    
    // Reset tab when modal opens
    useEffect(() => {
        if (isOpen) setActiveTab('details');
    }, [isOpen]);

    if (!isOpen) return null;

    const safeTopic = topic || {} as Topic;
    const isNew = !safeTopic.id;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const updated = {
            ...safeTopic,
            title: fd.get('title') as string,
            area: fd.get('area') as AreaType,
            importance: fd.get('importance') as ImportanceType,
            studyDate: fd.get('date') as string,
            updatedAt: Date.now()
        };
        onSave(updated);
        // Only close if it's a new topic, otherwise user might want to continue editing
        if(isNew) onClose(); 
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isNew ? "Nova Matéria" : "Editar Matéria"}>
            <div className="flex flex-col h-full">
                {/* Tabs */}
                {!isNew && (
                    <div className="flex p-2 bg-slate-50 dark:bg-black/20 border-b border-black/5 dark:border-white/5">
                        <button 
                            onClick={() => setActiveTab('details')}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${activeTab === 'details' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutList size={14}/> Detalhes
                        </button>
                        <button 
                            onClick={() => setActiveTab('history')}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${activeTab === 'history' ? 'bg-white dark:bg-white/10 shadow-sm text-purple-600 dark:text-purple-400' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <History size={14}/> Histórico
                        </button>
                    </div>
                )}

                {activeTab === 'details' ? (
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tema</label>
                            <input name="title" defaultValue={safeTopic.title || ''} type="text" className="w-full text-xl font-bold bg-slate-100 dark:bg-black/20 p-4 rounded-2xl outline-none text-slate-900 dark:text-white" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Área</label>
                                <div className="relative">
                                    <select name="area" defaultValue={safeTopic.area || 'clinica'} className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-black/20 text-sm font-bold outline-none appearance-none cursor-pointer text-slate-900 dark:text-white">
                                        {AREAS.map(a => <option key={a.id} value={a.id}>{a.full}</option>)}
                                    </select>
                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={16}/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Início</label>
                                <input name="date" type="date" defaultValue={safeTopic.studyDate || getTodayStr()} className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-black/20 text-sm font-bold outline-none text-slate-900 dark:text-white" required />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Prioridade</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['low','medium','high'].map(lvl => (
                                    <label key={lvl} className="cursor-pointer">
                                        <input type="radio" name="importance" value={lvl} className="peer hidden" defaultChecked={safeTopic.importance === lvl || (!safeTopic.importance && lvl === 'medium')}/>
                                        <div className="py-3 text-center rounded-2xl border-2 border-transparent bg-slate-100 dark:bg-black/20 text-xs font-bold text-slate-500 peer-checked:bg-slate-900 dark:peer-checked:bg-white peer-checked:text-white dark:peer-checked:text-black transition-all uppercase">{lvl === 'high' ? 'Alta' : lvl === 'medium' ? 'Média' : 'Baixa'}</div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                            {safeTopic.id && (
                                <button type="button" onClick={() => { onDelete(safeTopic.id); onClose(); }} className="flex-1 py-4 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-2xl active:scale-95 transition-all uppercase tracking-wide flex items-center justify-center gap-2"><Trash2 size={18}/> Excluir</button>
                            )}
                            <button type="submit" className={`flex-[2] py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-wide ${!safeTopic.id ? 'w-full' : ''}`}>Salvar</button>
                        </div>
                    </form>
                ) : (
                    <div className="p-4 space-y-3">
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wide text-center mb-2">Cronograma de Revisões</div>
                        {safeTopic.reviews.map((r, i) => {
                            const isDone = r.done;
                            const isLate = !isDone && r.date < getTodayStr();
                            const acc = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
                            
                            return (
                                <div key={i} className={`p-3 rounded-xl border ${isDone ? 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/5' : 'bg-slate-50 dark:bg-white/5 border-dashed border-slate-200 dark:border-white/10'} flex items-center justify-between`}>
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

// --- Edit Review History Modal ---
interface EditReviewHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    topic: Topic | null;
    reviewIdx: number | null;
    onSave: (data: { date: string, correct: number, total: number }) => void;
}

export const EditReviewHistoryModal = ({ isOpen, onClose, topic, reviewIdx, onSave }: EditReviewHistoryModalProps) => {
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
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Data Realizada</label>
                    <input name="date" type="date" defaultValue={review.date} className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-black/20 text-sm font-bold outline-none text-slate-900 dark:text-white" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">Acertos</label>
                        <input name="correct" type="number" defaultValue={review.correct} className="w-full p-4 rounded-2xl bg-emerald-500/10 text-emerald-600 font-black text-2xl text-center outline-none" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Total</label>
                        <input name="total" type="number" defaultValue={review.total} className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-black/20 text-slate-700 dark:text-slate-200 font-black text-2xl text-center outline-none" required />
                    </div>
                </div>

                <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-sm rounded-2xl shadow-xl active:scale-[0.98] transition-all uppercase tracking-wide">
                    Atualizar Registro
                </button>
            </form>
        </Modal>
    )
}

// --- Optimization Result Modal ---
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

                <div className="p-6 pt-4 border-t border-slate-100 dark:border-white/5 mt-auto bg-white dark:bg-[#1c1c1e] z-10 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-4 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-bold rounded-2xl active:scale-95 transition-all uppercase tracking-wide text-xs">Cancelar</button>
                    <button onClick={onConfirm} className="flex-[2] py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl active:scale-95 transition-all uppercase tracking-wide shadow-lg text-xs">Confirmar & Sincronizar</button>
                </div>
            </div>
        </Modal>
    );
};

// --- Settings Modal ---
interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    config: UserConfig;
    onSaveConfig: (c: UserConfig) => void;
    syncKey: string;
    onSaveKey: (k: string) => void;
    onExport: () => void;
    onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
    themeMode: 'light' | 'dark' | 'system';
    setThemeMode: (m: 'light' | 'dark' | 'system') => void;
    runOptimization: () => void;
}

export const SettingsModal = ({ isOpen, onClose, config, onSaveConfig, syncKey, onSaveKey, onExport, onImport, themeMode, setThemeMode, runOptimization }: SettingsModalProps) => {
    const [tempKey, setTempKey] = useState(syncKey);
    const [tempConfig, setTempConfig] = useState(config);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { setTempKey(syncKey); }, [syncKey]);
    useEffect(() => { setTempConfig(config); }, [config]);

    const handleSave = () => {
        onSaveConfig(tempConfig);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Configurações">
            <div className="p-6 space-y-6">
                <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-3xl space-y-4 border border-slate-100 dark:border-white/5">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2"><Target size={18} className="text-blue-500"/> Metas de Estudo</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Data da Prova</label>
                            <input type="date" value={tempConfig.examDate} onChange={e => setTempConfig(prev => ({ ...prev, examDate: e.target.value }))} className="w-full p-3 rounded-xl bg-white dark:bg-black/20 text-xs font-bold outline-none border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Meta Acerto (%)</label>
                            <input type="number" value={tempConfig.targetAccuracy} onChange={e => setTempConfig(prev => ({ ...prev, targetAccuracy: Number(e.target.value) }))} className="w-full p-3 rounded-xl bg-white dark:bg-black/20 text-xs font-bold outline-none border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white" />
                        </div>
                    </div>
                </div>

                <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-3xl space-y-4 border border-slate-100 dark:border-white/5">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2"><Key size={18} className="text-amber-500"/> Sincronização</h4>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Chave Firebase (Sync Key)</label>
                        <input 
                            type="text" 
                            value={tempKey} 
                            onChange={e => setTempKey(e.target.value)} 
                            placeholder="Cole sua chave aqui..."
                            className="w-full p-3 rounded-xl bg-white dark:bg-black/20 text-xs font-bold outline-none border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white" 
                        />
                    </div>
                    <button onClick={() => { onSaveKey(tempKey); }} className="w-full p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center gap-2 active:scale-95 border border-blue-100 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase">
                        <Key size={16}/> Salvar Chave
                    </button>
                </div>

                <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-3xl space-y-4 border border-slate-100 dark:border-white/5">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2"><Save size={18} className="text-emerald-500"/> Backup & Dados</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={onExport} className="p-3 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl flex flex-col items-center gap-2 active:scale-95 transition-all text-slate-600 dark:text-slate-300">
                            <Download size={20}/>
                            <span className="text-[10px] font-bold uppercase">Exportar</span>
                        </button>
                        <button onClick={() => fileInputRef.current?.click()} className="p-3 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl flex flex-col items-center gap-2 active:scale-95 transition-all text-slate-600 dark:text-slate-300">
                            <Upload size={20}/>
                            <span className="text-[10px] font-bold uppercase">Importar</span>
                        </button>
                        <input type="file" ref={fileInputRef} onChange={onImport} className="hidden" accept=".json" />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} className="flex-1 p-4 bg-slate-100 dark:bg-white/5 rounded-2xl flex flex-col items-center gap-2 transition-all hover:bg-slate-200 dark:hover:bg-white/10">
                        {themeMode === 'light' ? <Sun size={20} className="text-amber-500"/> : <Moon size={20} className="text-blue-400"/>}
                        <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">Tema</span>
                    </button>
                    <button onClick={runOptimization} className="flex-1 p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex flex-col items-center gap-2 active:scale-95 shadow-lg shadow-purple-500/20">
                        <Zap size={20} className="text-white"/>
                        <span className="text-[10px] font-bold uppercase text-white">Otimizar</span>
                    </button>
                </div>

                <button onClick={handleSave} className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-sm rounded-2xl shadow-xl active:scale-[0.98] transition-all uppercase tracking-wide">Salvar Tudo</button>
            </div>
        </Modal>
    );
};

// --- Simulado Modal ---
interface SimuladoModalProps {
    isOpen: boolean;
    onClose: () => void;
    simulado: Simulado | null;
    onSave: (s: any) => void;
    topics: Topic[];
}

export const SimuladoModal = ({ isOpen, onClose, simulado, onSave, topics }: SimuladoModalProps) => {
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
    const [simTopicSearch, setSimTopicSearch] = useState('');

    useEffect(() => {
        if (isOpen && simulado) {
            setSelectedDifficulties(simulado.difficultyTopics || []);
        } else {
            setSelectedDifficulties([]);
        }
        setSimTopicSearch('');
    }, [isOpen, simulado]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        
        const newS = {
            id: simulado?.id, // Let parent handle ID generation if null
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
                    <label className="text-[11px] font-bold text-purple-600 uppercase tracking-widest">Instituição</label>
                    <input name="institution" defaultValue={simulado?.name} autoFocus type="text" placeholder="Ex: USP, UNIFESP..." className="w-full text-xl font-bold bg-slate-100 dark:bg-black/20 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-900 dark:text-white" required />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Data</label>
                        <input name="date" type="date" defaultValue={simulado ? simulado.dateTaken.split('T')[0] : getTodayStr()} className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-black/20 text-sm font-bold outline-none text-slate-900 dark:text-white" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Ano</label>
                        <input name="year" type="number" placeholder="2025" defaultValue={simulado?.year || new Date().getFullYear()} className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-black/20 text-sm font-bold outline-none text-slate-900 dark:text-white" required />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">Acertos</label>
                        <input name="correct" type="number" defaultValue={simulado?.correctCount} className="w-full p-4 rounded-2xl bg-emerald-500/10 text-emerald-600 font-black text-2xl text-center outline-none border-2 border-transparent focus:border-emerald-500/20" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Total</label>
                        <input name="total" type="number" defaultValue={simulado?.totalQuestions || 100} className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-black/20 text-slate-700 dark:text-slate-200 font-black text-2xl text-center outline-none" required />
                    </div>
                 </div>

                 {/* Difficult Topics Selection */}
                 <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 space-y-3">
                     <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Target size={12}/> Temas com Dificuldade</label>
                        <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">{selectedDifficulties.length} selecionados</span>
                     </div>
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14}/>
                        <input 
                            type="text" 
                            placeholder="Buscar matéria..." 
                            value={simTopicSearch}
                            onChange={(e) => setSimTopicSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-black/20 rounded-xl text-xs font-bold outline-none"
                        />
                     </div>
                     <div className="max-h-32 overflow-y-auto custom-scrollbar space-y-1">
                         {topics
                            .filter(t => !t.deleted && t.title.toLowerCase().includes(simTopicSearch.toLowerCase()))
                            .map(t => {
                             const isSelected = selectedDifficulties.includes(t.id);
                             return (
                                 <div 
                                    key={t.id} 
                                    onClick={() => {
                                        if (isSelected) setSelectedDifficulties(p => p.filter(id => id !== t.id));
                                        else setSelectedDifficulties(p => [...p, t.id]);
                                    }}
                                    className={`p-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'}`}
                                 >
                                     <span className="text-xs font-bold truncate pr-2">{t.title}</span>
                                     {isSelected && <Check size={12}/>}
                                 </div>
                             )
                         })}
                         {topics.filter(t => !t.deleted).length === 0 && <div className="text-center text-[10px] text-slate-400 py-2">Nenhuma matéria cadastrada.</div>}
                     </div>
                     <p className="text-[9px] text-slate-400 leading-tight">Marque os temas que você errou. Eles receberão uma revisão extra no cronograma.</p>
                 </div>

                 <button className="w-full bg-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all text-sm uppercase tracking-wider">Salvar Resultado</button>
            </form>
        </Modal>
    );
};

// --- Review Modal ---
interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    topic: Topic | null;
    reviewIdx: number | null;
    onSubmit: (data: { correct: number; total: number; difficulty: string }) => void;
    targetAccuracy: number;
}

export const ReviewModal = ({ isOpen, onClose, topic, reviewIdx, onSubmit, targetAccuracy }: ReviewModalProps) => {
    const [formState, setFormState] = useState({ correct: 0, total: 20, difficulty: 'medium' });

    useEffect(() => {
        if (isOpen && topic && reviewIdx !== null) {
            const target = topic.reviews[reviewIdx]?.targetQ || 20;
            setFormState({ correct: 0, total: target, difficulty: 'medium' });
        }
    }, [isOpen, topic, reviewIdx]);

    if (!isOpen || !topic || reviewIdx === null) return null;

    const currentReview = topic.reviews[reviewIdx];
    const scorePercentage = formState.total > 0 ? Math.round((formState.correct / formState.total) * 100) : 0;

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Registrar Resultado">
            <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
                {/* Header Info */}
                <div className="text-center pb-2">
                    <h4 className="font-black text-xl text-slate-800 dark:text-white leading-tight mb-1">{topic.title}</h4>
                    <div className="flex items-center justify-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getAreaTheme(topic.area).bg} ${getAreaTheme(topic.area).text}`}>
                            {topic.area}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{currentReview?.label}</span>
                    </div>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col items-center">
                        <label className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Acertos</label>
                        <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setFormState(s => ({...s, correct: Math.max(0, s.correct - 1)}))} className="w-8 h-8 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-colors"><Minus size={14}/></button>
                            <input 
                                type="number" 
                                value={formState.correct} 
                                onChange={(e) => setFormState(s => ({...s, correct: parseInt(e.target.value) || 0}))} 
                                className="w-12 text-center text-2xl font-black bg-transparent outline-none text-slate-800 dark:text-white p-0" 
                            />
                            <button type="button" onClick={() => setFormState(s => ({...s, correct: s.correct + 1}))} className="w-8 h-8 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center active:scale-90 transition-transform"><Plus size={14}/></button>
                        </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col items-center">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total</label>
                        <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setFormState(s => ({...s, total: Math.max(1, s.total - 1)}))} className="w-8 h-8 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors"><Minus size={14}/></button>
                            <input 
                                type="number" 
                                value={formState.total} 
                                onChange={(e) => setFormState(s => ({...s, total: parseInt(e.target.value) || 1}))} 
                                className="w-12 text-center text-2xl font-black bg-transparent outline-none text-slate-800 dark:text-white p-0" 
                            />
                            <button type="button" onClick={() => setFormState(s => ({...s, total: s.total + 1}))} className="w-8 h-8 rounded-full bg-slate-800 dark:bg-white text-white dark:text-black shadow-lg flex items-center justify-center active:scale-90 transition-transform"><Plus size={14}/></button>
                        </div>
                    </div>
                </div>

                {/* Result Preview */}
                <div className="flex items-center justify-between px-2">
                    <span className="text-xs font-bold text-slate-400">Aproveitamento</span>
                    <span className={`text-3xl font-black tracking-tight ${getPerformanceColor(scorePercentage, targetAccuracy, 'text')}`}>
                        {scorePercentage}%
                    </span>
                </div>

                {/* Difficulty */}
                <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block px-1">Dificuldade Sentida</label>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { id: 'easy', label: 'Fácil', emoji: '😄', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
                            { id: 'medium', label: 'Médio', emoji: '😐', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
                            { id: 'hard', label: 'Difícil', emoji: '😓', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }
                        ].map(lvl => (
                            <button 
                                key={lvl.id}
                                type="button"
                                onClick={() => setFormState(prev => ({ ...prev, difficulty: lvl.id }))}
                                className={`py-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all border-2 ${formState.difficulty === lvl.id ? 'border-current shadow-sm scale-[1.02]' : 'border-transparent bg-slate-50 dark:bg-white/5 opacity-60 grayscale hover:opacity-100 hover:grayscale-0'} ${formState.difficulty === lvl.id ? lvl.color : ''}`}
                            >
                                <span className="text-lg leading-none">{lvl.emoji}</span>
                                <span className="text-[9px] font-bold uppercase tracking-wide">{lvl.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-sm rounded-2xl shadow-xl shadow-slate-900/10 active:scale-[0.98] transition-all uppercase tracking-wide">
                    Concluir Revisão
                </button>
            </form>
        </Modal>
    );
};