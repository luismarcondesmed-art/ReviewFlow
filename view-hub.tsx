
import React, { useMemo, useState } from 'react';
import { 
    Clock, Activity, Flame, CheckCircle2, ChevronRight, Sun, ArrowUpDown, Filter, PlayCircle, Plus, SlidersHorizontal, ChevronDown, Calendar, BookOpen, ClipboardList, Target
} from 'lucide-react';
import { Topic, Simulado, UserConfig, AreaType, ImportanceType } from './types';
import { getTodayStr, getAreaTheme, formatDate, getPerformanceBgLight, AREAS, getPerformanceColor } from './utils';
import { SmartSuggestions, HeatmapWidget, SimuladosMiniWidget, TopicCard, SimuladoCard } from './components';

const getAreaInitials = (area: string) => {
    switch(area) {
        case 'clinica': return 'CL';
        case 'cirurgia': return 'CR';
        case 'pediatria': return 'PE';
        case 'go': return 'GO';
        case 'preventiva': return 'PR';
        default: return 'G';
    }
};

const InlineTopicCreator = ({ onAdd, onCancel, onOpenFullModal }: { onAdd: (t: any) => void, onCancel: () => void, onOpenFullModal: () => void }) => {
    const [title, setTitle] = useState('');
    const [area, setArea] = useState<AreaType>('clinica');
    const [importance, setImportance] = useState<ImportanceType>('medium');
    const [date, setDate] = useState(getTodayStr());

    const handleAdd = () => {
        if (!title.trim()) return;
        onAdd({ title, area, importance, studyDate: date });
        setTitle('');
    };

    return (
        <div className="bg-white dark:bg-zinc-900 border-2 border-blue-500/20 dark:border-blue-500/10 rounded-[24px] p-5 mb-6 animate-scale-in shadow-lg shadow-blue-500/5">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-2">
                    <Plus size={16} className="text-blue-500"/> Nova Matéria
                </h4>
                <button onClick={onCancel} className="text-slate-400 hover:text-red-500 text-xs font-bold uppercase">Cancelar</button>
            </div>
            
            <div className="space-y-4">
                <input 
                    autoFocus
                    type="text" 
                    placeholder="Título da matéria (ex: Diabetes, HAS...)" 
                    className="w-full text-lg font-bold bg-slate-50 dark:bg-black/20 p-3 rounded-xl outline-none text-slate-900 dark:text-white placeholder-slate-400"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdd()}
                />
                
                <div className="flex flex-wrap gap-2">
                    <div className="relative">
                        <select 
                            value={area} 
                            onChange={(e) => setArea(e.target.value as AreaType)}
                            className="appearance-none pl-3 pr-8 py-2 bg-slate-50 dark:bg-black/20 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 outline-none cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                        >
                            {AREAS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>

                    <div className="flex bg-slate-50 dark:bg-black/20 rounded-lg p-1">
                        {['low','medium','high'].map((imp) => (
                            <button 
                                key={imp}
                                onClick={() => setImportance(imp as any)}
                                className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${importance === imp ? 'bg-white dark:bg-white/10 shadow-sm text-slate-800 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {imp === 'high' ? 'Alta' : imp === 'medium' ? 'Média' : 'Baixa'}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <input 
                            type="date" 
                            value={date} 
                            onChange={e => setDate(e.target.value)}
                            className="pl-8 pr-3 py-2 bg-slate-50 dark:bg-black/20 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 outline-none cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                        />
                        <Calendar size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <button onClick={onOpenFullModal} className="px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-xs font-bold flex items-center gap-2">
                        <SlidersHorizontal size={14}/> Avançado
                    </button>
                    <button onClick={handleAdd} className="flex-1 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        Adicionar Matéria
                    </button>
                </div>
            </div>
        </div>
    );
};

const InlineSimuladoCreator = ({ onAdd, onCancel }: { onAdd: (s: any) => void, onCancel: () => void }) => {
    const [institution, setInstitution] = useState('');
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [date, setDate] = useState(getTodayStr());
    const [correct, setCorrect] = useState<number | ''>('');
    const [total, setTotal] = useState<number | ''>(100);

    const acc = (typeof correct === 'number' && typeof total === 'number' && total > 0) ? Math.round((correct/total)*100) : 0;

    const handleAdd = () => {
        if (!institution.trim() || correct === '' || total === '') return;
        onAdd({ 
            name: institution, 
            year: String(year), 
            totalQuestions: Number(total), 
            correctCount: Number(correct),
            dateTaken: date + 'T12:00:00',
            difficultyTopics: [] // Inline doesn't support tagging yet
        });
        setInstitution('');
        setCorrect('');
    };

    return (
        <div className="bg-white dark:bg-zinc-900 border-2 border-purple-500/20 dark:border-purple-500/10 rounded-[24px] p-5 mb-6 animate-scale-in shadow-lg shadow-purple-500/5">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-2">
                    <Plus size={16} className="text-purple-500"/> Novo Simulado
                </h4>
                <button onClick={onCancel} className="text-slate-400 hover:text-red-500 text-xs font-bold uppercase">Cancelar</button>
            </div>
            
            <div className="space-y-4">
                <input 
                    autoFocus
                    type="text" 
                    placeholder="Instituição (ex: USP, UNIFESP...)" 
                    className="w-full text-lg font-bold bg-slate-50 dark:bg-black/20 p-3 rounded-xl outline-none text-slate-900 dark:text-white placeholder-slate-400"
                    value={institution}
                    onChange={e => setInstitution(e.target.value)}
                />
                
                <div className="flex gap-2">
                    <div className="flex-1 bg-slate-50 dark:bg-black/20 p-2 rounded-xl flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">Ano</span>
                        <input 
                            type="number" 
                            className="w-16 text-right font-bold bg-transparent outline-none text-slate-800 dark:text-white"
                            value={year}
                            onChange={e => setYear(Number(e.target.value))}
                        />
                    </div>
                    <div className="flex-1 bg-slate-50 dark:bg-black/20 p-2 rounded-xl flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">Data</span>
                        <input 
                            type="date" 
                            className="bg-transparent outline-none font-bold text-xs text-slate-800 dark:text-white text-right"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <div className="flex-1 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-500/20 p-2 rounded-xl flex flex-col items-center">
                        <span className="text-[9px] font-bold text-emerald-600 uppercase">Acertos</span>
                        <input 
                            type="number" 
                            className="w-full text-center font-black text-xl bg-transparent outline-none text-emerald-600"
                            value={correct}
                            onChange={e => setCorrect(e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="0"
                        />
                    </div>
                    <div className="text-slate-300 font-light">/</div>
                    <div className="flex-1 bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 p-2 rounded-xl flex flex-col items-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">Total</span>
                        <input 
                            type="number" 
                            className="w-full text-center font-black text-xl bg-transparent outline-none text-slate-600 dark:text-slate-300"
                            value={total}
                            onChange={e => setTotal(e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="100"
                        />
                    </div>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm border ${getPerformanceBgLight(acc, 80)}`}>
                        {acc}%
                    </div>
                </div>

                <button onClick={handleAdd} className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Salvar Resultado
                </button>
            </div>
        </div>
    );
};

export const HubView = ({ 
    topics, simulados, config, onReview, onEditTopic, onDeleteTopic,
    children, setSortOrder, setFilterArea, sortOrder, filterArea, searchTerm,
    onQuickReview, isCreatingTopic, setIsCreatingTopic, onAddTopic, onOpenFullAddModal,
    onAddSimulado, onDeleteSimulado, onEditSimulado, activeTab = 'topics', setActiveTab
}: { 
    topics: Topic[], simulados: Simulado[], config: UserConfig, 
    onReview: (id: string, idx: number) => void, onEditTopic: (id: string) => void, onDeleteTopic?: (id: string) => void,
    children?: React.ReactNode, setSortOrder: any, setFilterArea: any, 
    sortOrder: string, filterArea: string, searchTerm?: string,
    onQuickReview?: (id: string, idx: number, data: any) => void,
    isCreatingTopic?: boolean, setIsCreatingTopic?: (v: boolean) => void,
    onAddTopic?: (t: any) => void, onOpenFullAddModal?: () => void,
    onAddSimulado?: (s: any) => void, onDeleteSimulado?: (id: string) => void, onEditSimulado?: (s: Simulado) => void,
    activeTab?: 'topics' | 'simulados', setActiveTab?: (t: 'topics' | 'simulados') => void
}) => {
    const today = getTodayStr();
    const activeTopics = topics.filter(t => !t.deleted);
    const activeSimulados = simulados.filter(s => !s.deleted).sort((a,b) => new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime());

    // Auto-switch to create mode if external prop triggers it
    const showCreator = isCreatingTopic && setIsCreatingTopic;

    const filteredActiveTopics = useMemo(() => {
        let result = activeTopics;
        
        // Filter by Area
        if (filterArea && filterArea !== 'all') {
            result = result.filter(t => t.area === filterArea);
        }

        // Filter by Search
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(t => t.title.toLowerCase().includes(lower));
        }
        
        // Sort
        return result.sort((a,b) => {
            if (sortOrder === 'date') return (b.updatedAt || 0) - (a.updatedAt || 0);
            if (sortOrder === 'priority') {
                const map = { high: 3, medium: 2, low: 1 };
                return (map[b.importance] || 0) - (map[a.importance] || 0);
            }
            if (sortOrder === 'questions') {
                const totalA = a.reviews.reduce((acc, r) => acc + (r.done ? r.total : 0), 0);
                const totalB = b.reviews.reduce((acc, r) => acc + (r.done ? r.total : 0), 0);
                return totalB - totalA;
            }
            return 0;
        });
    }, [activeTopics, searchTerm, filterArea, sortOrder]);

    const dueItems = useMemo(() => {
        return filteredActiveTopics
            .flatMap(t => t.reviews.map((r, idx) => ({ ...r, topic: t, idx })))
            .filter(r => !r.done && r.date <= today)
            .sort((a,b) => {
                 if (a.date !== b.date) return a.date.localeCompare(b.date);
                 const pMap = { high: 3, medium: 2, low: 1 };
                 return (pMap[b.topic.importance] || 2) - (pMap[a.topic.importance] || 2);
            });
    }, [filteredActiveTopics, today]);

    const startQuickSession = () => {
        if (dueItems.length > 0) {
            onReview(dueItems[0].topic.id, dueItems[0].idx);
        }
    };

    return (
        <div className="flex flex-col gap-6 lg:gap-8 h-full pb-32 lg:pb-0 animate-scale-in">
            <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
                {/* LEFT COLUMN (MAIN PANEL - FOCUS) */}
                <div className="col-span-8 flex flex-col gap-6">
                    {/* Control Panel */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between px-2">
                            {/* Tab Switcher - Desktop Only */}
                            <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 p-1 rounded-xl flex gap-1">
                                <button 
                                    onClick={() => { if(setActiveTab) setActiveTab('topics'); if(setIsCreatingTopic) setIsCreatingTopic(false); }}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'topics' ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Matérias
                                </button>
                                <button 
                                    onClick={() => { if(setActiveTab) setActiveTab('simulados'); if(setIsCreatingTopic) setIsCreatingTopic(false); }}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'simulados' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Simulados
                                </button>
                            </div>

                            {activeTab === 'topics' && (
                                <div className="flex gap-2">
                                    <div className="relative group">
                                        <button className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 hover:text-blue-500 transition-colors">
                                            <ArrowUpDown size={18} />
                                        </button>
                                        <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1 z-50 hidden group-hover:block animate-scale-in">
                                            {['date', 'priority', 'questions'].map(opt => (
                                                <button 
                                                    key={opt}
                                                    onClick={() => setSortOrder(opt)}
                                                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg ${sortOrder === opt ? 'bg-blue-50 text-blue-600 dark:bg-white/10 dark:text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                                >
                                                    {opt === 'date' ? 'Data (Recentes)' : opt === 'priority' ? 'Prioridade' : 'Questões'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 hover:text-blue-500 transition-colors">
                                        <Filter size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        {/* Inline Creators */}
                        {showCreator && activeTab === 'topics' && onAddTopic && (
                            <InlineTopicCreator 
                                onAdd={(t) => { onAddTopic(t); setIsCreatingTopic && setIsCreatingTopic(false); }} 
                                onCancel={() => setIsCreatingTopic && setIsCreatingTopic(false)} 
                                onOpenFullModal={() => { setIsCreatingTopic && setIsCreatingTopic(false); if(onOpenFullAddModal) onOpenFullAddModal(); }}
                            />
                        )}

                        {showCreator && activeTab === 'simulados' && onAddSimulado && (
                            <InlineSimuladoCreator
                                onAdd={(s) => { onAddSimulado(s); setIsCreatingTopic && setIsCreatingTopic(false); }}
                                onCancel={() => setIsCreatingTopic && setIsCreatingTopic(false)}
                            />
                        )}

                        {/* List Content */}
                        <div className="min-h-0 flex flex-col gap-4">
                             {activeTab === 'topics' ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {filteredActiveTopics.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 rounded-[2rem]">
                                            <div className="w-16 h-16 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                                <BookOpen size={24}/>
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                                                {searchTerm ? 'Nenhum resultado' : 'Comece seus estudos'}
                                            </h4>
                                            <p className="text-sm text-slate-500 mb-6">
                                                {searchTerm ? 'Tente outro termo de busca.' : 'Adicione matérias para gerar seu cronograma.'}
                                            </p>
                                            <button onClick={() => setIsCreatingTopic && setIsCreatingTopic(true)} className="bg-slate-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-bold text-xs hover:scale-105 active:scale-95 transition-all">Criar Matéria</button>
                                        </div>
                                    ) : (
                                        filteredActiveTopics.map(t => (
                                            <TopicCard 
                                                key={t.id} 
                                                topic={t} 
                                                onReview={onReview}
                                                onDelete={onDeleteTopic}
                                                onEdit={() => onEditTopic(t.id)} 
                                                onQuickReview={onQuickReview}
                                            />
                                        ))
                                    )}
                                </div>
                             ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {activeSimulados.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 rounded-[2rem]">
                                            <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/10 rounded-full flex items-center justify-center mb-4 text-purple-400">
                                                <ClipboardList size={24}/>
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Nenhum Simulado</h4>
                                            <p className="text-sm text-slate-500 mb-6">Registre seu desempenho para acompanhar a evolução.</p>
                                            <button onClick={() => setIsCreatingTopic && setIsCreatingTopic(true)} className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-xs hover:scale-105 active:scale-95 transition-all">Adicionar Simulado</button>
                                        </div>
                                    ) : (
                                        activeSimulados.map(s => (
                                            <SimuladoCard 
                                                key={s.id} 
                                                simulado={s} 
                                                onDelete={onDeleteSimulado}
                                                onEdit={onEditSimulado}
                                            />
                                        ))
                                    )}
                                </div>
                             )}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN (SIDEBAR - WIDGETS) - Unchanged */}
                <div className="col-span-4 flex flex-col gap-6 sticky top-24">
                    {/* ... (Widgets are unchanged) ... */}
                    <div className="relative w-full bg-white dark:bg-[#18181b] border border-blue-100 dark:border-blue-900/30 rounded-[32px] p-6 shadow-sm overflow-hidden group hover:border-blue-300 dark:hover:border-blue-800/50 transition-all duration-500">
                        {/* ... */}
                        <div className="relative z-10 flex flex-col gap-5">
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                        <Clock size={24} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Para Hoje</div>
                                        <div className="text-3xl font-black text-slate-800 dark:text-white tracking-tight leading-none">{dueItems.length}</div>
                                    </div>
                                </div>
                                {dueItems.length > 0 && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>}
                            </div>

                            {/* Action Button */}
                            {dueItems.length > 0 ? (
                                <button 
                                    onClick={startQuickSession}
                                    className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <PlayCircle size={18} strokeWidth={2.5}/>
                                    <span className="text-xs font-black uppercase tracking-wide">Iniciar Sessão</span>
                                </button>
                            ) : (
                                <div className="w-full py-3 bg-slate-50 dark:bg-white/5 text-slate-400 rounded-xl flex items-center justify-center gap-2 border border-slate-100 dark:border-white/5">
                                    <CheckCircle2 size={16}/>
                                    <span className="text-xs font-bold">Tudo feito!</span>
                                </div>
                            )}

                            {/* Mini List */}
                            <div className="flex flex-col gap-2">
                                {dueItems.slice(0, 3).map((item) => {
                                    const theme = getAreaTheme(item.topic.area);
                                    const initials = getAreaInitials(item.topic.area);
                                    return (
                                        <div 
                                            key={`${item.topic.id}-${item.idx}`} 
                                            onClick={() => onReview(item.topic.id, item.idx)}
                                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-100 dark:hover:border-blue-500/20 transition-all cursor-pointer group/item"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${theme.bg} ${theme.text}`}>
                                                    {initials}
                                                </div>
                                                <div className="truncate">
                                                    <h4 className="font-bold text-xs text-slate-700 dark:text-slate-200 truncate">{item.topic.title}</h4>
                                                    <div className="text-[9px] font-bold text-slate-400">{item.label}</div>
                                                </div>
                                            </div>
                                            <ChevronRight size={14} className="text-slate-300 group-hover/item:text-blue-500 transition-colors"/>
                                        </div>
                                    );
                                })}
                                {dueItems.length > 3 && (
                                    <div className="text-center">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase cursor-pointer hover:text-blue-500 transition-colors">
                                            + {dueItems.length - 3} outros
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* ... other widgets ... */}
                </div>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden flex flex-col gap-6 px-1">
                <div className="bg-white dark:bg-[#18181b] p-5 rounded-[28px] border border-black/5 dark:border-white/5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">PARA FAZER HOJE</h2>
                            <div className="text-3xl font-black text-slate-800 dark:text-white">{dueItems.length} <span className="text-sm text-slate-400">pendentes</span></div>
                        </div>
                        {dueItems.length > 0 ? (
                            <button onClick={startQuickSession} className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg active:scale-95 transition-transform">
                                <PlayCircle size={24} strokeWidth={2.5}/>
                            </button>
                        ) : (
                            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400">
                                <Clock size={24} strokeWidth={2.5}/>
                            </div>
                        )}
                    </div>
                    {/* Inline Creator Mobile */}
                    {showCreator && activeTab === 'topics' && onAddTopic && (
                        <div className="mb-4">
                            <InlineTopicCreator 
                                onAdd={(t) => { onAddTopic(t); setIsCreatingTopic && setIsCreatingTopic(false); }} 
                                onCancel={() => setIsCreatingTopic && setIsCreatingTopic(false)} 
                                onOpenFullModal={() => { setIsCreatingTopic && setIsCreatingTopic(false); if(onOpenFullAddModal) onOpenFullAddModal(); }}
                            />
                        </div>
                    )}
                    {showCreator && activeTab === 'simulados' && onAddSimulado && (
                        <div className="mb-4">
                            <InlineSimuladoCreator
                                onAdd={(s) => { onAddSimulado(s); setIsCreatingTopic && setIsCreatingTopic(false); }}
                                onCancel={() => setIsCreatingTopic && setIsCreatingTopic(false)}
                            />
                        </div>
                    )}

                    {/* Content Switcher is handled by App Header, just render based on prop */}
                    {activeTab === 'topics' ? (
                        <>
                            {filteredActiveTopics.map(t => (
                                <TopicCard 
                                    key={t.id} 
                                    topic={t} 
                                    onReview={onReview}
                                    onDelete={onDeleteTopic}
                                    onEdit={() => onEditTopic(t.id)} 
                                    onQuickReview={onQuickReview}
                                />
                            ))}
                            {filteredActiveTopics.length === 0 && (
                                <div className="text-center py-4 text-xs font-bold text-slate-400">
                                    Nenhuma matéria encontrada.
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="space-y-3">
                            {activeSimulados.map(s => (
                                <SimuladoCard 
                                    key={s.id} 
                                    simulado={s} 
                                    onDelete={onDeleteSimulado}
                                    onEdit={onEditSimulado}
                                />
                            ))}
                            {activeSimulados.length === 0 && <div className="text-center py-4 text-xs font-bold text-slate-400">Nenhum simulado.</div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
