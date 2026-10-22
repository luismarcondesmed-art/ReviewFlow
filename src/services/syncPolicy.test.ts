import { describe, it, expect } from 'vitest';
import { emptySyncMeta, fastSync, nextSyncTime, NORMAL_SYNC_INTERVAL, stableJSON, syncInterval, validSyncCode } from './syncPolicy';
import { syncPayload } from './cloudSync';
import type { StudyData } from './syncMerge';
const data = (): StudyData => ({ topics: [], simulados: [], config: { targetAccuracy: 80 }, scheduleProgress: {}, dailyNotes: {} });
describe('sync cost policy', () => {
  it('accepts simple and legacy codes but rejects Firestore path separators', () => {
    for (const key of ['', 'a', 'usuario-2', 'old_key_12345678901234567890']) expect(validSyncCode(key)).toBe(true);
    for (const key of ['../user', 'a/b', 'a b', 'x'.repeat(129)]) expect(validSyncCode(key)).toBe(false);
  });
  it('batches regular accounts and preserves the requested fast profile', () => {
    expect(syncInterval('student')).toBe(NORMAL_SYNC_INTERVAL);
    expect(syncInterval('student', true)).toBe(30_000);
    expect(fastSync('student', true)).toBe(true);
    expect(nextSyncTime(emptySyncMeta(), 'student')).toBe(0);
    const meta = { lastAttempt: 1_000, lastSuccess: 1_000, failures: 0 };
    expect(nextSyncTime(meta, 'student')).toBe(601_000);
    expect(nextSyncTime(meta, 'student', true)).toBe(61_000);
  });
  it('keeps exponential backoff even when a failing page is reloaded or manually retried', () => {
    const persisted = JSON.parse(JSON.stringify({ lastAttempt: 1000, lastSuccess: 0, failures: 3 }));
    expect(nextSyncTime(persisted, 'student', true)).toBe(3_601_000);
  });
  it('does not rewrite identical remote data or its metadata', () => {
    const local = data();
    const remote = { dailyNotes: {}, config: { targetAccuracy: 80 }, topics: [], simulados: [], scheduleProgress: {}, updatedAt: 'yesterday' };
    expect(syncPayload(local, remote, local).needsWrite).toBe(false);
    expect(stableJSON({ b: 1, a: 2 })).toBe(stableJSON({ a: 2, b: 1 }));
  });
  it('pulls remote changes without writing them back unchanged', () => {
    const base = data();
    const remote = { ...base, dailyNotes: { '2026-10-21': '- [ ] estudar' } };
    const result = syncPayload(base, remote, base);
    expect(result.merged.dailyNotes).toEqual(remote.dailyNotes);
    expect(result.needsWrite).toBe(false);
  });
  it('writes a combined document when independent changes exist on both devices', () => {
    const base = data();
    const local = { ...base, dailyNotes: { today: '- [x] tarefa' } };
    const remote = { ...base, config: { targetAccuracy: 90 } };
    const result = syncPayload(local, remote, base);
    expect(result.needsWrite).toBe(true);
    expect(result.merged.config.targetAccuracy).toBe(90);
    expect(result.merged.dailyNotes.today).toBe('- [x] tarefa');
  });
});
