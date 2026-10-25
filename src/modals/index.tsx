import {
ArrowRight,
Bell,
Check,
ChevronDown,
ChevronRight,
ClipboardList,
Clock,
Cloud,
Download,
Edit2,
Heart,
HelpCircle,
History,
Info,
LayoutList,
Moon,
PlayCircle,
Plus,
Settings,
Smartphone,
Sparkles,
Star,
Sun,
Target,
Trash2,
Upload,
X,
Zap
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import React,{ useEffect,useRef,useState } from "react";
import { toast } from 'sonner';
import { BackgroundPicker } from "../components/BackgroundPicker";
import { SurfacePicker } from "../components/SurfacePicker";
import { TodoToday } from "../components/TodoToday";
import { TutorialContent } from "../components/TutorialContent";
import { validSyncCode } from "../services/syncPolicy";
import {
AreaType,
ImportanceType,
Simulado,
Topic,
UserConfig
} from "../types";
import {
AREAS,
formatDate,
generateSmartSchedule,
getAreaTheme,
getPerformanceColor,
getTodayStr,
IMPORTANCE_LEVELS,
OptimizationChange
} from "../utils";
import { notionURL } from "../utils/notion";
// Schedules imports removed

// --- Modern Glass Modal ---
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  headerContent,
  alignTopOnMobile,
  fullScreen,
  hideHeader,
  creator = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  headerContent?: React.ReactNode;
  alignTopOnMobile?: boolean;
  fullScreen?: boolean;
  hideHeader?: boolean;
  creator?: boolean;
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      // History editing opens another dialog above this creator.
      const dialogs = Array.from(document.querySelectorAll('[role="dialog"]'));
      if (dialogs[dialogs.length - 1] !== dialogRef.current?.closest('[role="dialog"]')) return;
      const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), a[href], summary, [tabindex="0"]') || []).filter(el => el.getClientRects().length > 0);
      const first = controls[0]; const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialogRef.current?.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current?.contains(document.activeElement))) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', trapFocus);
      if (previousFocus?.isConnected) previousFocus.focus({preventScroll:true});
    };
  }, [isOpen, creator]);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      const dialogs = Array.from(document.querySelectorAll('[role="dialog"]'));
      if (e.key === "Escape" && dialogs[dialogs.length - 1] === dialogRef.current?.closest('[role="dialog"]')) onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div
      className={`fixed inset-0 z-[100] flex ${
        fullScreen 
          ? "items-center justify-center p-0 sm:p-4" 
          : alignTopOnMobile 
            ? "items-start pt-3 px-2 sm:px-4 sm:pt-0 sm:items-center" 
            : "items-end sm:items-center"
      } justify-center sm:p-4 p-0`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop with stronger blur for depth */}
      <div
        className="absolute inset-0 bg-slate-800/40 dark:bg-black/70 backdrop-blur-md transition-opacity duration-300 ease-out"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container: Floating Glass Panel */}
      <div
        ref={dialogRef}
        className={`${creator ? "rf-creator-dialog" : ""} relative w-full ${fullScreen ? "max-w-md sm:max-w-2xl" : "max-w-md"} bg-white/95 dark:bg-[#121214]/95 backdrop-blur-xl ${
            fullScreen 
              ? "h-[100dvh] rounded-none sm:h-auto sm:rounded-[36px] sm:min-h-[500px]" 
              : alignTopOnMobile 
                ? "rounded-[28px] sm:rounded-[36px] max-h-[92dvh] sm:max-h-[85vh]" 
                : "rounded-t-[28px] sm:rounded-[36px] max-h-[88dvh] sm:max-h-[85vh] pb-[env(safe-area-inset-bottom)]"
        } shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] flex flex-col animate-slide-up sm:animate-scale-in border border-white/40 dark:border-white/10 overflow-hidden ring-1 ring-black/5 dark:ring-white/5`}
      >
        {/* Header */}
        {!hideHeader && (
            <div className="px-6 py-5 border-b border-black/5 dark:border-white/5 flex justify-between items-center z-10 sticky top-0 bg-white/50 dark:bg-[#121214]/50 backdrop-blur-xl">
            <div className="flex items-center gap-3">
                <h3
                id="modal-title"
                className="text-xl font-black text-slate-800 dark:text-slate-200 tracking-tight"
                >
                {title}
                </h3>
                {headerContent}
            </div>
            <button
                onClick={onClose}
                aria-label="Fechar"
                className="p-2 bg-black/5 dark:bg-slate-200/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-all active:scale-90"
            >
                <X size={20} className="text-slate-500 dark:text-slate-300" />
            </button>
            </div>
        )}

        {/* Content */}
        <div className={`${creator ? "rf-creator-content" : ""} min-h-0 flex-1 overflow-y-auto p-0 scroll-smooth custom-scrollbar flex flex-col`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export const SyncAdModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sincronização">
      <div className="p-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-pink-500/30">
          <Heart size={32} strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          Apoie o ReviewFlow
        </h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Para manter a sincronização gratuita, considere fazer uma doação. Seu apoio ajuda a manter os servidores online para todos os estudantes!
        </p>

        {/* PIX Container */}
        <div className="bg-slate-50 dark:bg-black/20 p-5 rounded-2xl border border-slate-200 dark:border-white/10 w-full mb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
               <QRCodeCanvas value="00020126460014br.gov.bcb.pix0124378c679e-d198-46c0-bac6-47c2580ead635204000053039865802BR5913LUIS MARCONDES6009SAO PAULO62140510ReviewFlow63047C44" size={160} level="M" />
            </div>
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Chave PIX (Aleatória)</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-[11px] text-slate-600 dark:text-slate-300 font-bold break-all select-all">
              378c679e-d198-46c0-bac6-47c2580ead63
            </code>
            <button 
              onClick={() => {
                navigator.clipboard.writeText("378c679e-d198-46c0-bac6-47c2580ead63");
                alert("Chave PIX copiada!");
              }}
              className="w-10 h-10 shrink-0 flex items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md shadow-blue-500/20"
            >
              <ClipboardList size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          disabled={countdown > 0}
          className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${countdown > 0 ? "bg-slate-400 dark:bg-slate-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 shadow-blue-500/25"}`}
        >
          {countdown > 0
            ? `Aguarde ${countdown}s...`
            : "Confirmar Sincronização"}
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export const DailyTodoContent = ({ dailyNotes, setDailyNotes }: {
  dailyNotes: Record<string, string>;
  setDailyNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onClose?: () => void; hideHeader?: boolean;
}) => <TodoToday notes={dailyNotes} onChange={setDailyNotes} />;

export const TodoModal = ({
  isOpen,
  onClose,
  dailyNotes,
  setDailyNotes,
}: {
  isOpen: boolean;
  onClose: () => void;
  dailyNotes: Record<string, string>;
  setDailyNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Atividades"
      alignTopOnMobile={true}
    >
      <DailyTodoContent
        dailyNotes={dailyNotes}
        setDailyNotes={setDailyNotes}
        onClose={onClose}
        hideHeader={true}
      />
    </Modal>
  );
};

export const TutorialModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => <Modal isOpen={isOpen} onClose={onClose} title="Guia ReviewFlow 2.0" creator><TutorialContent key={String(isOpen)} onClose={onClose} /></Modal>;

export const EditTopicModal = ({
  isOpen,
  onClose,
  topic,
  onSave,
  onDelete,
  onEditReview,
  config,
}: {
  isOpen: boolean;
  onClose: () => void;
  topic: Topic | null;
  onSave: (t: Topic) => void;
  onDelete?: (id: string) => void;
  onEditReview?: (idx: number) => void;
  config?: UserConfig;
}) => {
  const [activeTab, setActiveTab] = useState<"details" | "history">("details");

  // Custom settings state
  const [intervalsStr, setIntervalsStr] = useState("");
  const [baseQuestions, setBaseQuestions] = useState<number | "">("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Linked Lessons State
  const [linkedLessons, setLinkedLessons] = useState<string[]>([]);
  const [newLessonInput, setNewLessonInput] = useState("");

  // Tags State
  const [tags, setTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState("");

  useEffect(() => {
    if (isOpen) {
      setActiveTab("details");
      if (topic) {
        if (topic.customSettings) {
          setIntervalsStr(topic.customSettings.intervals.join(", "));
          setBaseQuestions(topic.customSettings.baseQuestions);
          setShowAdvanced(true);
        } else {
          setIntervalsStr("");
          setBaseQuestions("");
          setShowAdvanced(false);
        }
        setLinkedLessons(topic.linkedLessons || []);
        setTags(topic.tags || []);
      } else {
        setIntervalsStr("");
        setBaseQuestions("");
        setShowAdvanced(false);
        setLinkedLessons([]);
        setTags([]);
      }
      setNewLessonInput("");
      setNewTagInput("");
    }
  }, [isOpen, topic]);

  if (!isOpen) return null;

  const safeTopic = topic || ({} as Topic);
  const isNew = !safeTopic.id;

  const handleAddLesson = (lesson: string) => {
    if (lesson && !linkedLessons.includes(lesson)) {
      setLinkedLessons([...linkedLessons, lesson]);
      setNewLessonInput("");
    }
  };

  const handleRemoveLesson = (index: number) => {
    setLinkedLessons(linkedLessons.filter((_, i) => i !== index));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newTagInput.trim()) {
        const newTag = newTagInput.trim();
        if (!tags.includes(newTag)) {
          setTags([...tags, newTag]);
        }
        setNewTagInput("");
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const title = (fd.get("title") as string).trim();
    if (!title) { toast.error("Informe o nome da matéria."); return; }
    const subarea = fd.get("subarea") as string;
    const area = fd.get("area") as AreaType;
    const importance = fd.get("importance") as ImportanceType;
    const studyDate = fd.get("date") as string;

    let notionLink = '', notionEmbedUrl = '';
    try { notionLink = notionURL(String(fd.get('notionLink') || '')); notionEmbedUrl = notionURL(String(fd.get('notionEmbedUrl') || '')); }
    catch (error) { toast.error((error as Error).message); return; }
    let customSettings = undefined;
    if (showAdvanced && intervalsStr.trim()) {
      const intervals = intervalsStr.split(",").map(s => Number(s.trim()));
      if (intervals.some(n => !Number.isInteger(n) || n < 1 || n > 730)) {
        toast.error("Use intervalos inteiros entre 1 e 730 dias, separados por vírgula."); return;
      }
      const baseQ =
        typeof baseQuestions === "number"
          ? baseQuestions
          : IMPORTANCE_LEVELS.find((i) => i.id === importance)?.baseQ || 20;
      if (intervals.length > 0) {
        customSettings = { intervals, baseQuestions: baseQ };
      }
    }

    const reviews = isNew ? generateSmartSchedule(studyDate, config?.examDate, importance, [], undefined, customSettings) : safeTopic.reviews;

    const updated = {
      ...safeTopic,
      title,
      subarea: subarea || "",
      tags: [...new Set([...tags, ...(newTagInput.trim() ? [newTagInput.trim()] : [])])],
      area,
      importance,
      status: (fd.get("topicStatus") || "backlog") as Topic["status"],
      studyDate,
      reviews,
      linkedLessons, notionLink, notionEmbedUrl,
      customSettings,
      updatedAt: Date.now(),
    };
    onSave(updated);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isNew ? "Nova matéria" : "Editar matéria"}
      creator
    >
      <div className="rf-editor-body">
        {!isNew && (
          <div className="flex p-2 bg-slate-50/50 dark:bg-white/5 border-b border-black/5 dark:border-white/5 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("details")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${activeTab === "details" ? "bg-white dark:bg-white/10 shadow-sm text-blue-600 dark:text-blue-400" : "text-slate-400 hover:text-slate-600 dark:text-slate-500"}`}
            >
              <LayoutList size={14} /> Detalhes
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${activeTab === "history" ? "bg-white dark:bg-white/10 shadow-sm text-blue-600 dark:text-blue-400" : "text-slate-400 hover:text-slate-600 dark:text-slate-500"}`}
            >
              <History size={14} /> Histórico
            </button>
          </div>
        )}

        {activeTab === "details" ? (
          <form onSubmit={handleSubmit} className="rf-creator-form">
            <div className="rf-creator-scroll">
              <p className="rf-form-intro">Defina o que você vai estudar. O ReviewFlow organiza as próximas revisões.</p>
              <label className="rf-field">Nome da matéria
                <input name="title" defaultValue={safeTopic.title || ""} autoFocus required maxLength={200} placeholder="Ex.: Diabetes ou Direito constitucional" />
              </label>
              <div className="rf-form-grid">
                <label className="rf-field">Área do conhecimento
                  <select name="area" defaultValue={safeTopic.area || "geral"}>
                    {AREAS.map(a => <option key={a.id} value={a.id}>{a.full}</option>)}
                  </select>
                </label>
                <label className="rf-field">Data de início
                  <input name="date" type="date" required defaultValue={safeTopic.studyDate || getTodayStr()} />
                </label>
              </div>
              <fieldset className="rf-priority">
                <legend>Prioridade</legend>
                <div className="rf-priority-options">
                  {(["optional", "low", "medium", "high", "extreme"] as const).map(lvl => <label key={lvl}>
                    <input type="radio" name="importance" value={lvl} defaultChecked={(safeTopic.importance || "medium") === lvl} />
                    <span>{IMPORTANCE_LEVELS.find(level => level.id === lvl)?.label}</span>
                  </label>)}
                </div>
                <p className="rf-field-hint">Define o volume de questões sugerido para as revisões.</p>
              </fieldset>
              <details className="rf-form-section">
                <summary>Anotações no Notion <span>Por matéria</span><ChevronDown size={16} /></summary>
                <div className="rf-section-fields">
                  <label className="rf-field">Link da página<input name="notionLink" defaultValue={safeTopic.notionLink || ""} placeholder="https://…notion.site/cardiologia…" /></label>
                  <label className="rf-field">Incorporar dentro do app (opcional)<textarea name="notionEmbedUrl" defaultValue={safeTopic.notionEmbedUrl || ""} placeholder="Cole o código de Incorporar esta página ou o endereço src do iframe" rows={2} /></label>
                  <p className="rf-field-hint">No Notion publicado, use Incorporar esta página e copie o código. Páginas privadas continuam acessíveis pelo botão Abrir no Notion.</p>
                </div>
              </details>
              <details className="rf-form-section">
                <summary>Organização <span>Opcional</span><ChevronDown size={16} /></summary>
                <div className="rf-section-fields">
                  <label className="rf-field">Etapa no quadro Kanban<select name="topicStatus" defaultValue={safeTopic.status || 'backlog'}><option value="backlog">A fazer</option><option value="studying">Estudando</option><option value="reviewing">Revisando</option><option value="mastered">Dominado</option></select></label>
                  <label className="rf-field">Tópico específico
                    <input name="subarea" defaultValue={safeTopic.subarea || ""} placeholder="Ex.: Endocrinologia" />
                  </label>
                  <label className="rf-field">Tags
                    <input value={newTagInput} onChange={e => setNewTagInput(e.target.value)} onKeyDown={handleAddTag} placeholder="Digite e pressione Enter" />
                  </label>
                  {!!tags.length && <div className="rf-chips">{tags.map((tag, idx) => <span key={tag}>{tag}<button type="button" aria-label={`Remover tag ${tag}`} onClick={() => handleRemoveTag(idx)}><X size={13} /></button></span>)}</div>}
                  <label className="rf-field">Aulas vinculadas
                    <div className="rf-inline-field"><input value={newLessonInput} onChange={e => setNewLessonInput(e.target.value)} placeholder="Nome da aula" onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleAddLesson(newLessonInput.trim()); } }} /><button type="button" aria-label="Adicionar aula" onClick={() => handleAddLesson(newLessonInput.trim())}><Plus size={18} /></button></div>
                  </label>
                  {!!linkedLessons.length && <div className="rf-chips">{linkedLessons.map((lesson, idx) => <span key={lesson}>{lesson}<button type="button" aria-label={`Remover aula ${lesson}`} onClick={() => handleRemoveLesson(idx)}><X size={13} /></button></span>)}</div>}
                </div>
              </details>
              <div className="rf-form-section">
                <button type="button" className="rf-section-toggle" aria-expanded={showAdvanced} onClick={() => setShowAdvanced(!showAdvanced)}>Personalizar revisões <span>Avançado</span><ChevronDown size={16} /></button>
                {showAdvanced && <div className="rf-section-fields">
                  <p className="rf-field-hint">Deixe os intervalos vazios para usar o algoritmo definido nas configurações.</p>
                  <label className="rf-field">Intervalos em dias<input value={intervalsStr} onChange={e => setIntervalsStr(e.target.value)} placeholder="1, 7, 15, 30" /></label>
                  <label className="rf-field">Meta de questões por revisão<input type="number" min="1" step="1" value={baseQuestions} onChange={e => setBaseQuestions(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Ex.: 20" /></label>
                </div>}
              </div>
            </div>
            <div className="rf-form-footer">
              {onDelete && !isNew && <button className="rf-delete" type="button" onClick={() => { if (window.confirm("Tem certeza que deseja excluir esta matéria?")) { onDelete(safeTopic.id); onClose(); } }}><Trash2 size={16} />Excluir</button>}
              <button className="rf-cancel" type="button" onClick={onClose}>Cancelar</button>
              <button className="rf-save" type="submit">{isNew ? "Criar matéria" : "Salvar alterações"}<ArrowRight size={16} /></button>
            </div>
          </form>
        ) : (
          // ... (Keep existing history tab) ...
          <div className="p-4 space-y-3">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wide text-center mb-2">
              Cronograma de Revisões
            </div>
            {safeTopic.reviews.map((r, i) => {
              const isDone = r.done;
              const isLate = !isDone && r.date < getTodayStr();
              const acc =
                r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
              return (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border ${isDone ? "bg-white dark:bg-white/5 border-slate-100 dark:border-white/5" : "bg-slate-50 dark:bg-white/5 border-dashed border-slate-200 dark:border-white/5"} flex items-center justify-between group transition-all hover:border-slate-300 dark:hover:border-white/20`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold uppercase shadow-sm ${isDone ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20" : "bg-slate-200 text-slate-500 dark:bg-white/10"}`}
                    >
                      {r.label.split(":")[0]}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {formatDate(r.date)}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400">
                        {r.label}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {isDone ? (
                      <div className="text-right">
                        <div
                          className={`text-xs font-black ${getPerformanceColor(acc, 80, "text")}`}
                        >
                          {acc}%
                        </div>
                        <div className="text-[9px] font-bold text-slate-400">
                          {r.correct}/{r.total}
                        </div>
                      </div>
                    ) : (
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                        {isLate ? (
                          <span className="text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md">
                            Atrasado
                          </span>
                        ) : (
                          "Pendente"
                        )}
                      </div>
                    )}
                    {onEditReview && (
                      <button
                        onClick={() => onEditReview(i)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};

// ... (Rest of modals.tsx remain unchanged) ...
export const EditReviewHistoryModal = ({
  isOpen,
  onClose,
  topic,
  reviewIdx,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  topic: Topic | null;
  reviewIdx: number | null;
  onSave: (data: { date: string; correct: number; total: number }) => void;
}) => {
  if (!isOpen || !topic || reviewIdx === null || !topic.reviews[reviewIdx]) return null;
  const review = topic.reviews[reviewIdx];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const correct = Number(fd.get("correct")), total = Number(fd.get("total"));
    if (!Number.isInteger(total) || total < 1 || !Number.isInteger(correct) || correct < 0 || correct > total) { toast.error('Informe total positivo e acertos entre zero e o total.'); return; }
    onSave({
      date: fd.get("date") as string,
      correct: parseInt(fd.get("correct") as string),
      total: parseInt(fd.get("total") as string),
    });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Registro">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="text-center pb-2">
          <h4 className="font-bold text-slate-800 dark:text-white">
            {topic.title}
          </h4>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
            {review.label}
          </span>
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">
            Data Realizada
          </label>
          <input
            name="date"
            type="date"
            defaultValue={review.date}
            className="w-full p-4 rounded-2xl bg-white dark:bg-black/20 text-sm font-bold outline-none text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 appearance-none min-h-[54px]"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest pl-1">
              Acertos
            </label>
            <input
              name="correct"
              type="number"
              defaultValue={review.correct}
              className="w-full p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 font-black text-2xl text-center outline-none border border-emerald-100 dark:border-emerald-500/20 appearance-none"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">
              Total
            </label>
            <input
              name="total"
              type="number"
              defaultValue={review.total}
              className="w-full p-4 rounded-2xl bg-white dark:bg-black/20 text-slate-700 dark:text-slate-200 font-black text-2xl text-center outline-none border border-slate-200 dark:border-white/10 appearance-none"
              required
            />
          </div>
        </div>
        <button className="w-full py-4 bg-blue-600 dark:bg-blue-500 text-white font-bold text-sm rounded-[20px] shadow-xl active:scale-[0.98] transition-all uppercase tracking-wide">
          Atualizar Registro
        </button>
      </form>
    </Modal>
  );
};

export const OptimizationResultModal = ({
  isOpen,
  onClose,
  onConfirm,
  changes,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  changes: OptimizationChange[];
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Resultado da Otimização">
      <div className="flex flex-col h-[70vh]">
        <div className="p-6 pb-2">
          <p className="text-sm text-slate-500 font-medium mb-4">
            O algoritmo reorganizou sua agenda para equilibrar a carga diária.
            {changes.length === 0
              ? " Nenhuma alteração foi necessária."
              : ` Foram propostas ${changes.length} alterações.`}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6">
          {changes.length > 0 && (
            <div className="space-y-2">
              {changes.map((change, i) => (
                <div
                  key={i}
                  className="bg-slate-50 dark:bg-white/5 rounded-xl p-3 border border-slate-100 dark:border-white/5 flex items-center justify-between"
                >
                  <div className="overflow-hidden">
                    <div className="font-bold text-xs text-slate-800 dark:text-white truncate">
                      {change.title}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      {change.label}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <div className="text-[10px] font-bold text-red-400 line-through decoration-red-400">
                      {formatDate(change.from)}
                    </div>
                    <ArrowRight size={12} className="text-slate-400" />
                    <div className="text-[10px] font-bold text-emerald-500">
                      {formatDate(change.to)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-6 pt-4 border-t border-slate-100 dark:border-white/5 mt-auto bg-white/50 dark:bg-[#121214]/50 backdrop-blur-md z-10 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-bold rounded-[20px] active:scale-95 transition-all uppercase tracking-wide text-xs"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-[2] py-4 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-[20px] active:scale-95 transition-all uppercase tracking-wide shadow-lg text-xs"
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const SupportModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Apoie o ReviewFlow">
      <div className="p-5 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-pink-500/30">
          <Heart size={32} strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">Ajude a Manter o Site</h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          O ReviewFlow é 100% gratuito e não possui propagandas intrusivas. Porém, manter os servidores, banco de dados e domínios gera custos mensais.
          Sua doação ajuda a manter a plataforma no ar para todos os estudantes. Qualquer valor faz a diferença!
        </p>

        <div className="bg-slate-50 dark:bg-black/20 p-5 rounded-2xl border border-slate-200 dark:border-white/10 w-full mb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
               <QRCodeCanvas value="00020126460014br.gov.bcb.pix0124378c679e-d198-46c0-bac6-47c2580ead635204000053039865802BR5913LUIS MARCONDES6009SAO PAULO62140510ReviewFlow63047C44" size={160} level="M" />
            </div>
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Chave PIX (Aleatória)</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-[11px] text-slate-600 dark:text-slate-300 font-bold break-all select-all">
              378c679e-d198-46c0-bac6-47c2580ead63
            </code>
            <button 
              onClick={() => {
                navigator.clipboard.writeText("378c679e-d198-46c0-bac6-47c2580ead63");
                alert("Chave PIX copiada!");
              }}
              className="w-10 h-10 shrink-0 flex items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md shadow-blue-500/20"
            >
              <ClipboardList size={16} />
            </button>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full h-12 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-white rounded-xl font-bold transition-all shadow-sm active:scale-[0.98]"
        >
          Voltar
        </button>
      </div>
    </Modal>
  );
};

export const SettingsModal = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  syncKey,
  onSaveKey,
  onExport,
  onImport,
  themeMode,
  setThemeMode,
  runOptimization,
  onShowOptimizationInfo,
  status,
  installPrompt,
  onInstallApp,
  onOpenTutorial,
}: any) => {
  const [tempKey, setTempKey] = useState(syncKey);
  const [tempConfig, setTempConfig] = useState<UserConfig>(
    config || {
      examDate: getTodayStr(),
      targetAccuracy: 80,
      activeSchedule: "MEDCOF",
    },
  );
  const [activeTab, setActiveTab] = useState<
    "geral" | "algoritmo" | "premium" | "dados"
  >("geral");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTempKey(syncKey);
  }, [syncKey]);

  // Only update tempConfig when the modal opens to prevent overwriting user changes during sync
  useEffect(() => {
    if (isOpen && config) {
      setTempConfig({
        ...config,
        notifications: config.notifications || {
          enabled: false,
          time: "08:00",
          showModules: true,
          showQuestionCount: true,
          showNextTasks: false,
        },
      });
      setActiveTab("geral");
    }
  }, [isOpen]);

  const handleNotificationToggle = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isEnabled = e.target.checked;

    if (isEnabled) {
      if (!("Notification" in window)) {
        alert("Este navegador não suporta notificações desktop.");
        return;
      }

      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          setTempConfig((prev) => ({
            ...prev,
            notifications: { ...prev.notifications!, enabled: true },
          }));
        } else {
          alert(
            "Você precisa permitir as notificações no navegador para ativar este recurso.",
          );
          // Force update to unchecked if it was checked visually
          setTempConfig((prev) => ({
            ...prev,
            notifications: { ...prev.notifications!, enabled: false },
          }));
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
        alert("Erro ao solicitar permissão de notificação.");
      }
    } else {
      setTempConfig((prev) => ({
        ...prev,
        notifications: { ...prev.notifications!, enabled: false },
      }));
    }
  };

  const handleSave = () => {
    const key = tempKey.trim();
    if (key && key !== syncKey && !validSyncCode(key)) {
      toast.error('Use até 128 letras, números, hífens ou sublinhados. Códigos curtos são aceitos.');
      return;
    }
    if (status === 'syncing' && key !== syncKey) { toast.error('Aguarde a sincronização terminar.'); return; }
    let savedConfig: UserConfig;
    try { savedConfig = { ...tempConfig, notionHomeUrl: notionURL(tempConfig.notionHomeUrl || ''), notionHomeEmbedUrl: notionURL(tempConfig.notionHomeEmbedUrl || '') }; }
    catch (error) { toast.error((error as Error).message); return; }
    onSaveKey(tempKey);
    if (!syncKey || !key || key === syncKey) onSaveConfig(savedConfig);
    onClose();
  };

  const statusContent = (
    <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-full border border-black/5 dark:border-white/5">
      {status === "online" && (
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
      )}
      {status === "offline" && (
        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
      )}
      {status === "syncing" && (
        <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"></div>
      )}
      {status === "error" && (
        <div className="w-2 h-2 rounded-full bg-red-500"></div>
      )}
      <span className="text-[10px] font-bold text-slate-500 uppercase">
        {status}
      </span>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ajustes"
      headerContent={statusContent}
    >
      <div className="flex flex-col h-[75vh] sm:h-[600px]">
        {/* Tabs Header */}
        <div className="flex px-4 pt-2 -mb-px overflow-x-auto hide-scrollbar border-b border-slate-100 dark:border-white/5 shrink-0 gap-4">
          <button
            onClick={() => setActiveTab("geral")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${activeTab === "geral" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            Geral
          </button>
          <button
            onClick={() => setActiveTab("algoritmo")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${activeTab === "algoritmo" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            Algoritmo
          </button>
          <button
            onClick={() => setActiveTab("premium")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${activeTab === "premium" ? "border-amber-500 text-amber-600 dark:text-amber-400" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            🌟 Foco Auto
          </button>
          <button
            onClick={() => setActiveTab("dados")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${activeTab === "dados" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            Dados
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
          {/* --------- GERAL --------- */}
          {activeTab === "geral" && (
            <div className="space-y-6 animate-fade-in">
              <button
                onClick={onOpenTutorial}
                className="w-full p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl flex items-center justify-between gap-3 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-transform group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <HelpCircle size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold opacity-80 uppercase">
                      Novo aqui?
                    </div>
                    <div className="font-black text-sm">Como usar o App</div>
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className="opacity-60 group-hover:translate-x-1 transition-transform"
                />
              </button>
              {installPrompt && (
                <button
                  onClick={onInstallApp}
                  className="w-full p-4 bg-blue-600 dark:bg-blue-500 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-black/10 active:scale-[0.98] transition-transform animate-scale-in"
                >
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Smartphone size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold opacity-80 uppercase">
                      Disponível
                    </div>
                    <div className="font-black text-sm">
                      Instalar Aplicativo
                    </div>
                  </div>
                </button>
              )}

              <div className="p-5 bg-white dark:bg-white/5 rounded-[24px] space-y-5 border border-slate-100 dark:border-white/5 shadow-sm">
                <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                  <Settings size={18} className="text-slate-500" />{" "}
                  Configurações Básicas
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">
                      Aprov. Alvo (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={tempConfig.targetAccuracy}
                      onChange={(e) =>
                        setTempConfig((p: any) => ({
                          ...p,
                          targetAccuracy: Number(e.target.value),
                        }))
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/20 text-xs font-bold outline-none border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white appearance-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">
                      Data da Prova
                    </label>
                    <input
                      type="date"
                      value={tempConfig.examDate}
                      onChange={(e) =>
                        setTempConfig((p: any) => ({
                          ...p,
                          examDate: e.target.value,
                        }))
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/20 text-xs font-bold outline-none border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white appearance-none min-h-[44px]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">
                      Cronograma (Aulas)
                    </label>
                    <select
                      value={tempConfig.activeSchedule || 'MEDCOF'}
                      onChange={(e) =>
                        setTempConfig((p: any) => ({
                          ...p,
                          activeSchedule: e.target.value,
                        }))
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/20 text-xs font-bold outline-none border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white appearance-none min-h-[44px]"
                    >
                      <option value="MEDCOF">Extensivo Medcof</option>
                      <option value="ESTRATEGIA">Extensivo Estratégia</option>
                      <option value="MEDREVIEW">Extensivo MedReview</option>
                      <option value="FAFIPA">Concurso Público - FAFIPA</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">
                      Link da Plataforma de Estudos (Curssinho)
                    </label>
                    <input
                      type="url"
                      placeholder="https://app.medcof.com.br"
                      value={tempConfig.studyLink || ""}
                      onChange={(e) =>
                        setTempConfig((p: any) => ({
                          ...p,
                          studyLink: e.target.value,
                        }))
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/20 text-xs font-bold outline-none border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white appearance-none min-h-[44px]"
                    />
                  </div>
                </div>

                <details className="rf-form-section"><summary>Caderno inicial do Notion <span>Opcional</span><ChevronDown size={16} /></summary><div className="rf-section-fields">
                  <label className="rf-field">Link do caderno<input value={tempConfig.notionHomeUrl || ''} onChange={e => setTempConfig(prev => ({ ...prev, notionHomeUrl: e.target.value }))} placeholder="https://…notion.site/…" /></label>
                  <label className="rf-field">Código de incorporação<textarea rows={2} value={tempConfig.notionHomeEmbedUrl || ''} onChange={e => setTempConfig(prev => ({ ...prev, notionHomeEmbedUrl: e.target.value }))} placeholder="Cole o código de Incorporar esta página" /></label>
                  <p className="rf-field-hint">Cada matéria pode ter um caderno diferente. Configure na edição da matéria → Anotações no Notion.</p>
                </div></details>
                <BackgroundPicker value={tempConfig.backgroundColor} onChange={backgroundColor => setTempConfig(prev => ({ ...prev, backgroundColor }))} />
                <SurfacePicker value={tempConfig.surfaceStyle} onChange={surfaceStyle => setTempConfig(prev => ({ ...prev, surfaceStyle }))} />

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Modo Escuro
                  </span>
                  <button
                    aria-label={themeMode === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
                    onClick={() =>
                      setThemeMode(themeMode === "light" ? "dark" : "light")
                    }
                    className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-lg shadow-sm border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {themeMode === "light" ? (
                      <Moon size={18} className="text-slate-500" />
                    ) : (
                      <Sun size={18} className="text-amber-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-white/5 rounded-[24px] space-y-4 border border-slate-100 dark:border-white/5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                    <Bell size={18} className="text-yellow-500" /> Alertas
                    Matinais
                  </h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={tempConfig.notifications?.enabled || false}
                      onChange={handleNotificationToggle}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-500"></div>
                  </label>
                </div>
                {tempConfig.notifications?.enabled && (
                  <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-white/5 animate-scale-in">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Horário do Alerta
                      </span>
                      <input
                        type="time"
                        value={tempConfig.notifications?.time || "08:00"}
                        onChange={(e) =>
                          setTempConfig((prev) => ({
                            ...prev,
                            notifications: {
                              ...prev.notifications!,
                              time: e.target.value,
                            },
                          }))
                        }
                        className="w-24 p-2 rounded-xl bg-slate-50 dark:bg-black/20 text-xs font-bold outline-none border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white appearance-none text-center"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --------- ALGORITMO --------- */}
          {activeTab === "algoritmo" && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 bg-white dark:bg-white/5 rounded-[24px] space-y-4 border border-slate-100 dark:border-white/5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                    <Zap size={18} className="text-amber-500" /> Revisão adaptativa · FSRS-6
                  </h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={tempConfig.useFSRS || false}
                      onChange={(e) =>
                        setTempConfig((prev: any) => ({
                          ...prev,
                          useFSRS: e.target.checked,
                        }))
                      }
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Usa seu histórico de conclusões, acertos e dificuldade para calcular a próxima revisão. Mantém uma revisão futura por tema, por tantos anos quanto você continuar estudando.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="text-sm text-slate-600 dark:text-slate-300">Retenção desejada (%)
                    <input aria-label="Retenção desejada (%)" type="number" min="80" max="97" step="1" value={Math.round((tempConfig.fsrsRetention ?? 0.9) * 100)} onChange={e => setTempConfig(p => ({ ...p, fsrsRetention: Math.min(97, Math.max(80, Number(e.target.value) || 90)) / 100 }))} className="mt-2 w-full rounded-xl border p-3 bg-slate-50 dark:bg-zinc-900" />
                  </label>
                  <label className="text-sm text-slate-600 dark:text-slate-300">Intervalo máximo (dias)
                    <input aria-label="Intervalo máximo (dias)" type="number" min="1" max="36500" value={tempConfig.fsrsMaximumInterval ?? 730} onChange={e => setTempConfig(p => ({ ...p, fsrsMaximumInterval: Math.min(36500, Math.max(1, Number(e.target.value) || 730)) }))} className="mt-2 w-full rounded-xl border p-3 bg-slate-50 dark:bg-zinc-900" />
                  </label>
                </div>
                <p className="text-xs text-slate-500">Mais retenção significa revisões mais frequentes. Acertos em questões são uma estimativa de lembrança, não uma medição direta de memória. Intervalos personalizados abaixo se aplicam ao modo fixo.</p>

                <div className="space-y-1.5 pt-4 border-t border-slate-100 dark:border-white/5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">
                    Intervalos Padrão (em dias, separados por vírgula)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 1, 7, 30, 90"
                    value={tempConfig.customReviewIntervals?.join(", ") || ""}
                    onChange={(e) => {
                      const intervals = e.target.value.split(",").map(Function.prototype.call, String.prototype.trim).map(Number).filter(n => !isNaN(n) && n > 0);
                      setTempConfig((prev: any) => ({
                        ...prev,
                        customReviewIntervals: intervals.length > 0 ? intervals : undefined,
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/20 text-xs font-bold outline-none border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                  <p className="text-[10px] text-slate-500">Substitui o padrão de 5 revisões se o FSRS não estiver ativo ou se quiser começar matérias com outra base.</p>
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-white/5 rounded-[24px] space-y-4 border border-slate-100 dark:border-white/5 shadow-sm">
                <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                  <Target size={18} className="text-blue-500" /> Limites de
                  Agendamento
                </h4>
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">
                    Questões Máximas por Dia
                  </label>
                  <input
                    type="number"
                    value={tempConfig.dailyQuestionLimit || 150}
                    onChange={(e) =>
                      setTempConfig((prev: any) => ({
                        ...prev,
                        dailyQuestionLimit: Number(e.target.value),
                      }))
                    }
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/20 text-xs font-bold outline-none border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white appearance-none"
                  />
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-white/5 rounded-[24px] space-y-4 border border-slate-100 dark:border-white/5 shadow-sm">
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center justify-between">
                    Otimização Manual{" "}
                    <button
                      onClick={onShowOptimizationInfo}
                      className="p-1 text-slate-400 hover:text-blue-500"
                    >
                      <Info size={16} />
                    </button>
                  </h4>
                  <p className="text-[10px] text-slate-500 mb-4 mt-1">
                    Reorganiza todo o seu histórico e agenda manualmente.
                  </p>
                </div>
                <button
                  onClick={runOptimization}
                  className="w-full p-4 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-blue-500/30 hover:scale-[1.02] transition-all"
                >
                  <Zap size={18} className="text-white" />{" "}
                  <span className="font-bold uppercase tracking-wide text-xs">
                    Otimizar Cronograma
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* --------- PREMIUM --------- */}
          {activeTab === "premium" && (
            <div className="space-y-6 animate-fade-in relative min-h-[300px]">
              {/* Premium Lock Overlay (If not premium) */}
              {!tempConfig.isPremium && (
                <div className="absolute inset-0 z-10 bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 text-center shadow-[0_0_50px_rgba(251,191,36,0.1)]">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-full flex items-center justify-center mb-4 shadow-xl shadow-amber-500/30">
                    <Star size={32} className="fill-white" />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">
                    Foco Automático
                  </h3>
                  <p className="text-sm font-medium text-slate-500 mb-6 max-w-[280px]">
                    Desaloque-se do gerenciamento. O sistema molda seu dia
                    ativamente baseado no método FSRS, limitando o acúmulo de
                    revisões.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setTempConfig((p: any) => ({ ...p, isPremium: true }))
                    }
                    className="px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 font-black rounded-xl shadow-xl transition-transform active:scale-95 uppercase tracking-widest text-xs"
                  >
                    Ativar Modo Pro (Dev)
                  </button>
                </div>
              )}

              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-[32px] space-y-6 border border-amber-200 dark:border-amber-500/20">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-lg text-amber-800 dark:text-amber-400 flex items-center gap-2">
                      <Sparkles size={20} className="fill-amber-500" />{" "}
                      Otimização Dinâmica
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={tempConfig.autoOptimize || false}
                        onChange={(e) =>
                          setTempConfig((prev) => ({
                            ...prev,
                            autoOptimize: e.target.checked,
                          }))
                        }
                        disabled={!tempConfig.isPremium}
                      />
                      <div className="w-12 h-7 bg-amber-200/50 peer-focus:outline-none rounded-full peer dark:bg-zinc-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500"></div>
                    </label>
                  </div>
                  <p className="text-xs text-amber-700/80 dark:text-amber-400/80 leading-relaxed font-medium">
                    Todos os dias, o agendamento local recalcula a prioridade das suas
                    revisões, impedindo que os números de "tarefas do dia" saiam
                    de controle, priorizando sempre as essenciais para o seu
                    aproveitamento.
                  </p>
                </div>
                <div className="p-4 bg-white/60 dark:bg-black/30 rounded-2xl flex items-center justify-between shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                      Teto Diário
                    </span>
                    <span className="text-[10px] text-amber-700/60 dark:text-amber-400/60">
                      Máx. permitida por dia
                    </span>
                  </div>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    disabled={!tempConfig.isPremium}
                    value={tempConfig.dailyQuestionLimit || 200}
                    onChange={(e) =>
                      setTempConfig({
                        ...tempConfig,
                        dailyQuestionLimit: parseInt(e.target.value) || 200,
                      })
                    }
                    className="w-20 p-2.5 text-center rounded-xl bg-white dark:bg-black/50 border border-amber-200 dark:border-amber-500/20 text-sm font-black text-amber-900 dark:text-amber-300 outline-none focus:border-amber-500 shadow-inner"
                  />
                </div>
              </div>
            </div>
          )}

          {/* --------- DADOS --------- */}
          {activeTab === "dados" && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 bg-white dark:bg-white/5 rounded-[24px] border border-slate-100 dark:border-white/10 space-y-4 shadow-sm">
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                    <Cloud size={18} className="text-blue-500" /> Backup em
                    Nuvem
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-1 mb-4">
                    Use um código simples para acessar seus estudos nos seus
                    seus dispositivos.
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                    Código de sincronização
                  </label>
                  <input
                    type="password"
                    value={tempKey}
                    onChange={(e) => setTempKey(e.target.value)}
                    placeholder="Ex.: estudante-ana"
                    className="w-full bg-slate-50 dark:bg-black/20 text-slate-900 dark:text-white p-3.5 rounded-xl text-sm font-bold border border-slate-200 dark:border-white/5 outline-none focus:border-blue-500/50"
                  />
                  <button type="button" onClick={() => setTempKey(crypto.randomUUID().replaceAll('-', ''))} className="mt-2 rounded-lg bg-blue-600 text-white px-4 py-3 text-sm">Gerar chave segura</button>
                  <p className="text-xs text-slate-500 mt-2">Use o mesmo código nos seus dispositivos. Quem conhece o código pode acessar os dados vinculados. Salvamos no aparelho imediatamente; o envio automático é agrupado a cada 10 minutos com alterações. O perfil prioritário usa 30 segundos. O botão de sincronizar permite antecipar o envio, com intervalo mínimo de 1 minuto.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onExport}
                  className="p-4 bg-slate-100 dark:bg-zinc-800 rounded-2xl flex flex-col items-center gap-3 text-slate-700 dark:text-slate-300 font-bold active:scale-95 transition-all outline-none border border-black/5 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-zinc-700"
                >
                  <Download size={24} />
                  <span className="text-[10px] uppercase tracking-wide">
                    Exportar Backup
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 bg-slate-100 dark:bg-zinc-800 rounded-2xl flex flex-col items-center gap-3 text-slate-700 dark:text-slate-300 font-bold active:scale-95 transition-all outline-none border border-black/5 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-zinc-700"
                >
                  <Upload size={24} />
                  <span className="text-[10px] uppercase tracking-wide">
                    Importar Backup
                  </span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".json"
                  onChange={onImport}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-white/80 dark:bg-[#121214]/80 backdrop-blur-xl z-20 shrink-0">
          <button
            onClick={handleSave}
            className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-500 font-black rounded-[20px] shadow-xl active:scale-[0.98] transition-all uppercase tracking-widest text-xs flex justify-center items-center gap-2"
          >
            <Check size={16} strokeWidth={3} /> Salvar Alterações
          </button>
          <button
            onClick={onClose}
            className="w-full mt-3 py-2 text-slate-500 dark:text-slate-400 font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 active:scale-95 transition-all text-xs"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const SimuladoModal = ({ isOpen, onClose, simulado, onSave, onDelete, topics }: {
  isOpen: boolean; onClose: () => void; simulado: Simulado | null;
  onSave: (s: any) => void; onDelete?: (id: string) => void; topics: Topic[];
}) => {
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [simTopicSearch, setSimTopicSearch] = useState("");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [total, setTotal] = useState("100");
  const [correct, setCorrect] = useState("");
  useEffect(() => {
    if (!isOpen) return;
    setSelectedDifficulties(simulado?.difficultyTopics || []);
    setSelectedLessons(simulado?.difficultyLessons || []);
    setSimTopicSearch(""); setExpandedTopic(null);
    setTotal(String(simulado?.totalQuestions ?? 100));
    setCorrect(simulado ? String(simulado.correctCount) : "");
  }, [isOpen, simulado]);
  const filteredTopics = topics.filter(t => !t.deleted && (t.title.toLocaleLowerCase().includes(simTopicSearch.trim().toLocaleLowerCase()) || t.linkedLessons?.some(l => l.toLocaleLowerCase().includes(simTopicSearch.trim().toLocaleLowerCase()))));
  const validScore = correct !== "" && Number.isInteger(Number(correct)) && Number.isInteger(Number(total)) && Number(total) > 0 && Number(correct) >= 0 && Number(correct) <= Number(total);
  const toggle = (list: string[], value: string) => list.includes(value) ? list.filter(v => v !== value) : [...list, value];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("institution") || "").trim();
    if (!name) { toast.error("Informe o nome do simulado."); return; }
    if (!validScore) { toast.error("Os acertos devem ficar entre zero e o total de questões."); return; }
    const date = new Date(String(fd.get("date")) + "T12:00:00");
    if (Number.isNaN(date.getTime())) { toast.error("Informe uma data válida."); return; }
    onSave({ id: simulado?.id, name, year: String(fd.get("year")), totalQuestions: Number(total), correctCount: Number(correct), dateTaken: date.toISOString(), difficultyTopics: selectedDifficulties, difficultyLessons: selectedLessons, updatedAt: Date.now() });
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={simulado ? "Editar simulado" : "Registrar simulado"} creator>
    <form onSubmit={handleSubmit} className="rf-creator-form">
      <div className="rf-creator-scroll">
        <p className="rf-form-intro">Registre o resultado de uma prova para acompanhar sua evolução.</p>
        <label className="rf-field">Nome ou instituição
          <input name="institution" defaultValue={simulado?.name || ""} autoFocus required maxLength={200} placeholder="Ex.: USP — Simulado 01" />
        </label>
        <div className="rf-form-grid">
          <label className="rf-field">Data da realização<input name="date" type="date" required defaultValue={simulado ? simulado.dateTaken.split("T")[0] : getTodayStr()} /></label>
          <label className="rf-field">Ano da prova<input name="year" type="number" min="1900" max="9999" step="1" required defaultValue={simulado?.year || new Date().getFullYear()} /></label>
        </div>
        <section className="rf-score-section" aria-label="Resultado">
          <div className="rf-score-heading"><span>Seu resultado</span><output aria-live="polite">{validScore ? `${Math.round(Number(correct) / Number(total) * 100)}% de acertos` : "Preencha os acertos"}</output></div>
          <div className="rf-form-grid">
            <label className="rf-field">Total de questões<input name="total" type="number" inputMode="numeric" min="1" step="1" required value={total} onChange={e => setTotal(e.target.value)} /></label>
            <label className="rf-field">Acertos<input name="correct" type="number" inputMode="numeric" min="0" max={Number(total) > 0 ? total : undefined} step="1" required placeholder="0" value={correct} onChange={e => setCorrect(e.target.value)} aria-describedby="score-hint" /></label>
          </div>
          <p id="score-hint" className="rf-field-hint">{correct !== "" && !validScore ? "Use números inteiros: os acertos não podem ultrapassar o total." : "Conte cada questão uma única vez."}</p>
        </section>
        <details className="rf-form-section" key={`${isOpen}-${simulado?.id || 'new'}`} open={(simulado?.difficultyTopics?.length || simulado?.difficultyLessons?.length) ? true : undefined}>
          <summary>Temas para reforçar <span>{selectedDifficulties.length + selectedLessons.length || "Opcional"}</span><ChevronDown size={16} /></summary>
          <div className="rf-section-fields">
            <p className="rf-field-hint">Marque matérias ou aulas em que teve dificuldade. Aulas selecionadas recebem 10% a mais de questões.</p>
            <label className="rf-field"><span className="sr-only">Buscar matéria ou aula</span><input type="search" placeholder="Buscar matéria ou aula…" value={simTopicSearch} onChange={e => setSimTopicSearch(e.target.value)} /></label>
            <div className="rf-topic-picker">
              {filteredTopics.map(t => <div className="rf-topic-option" key={t.id}>
                <div className="rf-topic-option-row">
                  <label><input type="checkbox" checked={selectedDifficulties.includes(t.id)} onChange={() => setSelectedDifficulties(prev => toggle(prev, t.id))} /><span>{t.title}</span></label>
                  {!!t.linkedLessons?.length && <button type="button" aria-label={`Aulas de ${t.title}`} aria-expanded={expandedTopic === t.id} onClick={() => setExpandedTopic(expandedTopic === t.id ? null : t.id)}><ChevronDown size={16} /></button>}
                </div>
                {expandedTopic === t.id && <div className="rf-lesson-options">{t.linkedLessons?.map(l => <label key={l}><input type="checkbox" checked={selectedLessons.includes(l)} onChange={() => setSelectedLessons(prev => toggle(prev, l))} /><span>{l}</span></label>)}</div>}
              </div>)}
              {!filteredTopics.length && <p className="rf-empty-options">{topics.some(t => !t.deleted) ? "Nenhuma matéria encontrada para esta busca." : "Cadastre uma matéria para associá-la ao resultado."}</p>}
            </div>
          </div>
        </details>
      </div>
      <div className="rf-form-footer">
        {onDelete && simulado && <button type="button" className="rf-delete" onClick={() => { if (window.confirm("Tem certeza que deseja excluir este simulado?")) { onDelete(simulado.id); onClose(); } }}><Trash2 size={16} />Excluir</button>}
        <button type="button" className="rf-cancel" onClick={onClose}>Cancelar</button>
        <button type="submit" className="rf-save">Salvar resultado<ArrowRight size={16} /></button>
      </div>
    </form>
  </Modal>;
};

export const ReviewModal = ({
  isOpen,
  onClose,
  topic,
  reviewIdx,
  onSubmit,
  targetAccuracy,
  onEditTopic,
}: any) => {
  const [formState, setFormState] = useState({
    correct: "",
    total: "20",
    difficulty: "medium",
    timeSpent: "",
  });
  const [showLessons, setShowLessons] = useState(false);

  useEffect(() => {
    if (isOpen && topic && reviewIdx !== null) {
      const target = topic.reviews[reviewIdx]?.targetQ || 20;
      setFormState({
        correct: "",
        total: String(target),
        difficulty: "medium",
        timeSpent: "",
      });
      setShowLessons(false);
    }
  }, [isOpen, topic, reviewIdx]);

  if (!isOpen || !topic || reviewIdx === null) return null;

  const currentReview = topic.reviews[reviewIdx];
  const correctNum = parseInt(formState.correct) || 0;
  const totalNum = parseInt(formState.total) || 1;
  const scorePercentage =
    totalNum > 0 ? Math.round((correctNum / totalNum) * 100) : 0;

  // Get history of previous reviews for this topic
  const previousReviews = topic.reviews
    .slice(0, reviewIdx)
    .filter((r: any) => r.done);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      correct: correctNum,
      total: totalNum,
      difficulty: formState.difficulty,
      timeSpent: (parseInt(formState.timeSpent) || 0) * 60, // Convert minutes to seconds
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Registrar Resultado"
      alignTopOnMobile={true}
    >
      <form onSubmit={handleFormSubmit} className="p-5 space-y-5">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h4 className="font-black text-lg text-slate-800 dark:text-white leading-tight">
              {topic.title}
            </h4>
            {onEditTopic && (
              <button
                type="button"
                onClick={onEditTopic}
                className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                title="Editar Disciplina/Matéria"
              >
                <Edit2 size={14} />
              </button>
            )}
          </div>
          <div className="flex items-center justify-center gap-2">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getAreaTheme(topic.area).bg} ${getAreaTheme(topic.area).text}`}
            >
              {topic.area}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {currentReview?.label}
            </span>
          </div>
          {topic.linkedLessons && topic.linkedLessons.length > 0 && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setShowLessons(!showLessons)}
                className="text-[10px] font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center justify-center gap-1 mx-auto transition-colors"
              >
                {showLessons ? "Ocultar Aulas" : "Ver Aulas Anexadas"}
                <ChevronDown
                  size={12}
                  className={`transition-transform ${showLessons ? "rotate-180" : ""}`}
                />
              </button>
              {showLessons && (
                <div className="mt-2 flex flex-col gap-1 max-h-24 overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-white/5 p-2 rounded-xl border border-slate-100 dark:border-white/5 text-left">
                  {topic.linkedLessons.map((lesson: string, idx: number) => (
                    <div
                      key={idx}
                      className="text-[10px] font-medium text-slate-600 dark:text-slate-300 truncate flex justify-between"
                    >
                      <span>• {lesson}</span>
                      <span className="text-slate-400 font-bold">
                        ~
                        {Math.max(
                          1,
                          Math.round(
                            (currentReview?.targetQ || 20) /
                              topic.linkedLessons.length,
                          ),
                        )}
                        q
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-3xl border border-slate-200/60 dark:border-white/5 flex items-center justify-between transition-all focus-within:border-slate-400 focus-within:bg-slate-100 dark:focus-within:bg-white/5 dark:focus-within:border-white/20">
            <div className="flex items-center gap-2">
              <input
                type="number"
                inputMode="numeric"
                value={formState.correct}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, correct: e.target.value }))
                }
                onFocus={(e) => e.target.select()}
                className="w-16 text-right text-4xl font-black bg-transparent outline-none text-emerald-600 dark:text-emerald-400 p-0 appearance-none placeholder-slate-300 dark:placeholder-slate-600"
                placeholder="0"
                autoFocus
              />
              <span className="text-3xl font-black text-slate-300 dark:text-slate-600">
                /
              </span>
              <input
                type="number"
                inputMode="numeric"
                value={formState.total}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, total: e.target.value }))
                }
                onFocus={(e) => e.target.select()}
                className="w-16 text-left text-4xl font-black bg-transparent outline-none text-slate-800 dark:text-white p-0 appearance-none placeholder-slate-300 dark:placeholder-slate-600"
                placeholder="20"
              />
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Aproveitamento
              </div>
              <div
                className={`text-2xl font-black tracking-tight ${getPerformanceColor(scorePercentage, targetAccuracy, "text")}`}
              >
                {scorePercentage}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-zinc-800/50 p-3 rounded-2xl border border-slate-200/60 dark:border-white/5 flex flex-col items-center justify-center gap-2 transition-all focus-within:border-purple-500/50 focus-within:bg-purple-50/50 dark:focus-within:bg-purple-900/10">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Clock size={10} /> Tempo Gasto
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  inputMode="numeric"
                  value={formState.timeSpent}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, timeSpent: e.target.value }))
                  }
                  className="w-10 text-center text-xl font-black bg-transparent outline-none text-slate-800 dark:text-white p-0 appearance-none placeholder-slate-300 dark:placeholder-slate-600"
                  placeholder="--"
                />
                <span className="text-xs font-bold text-slate-400">min</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-800/50 p-3 rounded-2xl border border-slate-200/60 dark:border-white/5 flex flex-col items-center justify-center gap-2">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Dificuldade
              </label>
              <div className="flex items-center gap-1 w-full justify-between px-1">
                {[
                  {
                    id: "easy",
                    emoji: "😄",
                    color:
                      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
                  },
                  {
                    id: "medium",
                    emoji: "😐",
                    color:
                      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
                  },
                  {
                    id: "hard",
                    emoji: "😓",
                    color:
                      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
                  },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() =>
                      setFormState((prev) => ({ ...prev, difficulty: lvl.id }))
                    }
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${formState.difficulty === lvl.id ? `scale-110 shadow-sm ${lvl.color}` : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"}`}
                    title={
                      lvl.id === "easy"
                        ? "Fácil"
                        : lvl.id === "medium"
                          ? "Médio"
                          : "Difícil"
                    }
                  >
                    {lvl.emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        {previousReviews.length > 0 && (
          <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-3 border border-slate-100 dark:border-white/5">
            <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
              <History size={10} /> Histórico
            </h5>
            <div className="space-y-1.5">
              {previousReviews.map((r: any, i: number) => {
                const rScore =
                  r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs border-b border-slate-100 dark:border-white/5 last:border-0 pb-1.5 last:pb-0"
                  >
                    <span className="font-bold text-slate-600 dark:text-slate-300">
                      {r.label}{" "}
                      <span className="text-[10px] text-slate-400 font-normal ml-1">
                        ({formatDate(r.date)})
                      </span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 text-[10px]">
                        {r.correct}/{r.total} questões
                      </span>
                      <span
                        className={`font-bold ${getPerformanceColor(rScore, targetAccuracy, "text")}`}
                      >
                        {rScore}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 pt-2">
          {onEditTopic && (
            <button
              type="button"
              onClick={onEditTopic}
              className="w-full py-3.5 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-2xl hover:bg-slate-200 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Edit2 size={16} />
              Editar Disciplina/Matéria
            </button>
          )}
          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 dark:bg-blue-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all uppercase tracking-wide"
          >
            Concluir Revisão
          </button>
        </div>
      </form>
    </Modal>
  );
};

export const OptimizationInfoModal = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Como Funciona a Otimização?"
    >
      <div className="p-6 space-y-6">
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <p>
            O algoritmo de otimização reajusta seu cronograma para garantir que
            você não perca revisões importantes.
          </p>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 font-bold">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white">
                Identificação de Atrasos
              </h4>
              <p className="text-xs mt-1 opacity-80">
                O sistema varre todo o banco de dados procurando revisões que
                deveriam ter sido feitas ontem ou antes (atraso maior que 1
                dia).
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 shrink-0 font-bold">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white">
                Priorização Inteligente
              </h4>
              <p className="text-xs mt-1 opacity-80">
                As revisões são ordenadas. Matérias mais antigas e de alta
                importância ganham prioridade para serem agendadas para{" "}
                <strong>Hoje</strong>.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shrink-0 font-bold">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white">
                Remanejamento Futuro
              </h4>
              <p className="text-xs mt-1 opacity-80">
                Se uma revisão R1 atrasada é movida para hoje, as revisões
                futuras (R2, R3) desse tópico também são empurradas para frente,
                mantendo o intervalo de espaçamento correto.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl text-xs font-medium text-slate-500 border border-slate-100 dark:border-white/5 flex gap-2">
          <Info className="shrink-0" size={16} />
          <p>
            Use esta função quando acumular muitas matérias. O sistema tentará
            limpar seu backlog trazendo o essencial para hoje.
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-full py-4 bg-blue-600 dark:bg-blue-500 text-white font-bold text-sm rounded-[20px] uppercase tracking-wide"
        >
          Entendi
        </button>
      </div>
    </Modal>
  );
};

export const DeepFocusModal = ({ isOpen, onClose, dueItems, onReview }: { isOpen: boolean; onClose: () => void; dueItems: any[]; onReview: (id: string, idx: number) => void }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      const nextMode = mode === 'focus' ? 'break' : 'focus';
      setMode(nextMode);
      setTimeLeft(nextMode === 'focus' ? 25 * 60 : 5 * 60);
      try {
          if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
      } catch(e) {}
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  const setTimerMode = (newMode: 'focus' | 'break') => {
      setIsActive(false);
      setMode(newMode);
      setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <Modal isOpen={isOpen} onClose={() => { setIsActive(false); onClose(); }} title="Modo Deep Focus" fullScreen={true} hideHeader={true}>
      <div className="p-4 sm:p-6 flex flex-col items-center justify-start flex-1 h-full w-full bg-white/50 dark:bg-[#121214]/50 relative pt-12 sm:pt-6">
        <button onClick={() => { setIsActive(false); onClose(); }} className="absolute top-4 right-4 p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-all active:scale-90 z-50">
            <X size={20} className="text-slate-500 dark:text-slate-300" />
        </button>
        <div className="flex gap-2 bg-slate-100/80 dark:bg-zinc-800/80 p-1.5 rounded-2xl w-full max-w-[240px] shadow-inner border border-slate-200/50 dark:border-white/5 mx-auto shrink-0 mt-4 sm:mt-0 mb-6 sm:mb-8">
            <button onClick={() => setTimerMode('focus')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${mode === 'focus' ? 'bg-white dark:bg-zinc-700 shadow-md text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>Foco</button>
            <button onClick={() => setTimerMode('break')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${mode === 'break' ? 'bg-white dark:bg-zinc-700 shadow-md text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>Pausa</button>
        </div>

        <div className="relative group flex justify-center items-center w-full mb-10 sm:mb-12 shrink-0">
            <div className={`absolute inset-0 blur-3xl opacity-20 transition-all duration-700 rounded-full w-56 h-56 sm:w-80 sm:h-80 mx-auto ${isActive ? 'opacity-40 scale-105' : 'opacity-20 scale-100'} ${mode === 'focus' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
            <div className={`w-56 h-56 sm:w-72 sm:h-72 rounded-full flex flex-col items-center justify-center border-[8px] sm:border-[12px] relative bg-white dark:bg-[#121214] shadow-2xl transition-all duration-500 ${mode === 'focus' ? 'border-blue-50 dark:border-blue-900/40 text-blue-600 dark:text-blue-400' : 'border-emerald-50 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400'}`}>
                <span className="text-6xl sm:text-8xl font-black tracking-tighter tabular-nums">{mins}:{secs}</span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1 sm:mt-4 opacity-50">{mode === 'focus' ? 'Pomodoro' : 'Descanso'}</span>
            </div>
        </div>

        <div className="flex gap-4 justify-center w-full shrink-0 mb-8 sm:mb-10">
            <button onClick={toggleTimer} className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white shadow-xl active:scale-95 transition-all duration-300 ${mode === 'focus' ? 'bg-gradient-to-tr from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-500/30' : 'bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-emerald-500/30'}`}>
                {isActive ? <span className="font-black text-xs sm:text-base uppercase tracking-widest">Pausa</span> : <PlayCircle size={32} className="sm:w-12 sm:h-12 ml-1" fill="currentColor" />}
            </button>
        </div>
        
        {mode === 'focus' && dueItems.length > 0 ? (
            <div className="w-full max-w-sm mx-auto shrink-0 pb-4">
                <h3 className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 text-center">Revisão Sugerida ({dueItems.length})</h3>
                <div 
                    className="bg-white dark:bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 flex items-center justify-between group cursor-pointer hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-md transition-all font-bold text-xs sm:text-sm" 
                    onClick={() => {
                        setIsActive(false);
                        onReview(dueItems[0].topic.id, dueItems[0].idx);
                    }}
                >
                    <div className="truncate pr-4 flex-1 text-slate-800 dark:text-slate-200">{dueItems[0].topic.title}</div>
                    <button className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl shrink-0 transition-colors shadow-sm shadow-blue-500/20">Iniciar</button>
                </div>
            </div>
        ) : (
            <div className="w-full max-w-sm mx-auto h-[60px] sm:h-[80px] shrink-0 pb-4"></div>
        )}
      </div>
    </Modal>
  );
};

