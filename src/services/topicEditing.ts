import type { Topic, UserConfig, Simulado } from '../types';
import { calculateNextLoad, generateSmartSchedule } from '../utils';
import { withNextFSRSReview } from './fsrsService';

export function updateTopicSchedule(old: Topic | undefined, updated: Topic, config: UserConfig, topics: Topic[]): Topic {
  const history = old?.reviews.filter(r => r.done) || [];
  const baseQ = old?.reviews[0]?.targetQ || 25;
  const settings = updated.customSettings || (config.customReviewIntervals?.length ? { intervals: config.customReviewIntervals, baseQuestions: baseQ } : undefined);
  const scheduleChanged = old && (old.studyDate !== updated.studyDate || JSON.stringify(old.customSettings) !== JSON.stringify(updated.customSettings));
  const priorityChanged = old && old.importance !== updated.importance;
  let reviews = old?.reviews || updated.reviews;
  if (scheduleChanged) {
    const scheduled = generateSmartSchedule(updated.studyDate, config.examDate, updated.importance, topics, updated.id, settings);
    reviews = [...history, ...scheduled.filter(r => !history.some(done => done.type === r.type))];
  } else if (priorityChanged) {
    reviews = reviews.map(r => r.done ? r : { ...r, targetQ: calculateNextLoad(updated.importance, null, r.type, null, baseQ) });
  }
  const finalTopic = { ...updated, reviews, updatedAt: Date.now() };
  // Metadata edits must not postpone an overdue review or recreate its history.
  if (!config.useFSRS || (!scheduleChanged && !priorityChanged)) return finalTopic;
  return history.length ? withNextFSRSReview({ ...finalTopic, reviews: [...history, ...reviews.filter(r => !r.done)] }, config, settings?.baseQuestions || reviews.find(r => !r.done)?.targetQ || baseQ)
    : { ...finalTopic, reviews: reviews.filter(r => !r.done).slice(0, 1) };
}

export function updateDifficultyFlags(topics: Topic[], exams: Simulado[]): Topic[] {
  const difficultLessons = new Set(exams.filter(s => !s.deleted).flatMap(s => s.difficultyLessons || []));
  return topics.map(topic => {
    const difficult = !!topic.linkedLessons?.some(lesson => difficultLessons.has(lesson));
    return !!topic.hasDifficultLesson === difficult ? topic : { ...topic, hasDifficultLesson: difficult, updatedAt: Date.now() };
  });
}
