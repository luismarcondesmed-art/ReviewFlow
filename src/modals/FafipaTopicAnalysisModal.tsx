import React, { useState, useEffect } from 'react';
import { 
    X, Sparkles, BrainCircuit, Target, AlertTriangle, CheckCircle, 
    BookOpen, HelpCircle, ArrowRight 
} from 'lucide-react';
import { TopicAnalysis, FafipaQuestionService } from '../services/fafipaQuestionService';
import { AreaType, ImportanceType } from '../types';

interface FafipaTopicAnalysisModalProps {
    isOpen: boolean;
    onClose: () => void;
    topicName: string;
    areaName: string;
    subtopics?: string[];
    onStartQuestions: (topic: string, subtopics: string[]) => void;
    onCreateTopic: (title: string, area: AreaType, lessons: string[], priority: ImportanceType, baseQuestions: number) => void;
    mappedArea: AreaType;
}

export const FafipaTopicAnalysisModal: React.FC<FafipaTopicAnalysisModalProps> = ({
    isOpen,
    onClose,
    topicName,
    areaName,
    subtopics = [],
    onStartQuestions,
    onCreateTopic,
    mappedArea
}) => {
    const [analysis, setAnalysis] = useState<TopicAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
        if (isOpen && topicName) {
            loadAnalysis();
        }
    }, [isOpen, topicName]);

    const loadAnalysis = async () => {
        setIsLoading(true);
        try {
            const data = await FafipaQuestionService.analyzeTopic(topicName, areaName, subtopics);
            setAnalysis(data);
        } catch (err) {
            console.error('Erro na análise de tema:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 pt-4 sm:pt-10 overflow-y-auto">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col my-auto sm:my-0 animate-scale-up">
                
                {/* Header */}
                <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-800/40">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-base sm:text-lg font-black text-slate-800 dark:text-white leading-tight">
                                    Raio-X FAFIPA com IA
                                </h2>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 uppercase tracking-wide">
                                    Análise Preditiva
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 font-medium truncate max-w-xs sm:max-w-sm">
                                {topicName}
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

                {/* Content */}
                <div className="p-5 sm:p-6 overflow-y-auto max-h-[75vh] space-y-5 custom-scrollbar">
                    {isLoading || !analysis ? (
                        <div className="py-16 flex flex-col items-center justify-center gap-3 text-center">
                            <div className="w-10 h-10 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs font-bold text-slate-400">Consultando base estatística da banca FAFIPA...</span>
                        </div>
                    ) : (
                        <>
                            {/* Score Card */}
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50/30 dark:from-zinc-800/60 dark:to-purple-950/20 border border-purple-100/60 dark:border-purple-900/30 flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                                        Relevância no Edital
                                    </span>
                                    <div className="text-2xl font-black text-slate-800 dark:text-white mt-0.5 flex items-baseline gap-1">
                                        {analysis.relevanceScore}
                                        <span className="text-xs font-semibold text-slate-400">/100</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        Sugestão R0
                                    </span>
                                    <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                                        ~{analysis.targetQuestionsR0} questões
                                    </div>
                                </div>
                            </div>

                            {/* Perfil da Banca */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <Target size={14} className="text-purple-500" />
                                    Perfil de Cobrança da FAFIPA
                                </h4>
                                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                                    {analysis.fafipaProfile}
                                </div>
                            </div>

                            {/* Pontos Mais Cobrados */}
                            {analysis.keyPoints.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <CheckCircle size={14} className="text-emerald-500" />
                                        O Que Mais Cai na Prova
                                    </h4>
                                    <div className="space-y-1.5">
                                        {analysis.keyPoints.map((pt, i) => (
                                            <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-white/5 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                                                <span>{pt}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Pegadinhas da Banca */}
                            {analysis.commonTraps.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <AlertTriangle size={14} className="text-amber-500" />
                                        Pegadinhas Clássicas da FAFIPA
                                    </h4>
                                    <div className="space-y-1.5">
                                        {analysis.commonTraps.map((tr, i) => (
                                            <div key={i} className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                                                <span>{tr}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Botões de Ação */}
                            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                                <button
                                    onClick={() => {
                                        onClose();
                                        onStartQuestions(topicName, subtopics);
                                    }}
                                    className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all"
                                >
                                    <BrainCircuit size={15} />
                                    Treinar Questões FAFIPA
                                </button>
                                <button
                                    onClick={() => {
                                        onCreateTopic(
                                            topicName,
                                            mappedArea,
                                            subtopics.length > 0 ? subtopics : [topicName],
                                            analysis.priority,
                                            analysis.targetQuestionsR0
                                        );
                                        onClose();
                                    }}
                                    className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                                >
                                    <BookOpen size={15} />
                                    Adicionar ao ReviewFlow
                                </button>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};
