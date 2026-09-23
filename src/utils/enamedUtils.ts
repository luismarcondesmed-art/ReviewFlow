import { ImportanceType } from '../types';

export const calculateEnamedStats = (areaName: string, lessonNames: string[]) => {
    const isPortugues = areaName.toLowerCase().includes('portugu') || lessonNames.some(l => l.toLowerCase().includes('portugu'));
    
    // Regra específica para Língua Portuguesa (10 a 20 questões por prioridade)
    if (isPortugues) {
        const text = lessonNames.join(' ').toLowerCase();
        let priority: ImportanceType = 'medium';
        let baseQ = 15; // Média padrão: 15 questões

        if (
            text.includes('sintaxe') || 
            text.includes('concordância') || 
            text.includes('regência') || 
            text.includes('crase') || 
            text.includes('coesão') || 
            text.includes('reescrita') || 
            text.includes('interpretação') ||
            text.includes('vozes')
        ) {
            priority = 'high';
            baseQ = 20; // Alta prioridade: 20 questões
        } else if (text.includes('literatura')) {
            priority = 'low';
            baseQ = 10; // Baixa prioridade: 10 questões
        }

        const lessonQuestions = lessonNames.map(() => baseQ);

        return {
            priority,
            questions: baseQ,
            lessonQuestions
        };
    }

    // Generic logic for other subjects
    let baseQ = 25;
    let priority: ImportanceType = 'medium';

    if (lessonNames.length > 5) {
        priority = 'high';
        baseQ = 30;
    } else if (lessonNames.length < 2) {
        priority = 'low';
        baseQ = 15;
    }

    const lessonQuestions = lessonNames.map(() => Math.floor(Math.random() * 5) + 3);

    return {
        priority,
        questions: baseQ,
        lessonQuestions
    };
};

export const getAILessonSummary = (areaName: string, lessonNames: string[]): string => {
    if (!lessonNames || lessonNames.length === 0) {
        return "Sem dicas para este bloco.";
    }
    return `Este bloco possui ${lessonNames.length} assuntos em ${areaName}. Tente espaçar suas revisões e realizar pelo menos 5 questões sobre cada tópico para uma melhor fixação.`;
};
