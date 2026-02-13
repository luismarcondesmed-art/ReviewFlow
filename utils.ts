import { AreaType, ImportanceType, Review, Topic, Simulado, ReviewType, FSRSState } from './types';

// --- Constants ---

export const APP_ID = 'reviewflow';

// Configuração segura usando Variáveis de Ambiente
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

// --- FSRS Core Logic (Simplified v4) ---
const FSRS_PARAMS = {
    request_retention: 0.9, // Target retention (90%)
    maximum_interval: 365,
    w: [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61]
};

// Calculate Memory Stability & Difficulty
export const calculateFSRS = (
    currentFSRS: FSRSState | undefined, 
    rating: 'easy'|'medium'|'hard', 
    accuracy: number, // 0.0 to 1.0
    elapsedDays: number
): FSRSState => {
    // 1. Convert Inputs to FSRS Rating (1=Again/Fail, 2=Hard, 3=Good, 4=Easy)
    // We map app difficulty & accuracy to 1-4 scale
    let performanceRating = 3; // Default Good
    if (accuracy < 0.6) performanceRating = 1; // Again (Fail)
    else if (rating === 'hard') performanceRating = 2; // Hard
    else if (rating === 'easy') performanceRating = 4; // Easy
    // Medium stays 3

    // 2. Initialize if new
    if (!currentFSRS) {
        // Initial Stability (S0) based on first rating
        // S0 = w[r-1]
        const initialS = FSRS_PARAMS.w[performanceRating - 1]; 
        return {
            stability: initialS,
            difficulty: 5, // Neutral start
            lastReview: getTodayStr(),
            retrievability: 1
        };
    }

    // 3. Update Difficulty (D)
    // D_new = D_old + w[4] * (Rating - 3) + w[5] * (1 - Accuracy) -> simplified adaptation
    // We constrain D between 1 and 10
    let nextD = currentFSRS.difficulty - FSRS_PARAMS.w[4] * (performanceRating - 3);
    // Linear damping
    nextD = Math.max(1, Math.min(10, nextD)); 
    // Mean reversion
    nextD = FSRS_PARAMS.w[5] * 5 + (1 - FSRS_PARAMS.w[5]) * nextD;

    // 4. Update Stability (S)
    let nextS = currentFSRS.stability;
    
    if (performanceRating === 1) {
        // Forgetting Curve reset (simplified)
        nextS = FSRS_PARAMS.w[11] * Math.pow(currentFSRS.difficulty, -FSRS_PARAMS.w[12]) * (Math.pow(currentFSRS.stability + 1, FSRS_PARAMS.w[13]) - 1) * Math.exp(FSRS_PARAMS.w[14] * (1 - currentFSRS.retrievability || 1));
        // Fallback for fail: usually low S
        nextS = Math.min(nextS, 2); 
    } else {
        // Success Curve
        // S_new = S_old * (1 + factor)
        // Factor depends on D, S, R
        const r = currentFSRS.retrievability || 0.9;
        const hardPenalty = FSRS_PARAMS.w[15]; 
        const easyBonus = FSRS_PARAMS.w[16];
        
        let factor = Math.exp(FSRS_PARAMS.w[8]) * 
                     (11 - currentFSRS.difficulty) * 
                     Math.pow(currentFSRS.stability, -FSRS_PARAMS.w[9]) * 
                     (Math.exp((1 - r) * FSRS_PARAMS.w[10]) - 1);
        
        if (performanceRating === 2) factor *= hardPenalty;
        if (performanceRating === 4) factor *= easyBonus;
        
        nextS = currentFSRS.stability * (1 + factor);
    }

    // Cap S
    nextS = Math.min(nextS, FSRS_PARAMS.maximum_interval);

    return {
        stability: parseFloat(nextS.toFixed(2)),
        difficulty: parseFloat(nextD.toFixed(2)),
        lastReview: getTodayStr(),
        retrievability: 1 // Just reviewed
    };
};

