import { mergeItems } from '../utils';
import { stableJSON } from './syncPolicy';

export interface StudyData {
  topics: any[]; simulados: any[]; config: any;
  scheduleProgress: Record<string, boolean>; dailyNotes: Record<string, string>;
}
export function mergeDictionary(local: any = {}, remote: any = {}, base: any = {}) {
  const result = Object.create(null);
  for (const key of new Set([...Object.keys(local), ...Object.keys(remote), ...Object.keys(base)])) {
    const value = stableJSON(local[key]) !== stableJSON(base[key]) ? local[key] : remote[key];
    if (value !== undefined) result[key] = value;
  }
  return result;
}
export function mergeStudyData(local: StudyData, remote: Partial<StudyData>, base: Partial<StudyData>): StudyData {
  return {
    topics: mergeItems(local.topics, remote.topics || []),
    simulados: mergeItems(local.simulados, remote.simulados || []),
    config: mergeDictionary(local.config, remote.config || local.config, base.config || {}),
    scheduleProgress: mergeDictionary(local.scheduleProgress, remote.scheduleProgress || {}, base.scheduleProgress || {}),
    dailyNotes: mergeDictionary(local.dailyNotes, remote.dailyNotes || {}, base.dailyNotes || {}),
  };
}

export function preserveInFlightChanges(current: StudyData, merged: StudyData, snapshot: StudyData): StudyData {
  const preserve = (local: any[], remote: any[], before: any[]) => {
    const original = new Map(before.map(item => [item.id, item]));
    const result = new Map(remote.map(item => [item.id, item]));
    for (const item of local) if (JSON.stringify(item) !== JSON.stringify(original.get(item.id))) {
      result.set(item.id, { ...item, updatedAt: Math.max(item.updatedAt || 0, (result.get(item.id)?.updatedAt || 0) + 1) });
    }
    return [...result.values()];
  };
  return { ...mergeStudyData(current, merged, snapshot), topics: preserve(current.topics, merged.topics, snapshot.topics), simulados: preserve(current.simulados, merged.simulados, snapshot.simulados) };
}
