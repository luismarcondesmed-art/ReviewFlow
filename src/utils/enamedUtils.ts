import { ImportanceType } from '../types';

export const calculateEnamedStats = (areaName: string, lessonNames: string[]) => {
    // Generic logic for finding priority and questions
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
