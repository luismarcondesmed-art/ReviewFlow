import React, { useEffect, useState } from 'react';
import { Activity, BookOpen, Calendar, Check, ChevronDown, ChevronRight, CircleHelp, ClipboardList, Cloud, Command, Database, Home, Menu, PanelLeftClose, PanelLeftOpen, PieChart, Plus, RefreshCw, Search, Settings, StickyNote, Target, Timer, X } from 'lucide-react';

export type WorkspaceView = 'list' | 'cronograma' | 'calendar' | 'database' | 'simulados' | 'stats';
export type StudyTool = 'notes' | 'goals' | 'focus';
interface Props {
  view: WorkspaceView;
  onNavigate: (view: WorkspaceView) => void;
  onSearch: () => void;
  onNewTopic: () => void;
  onNewExam: () => void;
  onSettings: () => void;
  onHelp: () => void;
  onTool: (tool: StudyTool) => void;
  onSync: () => void;
  status: 'offline' | 'syncing' | 'online' | 'error';
  hasSyncKey: boolean;
  profile: React.ReactNode;
  children: React.ReactNode;
  pendingCount: number;
}

const navigation = [
  { id: 'list', label: 'Meu dia', icon: Home },
  { id: 'cronograma', label: 'Cronograma', icon: BookOpen },
  { id: 'calendar', label: 'Agenda', icon: Calendar },
  { id: 'database', label: 'Matérias', icon: Database },
  { id: 'simulados', label: 'Simulados', icon: ClipboardList },
  { id: 'stats', label: 'Estatísticas', icon: PieChart },
] as const;

