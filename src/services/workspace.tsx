import { createContext, useContext } from 'react';
import type { StudyTool, WorkspaceView } from '../components/AppShell';
import type { Topic } from '../types';

export type WorkspaceAction =
  | { type: 'navigate'; view: WorkspaceView }
  | { type: 'tool'; tool: StudyTool }
  | { type: 'assistant' | 'notion' | 'plan-topic'; topicId?: string }
  | { type: 'new-topic' | 'new-exam' | 'settings' | 'help' | 'search' | 'sync' };
export const WorkspaceActions = createContext<(action: WorkspaceAction) => void>(() => {});
export const useWorkspaceActions = () => useContext(WorkspaceActions);
export const WORKSPACE_VIEWS: WorkspaceView[] = ['list', 'cronograma', 'calendar', 'database', 'simulados', 'stats', 'notes', 'assistant'];
export const viewFromHash = (hash: string): WorkspaceView => {
  const candidate = hash.replace(/^#/, '') as WorkspaceView;
  return WORKSPACE_VIEWS.includes(candidate) ? candidate : 'list';
};
export function planTopic(notes: Record<string, string>, day: string, topic: Pick<Topic, 'title'>) {
  const title = topic.title.replace(/[\r\n]+/g, ' ').trim();
  const task = `Revisar ${title}`;
  const lines = (notes[day] || '').split('\n').filter(Boolean);
  if (lines.some(line => line.replace(/^- \[[ xX]\] /, '') === task)) return notes;
  return { ...notes, [day]: [...lines, `- [ ] ${task}`].join('\n') };
}
