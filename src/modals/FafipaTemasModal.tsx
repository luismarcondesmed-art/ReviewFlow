import React, { useState, useMemo } from 'react';
import { 
    X, Search, BookOpen, BrainCircuit, Target, CheckCircle2, 
    Sparkles, ArrowRight, ShieldCheck, Stethoscope, Filter, Calendar
} from 'lucide-react';
import { FAFIPA_METADATA, FAFIPA_TEMAS, FAFIPA_SCHEDULE } from '../services/fafipaSchedule';
import { ScheduleProgress } from '../types';

interface FafipaTemasModalProps {
    isOpen: boolean;
    onClose: () => void;
    scheduleProgress: ScheduleProgress;
    onSelectTemaFilter?: (filterText: string) => void;
    onOpenQuestions?: (topicName: string) => void;
}

export const FafipaTemasModal: React.FC<FafipaTemasModalProps> = ({
    isOpen,
    onClose,
    scheduleProgress,
    onSelectTemaFilter,
    onOpenQuestions
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDisciplina, setSelectedDisciplina] = useState<string>('todas');
    const [selectedSemana, setSelectedSemana] = useState<string>('todas');

    // Estatísticas de conclusão por tema
    const temaStats = useMemo(() => {
        const stats: Record<number, { total: number; completed: number }> = {};
        FAFIPA_TEMAS.forEach(t => {
            stats[t.id] = { total: 0, completed: 0 };
        });

        FAFIPA_SCHEDULE.forEach(item => {
            if (item.temaId && stats[item.temaId]) {
                stats[item.temaId].total += 1;
                if (scheduleProgress[item.id]) {
                    stats[item.temaId].completed += 1;
                }
            }
        });

        return stats;
    }, [scheduleProgress]);

    const disciplinas = useMemo(() => {
        return ['todas', 'Português', 'Matemática/RLM', 'Informática', 'Legislação/Gerais', 'Medicina', 'Legislação municipal'];
    }, []);

    const filteredTemas = useMemo(() => {
        return FAFIPA_TEMAS.filter(tema => {
            if (selectedDisciplina !== 'todas' && tema.disciplina.toLowerCase() !== selectedDisciplina.toLowerCase()) {
                return false;
            }

            if (selectedSemana !== 'todas') {
                if (selectedSemana === 'continuo' && tema.semana !== 0) return false;
                if (selectedSemana !== 'continuo' && tema.semana !== Number(selectedSemana)) return false;
            }

            if (searchTerm.trim()) {
                const q = searchTerm.toLowerCase();
                const match = 
                    tema.grupo.toLowerCase().includes(q) ||
                    tema.conteudo.toLowerCase().includes(q) ||
                    tema.disciplina.toLowerCase().includes(q) ||
                    `tema ${tema.id}`.includes(q) ||
                    `#${tema.id}`.includes(q);
                if (!match) return false;
            }

            return true;
        });
    }, [selectedDisciplina, selectedSemana, searchTerm]);

    if (!isOpen) return null;

    const totalConcluido = Object.values(temaStats).reduce((acc, curr) => acc + curr.completed, 0);
    const totalAulas = FAFIPA_SCHEDULE.length;
    const percTotal = totalAulas > 0 ? Math.round((totalConcluido / totalAulas) * 100) : 0;

    const getPriorityStyle = (prioridade: string) => {
        switch (prioridade) {
            case 'alta':
                return { label: 'Prioridade Alta', badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800/50' };
            case 'media-alta':
                return { label: 'Média-Alta', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50' };
            case 'media':
                return { label: 'Prioridade Média', badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800/50' };
            case 'baixa':
                return { label: 'Prioridade Baixa', badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800/50' };
            case 'verificar_edital':
                return { label: 'Verificar Edital', badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800/50' };
            default:
                return { label: prioridade, badge: 'bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-zinc-300 border-slate-200 dark:border-white/10' };
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div 
                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800/30 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                            <Target size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                                    Matriz dos 56 Temas FAFIPA
                                </h2>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                    Editais Médicos PR
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                                {FAFIPA_METADATA.cargo_referencia}
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={onClose}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
                        aria-label="Fechar"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Métricas Rápidas */}
                <div className="px-4 sm:px-5 py-3 bg-white dark:bg-zinc-900 border-b border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <span>56 Temas Oficiais</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            <span>196 Aulas Mapeadas</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 size={13} />
                            <span>{totalConcluido} aulas concluídas ({percTotal}%)</span>
                        </div>
                    </div>

                    <div className="text-[11px] text-slate-400 dark:text-zinc-500">
                        Mostrando <strong className="text-slate-700 dark:text-slate-200">{filteredTemas.length}</strong> de 56 temas
                    </div>
                </div>

                {/* Filtros e Busca */}
                <div className="p-3 sm:p-4 bg-slate-50/70 dark:bg-zinc-800/20 border-b border-slate-100 dark:border-white/5 space-y-2.5">
                    {/* Input de Busca */}
                    <div className="relative">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Buscar por tema, grupo, palavras-chave ou lei (ex: 8.080, asma, excel, crase)..."
                            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')} 
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Pílulas de Disciplina */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Área:</span>
                        {disciplinas.map(disc => (
                            <button
                                key={disc}
                                onClick={() => setSelectedDisciplina(disc)}
                                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all ${
                                    selectedDisciplina === disc
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'bg-white dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 border border-slate-200/60 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-zinc-700'
                                }`}
                            >
                                {disc === 'todas' ? 'Todas as Áreas' : disc}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Lista de Temas */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-2.5 divide-y divide-slate-100 dark:divide-white/5">
                    {filteredTemas.length === 0 ? (
                        <div className="py-12 text-center text-slate-400 dark:text-zinc-500 space-y-2">
                            <Filter size={32} className="mx-auto text-slate-300 dark:text-zinc-600" />
                            <p className="text-sm font-semibold">Nenhum tema encontrado com os filtros atuais.</p>
                            <button 
                                onClick={() => { setSearchTerm(''); setSelectedDisciplina('todas'); setSelectedSemana('todas'); }}
                                className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    ) : (
                        filteredTemas.map(tema => {
                            const pStyle = getPriorityStyle(tema.prioridade);
                            const stats = temaStats[tema.id] || { total: 0, completed: 0 };
                            const perc = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
                            const isDone = stats.total > 0 && stats.completed === stats.total;

                            return (
                                <div 
                                    key={tema.id}
                                    className={`pt-2.5 first:pt-0 p-3 sm:p-3.5 rounded-xl transition-all ${
                                        isDone ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : 'hover:bg-slate-50 dark:hover:bg-zinc-800/40'
                                    }`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4">
                                        <div className="flex-1 min-w-0">
                                            {/* Badges do Tema */}
                                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-1">
                                                <span className="font-black text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200">
                                                    #{tema.id}
                                                </span>
                                                <span className="font-bold text-xs text-slate-600 dark:text-zinc-300">
                                                    {tema.disciplina}
                                                </span>
                                                <span className="text-slate-300 dark:text-zinc-600">•</span>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${pStyle.badge}`}>
                                                    {pStyle.label}
                                                </span>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                                                    tema.semana === 0 
                                                        ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200/50 dark:border-sky-800/40' 
                                                        : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200/50 dark:border-indigo-800/40'
                                                }`}>
                                                    {tema.semana === 0 ? 'Estudo Contínuo' : `Semana ${tema.semana}`}
                                                </span>
                                            </div>

                                            {/* Nome do Grupo */}
                                            <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                                                {tema.grupo}
                                            </h3>

                                            {/* Conteúdo Programático */}
                                            <p className="text-xs text-slate-600 dark:text-zinc-300 mt-1 leading-relaxed">
                                                {tema.conteudo}
                                            </p>

                                            {/* Barra de Progresso de Aulas */}
                                            <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500 dark:text-zinc-400">
                                                <span>Aulas no cronograma: <strong>{stats.completed}/{stats.total}</strong></span>
                                                <div className="w-24 h-1.5 rounded-full bg-slate-200 dark:bg-zinc-700 overflow-hidden">
                                                    <div 
                                                        className={`h-full transition-all rounded-full ${
                                                            isDone ? 'bg-emerald-500' : 'bg-blue-500'
                                                        }`}
                                                        style={{ width: `${perc}%` }}
                                                    />
                                                </div>
                                                <span className="font-bold text-slate-700 dark:text-slate-300">{perc}%</span>
                                            </div>
                                        </div>

                                        {/* Ações */}
                                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                            {onSelectTemaFilter && (
                                                <button
                                                    onClick={() => {
                                                        onSelectTemaFilter(tema.grupo);
                                                        onClose();
                                                    }}
                                                    className="h-8 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                                                    title="Filtrar aulas deste tema no cronograma principal"
                                                >
                                                    <Filter size={13} />
                                                    <span>Ver no Cronograma</span>
                                                </button>
                                            )}

                                            {onOpenQuestions && (
                                                <button
                                                    onClick={() => {
                                                        onOpenQuestions(`${tema.disciplina}: ${tema.grupo}`);
                                                        onClose();
                                                    }}
                                                    className="h-8 px-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center gap-1.5 transition-colors border border-blue-200/50 dark:border-blue-800/40"
                                                    title="Gerar questões com IA baseadas neste tema da FAFIPA"
                                                >
                                                    <BrainCircuit size={13} />
                                                    <span>Questões IA</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800/30 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-zinc-400">
                    <span className="line-clamp-1">
                        FAFIPA • Ciclo sugerido: Semana 0 (Contínuo) e Semanas 1 a 14
                    </span>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-800 dark:text-white font-bold transition-colors"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};
