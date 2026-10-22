import { expect, it } from 'vitest';
import { mergeStudyData, mergeDictionary, preserveInFlightChanges, type StudyData } from './syncMerge';
const empty = (): StudyData => ({ topics: [], simulados: [], config: {}, scheduleProgress: {}, dailyNotes: {} });
it('preserves independent edits and explicit deletion in dictionaries', () => {
  expect(mergeDictionary({ a: 'local' }, { a: 'old', b: 'remote', c: 'old' }, { a: 'old', c: 'old' })).toEqual({ a: 'local', b: 'remote' });
});
it('merges configuration per field', () => {
  const base = { ...empty(), config: { targetAccuracy: 80, examDate: '' } };
  const local = { ...base, config: { ...base.config, targetAccuracy: 90 } };
  const remote = { ...base, config: { ...base.config, examDate: '2028-01-01' } };
  expect(mergeStudyData(local, remote, base).config).toEqual({ targetAccuracy: 90, examDate: '2028-01-01' });
});
it('keeps tombstones and merges independent topic changes', () => {
  const local = { ...empty(), topics: [{ id: 'a', updatedAt: 2, deleted: true }] };
  const remote = { ...empty(), topics: [{ id: 'a', updatedAt: 1 }, { id: 'b', updatedAt: 3 }] };
  expect(mergeStudyData(local, remote, {}).topics).toEqual([{ id: 'a', updatedAt: 2, deleted: true }, { id: 'b', updatedAt: 3 }]);
});
it('does not discard local config when creating a remote document', () => {
  const data = { ...empty(), config: { targetAccuracy: 80 } };
  expect(mergeStudyData(data, {}, data).config).toEqual(data.config);
});
it('preserves edits made during a request even if a remote clock is ahead', () => {
  const before = { ...empty(), topics: [{ id: 'a', title: 'before', updatedAt: 1 }] };
  const current = { ...empty(), topics: [{ id: 'a', title: 'typing now', updatedAt: 2 }] };
  const remote = { ...empty(), topics: [{ id: 'a', title: 'remote', updatedAt: 500 }] };
  const preserved = preserveInFlightChanges(current, remote, before);
  expect(preserved.topics[0].title).toBe('typing now');
  expect(mergeStudyData(preserved, remote, before).topics[0].title).toBe('typing now');
});
