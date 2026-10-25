import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import type { Topic, Simulado } from '../types';
import { activityDay, dailyActivity, localDay, score, shiftDay } from '../services/chartData';

const dateLabel = (day: string) => new Date(day + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
export function ChartEmpty({ children }: { children: React.ReactNode }) {
  return <div className="rf-chart-empty"><TrendingUp size={28} strokeWidth={1.3} /><p>{children}</p></div>;
}
export function ChartTable({ rows, valueLabel }: { rows: { label: string; value: string }[]; valueLabel: string }) {
  return <details className="rf-chart-data"><summary>Ver dados em tabela</summary><div><table><thead><tr><th scope="col">Período / registro</th><th scope="col">{valueLabel}</th></tr></thead><tbody>{rows.map((row, i) => <tr key={i}><th scope="row">{row.label}</th><td>{row.value}</td></tr>)}</tbody></table></div></details>;
}
export function TrendChart({ points, percent = false, target }: { points: { label: string; value: number | null }[]; percent?: boolean; target?: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(740);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(280, Math.min(740, entry.contentRect.width))));
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  const right = width - 20;
  const shortLabel = (label: string) => label.length > (width < 500 ? 12 : 32) ? label.slice(0, width < 500 ? 10 : 30) + '…' : label;
  const active = selected === null ? null : points[selected];
  const max = percent ? 100 : Math.max(10, Math.ceil(Math.max(...points.map(p => p.value || 0), 0) / 10) * 10);
  const x = (i: number) => 48 + (points.length === 1 ? (right - 48) / 2 : i / (points.length - 1) * (right - 48));
  const y = (v: number) => 186 - v / max * 160;
  let continuing = false;
  const path = points.map((point, i) => {
    if (point.value === null) { continuing = false; return ''; }
    const command = continuing ? 'L' : 'M'; continuing = true;
    return `${command}${x(i)},${y(point.value)}`;
  }).join(' ');
  return <div className="rf-trend" ref={container}>
    <div className="rf-chart-readout" aria-live="polite">{active ? <><span>{active.label}</span><strong>{active.value === null ? 'Sem questões' : `${active.value.toLocaleString('pt-BR')}${percent ? '%' : ' questões'}`}</strong></> : <><span>Explore os pontos do gráfico</span><span>Toque, passe o cursor ou use Tab</span></>}</div>
    <svg viewBox={`0 0 ${width} 220`} role="group" aria-label={percent ? 'Evolução do percentual de acertos, escala de 0 a 100%.' : 'Evolução da quantidade de questões, escala iniciada em zero.'}>
      {[0, .25, .5, .75, 1].map(f => <g key={f}><line x1="48" x2={right} y1={y(max * f)} y2={y(max * f)} className="rf-chart-grid" /><text x="37" y={y(max * f) + 4} textAnchor="end">{Math.round(max * f)}{percent ? '%' : ''}</text></g>)}
      {target !== undefined && <g><line x1="48" x2={right} y1={y(target)} y2={y(target)} className="rf-chart-target" /><text x={right} y={y(target) - 7} textAnchor="end">Meta {target}%</text></g>}
      <path d={path} fill="none" className="rf-chart-line" />
      {points.map((point, i) => point.value === null ? null : <g key={i} role="button" tabIndex={0} aria-label={`${point.label}: ${point.value}${percent ? '%' : ' questões'}`} onFocus={() => setSelected(i)} onBlur={() => setSelected(null)} onMouseEnter={() => setSelected(i)} onMouseLeave={() => setSelected(null)} onClick={() => setSelected(i)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(i); } }}><circle cx={x(i)} cy={y(point.value)} r="15" fill="transparent" /><circle cx={x(i)} cy={y(point.value)} r={selected === i ? 6 : 3.5} className="rf-chart-point" /></g>)}
      {!!points.length && <><text x="48" y="213">{shortLabel(points[0].label)}</text>{points.length > 1 && <text x={right} y="213" textAnchor="end">{shortLabel(points[points.length - 1].label)}</text>}</>}
    </svg>
    <ChartTable valueLabel={percent ? 'Acertos' : 'Questões'} rows={points.map(p => ({ label: p.label, value: p.value === null ? 'Sem questões' : `${p.value}${percent ? '%' : ''}` }))} />
  </div>;
}
export const EvolutionChart = React.memo(({ simulados, targetAccuracy, limit }: { simulados: Simulado[]; targetAccuracy: number; limit?: number }) => {
  const exams = [...simulados].filter(s => !s.deleted && s.totalQuestions > 0 && activityDay(s.dateTaken) && activityDay(s.dateTaken) <= localDay(new Date())).sort((a, b) => a.dateTaken.localeCompare(b.dateTaken));
  const points = (limit ? exams.slice(-limit) : exams).map(s => ({ label: `${dateLabel(activityDay(s.dateTaken))} · ${s.name}`, value: Math.round(score(s.correctCount, s.totalQuestions).correct / s.totalQuestions * 100) }));
  return points.length ? <TrendChart points={points} percent target={Math.max(0, Math.min(100, targetAccuracy))} /> : <ChartEmpty>Registre um simulado para acompanhar sua evolução.</ChartEmpty>;
});

