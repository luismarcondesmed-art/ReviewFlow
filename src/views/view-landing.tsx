import React from 'react';
import { Activity, BrainCircuit, Calendar, CheckCircle2, ChevronRight, Database, LayoutGrid, Map as MapIcon, PieChart, Shield, Star, Zap } from 'lucide-react';

export const LandingView = ({ onStart, currentView, onChangeView }: { onStart: () => void, currentView: 'main' | 'privacy' | 'terms', onChangeView: (view: 'main' | 'privacy' | 'terms') => void }) => {
    if (currentView === 'privacy') {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0c] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden pt-24 px-6 pb-12">
                <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
                    <button onClick={() => onChangeView('main')} className="mb-8 text-indigo-600 dark:text-indigo-400 font-bold hover:underline">&larr; Voltar</button>
                    <h1>Política de Privacidade</h1>
                    <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                    <p>No ReviewFlow, a sua privacidade é uma prioridade. Esta política descreve como coletamos, usamos e protegemos suas informações.</p>
                    <h2>1. Coleta de Dados</h2>
                    <p>O ReviewFlow armazena a maior parte dos seus dados localmente no seu dispositivo (navegador) através do <code>localStorage</code>. Isso inclui seus temas de estudo, simulados e configurações.</p>
                    <p>Se você optar por utilizar a funcionalidade de sincronização, seus dados serão enviados de forma criptografada para nossos servidores (Firebase) associados à sua chave de sincronização.</p>
                    <h2>2. Uso dos Dados</h2>
                    <p>Utilizamos seus dados exclusivamente para fornecer a funcionalidade do aplicativo: agendar suas revisões, gerar estatísticas de desempenho e permitir o acesso em múltiplos dispositivos.</p>
                    <h2>3. Compartilhamento de Dados</h2>
                    <p>Não vendemos, alugamos ou compartilhamos seus dados pessoais de estudo com terceiros. Podemos utilizar serviços de terceiros (como Google Analytics) para entender como o site é utilizado e melhorar a experiência, mas esses dados são anonimizados.</p>
                    <h2>4. Publicidade</h2>
                    <p>O ReviewFlow pode exibir anúncios fornecidos pelo Google AdSense. O Google utiliza cookies para veicular anúncios com base nas suas visitas anteriores ao nosso site ou a outros sites na internet. Você pode desativar a publicidade personalizada acessando as Configurações de anúncios do Google.</p>
                    <h2>5. Seus Direitos</h2>
                    <p>Você tem o direito de acessar, corrigir ou excluir seus dados a qualquer momento. Como os dados são armazenados localmente, você pode excluí-los limpando os dados do navegador ou utilizando a opção "Limpar Dados" dentro do aplicativo.</p>
                </div>
            </div>
        );
    }

    if (currentView === 'terms') {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0c] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden pt-24 px-6 pb-12">
                <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
                    <button onClick={() => onChangeView('main')} className="mb-8 text-indigo-600 dark:text-indigo-400 font-bold hover:underline">&larr; Voltar</button>
                    <h1>Termos de Uso</h1>
                    <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                    <h2>1. Aceitação dos Termos</h2>
                    <p>Ao acessar e utilizar o ReviewFlow, você concorda em cumprir e ficar vinculado a estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve utilizar o nosso serviço.</p>
                    <h2>2. Descrição do Serviço</h2>
                    <p>O ReviewFlow é uma plataforma de planejamento de estudos baseada em repetição espaçada, voltada principalmente para estudantes de medicina e médicos residentes.</p>
                    <h2>3. Responsabilidade do Usuário</h2>
                    <p>Você é responsável por manter a confidencialidade da sua chave de sincronização e por todas as atividades que ocorrem sob a sua conta. O ReviewFlow não se responsabiliza por qualquer perda de dados decorrente do mau uso da plataforma ou limpeza de dados locais do navegador sem backup.</p>
                    <h2>4. Propriedade Intelectual</h2>
                    <p>Todo o conteúdo, design, logotipos e código-fonte do ReviewFlow são de propriedade exclusiva dos seus desenvolvedores e estão protegidos por leis de direitos autorais.</p>
                    <h2>5. Isenção de Garantias</h2>
                    <p>O serviço é fornecido "no estado em que se encontra", sem garantias de qualquer tipo. Não garantimos que o serviço será ininterrupto, seguro ou livre de erros. O ReviewFlow é uma ferramenta de auxílio aos estudos e não garante aprovação em exames ou provas.</p>
                    <h2>6. Modificações dos Termos</h2>
                    <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. O uso contínuo do serviço após tais alterações constitui a sua aceitação dos novos termos.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0c] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                            <Activity size={20} strokeWidth={2.5}/>
                        </div>
                        <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">ReviewFlow</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Recursos</a>
                        <a href="#how-it-works" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Como Funciona</a>
                        <a href="#faq" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQ</a>
                    </nav>
                    <button onClick={onStart} className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-900/20 dark:shadow-white/20">
                        Acessar o App
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 relative">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-100 dark:border-indigo-500/20">
                        <Star size={14} fill="currentColor" />
                        O melhor planejador de estudos médicos
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-8 leading-tight">
                        Domine a medicina com <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Repetição Espaçada</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        O ReviewFlow é a plataforma definitiva para estudantes de medicina e médicos residentes. Organize suas revisões, acompanhe seu desempenho em simulados e otimize seu tempo de estudo com inteligência artificial.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={onStart} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2">
                            Começar a Estudar Agora <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-6 bg-white dark:bg-zinc-900/50 border-y border-slate-200 dark:border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Tudo que você precisa para ser aprovado</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Uma suíte completa de ferramentas desenvolvidas especificamente para a rotina intensa de estudos médicos.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: BrainCircuit, title: 'Algoritmo Inteligente', desc: 'Nosso sistema FSRS (Free Spaced Repetition Scheduler) adapta as revisões ao seu ritmo de esquecimento, garantindo retenção máxima.' },
                            { icon: LayoutGrid, title: 'Dashboard Completo', desc: 'Visualize seu progresso diário, metas semanais e carga de revisão futura em um painel intuitivo e motivador.' },
                            { icon: MapIcon, title: 'Cronograma Integrado', desc: 'Acompanhe as aulas do seu cursinho (MedCof, etc.) e transforme-as automaticamente em ciclos de revisão.' },
                            { icon: PieChart, title: 'Estatísticas Detalhadas', desc: 'Analise seu desempenho por grande área (Cirurgia, Clínica, etc.) e identifique seus pontos fracos e fortes.' },
                            { icon: Database, title: 'Banco de Dados', desc: 'Organize todos os seus temas de estudo, com tags, links para materiais e histórico completo de revisões.' },
                            { icon: Zap, title: 'Otimização de Tempo', desc: 'Tem pouco tempo hoje? Use a função Otimizar para focar apenas nos temas mais críticos e atrasados.' }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-white/5 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors group">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon size={28} strokeWidth={2} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Section for AdSense Value */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert prose-lg">
                    <h2 className="text-3xl font-black text-center mb-8">Por que a Repetição Espaçada é essencial na Medicina?</h2>
                    <p>
                        A faculdade de medicina e a preparação para provas de residência médica (ENARE, SUS-SP, USP, Unicamp, etc.) exigem a memorização de um volume colossal de informações. Desde a anatomia básica até os protocolos de tratamento mais complexos, a curva de esquecimento de Ebbinghaus é a maior inimiga do estudante.
                    </p>
                    <p>
                        O <strong>ReviewFlow</strong> foi criado para resolver esse problema. Utilizando algoritmos avançados de repetição espaçada (Spaced Repetition System - SRS), a plataforma agenda suas revisões exatamente no momento em que você está prestes a esquecer o conteúdo. Isso transforma a memória de curto prazo em memória de longo prazo com o mínimo de esforço necessário.
                    </p>
                    
                    <h3>Como o ReviewFlow otimiza seus estudos</h3>
                    <ul>
                        <li><strong>Revisões Ativas:</strong> O sistema incentiva o Active Recall (Evocação Ativa), o método de estudo com maior comprovação científica de eficácia.</li>
                        <li><strong>Foco no que importa:</strong> Com a análise de desempenho em simulados, o ReviewFlow identifica as áreas onde você tem mais dificuldade (ex: Ginecologia e Obstetrícia, Pediatria, Cirurgia Geral, Clínica Médica ou Medicina Preventiva) e ajusta a carga de estudos.</li>
                        <li><strong>Organização sem estresse:</strong> Diga adeus às planilhas complexas. O agendamento é 100% automático.</li>
                    </ul>

                    <h3>A Ciência por trás da Aprovação</h3>
                    <p>
                        Estudos em neurociência cognitiva demonstram que a leitura passiva e o grifo de textos são métodos ineficientes de estudo. A verdadeira retenção ocorre quando forçamos o cérebro a recuperar uma informação (Active Recall) em intervalos de tempo cada vez maiores (Spaced Repetition).
                    </p>
                    <p>
                        No contexto da medicina, onde o conhecimento não é apenas para uma prova, mas para a vida de um paciente, a retenção de longo prazo é inegociável. O ReviewFlow automatiza esse processo científico. Você apenas diz o que estudou hoje, e nós dizemos quando você deve revisar.
                    </p>

                    <h3>Preparação Estratégica para Residência Médica</h3>
                    <p>
                        A concorrência nas provas de residência médica aumenta a cada ano. Não basta apenas estudar muito; é preciso estudar de forma inteligente. O ReviewFlow permite que você integre o cronograma do seu cursinho preparatório (como MedCof, Sanar, Medcel, Estratégia MED, entre outros) diretamente na plataforma.
                    </p>
                    <p>
                        Além disso, o registro de simulados permite que o algoritmo identifique suas fraquezas. Se você está errando muitas questões de Cardiologia, o sistema automaticamente aumenta a frequência de revisões dessa disciplina, garantindo que você chegue no dia da prova com o conhecimento consolidado.
                    </p>

                    <p>
                        Seja você um interno buscando a aprovação na residência dos sonhos, ou um estudante dos primeiros anos querendo construir uma base sólida, o ReviewFlow é a ferramenta definitiva para o seu sucesso.
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-24 px-6 bg-slate-50 dark:bg-zinc-900/50 border-t border-slate-200 dark:border-white/5">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Perguntas Frequentes</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { q: 'O ReviewFlow é gratuito?', a: 'Sim! O ReviewFlow possui uma versão gratuita com todas as funcionalidades essenciais para você organizar seus estudos e revisões.' },
                            { q: 'Como funciona a sincronização?', a: 'Seus dados são salvos localmente no seu navegador para acesso rápido e offline. Você pode gerar uma chave de sincronização para fazer backup na nuvem e acessar em outros dispositivos.' },
                            { q: 'Posso usar no celular?', a: 'Com certeza. O ReviewFlow foi desenhado com uma interface "Mobile First", funcionando perfeitamente como um aplicativo no seu smartphone. Você pode até adicioná-lo à tela inicial.' },
                            { q: 'O algoritmo é baseado no Anki?', a: 'Utilizamos uma variação do algoritmo FSRS (Free Spaced Repetition Scheduler), que é mais moderno e eficiente que o algoritmo padrão do Anki (SM-2), adaptando-se melhor ao volume de questões médicas.' }
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/5">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h4>
                                <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0a0c]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <Activity size={20} className="text-indigo-500" />
                        <span className="font-black text-slate-900 dark:text-white">ReviewFlow</span>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
                        © {new Date().getFullYear()} ReviewFlow. Todos os direitos reservados. <br className="md:hidden" />
                        Plataforma de estudos e repetição espaçada para medicina.
                    </div>
                    <div className="flex gap-6">
                        <button onClick={() => onChangeView('terms')} className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Termos de Uso</button>
                        <button onClick={() => onChangeView('privacy')} className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Política de Privacidade</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};
