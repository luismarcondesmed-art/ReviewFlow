import { expect, it } from 'vitest';
import { validateBackup } from './backup';
it('rejects malformed task data that would crash the daily list', () => {
  expect(() => validateBackup({ topics: [], dailyNotes: { today: 42 } })).toThrow();
  expect(() => validateBackup({ topics: [], dailyNotes: { today: '- [x] revisar' } })).not.toThrow();
});
it('rejects impossible review scores and broken exam dates', () => {
  expect(() => validateBackup({ topics: [{ id: 'a', title: 'A', studyDate: '2026-01-01', reviews: [{ date: '2026-01-01', label: 'R0', correct: 30, total: 20 }] }] })).toThrow();
  expect(() => validateBackup({ topics: [], simulados: [{ id: 's', name: 'S', year: '2026', dateTaken: 'bad', correctCount: 10, totalQuestions: 20 }] })).toThrow();
});
