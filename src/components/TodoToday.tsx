import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { getTodayStr } from '../utils';

export function TodoToday({ notes, onChange }: { notes: Record<string, string>; onChange: Dispatch<SetStateAction<Record<string, string>>> }) {
  const today = getTodayStr();
  const [date, setDate] = useState(today);
  const [draft, setDraft] = useState('');
  const lines = (notes[date] || '').split('\n').filter(line => line.trim());
  const tasks = lines.filter(line => /^- \[[ xX]\] /.test(line));
  const completed = tasks.filter(line => /^- \[[xX]\] /.test(line)).length;
  const update = (transform: (lines: string[]) => string[]) => onChange(previous => ({ ...previous, [date]: transform((previous[date] || '').split('\n').filter(line => line.trim())).join('\n') }));
  const moveDate = (offset: number) => {
    const next = new Date(date + 'T12:00:00'); next.setDate(next.getDate() + offset);
    setDate(`${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-${String(next.getDate()).padStart(2, '0')}`);
    setDraft('');
  };
  return <section className="rf-todo" aria-labelledby="todo-heading">
    <header><div><p className="journal-eyebrow">Seu plano em poucos segundos</p><h2 id="todo-heading">To-Do Today <small>{completed}/{tasks.length} concluídas</small></h2></div>
      <div className="rf-todo-date"><button type="button" aria-label="Dia anterior" onClick={() => moveDate(-1)}><ChevronLeft size={16} /></button><label><span className="sr-only">Data das tarefas</span><input type="date" value={date} onChange={e => { if (e.target.value) { setDate(e.target.value); setDraft(''); } }} /></label><button type="button" aria-label="Próximo dia" onClick={() => moveDate(1)}><ChevronRight size={16} /></button>{date !== today && <button type="button" onClick={() => setDate(today)}>Hoje</button>}</div>
    </header>
    <form className="rf-todo-add" onSubmit={event => { event.preventDefault(); if (!draft.trim()) return; update(previous => [...previous, '- [ ] ' + draft.trim()]); setDraft(''); }}>
      <input aria-label="Nova tarefa" value={draft} onChange={e => setDraft(e.target.value)} maxLength={500} placeholder="O que você quer fazer? Digite e pressione Enter…" /><button type="submit" aria-label="Adicionar tarefa" disabled={!draft.trim()}><Plus size={18} /><span>Adicionar</span></button>
    </form>
    {lines.length ? <ul>{lines.map((line, index) => {
      const checklist = /^- \[[ xX]\] /.test(line);
      const done = /^- \[[xX]\] /.test(line);
      const text = checklist ? line.slice(6) : line;
      return <li key={date + '-' + index} className={done ? 'is-done' : ''}>
        <input type="checkbox" aria-label={`Concluir ${text}`} checked={done} onChange={() => update(previous => previous.map((value, i) => i === index ? `- [${done ? ' ' : 'x'}] ${text}` : value))} />
        <input aria-label={`Editar tarefa ${index + 1}`} value={text} maxLength={500} onChange={e => { const value = e.target.value.replaceAll('\n', ' '); update(previous => previous.map((original, i) => i === index ? (checklist ? original.slice(0, 6) : '') + value : original)); }} />
        <button type="button" aria-label={`Excluir tarefa ${text}`} onClick={() => update(previous => previous.filter((_, i) => i !== index))}><Trash2 size={15} /></button>
      </li>;
    })}</ul> : <p className="rf-field-hint">Comece com uma tarefa pequena: revisar Cardiologia, fazer 20 questões ou ler um resumo.</p>}
    <p className="rf-todo-saved">Salvo automaticamente neste aparelho.</p>
  </section>;
}
