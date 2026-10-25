import { describe, expect, it } from 'vitest';
import { activityDay, dailyActivity, localDay, score, shiftDay, studyEntries } from './chartData';
import type { Topic, Simulado } from '../types';

const topic = (extra: Partial<Topic> = {}) => ({ id: 'one', area: 'geral', reviews: [{ done: true, date: '2026-10-01', completedAt: '2026-10-10T12:00:00', total: 20, correct: 15 }], ...extra } as Topic);
describe('chart data', () => {
  it('uses the actual completion day and excludes deleted and future records', () => {
    const exams = [{ deleted: true, dateTaken: '2026-10-10', correctCount: 30, totalQuestions: 40 }, { dateTaken: '2026-11-01', correctCount: 30, totalQuestions: 40 }] as Simulado[];
    expect(studyEntries([topic(), topic({ deleted: true })], exams, '2026-10-25')).toEqual([{ day: '2026-10-10', area: 'geral', total: 20, correct: 15 }]);
  });
  it('fills empty days and includes sessions with no question score', () => {
    const result = dailyActivity([topic(), topic({ reviews: [{ done: true, date: '2026-10-11', total: 0, correct: 0 }] as Topic['reviews'] })], [], '2026-10-09', '2026-10-11');
    expect(result.map(d => [d.total, d.sessions])).toEqual([[0, 0], [20, 1], [0, 1]]);
  });
  it('sums exams and reviews, instead of averaging percentages', () => {
    const exams = [{ dateTaken: '2026-10-10', correctCount: 5, totalQuestions: 10 }] as Simulado[];
    expect(dailyActivity([topic()], exams, '2026-10-10', '2026-10-10')[0]).toEqual({ day: '2026-10-10', correct: 20, total: 30, sessions: 2 });
  });
  it('keeps date-only values local and shifts across year boundaries', () => {
    expect(activityDay('2026-10-25')).toBe('2026-10-25');
    expect(activityDay('invalid')).toBe('');
    expect(activityDay('2026-10-25T00:30:00Z')).toBe(localDay(new Date('2026-10-25T00:30:00Z')));
    expect(shiftDay('2026-01-01', -1)).toBe('2025-12-31');
  });
  it('bounds invalid legacy scores to a meaningful chart range', () => {
    expect(score(15, 10)).toEqual({ correct: 10, total: 10 });
    expect(score(-2, -5)).toEqual({ correct: 0, total: 0 });
    expect(score(NaN, Infinity)).toEqual({ correct: 0, total: 0 });
  });
});