// Calculate current probability of recall
export const getRetrievability = (stability: number, daysElapsed: number): number => {
    // R = (1 + factor * t / S) ^ -1  -- standard FSRS/Ebisu decay
    // Or simplified exponential: R = 0.9 ^ (t / S)
    if (stability === 0) return 0;
    return Math.pow(0.9, daysElapsed / stability);
};

// Calculate next ideal interval (Days until R < 0.9)
export const getNextInterval = (stability: number): number => {
    // If R = 0.9^(t/S) -> t = S * log0.9(R_target)
    // Since S is defined as time to 90%, interval = S
    return Math.round(stability); 
};

// --- Logic ---

export const getTodayStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

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

// Updated to consider FSRS difficulty if available
export const calculateNextLoad = (importanceId: ImportanceType, diffId: string | null, stage: string, acc: number | null, fsrsDifficulty?: number): number => {
  const impObj = IMPORTANCE_LEVELS.find(i => i.id === importanceId) || IMPORTANCE_LEVELS[1];
  const base = impObj.baseQ;
  
  // If FSRS difficulty exists (1-10), use it as a multiplier
  let adaptiveMultiplier = 1.0;
  if (fsrsDifficulty) {
      // Diff 1 = 0.8x, Diff 5 = 1.0x, Diff 10 = 1.5x
      adaptiveMultiplier = 0.8 + ((fsrsDifficulty - 1) / 9) * 0.7;
  }

  // Classic modifiers
  const stageFactor = stage === 'R1' ? 2.5 : stage === 'R2' ? 1.25 : 1.0;
  
  let perfFactor = 1.0;
  if (acc !== null) {
    if (acc >= 0.95) perfFactor = 0.8;
    else if (acc < 0.85) perfFactor = 1.2;
    else if (acc < 0.60) perfFactor = 1.5;
  }

  let n = Math.round(base * stageFactor * adaptiveMultiplier * perfFactor);
  return Math.max(10, Math.min(n, 120)); // Cap between 10 and 120
};

// --- NEW SMART SCHEDULING LOGIC ---

export const addDays = (dateStr: string, days: number): string => {
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
    customSettings?: { intervals: number[], baseQuestions: number }
): Review[] => {
    const impObj = IMPORTANCE_LEVELS.find(i => i.id === importanceId) || IMPORTANCE_LEVELS[1];
    const today = getTodayStr();
    
    // --- CUSTOM SCHEDULE LOGIC ---
    if (customSettings && customSettings.intervals.length > 0) {
        const schedule: Review[] = [];
        const busyDates = getBusyDates(existingTopics, currentTopicId);
        
        schedule.push({ 
            type: 'R0', 
            date: studyDate, 
            label: 'R0: Estudo', 
            done: false, correct: 0, total: 0, difficulty: null, 
            targetQ: customSettings.baseQuestions || impObj.baseQ 
        });

        customSettings.intervals.forEach((daysFromStart, index) => {
            const idealDate = addDays(studyDate, daysFromStart);
            let actualDate = findNextEmptyDate(idealDate, busyDates);
            
            if (schedule.length > 0 && actualDate <= schedule[schedule.length - 1].date) {
                actualDate = addDays(schedule[schedule.length - 1].date, 1);
                actualDate = findNextEmptyDate(actualDate, busyDates);
            }

            busyDates.add(actualDate);
            
            schedule.push({
                type: `R${index + 1}` as ReviewType,
                date: actualDate,
                label: `R${index + 1} (+${daysFromStart}d)`,
                done: false,
                correct: 0,
                total: 0,
                difficulty: null,
                targetQ: customSettings.baseQuestions || calculateNextLoad(importanceId, 'medium', `R${index+1}`, null)
            });
        });

        return schedule;
    }

    // --- STANDARD LOGIC ---
    const effectiveExamDate = examDate && examDate > today ? examDate : addDays(today, 365);
    const busyDates = getBusyDates(existingTopics, currentTopicId);
    const schedule: Review[] = [];
    
    schedule.push({ 
        type: 'R0', 
        date: studyDate, 
        label: 'R0: Fixação', 
        done: false, correct: 0, total: 0, difficulty: null, 
        targetQ: impObj.baseQ 
    });
    
    // Using classic intervals for initial generation, optimizing later with FSRS
    const gaps = [7, 21, 30]; 
    let currentDate = studyDate;

    gaps.forEach((gap, i) => {
        let ideal = addDays(currentDate, gap);
        let actual = findNextEmptyDate(ideal, busyDates);
        busyDates.add(actual);
        schedule.push({ 
            type: `R${i+1}` as ReviewType, 
            date: actual, 
            label: `R${i+1}: Revisão`, 
            done: false, correct: 0, total: 0, difficulty: null, 
            targetQ: calculateNextLoad(importanceId, 'medium', `R${i+1}`, null) 
        });
        currentDate = actual;
    });

    return schedule;
};

