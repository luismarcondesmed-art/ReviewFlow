import { useEffect,useMemo,useRef,useState } from 'react';
import { toast } from 'sonner';
import { syncCloud } from '../services/cloudSync';
import { mergeStudyData,preserveInFlightChanges,type StudyData } from '../services/syncMerge';
import { syncErrorMessage } from '../services/syncSafety';
import { parseSyncMeta,fastSync,nextSyncTime, prioritySyncProfile,stableJSON,syncInterval,validSyncCode,type SyncMeta } from '../services/syncPolicy';
import { ScheduleProgress,Simulado,Topic,UserConfig } from '../types';
import { getTodayStr } from '../utils';

const defaults: UserConfig = { examDate: '', targetAccuracy: 80, useFSRS: true, fsrsRetention: .9, fsrsMaximumInterval: 730 };
const storage = { topics: 'reviewflow_v3_data', simulados: 'reviewflow_simulados', config: 'reviewflow_config', scheduleProgress: 'reviewflow_schedule_progress', dailyNotes: 'reviewflow_daily_notes' };
const emptyData = (): StudyData => ({ topics: [], simulados: [], config: { ...defaults }, scheduleProgress: {}, dailyNotes: {} });
const readText = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
function readLocal(): StudyData {
  const result = emptyData();
  for (const [field, key] of Object.entries(storage)) {
    const raw = readText(key);
    if (!raw) continue;
    try {
      const value = JSON.parse(raw);
      const valid = field === 'dailyNotes' ? value && typeof value === 'object' && !Array.isArray(value) && Object.values(value).every(note => typeof note === 'string') : ['topics', 'simulados'].includes(field) ? Array.isArray(value) && value.every(item => item && typeof item.id === 'string' && (field !== 'topics' || Array.isArray(item.reviews))) : value && typeof value === 'object' && !Array.isArray(value);
      if (!valid) throw new Error('Formato inválido');
      result[field] = field === 'config' ? { ...defaults, ...value } : value;
    } catch {
      try { localStorage.setItem(key + '_backup_' + Date.now(), raw); } catch { /* Do not destroy the original entry. */ }
      toast.error('Dados locais inválidos: ' + field, { description: 'Exporte um backup antes de continuar.' });
      throw new Error('Dados locais inválidos. Use a recuperação de backup antes de continuar.');
    }
  }
  return result;
}
function loadBase(): Partial<StudyData> {
  try {
    const saved = JSON.parse(readText('reviewflow_last_synced_state') || JSON.stringify({ config: defaults }));
    return Object.fromEntries(Object.entries(saved).map(([k, v]) => [k, typeof v === 'string' ? JSON.parse(v || '{}') : v]));
  } catch { return {}; }
}
function readMeta(code: string): SyncMeta {
  return parseSyncMeta(readText('reviewflow_sync_meta:' + code));
}
export const useSync = () => {
  const [initial] = useState(readLocal);
  const [initialStorage] = useState(() => new Map(Object.values(storage).map(key => [key, readText(key)])));
  const persistedStorage = useRef(initialStorage);
  const [topics, setTopics] = useState<Topic[]>(initial.topics);
  const [simulados, setSimulados] = useState<Simulado[]>(initial.simulados);
  const [config, setConfig] = useState<UserConfig>(initial.config);
  const [scheduleProgress, setScheduleProgress] = useState<ScheduleProgress>(initial.scheduleProgress);
  const [dailyNotes, setDailyNotes] = useState<Record<string,string>>(initial.dailyNotes);
  const loaded = true;
  const [status, setStatus] = useState<'offline'|'syncing'|'online'|'error'|'pending'>('offline');
  const [syncKey, updateKey] = useState(() => readText('reviewflow_sync_key') || '');
  const [verifiedAdmin, setVerifiedAdmin] = useState(false);
  const [priorityProfile, setPriorityProfile] = useState(false);
  const priorityRef = useRef(false);
  const [lastSyncAt, setLastSyncAt] = useState(() => readMeta(syncKey).lastSuccess);
  const stateRef = useRef<StudyData>(initial);
  const persisted = useRef<StudyData>(initial);
  const [syncError, setSyncError] = useState('');
  const keyRef = useRef(syncKey);
  const syncing = useRef(false);
  const staleAccount = useRef(false);
  const [initialBase] = useState(loadBase);
  const lastSynced = useRef(initialBase);
  const adminRef = useRef(false);
  const syncRef = useRef<(manual?: boolean, pull?: boolean) => Promise<void>>(async () => {});
  const state = { topics, simulados, config, scheduleProgress, dailyNotes };
  stateRef.current = state;
  const apply = (data: StudyData) => {
    stateRef.current = data;
    setTopics(data.topics); setSimulados(data.simulados); setConfig(data.config);
    setScheduleProgress(data.scheduleProgress); setDailyNotes(data.dailyNotes);
  };
  const accountUnchanged = () => !staleAccount.current && (readText('reviewflow_sync_key') || '') === keyRef.current;
  useEffect(() => {
    let active = true;
    priorityRef.current = false;
    void prioritySyncProfile(syncKey).then(priority => { if (active && keyRef.current === syncKey) { priorityRef.current = priority; setPriorityProfile(priority); } }).catch(() => {});
    return () => { active = false; };
  }, [syncKey]);
  const setSyncKey = (input: string) => {
    const key = input.trim();
    if (key === keyRef.current) return;
    if (syncing.current) { toast.error('Aguarde a sincronização terminar antes de trocar o código.'); return; }
    if (!validSyncCode(key)) { toast.error('Use até 128 letras, números, hífens ou sublinhados.'); return; }
    try {
      if (keyRef.current) localStorage.setItem('reviewflow_account_backup_' + Date.now(), JSON.stringify({ key: keyRef.current, ...stateRef.current }));
      localStorage.setItem('reviewflow_sync_key', key);
      if (keyRef.current && key) {
        const next = emptyData();
        for (const [field, storageKey] of Object.entries(storage)) localStorage.setItem(storageKey, JSON.stringify(next[field]));
        persisted.current = next; apply(next);
      }
      lastSynced.current = { config: { ...defaults } };
      localStorage.removeItem('reviewflow_last_synced_state');
      keyRef.current = key; updateKey(key); staleAccount.current = false;
      adminRef.current = false; setVerifiedAdmin(false); priorityRef.current = false; setPriorityProfile(false); setLastSyncAt(readMeta(key).lastSuccess);
      setSyncError(''); setStatus('offline');
    } catch { toast.error('Não foi possível trocar o código. Libere espaço ou exporte um backup.'); }
  };
  const syncNow = async (manual = false, pull = false) => {
    const key = keyRef.current;
    if (!key || syncing.current || !accountUnchanged()) return;
    if (!navigator.onLine) { setStatus('offline'); return; }
    if (!manual && document.visibilityState === 'hidden') return;
    const execute = async () => {
      if (!accountUnchanged()) return;
      const meta = readMeta(key);
      const due = nextSyncTime(meta, key, manual, adminRef.current || priorityRef.current);
      if (Date.now() < due) {
        if (manual) toast.info(`Aguarde ${Math.ceil((due - Date.now()) / 1000)} segundos para sincronizar novamente.`);
        return;
      }
      if (!manual && !pull && stableJSON(stateRef.current) === stableJSON(lastSynced.current)) return;
      const attempt = { ...meta, lastAttempt: Date.now() };
      // Persist the throttle before starting network activity, including failures.
      try { localStorage.setItem('reviewflow_sync_meta:' + key, JSON.stringify(attempt)); }
      catch { setStatus('error'); if (manual) toast.error('Armazenamento indisponível. Exporte um backup.'); return; }
      setSyncError(''); setStatus('syncing');
      const snapshot = structuredClone(stateRef.current);
      try {
        const { merged, verifiedAdmin: admin } = await syncCloud(snapshot, lastSynced.current, key);
        if (!accountUnchanged()) return;
        const current = preserveInFlightChanges(stateRef.current, merged, snapshot);
        if (stableJSON(current) !== stableJSON(stateRef.current)) apply(current);
        lastSynced.current = merged;
        adminRef.current = admin; setVerifiedAdmin(admin);
        const now = Date.now(); setLastSyncAt(now);
        localStorage.setItem('reviewflow_last_synced_state', JSON.stringify(merged));
        localStorage.setItem('reviewflow_sync_meta:' + key, JSON.stringify({ lastAttempt: attempt.lastAttempt, lastSuccess: now, failures: 0 }));
        setStatus(stableJSON(current) === stableJSON(merged) ? 'online' : 'pending');
        if (manual) toast.success('Sincronização concluída.');
      } catch (error) {
        try { localStorage.setItem('reviewflow_sync_meta:' + key, JSON.stringify({ ...attempt, failures: meta.failures + 1 })); } catch { /* Preserve the original network error. */ }
        const message = syncErrorMessage(error); setSyncError(message);
        setStatus('error');
        if (manual) toast.error('Não foi possível sincronizar', { description: message });
      }
    };
    syncing.current = true;
    try {
      if (navigator.locks) await navigator.locks.request('reviewflow-sync:' + key, { ifAvailable: true }, async lock => { if (lock) await execute(); else if (manual) toast.info('Outra aba já está sincronizando.'); });
      else {
        // Older webviews: best-effort expiring lease, without a polling listener.
        const leaseKey = 'reviewflow_sync_lease:' + key;
        const rawLease = readText(leaseKey);
        let expires = Number(rawLease);
        try { expires = JSON.parse(rawLease || 'null')?.expires || expires; } catch { /* Legacy numeric lease. */ }
        if (expires > Date.now()) { if (manual) toast.info('Outra aba já está sincronizando.'); return; }
        const lease = JSON.stringify({ expires: Date.now() + 300_000, owner: crypto.randomUUID() });
        localStorage.setItem(leaseKey, lease);
        if (readText(leaseKey) !== lease) return;
        try { await execute(); } finally { if (readText(leaseKey) === lease) localStorage.removeItem(leaseKey); }
      }
    } catch { setStatus('error'); if (manual) toast.error('Não foi possível iniciar a sincronização. Seus dados locais foram mantidos.'); }
    finally { syncing.current = false; }
  };
  syncRef.current = syncNow;
  useEffect(() => {
    if (!accountUnchanged()) return;
    try {
      const diskChanged = Object.values(storage).some(key => readText(key) !== persistedStorage.current.get(key));
      const combined = diskChanged ? mergeStudyData(stateRef.current, readLocal(), persisted.current) : stateRef.current;
      if (stableJSON(combined) !== stableJSON(stateRef.current)) apply(combined);
      for (const [field, key] of Object.entries(storage)) {
        const encoded = JSON.stringify(combined[field]);
        if (readText(key) !== encoded) localStorage.setItem(key, encoded);
        persistedStorage.current.set(key, encoded);
      }
      persisted.current = combined;
    } catch { setStatus('error'); toast.error('Armazenamento cheio ou indisponível. Exporte um backup nas configurações.'); }
    if (syncKey && stableJSON(stateRef.current) !== stableJSON(lastSynced.current)) setStatus(previous => previous === 'syncing' || previous === 'error' ? previous : 'pending');
  }, [syncKey, topics, simulados, config, scheduleProgress, dailyNotes]);
  useEffect(() => {
    const changed = (event: StorageEvent) => {
      if (event.key === 'reviewflow_sync_key' && (event.newValue || '') !== keyRef.current) {
        staleAccount.current = true; setStatus('error');
        setSyncError('O código mudou em outra aba. Recarregue esta aba antes de continuar.');
        toast.info('O código mudou em outra aba. Recarregue para continuar.'); return;
      }
      if (!accountUnchanged()) return;
      if (Object.values(storage).includes(event.key || '')) {
        try {
          const disk = readLocal();
          const combined = mergeStudyData(stateRef.current, disk, persisted.current);
          persisted.current = disk;
          if (stableJSON(combined) !== stableJSON(stateRef.current)) apply(combined);
        } catch { setStatus('error'); setSyncError('Não foi possível ler os dados da outra aba. Exporte um backup.'); }
      }
      if (event.key === 'reviewflow_last_synced_state') {
        lastSynced.current = loadBase();
        setLastSyncAt(readMeta(keyRef.current).lastSuccess);
      }
    };
    window.addEventListener('storage', changed);
    return () => window.removeEventListener('storage', changed);
  }, []);
  useEffect(() => {
    if (!syncKey) return;
    // Delay the first pull slightly so StrictMode does not double-submit on mount.
    const startup = setTimeout(() => void syncRef.current(false, true), 1000);
    const offline = () => setStatus('offline');
    const pull = () => { if (document.visibilityState === 'visible') void syncRef.current(false, true); };
    // Idle tabs do not poll Firestore. Changed data is batched at the policy interval.
    const tick = setInterval(() => void syncRef.current(), fastSync(syncKey, verifiedAdmin || priorityProfile) ? 5000 : 30_000);
    window.addEventListener('offline', offline); window.addEventListener('online', pull);
    window.addEventListener('focus', pull); document.addEventListener('visibilitychange', pull);

    return () => { clearTimeout(startup); clearInterval(tick); window.removeEventListener('offline', offline); window.removeEventListener('online', pull); window.removeEventListener('focus', pull); document.removeEventListener('visibilitychange', pull); };
  }, [syncKey, verifiedAdmin, priorityProfile]);
  const userRole = verifiedAdmin ? 'admin' as const : 'usuario' as const;
  return { topics, setTopics, simulados, setSimulados, config, setConfig, scheduleProgress, setScheduleProgress, dailyNotes, setDailyNotes, loaded, status, syncKey, setSyncKey, appId: 'reviewflow', syncNow, syncError, userRole, lastSyncAt, syncIntervalMs: syncInterval(syncKey, verifiedAdmin || priorityProfile) };
};

