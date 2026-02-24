
import { AreaType, ImportanceType, Review, Topic, Simulado, ReviewType } from '../types';

// --- Constants ---

export const APP_ID = 'reviewflow';

// Configuração segura usando Variáveis de Ambiente
// Uses optional chaining (?.) to prevent runtime crash if import.meta.env is undefined
export const USER_FIREBASE_CONFIG = { 
    apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY, 
    authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN, 
    projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID, 
    storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET, 
    messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID, 
    appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID, 
    measurementId: (import.meta as any).env?.VITE_FIREBASE_MEASUREMENT_ID 
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

export const getPriorityInfo = (imp: ImportanceType) => {
    switch(imp) {
        case 'high': return { label: 'Alta', bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500' };
        case 'medium': return { label: 'Média', bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' };
        default: return { label: 'Baixa', bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' };
    }
};

export const getAccuracyLabel = (percentage: number) => {
    if (percentage >= 80) return 'Excelente (>80%)';
    if (percentage >= 60) return 'Bom (60-80%)';
    if (percentage > 0) return 'Atenção (<60%)';
    return 'Sem Dados';
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

export const calculateNextLoad = (importanceId: ImportanceType, diffId: string | null, stage: string, acc: number | null, overrideBaseQ?: number): number => {
  const impObj = IMPORTANCE_LEVELS.find(i => i.id === importanceId) || IMPORTANCE_LEVELS[1];
  const base = overrideBaseQ || impObj.baseQ;
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
  return Math.max(15, Math.min(n, 150)); // Increased max cap to 150 for dynamic blocks
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
    currentTopicId?: string,
    customSettings?: { intervals: number[], baseQuestions: number },
    overrideBaseQuestions?: number
): Review[] => {
    const impObj = IMPORTANCE_LEVELS.find(i => i.id === importanceId) || IMPORTANCE_LEVELS[1];
    const today = getTodayStr();
    const baseQ = overrideBaseQuestions || (customSettings ? customSettings.baseQuestions : impObj.baseQ);
    
    // --- CUSTOM SCHEDULE LOGIC ---
    if (customSettings && customSettings.intervals.length > 0) {
        const schedule: Review[] = [];
        const busyDates = getBusyDates(existingTopics, currentTopicId);
        
        // R0 is always the study date
        schedule.push({ 
            type: 'R0', 
            date: studyDate, 
            label: 'R0: Estudo', 
            done: false, correct: 0, total: 0, difficulty: null, 
            targetQ: baseQ 
        });

        let previousDate = studyDate;

        customSettings.intervals.forEach((intervalDays, index) => {
            const idealDate = addDays(previousDate, intervalDays);
            let actualDate = findNextEmptyDate(idealDate, busyDates);
            busyDates.add(actualDate);
            
            previousDate = actualDate; 

            schedule.push({
                type: `R${index + 1}` as ReviewType,
                date: actualDate,
                label: `R${index + 1}: +${intervalDays}d`,
                done: false,
                correct: 0,
                total: 0,
                difficulty: null,
                targetQ: baseQ || calculateNextLoad(importanceId, 'medium', `R${index+1}`, null, baseQ)
            });
        });

        return schedule;
    }

    // --- STANDARD AI SCHEDULE LOGIC ---
    const effectiveExamDate = examDate && examDate > today ? examDate : addDays(today, 365);
    
    const startMs = new Date(studyDate + 'T12:00:00').getTime();
    const examMs = new Date(effectiveExamDate + 'T12:00:00').getTime();
    const daysUntilExam = (examMs - startMs) / (1000 * 60 * 60 * 24);
    
    const studyWindow = Math.max(0, daysUntilExam - 7);
    
    const standardTotalDuration = 58; 

    let compressionFactor = 1.0;
    if (studyWindow < standardTotalDuration) {
        compressionFactor = Math.max(0.1, studyWindow / standardTotalDuration);
    }

    let r1Gap = Math.round(7 * compressionFactor);
    let r2Gap = Math.round(21 * compressionFactor);
    let r3Gap = Math.round(30 * compressionFactor);

    if (studyWindow < 15) {
        r1Gap = 1;
        r2Gap = 3;
        r3Gap = 5;
    } else {
        r1Gap = Math.max(2, r1Gap);
        r2Gap = Math.max(5, r2Gap);
        r3Gap = Math.max(7, r3Gap);
    }

    const busyDates = getBusyDates(existingTopics, currentTopicId);
    const schedule: Review[] = [];
    
    schedule.push({ 
        type: 'R0', 
        date: studyDate, 
        label: 'R0: Fixação', 
        done: false, correct: 0, total: 0, difficulty: null, 
        targetQ: baseQ 
    });
    
    let r1Ideal = addDays(studyDate, r1Gap);
    let r1Actual = findNextEmptyDate(r1Ideal, busyDates);
    busyDates.add(r1Actual);
    schedule.push({ type: 'R1', date: r1Actual, label: 'R1: Pico', done: false, correct: 0, total: 0, difficulty: null, targetQ: calculateNextLoad(importanceId, 'medium', 'R1', null, baseQ) });

    let r2Ideal = addDays(r1Actual, r2Gap);
    let r2Actual = findNextEmptyDate(r2Ideal, busyDates);
    busyDates.add(r2Actual);
    schedule.push({ type: 'R2', date: r2Actual, label: 'R2: Manutenção', done: false, correct: 0, total: 0, difficulty: null, targetQ: calculateNextLoad(importanceId, 'medium', 'R2', null, baseQ) });

    let r3Ideal = addDays(r2Actual, r3Gap);
    let r3Actual = findNextEmptyDate(r3Ideal, busyDates);
    busyDates.add(r3Actual);
    schedule.push({ type: 'R3', date: r3Actual, label: 'R3: Longo Prazo', done: false, correct: 0, total: 0, difficulty: null, targetQ: calculateNextLoad(importanceId, 'medium', 'R3', null, baseQ) });

    if (daysUntilExam > 7) {
        const finalStart = addDays(effectiveExamDate, -7);
        let finalActual = finalStart;
        let found = false;
        
        for (let d = 0; d < 5; d++) {
            const check = addDays(finalStart, d);
            if (!busyDates.has(check)) {
                finalActual = check;
                found = true;
                break;
            }
        }
        if (!found) finalActual = finalStart;

        if (finalActual <= r3Actual) {
            finalActual = addDays(r3Actual, 2);
        }

        if (finalActual <= effectiveExamDate) {
             schedule.push({ type: 'R_FINAL', date: finalActual, label: 'Revisão Final', done: false, correct: 0, total: 0, difficulty: null, targetQ: Math.round(baseQ * 1.5) });
        }
    }

    return schedule;
};

export const generateSchedule = (date: string, importanceId: ImportanceType): Review[] => {
    return generateSmartSchedule(date, undefined, importanceId, []);
};

export const getStreak = (topics: Topic[], simulados: Simulado[]) => {
    const activityMap = new Set<string>();
    topics.forEach(t => {
        if(t.deleted) return;
        t.reviews.forEach(r => { if(r.done) activityMap.add(r.date); });
    });
    simulados.forEach(s => { activityMap.add(s.dateTaken.split('T')[0]); });

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

export const calculateDetailedStats = (topics: Topic[], simulados: Simulado[]) => {
    const today = new Date();
    const todayStr = getTodayStr();
    
    // Determine start of week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfWeekStr = startOfWeek.toISOString().split('T')[0];

    // Determine start of month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfMonthStr = startOfMonth.toISOString().split('T')[0];

    let totalToday = 0;
    let totalWeek = 0;
    let totalMonth = 0;
    let totalTime = 0;
    let totalQuestionsWithTime = 0;

    const processItem = (date: string, count: number, timeSpent?: number) => {
        if (date === todayStr) totalToday += count;
        if (date >= startOfWeekStr) totalWeek += count;
        if (date >= startOfMonthStr) totalMonth += count;

        if (timeSpent && timeSpent > 0 && count > 0) {
            totalTime += timeSpent;
            totalQuestionsWithTime += count;
        }
    };

    topics.forEach(t => {
        if (t.deleted) return;
        t.reviews.forEach(r => {
            if (r.done) processItem(r.date, r.total, r.timeSpent);
        });
    });

    simulados.forEach(s => {
        if (s.deleted) return;
        const d = s.dateTaken.split('T')[0];
        processItem(d, s.totalQuestions);
    });

    // Calculate averages
    const dayOfWeek = today.getDay() + 1; // 1-based index for math
    const avgWeek = Math.round(totalWeek / dayOfWeek);

    const dayOfMonth = today.getDate();
    const avgMonth = Math.round(totalMonth / dayOfMonth);

    const avgTimePerQuestion = totalQuestionsWithTime > 0 ? Math.round(totalTime / totalQuestionsWithTime) : null;

    return {
        totalToday,
        totalWeek,
        totalMonth,
        avgWeek,
        avgMonth,
        avgTimePerQuestion
    };
};

export interface OptimizationChange {
    title: string;
    label: string;
    from: string;
    to: string;
    reason: string;
}

export const optimizeSchedule = (topics: Topic[]): { topics: Topic[], changes: OptimizationChange[] } => {
    const newTopics: Topic[] = JSON.parse(JSON.stringify(topics));
    const changes: OptimizationChange[] = [];
    const todayStr = getTodayStr();
    const todayDate = new Date(todayStr + 'T12:00:00');
    const ONE_DAY_MS = 86400000;

    const MAX_QUESTIONS_PER_DAY = 150;
    const MAX_HIGH_R1_PER_DAY = 1;
    const MAX_REVIEWS_PER_TOPIC_PER_DAY = 2;

    const dailyLoad = new Map<string, { totalQ: number, highR1: number }>();
    const dailyTopicCounts = new Map<string, Map<string, number>>(); 

    const canFit = (date: string, q: number, isHighR1: boolean, topicId: string): boolean => {
        const current = dailyLoad.get(date) || { totalQ: 0, highR1: 0 };
        if (current.totalQ + q > MAX_QUESTIONS_PER_DAY) return false;
        if (isHighR1 && current.highR1 >= MAX_HIGH_R1_PER_DAY) return false;
        
        const topicCounts = dailyTopicCounts.get(date) || new Map();
        const currentTopicCount = topicCounts.get(topicId) || 0;
        if (currentTopicCount >= MAX_REVIEWS_PER_TOPIC_PER_DAY) return false;

        return true;
    };

    const addLoad = (date: string, q: number, isHighR1: boolean, topicId: string) => {
        const current = dailyLoad.get(date) || { totalQ: 0, highR1: 0 };
        dailyLoad.set(date, { totalQ: current.totalQ + q, highR1: current.highR1 + (isHighR1 ? 1 : 0) });
        
        const topicCounts = dailyTopicCounts.get(date) || new Map();
        const currentTopicCount = topicCounts.get(topicId) || 0;
        topicCounts.set(topicId, currentTopicCount + 1);
        dailyTopicCounts.set(date, topicCounts);
    };

    type PendingItem = {
        topicId: string;
        reviewIdx: number;
        originalDate: string;
        targetQ: number;
        score: number;
        isHighR1: boolean;
    };

    const pendingItems: PendingItem[] = [];

    newTopics.forEach(t => {
        if(t.deleted) return;
        t.reviews.forEach((r, idx) => {
            if (!r.done) {
                let score = 0;
                if (r.date < todayStr) {
                    const daysOverdue = Math.floor((todayDate.getTime() - new Date(r.date + 'T12:00:00').getTime()) / ONE_DAY_MS);
                    score += daysOverdue * 10;
                }
                if (t.importance === 'high') score += 100;
                else if (t.importance === 'medium') score += 50;
                else score += 10;
                if (r.type === 'R0') score += 200;
                if (r.type === 'R1') score += 150;

                const isHighR1 = t.importance === 'high' && r.type === 'R1';

                pendingItems.push({
                    topicId: t.id,
                    reviewIdx: idx,
                    originalDate: r.date,
                    targetQ: r.targetQ || 20,
                    score: score,
                    isHighR1
                });
            }
        });
    });

    pendingItems.sort((a, b) => b.score - a.score);

    pendingItems.forEach(item => {
        const topic = newTopics.find(t => t.id === item.topicId)!;
        const review = topic.reviews[item.reviewIdx];

        let searchDate = new Date(item.originalDate > todayStr ? item.originalDate : todayStr);
        if (item.originalDate > todayStr) {
             searchDate = new Date(searchDate.toISOString().split('T')[0] + 'T12:00:00');
        } else {
             searchDate = new Date(todayStr + 'T12:00:00');
        }

        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 365) {
            const dStr = searchDate.toISOString().split('T')[0];
            
            if (canFit(dStr, item.targetQ, item.isHighR1, item.topicId)) {
                addLoad(dStr, item.targetQ, item.isHighR1, item.topicId);
                
                if (dStr !== review.date) {
                    const oldDate = review.date;
                    review.date = dStr;

                    if (oldDate !== dStr) {
                        changes.push({
                            title: topic.title,
                            label: review.label.split(':')[0],
                            from: oldDate,
                            to: dStr,
                            reason: oldDate < todayStr ? "Prioridade (Atraso)" : "Capacidade/Mix"
                        });
                    }

                    const oldDateObj = new Date(oldDate + 'T12:00:00');
                    const newDateObj = new Date(dStr + 'T12:00:00');
                    const diffTime = newDateObj.getTime() - oldDateObj.getTime();
                    const diffDays = Math.round(diffTime / ONE_DAY_MS);

                    if (diffDays !== 0) {
                        for (let i = item.reviewIdx + 1; i < topic.reviews.length; i++) {
                            const nextRev = topic.reviews[i];
                            if (!nextRev.done) {
                                const currentNextDate = new Date(nextRev.date + 'T12:00:00');
                                currentNextDate.setDate(currentNextDate.getDate() + diffDays);
                                const nextStr = currentNextDate.toISOString().split('T')[0];
                                nextRev.date = nextStr;
                                const futureItem = pendingItems.find(p => p.topicId === topic.id && p.reviewIdx === i);
                                if (futureItem) futureItem.originalDate = nextStr;
                            }
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

    newTopics.sort((a, b) => {
        const nextA = a.reviews.find(r => !r.done)?.date || '9999-99-99';
        const nextB = b.reviews.find(r => !r.done)?.date || '9999-99-99';
        return nextA.localeCompare(nextB);
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
