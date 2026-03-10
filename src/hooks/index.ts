
import { useState, useEffect, useRef, useMemo } from 'react';
import { Topic, Simulado, UserConfig, Review, ScheduleProgress } from '../types';
import { USER_FIREBASE_CONFIG, mergeItems, APP_ID, getTodayStr, AREAS } from '../utils';

// Dynamic imports are used inside effects to handle Firebase dependencies

export const useSync = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [simulados, setSimulados] = useState<Simulado[]>([]);
  const [config, setConfig] = useState<UserConfig>({ examDate: '', targetAccuracy: 80 });
  const [scheduleProgress, setScheduleProgress] = useState<ScheduleProgress>({});
  const [loaded, setLoaded] = useState(false);
  
  // Sync States
  const [status, setStatus] = useState<'offline'|'syncing'|'online'|'error'>('offline');
  const [syncKey, _setSyncKey] = useState(() => localStorage.getItem('reviewflow_sync_key') || '');
  
  const dbRef = useRef<any>(null);
  const stateRef = useRef({ topics, simulados, config, scheduleProgress });
  const lastSyncedState = useRef({ topics: '', simulados: '', config: '', scheduleProgress: '' });
  const appId = APP_ID;

  const setSyncKey = (newKey: string) => {
      if (syncKey && syncKey !== newKey) {
          setTopics([]);
          setSimulados([]);
          setScheduleProgress({});
      }

      setStatus('syncing'); 
      _setSyncKey(newKey);
      localStorage.setItem('reviewflow_sync_key', newKey);
  };

  useEffect(() => { stateRef.current = { topics, simulados, config, scheduleProgress }; }, [topics, simulados, config, scheduleProgress]);

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
    } catch (e) { console.error(e); }
    setLoaded(true);
  }, []);

  // 2. Firebase Connection
  useEffect(() => {
    if (!syncKey || !loaded) {
        setStatus('offline');
        return;
    }

    let unsub: any = null;
    let authUnsub: any = null;

    const connect = async () => {
        try {
            setStatus('syncing');
            // Dynamic imports to avoid static analysis errors and ensure compatibility
            const { initializeApp } = await import('firebase/app') as any;
            const { getFirestore, doc, onSnapshot } = await import('firebase/firestore') as any;
            const { getAuth, signInAnonymously, onAuthStateChanged } = await import('firebase/auth') as any;

            const app = initializeApp(USER_FIREBASE_CONFIG);
            const auth = getAuth(app);
            const db = getFirestore(app);
            dbRef.current = db;

            await signInAnonymously(auth);

            authUnsub = onAuthStateChanged(auth, (user: any) => {
                if (user) {
                    const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', syncKey);
                    
                    unsub = onSnapshot(docRef, (snap: any) => {
                        if (snap.exists()) {
                            const d = snap.data();
                            
                            if (d.topics) {
                                lastSyncedState.current.topics = JSON.stringify(d.topics);
                                const merged = mergeItems(stateRef.current.topics, d.topics);
                                if (JSON.stringify(merged) !== JSON.stringify(stateRef.current.topics)) {
                                    setTopics(merged);
                                }
                            } else {
                                lastSyncedState.current.topics = JSON.stringify([]);
                            }
                            
                            if (d.simulados) {
                                lastSyncedState.current.simulados = JSON.stringify(d.simulados);
                                const merged = mergeItems(stateRef.current.simulados, d.simulados);
                                if (JSON.stringify(merged) !== JSON.stringify(stateRef.current.simulados)) {
                                    setSimulados(merged);
                                }
                            } else {
                                lastSyncedState.current.simulados = JSON.stringify([]);
                            }
                            
                            if (d.config) {
                                lastSyncedState.current.config = JSON.stringify(d.config);
                                if (JSON.stringify(d.config) !== JSON.stringify(stateRef.current.config)) {
                                    setConfig(d.config);
                                }
                            } else {
                                lastSyncedState.current.config = JSON.stringify({ examDate: '', targetAccuracy: 80 });
                            }
                            
                            if (d.scheduleProgress) {
                                lastSyncedState.current.scheduleProgress = JSON.stringify(d.scheduleProgress);
                                if (JSON.stringify(d.scheduleProgress) !== JSON.stringify(stateRef.current.scheduleProgress)) {
                                    setScheduleProgress(d.scheduleProgress);
                                }
                            } else {
                                lastSyncedState.current.scheduleProgress = JSON.stringify({});
                            }
                        }
                        setStatus('online');
                    }, (err: any) => {
                        console.error("Firestore Error:", err);
                        setStatus('error');
                    });
                }
            });

        } catch (e) {
            console.error("Firebase Connection Error:", e);
            setStatus('error');
        }
    };

    connect();

    return () => {
        if (unsub) unsub();
        if (authUnsub) authUnsub();
    };
  }, [syncKey, loaded, appId]);

  // 3. Save to LocalStorage & Cloud (Debounced)
  useEffect(() => {
    if (!loaded) return;
    
    const currentTopicsStr = JSON.stringify(topics);
    const currentSimuladosStr = JSON.stringify(simulados);
    const currentConfigStr = JSON.stringify(config);
    const currentScheduleProgressStr = JSON.stringify(scheduleProgress);

    // Local Save
    localStorage.setItem('reviewflow_v3_data', currentTopicsStr);
    localStorage.setItem('reviewflow_simulados', currentSimuladosStr);
    localStorage.setItem('reviewflow_config', currentConfigStr);
    localStorage.setItem('reviewflow_schedule_progress', currentScheduleProgressStr);
    localStorage.setItem('reviewflow_sync_key', syncKey);

    // Cloud Save (Debounced 5s to save costs)
    if (status === 'online' && dbRef.current && syncKey) {
        // Check if there are actual local changes compared to last synced state
        if (
            currentTopicsStr === lastSyncedState.current.topics &&
            currentSimuladosStr === lastSyncedState.current.simulados &&
            currentConfigStr === lastSyncedState.current.config &&
            currentScheduleProgressStr === lastSyncedState.current.scheduleProgress
        ) {
            return; // No local changes to save
        }

        const timeout = setTimeout(async () => {
            try {
                // Dynamically import firestore functions needed for saving
                const { doc, setDoc } = await import('firebase/firestore') as any;

                const docRef = doc(dbRef.current, 'artifacts', appId, 'public', 'data', 'users', syncKey);
                
                // Sanitize payload to remove undefined values which cause Firestore to crash
                const payload = JSON.parse(JSON.stringify({
                    topics,
                    simulados,
                    config,
                    scheduleProgress,
                    updatedAt: new Date().toISOString()
                }));

                // Fill in deletedAt timestamps for deleted items if missing
                // Using new Date().toISOString() instead of serverTimestamp() because
                // serverTimestamp() is not supported inside arrays in Firestore
                if (payload.topics) {
                    payload.topics.forEach((t: any) => {
                        if (t.deleted && !t.deletedAt) {
                            t.deletedAt = new Date().toISOString();
                        }
                    });
                }
                if (payload.simulados) {
                    payload.simulados.forEach((s: any) => {
                        if (s.deleted && !s.deletedAt) {
                            s.deletedAt = new Date().toISOString();
                        }
                    });
                }

                // Update lastSyncedState BEFORE saving to prevent race conditions
                lastSyncedState.current = {
                    topics: currentTopicsStr,
                    simulados: currentSimuladosStr,
                    config: currentConfigStr,
                    scheduleProgress: currentScheduleProgressStr
                };

                await setDoc(docRef, payload, { merge: true });
            } catch (e) {
                console.error("Save Error:", e);
                setStatus('error');
            }
        }, 5000);
        return () => clearTimeout(timeout);
    }
  }, [topics, simulados, config, scheduleProgress, syncKey, status, loaded, appId]);

  return { 
    topics, setTopics, 
    simulados, setSimulados, 
    config, setConfig,
    scheduleProgress, setScheduleProgress,
    loaded,
    status,
    syncKey,
    setSyncKey,
    appId
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
