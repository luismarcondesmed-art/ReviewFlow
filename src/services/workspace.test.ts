import { expect, it } from 'vitest';
import { planTopic, viewFromHash } from './workspace';
import { buildStudyPrompt } from './studyAssistant';
import { remainingSeconds } from '../hooks/useFocusClock';
it('routes valid destinations and safely falls back for unknown links', () => {
  expect(viewFromHash('#assistant')).toBe('assistant');
  expect(viewFromHash('#calendar')).toBe('calendar');
  expect(viewFromHash('#unknown')).toBe('list');
});
it('links a topic to today without duplicates or removing existing notes', () => {
  const notes = { '2026-10-25': 'Nota livre\n- [ ] Outra tarefa' };
  const planned = planTopic(notes, '2026-10-25', {title:'Cardiologia\nclínica'});
  expect(planned['2026-10-25']).toBe('Nota livre\n- [ ] Outra tarefa\n- [ ] Revisar Cardiologia clínica');
  expect(planTopic(planned, '2026-10-25', {title:'Cardiologia clínica'})).toBe(planned);
});
it('asks for verifiable guidelines and keeps user material separate', () => {
  const prompt = buildStudyPrompt('Cardiologia','guideline','Texto de referência');
  expect(prompt).toContain('Não invente referências');
  expect(prompt).toContain('<material>\nTexto de referência\n</material>');
  expect(buildStudyPrompt('Idiomas','summary','')).toContain('5 perguntas');
});
it('focus time catches up after background suspension and cannot become negative', () => {
  expect(remainingSeconds(1500000, 1400000)).toBe(100);
  expect(remainingSeconds(1500000, 1600000)).toBe(0);
});
