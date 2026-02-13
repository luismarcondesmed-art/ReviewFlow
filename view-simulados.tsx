
import React, { useState, useMemo } from 'react';
import { ClipboardList, Search, Edit, Trash2, Plus, X, Save, Check } from 'lucide-react';
import { Simulado, Topic, UserConfig } from './types';
import { formatDate, getPerformanceBgLight, getTodayStr } from './utils';

// --- Inline Simulado Creator ---
const SimuladoCreator = ({ onAdd, onCancel }: { onAdd: (s: any) => void, onCancel: () => void }) => {
    const [name, setName] = useState('');
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [date, setDate] = useState(getTodayStr());
    const [correct, setCorrect] = useState<string>('');
    const [total, setTotal] = useState<string>('100');

    const handleSave = () => {
        if (!name) return;
        onAdd({
            name,
            year,
            dateTaken: date + 'T12:00:00',
            correctCount: parseInt(correct) || 0,
            totalQuestions: parseInt(total) || 100,
            difficultyTopics: []
        });
    };

    return (
        <div className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5 p-4 animate-slide-up">
            <div className="flex flex-col gap-3">
                <input 
                    autoFocus
                    placeholder="Instituição (ex: USP, UNIFESP)"
                    className="w-full p-3 rounded-lg bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-sm font-bold outline-none text-slate-900 dark:text-white"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <div className="flex gap-2">
                    <input 
                        type="number" 
                        placeholder="Ano"
                        className="w-24 p-2.5 rounded-lg bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs font-bold outline-none text-slate-800 dark:text-white"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                    />
                    <input 
                        type="date" 
                        className="flex-1 p-2.5 rounded-lg bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs font-bold outline-none text-slate-800 dark:text-white"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">Acertos</span>
                        <input 
                            type="number" 
                            className="w-16 text-right font-black bg-transparent outline-none text-emerald-600"
                            placeholder="0"
                            value={correct}
                            onChange={e => setCorrect(e.target.value)}
                        />
                    </div>
                    <span className="text-slate-300">/</span>
                    <div className="flex-1 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
                        <input 
                            type="number" 
                            className="w-16 text-right font-black bg-transparent outline-none text-slate-600 dark:text-slate-300"
                            placeholder="100"
                            value={total}
                            onChange={e => setTotal(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                    <button onClick={onCancel} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400">Cancelar</button>
                    <button onClick={handleSave} className="px-6 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-purple-500 transition-colors">Salvar</button>
                </div>
            </div>
        </div>
    );
};

export const SimuladosView = ({ simulados, topics, config, onDelete, onEdit, onUpdateSimulado, onAddSimulado, searchTerm }: { simulados: Simulado[], topics: Topic[], config: UserConfig, onDelete: (id: string) => void, onEdit?: (s: Simulado) => void, onUpdateSimulado?: (s: Simulado) => void, onAddSimulado?: (s: any) => void, searchTerm?: string }) => {
    
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>(null);

    const filtered = useMemo(() => {
        return simulados.filter(s => !s.deleted).filter(s => {
            if (searchTerm && !s.name.toLowerCase().includes(searchTerm.toLowerCase()) && !s.year.includes(searchTerm)) return false;
            return true;
        }).sort((a,b) => new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime());
    }, [simulados, searchTerm]);

    const startEditing = (s: Simulado) => {
        setEditingId(s.id);
        setEditForm({ 
            ...s, 
            date: s.dateTaken.split('T')[0] 
        });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditForm(null);
    };

    const saveEditing = () => {
        if (!editForm || !onUpdateSimulado) return;
        onUpdateSimulado({
            ...editForm,
            dateTaken: editForm.date + 'T12:00:00'
        });
        setEditingId(null);
        setEditForm(null);
    };

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <div className="space-y-1 hidden sm:block">
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3"><ClipboardList size={28} className="text-purple-500"/> Simulados</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Histórico de Provas</p>
                </div>
                
                {onAddSimulado && (
                    <button 
                        onClick={() => setIsCreating(!isCreating)} 
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${isCreating ? 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300' : 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg hover:scale-105 active:scale-95'}`}
                    >
                        {isCreating ? <X size={16}/> : <Plus size={16}/>}
                        {isCreating ? 'Fechar' : 'Novo Simulado'}
                    </button>
                )}
            </div>

            <div className="flex-1 bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
                
                {isCreating && onAddSimulado && (
                    <SimuladoCreator 
                        onAdd={(s) => { onAddSimulado(s); setIsCreating(false); }}
                        onCancel={() => setIsCreating(false)}
                    />
                )}

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-[#18181b] sticky top-0 backdrop-blur-sm z-10 border-b border-slate-100 dark:border-white/5">
                            <tr>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Instituição</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell">Ano</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Data</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Desempenho</th>
                                <th className="p-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {filtered.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-slate-400 text-xs font-bold">Nenhum simulado registrado.</td></tr>
                            ) : filtered.map(s => {
                                const isEditing = editingId === s.id;
                                const acc = s.totalQuestions > 0 ? Math.round((s.correctCount / s.totalQuestions) * 100) : 0;
                                const performanceBg = getPerformanceBgLight(acc, config.targetAccuracy);

                                if (isEditing) {
                                    return (
                                        <tr key={s.id} className="bg-purple-50/30 dark:bg-purple-900/10">
                                            <td className="p-3">
                                                <input 
                                                    autoFocus
                                                    className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-2 py-1 text-sm font-bold text-slate-800 dark:text-white"
                                                    value={editForm.name}
                                                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                                                />
                                            </td>
                                            <td className="p-3 hidden sm:table-cell">
                                                <input 
                                                    className="w-16 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-2 py-1 text-xs font-bold"
                                                    value={editForm.year}
                                                    onChange={e => setEditForm({...editForm, year: e.target.value})}
                                                />
                                            </td>
                                            <td className="p-3">
                                                <input 
                                                    type="date"
                                                    className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-2 py-1 text-xs font-bold"
                                                    value={editForm.date}
                                                    onChange={e => setEditForm({...editForm, date: e.target.value})}
                                                />
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <input 
                                                        type="number" 
                                                        className="w-12 text-center bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-1 py-1 text-xs font-bold text-emerald-600"
                                                        value={editForm.correctCount}
                                                        onChange={e => setEditForm({...editForm, correctCount: parseInt(e.target.value)||0})}
                                                    />
                                                    <span>/</span>
                                                    <input 
                                                        type="number" 
                                                        className="w-12 text-center bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-1 py-1 text-xs font-bold text-slate-500"
                                                        value={editForm.totalQuestions}
                                                        onChange={e => setEditForm({...editForm, totalQuestions: parseInt(e.target.value)||100})}
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={cancelEditing} className="p-1.5 hover:bg-slate-200 dark:hover:bg-white/10 rounded"><X size={14}/></button>
                                                    <button onClick={saveEditing} className="p-1.5 bg-purple-600 text-white rounded hover:bg-purple-500"><Check size={14}/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }

                                return (
                                    <tr key={s.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-bold text-sm text-slate-800 dark:text-white">{s.name}</td>
                                        <td className="p-4 text-xs font-bold text-slate-500 hidden sm:table-cell">{s.year}</td>
                                        <td className="p-4 text-xs font-bold text-slate-500 text-center">{formatDate(s.dateTaken.split('T')[0])}</td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center">
                                                <div className={`px-3 py-1 rounded-lg text-xs font-black ${performanceBg}`}>
                                                    {acc}% <span className="opacity-60 text-[10px] ml-1">({s.correctCount}/{s.totalQuestions})</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => startEditing(s)} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg text-slate-400 hover:text-blue-500 transition-colors"><Edit size={16}/></button>
                                                <button onClick={() => onDelete(s.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
