import React, { useState, useMemo } from 'react';
import { BarChart2, PieChart, TrendingUp, BookOpen, ChevronRight, Activity, Info, X, Search, Map as MapIcon, Lightbulb } from 'lucide-react';
import { especialidadesData, temasData, assuntosData } from '../data/enamedStats';
import { provasIrmas } from '../data/provasIrmas';
import { Topic, Simulado } from '../types';
import { DetailedStatsWidget, AreaStatsWidget, RetentionWidget } from '../components';

export const StatsView = ({ topics = [], simulados = [] }: { topics?: Topic[], simulados?: Simulado[] }) => {
  const [activeTab, setActiveTab] = useState<'meu_desempenho' | 'inep' | 'provas'>('meu_desempenho');
  const [selectedEspecialidade, setSelectedEspecialidade] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [searchProva, setSearchProva] = useState('');
  const [selectedProva, setSelectedProva] = useState<string | null>(null);

  const filteredProvas = useMemo(() => {
    const keys = Object.keys(provasIrmas).sort();
    if (!searchProva) return keys;
    return keys.filter(k => k.toLowerCase().includes(searchProva.toLowerCase()));
  }, [searchProva]);

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
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Acompanhe seu desempenho e guias de estudo</p>
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

        {/* Tabs */}
        <div className="flex p-1 bg-slate-100 dark:bg-zinc-800/50 rounded-2xl mb-8 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab('meu_desempenho')}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${activeTab === 'meu_desempenho' ? 'bg-white dark:bg-zinc-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            Meu Desempenho
          </button>
          <button
            onClick={() => setActiveTab('inep')}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${activeTab === 'inep' ? 'bg-white dark:bg-zinc-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            Guia ENAMED
          </button>
          <button
            onClick={() => setActiveTab('provas')}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${activeTab === 'provas' ? 'bg-white dark:bg-zinc-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            Provas Semelhantes
          </button>
        </div>

        {infoOpen && (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 mb-6 border border-slate-200 dark:border-white/10 shadow-sm animate-slide-down">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-slate-800 dark:text-white">Informações</h3>
                    <button onClick={() => setInfoOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={16}/></button>
                </div>
                <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                    <p>Aqui você pode analisar seu desempenho e descobrir provas semelhantes.</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Meu Desempenho:</strong> Suas estatísticas pessoais baseadas nas suas revisões e simulados.</li>
                        <li><strong>Guia ENAMED:</strong> Identifique os temas e assuntos mais cobrados por especialidade.</li>
                        <li><strong>Provas Semelhantes:</strong> Descubra quais provas têm estilo e conteúdo parecidos com a sua prova alvo, multiplicando suas chances de aprovação.</li>
                    </ul>
                </div>
            </div>
        )}

        {activeTab === 'meu_desempenho' && (
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
        )}

        {activeTab === 'inep' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Coluna 1: Especialidades */}
            <div className="lg:col-span-1">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <PieChart size={18} className="text-blue-500" /> 1º Nível: Especialidades
              </h2>
              
              {/* Mobile Select */}
              <div className="lg:hidden mb-6 relative">
                  <select 
                      className="w-full appearance-none bg-white dark:bg-zinc-800/50 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold rounded-xl pl-4 pr-10 py-3 outline-none focus:border-blue-500 shadow-sm"
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
                        ? 'bg-blue-50 dark:bg-blue-500/20 border-blue-200 dark:border-blue-500/30' 
                        : 'bg-white dark:bg-zinc-800/50 border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        idx < 5 ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/30 dark:text-blue-300' : 'bg-slate-100 text-slate-500 dark:bg-zinc-700 dark:text-slate-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${selectedEspecialidade === esp.name ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}>
                          {esp.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {esp.count} questões
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${selectedEspecialidade === esp.name ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                        {esp.percentage}%
                      </span>
                      <ChevronRight size={14} className={`transition-transform ${selectedEspecialidade === esp.name ? 'text-blue-500 translate-x-1' : 'text-slate-300 dark:text-slate-600 group-hover:translate-x-1'}`} />
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
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-500 flex items-center justify-center mb-4">
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
        )}

        {activeTab === 'provas' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Coluna 1: Lista de Provas */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <MapIcon size={18} className="text-blue-500" /> Selecione sua Prova
              </h2>
              
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Buscar prova..."
                  value={searchProva}
                  onChange={(e) => setSearchProva(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-800/50 border border-slate-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium text-slate-800 dark:text-white outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Mobile Select */}
              <div className="lg:hidden relative">
                  <select 
                      className="w-full appearance-none bg-white dark:bg-zinc-800/50 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold rounded-xl pl-4 pr-10 py-3 outline-none focus:border-blue-500 shadow-sm"
                      value={selectedProva || ''}
                      onChange={(e) => setSelectedProva(e.target.value)}
                  >
                      <option value="" disabled>Selecione uma Prova</option>
                      {filteredProvas.map((prova) => (
                          <option key={prova} value={prova}>{prova}</option>
                      ))}
                  </select>
                  <ChevronRight size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none rotate-90"/>
              </div>

              {/* Desktop List */}
              <div className="hidden lg:flex lg:flex-col gap-2 overflow-y-auto lg:max-h-[500px] pr-2 custom-scrollbar">
                {filteredProvas.length > 0 ? filteredProvas.map((prova) => (
                  <button
                    key={prova}
                    onClick={() => setSelectedProva(prova)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                      selectedProva === prova 
                        ? 'bg-blue-50 dark:bg-blue-500/20 border-blue-200 dark:border-blue-500/30' 
                        : 'bg-white dark:bg-zinc-800/50 border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30'
                    }`}
                  >
                    <span className={`text-sm font-bold ${selectedProva === prova ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}>
                      {prova}
                    </span>
                    <ChevronRight size={14} className={`transition-transform ${selectedProva === prova ? 'text-blue-500 translate-x-1' : 'text-slate-300 dark:text-slate-600 group-hover:translate-x-1'}`} />
                  </button>
                )) : (
                  <div className="text-sm text-slate-500 text-center py-4">Nenhuma prova encontrada.</div>
                )}
              </div>
            </div>

            {/* Coluna 2 e 3: Provas Semelhantes */}
            <div className="lg:col-span-2">
              {selectedProva ? (
                <div className="animate-fade-in h-full flex flex-col">
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-emerald-500" /> Provas Semelhantes a {selectedProva}
                  </h2>
                  <div className="bg-white dark:bg-zinc-800/50 border border-slate-100 dark:border-white/5 rounded-2xl p-5 flex-1">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                      Estas são as provas que possuem estilo, cobrança e nível de dificuldade semelhantes à <strong>{selectedProva}</strong>. Fazer simulados destas instituições é uma excelente forma de treinar.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {provasIrmas[selectedProva]?.map((irma, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{irma}</span>
                        </div>
                      ))}
                      {(!provasIrmas[selectedProva] || provasIrmas[selectedProva].length === 0) && (
                        <div className="text-sm text-slate-500">Nenhuma prova semelhante mapeada.</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-slate-50 dark:bg-zinc-800/30 border border-dashed border-slate-200 dark:border-white/10 rounded-3xl">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-500 flex items-center justify-center mb-4">
                    <MapIcon size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">Descubra Provas Irmãs</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                    Selecione a prova que você vai prestar para descobrir outras instituições com o mesmo perfil de cobrança.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
