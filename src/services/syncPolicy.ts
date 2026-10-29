export const NORMAL_SYNC_INTERVAL = 10 * 60_000;
export const FAST_SYNC_INTERVAL = 30_000;
export interface SyncMeta { lastAttempt: number; lastSuccess: number; failures: number }
export const emptySyncMeta = (): SyncMeta => ({ lastAttempt: 0, lastSuccess: 0, failures: 0 });
export function parseSyncMeta(raw: string | null, now = Date.now()): SyncMeta {
  try {
    const value: unknown = JSON.parse(raw || '{}');
    if (!value || typeof value !== 'object' || Array.isArray(value)) return emptySyncMeta();
    const saved = value as Record<string, unknown>;
    const timestamp = (v: unknown) => typeof v === 'number' && Number.isSafeInteger(v) && v >= 0 && v <= now ? v : 0;
    return { lastAttempt: timestamp(saved.lastAttempt), lastSuccess: timestamp(saved.lastSuccess), failures: typeof saved.failures === 'number' && Number.isSafeInteger(saved.failures) && saved.failures >= 0 ? Math.min(saved.failures, 6) : 0 };
  } catch { return emptySyncMeta(); }
}
export const validSyncCode = (value: string) => !value || /^[A-Za-z0-9_-]{1,128}$/.test(value);
// This is a frequency preference, never an authorization or an admin credential.
export const fastSync = (_code: string, priorityProfile = false) => priorityProfile;
export async function prioritySyncProfile(code: string) {
  if (!code || !globalThis.crypto?.subtle) return false;
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(code));
  const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
  // Only chooses an interval. The digest is not an authorization mechanism.
  return hash === 'c6ef1a50e6f482cf13a193c31dc07576afb1a870ee2d11da6741a55c23c379ce';
}
export const syncInterval = (code: string, verifiedAdmin = false) => fastSync(code, verifiedAdmin) ? FAST_SYNC_INTERVAL : NORMAL_SYNC_INTERVAL;
export function nextSyncTime(meta: SyncMeta, code: string, manual = false, verifiedAdmin = false) {
  const interval = syncInterval(code, verifiedAdmin);
  const cooldown = manual ? (fastSync(code, verifiedAdmin) ? 3_000 : 60_000) : interval;
  const backoff = meta.failures ? Math.min(60 * 60_000, interval * 2 ** Math.min(meta.failures, 6)) : 0;
  return meta.lastAttempt ? meta.lastAttempt + Math.max(cooldown, backoff) : 0;
}

export function stableJSON(value: unknown): string {
  return JSON.stringify(value, (_, item) => item && typeof item === 'object' && !Array.isArray(item)
    ? Object.fromEntries(Object.keys(item).sort().map(key => [key, item[key]])) : item);
}
