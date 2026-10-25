import React, { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Topic, Simulado } from '../types';
import { HeatmapWidget, RetentionWidget } from '../components';
import { AREAS, getTodayStr } from '../utils';
import { dailyActivity, shiftDay, studyEntries } from '../services/chartData';
import { ChartEmpty, TrendChart } from '../components/StudyCharts';

export const StatsView = ({ topics = [], simulados = [] }: { topics?: Topic[], simulados?: Simulado[] }) => {
  const [period, setPeriod] = useState(30);
  const [measure, setMeasure] = useState<'total' | 'accuracy'>('total');
  const metrics = useMemo(() => {
    const today = getTodayStr();
    const all = studyEntries(topics, simulados, today);
    const start = period ? shiftDay(today, 1 - period) : all.map(e => e.day).sort()[0] || today;
    const entries = all.filter(e => e.day >= start);
    const days = dailyActivity(topics, simulados, start, today);
    const bucketSize = Math.max(1, Math.ceil(days.length / 30));
    const series = Array.from({ length: Math.ceil(days.length / bucketSize) }, (_, i) => {
      const group = days.slice(i * bucketSize, (i + 1) * bucketSize);
      const total = group.reduce((n, d) => n + d.total, 0);
      const correct = group.reduce((n, d) => n + d.correct, 0);
      const label = (day: string) => new Date(day + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
      return { label: bucketSize === 1 ? label(group[0].day) : `${label(group[0].day)} – ${label(group[group.length - 1].day)}`, total, accuracy: total ? Math.round(correct / total * 100) : null };
    });
    const total = entries.reduce((sum, r) => sum + r.total, 0);
    const correct = entries.reduce((sum, r) => sum + r.correct, 0);
    const areas = [...AREAS, { id: 'simulados', name: 'Simulados', full: 'Simulados' }].map(area => {
      const group = entries.filter(e => e.area === area.id);
      const questions = group.reduce((sum, r) => sum + r.total, 0);
      const hits = group.reduce((sum, r) => sum + r.correct, 0);
      return { ...area, questions, accuracy: questions ? Math.round(hits / questions * 100) : 0 };
    }).filter(a => a.questions).sort((a, b) => b.questions - a.questions);
    return { total, correct, count: entries.length, accuracy: total ? Math.round(correct / total * 100) : null, areas, series, bucketSize, activeDays: days.filter(d => d.sessions).length };
  }, [topics, simulados, period]);
  return <div className="rf-statistics study-journal">
    <header className="journal-intro"><div><p className="journal-eyebrow">Seu aprendizado, em perspectiva</p><h1>Cada revisão conta.</h1><p className="journal-deck">Entenda seu ritmo, reconheça o progresso e encontre o próximo foco.</p></div>
      <div className="rf-period" role="group" aria-label="Período das estatísticas">{[{ n: 7, label: '7 dias' }, { n: 30, label: '30 dias' }, { n: 365, label: '1 ano' }, { n: 0, label: 'Tudo' }].map(p => <button key={p.n} aria-pressed={period === p.n} onClick={() => setPeriod(p.n)}>{p.label}</button>)}</div>
    </header>
    <dl className="journal-measures"><div><dt>Questões praticadas</dt><dd>{metrics.total.toLocaleString('pt-BR')}</dd></div><div><dt>Respostas corretas</dt><dd>{metrics.correct.toLocaleString('pt-BR')}</dd></div><div><dt>Aproveitamento</dt><dd>{metrics.accuracy === null ? '—' : metrics.accuracy + '%'}</dd></div><div><dt>Sessões registradas</dt><dd>{metrics.count}</dd></div></dl>
    <section className="rf-stat-section rf-progress-section"><div className="rf-chart-toolbar"><div><p className="journal-eyebrow">Consistência antes de intensidade</p><h2>Seu ritmo de estudo</h2></div><div className="rf-period" role="group" aria-label="Métrica do gráfico">{(['total', 'accuracy'] as const).map(m => <button key={m} aria-pressed={measure === m} onClick={() => setMeasure(m)}>{m === 'total' ? 'Questões' : 'Acertos %'}</button>)}</div></div><p className="rf-chart-footnote">{metrics.activeDays} dias de prática no período. {metrics.bucketSize > 1 ? `Cada ponto reúne até ${metrics.bucketSize} dias.` : 'Cada ponto representa um dia.'}</p>{metrics.count ? <TrendChart points={metrics.series.map(s => ({ label: s.label, value: s[measure] }))} percent={measure === 'accuracy'} /> : <ChartEmpty>Seu progresso começa com a primeira revisão. Os gráficos aparecerão conforme você estudar.</ChartEmpty>}</section>
    <section className="rf-stat-section"><p className="journal-eyebrow">Distribuição do aprendizado</p><h2>Desempenho por área</h2>
      {metrics.areas.length ? <ul className="rf-area-list">{metrics.areas.map(area => <li key={area.id}><div><h3>{area.full}</h3><span>{area.questions} questões · {area.accuracy}% de acertos</span></div><div className="rf-area-track" aria-label={`${area.accuracy}% de acertos`}><span style={{ width: area.accuracy + '%' }} /></div></li>)}</ul> : <p className="journal-muted">Registre uma revisão ou um simulado para começar a enxergar seu caminho por aqui.</p>}
    </section>
    <section className="rf-stat-section"><p className="journal-eyebrow">Atividade</p><h2>Histórico de estudo</h2><div className="journal-tools"><HeatmapWidget topics={topics} simulados={simulados} /></div></section>
    <details className="rf-disclosure"><summary>Tempo desde o último estudo <ChevronDown size={18} /></summary><p className="journal-muted">Uma visão do tempo desde a prática de cada tema. Esta classificação não mede nem garante sua retenção de memória.</p><div className="journal-tools"><RetentionWidget topics={topics} /></div></details>
  </div>;
};
