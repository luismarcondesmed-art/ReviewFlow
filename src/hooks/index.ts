
import { useState, useEffect, useRef, useMemo } from 'react';
import { Topic, Simulado, UserConfig, Review, ScheduleProgress } from '../types';
import { USER_FIREBASE_CONFIG, mergeItems, APP_ID, getTodayStr, AREAS } from '../utils';

// Dynamic imports are used inside effects to handle Firebase dependencies

export const useSync = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [simulados, setSimulados] = useState<Simulado[]>([]);
  const [config, setConfig] = useState<UserConfig>({ examDate: '', targetAccuracy: 80 });
  const [scheduleProgress, setScheduleProgress] = useState<ScheduleProgress>({});
  const [dailyNotes, setDailyNotes] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  
  // Sync States
  const [status, setStatus] = useState<'offline'|'syncing'|'online'|'error'>('offline');
  const [syncKey, _setSyncKey] = useState(() => localStorage.getItem('reviewflow_sync_key') || '');
  
  const dbRef = useRef<any>(null);
  const stateRef = useRef({ topics, simulados, config, scheduleProgress, dailyNotes });
  const lastSyncedState = useRef({ topics: '', simulados: '', config: '', scheduleProgress: '', dailyNotes: '' });
  const appId = APP_ID;

  const setSyncKey = (newKey: string) => {
      if (syncKey && syncKey !== newKey) {
          setTopics([]);
          setSimulados([]);
          setScheduleProgress({});
          setDailyNotes({});
          lastSyncedState.current = { topics: '', simulados: '', config: '', scheduleProgress: '', dailyNotes: '' };
          localStorage.removeItem('reviewflow_last_synced_state');
          localStorage.removeItem('reviewflow_last_sync_time');
          localStorage.removeItem('reviewflow_v3_data');
          localStorage.removeItem('reviewflow_simulados');
          localStorage.removeItem('reviewflow_config');
          localStorage.removeItem('reviewflow_schedule_progress');
          localStorage.removeItem('reviewflow_daily_notes');
      }

      setStatus('syncing'); 
      _setSyncKey(newKey);
      localStorage.setItem('reviewflow_sync_key', newKey);
  };

  useEffect(() => { stateRef.current = { topics, simulados, config, scheduleProgress, dailyNotes }; }, [topics, simulados, config, scheduleProgress, dailyNotes]);

  // 1. Initial Local Load
  useEffect(() => {
    try {
      const t = localStorage.getItem('reviewflow_v3_data');
      if (t) setTopics(JSON.parse(t));
      const s = localStorage.getItem('reviewflow_simulados');
      if (s) setSimulados(JSON.parse(s));
      const c = localStorage.getItem('reviewflow_config');
      if (c) setConfig(JSON.parse(c));
      const p = localStorage.getItem('reviewflow_schedule_progress');
      if (p) setScheduleProgress(JSON.parse(p));
      const n = localStorage.getItem('reviewflow_daily_notes');
      if (n) setDailyNotes(JSON.parse(n));
      
      // Load last synced state to prevent overwriting local changes if sync fails
      const lastSynced = localStorage.getItem('reviewflow_last_synced_state');
      if (lastSynced) {
          lastSyncedState.current = JSON.parse(lastSynced);
      }
    } catch (e) { console.error(e); }
    setLoaded(true);
  }, []);

  // 2. Firebase Connection & Sync Now function
  const syncNow = async (manual = false) => {
      if (!syncKey || !loaded) return;
      
      const adminKeys = ((import.meta as any).env?.VITE_ADMIN_SYNC_KEYS || '').split(',');
      const premiumKeys = ((import.meta as any).env?.VITE_PREMIUM_SYNC_KEYS || '').split(',');
      const hasUnlimitedSync = adminKeys.includes(syncKey) || premiumKeys.includes(syncKey);
      
      const lastSyncTimeStr = localStorage.getItem('reviewflow_last_sync_time');
      const now = Date.now();
      
      if (manual && !hasUnlimitedSync && lastSyncTimeStr) {
          const lastSyncTime = parseInt(lastSyncTimeStr, 10);
          const timeDiffMinutes = (now - lastSyncTime) / (1000 * 60);
          
          if (timeDiffMinutes < 30) {
              alert(`A sincronização gratuita é limitada a uma vez a cada 30 minutos. Tente novamente em ${Math.ceil(30 - timeDiffMinutes)} minutos.\n\nTorne-se um "Futuro Especialista" para sincronizações ilimitadas!`);
              return;
          }
      }
      
      try {
          setStatus('syncing');
          
          let db = dbRef.current;
          if (!db) {
              const { initializeApp } = await import('firebase/app') as any;
              const { getFirestore } = await import('firebase/firestore') as any;
              const { getAuth, signInAnonymously } = await import('firebase/auth') as any;

              const app = initializeApp(USER_FIREBASE_CONFIG);
              const auth = getAuth(app);
              db = getFirestore(app);
              dbRef.current = db;

              await signInAnonymously(auth);
          }

          const { doc, getDoc, setDoc } = await import('firebase/firestore') as any;
          const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', syncKey);
          
          // 1. Fetch remote data
          const snap = await getDoc(docRef);
          let remoteData: any = {};
          if (snap.exists()) {
              remoteData = snap.data();
          }

          // 2. Merge remote with local
          let mergedTopics = stateRef.current.topics;
          if (remoteData.topics) {
              mergedTopics = mergeItems(stateRef.current.topics, remoteData.topics);
              if (JSON.stringify(mergedTopics) !== JSON.stringify(stateRef.current.topics)) {
                  setTopics(mergedTopics);
              }
          }

          let mergedSimulados = stateRef.current.simulados;
          if (remoteData.simulados) {
              mergedSimulados = mergeItems(stateRef.current.simulados, remoteData.simulados);
              if (JSON.stringify(mergedSimulados) !== JSON.stringify(stateRef.current.simulados)) {
                  setSimulados(mergedSimulados);
              }
          }

          let mergedConfig = stateRef.current.config;
          if (remoteData.config) {
              const hasLocalChanges = JSON.stringify(stateRef.current.config) !== lastSyncedState.current.config;
              if (!hasLocalChanges && JSON.stringify(remoteData.config) !== JSON.stringify(stateRef.current.config)) {
                  mergedConfig = remoteData.config;
                  setConfig(mergedConfig);
              }
          }

          const safeParse = (str: string) => {
              try { return str ? JSON.parse(str) : {}; } catch { return {}; }
          };
          const mergeDict = (local: any, remote: any, lastSyncedStr: string) => {
              const lastSynced = safeParse(lastSyncedStr);
              const merged: any = {};
              const allKeys = new Set([...Object.keys(local || {}), ...Object.keys(remote || {}), ...Object.keys(lastSynced || {})]);
              
              allKeys.forEach(k => {
                  const l = local?.[k];
                  const r = remote?.[k];
                  const base = lastSynced?.[k];
                  
                  if (l !== base) {
                      if (l !== undefined) merged[k] = l;
                  } else if (r !== base) {
                      if (r !== undefined) merged[k] = r;
                  } else {
                      if (base !== undefined) merged[k] = base;
                  }
              });
              return merged;
          };

          let mergedScheduleProgress = stateRef.current.scheduleProgress;
          if (remoteData.scheduleProgress) {
              mergedScheduleProgress = mergeDict(stateRef.current.scheduleProgress, remoteData.scheduleProgress, lastSyncedState.current.scheduleProgress);
              if (JSON.stringify(mergedScheduleProgress) !== JSON.stringify(stateRef.current.scheduleProgress)) {
                  setScheduleProgress(mergedScheduleProgress);
              }
          }

          let mergedDailyNotes = stateRef.current.dailyNotes;
          if (remoteData.dailyNotes) {
              mergedDailyNotes = mergeDict(stateRef.current.dailyNotes, remoteData.dailyNotes, lastSyncedState.current.dailyNotes);
              if (JSON.stringify(mergedDailyNotes) !== JSON.stringify(stateRef.current.dailyNotes)) {
                  setDailyNotes(mergedDailyNotes);
              }
          }

          // 3. Save merged data back to Firebase
          const payload = JSON.parse(JSON.stringify({
              ...remoteData,
              topics: mergedTopics,
              simulados: mergedSimulados,
              config: mergedConfig,
              scheduleProgress: mergedScheduleProgress,
              dailyNotes: mergedDailyNotes,
              updatedAt: new Date().toISOString()
          }));

          // Fill in deletedAt timestamps
          if (payload.topics) {
              payload.topics.forEach((t: any) => {
                  if (t.deleted && !t.deletedAt) t.deletedAt = new Date().toISOString();
              });
          }
          if (payload.simulados) {
              payload.simulados.forEach((s: any) => {
                  if (s.deleted && !s.deletedAt) s.deletedAt = new Date().toISOString();
              });
          }

          await setDoc(docRef, payload);

          // 4. Update last synced state
          lastSyncedState.current = {
              topics: JSON.stringify(mergedTopics),
              simulados: JSON.stringify(mergedSimulados),
              config: JSON.stringify(mergedConfig),
              scheduleProgress: JSON.stringify(mergedScheduleProgress),
              dailyNotes: JSON.stringify(mergedDailyNotes)
          };
          localStorage.setItem('reviewflow_last_synced_state', JSON.stringify(lastSyncedState.current));

          // 5. Update last sync time
          localStorage.setItem('reviewflow_last_sync_time', now.toString());
          setStatus('online');

      } catch (e) {
          console.error("Sync Error:", e);
          setStatus('error');
      }
  };

  // 3. Auto-sync on load and on data changes
  useEffect(() => {
      if (!loaded || !syncKey) return;
      
      const adminKeys = ((import.meta as any).env?.VITE_ADMIN_SYNC_KEYS || '').split(',');
      const premiumKeys = ((import.meta as any).env?.VITE_PREMIUM_SYNC_KEYS || '').split(',');
      const hasUnlimitedSync = adminKeys.includes(syncKey) || premiumKeys.includes(syncKey);
      
      if (hasUnlimitedSync) {
          // Debounce auto-sync to avoid spamming Firebase
          const timeout = setTimeout(() => {
              syncNow(false);
          }, 2000);
          return () => clearTimeout(timeout);
      } else {
          setStatus('online'); // Assume online, but require manual sync
      }
  }, [loaded, syncKey, topics, simulados, config, scheduleProgress, dailyNotes]);

  // 4. Save to LocalStorage (Immediate)
  useEffect(() => {
    if (!loaded) return;
    
    localStorage.setItem('reviewflow_v3_data', JSON.stringify(topics));
    localStorage.setItem('reviewflow_simulados', JSON.stringify(simulados));
    localStorage.setItem('reviewflow_config', JSON.stringify(config));
    localStorage.setItem('reviewflow_schedule_progress', JSON.stringify(scheduleProgress));
    localStorage.setItem('reviewflow_daily_notes', JSON.stringify(dailyNotes));
    localStorage.setItem('reviewflow_sync_key', syncKey);
  }, [topics, simulados, config, scheduleProgress, dailyNotes, syncKey, loaded]);

  const adminKeys = ((import.meta as any).env?.VITE_ADMIN_SYNC_KEYS || '').split(',');
  const premiumKeys = ((import.meta as any).env?.VITE_PREMIUM_SYNC_KEYS || '').split(',');
  const userRole = adminKeys.includes(syncKey) ? 'admin' : premiumKeys.includes(syncKey) ? 'premium' : 'free';

  return { 
    topics, setTopics, 
    simulados, setSimulados, 
    config, setConfig,
    scheduleProgress, setScheduleProgress,
    dailyNotes, setDailyNotes,
    loaded,
    status,
    syncKey,
    setSyncKey,
    appId,
    syncNow,
    userRole
  };
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
