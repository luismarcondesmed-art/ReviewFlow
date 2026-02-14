import { AreaType, ImportanceType, Review, Topic, Simulado } from './types';

// --- Constants ---

export const APP_ID = 'reviewflow';

export const USER_FIREBASE_CONFIG = { 
    apiKey: "AIzaSyCvqp5HYUMnogWmwT0O1LFLOMsfqj9P83s", 
    authDomain: "med-heklp.firebaseapp.com", 
    projectId: "med-heklp", 
    storageBucket: "med-heklp.firebasestorage.app", 
    messagingSenderId: "675054342845", 
    appId: "1:675054342845:web:91e53e21060a087123ddd4", 
    measurementId: "G-BLWYTWFFTZ" 
};

export const AREAS: { id: AreaType; name: string; full: string }[] = [
  { id: 'clinica', name: 'Clínica', full: 'Clínica Médica' },
  { id: 'cirurgia', name: 'Cirurgia', full: 'Cirurgia Geral' },
  { id: 'pediatria', name: 'Pediatria', full: 'Pediatria' },
  { id: 'go', name: 'G.O.', full: 'Ginecologia e Obstetrícia' },
  { id: 'preventiva', name: 'Preventiva', full: 'Medicina Preventiva' },
];

export const SUB_AREAS: Record<AreaType, string[]> = {
  clinica: ['Cardiologia', 'Nefrologia', 'Pneumologia', 'Gastroenterologia', 'Hepatologia', 'Infectologia', 'Reumatologia', 'Hematologia', 'Endocrinologia', 'Neurologia', 'Psiquiatria', 'Dermatologia'],
  cirurgia: ['Cirurgia Geral', 'Trauma', 'Cirurgia Digestiva', 'Cirurgia Vascular', 'Urologia', 'Ortopedia', 'Otorrinolaringologia', 'Oftalmologia'],
  pediatria: ['Puericultura', 'Neonatologia', 'Infecto Ped', 'Respiratório', 'Gastro Ped', 'Nefro Ped', 'Emergências'],
  go: ['Obstetrícia', 'Ginecologia Geral', 'Endocrino Ginecológica', 'Oncologia Ginecológica', 'Mastologia'],
  preventiva: ['SUS', 'Epidemiologia', 'Saúde do Trabalhador', 'Ética Médica'],
};

export const IMPORTANCE_LEVELS: { id: ImportanceType; label: string; baseQ: number }[] = [
  { id: 'high', label: 'Alta', baseQ: 30 },
  { id: 'medium', label: 'Média', baseQ: 25 },
  { id: 'low', label: 'Baixa', baseQ: 20 },
];

const SYSTEM_PARAMS = {
  SPACING_FACTORS: { 'R0': 1.0, 'R1': 2.5, 'R2': 1.25, 'R3': 1.0, 'R_FINAL': 2.0, 'DEFAULT': 1.0 } as Record<string, number>,
};

// --- Logic ---

export const getTodayStr = () => new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0];

export const generateId = () => (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);

export const formatDate = (d: string) => { 
  if (!d) return ''; 
  const parts = d.split('-');
  return `${parts[2]}/${parts[1]}`; 
};

export const formatFullDate = (d: string) => { 
  if (!d) return ''; 
  const dateObj = new Date(d + 'T12:00:00'); 
  return dateObj.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'long' }); 
};

// Dynamic Performance Color
export const getPerformanceColor = (score: number, target: number, type: 'bg' | 'text' | 'ring' = 'text') => {
    const isGreen = score >= target;
    const isYellow = score >= (target - 15) && score < target;

    if (type === 'bg') {
        if (isGreen) return 'bg-emerald-500';
        if (isYellow) return 'bg-amber-500';
        return 'bg-red-500';
    }
    if (type === 'text') {
        if (isGreen) return 'text-emerald-500';
        if (isYellow) return 'text-amber-500';
        return 'text-red-500';
    }
    if (type === 'ring') {
        if (isGreen) return 'ring-emerald-500';
        if (isYellow) return 'ring-amber-500';
        return 'ring-red-500';
    }
    return '';
};

export const getPerformanceBgLight = (score: number, target: number) => {
    const isGreen = score >= target;
    const isYellow = score >= (target - 15) && score < target;
    
    if (isGreen) return 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300';
    if (isYellow) return 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300';
    return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300';
}

