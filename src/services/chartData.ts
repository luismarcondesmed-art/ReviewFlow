import type { Topic, Simulado } from '../types';

export const localDay = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
export const shiftDay = (day: string, amount: number) => {
  const date = new Date(day + 'T12:00:00');
  date.setDate(date.getDate() + amount);
  return localDay(date);
};
export const activityDay = (value: string) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : localDay(date);
};
export const score = (correct: number, total: number) => ({
  total: Number.isFinite(total) ? Math.max(0, total) : 0,
  correct: Number.isFinite(correct) && Number.isFinite(total) ? Math.max(0, Math.min(correct, total)) : 0,
});
export function studyEntries(topics: Topic[], simulados: Simulado[], today = localDay(new Date())) {
  return [
    ...topics.filter(t => !t.deleted).flatMap(t => t.reviews.filter(r => r.done).map(r => ({ day: activityDay(r.completedAt || r.date), area: String(t.area), ...score(r.correct, r.total) }))),
    ...simulados.filter(s => !s.deleted).map(s => ({ day: activityDay(s.dateTaken), area: 'simulados', ...score(s.correctCount, s.totalQuestions) })),
  ].filter(e => e.day && e.day <= today);
}
export function dailyActivity(topics: Topic[], simulados: Simulado[], start: string, end: string) {
  const map = new Map<string, { total: number; correct: number; sessions: number }>();
  for (const entry of studyEntries(topics, simulados, end)) {
    if (entry.day < start) continue;
    const current = map.get(entry.day) || { total: 0, correct: 0, sessions: 0 };
    map.set(entry.day, { total: current.total + entry.total, correct: current.correct + entry.correct, sessions: current.sessions + 1 });
  }
  const result = [];
  for (let day = start; day <= end; day = shiftDay(day, 1)) {
    result.push({ day, ...(map.get(day) || { total: 0, correct: 0, sessions: 0 }) });
  }
  return result;
}
