import React, { useState, useMemo } from 'react';
import { ClipboardList, Search, Edit, Trash2 } from 'lucide-react';
import { Simulado, Topic, UserConfig } from './types';
import { formatDate, getPerformanceBgLight } from './utils';

export const SimuladosView = ({ simulados, topics, config, onDelete, onEdit, searchTerm }: { simulados: Simulado[], topics: Topic[], config: UserConfig, onDelete: (id: string) => void, onEdit: (s: Simulado) => void, searchTerm?: string }) => {
    
    const filtered = useMemo(() => {
        return simulados.filter(s => !s.deleted).filter(s => {
            if (searchTerm && !s.name.toLowerCase().includes(searchTerm.toLowerCase()) && !s.year.includes(searchTerm)) return false;
            return true;
        }).sort((a,b) => new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime());
    }, [simulados, searchTerm]);

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <div className="space-y-1 hidden sm:block">
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3"><ClipboardList size={28} className="text-purple-500"/> Simulados</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Histórico de Provas</p>
                </div>
            </div>

            <div className="flex-1 bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/10 shadow-sm overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-black/20 sticky top-0 backdrop-blur-sm z-10">
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
                                const acc = s.totalQuestions > 0 ? Math.round((s.correctCount / s.totalQuestions) * 100) : 0;
                                const performanceBg = getPerformanceBgLight(acc, config.targetAccuracy);

                                return (
                                    <tr key={s.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer" onClick={() => onEdit(s)}>
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
                                                <button onClick={(e) => { e.stopPropagation(); onEdit(s); }} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg text-slate-400 hover:text-blue-500 transition-colors"><Edit size={16}/></button>
                                                <button onClick={(e) => { e.stopPropagation(); onDelete(s.id); }} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
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