export const calculateNextLoad = (importanceId: ImportanceType, diffId: string | null, stage: string, acc: number | null): number => {
  const impObj = IMPORTANCE_LEVELS.find(i => i.id === importanceId) || IMPORTANCE_LEVELS[1];
  const base = impObj.baseQ;
  const stageFactor = SYSTEM_PARAMS.SPACING_FACTORS[stage] || 1.0;
  const diffWeight = diffId === 'easy' ? 0.9 : diffId === 'hard' ? 1.1 : 1.0;
  let perfFactor = 1.0;

  if (acc !== null) {
    if (acc >= 1.0) perfFactor = 0.9;
    else if (acc < 0.85) {
      const gap = Math.max(0, 0.90 - acc);
      perfFactor = Math.min(2.2, 1 + (gap * 2.0));
    }
  }

  let n = Math.round(base * stageFactor * diffWeight * perfFactor);
  if (acc !== null && acc < 0.60) n += 10;
  return Math.max(15, Math.min(n, 100));
};

// --- NEW SMART SCHEDULING LOGIC ---

const addDays = (dateStr: string, days: number): string => {
    const d = new Date(dateStr + 'T12:00:00');
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
};

const getBusyDates = (topics: Topic[], ignoreTopicId?: string): Set<string> => {
    const busy = new Set<string>();
    topics.forEach(t => {
        if (t.id === ignoreTopicId || t.deleted) return;
        t.reviews.forEach(r => {
            if (!r.done) busy.add(r.date);
        });
    });
    return busy;
};

const findNextEmptyDate = (startDate: string, busyDates: Set<string>): string => {
    let d = startDate;
    let attempts = 0;
    // Look for a slot. If fully booked for 365 days, give up and stack it.
    while (busyDates.has(d) && attempts < 365) {
        d = addDays(d, 1);
        attempts++;
    }
    return d;
};

export const generateSmartSchedule = (
    studyDate: string, 
    examDate: string | undefined, 
    importanceId: ImportanceType,
    existingTopics: Topic[] = [],
    currentTopicId?: string
): Review[] => {
    const impObj = IMPORTANCE_LEVELS.find(i => i.id === importanceId) || IMPORTANCE_LEVELS[1];
    
    // 1. Calculate Timeframe
    const today = getTodayStr();
    const effectiveExamDate = examDate && examDate > today ? examDate : addDays(today, 365);
    const daysUntilExam = (new Date(effectiveExamDate + 'T12:00:00').getTime() - new Date(studyDate + 'T12:00:00').getTime()) / (1000 * 60 * 60 * 24);
    
    // "Final Review Zone" is the last 7 days before exam.
    // We try to fit R1, R2, R3 BEFORE this zone.
    const studyWindow = Math.max(0, daysUntilExam - 7);
    
    // 2. Determine Spacing Factors (Compression)
    // Calculate relative intervals (R1 is from T0, R2 is from R1, R3 is from R2)
    let intervals = [7, 21, 30]; // Standard Gaps: T0 --7--> R1 --21--> R2 --30--> R3

    if (studyWindow < 65) {
        // High Compression needed (Accordion Logic)
        if (studyWindow < 15) {
            // Extreme emergency mode
            intervals = [2, 3, 5]; 
        } else if (studyWindow < 30) {
            // Very tight
            intervals = [3, 7, 10];
        } else {
            // Moderate compression
            const r1 = Math.max(3, Math.floor(studyWindow * 0.15));
            const r2 = Math.max(7, Math.floor(studyWindow * 0.35));
            const r3 = Math.max(10, Math.floor(studyWindow * 0.4));
            intervals = [r1, r2, r3];
        }
    }

    // 3. Occupancy Check
    const busyDates = getBusyDates(existingTopics, currentTopicId);
    
    // 4. Generate Dates
    const schedule: Review[] = [];
    
    // R0 (Always on Study Date, fixed)
    schedule.push({ 
        type: 'R0', 
        date: studyDate, 
        label: 'R0: Fixação', 
        done: false, 
        correct: 0, 
        total: 0, 
        difficulty: null, 
        targetQ: impObj.baseQ 
    });
    
    // R1
    let r1Ideal = addDays(studyDate, intervals[0]);
    let r1Actual = findNextEmptyDate(r1Ideal, busyDates);
    busyDates.add(r1Actual);
    schedule.push({
        type: 'R1',
        date: r1Actual,
        label: 'R1: Pico',
        done: false, correct: 0, total: 0, difficulty: null,
        targetQ: calculateNextLoad(importanceId, 'medium', 'R1', null)
    });

    // R2
    let r2Ideal = addDays(r1Actual, intervals[1]);
    let r2Actual = findNextEmptyDate(r2Ideal, busyDates);
    busyDates.add(r2Actual);
    schedule.push({
        type: 'R2',
        date: r2Actual,
        label: 'R2: Manutenção',
        done: false, correct: 0, total: 0, difficulty: null,
        targetQ: calculateNextLoad(importanceId, 'medium', 'R2', null)
    });

    // R3
    let r3Ideal = addDays(r2Actual, intervals[2]);
    let r3Actual = findNextEmptyDate(r3Ideal, busyDates);
    busyDates.add(r3Actual);
    schedule.push({
        type: 'R3',
        date: r3Actual,
        label: 'R3: Longo Prazo',
        done: false, correct: 0, total: 0, difficulty: null,
        targetQ: calculateNextLoad(importanceId, 'medium', 'R3', null)
    });

    // 5. R_FINAL (The week before exam)
    if (daysUntilExam > 7) {
        // Ideal window: [Exam-7, Exam-2]
        const finalStart = addDays(effectiveExamDate, -7);
        const finalEnd = addDays(effectiveExamDate, -2);
        
        let finalIdeal = finalStart;
        let finalActual = finalStart;
        let found = false;
        
        // Find a slot in the final week
        for (let d = 0; d < 5; d++) {
            const check = addDays(finalStart, d);
            if (!busyDates.has(check)) {
                finalActual = check;
                found = true;
                break;
            }
        }
        
        // If final week is totally full, just pick the first day of final week (overlap is inevitable in revision week)
        if (!found) finalActual = finalStart;

        // Ensure R_Final is after R3
        if (finalActual <= r3Actual) {
            finalActual = addDays(r3Actual, 2);
        }

        if (finalActual < effectiveExamDate) {
             schedule.push({
                type: 'R_FINAL',
                date: finalActual,
                label: 'Revisão Final',
                done: false, correct: 0, total: 0, difficulty: null,
                targetQ: impObj.baseQ * 1.5 // Higher volume for final review
            });
        }
    }

    return schedule;
};

