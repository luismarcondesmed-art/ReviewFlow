import React, { useState } from 'react';
import { BarChart2, PieChart, TrendingUp, BookOpen, ChevronRight, Activity, Info, X } from 'lucide-react';
import { especialidadesData, temasData, assuntosData } from '../data/enamedStats';

export const StatsView = () => {
  const [selectedEspecialidade, setSelectedEspecialidade] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-20 lg:pb-0">
      <div className="bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-white/5 backdrop-blur-2xl rounded-[32px] p-6 lg:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="hidden lg:flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <BarChart2 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Estatísticas ENAMED</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Guia Estatístico INEP 2011-2026</p>
            </div>
          </div>
          <button 
            onClick={() => setInfoOpen(!infoOpen)}
            className={`p-2.5 rounded-xl transition-colors shrink-0 ${infoOpen ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' : 'bg-slate-100 dark:bg-black/40 text-slate-500 hover:text-blue-500 hover:bg-slate-200 dark:hover:bg-white/10'}`}
            title="Informações das Estatísticas"
          >
            <Info size={16} />
          </button>
        </div>

        <div className="lg:hidden flex items-center justify-between mb-6">
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Estatísticas ENAMED</h1>
            <button 
                onClick={() => setInfoOpen(!infoOpen)}
                className={`p-2.5 rounded-xl transition-colors shrink-0 ${infoOpen ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' : 'bg-slate-100 dark:bg-black/40 text-slate-500 hover:text-blue-500 hover:bg-slate-200 dark:hover:bg-white/10'}`}
                title="Informações das Estatísticas"
            >
                <Info size={16} />
            </button>
        </div>

        {infoOpen && (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 mb-6 border border-slate-200 dark:border-white/10 shadow-sm animate-slide-down">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-slate-800 dark:text-white">Modo Estatísticas</h3>
                    <button onClick={() => setInfoOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={16}/></button>
                </div>
                <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                    <p>O modo de Estatísticas permite que você analise seu desempenho geral e por áreas específicas.</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Acompanhe seu progresso em relação às metas estabelecidas.</li>
                        <li>Identifique seus pontos fortes e fracos por especialidade.</li>
                        <li>Analise o volume de questões respondidas ao longo do tempo.</li>
                        <li>Visualize a evolução do seu desempenho em simulados.</li>
                    </ul>
                </div>
                
                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <BookOpen size={16} /> Como usar estes dados?
                  </h4>
                  <ul className="text-xs text-blue-700 dark:text-blue-400/80 space-y-2 list-disc list-inside">
                    <li><strong>Por Especialidade:</strong> Direcione seu tempo de estudo proporcionalmente às disciplinas mais cobradas.</li>
                    <li><strong>Por Tema:</strong> Foque seu estudo nos temas mais prevalentes de cada especialidade.</li>
                    <li><strong>Por Assunto:</strong> Estude de maneira objetiva os assuntos mais cobrados pelo INEP.</li>
                  </ul>
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1: Especialidades */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <PieChart size={18} className="text-indigo-500" /> 1º Nível: Especialidades
            </h2>
            
            {/* Mobile Select */}
            <div className="lg:hidden mb-6 relative">
                <select 
                    className="w-full appearance-none bg-white dark:bg-zinc-800/50 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold rounded-xl pl-4 pr-10 py-3 outline-none focus:border-indigo-500 shadow-sm"
                    value={selectedEspecialidade || ''}
                    onChange={(e) => setSelectedEspecialidade(e.target.value)}
                >
                    <option value="" disabled>Selecione uma Especialidade</option>
                    {especialidadesData.map((esp) => (
                        <option key={esp.name} value={esp.name}>{esp.name} ({esp.percentage}%)</option>
                    ))}
                </select>
                <ChevronRight size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none rotate-90"/>
            </div>

            {/* Desktop List */}
            <div className="hidden lg:flex lg:flex-col gap-2 overflow-y-auto lg:max-h-[600px] pr-2 custom-scrollbar">
              {especialidadesData.map((esp, idx) => (
                <button
                  key={esp.name}
                  onClick={() => setSelectedEspecialidade(esp.name)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                    selectedEspecialidade === esp.name 
                      ? 'bg-indigo-50 dark:bg-indigo-500/20 border-indigo-200 dark:border-indigo-500/30' 
                      : 'bg-white dark:bg-zinc-800/50 border-slate-100 dark:border-white/5 hover:border-indigo-200 dark:hover:border-indigo-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      idx < 5 ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/30 dark:text-indigo-300' : 'bg-slate-100 text-slate-500 dark:bg-zinc-700 dark:text-slate-400'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${selectedEspecialidade === esp.name ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>
                        {esp.name}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {esp.count} questões
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${selectedEspecialidade === esp.name ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      {esp.percentage}%
                    </span>
                    <ChevronRight size={14} className={`transition-transform ${selectedEspecialidade === esp.name ? 'text-indigo-500 translate-x-1' : 'text-slate-300 dark:text-slate-600 group-hover:translate-x-1'}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Coluna 2 e 3: Detalhes da Especialidade */}
          <div className="lg:col-span-2">
            {selectedEspecialidade ? (
              <div className="space-y-8 animate-fade-in">
                {/* Temas */}
                <div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp size={18} className="text-emerald-500" /> 2º Nível: Temas em {selectedEspecialidade}
                  </h2>
                  <div className="bg-white dark:bg-zinc-800/50 border border-slate-100 dark:border-white/5 rounded-2xl p-5">
                    <div className="space-y-4">
                      {temasData[selectedEspecialidade]?.map((tema, idx) => (
                        <div key={tema.name}>
                          <div className="flex justify-between text-xs font-bold mb-1.5">
                            <span className="text-slate-700 dark:text-slate-300">{idx + 1}. {tema.name}</span>
                            <span className="text-emerald-600 dark:text-emerald-400">{tema.percentage}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500 rounded-full" 
                              style={{ width: `${tema.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      {!temasData[selectedEspecialidade] && (
                        <div className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
                          Dados de temas não disponíveis para esta especialidade.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Assuntos */}
                <div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-purple-500" /> 3º Nível: Top Assuntos em {selectedEspecialidade}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {assuntosData[selectedEspecialidade]?.map((assunto, idx) => (
                      <div key={idx} className="bg-white dark:bg-zinc-800/50 border border-slate-100 dark:border-white/5 rounded-xl p-3 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-tight">
                          {assunto}
                        </span>
                      </div>
                    ))}
                    {!assuntosData[selectedEspecialidade] && (
                      <div className="col-span-2 text-sm text-slate-500 dark:text-slate-400 text-center py-4 bg-white dark:bg-zinc-800/50 border border-slate-100 dark:border-white/5 rounded-xl">
                        Dados de assuntos não disponíveis para esta especialidade.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-slate-50 dark:bg-zinc-800/30 border border-dashed border-slate-200 dark:border-white/10 rounded-3xl">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-500 flex items-center justify-center mb-4">
                  <PieChart size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">Selecione uma Especialidade</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                  Clique em uma especialidade na lista ao lado para ver os temas e assuntos mais cobrados pelo INEP.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
