import { expect, it } from 'vitest';
import { updateTopicSchedule, updateDifficultyFlags } from './topicEditing';
import type { Topic, UserConfig, Simulado } from '../types';
const config: UserConfig = { examDate: '', targetAccuracy: 80, useFSRS: true };
const topic = (): Topic => ({ id: 'a', title: 'Cardiologia', subarea: '', area: 'tecnico', importance: 'extreme', studyDate: '2026-01-01', updatedAt: 1, reviews: [
  { type: 'R0', label: 'R0', date: '2026-01-01', completedAt: '2026-01-01T12:00:00Z', correct: 20, total: 25, targetQ: 25, done: true },
  { type: 'extra', label: 'R1', date: '2026-01-05', correct: 0, total: 0, targetQ: 25, done: false },
] });
it('does not move an overdue review when editing a Notion link or title', () => {
  const old = topic();
  const result = updateTopicSchedule(old, { ...old, title: 'Cardio', notionLink: 'https://www.notion.so/example' }, config, [old]);
  expect(result.reviews).toEqual(old.reviews);
  expect(result.importance).toBe('extreme');
});
it('preserves every completed review when replacing fixed intervals', () => {
  const old = topic(); old.reviews.splice(1, 0, { ...old.reviews[0], type: 'extra', label: 'Real extra review' });
  const result = updateTopicSchedule(old, { ...old, customSettings: { intervals: [1, 7, 30], baseQuestions: 20 } }, { ...config, useFSRS: false }, [old]);
  expect(result.reviews.filter(r => r.done)).toEqual(old.reviews.filter(r => r.done));
});
it('keeps completed history and one next review after an FSRS priority change', () => {
  const old = topic();
  const result = updateTopicSchedule(old, { ...old, importance: 'low' }, config, [old]);
  expect(result.reviews.filter(r => r.done)).toEqual(old.reviews.filter(r => r.done));
  expect(result.reviews.filter(r => !r.done)).toHaveLength(1);
});
it('removes stale difficult-lesson flags after deleting or correcting an exam', () => {
  const old = { ...topic(), linkedLessons: ['ECG'], hasDifficultLesson: true };
  const deleted = { id: 'x', difficultyLessons: ['ECG'], deleted: true } as Simulado;
  expect(updateDifficultyFlags([old], [deleted])[0].hasDifficultLesson).toBe(false);
  expect(updateDifficultyFlags([old], [{ ...deleted, deleted: false }])[0]).toBe(old);
});
