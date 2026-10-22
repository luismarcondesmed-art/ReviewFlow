import { USER_FIREBASE_CONFIG, APP_ID } from '../utils';
import { mergeStudyData, type StudyData } from './syncMerge';
import { stableJSON } from './syncPolicy';

export function syncPayload(local: StudyData, remote: Partial<StudyData>, base: Partial<StudyData>) {
  const merged = mergeStudyData(local, remote, base);
  const remoteFields = Object.fromEntries(Object.keys(merged).map(key => [key, remote[key]]));
  return { merged, needsWrite: stableJSON(merged) !== stableJSON(remoteFields) };
}

export async function syncCloud(snapshot: StudyData, base: Partial<StudyData>, code: string) {
  if (!USER_FIREBASE_CONFIG.apiKey || !USER_FIREBASE_CONFIG.projectId) throw new Error('Firebase não configurado. Seus dados continuam salvos neste dispositivo.');
  const [{ initializeApp, getApps }, { getAuth, signInAnonymously }, { getFirestore, doc, runTransaction }] = await Promise.all([
    import('firebase/app'), import('firebase/auth'), import('firebase/firestore'),
  ]);
  const app = getApps()[0] || initializeApp(USER_FIREBASE_CONFIG);
  const auth = getAuth(app);
  await auth.authStateReady();
  if (!auth.currentUser) await signInAnonymously(auth);
  const token = await auth.currentUser!.getIdTokenResult();
  const db = getFirestore(app);
  const ref = doc(db, 'artifacts', APP_ID, 'public', 'data', 'users', code);
  const result = await runTransaction(db, async transaction => {
    const remote = await transaction.get(ref);
    const { merged, needsWrite } = syncPayload(snapshot, remote.exists() ? remote.data() : {}, base);
    if (needsWrite) transaction.set(ref, JSON.parse(JSON.stringify({ ...merged, updatedAt: new Date().toISOString() })));
    return { merged, wrote: needsWrite };
  }, { maxAttempts: 3 });
  return { ...result, verifiedAdmin: token.claims.admin === true };
}
