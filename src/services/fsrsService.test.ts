import { describe, expect, it } from 'vitest';
import { scheduleTopic, withNextFSRSReview, localDate } from './fsrsService';
import type { Topic, Review, UserConfig } from '../types';

const config: UserConfig = { examDate: '', targetAccuracy: 80, useFSRS: true };
const review = (date: string, correct = 8, difficulty: Review['difficulty'] = 'medium'): Review => ({ type: 'R0', label: 'Estudo', date, completedAt: `${date}T12:00:00`, done: true, correct, total: 10, difficulty, targetQ: 20 });
const topic = (reviews: Review[]): Topic => ({ id: 't', title: 'Álgebra', area: 'exatas', subarea: '', importance: 'medium', studyDate: '2026-01-01', reviews, updatedAt: 1 });

describe('FSRS long-term scheduling', () => {
  it('replaces legacy pending reviews with exactly one adaptive review', () => {
    const pending = { ...review('2026-01-02'), done: false };
    const result = withNextFSRSReview(topic([review('2026-01-01'), pending, pending]), config, 25, new Date('2026-01-01T13:00:00'));
    expect(result.reviews.filter(r => !r.done)).toHaveLength(1);
    expect(result.reviews.filter(r => r.done)).toHaveLength(1);
    expect(result.reviews[1].targetQ).toBe(25);
    expect(result.fsrsCard?.reps).toBe(1);
  });
  it('schedules a lapse earlier than successful recall', () => {
    const now = new Date('2026-01-01T13:00:00');
    expect(scheduleTopic(topic([review('2026-01-01', 0)]), config, now).date < scheduleTopic(topic([review('2026-01-01', 10, 'easy')]), config, now).date).toBe(true);
  });
  it('honors higher retention and the maximum interval', () => {
    const history = [review('2026-01-01', 10, 'easy'), review('2026-02-01', 10, 'easy')];
    const now = new Date('2026-02-01T13:00:00');
    const lower = scheduleTopic(topic(history), { ...config, fsrsRetention: 0.8 }, now);
    const higher = scheduleTopic(topic(history), { ...config, fsrsRetention: 0.97 }, now);
    expect(higher.date <= lower.date).toBe(true);
    expect(Number(scheduleTopic(topic(history), { ...config, fsrsMaximumInterval: 7 }, now).card.scheduled_days)).toBeLessThanOrEqual(7);
  });
  it('keeps scheduling over a two-year study cycle', () => {
    let date = new Date('2026-01-01T13:00:00');
    let current = topic([]);
    let count = 0;
    while (date < new Date('2028-01-01T00:00:00') && count < 500) {
      current.reviews = [...current.reviews.filter(r => r.done), review(localDate(date), count % 5 === 0 ? 4 : 9)];
      current = withNextFSRSReview(current, config, 20, date);
      const due = current.reviews.find(r => !r.done)!;
      const next = new Date(due.date + 'T13:00:00');
      expect(next.getTime()).toBeGreaterThan(date.getTime());
      date = next; count++;
    }
    expect(date.getFullYear()).toBeGreaterThanOrEqual(2028);
    expect(count).toBeLessThan(500);
    expect(Number(current.fsrsCard?.reps)).toBe(count);
  });
  it('uses local calendar dates at midnight boundaries', () => {
    const d = new Date(2026, 9, 21, 23, 59);
    expect(localDate(d)).toBe('2026-10-21');
  });
});
