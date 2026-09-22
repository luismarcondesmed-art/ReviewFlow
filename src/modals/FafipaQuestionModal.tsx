import React, { useState, useEffect } from 'react';
import { 
    X, Sparkles, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RefreshCw, 
    BrainCircuit, Award, BookOpen, Check, Copy, AlertCircle, HelpCircle
} from 'lucide-react';
import { FafipaQuestion, FafipaQuestionService } from '../services/fafipaQuestionService';
import { Topic, AreaType, ImportanceType } from '../types';
import { toast } from 'sonner';

interface FafipaQuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTopic?: string;
    subtopics?: string[];
    onRecordProgress?: (topicTitle: string, correctCount: number, totalCount: number) => void;
    onCreateTopic?: (title: string, area: AreaType, lessons: string[], priority: ImportanceType) => void;
}

export const FafipaQuestionModal: React.FC<FafipaQuestionModalProps> = ({
    isOpen,
    onClose,
    initialTopic = 'Língua Portuguesa',
    subtopics = [],
    onRecordProgress,
    onCreateTopic
}) => {
    const [selectedTopic, setSelectedTopic] = useState(initialTopic);
    const [questionCount, setQuestionCount] = useState<number>(3);
    const [difficulty, setDifficulty] = useState<string>('standard');
    const [questions, setQuestions] = useState<FafipaQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
    const [revealed, setRevealed] = useState<Record<number, boolean>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (isOpen) {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
        if (isOpen && initialTopic) {
            setSelectedTopic(initialTopic);
            loadQuestions(initialTopic, subtopics, questionCount);
        }
    }, [isOpen, initialTopic]);

    const loadQuestions = async (topic: string, subs: string[], count: number) => {
        setIsLoading(true);
        setIsFinished(false);
        setCurrentIndex(0);
        setUserAnswers({});
        setRevealed({});

        try {
            const data = await FafipaQuestionService.generateQuestions({
                topic,
                subtopics: subs,
                count,
                difficulty
            });
            setQuestions(data);
        } catch (error) {
            console.error('Erro ao gerar questões:', error);
            toast.error('Erro ao carregar questões. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    const currentQ = questions[currentIndex];
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(userAnswers).length;
    
    // Calcula score
    const correctCount = questions.reduce((acc, q, idx) => {
        return userAnswers[idx] === q.respostaCorreta ? acc + 1 : acc;
    }, 0);

    const handleSelectOption = (letra: 'A' | 'B' | 'C' | 'D' | 'E') => {
        if (revealed[currentIndex]) return; // Já confirmada
        setUserAnswers(prev => ({ ...prev, [currentIndex]: letra }));
    };

    const handleConfirmAnswer = () => {
        if (!userAnswers[currentIndex]) {
            toast.info('Selecione uma alternativa antes de confirmar!');
            return;
        }
        setRevealed(prev => ({ ...prev, [currentIndex]: true }));
        const isCorrect = userAnswers[currentIndex] === currentQ.respostaCorreta;
        if (isCorrect) {
            toast.success('Resposta Correta!', { description: 'Excelente raciocínio!' });
        } else {
            toast.error('Resposta Incorreta!', { description: `A correta era a alternativa ${currentQ.respostaCorreta}` });
        }
    };

    const handleFinish = () => {
        setIsFinished(true);
        if (onRecordProgress) {
            onRecordProgress(selectedTopic, correctCount, totalQuestions);
        }
    };

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            handleFinish();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleCopyQuestion = () => {
        if (!currentQ) return;
        const text = `[BANCA FAFIPA] ${currentQ.enunciado}\n\n` + 
            currentQ.alternativas.map(a => `${a.letra}) ${a.texto}`).join('\n') +
            `\n\nGabarito: ${currentQ.respostaCorreta}\nJustificativa: ${currentQ.justificativa}`;
        navigator.clipboard.writeText(text);
        toast.success('Questão copiada para a área de transferência!');
    };

    return (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 pt-4 sm:pt-10 overflow-y-auto">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] my-auto sm:my-0 animate-scale-up">
                
                {/* Header */}
                <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-800/40">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
                            <BrainCircuit size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-base sm:text-lg font-black text-slate-800 dark:text-white leading-tight">
                                    Simulador FAFIPA com IA
                                </h2>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 uppercase tracking-wide">
                                    Banca Oficial
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 font-medium truncate max-w-sm sm:max-w-md">
                                {selectedTopic}
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center justify-center transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
                    
                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full border-4 border-blue-100 dark:border-blue-950"></div>
                                <div className="absolute top-0 left-0 w-14 h-14 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-800 dark:text-white">Gerando questões no perfil da FAFIPA...</h3>
                                <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                                    Avaliando enunciados oficiais, literalidade legislativa e casos clínicos habituais da banca.
                                </p>
                            </div>
                        </div>
                    ) : isFinished ? (
                        /* Tela de Conclusão / Desempenho */
                        <div className="py-8 flex flex-col items-center text-center max-w-md mx-auto">
                            <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/10">
                                <Award size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-1">
                                Treino Concluído!
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                                Você respondeu todas as {totalQuestions} questões simuladas para este tema.
                            </p>

                            <div className="grid grid-cols-2 gap-3 w-full mb-6">
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-white/5">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Acertos</span>
                                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                                        {correctCount} / {totalQuestions}
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-white/5">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Aproveitamento</span>
                                    <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                                        {Math.round((correctCount / totalQuestions) * 100)}%
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2.5 w-full">
                                <button
                                    onClick={() => loadQuestions(selectedTopic, subtopics, questionCount)}
                                    className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all"
                                >
                                    <RefreshCw size={15} />
                                    Gerar Novo Lote de Questões
                                </button>
                                <button
                                    onClick={onClose}
                                    className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
                                >
                                    Voltar ao Cronograma
                                </button>
                            </div>
                        </div>
                    ) : currentQ ? (
                        /* Exibição da Questão Ativa */
                        <div className="space-y-5">
                            
                            {/* Barra de Progresso e Navegação Superior */}
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                        Questão {currentIndex + 1} de {totalQuestions}
                                    </span>
                                    <span className="text-slate-300 dark:text-zinc-700">•</span>
                                    <span className="text-[11px] font-semibold text-slate-400">
                                        {currentQ.concurso || 'FAFIPA • Prova Oficial'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleCopyQuestion}
                                        title="Copiar Questão"
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        <Copy size={15} />
                                    </button>
                                    <div className="w-24 h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-blue-600 transition-all duration-300"
                                            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Enunciado */}
                            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-white/5">
                                <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 leading-relaxed whitespace-pre-line">
                                    {currentQ.enunciado}
                                </p>
                            </div>

                            {/* Alternativas */}
                            <div className="space-y-2.5">
                                {currentQ.alternativas.map((alt) => {
                                    const isSelected = userAnswers[currentIndex] === alt.letra;
                                    const isRevealed = revealed[currentIndex];
                                    const isCorrect = alt.letra === currentQ.respostaCorreta;
                                    const isWrongPick = isSelected && !isCorrect;

                                    let cardStyle = 'border-slate-200/80 dark:border-white/10 bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500';
                                    let badgeStyle = 'bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-slate-300';

                                    if (isRevealed) {
                                        if (isCorrect) {
                                            cardStyle = 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200';
                                            badgeStyle = 'bg-emerald-500 text-white';
                                        } else if (isWrongPick) {
                                            cardStyle = 'border-red-500 bg-red-50/50 dark:bg-red-950/20 text-red-900 dark:text-red-200';
                                            badgeStyle = 'bg-red-500 text-white';
                                        } else {
                                            cardStyle = 'opacity-50 border-slate-100 dark:border-white/5';
                                        }
                                    } else if (isSelected) {
                                        cardStyle = 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-blue-950 dark:text-blue-200 ring-2 ring-blue-500/20';
                                        badgeStyle = 'bg-blue-600 text-white';
                                    }

                                    return (
                                        <button
                                            key={alt.letra}
                                            onClick={() => handleSelectOption(alt.letra)}
                                            disabled={isRevealed}
                                            className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start gap-3.5 group cursor-pointer ${cardStyle}`}
                                        >
                                            <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-colors ${badgeStyle}`}>
                                                {alt.letra}
                                            </span>
                                            <span className="text-xs sm:text-sm font-medium leading-relaxed flex-1 pt-0.5">
                                                {alt.texto}
                                            </span>
                                            {isRevealed && isCorrect && (
                                                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-1" />
                                            )}
                                            {isRevealed && isWrongPick && (
                                                <XCircle size={18} className="text-red-500 shrink-0 mt-1" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Justificativa e Dica da Banca (Apenas após revelar) */}
                            {revealed[currentIndex] && (
                                <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 space-y-3 animate-fade-in">
                                    <div>
                                        <span className="text-[11px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                                            <BookOpen size={14} />
                                            Comentário Didático do Gabarito (Alternativa {currentQ.respostaCorreta})
                                        </span>
                                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-1.5 leading-relaxed">
                                            {currentQ.justificativa}
                                        </p>
                                    </div>
                                    {currentQ.dicaBanca && (
                                        <div className="pt-2 border-t border-blue-200/50 dark:border-blue-800/30 flex items-start gap-2">
                                            <AlertCircle size={15} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                                                <span className="font-bold">Dica da Banca FAFIPA:</span> {currentQ.dicaBanca}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    ) : null}

                </div>

                {/* Footer Controls */}
                {!isLoading && !isFinished && currentQ && (
                    <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/40 dark:bg-zinc-800/30 flex items-center justify-between gap-3">
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className="px-3 sm:px-4 h-10 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
                        >
                            <ArrowLeft size={14} />
                            Anterior
                        </button>

                        <div className="flex items-center gap-2">
                            {!revealed[currentIndex] ? (
                                <button
                                    onClick={handleConfirmAnswer}
                                    disabled={!userAnswers[currentIndex]}
                                    className="px-5 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
                                >
                                    <Check size={14} />
                                    Confirmar Resposta
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="px-5 h-10 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                                >
                                    {currentIndex < totalQuestions - 1 ? 'Próxima Questão' : 'Ver Resultado Final'}
                                    <ArrowRight size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