export function AppShell(props: Props) {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('reviewflow_nav_collapsed') === 'true');
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = navigation.find(item => item.id === props.view)!;
  const context = ['database', 'simulados'].includes(props.view)
    ? navigation.filter(item => ['database', 'simulados'].includes(item.id))
    : ['cronograma', 'calendar'].includes(props.view)
      ? navigation.filter(item => ['cronograma', 'calendar'].includes(item.id))
      : navigation.filter(item => ['list', 'stats'].includes(item.id));
  const navigate = (view: WorkspaceView) => { props.onNavigate(view); setMobileOpen(false); };
  const openTool = (tool: StudyTool) => { props.onTool(tool); setMobileOpen(false); };
  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    try { localStorage.setItem('reviewflow_nav_collapsed', String(next)); } catch { /* The current session still works. */ }
  };
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); props.onSearch(); }
      if (event.key === 'Escape') {
        setMobileOpen(false);
        document.querySelector('.mica-create-menu')?.removeAttribute('open');
      }
    };
    const outside = (event: PointerEvent) => {
      const menu = document.querySelector('.mica-create-menu');
      if (menu && !menu.contains(event.target as Node)) menu.removeAttribute('open');
    };
    window.addEventListener('keydown', keyboard);
    window.addEventListener('pointerdown', outside);
    return () => { window.removeEventListener('keydown', keyboard); window.removeEventListener('pointerdown', outside); };
  }, [props.onSearch]);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 861px)');
    const resized = () => { if (desktop.matches) setMobileOpen(false); };
    desktop.addEventListener('change', resized);
    return () => desktop.removeEventListener('change', resized);
  }, []);
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const sidebar = document.getElementById('workspace-sidebar');
    const buttons = () => Array.from(sidebar?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') || []);
    buttons()[0]?.focus();
    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = buttons();
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { last?.focus(); event.preventDefault(); }
      else if (!event.shiftKey && document.activeElement === last) { first?.focus(); event.preventDefault(); }
    };
    sidebar?.addEventListener('keydown', trap);
    return () => { sidebar?.removeEventListener('keydown', trap); previous?.focus(); };
  }, [mobileOpen]);

  return <div className={`mica-shell ${collapsed ? 'is-collapsed' : ''} ${mobileOpen ? 'mobile-nav-open' : ''}`}>
    <header className="mica-titlebar">
      <div className="mica-window-identity">
        <button className="mica-icon-button mica-desktop-toggle" onClick={toggleCollapse} aria-label={collapsed ? 'Expandir barra lateral' : 'Recolher barra lateral'} aria-expanded={!collapsed} aria-controls="workspace-sidebar">{collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}</button>
        <button className="mica-icon-button mica-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Fechar navegação' : 'Abrir navegação'} aria-expanded={mobileOpen} aria-controls="workspace-sidebar">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <button className="mica-brand" onClick={() => navigate('list')} aria-label="ReviewFlow — início"><span className="mica-app-mark"><Activity size={18} strokeWidth={1.7} /></span><span>ReviewFlow</span></button>
      </div>
      <button className="mica-command-search" onClick={props.onSearch}><Search size={16} /><span>Buscar no ReviewFlow</span><kbd>Ctrl K</kbd></button>
      <div className="mica-window-actions">
        <button className="mica-icon-button mica-mobile-search" onClick={props.onSearch} aria-label="Pesquisar"><Search size={19} /></button>
        <details className="mica-create-menu"><summary><Plus size={17} /><span>Criar</span><ChevronDown size={13} /></summary><div className="mica-flyout">
          <button onClick={event => { props.onNewTopic(); event.currentTarget.closest('details')?.removeAttribute('open'); }}><BookOpen size={16} /><span>Novo tema<small>Organizar um assunto de estudo</small></span></button>
          <button onClick={event => { props.onNewExam(); event.currentTarget.closest('details')?.removeAttribute('open'); }}><ClipboardList size={16} /><span>Novo simulado<small>Registrar resultados de uma prova</small></span></button>
        </div></details>
        {props.profile}
      </div>
    </header>

    {mobileOpen && <button className="mica-sidebar-scrim" onClick={() => setMobileOpen(false)} aria-label="Fechar menu de navegação" />}
    <aside className="mica-sidebar" id="workspace-sidebar" aria-label="Barra lateral" role={mobileOpen ? 'dialog' : undefined} aria-modal={mobileOpen || undefined}>
      {mobileOpen && <div className="mica-drawer-heading"><span>Navegação</span><button className="mica-icon-button" onClick={() => setMobileOpen(false)} aria-label="Fechar navegação lateral"><X size={18} /></button></div>}
      <button className="mica-sidebar-create" onClick={() => { props.onNewTopic(); setMobileOpen(false); }} title="Novo tema"><Plus size={18} /><span>Novo tema</span></button>
      <div className="mica-sidebar-scroll">
        <p className="mica-nav-heading">Área de trabalho</p>
        <nav aria-label="Navegação lateral">{navigation.map(item => <button key={item.id} className="mica-nav-item" onClick={() => navigate(item.id)} aria-label={item.label} aria-current={props.view === item.id ? 'page' : undefined} title={collapsed ? item.label : undefined}><item.icon size={18} strokeWidth={1.65} /><span>{item.label}</span>{item.id === 'list' && props.pendingCount > 0 && <small>{props.pendingCount}</small>}</button>)}</nav>
        <p className="mica-nav-heading mica-tools-heading">Ferramentas</p>
        <nav aria-label="Ferramentas de estudo">
          <button className="mica-nav-item" onClick={() => openTool('notes')} aria-label="Anotações" title={collapsed ? 'Anotações' : undefined}><StickyNote size={18} strokeWidth={1.65} /><span>Anotações</span></button>
          <button className="mica-nav-item" onClick={() => openTool('goals')} aria-label="Metas" title={collapsed ? 'Metas' : undefined}><Target size={18} strokeWidth={1.65} /><span>Metas</span></button>
          <button className="mica-nav-item" onClick={() => openTool('focus')} aria-label="Temporizador" title={collapsed ? 'Temporizador' : undefined}><Timer size={18} strokeWidth={1.65} /><span>Temporizador</span></button>
        </nav>
      </div>
      <footer className="mica-sidebar-footer">
        <button className="mica-sync-status" onClick={() => { props.onSync(); setMobileOpen(false); }} disabled={props.status === 'syncing'} title="Sincronização">{props.status === 'syncing' ? <RefreshCw size={16} className="animate-spin" /> : props.status === 'online' ? <Check size={16} /> : <Cloud size={16} />}<span>{!props.hasSyncKey ? 'Salvo neste dispositivo' : props.status === 'syncing' ? 'Sincronizando…' : props.status === 'online' ? 'Sincronização em dia' : props.status === 'error' ? 'Tentar sincronizar' : 'Sincronizar agora'}<small>{props.hasSyncKey ? 'Seus estudos, conectados' : 'Configure o acesso entre dispositivos'}</small></span></button>
        <div className="mica-utility-actions"><button onClick={() => { props.onSettings(); setMobileOpen(false); }} title="Configurações"><Settings size={17} /><span>Configurações</span></button><button onClick={() => { props.onHelp(); setMobileOpen(false); }} aria-label="Ajuda e tutorial" title="Ajuda e tutorial"><CircleHelp size={17} /></button></div>
      </footer>
    </aside>

    <section className="mica-workspace" aria-label="Área de trabalho">
      <div className="mica-workspace-bar"><div className="mica-breadcrumb"><span>Meu espaço</span><ChevronRight size={13} /><strong>{active.label}</strong></div><button className="mica-icon-button" onClick={props.onSettings} aria-label="Configurações"><Settings size={17} /></button></div>
      <nav className="mica-context-tabs" aria-label="Navegação superior">{context.map(item => <button key={item.id} aria-current={props.view === item.id ? 'page' : undefined} onClick={() => navigate(item.id)}><item.icon size={15} /><span>{item.id === 'list' ? 'Visão geral' : item.label}</span></button>)}<span className="mica-context-hint">{new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' }).format(new Date())}</span></nav>
      {props.children}
    </section>
  </div>;
}
