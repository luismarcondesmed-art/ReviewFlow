import { createEmptyCard, fsrs, Rating, type Card } from 'ts-fsrs';
import type { Topic, UserConfig, Review } from '../types';

export function localDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// Question accuracy is a proxy for recall. Explicit difficulty refines successful recall.
export function recallRating(review: Review) {
  const accuracy = review.total > 0 ? review.correct / review.total : 0;
  if (accuracy < 0.5) return Rating.Again;
  if (accuracy < 0.7 || review.difficulty === 'hard') return Rating.Hard;
  if (accuracy >= 0.9 && review.difficulty === 'easy') return Rating.Easy;
  return Rating.Good;
}

export function scheduleTopic(topic: Topic, config: UserConfig, now = new Date()) {
  const scheduler = fsrs({
    request_retention: Math.min(0.97, Math.max(0.8, config.fsrsRetention ?? 0.9)),
    maximum_interval: Math.min(36500, Math.max(1, config.fsrsMaximumInterval ?? 730)),
    enable_fuzz: false,
    // The product schedules daily study blocks, not minute-level flashcard sessions.
    enable_short_term: false,
  });
  // Replay real completion times to migrate legacy histories and support history edits.
  const history = topic.reviews.filter(r => r.done).map(r => ({
    review: r,
    time: new Date(r.completedAt || `${r.date}T12:00:00`),
  })).filter(r => Number.isFinite(r.time.getTime()) && r.time <= now)
    .sort((a, b) => a.time.getTime() - b.time.getTime());
  let card: Card = createEmptyCard(history[0]?.time ?? now);
  for (const entry of history) {
    card = scheduler.next(card, entry.time, recallRating(entry.review)).card;
    // FSRS can order Easy after Good by extending beyond a small configured cap.
    // Enforce the product's explicit maximum as a hard bound.
    const max = Math.min(36500, Math.max(1, config.fsrsMaximumInterval ?? 730));
    if (card.scheduled_days > max) {
      card.scheduled_days = max;
      card.due = new Date(entry.time);
      card.due.setDate(card.due.getDate() + max);
    }
  }
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const due = card.due > now ? card.due : tomorrow;
  return { date: localDate(due), card: JSON.parse(JSON.stringify(card)) };
}

export function withNextFSRSReview(topic: Topic, config: UserConfig, targetQ: number, now = new Date()): Topic {
  const result = scheduleTopic(topic, config, now);
  const completed = topic.reviews.filter(r => r.done);
  return { ...topic, fsrsCard: result.card, reviews: [...completed, {
    type: 'extra', date: result.date, label: `Revisão adaptativa ${completed.length}`,
    done: false, correct: 0, total: 0, targetQ,
  }] };
}