// Keeping for legacy compatibility but not using
export const generateSchedule = (date: string, importanceId: ImportanceType): Review[] => {
    return generateSmartSchedule(date, undefined, importanceId, []);
};

export const getStreak = (topics: Topic[], simulados: Simulado[]) => {
    const activityMap = new Set<string>();
    
    topics.forEach(t => {
        if(t.deleted) return;
        t.reviews.forEach(r => {
            if(r.done) activityMap.add(r.date);
        });
    });
    
    simulados.forEach(s => {
        activityMap.add(s.dateTaken.split('T')[0]);
    });

    let currentStreak = 0;
    const today = new Date();
    let d = new Date(today);
    const todayStr = d.toISOString().split('T')[0];
    
    if (!activityMap.has(todayStr)) d.setDate(d.getDate() - 1);
    
    for(let i=0; i<365; i++) {
        const dateStr = d.toISOString().split('T')[0];
        if (activityMap.has(dateStr)) {
            currentStreak++;
            d.setDate(d.getDate() - 1);
        } else {
            break;
        }
    }
    return currentStreak;
};

// --- XP & Leveling Logic ---
export const getLevelInfo = (totalQuestions: number) => {
    const XP_PER_Q = 10;
    const totalXP = totalQuestions * XP_PER_Q;
    const CONSTANT = 225;
    const level = Math.floor(Math.sqrt(totalXP / CONSTANT)) || 1;
    
    const currentLevelBaseXP = (level * level) * CONSTANT;
    const nextLevelXP = ((level + 1) * (level + 1)) * CONSTANT;
    
    const progress = Math.min(100, Math.max(0, ((totalXP - currentLevelBaseXP) / (nextLevelXP - currentLevelBaseXP)) * 100));
    
    return { level, currentXP: totalXP, nextLevelXP, progress };
};

export const triggerConfetti = () => { 
    if (window.confetti) window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#3b82f6', '#10b981', '#8b5cf6'] }); 
};

// --- ROBUST OPTIMIZATION ALGORITHM (RESPEC SYSTEM) ---

export interface OptimizationChange {
    title: string;
    label: string;
    from: string;
    to: string;
}