export const HeatmapWidget = React.memo(({ topics, simulados }: { topics: Topic[]; simulados: Simulado[] }) => {
  const [range, setRange] = useState(30);
  const [offset, setOffset] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const end = shiftDay(localDay(new Date()), -offset), start = shiftDay(end, 1 - range);
  const days = useMemo(() => dailyActivity(topics, simulados, start, end), [topics, simulados, start, end]);
  const max = Math.max(1, ...days.map(d => d.total));
  const active = days.find(d => d.day === selected);
  const blanks = new Date(start + 'T12:00:00').getDay();
  return <div className="rf-activity-chart">
    <div className="rf-chart-toolbar"><div className="rf-period" role="group" aria-label="Período do mapa de atividade">{[7, 14, 30, 60].map(n => <button key={n} aria-pressed={range === n} onClick={() => { setRange(n); setOffset(0); }}>{n} dias</button>)}</div><div className="rf-chart-pagination"><button aria-label="Período anterior" onClick={() => setOffset(offset + range)}><ChevronLeft size={18} /></button><button disabled={!offset} onClick={() => setOffset(0)}>Hoje</button><button aria-label="Próximo período" disabled={!offset} onClick={() => setOffset(Math.max(0, offset - range))}><ChevronRight size={18} /></button></div></div>
    <div className="rf-chart-caption"><span>{dateLabel(start)} — {dateLabel(end)}</span><strong>{days.filter(d => d.sessions).length} dias de estudo</strong></div>
    <div className="rf-heat-calendar"><div className="rf-heat-week">{['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => <span key={d}>{d}</span>)}</div><div className="rf-heat-days">{Array.from({ length: blanks }, (_, i) => <span key={`blank-${i}`} />)}{days.map(day => <button key={day.day} aria-pressed={day.day === selected} data-level={day.sessions ? Math.max(1, Math.ceil(day.total / max * 4)) : 0} onClick={() => setSelected(day.day)} onFocus={() => setSelected(day.day)} aria-label={`${dateLabel(day.day)}: ${day.total} questões, ${day.sessions} sessões`}><span>{Number(day.day.slice(-2))}</span><small>{day.total ? `${day.total}q` : '—'}</small></button>)}</div></div>
    <div className="rf-chart-caption" aria-live="polite"><span>{active ? `${dateLabel(active.day)} · ${active.sessions} sessões · ${active.correct}/${active.total} acertos` : 'Selecione um dia para ver os detalhes.'}</span><span className="rf-heat-legend">Menos {[0, 1, 2, 3, 4].map(n => <i key={n} data-level={n} />)} Mais</span></div>
  </div>;
});

export const FutureLoadWidget = React.memo(({ topics }: { topics: Topic[] }) => {
  const [range, setRange] = useState(7);
  const today = localDay(new Date());
  const pending = topics.filter(t => !t.deleted).flatMap(t => t.reviews.filter(r => !r.done));
  const buckets = Array.from({ length: range === 90 ? 13 : range }, (_, i) => {
    const start = shiftDay(today, i * (range === 90 ? 7 : 1));
    const end = shiftDay(today, Math.min(range - 1, i * (range === 90 ? 7 : 1) + (range === 90 ? 6 : 0)));
    return { label: range === 90 ? `${dateLabel(start)} – ${dateLabel(end)}` : dateLabel(start), value: pending.filter(r => r.date >= start && r.date <= end).reduce((n, r) => n + Math.max(0, r.targetQ || 0), 0) };
  });
  return <div className="rf-load-chart"><div className="rf-chart-toolbar"><span>Questões programadas</span><div className="rf-period" role="group" aria-label="Horizonte de planejamento">{[1, 7, 30, 90].map(n => <button key={n} aria-pressed={range === n} onClick={() => setRange(n)}>{n}d</button>)}</div></div><p className="rf-chart-caption">{buckets.reduce((n, b) => n + b.value, 0)} questões nos próximos {range} dias · {pending.filter(r => r.date < today).length} revisões atrasadas</p><TrendChart points={buckets} /><p className="rf-chart-footnote">{range === 90 ? 'Agrupado por semana. ' : ''}Apenas revisões já agendadas; o FSRS pode ajustar as próximas datas.</p></div>;
});

export const RetentionWidget = React.memo(({ topics }: { topics: Topic[] }) => {
  const today = localDay(new Date());
  const counts = [0, 0, 0, 0, 0];
  topics.filter(t => !t.deleted).forEach(topic => {
    const last = topic.reviews.filter(r => r.done).map(r => activityDay(r.completedAt || r.date)).filter(d => d && d <= today).sort().at(-1);
    const index = !last ? 4 : last >= shiftDay(today, -3) ? 0 : last >= shiftDay(today, -7) ? 1 : last >= shiftDay(today, -30) ? 2 : 3;
    counts[index]++;
  });
  const total = counts.reduce((a, b) => a + b, 0);
  return <div className="rf-recency"><h3><Activity size={17} /> Tempo desde a última prática</h3>{['Até 3 dias', '4 a 7 dias', '8 a 30 dias', 'Mais de 30 dias', 'Ainda sem revisão'].map((label, i) => <div className="rf-recency-row" key={label}><span>{label}</span><div className="rf-meter"><i style={{ width: `${total ? counts[i] / total * 100 : 0}%` }} /></div><strong>{counts[i]} temas</strong></div>)}<p className="rf-chart-footnote">Recência de estudo, sem estimativa de retenção da memória.</p></div>;
});
