
export type AreaType = 'clinica' | 'cirurgia' | 'pediatria' | 'go' | 'preventiva';
export type ImportanceType = 'high' | 'medium' | 'low';
export type ReviewType = 'R0' | 'R1' | 'R2' | 'R3' | 'R_FINAL' | 'extra';

declare global {
  interface Window {
    confetti: any;
  }
}

export interface Review {
  type: ReviewType;
  date: string; // ISO date string YYYY-MM-DD
  label: string;
  done: boolean;
  correct: number;
  total: number;
  difficulty?: 'easy' | 'medium' | 'hard' | null;
  targetQ: number;
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
  deleted: boolean;
  updatedAt: number;
}

export interface Simulado {
  id: string;
  name: string;
  year: string;
  totalQuestions: number;
  correctCount: number;
  dateTaken: string; // Full ISO string
  difficultyTopics: string[]; // IDs of topics
  updatedAt: number;
}

export interface UserConfig {
  examDate: string; // YYYY-MM-DD
  targetAccuracy: number; // 0-100
}
