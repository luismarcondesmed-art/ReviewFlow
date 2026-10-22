import type { Topic, Simulado, UserConfig, ScheduleProgress } from '../types';
export interface BackupData { topics: Topic[]; simulados?: Simulado[]; config?: UserConfig; scheduleProgress?: ScheduleProgress; dailyNotes?: Record<string, string> }
const object = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
export function validateBackup(value: unknown): asserts value is BackupData {
  if (!object(value) || !Array.isArray(value.topics)) throw new Error('O arquivo precisa conter uma lista de matérias.');
  const counts = (correct: unknown, total: unknown) => Number.isInteger(total) && Number(total) >= 0 && Number.isInteger(correct) && Number(correct) >= 0 && Number(correct) <= Number(total);
  for (const topic of value.topics) {
    if (!object(topic) || typeof topic.id !== 'string' || typeof topic.title !== 'string' || typeof topic.studyDate !== 'string' || !Array.isArray(topic.reviews)) throw new Error('Uma matéria está incompleta.');
    for (const review of topic.reviews) if (!object(review) || typeof review.date !== 'string' || typeof review.label !== 'string' || !counts(review.correct, review.total)) throw new Error('Há uma revisão com data, descrição ou acertos inválidos.');
  }
  if (value.simulados !== undefined && (!Array.isArray(value.simulados) || !value.simulados.every(exam => object(exam) && typeof exam.id === 'string' && typeof exam.name === 'string' && typeof exam.year === 'string' && typeof exam.dateTaken === 'string' && Number.isFinite(new Date(exam.dateTaken).getTime()) && counts(exam.correctCount, exam.totalQuestions)))) throw new Error('Há um simulado inválido.');
  if (value.config !== undefined && (!object(value.config) || typeof value.config.examDate !== 'string' || typeof value.config.targetAccuracy !== 'number' || value.config.targetAccuracy < 0 || value.config.targetAccuracy > 100)) throw new Error('As configurações são inválidas.');
  if (value.dailyNotes !== undefined && (!object(value.dailyNotes) || !Object.values(value.dailyNotes).every(note => typeof note === 'string'))) throw new Error('As tarefas precisam conter textos válidos.');
  if (value.scheduleProgress !== undefined && (!object(value.scheduleProgress) || !Object.values(value.scheduleProgress).every(done => typeof done === 'boolean'))) throw new Error('O progresso do cronograma é inválido.');
}
