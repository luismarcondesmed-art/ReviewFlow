import { validateBackup } from './backup';
import type { StudyData } from './syncMerge';

// Conservative JSON budget; Firestore additionally counts field and type overhead.
export const SYNC_PAYLOAD_BUDGET = 800_000;
export function assertSyncSize(value: unknown) {
  if (new TextEncoder().encode(JSON.stringify(value)).byteLength > SYNC_PAYLOAD_BUDGET) throw new Error('Seu histórico excede o limite desta sincronização. Exporte um backup; nenhum dado local foi removido.');
}
export function validateRemoteData(value: unknown): Partial<StudyData> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Os dados da nuvem têm um formato inválido.');
  const remote = value as Partial<StudyData>;
  validateBackup({ ...remote, topics: remote.topics || [] });
  return Object.fromEntries(['topics','simulados','config','scheduleProgress','dailyNotes'].filter(key => remote[key] !== undefined).map(key => [key,remote[key]]));
}
export function syncErrorMessage(error: unknown) {
  const code = (error as {code?: string})?.code || '';
  if (code.includes('permission-denied') || code.includes('unauthorized')) return 'Acesso à nuvem negado. Confira a autenticação e as regras do Firebase.';
  if (code.includes('resource-exhausted')) return 'A cota do Firebase foi atingida. Seus dados permanecem no aparelho; novas tentativas serão espaçadas.';
  if (code.includes('unavailable') || code.includes('network-request-failed')) return 'Conexão indisponível. Continuamos salvando neste aparelho.';
  if (code.includes('operation-not-allowed')) return 'Ative a autenticação anônima no projeto Firebase para usar a sincronização atual.';
  return error instanceof Error ? error.message : 'Falha na sincronização. Seus dados locais foram mantidos.';
}
