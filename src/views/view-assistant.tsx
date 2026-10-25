import { useEffect, useState } from 'react';
import { Copy, ExternalLink, BookOpen, ListPlus } from 'lucide-react';
import { toast } from 'sonner';
import type { Topic } from '../types';
import { buildStudyPrompt, type StudyRequest } from '../services/studyAssistant';
import { useWorkspaceActions } from '../services/workspace';

export function AssistantView({ topics, initialTopicId }: { topics: Topic[]; initialTopicId?: string }) {
  const dispatch = useWorkspaceActions();
  const [draftKey] = useState(() => {
    try { return 'reviewflow_assistant_draft:' + (localStorage.getItem('reviewflow_sync_key') || 'local') + ':' + (initialTopicId || 'general'); }
    catch { return 'reviewflow_assistant_draft'; }
  });
  const [saved] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(draftKey) || '{}') || {}; } catch { return {}; }
  });
  const [topicId, setTopicId] = useState(initialTopicId || (typeof saved.topicId === 'string' ? saved.topicId : ''));
  const [subject, setSubject] = useState(typeof saved.subject === 'string' ? saved.subject.slice(0,200) : '');
  const [kind, setKind] = useState<StudyRequest>(['summary','guideline','questions'].includes(saved.kind) ? saved.kind : 'summary');
  const [material, setMaterial] = useState(typeof saved.material === 'string' ? saved.material.slice(0,16000) : '');
  useEffect(() => {
    try { sessionStorage.setItem(draftKey, JSON.stringify({topicId,subject,kind,material})); } catch { /* Editing remains available without storage. */ }
  }, [draftKey,topicId,subject,kind,material]);
  const [copied, setCopied] = useState(false);
  const topic = topics.find(t => t.id === topicId && !t.deleted);
  const prompt = buildStudyPrompt(topic?.title || subject, kind, material);
  const copy = async () => {
    try { await navigator.clipboard.writeText(prompt); setCopied(true); toast.success('Pedido copiado. Cole na conversa do ChatGPT.'); }
    catch { toast.error('Selecione e copie o pedido abaixo manualmente.'); }
  };
  return <div className="rf-assistant">
    <header className="journal-intro"><div><p className="journal-eyebrow">Assistente de estudo</p><h1>Estude com o ChatGPT</h1><p className="journal-deck">Prepare aqui. Copie e envie na sua conversa.</p></div><a className="rf-secondary" href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">Abrir ChatGPT <ExternalLink size={16}/></a></header>
    <div className="rf-assistant-layout"><section className="rf-module">
      <label className="rf-field">Matéria<select value={topicId} onChange={e => { setTopicId(e.target.value); setCopied(false); }}><option value="">Outro assunto</option>{topics.filter(t => !t.deleted).map(t => <option key={t.id} value={t.id}>{t.title}</option>)}</select></label>
      {!topic && <label className="rf-field">Assunto<input maxLength={200} value={subject} onChange={e => { setSubject(e.target.value); setCopied(false); }} placeholder="Ex.: insuficiência cardíaca"/></label>}
      <div className="rf-period" role="group" aria-label="Tipo de pedido">{([['summary','Resumo'],['guideline','Guidelines'],['questions','Questões']] as const).map(([id,label]) => <button key={id} aria-pressed={kind === id} onClick={() => { setKind(id); setCopied(false); }}>{label}</button>)}</div>
      <label className="rf-field">Material de referência <span className="rf-field-hint">Opcional · evite dados pessoais de pacientes</span><textarea rows={7} maxLength={16000} value={material} onChange={e => { setMaterial(e.target.value); setCopied(false); }} placeholder="Cole um trecho ou as referências que deseja estudar."/></label>
      {topic && <div className="rf-hub-actions"><button className="rf-secondary" onClick={() => dispatch({type:'notion',topicId})}><BookOpen size={16}/>Notion</button><button className="rf-secondary" onClick={() => dispatch({type:'plan-topic',topicId})}><ListPlus size={16}/>Planejar revisão</button></div>}
    </section><section className="rf-module"><h2>Seu pedido</h2><textarea className="rf-prompt-preview" aria-label="Pedido para o ChatGPT" readOnly value={prompt} rows={15}/><div className="rf-hub-actions"><button className="rf-primary" disabled={!topic && !subject.trim()} onClick={copy}><Copy size={16}/>{copied ? 'Copiado' : 'Copiar pedido'}</button><a className="rf-secondary" href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">Abrir ChatGPT <ExternalLink size={16}/></a></div><p className="rf-field-hint">O ReviewFlow não envia seus dados automaticamente nem usa API paga. A resposta aparece no ChatGPT; você pode copiá-la para seu caderno no Notion.</p></section></div>
  </div>;
}
