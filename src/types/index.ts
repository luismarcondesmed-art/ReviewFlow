
export type AreaType = 'clinica' | 'cirurgia' | 'pediatria' | 'go' | 'preventiva';
export type ImportanceType = 'extreme' | 'high' | 'medium' | 'low' | 'optional';
export type ReviewType = 'R0' | 'R1' | 'R2' | 'R3' | 'R4' | 'R5' | 'R_FINAL' | 'extra';
export type TopicStatus = 'backlog' | 'studying' | 'reviewing' | 'mastered';

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
  hasDifficultLesson?: boolean; // Added for gamification/difficulty
  notionLink?: string; // Link to Notion page
  source?: string; // e.g. "BLOCO 1 - Medcof"
  tags?: string[]; // e.g. ["hematologia", "ginecologia geral"]

  status?: TopicStatus; // Kanban status

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
  difficultyLessons?: string[]; // Names of difficult lessons
  deleted?: boolean;
  deletedAt?: any; // Firestore Timestamp ou null antes da sync
  updatedAt: number;
}

export interface UserStats {
  xp: number;
  streak: number;
  lastStudyDate: string; // YYYY-MM-DD
  badges: string[];
}

export interface WeeklyGoal {
  id: string;
  weekStartDate: string; // YYYY-MM-DD (Monday)
  type: 'questions' | 'topics';
  target: number;
  current: number;
}

export interface UserConfig {
  examDate: string; // YYYY-MM-DD
  targetAccuracy: number; // 0-100
  autoOptimize?: boolean; // FSRS-based dynamic optimization
  dailyQuestionLimit?: number; // Caps the daily volume
  isPremium?: boolean; // True controls access to premium features (auto-optimization)
  lastAutoOptimization?: string; // YYYY-MM-DD
  activeSchedule?: 'MEDCOF' | 'ESTRATEGIA' | 'MEDREVIEW'; // Added preference
  useFSRS?: boolean; // Toggle for Spaced Repetition System
  bonusXP?: number; // Gamification bonus XP
  stats?: UserStats; // Gamification stats
  weeklyGoals?: WeeklyGoal[]; // Weekly goals
  notifications?: {
    enabled: boolean;
    time: string; // HH:mm format
    showModules: boolean;
    showQuestionCount: boolean;
    showNextTasks: boolean;
  };
<<<<<<< HEAD
  studyLink?: string; // Custom link to the platform where the user studies
  customReviewIntervals?: number[]; // Global default custom intervals in days (e.g. [1, 7, 30])
=======
>>>>>>> f71e79ffd4dd38d111ba5f8a2e672154ded765f5
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
