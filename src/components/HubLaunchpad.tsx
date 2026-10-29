import { BookOpen, Calendar, Database, ClipboardList, ChartNoAxesCombined, StickyNote, Search, Plus, Sparkles, ExternalLink, Settings, CircleHelp, RefreshCw, Timer, Target } from 'lucide-react';
import { useWorkspaceActions } from '../services/workspace';
import type { WorkspaceView } from './AppShell';

export function HubLaunchpad({ topics, exams, completedLessons, status, lastSyncAt }: { topics: number; exams: number; completedLessons: number; status: string; lastSyncAt: number }) {
  const dispatch = useWorkspaceActions();
  const modules: { view: WorkspaceView; title: string; detail: string; icon: typeof BookOpen }[] = [
    {view:'cronograma',title:'Cronograma',detail:`${completedLessons} aulas concluídas`,icon:BookOpen},
    {view:'calendar',title:'Agenda',detail:'Datas e revisões',icon:Calendar},
    {view:'database',title:'Matérias',detail:`${topics} temas`,icon:Database},
    {view:'simulados',title:'Simulados',detail:`${exams} resultados`,icon:ClipboardList},
    {view:'stats',title:'Progresso',detail:'Questões e constância',icon:ChartNoAxesCombined},
    {view:'notes',title:'Anotações',detail:'Cadernos por assunto',icon:StickyNote},
  ];
  return <details className="rf-launchpad rf-launchpad-disclosure">
    <summary><span>Explorar seu espaço</span><small>Matérias, simulados e ferramentas</small></summary>
    <div className="rf-hub-actions"><button onClick={() => dispatch({type:'new-topic'})}><Plus size={16}/>Tema</button><button onClick={() => dispatch({type:'new-exam'})}><Plus size={16}/>Simulado</button><button onClick={() => dispatch({type:'search'})}><Search size={16}/>Buscar</button><button onClick={() => dispatch({type:'assistant'})}><Sparkles size={16}/>Resumos e guidelines</button><button onClick={() => dispatch({type:'notion'})}><ExternalLink size={16}/>Abrir Notion</button></div>
    <nav className="rf-hub-modules" aria-label="Módulos do ReviewFlow">{modules.map(m => <button key={m.view} onClick={() => dispatch({type:'navigate',view:m.view})}><m.icon size={19} strokeWidth={1.5}/><span>{m.title}<small>{m.detail}</small></span></button>)}</nav>
    <div className="rf-hub-utilities"><div className="rf-hub-actions"><button onClick={() => dispatch({type:'tool',tool:'focus'})}><Timer size={15}/>Foco</button><button onClick={() => dispatch({type:'tool',tool:'goals'})}><Target size={15}/>Metas</button><button onClick={() => dispatch({type:'settings'})}><Settings size={15}/>Ajustes</button><button onClick={() => dispatch({type:'help'})}><CircleHelp size={15}/>Ajuda</button></div><button className="rf-sync-chip" disabled={status === 'syncing'} onClick={() => dispatch({type:'sync'})}><RefreshCw size={14}/>{status === 'syncing' ? 'Sincronizando' : status === 'error' ? 'Revisar sincronização' : status === 'pending' ? 'Envio pendente' : status === 'online' ? 'Sincronizado' : 'Dados neste aparelho'}{lastSyncAt > 0 && <small>{new Date(lastSyncAt).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</small>}</button></div>
  </details>;
}