export const useVibration = () => {
    const vibrate = (pattern: number | number[] = 10) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };
    
    return {
        tick: () => vibrate(10),
        success: () => vibrate([20, 30, 20]),
        error: () => vibrate(200),
        complete: () => vibrate([50, 50, 50]),
    }
};

// --- New Hook: useAnalytics ---
// Encapsulates data transformation logic for the Analytics Dashboard
export const useAnalytics = (
    topics: Topic[], 
    simulados: Simulado[], 
    filters: { period: '7d'|'30d'|'all', typeFilter: 'all'|'topics'|'simulados', areaFilter: string, simInstitution: string, simYear: string }
) => {
    const { period, typeFilter, areaFilter, simInstitution, simYear } = filters;

    // Extract available filters for dropdowns
    const { institutions, years } = useMemo(() => {
        const instSet = new Set<string>();
        const yearSet = new Set<string>();
        simulados.forEach(s => {
            instSet.add(s.name); 
            yearSet.add(s.year);
        });
        return {
            institutions: Array.from(instSet).sort(),
            years: Array.from(yearSet).sort().reverse()
        };
    }, [simulados]);

    const groupedData = useMemo(() => {
        const groups: Record<string, { id: string, title: string, area: string, type: 'topic' | 'simulado', lastDate: string, correct: number, total: number, reviews: any[] }> = {};
        
        const now = new Date();
        let minDate = new Date('2000-01-01');
        if (period === '7d') minDate = new Date(now.getTime() - 7 * 86400000);
        if (period === '30d') minDate = new Date(now.getTime() - 30 * 86400000);
        const minDateStr = minDate.toISOString().split('T')[0];

        if (typeFilter !== 'simulados') {
            topics.forEach(t => {
                if (t.deleted) return;
                if (typeFilter === 'topics' && areaFilter !== 'all' && t.area !== areaFilter) return;

                // For filtering purposes, check date
                const validReviews = t.reviews
                    .map((r, i) => ({ ...r, originalIdx: i })) // Preserve original index
                    .filter(r => r.done && r.date >= minDateStr);

                if (validReviews.length > 0) {
                    const totalC = validReviews.reduce((acc, r) => acc + r.correct, 0);
                    const totalT = validReviews.reduce((acc, r) => acc + r.total, 0);
                    groups[t.id] = {
                        id: t.id,
                        title: t.title,
                        area: t.area,
                        type: 'topic',
                        lastDate: validReviews.sort((a,b) => b.date.localeCompare(a.date))[0].date,
                        correct: totalC,
                        total: totalT,
                        reviews: validReviews
                    };
                }
            });
        }

        if (typeFilter !== 'topics') { 
            simulados.forEach(s => {
                if (typeFilter === 'simulados') {
                    if (simInstitution !== 'all' && s.name !== simInstitution) return false;
                    if (simYear !== 'all' && s.year !== simYear) return false;
                }

                const d = s.dateTaken.split('T')[0];
                if (d >= minDateStr) {
                    groups[s.id] = {
                        id: s.id,
                        title: s.name,
                        area: 'Simulado',
                        type: 'simulado',
                        lastDate: d,
                        correct: s.correctCount,
                        total: s.totalQuestions,
                        reviews: [{ date: d, label: s.year, correct: s.correctCount, total: s.totalQuestions }]
                    };
                }
            });
        }

        return Object.values(groups).sort((a,b) => b.lastDate.localeCompare(a.lastDate));
    }, [topics, simulados, period, areaFilter, typeFilter, simInstitution, simYear]);

    const metrics = useMemo(() => {
        const total = groupedData.reduce((acc, i) => acc + i.total, 0);
        const correct = groupedData.reduce((acc, i) => acc + i.correct, 0);
        const wrong = total - correct;
        const acc = total > 0 ? Math.round((correct / total) * 100) : 0;
        return { total, correct, wrong, acc };
    }, [groupedData]);

    const filteredSimuladosForChart = useMemo(() => {
        return simulados.filter(s => {
            if (typeFilter === 'simulados') {
                if (simInstitution !== 'all' && s.name !== simInstitution) return false;
                if (simYear !== 'all' && s.year !== simYear) return false;
            }
            return true;
        });
    }, [simulados, simInstitution, simYear, typeFilter]);

    return { institutions, years, groupedData, metrics, filteredSimuladosForChart };
};

