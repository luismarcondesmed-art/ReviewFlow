import { BookOpen,ExternalLink,Settings } from 'lucide-react';
import { useState } from 'react';
import type { Topic,UserConfig } from '../types';
import { safeNotionURL } from '../utils/notion';
import { useWorkspaceActions } from '../services/workspace';

export function NotesView({ topics, config, onEditTopic, onSettings }: { topics: Topic[]; config: UserConfig; onEditTopic: (topic: Topic) => void; onSettings: () => void }) {
  const dispatch = useWorkspaceActions();
  const [selectedId, setSelectedId] = useState('home');
  const [search, setSearch] = useState('');
  const available = topics.filter(t => !t.deleted);
  const topic = available.find(t => t.id === selectedId);
  const selected = topic ? { name: topic.title, url: safeNotionURL(topic.notionLink), embed: safeNotionURL(topic.notionEmbedUrl) } : { name: 'Meu caderno', url: safeNotionURL(config.notionHomeUrl), embed: safeNotionURL(config.notionHomeEmbedUrl) };
  const configure = () => topic ? onEditTopic(topic) : onSettings();
  const choose = (id: string, url?: string, embed?: string) => {
    setSelectedId(id);
    const destination = safeNotionURL(url);
    if (destination && !safeNotionURL(embed)) window.open(destination, '_blank', 'noopener,noreferrer');
  };
  return <div className="rf-notebooks">
    <header className="rf-notebooks-heading"><div><p className="journal-eyebrow">Seu material de estudo</p><h1>Anotações no Notion</h1></div><div className="rf-hub-actions"><button className="rf-primary" onClick={() => dispatch({type:'notion',topicId:topic?.id})}><ExternalLink size={16}/>Abrir Notion</button><button className="rf-secondary" onClick={onSettings}><Settings size={16} />Configurar caderno</button></div></header>
    <div className="rf-notebooks-layout">
      <aside aria-label="Cadernos por matéria"><label className="rf-field"><span className="sr-only">Buscar caderno</span><input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar matéria…" /></label>
        <button className="rf-notebook-item" aria-pressed={!topic} onClick={() => choose('home', config.notionHomeUrl, config.notionHomeEmbedUrl)}><BookOpen size={16} /><span>Meu caderno<small>Caderno inicial</small></span></button>
        {available.filter(t => t.title.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())).map(t => <button className="rf-notebook-item" key={t.id} aria-pressed={topic?.id === t.id} onClick={() => choose(t.id, t.notionLink, t.notionEmbedUrl)}><BookOpen size={16} /><span>{t.title}<small>{t.notionEmbedUrl ? 'Ler dentro do app' : t.notionLink ? 'Abrir no Notion ↗' : 'Vincular caderno'}</small></span></button>)}
        {!available.length && <p className="rf-field-hint">Adicione uma matéria para organizar suas anotações por assunto.</p>}
      </aside>
      <section className="rf-notebook-reader" aria-label={`Anotações de ${selected.name}`}>
        <header><h2>{selected.name}</h2><div><button className="rf-text-button" onClick={configure}>Editar vínculo</button><button className="rf-text-button" onClick={() => dispatch({type:'assistant',topicId:topic?.id})}>Preparar resumo</button>{(selected.url || selected.embed) && <a className="rf-secondary" href={selected.url || selected.embed} target="_blank" rel="noopener noreferrer">Abrir no Notion<ExternalLink size={14} /></a>}</div></header>
        {selected.embed ? <><iframe key={selected.embed} title={`Notion — ${selected.name}`} src={selected.embed} loading="lazy" referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms" allow="fullscreen" /><p className="rf-field-hint">Se a página não aparecer, use Abrir no Notion e confira se o endereço veio de Incorporar esta página.</p></> : <div className="rf-notebook-empty"><BookOpen size={30} /><h3>{selected.url ? 'Seu caderno está vinculado' : 'Um caderno para este assunto'}</h3><p>{selected.url ? 'Este link pode ser aberto no Notion. Para ler dentro do ReviewFlow, adicione também o código de incorporação de uma página publicada.' : 'Cole o link da página na edição da matéria. Para o caderno inicial, use as configurações.'}</p><button className="rf-primary" onClick={configure}>Configurar {topic ? 'esta matéria' : 'meu caderno'}</button><p className="rf-field-hint">Páginas privadas podem continuar privadas. O ReviewFlow não publica nada nem solicita uma chave do Notion.</p><a href="https://www.notion.com/help/public-pages-and-web-publishing" target="_blank" rel="noopener noreferrer">Como incorporar uma página publicada</a></div>}
      </section>
    </div>
  </div>;
}
