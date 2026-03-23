
import React, { useState, useMemo } from 'react';
import { ClipboardList, Search, Edit, Trash2, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';
import { Simulado, Topic, UserConfig } from '../types';
import { formatDate, getPerformanceBgLight } from '../utils';
import { EvolutionChart } from '../components';

export const SimuladosView = ({ simulados, topics, config, onDelete, onEdit, searchTerm }: { simulados: Simulado[], topics: Topic[], config: UserConfig, onDelete: (id: string) => void, onEdit: (s: Simulado) => void, searchTerm?: string }) => {
    
    const [chartLimit, setChartLimit] = useState<5 | 10>(5);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filtered = useMemo(() => {
        return simulados.filter(s => !s.deleted).filter(s => {
            if (searchTerm && !s.name.toLowerCase().includes(searchTerm.toLowerCase()) && !s.year.includes(searchTerm)) return false;
            return true;
        }).sort((a,b) => new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime());
    }, [simulados, searchTerm]);

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in gap-6">
             <div className="hidden lg:flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h3 className="text-3xl font-black text-slate-800 dark:text-slate-200 tracking-tight flex items-center gap-3"><ClipboardList size={28} className="text-purple-500"/> Simulados</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Histórico de Provas</p>
                </div>
            </div>

            {/* Performance Chart Section */}
            <div className="glass-panel p-6 rounded-[32px] shadow-sm flex flex-col h-64 relative overflow-hidden mt-2 lg:mt-0">
                <div className="w-full flex items-center justify-between mb-4 z-10">
                    <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2"><BarChart2 size={16} className="text-purple-500"/> Desempenho Recente</h4>
                    <div className="flex bg-slate-100 dark:bg-slate-200/10 p-1 rounded-lg">
                        <button onClick={() => setChartLimit(5)} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${chartLimit === 5 ? 'bg-white dark:bg-zinc-800 shadow-sm text-slate-800 dark:text-slate-100' : 'text-slate-400 hover:text-slate-600'}`}>Últimos 5</button>
                        <button onClick={() => setChartLimit(10)} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${chartLimit === 10 ? 'bg-white dark:bg-zinc-800 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}>Últimos 10</button>
                    </div>
                </div>
                <div className="flex-1 w-full relative z-10">
                    <div className="absolute inset-0">
                        <EvolutionChart simulados={simulados.filter(s => !s.deleted)} targetAccuracy={config.targetAccuracy} limit={chartLimit} />
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none"></div>
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
                                const isExpanded = expandedId === s.id;

                                return (
                                    <React.Fragment key={s.id}>
                                        <tr onClick={() => setExpandedId(isExpanded ? null : s.id)} className={`group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${isExpanded ? 'bg-slate-50 dark:bg-white/5' : ''}`}>
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
                                                <div className="text-slate-400">{isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</div>
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr className="bg-slate-50 dark:bg-white/5 animate-fade-in border-b border-slate-100 dark:border-white/5">
                                                <td colSpan={5} className="p-4">
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex flex-wrap gap-2">
                                                            <div className="w-full text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Temas com Dificuldade</div>
                                                            {s.difficultyTopics && s.difficultyTopics.length > 0 ? (
                                                                s.difficultyTopics.map(tid => {
                                                                    const t = topics.find(tp => tp.id === tid);
                                                                    return t ? <span key={tid} className="px-2 py-1 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-300">{t.title}</span> : null;
                                                                })
                                                            ) : (
                                                                <span className="text-[10px] text-slate-400 italic">Nenhum tema marcado.</span>
                                                            )}
                                                        </div>
                                                        
                                                        <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-slate-200 dark:border-white/5">
                                                            <button onClick={(e) => { e.stopPropagation(); onEdit(s); }} className="flex items-center gap-2 px-4 py-2 hover:bg-white dark:hover:bg-white/10 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                                                                <Edit size={14}/> Editar
                                                            </button>
                                                            <button onClick={(e) => { e.stopPropagation(); onDelete(s.id); }} className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-xs font-bold text-slate-500 hover:text-red-500 transition-colors">
                                                                <Trash2 size={14}/> Excluir
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