export interface OptimizationChange {
    title: string;
    label: string;
    from: string;
    to: string;
    reason: string;
}

// --- OPTIMIZATION ENGINE V2 (FSRS-Driven) ---
// Maximizes retention by prioritizing items with lowest Retrievability (Risk of forgetting)
export const optimizeSchedule = (topics: Topic[]): { topics: Topic[], changes: OptimizationChange[] } => {
    // Clone topics to avoid mutation
    const newTopics: Topic[] = typeof structuredClone === 'function' 
        ? structuredClone(topics) 
        : JSON.parse(JSON.stringify(topics));
        
    const changes: OptimizationChange[] = [];
    const todayStr = getTodayStr();
    const todayMs = new Date(todayStr + 'T12:00:00').getTime();
    const ONE_DAY_MS = 86400000;

    // Constraints
    const MAX_QUESTIONS_PER_DAY = 160;
    
    // State Tracking
    const dailyLoad = new Map<string, number>();

    // 1. Calculate Load from COMPLETED items (History) - Fixed
    newTopics.forEach(t => {
        if(t.deleted) return;
        t.reviews.forEach(r => {
            if (r.done) {
                const current = dailyLoad.get(r.date) || 0;
                dailyLoad.set(r.date, current + r.targetQ); // Use targetQ or actual total
            }
        });
    });

    type OptimizationItem = {
        topicId: string;
        reviewIdx: number;
        originalDate: string;
        targetQ: number;
        
        // Priority Metrics
        retrievability: number; // 0 to 1 (Risk)
        daysOverdue: number;
        importanceWeight: number; // High=3, Med=2, Low=1
        priorityScore: number; // Final sorting key
        
        isFixed: boolean; // Custom schedules shouldn't be moved aggressively
    };

    const pendingItems: OptimizationItem[] = [];

    // 2. Gather Pending Items & Calculate Priority
    newTopics.forEach(t => {
        if(t.deleted) return;
        
        const isCustom = !!t.customSettings;
        const importanceWeight = t.importance === 'high' ? 3 : t.importance === 'medium' ? 2 : 1;

        t.reviews.forEach((r, idx) => {
            if (!r.done) {
                const reviewDateMs = new Date(r.date + 'T12:00:00').getTime();
                const daysOverdue = Math.max(0, (todayMs - reviewDateMs) / ONE_DAY_MS);
                
                // Calculate Retrievability (Risk)
                let retrievability = 0.5; // Default risk
                if (t.fsrs) {
                    // Use FSRS stability
                    const daysSinceLastReview = Math.max(1, (reviewDateMs - new Date(t.fsrs.lastReview + 'T12:00:00').getTime()) / ONE_DAY_MS);
                    retrievability = getRetrievability(t.fsrs.stability, daysSinceLastReview + daysOverdue);
                } else {
                    // Estimate risk based on standard forgetting curve (approx)
                    // Older stages (R3) decay slower than R1
                    const decayFactor = r.type === 'R1' ? 3 : r.type === 'R2' ? 10 : 30;
                    const elapsed = (daysOverdue + (r.type === 'R1' ? 7 : 30)); 
                    retrievability = Math.pow(0.9, elapsed / decayFactor);
                }

                // Priority Score Formula:
                // High Overdue + High Importance + Low Retrievability (High Risk) -> High Score
                const priorityScore = (daysOverdue * 10) + (importanceWeight * 5) + ((1 - retrievability) * 100);

                pendingItems.push({
                    topicId: t.id,
                    reviewIdx: idx,
                    originalDate: r.date,
                    targetQ: r.targetQ || 20,
                    retrievability,
                    daysOverdue,
                    importanceWeight,
                    priorityScore,
                    isFixed: isCustom
                });
            }
        });
    });

    // 3. Sort by Priority (Highest First)
    // We want to schedule the most urgent items first to ensure they fit in "Today"
    pendingItems.sort((a, b) => b.priorityScore - a.priorityScore);

    // 4. Scheduling Loop (Fill Buckets)
    pendingItems.forEach(item => {
        // If it's a custom fixed schedule, try to keep original date unless absolutely necessary
        let searchDateMs = item.isFixed 
            ? new Date(item.originalDate + 'T12:00:00').getTime() 
            : Math.max(todayMs, new Date(item.originalDate + 'T12:00:00').getTime()); // Don't schedule in past
        
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 365) {
            const searchDate = new Date(searchDateMs);
            const dStr = searchDate.toISOString().split('T')[0];
            const currentLoad = dailyLoad.get(dStr) || 0;

            // Check if day has capacity
            if (currentLoad + item.targetQ <= MAX_QUESTIONS_PER_DAY) {
                // Place it
                dailyLoad.set(dStr, currentLoad + item.targetQ);
                
                const topic = newTopics.find(t => t.id === item.topicId)!;
                const review = topic.reviews[item.reviewIdx];

                if (dStr !== review.date) {
                    const oldDate = review.date;
                    review.date = dStr;

                    // Log Change
                    if (oldDate !== dStr) {
                        changes.push({
                            title: topic.title,
                            label: review.label.split(':')[0],
                            from: oldDate,
                            to: dStr,
                            reason: item.daysOverdue > 0 ? `Risco de Esquecimento (${(item.retrievability*100).toFixed(0)}%)` : "Balanceamento de Carga"
                        });
                    }

                    // Ripple Effect: Move subsequent reviews for this topic to maintain spacing
                    const oldDateMs = new Date(oldDate + 'T12:00:00').getTime();
                    const diffDays = Math.round((searchDateMs - oldDateMs) / ONE_DAY_MS);

                    if (diffDays !== 0) {
                        for (let i = item.reviewIdx + 1; i < topic.reviews.length; i++) {
                            const nextRev = topic.reviews[i];
                            if (!nextRev.done) {
                                const currentNextDate = new Date(nextRev.date + 'T12:00:00');
                                currentNextDate.setDate(currentNextDate.getDate() + diffDays);
                                const nextStr = currentNextDate.toISOString().split('T')[0];
                                nextRev.date = nextStr;
                                
                                // Update pending item reference if it exists in queue
                                const futureItem = pendingItems.find(p => p.topicId === topic.id && p.reviewIdx === i);
                                if (futureItem) {
                                    futureItem.originalDate = nextStr; 
                                    // Note: We don't re-sort, simple ripple is usually enough
                                }
                            }
                        }
                    }
                    topic.updatedAt = Date.now();
                }
                placed = true;
            } else {
                // Day is full, move to next day
                searchDateMs += ONE_DAY_MS;
                attempts++;
            }
        }
    });

    // 5. Sort topic reviews internally to be neat
    newTopics.forEach(t => {
        t.reviews.sort((a,b) => a.date.localeCompare(b.date));
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
