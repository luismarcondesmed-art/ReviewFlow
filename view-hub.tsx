
import React, { useState, useMemo } from 'react';
import { 
    Clock, CheckCircle2, Flame, BookOpen, ClipboardList, Plus, X, Calendar, ArrowRight, Zap, Target, SlidersHorizontal, Trash2
} from 'lucide-react';
import { Simulado, Topic, UserConfig, AreaType, ImportanceType } from './types';
import { getTodayStr, AREAS, formatDate, IMPORTANCE_LEVELS } from './utils';
import { TopicListItem, SimuladoCard, HeatmapWidget } from './components';

// Enhanced Inline Creator/Editor with Advanced Settings
const InlineTopicForm = ({ 
    initialTopic, 
    onSave, 
    onCancel, 
    onDelete 
}: { 
    initialTopic?: Partial<Topic>, 
    onSave: (t: any) => void, 
    onCancel: () => void,
    onDelete?: () => void
}) => {
    const [title, setTitle] = useState(initialTopic?.title || '');
    const [area, setArea] = useState<AreaType>(initialTopic?.area || 'clinica');
    const [importance, setImportance] = useState<ImportanceType>(initialTopic?.importance || 'medium');
    const [date, setDate] = useState(initialTopic?.studyDate || getTodayStr());
    
    // Advanced Settings
    const [showAdvanced, setShowAdvanced] = useState(!!initialTopic?.customSettings);
    const [intervalsStr, setIntervalsStr] = useState(initialTopic?.customSettings?.intervals.join(', ') || '');
    const [baseQuestions, setBaseQuestions] = useState<number | ''>(initialTopic?.customSettings?.baseQuestions || '');

    const handleSave = () => {
        if (!title.trim()) return;
        
        let customSettings = undefined;
        if (showAdvanced && (intervalsStr.trim() || baseQuestions)) {
            const intervals = intervalsStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
            const baseQ = typeof baseQuestions === 'number' ? baseQuestions : IMPORTANCE_LEVELS.find(i => i.id === importance)?.baseQ || 20;
            if (intervals.length > 0 || baseQuestions) {
                // If intervals empty but questions set, standard schedule + custom questions? 
                // Logic usually requires intervals if custom settings object exists, or we default to standard intervals.
                // Assuming user provides intervals if they open advanced. 
                // If intervals empty, undefined.
                if (intervals.length > 0) customSettings = { intervals, baseQuestions: baseQ };
            }
        }

        onSave({ 
            ...initialTopic,
            title, 
            area, 
            importance, 
            studyDate: date,
            customSettings
        });
        
        if (!initialTopic?.id) setTitle(''); // Clear if creating new
    };

    return (
        <div className="bg-[#1c1c1e] dark:bg-zinc-900 border border-slate-800 dark:border-white/10 rounded-2xl p-5 shadow-2xl animate-scale-in mb-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            
            <div className="flex justify-between items-center mb-4 pl-2">
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                    {initialTopic?.id ? <EditTopicIcon /> : <Plus size={14} strokeWidth={3}/>}
                    {initialTopic?.id ? 'Editar Matéria' : 'Nova Matéria'}
                </h4>
                <div className="flex items-center gap-2">
                    {onDelete && (
                        <button onClick={onDelete} className="p-1.5 hover:bg-red-500/20 text-slate-500 hover:text-red-500 rounded-lg transition-colors" title="Excluir">
                            <Trash2 size={14}/>
                        </button>
                    )}
                    <button onClick={onCancel} className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"><X size={16}/></button>
                </div>
            </div>
            
            <div className="flex flex-col gap-4 pl-2">
                <input 
                    autoFocus
                    type="text" 
                    placeholder="Título da matéria (ex: Diabetes, HAS...)" 
                    className="w-full text-lg font-bold bg-transparent border-b border-slate-700 dark:border-white/10 pb-2 outline-none text-white placeholder-slate-500 focus:border-blue-500 transition-colors"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSave()}
                />
                
                <div className="flex flex-wrap items-center gap-3">
                    <select 
                        value={area} 
                        onChange={(e) => setArea(e.target.value as AreaType)}
                        className="bg-slate-800 dark:bg-black/40 rounded-lg px-3 py-2 text-xs font-bold uppercase outline-none cursor-pointer hover:bg-slate-700 transition-colors text-slate-300 border border-transparent focus:border-blue-500/50"
                    >
                        {AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>

                    <div className="flex bg-slate-800 dark:bg-black/40 rounded-lg p-1 gap-1">
                        {['low','medium','high'].map((imp) => (
                            <button 
                                key={imp}
                                onClick={() => setImportance(imp as any)}
                                className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${importance === imp ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                {imp === 'high' ? 'Alta' : imp === 'medium' ? 'Méd' : 'Bai'}
                            </button>
                        ))}
                    </div>

                    <input 
                        type="date" 
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="bg-slate-800 dark:bg-black/40 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-300 outline-none border border-transparent focus:border-blue-500/50"
                    />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 dark:border-white/5">
                    <button 
                        onClick={() => setShowAdvanced(!showAdvanced)} 
                        className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${showAdvanced ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <SlidersHorizontal size={12}/> {showAdvanced ? 'Ocultar Avançado' : 'Avançado'}
                    </button>

                    <button onClick={handleSave} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-900/20 transition-all active:scale-95">
                        {initialTopic?.id ? 'Salvar Alterações' : 'Adicionar Matéria'}
                    </button>
                </div>

                {showAdvanced && (
                    <div className="grid grid-cols-2 gap-4 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 animate-scale-in">
                        <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-400 uppercase">Intervalos (dias)</label>
                            <input 
                                type="text" 
                                value={intervalsStr}
                                onChange={e => setIntervalsStr(e.target.value)}
                                placeholder="Ex: 1, 7, 15, 30"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-400 uppercase">Meta Questões</label>
                            <input 
                                type="number" 
                                value={baseQuestions}
                                onChange={e => setBaseQuestions(parseInt(e.target.value) || '')}
                                placeholder="Ex: 20"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="col-span-2 text-[9px] text-slate-500 italic">
                            Defina os dias de revisão (ex: 1 = amanhã) e a meta fixa de questões para este tópico.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper icon
const EditTopicIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
);

export const HubView = ({ topics, simulados, config, onReview, onEditTopic, onDeleteTopic, onUpdateTopic, onAddTopic, activeTab = 'topics', setActiveTab, isCreatingTopic, setIsCreatingTopic, onAddSimulado, onDeleteSimulado, onEditSimulado }: any) => {
    const today = getTodayStr();
    
    // State for inline editing
    const [editingTopicId, setEditingTopicId] = useState<string | null>(null);

    // Categorize items
    const { due, upcoming, completed } = useMemo(() => {
        const active = topics.filter((t: Topic) => !t.deleted);
        const dueList: any[] = [];
        const upcomingList: any[] = [];
        const completedList: any[] = [];

        active.forEach((t: Topic) => {
            const nextReviewIdx = t.reviews.findIndex(r => !r.done);
            if (nextReviewIdx !== -1) {
                const r = t.reviews[nextReviewIdx];
                const item = { ...t, nextReview: r, nextReviewIdx };
                if (r.date <= today) dueList.push(item);
                else upcomingList.push(item);
            } else {
                completedList.push(t);
            }
        });

        // Sort overdue first, then by priority
        dueList.sort((a,b) => {
            if (a.nextReview.date !== b.nextReview.date) return a.nextReview.date.localeCompare(b.nextReview.date);
            const pMap: any = { high: 3, medium: 2, low: 1 };
            return pMap[b.importance] - pMap[a.importance];
        });

        // Sort upcoming by date
        upcomingList.sort((a,b) => a.nextReview.date.localeCompare(b.nextReview.date));

        return { due: dueList, upcoming: upcomingList, completed: completedList };
    }, [topics, today]);

    const handleSaveEdit = (updatedTopic: any) => {
        if (onUpdateTopic) {
            onUpdateTopic(updatedTopic);
        }
        setEditingTopicId(null);
    };

    return (
        <div className="flex flex-col lg:flex-row h-full gap-8 animate-fade-in pb-24">
            
            {/* --- LEFT COLUMN: ACTION STREAM (2/3 width) --- */}
            <div className="flex-1 flex flex-col min-w-0">
                
                {/* Hero / Focus Status */}
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                        {today.split('-')[2]}/{today.split('-')[1]} • <span className="text-slate-400">Hoje</span>
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2 ${due.length > 0 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'}`}>
                            {due.length > 0 ? <Zap size={14} fill="currentColor"/> : <CheckCircle2 size={14}/>}
                            {due.length} Tópicos Pendentes
                        </div>
                    </div>
                </div>

                {/* Main Queue */}
                <div className="space-y-6">
                    {/* Inline Creator */}
                    {isCreatingTopic && setIsCreatingTopic && onAddTopic && (
                        <InlineTopicForm 
                            onSave={(t) => { onAddTopic(t); setIsCreatingTopic(false); }} 
                            onCancel={() => setIsCreatingTopic(false)} 
                        />
                    )}

                    {/* Due Section */}
                    <div className="space-y-3">
                        {due.length === 0 && !isCreatingTopic && activeTab === 'topics' && (
                            <div className="p-8 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-3xl flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/10 rounded-full flex items-center justify-center mb-4 text-emerald-500">
                                    <CheckCircle2 size={32}/>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Tudo em dia!</h3>
                                <p className="text-sm text-slate-500 max-w-xs mt-1">Você completou todas as revisões de hoje. Aproveite para descansar ou adiantar o cronograma.</p>
                                <button onClick={() => setIsCreatingTopic && setIsCreatingTopic(true)} className="mt-4 text-blue-600 font-bold text-xs hover:underline">Adicionar nova matéria</button>
                            </div>
                        )}

                        {activeTab === 'simulados' ? (
                            <div className="grid grid-cols-1 gap-3">
                                {simulados.filter((s: Simulado) => !s.deleted).map((s: Simulado) => (
                                    <SimuladoCard key={s.id} simulado={s} onDelete={onDeleteSimulado} onEdit={onEditSimulado} />
                                ))}
                                {simulados.length === 0 && <div className="text-slate-400 text-sm font-bold text-center py-10">Nenhum simulado.</div>}
                            </div>
                        ) : (
                            due.map((t: any) => (
                                editingTopicId === t.id ? (
                                    <InlineTopicForm 
                                        key={t.id}
                                        initialTopic={t}
                                        onSave={handleSaveEdit}
                                        onCancel={() => setEditingTopicId(null)}
                                        onDelete={() => { if(window.confirm('Excluir?')) onDeleteTopic(t.id); }}
                                    />
                                ) : (
                                    <TopicListItem 
                                        key={t.id} 
                                        topic={t} 
                                        onReview={onReview}
                                        onDelete={onDeleteTopic}
                                        onEdit={() => setEditingTopicId(t.id)}
                                    />
                                )
                            ))
                        )}
                    </div>

                    {/* Upcoming Section (Collapsed visually) */}
                    {upcoming.length > 0 && activeTab === 'topics' && (
                        <div className="pt-8">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Calendar size={14}/> Próximos Dias
                            </h3>
                            <div className="space-y-2 opacity-70 hover:opacity-100 transition-opacity">
                                {upcoming.slice(0, 5).map((t: any) => (
                                    editingTopicId === t.id ? (
                                        <InlineTopicForm 
                                            key={t.id}
                                            initialTopic={t}
                                            onSave={handleSaveEdit}
                                            onCancel={() => setEditingTopicId(null)}
                                            onDelete={() => { if(window.confirm('Excluir?')) onDeleteTopic(t.id); }}
                                        />
                                    ) : (
                                        <TopicListItem 
                                            key={t.id} 
                                            topic={t} 
                                            onReview={onReview}
                                            onDelete={onDeleteTopic}
                                            onEdit={() => setEditingTopicId(t.id)}
                                        />
                                    )
                                ))}
                                {upcoming.length > 5 && (
                                    <div className="text-center text-xs font-bold text-slate-400 py-2">
                                        + {upcoming.length - 5} outros tópicos
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- RIGHT COLUMN: CONTEXT & STATS (1/3 width, Sticky) --- */}
            <div className="hidden lg:flex flex-col w-80 shrink-0 gap-6">
                
                {/* User Card */}
                <div className="p-6 bg-white dark:bg-[#121214] rounded-[24px] border border-slate-100 dark:border-white/5 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Seu Progresso</h4>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-4xl font-black text-slate-900 dark:text-white">
                            {topics.reduce((acc: number, t: Topic) => acc + t.reviews.filter(r => r.done).length, 0)}
                        </span>
                        <span className="text-xs font-bold text-slate-500 mb-1.5">revisões feitas</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full w-[45%]"></div>
                    </div>
                </div>

                {/* Heatmap Widget */}
                <div className="p-6 bg-white dark:bg-[#121214] rounded-[24px] border border-slate-100 dark:border-white/5 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Flame size={14} className="text-orange-500"/> Constância</h4>
                    </div>
                    <HeatmapWidget topics={topics} simulados={simulados} />
                </div>

                {/* Quick Shortcuts */}
                <div className="space-y-2">
                    <button onClick={() => setActiveTab('topics')} className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-colors flex justify-between items-center ${activeTab === 'topics' ? 'bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
                        <span>Matérias Ativas</span>
                        <span className="bg-white dark:bg-black/20 px-2 py-0.5 rounded text-[10px]">{topics.filter((t:Topic)=>!t.deleted).length}</span>
                    </button>
                    <button onClick={() => setActiveTab('simulados')} className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-colors flex justify-between items-center ${activeTab === 'simulados' ? 'bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
                        <span>Simulados</span>
                        <span className="bg-white dark:bg-black/20 px-2 py-0.5 rounded text-[10px]">{simulados.filter((s:Simulado)=>!s.deleted).length}</span>
                    </button>
                </div>

            </div>
        </div>
    );
};
