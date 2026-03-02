
export type AreaType = 'clinica' | 'cirurgia' | 'pediatria' | 'go' | 'preventiva';
export type ImportanceType = 'high' | 'medium' | 'low';
export type ReviewType = 'R0' | 'R1' | 'R2' | 'R3' | 'R4' | 'R5' | 'R_FINAL' | 'extra';

declare global {
  interface Window {
    confetti: any;
  }
}

export interface Review {
  type: ReviewType;
  date: string; // ISO date string YYYY-MM-DD (Scheduled Date)
  label: string;
  done: boolean;
  correct: number;
  total: number;
  difficulty?: 'easy' | 'medium' | 'hard' | null;
  targetQ: number;
  completedAt?: string; // ISO Full Timestamp (When it was actually done)
  timeSpent?: number; // Time spent in seconds
}

export interface Topic {
  id: string;
  title: string;
  area: AreaType;
  subarea: string;
  importance: ImportanceType;
  materialLink?: string;
  studyDate: string;
  reviews: Review[];
  
  // New: Linked Lessons from Schedule
  linkedLessons?: string[]; 
  notionLink?: string; // Link to Notion page
  source?: string; // e.g. "BLOCO 1 - Medcof"

  deleted?: boolean;
  deletedAt?: any; // Firestore Timestamp ou null antes da sync
  updatedAt: number;
  customSettings?: {
      intervals: number[]; // Array of days, e.g. [1, 7, 30]
      baseQuestions: number;
  };
}

export interface Simulado {
  id: string;
  name: string;
  year: string;
  totalQuestions: number;
  correctCount: number;
  dateTaken: string; // Full ISO string
  difficultyTopics: string[]; // IDs of topics
  deleted?: boolean;
  deletedAt?: any; // Firestore Timestamp ou null antes da sync
  updatedAt: number;
}

export interface UserConfig {
  examDate: string; // YYYY-MM-DD
  targetAccuracy: number; // 0-100
  activeSchedule?: 'MEDCOF' | 'ESTRATEGIA'; // Added preference
  notifications?: {
    enabled: boolean;
    time: string; // HH:mm format
    showModules: boolean;
    showQuestionCount: boolean;
    showNextTasks: boolean;
  };
}

export interface ScheduleItem {
  id: string; // Generated ID
  bloco: string; // Represents Block or Week
  grandeArea: string;
  disciplina: string;
  aula: string; // Represents the Topic/Subject
  professor?: string; // Optional
  importancia?: 'Azul' | 'Verde' | 'Amarelo' | 'Vermelho' | 'Roxo' | string; // Optional
}

export interface ScheduleProgress {
    [itemId: string]: boolean; // ID -> isCompleted
}