export const optimizeSchedule = (topics: Topic[]): { topics: Topic[], changes: OptimizationChange[] } => {
    const newTopics: Topic[] = JSON.parse(JSON.stringify(topics));
    const changes: OptimizationChange[] = [];
    const todayStr = getTodayStr();
    const MAX_QUESTIONS_PER_DAY = 120;
    const ONE_DAY_MS = 86400000;

    const dailyLoad = new Map<string, number>();

    newTopics.forEach(t => {
        if(t.deleted) return;
        t.reviews.forEach(r => {
            if (r.done) {
                const current = dailyLoad.get(r.date) || 0;
                dailyLoad.set(r.date, current + r.total);
            }
        });
    });

    type PendingItem = {
        topicId: string;
        reviewIdx: number;
        originalDate: string;
        targetQ: number;
        priorityScore: number;
    };

    const pendingItems: PendingItem[] = [];

    newTopics.forEach(t => {
        if(t.deleted) return;
        t.reviews.forEach((r, idx) => {
            if (!r.done) {
                let score = 0;
                if (r.date < todayStr) score += 2000;
                else if (r.date === todayStr) score += 1000;
                if (t.importance === 'high') score += 500;
                if (r.type === 'R0') score += 100;
                if (r.type === 'R1') score += 80;

                pendingItems.push({
                    topicId: t.id,
                    reviewIdx: idx,
                    originalDate: r.date,
                    targetQ: r.targetQ || 20,
                    priorityScore: score
                });
            }
        });
    });

    pendingItems.sort((a, b) => {
        if (b.priorityScore !== a.priorityScore) return b.priorityScore - a.priorityScore;
        return a.originalDate.localeCompare(b.originalDate);
    });

    pendingItems.forEach(item => {
        const topic = newTopics.find(t => t.id === item.topicId)!;
        const review = topic.reviews[item.reviewIdx];
        
        let searchDate = new Date(todayStr + 'T12:00:00');
        
        if (item.originalDate > todayStr) {
            searchDate = new Date(item.originalDate + 'T12:00:00');
        }

        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 365) {
            const dStr = searchDate.toISOString().split('T')[0];
            const currentLoad = dailyLoad.get(dStr) || 0;

            if (currentLoad + item.targetQ <= MAX_QUESTIONS_PER_DAY) {
                dailyLoad.set(dStr, currentLoad + item.targetQ);
                
                if (dStr !== review.date) {
                    const oldDate = review.date;
                    review.date = dStr;

                    if (oldDate !== dStr) {
                         changes.push({
                             title: topic.title,
                             label: review.label.split(':')[0],
                             from: oldDate,
                             to: dStr
                         });
                    }

                    const oldDateObj = new Date(oldDate + 'T12:00:00');
                    const newDateObj = new Date(dStr + 'T12:00:00');
                    const diffTime = newDateObj.getTime() - oldDateObj.getTime();
                    const diffDays = Math.round(diffTime / ONE_DAY_MS);

                    for (let i = item.reviewIdx + 1; i < topic.reviews.length; i++) {
                        const nextRev = topic.reviews[i];
                        if (!nextRev.done) {
                            const nextCurrent = new Date(nextRev.date + 'T12:00:00');
                            nextCurrent.setDate(nextCurrent.getDate() + diffDays);
                            const nextNewStr = nextCurrent.toISOString().split('T')[0];
                            nextRev.date = nextNewStr;
                        }
                    }
                    topic.updatedAt = Date.now();
                }
                placed = true;
            } else {
                searchDate.setDate(searchDate.getDate() + 1);
                attempts++;
            }
        }
    });

    return { topics: newTopics, changes };
};

export const mergeItems = (local: any[], cloud: any[]) => {
    const map = new Map();
    local.forEach(i => map.set(i.id, i));
    cloud.forEach(c => {
        const l = map.get(c.id);
        if (!l || (c.updatedAt || 0) > (l.updatedAt || 0)) {
            map.set(c.id, c);
        }
    });
    return Array.from(map.values());
};

export const getAreaTheme = (areaId: AreaType) => {
  switch (areaId) {
    case 'clinica': return { bg: 'bg-blue-100 dark:bg-blue-500/10', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-500/20', activeBorder: 'border-blue-500', iconBg: 'bg-blue-500', chartFill: '#3b82f6' };
    case 'cirurgia': return { bg: 'bg-red-100 dark:bg-red-500/10', text: 'text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-500/20', activeBorder: 'border-red-500', iconBg: 'bg-red-500', chartFill: '#ef4444' };
    case 'pediatria': return { bg: 'bg-amber-100 dark:bg-amber-500/10', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-500/20', activeBorder: 'border-amber-500', iconBg: 'bg-amber-500', chartFill: '#f59e0b' };
    case 'go': return { bg: 'bg-purple-100 dark:bg-purple-500/10', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-500/20', activeBorder: 'border-purple-500', iconBg: 'bg-purple-500', chartFill: '#a855f7' };
    case 'preventiva': return { bg: 'bg-emerald-100 dark:bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-500/20', activeBorder: 'border-emerald-500', iconBg: 'bg-emerald-500', chartFill: '#10b981' };
    default: return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', activeBorder: 'border-slate-500', iconBg: 'bg-slate-500', chartFill: '#64748b' };
  }
};
