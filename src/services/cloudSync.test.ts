import { beforeEach, expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => ({ remote: {} as Record<string, unknown>, set: vi.fn(), authReady: vi.fn(async () => {}), initialize: vi.fn(() => ({name:'reviewflow-sync'})), claim: false }));
vi.mock('../utils', async importOriginal => ({ ...await importOriginal<typeof import('../utils')>(), APP_ID:'reviewflow', USER_FIREBASE_CONFIG:{apiKey:'test-placeholder', projectId:'test-project'} }));
vi.mock('firebase/app', () => ({ getApps: () => [], initializeApp:mocks.initialize }));
vi.mock('firebase/auth', () => ({ getAuth: () => ({authStateReady:mocks.authReady,currentUser:{getIdTokenResult:async () => ({claims:{admin:mocks.claim}})}}), signInAnonymously:vi.fn() }));
vi.mock('firebase/firestore', () => ({ getFirestore: () => ({}), doc: () => 'test-ref', runTransaction: async (_db: unknown, run: Function) => run({get:async () => ({exists: () => Object.keys(mocks.remote).length > 0, data: () => mocks.remote}),set:mocks.set}) }));
import { syncCloud } from './cloudSync';
const data = () => ({topics:[],simulados:[],config:{examDate:'',targetAccuracy:80},scheduleProgress:{},dailyNotes:{}});
beforeEach(() => { mocks.remote = {}; mocks.claim = false; vi.clearAllMocks(); });
it('does not write unchanged data or grant admin from the sync code', async () => {
  mocks.remote = data();
  const result = await syncCloud(data(), data(), 'admin');
  expect(result.wrote).toBe(false); expect(result.verifiedAdmin).toBe(false); expect(mocks.set).not.toHaveBeenCalled();
});
it('merges independent cloud changes before the single write', async () => {
  mocks.remote = {...data(), scheduleProgress:{lesson:true}};
  const result = await syncCloud({...data(),dailyNotes:{today:'- [ ] Revisar'}},data(),'test-code');
  expect(result.merged.scheduleProgress).toEqual({lesson:true});
  expect(result.merged.dailyNotes.today).toContain('Revisar');
  expect(mocks.set).toHaveBeenCalledTimes(1);
});
it('rejects malformed cloud data without writing over it', async () => {
  mocks.remote = {...data(),topics:'corrupted'};
  await expect(syncCloud(data(),data(),'test-code')).rejects.toThrow();
  expect(mocks.set).not.toHaveBeenCalled();
});
it('rejects oversized local data before authentication or a transaction', async () => {
  await expect(syncCloud({...data(),dailyNotes:{today:'x'.repeat(810000)}},data(),'test-code')).rejects.toThrow('limite');
  expect(mocks.authReady).not.toHaveBeenCalled(); expect(mocks.set).not.toHaveBeenCalled();
});
