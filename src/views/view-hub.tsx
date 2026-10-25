import { HubLaunchpad } from '../components/HubLaunchpad';
import { useWorkspaceActions } from '../services/workspace';
import { studyEntries } from '../services/chartData';
import { useFocusClock } from '../hooks/useFocusClock';
import {
Activity,
ArrowRight,
Calendar,
ChevronDown,
ClipboardList,
Clock,
Lightbulb,
MoreHorizontal,
PlayCircle,Plus,
Target,
X
} from 'lucide-react';
import React,{ useEffect,useState } from 'react';
import {
FutureLoadWidget,
HeatmapWidget,SimuladosMiniWidget,
SmartSuggestions,
WeeklyGoalsWidget
} from '../components';
import type { StudyTool, WorkspaceView } from '../components/AppShell';
import { TodoToday } from '../components/TodoToday';
import { Simulado,Topic,UserConfig } from '../types';
import {
AREAS,
formatDate,
getTodayStr,
getTopicTrack
} from '../utils';

const DeepFocusContent = ({ onClose, dueItems, onReview }: { onClose: () => void; dueItems: any[]; onReview: (id: string, idx: number) => void }) => {
    const { timeLeft, mode, isActive, pause, toggle: toggleTimer, setMode: setTimerMode } = useFocusClock();

    const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');

    return (
        <div className="flex flex-col items-center justify-start flex-1 h-full w-full bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-white/5 rounded-2xl relative pt-12 sm:pt-16 pb-8 animate-fade-in shadow-xs">
            <button onClick={() => { pause(); onClose(); }} className="absolute top-4 right-4 p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-all active:scale-95 text-slate-500 font-semibold text-xs flex items-center gap-2">
                <span>Encerrar Foco</span>
                <X size={15} />
            </button>
            <div className="flex gap-1.5 bg-slate-100/90 dark:bg-zinc-800/90 p-1 rounded-xl w-full max-w-[260px] border border-slate-200/50 dark:border-white/5 mx-auto shrink-0 mt-4 sm:mt-0 mb-8 sm:mb-10">
                <button onClick={() => setTimerMode('focus')} className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${mode === 'focus' ? 'bg-white dark:bg-zinc-700 shadow-xs text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'}`}>Foco Profundo</button>
                <button onClick={() => setTimerMode('break')} className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${mode === 'break' ? 'bg-white dark:bg-zinc-700 shadow-xs text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'}`}>Pausa</button>
            </div>

            <div className="relative group flex justify-center items-center w-full mb-10 shrink-0 flex-1 min-h-[260px]">
                <div className={`w-56 h-56 sm:w-72 sm:h-72 rounded-full flex flex-col items-center justify-center border-4 relative bg-white dark:bg-zinc-900 shadow-sm transition-all duration-300 ${mode === 'focus' ? 'border-blue-500/30 text-blue-600 dark:text-blue-400' : 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400'}`}>
                    <span className="text-6xl sm:text-7xl font-bold tracking-tight tabular-nums">{mins}:{secs}</span>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-2">{mode === 'focus' ? 'Tempo de Estudo' : 'Intervalo'}</span>
                </div>
            </div>

            <div className="flex gap-4 justify-center w-full shrink-0 mb-8">
                <button onClick={toggleTimer} className={`px-6 py-3 rounded-xl flex items-center gap-2 text-white font-semibold text-sm shadow-sm active:scale-95 transition-all ${mode === 'focus' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                    {isActive ? <><Activity size={18} className="animate-pulse" /><span>Pausar</span></> : <><PlayCircle size={18} /><span>Iniciar Cronômetro</span></>}
                </button>
            </div>

            {mode === 'focus' && dueItems.length > 0 && (
                <div className="w-full max-w-md mx-auto shrink-0 px-4">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">Foco da Sessão ({dueItems.length} restantes)</h3>
                    <div
                        className="bg-slate-50 hover:bg-white dark:bg-zinc-800/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 flex items-center justify-between group cursor-pointer transition-all"
                        onClick={() => {
                            pause();
                            onReview(dueItems[0].topic.id, dueItems[0].idx);
                        }}
                    >
                        <div className="truncate pr-3 flex-1 text-slate-800 dark:text-slate-200 font-semibold text-sm">{dueItems[0].topic.title}</div>
                        <button className="text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0">Praticar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export const HubView = ({
    toolRequest, syncStatus, lastSyncAt, completedLessons, topics, simulados, config, dailyNotes, setDailyNotes, onReview, onEditTopic, onDeleteTopic,
    setSortOrder, setFilterArea, sortOrder, filterArea, searchTerm,
    onAddSimulado, onNavigateToView, onOpenNewTopic, onUpdateTopic, onQuickCompleteReview
}: {
    syncStatus: string; lastSyncAt: number; completedLessons: number;
    toolRequest?: { id: StudyTool; nonce: number } | null;
    topics: Topic[], simulados: Simulado[], config: UserConfig,
    dailyNotes: Record<string, string>, setDailyNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    onReview: (id: string, idx: number) => void, onEditTopic: (id: string) => void, onDeleteTopic?: (id: string) => void,
    setSortOrder?: any, setFilterArea?: any,
    sortOrder?: string, filterArea?: string, searchTerm?: string,
    onAddSimulado?: () => void,
    onNavigateToView?: (view: WorkspaceView) => void,
    onOpenNewTopic?: () => void,
    onUpdateTopic?: (topic: Topic) => void,
    onQuickCompleteReview?: (id: string, idx: number) => void
}) => {
    const dispatch = useWorkspaceActions();
    const [expanded, setExpanded] = useState(false);
    const [deepFocusOpen, setDeepFocusOpen] = useState(false);
    const [tool, setTool] = useState('goals');
    const [track, setTrack] = useState('all');
    useEffect(() => {
        if (!toolRequest) return;
        if (toolRequest.id === 'today') { setDeepFocusOpen(false); requestAnimationFrame(() => document.getElementById('todo-heading')?.scrollIntoView({ block: 'start' })); }
        else if (toolRequest.id === 'focus') setDeepFocusOpen(true);
        else {
            setDeepFocusOpen(false);
            setTool(toolRequest.id);
            requestAnimationFrame(() => document.getElementById('notebook-heading')?.scrollIntoView({ block: 'start' }));
        }
    }, [toolRequest]);
    const today = getTodayStr();
    const activeTopics = topics.filter(t => !t.deleted);
    const activeSimulados = simulados.filter(s => !s.deleted);
    const filtered = activeTopics.filter(t => (track === 'all' || getTopicTrack(t) === track) && (!searchTerm || t.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())));
    const pending = filtered.flatMap(t => t.reviews.map((r, idx) => ({ ...r, topic: t, idx }))).filter(r => !r.done);
    const dueItems = pending.filter(r => r.date <= today).sort((a, b) => a.date.localeCompare(b.date));
    const upcoming = pending.filter(r => r.date > today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5);
    const history = filtered.flatMap(t => t.reviews).filter(r => r.done);
    const scored = studyEntries(filtered, activeSimulados);
    const total = scored.reduce((sum, r) => sum + r.total, 0);
    const correct = scored.reduce((sum, r) => sum + r.correct, 0);
    const completedToday = history.filter(r => r.completedAt ? new Date(r.completedAt).toLocaleDateString('sv-SE') === today : r.date === today).length;
    const dateLabel = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
    const tools = [
      { id: 'goals', label: 'Metas', icon: Target },
      { id: 'exams', label: 'Simulados', icon: ClipboardList }, { id: 'rhythm', label: 'Constância', icon: Activity },
      { id: 'suggestions', label: 'Reforço', icon: Lightbulb }, { id: 'load', label: 'Carga futura', icon: Calendar },
    ];

    if (deepFocusOpen) return <DeepFocusContent onClose={() => setDeepFocusOpen(false)} dueItems={dueItems} onReview={onReview} />;

    return (
      <div className="study-journal">
        <header className="journal-intro">
          <div>
            <p className="journal-eyebrow"><span className="mica-live-dot" aria-hidden="true" /> Seu dia de estudo <span aria-hidden="true">·</span> <time dateTime={today}>{dateLabel}</time></p>
            <h1>Seu espaço de estudo</h1>

          </div>
          <div className="journal-start">
            <button className="rf-primary" onClick={() => dueItems.length ? onReview(dueItems[0].topic.id, dueItems[0].idx) : onOpenNewTopic?.()}>
              {dueItems.length ? 'Iniciar revisão' : 'Adicionar tema'} <ArrowRight size={18} />
            </button>
            {dueItems.length > 0 && <button className="rf-text-button" onClick={() => setDeepFocusOpen(true)}><Clock size={16} /> Estudar com temporizador</button>}
          </div>
        </header>

        <dl className="journal-measures" aria-label="Resumo dos estudos">
          <div><dt>Para revisar</dt><dd>{dueItems.length}<span>tema{dueItems.length === 1 ? '' : 's'}</span></dd></div>
          <div><dt>Concluídas hoje</dt><dd>{completedToday}<span>{completedToday === 1 ? 'revisão' : 'revisões'}</span></dd></div>
          <div><dt>Seu aproveitamento</dt><dd>{total ? Math.round(correct / total * 100) + '%' : '—'}<span>{total ? 'de acertos' : 'aguardando estudo'}</span></dd></div>
          <div><dt>Questões praticadas</dt><dd>{total.toLocaleString('pt-BR')}<span>no total</span></dd></div>
        </dl>

        <HubLaunchpad topics={activeTopics.length} exams={activeSimulados.length} completedLessons={completedLessons} status={syncStatus} lastSyncAt={lastSyncAt} />

        <TodoToday notes={dailyNotes} onChange={setDailyNotes} />

        <div className="journal-layout">
          <section className="journal-today" aria-labelledby="today-heading">
            <div className="journal-section-heading"><div><p className="journal-eyebrow">Sua fila de estudo</p><h2 id="today-heading">Para hoje<span className="journal-count">{dueItems.length}</span></h2></div>
              <label className="journal-filter">Trilha<select aria-label="Filtrar trilha de estudo" value={track} onChange={e => setTrack(e.target.value)}><option value="all">Todas as áreas</option><option value="concurso">Concursos</option><option value="residencia">Residência</option></select></label>
            </div>
            {dueItems.length ? <>
              <ol className="journal-review-list">
                {(expanded ? dueItems : dueItems.slice(0, 6)).map((review, i) => <li key={review.topic.id + '-' + review.idx} className="journal-review">
                  <span className="journal-index">{String(i + 1).padStart(2, '0')}</span>
                  <div className="journal-review-info"><p className="journal-review-meta">{AREAS.find(a => a.id === review.topic.area)?.name || 'Geral'} <span>·</span> {review.targetQ} questões {review.date < today && <span className="journal-overdue">· Retomar de {formatDate(review.date)}</span>}</p>
                    <button className="journal-topic-title" onClick={() => onEditTopic(review.topic.id)}>{review.topic.title}</button><p className="journal-review-stage">{review.label}</p>
                  </div>
                  <button className="rf-secondary journal-review-action" onClick={() => onReview(review.topic.id, review.idx)}>Revisar <ArrowRight size={15} /></button>
                  <details className="journal-row-menu"><summary aria-label={`Opções de ${review.topic.title}`}><MoreHorizontal size={20} /></summary><div><button onClick={() => onEditTopic(review.topic.id)}>Editar tema</button><button onClick={() => dispatch({type:"plan-topic",topicId:review.topic.id})}>Adicionar ao plano de hoje</button><button onClick={() => dispatch({type:"notion",topicId:review.topic.id})}>Abrir Notion</button><button onClick={() => dispatch({type:"assistant",topicId:review.topic.id})}>Preparar resumo no ChatGPT</button>{onQuickCompleteReview && <button onClick={() => onQuickCompleteReview(review.topic.id, review.idx)}>Registrar 100% de acertos</button>}</div></details>
                </li>)}
              </ol>
              {dueItems.length > 6 && <button className="rf-text-button journal-show-more" onClick={() => setExpanded(!expanded)}>{expanded ? 'Mostrar menos' : `Ver todas as ${dueItems.length} revisões`} <ChevronDown size={16} /></button>}
            </> : <div className="journal-empty">
              <span className="journal-empty-mark" aria-hidden="true">{activeTopics.length ? '✓' : 'Aa'}</span>
              <h3>{searchTerm ? 'Nenhum tema encontrado.' : activeTopics.length ? 'Nenhuma revisão pendente' : 'Seu primeiro tema começa aqui'}</h3>

              <div className="journal-empty-actions"><button className="rf-text-button" onClick={onOpenNewTopic}>Adicionar tema <Plus size={16} /></button><button className="rf-text-button" onClick={() => onNavigateToView?.('cronograma')}>Explorar cronogramas <ArrowRight size={16} /></button></div>
            </div>}
          </section>

          <aside className="journal-horizon" aria-labelledby="horizon-heading">
            <p className="journal-eyebrow">Planejamento</p><h2 id="horizon-heading">Próximas revisões</h2>
            {upcoming.length ? <ol>{upcoming.map(r => <li key={r.topic.id + '-' + r.idx}><time dateTime={r.date}>{formatDate(r.date)}</time><button onClick={() => onEditTopic(r.topic.id)}>{r.topic.title}</button><span>{r.targetQ} questões</span></li>)}</ol> : <p className="journal-muted">Sem revisões agendadas.</p>}
            <button className="rf-text-button" onClick={() => onNavigateToView?.('calendar')}>Abrir agenda <ArrowRight size={16} /></button>

          </aside>
        </div>

        <section className="journal-notebook" aria-labelledby="notebook-heading">
          <div className="journal-section-heading"><div><p className="journal-eyebrow">Ferramentas</p><h2 id="notebook-heading">Minha rotina</h2></div><button className="rf-text-button" onClick={() => onNavigateToView?.('database')}>Ver minhas matérias <ArrowRight size={16} /></button></div>
          <div className="journal-tool-tabs" role="tablist" aria-label="Ferramentas de estudo">{tools.map(item => <button key={item.id} id={'tool-' + item.id} role="tab" aria-selected={tool === item.id} aria-controls="journal-tool-panel" tabIndex={tool === item.id ? 0 : -1} onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const next = tools[(tools.findIndex(t => t.id === tool) + (e.key === 'ArrowRight' ? 1 : tools.length - 1)) % tools.length]; setTool(next.id); document.getElementById('tool-' + next.id)?.focus(); e.preventDefault(); } }} onClick={() => setTool(item.id)}><item.icon size={16} />{item.label}</button>)}</div>
          <div className="journal-tools" id="journal-tool-panel" role="tabpanel" aria-labelledby={'tool-' + tool}>
            {tool === 'goals' && <WeeklyGoalsWidget topics={activeTopics} simulados={activeSimulados} config={config} />}
            {tool === 'exams' && <><button className="rf-text-button" onClick={onAddSimulado}><Plus size={16} /> Registrar simulado</button><SimuladosMiniWidget simulados={activeSimulados} targetAccuracy={config.targetAccuracy || 80} onAdd={onAddSimulado || (() => {})} /></>}
            {tool === 'rhythm' && <HeatmapWidget topics={activeTopics} simulados={activeSimulados} />}
            {tool === 'suggestions' && <SmartSuggestions topics={filtered} onReview={onReview} />}
            {tool === 'load' && <FutureLoadWidget topics={filtered} />}
          </div>
        </section>

      </div>
    );
};
