import React, { useState } from 'react';
import { 
    Activity, Flame, GraduationCap, ArrowDown, ChevronDown, X
} from 'lucide-react';
import { Simulado, Topic, UserConfig } from '../types';
import { AREAS, getPerformanceColor } from '../utils';
import { HeatmapWidget, EvolutionChart } from '../components';
import { useAnalytics } from '../hooks';

export const AnalyticsHub = ({ topics, simulados, config, onEditTopic, onEditHistory }: { topics: Topic[], simulados: Simulado[], config: UserConfig, onEditTopic: (id: string) => void, onEditHistory: (topicId: string, idx: number) => void }) => {
    const [period, setPeriod] = useState<'7d' | '30d' | 'all'>('30d');
    const [areaFilter, setAreaFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<'all' | 'topics' | 'simulados'>('all');
    const [simInstitution, setSimInstitution] = useState<string>('all');
    const [simYear, setSimYear] = useState<string>('all');

    // Use Custom Hook for Heavy Lifting
    const { institutions, years, metrics, filteredSimuladosForChart } = useAnalytics(topics, simulados, { period, typeFilter, areaFilter, simInstitution, simYear });

    return (
        <div className="h-full flex flex-col pb-32 lg:pb-0 animate-scale-in">
             <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
                <div className="space-y-1 hidden sm:block">
                    <h3 className="text-3xl font-black text-slate-800 dark:text-slate-200 tracking-tight flex items-center gap-3"><Activity size={28} className="text-slate-500"/> Estatísticas</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Analytics & Performance</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
                <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl p-1 flex w-fit">
                    {['7d', '30d', 'all'].map(p => (
                        <button 
                            key={p} 
                            onClick={() => setPeriod(p as any)} 
                            className={`px-4 rounded-lg text-[10px] font-bold uppercase transition-all py-2 ${period === p ? 'bg-slate-800 dark:bg-slate-200 text-slate-100 dark:text-black shadow-sm' : 'text-slate-500'}`}
                        >
                            {p === 'all' ? 'Tudo' : p.toUpperCase()}
                        </button>
                    ))}
                </div>
                
                <div className="relative w-36">
                    <select 
                        value={typeFilter}
                        onChange={(e) => { setTypeFilter(e.target.value as any); setAreaFilter('all'); setSimInstitution('all'); setSimYear('all'); }}
                        className="w-full h-full bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl px-4 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none appearance-none cursor-pointer"
                    >
                        <option value="all">Tudo</option>
                        <option value="topics">Matérias</option>
                        <option value="simulados">Simulados</option>
                    </select>
                    <ArrowDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                </div>

                {typeFilter === 'topics' && (
                    <div className="relative w-40 animate-scale-in">
                        <select 
                            value={areaFilter} 
                            onChange={(e) => { setAreaFilter(e.target.value); }} 
                            className="w-full h-full bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl px-4 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none appearance-none cursor-pointer"
                        >
                            <option value="all">Todas as Áreas</option>
                            {AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                        <ArrowDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                )}
            </div>

            {typeFilter === 'simulados' && (
                <div className="flex flex-wrap gap-3 mb-8 transition-all animate-scale-in">
                    <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/10 px-3 py-1.5 rounded-lg border border-purple-100 dark:border-purple-500/20">
                        <span className="text-[10px] font-bold text-purple-600 uppercase">Filtros de Simulado:</span>
                        <div className="relative w-32">
                             <select 
                                value={simInstitution}
                                onChange={(e) => setSimInstitution(e.target.value)}
                                className="w-full bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 outline-none appearance-none pr-4 cursor-pointer"
                            >
                                <option value="all">Instituição</option>
                                {institutions.map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                             <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                        </div>
                        <div className="w-px h-3 bg-purple-200 dark:bg-purple-800"></div>
                         <div className="relative w-24">
                             <select 
                                value={simYear}
                                onChange={(e) => setSimYear(e.target.value)}
                                className="w-full bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 outline-none appearance-none pr-4 cursor-pointer"
                            >
                                <option value="all">Ano</option>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                             <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                        </div>
                        {(simInstitution !== 'all' || simYear !== 'all') && (
                            <button onClick={() => { setSimInstitution('all'); setSimYear('all'); }} className="ml-2 text-slate-400 hover:text-red-500"><X size={12}/></button>
                        )}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="glass-panel rounded-[32px] p-6 shadow-sm flex flex-col justify-between items-center h-64 relative overflow-hidden">
                    <div className="w-full flex items-center justify-between mb-2 z-10">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2"><Flame size={16} className="text-orange-500"/> Atividade Recente</h4>
                    </div>
                    <div className="flex-1 flex items-center justify-center w-full z-10">
                        <HeatmapWidget topics={topics} simulados={simulados} />
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                </div>
                
                <div className="glass-panel rounded-[32px] p-6 shadow-sm flex flex-col h-64 relative overflow-visible">
                    <div className="w-full flex items-center justify-between mb-2 z-10">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2"><GraduationCap size={16} className="text-purple-500"/> Evolução nos Simulados</h4>
                    </div>
                    <div className="flex-1 w-full relative z-10">
                        <div className="absolute inset-0">
                            <EvolutionChart simulados={filteredSimuladosForChart} targetAccuracy={config.targetAccuracy} />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm">
                    <div className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-2">Aproveitamento</div>
                    <div className={`text-4xl font-black ${getPerformanceColor(metrics.acc, config.targetAccuracy, 'text')}`}>{metrics.acc}%</div>
                </div>
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-[24px] border border-black/5 dark:border-white/5 shadow-sm">
                    <div className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-2">Questões Feitas</div>
                    <div className="text-4xl font-black text-slate-800 dark:text-white">{metrics.total}</div>
                </div>
                <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-[24px] border border-emerald-100 dark:border-emerald-500/10 shadow-sm">
                    <div className="text-emerald-600/60 dark:text-emerald-400/60 text-[9px] font-bold uppercase tracking-widest mb-2">Acertos</div>
                    <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400">{metrics.correct}</div>
                </div>
                <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-[24px] border border-red-100 dark:border-red-500/10 shadow-sm">
                    <div className="text-red-600/60 dark:text-red-400/60 text-[9px] font-bold uppercase tracking-widest mb-2">Erros</div>
                    <div className="text-4xl font-black text-red-600 dark:text-red-400">{metrics.wrong}</div>
                </div>
            </div>
<<<<<<< HEAD

            <div className="mb-8">
                <div className="bg-slate-900 dark:bg-zinc-900 shadow-xl overflow-hidden rounded-[32px] p-8 relative flex flex-col lg:flex-row gap-8 items-center border border-slate-800 dark:border-white/5">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                    
                    <div className="flex-1 space-y-4 relative z-10 w-full">
                        <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-widest w-fit border border-blue-500/30">
                            FSRS & Retrievability
                        </div>
                        <h3 className="text-2xl font-black text-white leading-tight">A Ciência da Memória</h3>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                            Nosso sistema utiliza o <strong>Free Spaced Repetition Scheduler (FSRS)</strong> baseado na pesquisa de Piotr Wozniak (1990) e estudos de metanálise do modelo de memória de longo prazo (DHP), atualizando dinamicamente a curva de esquecimento (Ebbinghaus) de cada módulo conforme o seu <i>recall</i> e dificuldade percebida, mitigando excesso de revisões (<i>over-reviewing</i>) passivas.
                        </p>
                        <div className="flex gap-4 pt-2">
                             <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex-1">
                                <h4 className="text-white font-bold text-sm mb-1">Retrievability (R)</h4>
                                <p className="text-slate-400 text-[10px] uppercase font-bold">Probabilidade de Lembrar</p>
                             </div>
                             <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex-1">
                                <h4 className="text-white font-bold text-sm mb-1">Stability (S)</h4>
                                <p className="text-slate-400 text-[10px] uppercase font-bold">Tempo até R cair para 90%</p>
                             </div>
                        </div>
                    </div>

                    <div className="relative z-10 w-full lg:w-1/3 shrink-0 flex flex-col items-center">
                         {/* Graph Representation */}
                         <div className="w-full aspect-video border-b-2 border-l-2 border-slate-700 relative mb-4">
                             <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full overflow-visible">
                                {/* Forgetting Curves */}
                                <path d="M 0,0 Q 15,40 30,50" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="2,2"/>
                                <path d="M 30,0 Q 55,40 70,50" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="2,2"/>
                                <path d="M 70,0 Q 90,20 100,25" fill="none" stroke="#3b82f6" strokeWidth="3" />
                                
                                {/* Intervention Points */}
                                <circle cx="0" cy="0" r="2" fill="#3b82f6" />
                                <circle cx="30" cy="0" r="2" fill="#3b82f6" />
                                <circle cx="70" cy="0" r="2" fill="#3b82f6" />
                             </svg>
                             <div className="absolute bottom-0 left-0 translate-y-6 text-[9px] text-slate-500 font-bold uppercase">Tempo</div>
                             <div className="absolute top-0 left-0 -translate-x-6 -rotate-90 origin-top-left text-[9px] text-slate-500 font-bold uppercase">Retenção</div>
                         </div>
                         <p className="text-xs text-slate-400 italic text-center text-balance">
                             A cada revisão o decaimento é atenuado. O FSRS programa o intervalo exato para garantir retenção com o mínimo de esforço.
                         </p>
                    </div>
                </div>
            </div>
=======
>>>>>>> f71e79ffd4dd38d111ba5f8a2e672154ded765f5
        </div>
    );
};