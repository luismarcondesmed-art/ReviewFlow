import type { ImportanceType } from '../types';

export interface BlockAnalysis { priority: ImportanceType; totalQuestions: number; lessonQuestions: number[] }

// Reserved server contract. Provider SDKs and keys never enter the browser.
export async function analyzeBlockWithAI(areaName: string, lessonNames: string[]): Promise<BlockAnalysis> {
  if (!lessonNames.length) return { priority: 'medium', totalQuestions: 0, lessonQuestions: [] };
  if (import.meta.env.VITE_ENABLE_AI === 'true') {
    try {
      const response = await fetch('/api/ai/analyze-block', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ areaName, lessonNames }), signal: AbortSignal.timeout(8000),
      });
      if (response.ok) {
        const data = await response.json();
        if (['low', 'medium', 'high'].includes(data.priority) && Number.isInteger(data.totalQuestions) && data.totalQuestions >= 20 && data.totalQuestions <= 40 && Array.isArray(data.lessonQuestions) && data.lessonQuestions.length === lessonNames.length && data.lessonQuestions.every((n: number) => Number.isInteger(n) && n >= 0) && data.lessonQuestions.reduce((a: number, b: number) => a + b, 0) === data.totalQuestions) return data;
      }
    } catch { /* Continue with free local distribution. */ }
  }
  const totalQuestions = 30;
  return { priority: 'medium', totalQuestions, lessonQuestions: lessonNames.map((_, i) => Math.floor(totalQuestions / lessonNames.length) + (i < totalQuestions % lessonNames.length ? 1 : 0)) };
}
