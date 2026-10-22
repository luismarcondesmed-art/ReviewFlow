import React, { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Topic, Simulado } from '../types';
import { HeatmapWidget, RetentionWidget } from '../components';
import { AREAS, getTodayStr } from '../utils';

export const StatsView = ({ topics = [], simulados = [] }: { topics?: Topic[], simulados?: Simulado[] }) => {
  const [period, setPeriod] = useState(30);
  const metrics = useMemo(() => {
    const cutoff = new Date(getTodayStr() + 'T00:00:00');
    if (period) cutoff.setDate(cutoff.getDate() - period + 1);
    const start = period ? cutoff.getTime() : 0;
    const end = Date.now();
    const entries = topics.filter(t => !t.deleted).flatMap(t => t.reviews.filter(r => r.done).map(r => ({ area: t.area, correct: r.correct, total: r.total, time: new Date(r.completedAt || r.date + 'T12:00:00').getTime() })))
      .concat(simulados.filter(s => !s.deleted).map(s => ({ area: 'simulados' as any, correct: s.correctCount, total: s.totalQuestions, time: new Date(s.dateTaken).getTime() })))
      .filter(e => e.time >= start && e.time <= end);
    const total = entries.reduce((sum, r) => sum + r.total, 0);
    const correct = entries.reduce((sum, r) => sum + r.correct, 0);
    const areas = [...AREAS, { id: 'simulados', name: 'Simulados', full: 'Simulados' }].map(area => {
      const group = entries.filter(e => e.area === area.id);
      const questions = group.reduce((sum, r) => sum + r.total, 0);
      const hits = group.reduce((sum, r) => sum + r.correct, 0);
      return { ...area, questions, accuracy: questions ? Math.round(hits / questions * 100) : 0 };
    }).filter(a => a.questions).sort((a, b) => b.questions - a.questions);
    return { total, correct, count: entries.length, accuracy: total ? Math.round(correct / total * 100) : null, areas };
  }, [topics, simulados, period]);
  return <div className="rf-statistics study-journal">
    <header className="journal-intro"><div><p className="journal-eyebrow">Olhar para o caminho</p><h1>Cada retorno<br /><em>conta.</em></h1><p className="journal-deck">Seu progresso, com contexto. Observe o que funciona e encontre espaço para melhorar.</p></div>
      <div className="rf-period" role="group" aria-label="Período das estatísticas">{[{ n: 7, label: '7 dias' }, { n: 30, label: '30 dias' }, { n: 365, label: '1 ano' }, { n: 0, label: 'Tudo' }].map(p => <button key={p.n} aria-pressed={period === p.n} onClick={() => setPeriod(p.n)}>{p.label}</button>)}</div>
    </header>
    <dl className="journal-measures"><div><dt>Questões praticadas</dt><dd>{metrics.total.toLocaleString('pt-BR')}</dd></div><div><dt>Respostas corretas</dt><dd>{metrics.correct.toLocaleString('pt-BR')}</dd></div><div><dt>Aproveitamento</dt><dd>{metrics.accuracy === null ? '—' : metrics.accuracy + '%'}</dd></div><div><dt>Sessões registradas</dt><dd>{metrics.count}</dd></div></dl>
    <section className="rf-stat-section"><p className="journal-eyebrow">Distribuição do aprendizado</p><h2>Onde seu estudo acontece</h2>
      {metrics.areas.length ? <ul className="rf-area-list">{metrics.areas.map(area => <li key={area.id}><div><h3>{area.full}</h3><span>{area.questions} questões · {area.accuracy}% de acertos</span></div><div className="rf-area-track" aria-label={`${area.accuracy}% de acertos`}><span style={{ width: area.accuracy + '%' }} /></div></li>)}</ul> : <p className="journal-muted">Registre uma revisão ou um simulado para começar a enxergar seu caminho por aqui.</p>}
    </section>
    <section className="rf-stat-section"><p className="journal-eyebrow">Pequenos passos, repetidos</p><h2>Seu ritmo de estudo</h2><div className="journal-tools"><HeatmapWidget topics={topics} simulados={simulados} /></div></section>
    <details className="rf-disclosure"><summary>Tempo desde o último estudo <ChevronDown size={18} /></summary><p className="journal-muted">Uma visão do tempo desde a prática de cada tema. Esta classificação não mede nem garante sua retenção de memória.</p><div className="journal-tools"><RetentionWidget topics={topics} /></div></details>
  </div>;
};
