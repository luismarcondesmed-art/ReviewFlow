import { GoogleGenAI, Type } from "@google/genai";
import { ImportanceType } from "../types";

export const analyzeBlockWithAI = async (areaName: string, lessonNames: string[]): Promise<{ priority: ImportanceType, totalQuestions: number, lessonQuestions: number[] }> => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `
Você é um especialista em preparação para residência médica no Brasil, especificamente para o ENARE/ENAMED.
Analise o seguinte bloco de aulas da área de ${areaName}:

${lessonNames.map((l, i) => `${i + 1}. ${l}`).join('\n')}

Sua tarefa é determinar a importância geral deste bloco para o ENARE/ENAMED e distribuir a quantidade de questões para a primeira revisão (R0).

Regras:
1. A quantidade total de questões para o bloco no R0 deve ser estritamente entre 20 e 40 questões, dependendo da importância do bloco inteiro.
2. Distribua essas questões entre as aulas do bloco de forma proporcional à importância de cada aula específica.
3. Use seu conhecimento sobre as estatísticas do ENARE/ENAMED e faça conexões inteligentes (ex: AVC = Acidente Vascular Cerebral).
4. A prioridade geral do bloco deve ser classificada como: "low", "medium", ou "high".
5. A soma das questões de cada aula deve ser exatamente igual ao total de questões do bloco.

Retorne um JSON estrito com o seguinte formato:
{
    "priority": "low" | "medium" | "high",
    "totalQuestions": number,
    "lessonQuestions": number[]
}
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.1-pro-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        priority: { type: Type.STRING, description: "Prioridade geral do bloco (low, medium, high)" },
                        totalQuestions: { type: Type.INTEGER, description: "Total de questões para o bloco (entre 20 e 40)" },
                        lessonQuestions: { 
                            type: Type.ARRAY, 
                            items: { type: Type.INTEGER },
                            description: "Quantidade de questões para cada aula, na mesma ordem fornecida"
                        }
                    },
                    required: ["priority", "totalQuestions", "lessonQuestions"]
                },
                tools: [{ googleSearch: {} }]
            }
        });

        const text = response.text;
        if (text) {
            const data = JSON.parse(text);
            
            // Validate and fallback if needed
            if (!['low', 'medium', 'high'].includes(data.priority)) {
                data.priority = 'medium';
            }
            if (data.totalQuestions < 20) data.totalQuestions = 20;
            if (data.totalQuestions > 40) data.totalQuestions = 40;
            
            // Ensure lessonQuestions matches the length of lessonNames
            if (!Array.isArray(data.lessonQuestions) || data.lessonQuestions.length !== lessonNames.length) {
                // Fallback distribution
                const avg = Math.floor(data.totalQuestions / lessonNames.length);
                const rem = data.totalQuestions % lessonNames.length;
                data.lessonQuestions = lessonNames.map((_, i) => i === 0 ? avg + rem : avg);
            }

            return data;
        }
        throw new Error("Empty response from AI");
    } catch (error) {
        console.error("Error analyzing block with AI:", error);
        // Fallback to a safe default if AI fails
        const total = 30;
        const avg = Math.floor(total / lessonNames.length);
        const rem = total % lessonNames.length;
        return {
            priority: 'medium',
            totalQuestions: total,
            lessonQuestions: lessonNames.map((_, i) => i === 0 ? avg + rem : avg)
        };
    }
};