// --- New Hook: useNotifications ---
export const useNotifications = () => {
    const [permission, setPermission] = useState<NotificationPermission>('default');

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            alert('Este navegador não suporta notificações.');
            return 'denied';
        }
        const p = await Notification.requestPermission();
        setPermission(p);
        return p;
    };

    const sendNotification = (title: string, options?: NotificationOptions) => {
        if (permission === 'granted') {
            new Notification(title, {
                icon: '/vite.svg', // Fallback icon
                ...options
            });
        }
    };

    return { permission, requestPermission, sendNotification };
};

export const useCalendar = (topics: Topic[], simulados: Simulado[], currentDate: Date, examDate?: string) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = getTodayStr();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const monthData = useMemo(() => {
        const data: Record<string, { reviews: any[], sims: any[] }> = {};
        for(let i=1; i<=daysInMonth; i++) {
             // Create date string manually to avoid timezone shifts
             const d = new Date(year, month, i);
             // Manually format to YYYY-MM-DD
             const y = d.getFullYear();
             const m = String(d.getMonth() + 1).padStart(2, '0');
             const day = String(d.getDate()).padStart(2, '0');
             const dateStr = `${y}-${m}-${day}`;
             
             data[dateStr] = { reviews: [], sims: [] };
        }
        topics.forEach(t => {
            if(t.deleted) return;
            t.reviews.forEach((r, idx) => {
                if (data[r.date]) data[r.date].reviews.push({ ...r, topicId: t.id, topicTitle: t.title, idx });
            });
        });
        simulados.forEach(s => {
            const d = s.dateTaken.split('T')[0];
             if (data[d]) data[d].sims.push(s);
        });
        return data;
    }, [topics, simulados, year, month, daysInMonth]);

    const timelineDays = useMemo(() => {
        const list = [];
        // Use a pure date string approach to avoid timezone issues
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2); 
        
        for(let i=0; i<30; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            
            // Format to YYYY-MM-DD manually
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const dateStr = `${y}-${m}-${day}`;
            
            const reviews: any[] = [];
            topics.forEach(t => {
                if(t.deleted) return;
                t.reviews.forEach((r, idx) => {
                    if (r.date === dateStr) {
                        reviews.push({ ...r, topicId: t.id, topicTitle: t.title, area: t.area, idx });
                    }
                });
            });

            const sims = simulados.filter(s => s.dateTaken.split('T')[0] === dateStr);

            if (reviews.length > 0 || sims.length > 0 || dateStr === today || dateStr === examDate) {
                list.push({ date: dateStr, reviews, sims, isToday: dateStr === today });
            }
        }
        return list;
    }, [topics, simulados, today, examDate]);

    return { monthData, timelineDays, daysInMonth, firstDay };
};
