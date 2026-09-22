import React, { useState } from 'react';
import { BarChart2, Info, X, Lightbulb } from 'lucide-react';
import { Topic, Simulado } from '../types';
import { DetailedStatsWidget, AreaStatsWidget, RetentionWidget } from '../components';

export const StatsView = ({ topics = [], simulados = [] }: { topics?: Topic[], simulados?: Simulado[] }) => {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-20 lg:pb-0">
      <div className="bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-white/5 backdrop-blur-2xl rounded-[32px] p-6 lg:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="hidden lg:flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 dark:bg-slate-200 flex items-center justify-center text-slate-100 dark:text-black shadow-lg shrink-0">
              <BarChart2 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-200">Estatísticas</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Acompanhe seu desempenho de forma detalhada</p>
            </div>
          </div>
          <button 
            onClick={() => setInfoOpen(!infoOpen)}
            className={`p-2.5 rounded-xl transition-colors shrink-0 ${infoOpen ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 dark:bg-black/40 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10'}`}
            title="Informações"
          >
            <Info size={16} />
          </button>
        </div>

        <div className="lg:hidden flex items-center justify-between mb-6">
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Estatísticas</h1>
            <button 
                onClick={() => setInfoOpen(!infoOpen)}
                className={`p-2.5 rounded-xl transition-colors shrink-0 ${infoOpen ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 dark:bg-black/40 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10'}`}
                title="Informações"
            >
                <Info size={16} />
            </button>
        </div>

        {infoOpen && (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 mb-6 border border-slate-200 dark:border-white/10 shadow-sm animate-slide-down">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-slate-800 dark:text-white">Informações</h3>
                    <button onClick={() => setInfoOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={16}/></button>
                </div>
                <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                    <p>Aqui você pode analisar seu desempenho geral.</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Performance:</strong> Suas estatísticas pessoais baseadas nas suas revisões e simulados.</li>
                        <li><strong>Desempenho por Área:</strong> Identifique seus pontos fortes e fracos em cada área do conhecimento.</li>
                    </ul>
                </div>
            </div>
        )}

        <div className="flex flex-col gap-6 animate-fade-in">
                {/* Performance */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm">
                    <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2"><BarChart2 size={16} className="text-blue-500"/> Performance Geral</h4>
                    <DetailedStatsWidget topics={topics} simulados={simulados} />
                </div>

                {/* Desempenho por Área */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm">
                     <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2"><Lightbulb size={16} className="text-amber-500"/> Desempenho por Área</h4>
                     <AreaStatsWidget topics={topics} simulados={simulados} />
                </div>

                {/* Retenção */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm">
                    <RetentionWidget topics={topics} />
                </div>
            </div>
      </div>
    </div>
  );
};
