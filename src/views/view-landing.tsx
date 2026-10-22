import React from 'react';
import { Activity, BrainCircuit, Calendar, CheckCircle2, ChevronRight, Database, LayoutGrid, Map as MapIcon, PieChart, Shield, Star, Zap, BookOpen, ArrowRight } from 'lucide-react';

export const LandingView = ({ onStart, currentView, onChangeView }: { onStart: () => void, currentView: 'main' | 'privacy' | 'terms', onChangeView: (view: 'main' | 'privacy' | 'terms') => void }) => {
    if (currentView === 'privacy') {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0c] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden pt-24 px-6 pb-12">
                <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
                    <button onClick={() => onChangeView('main')} className="mb-8 text-blue-600 dark:text-blue-400 font-bold hover:underline">&larr; Voltar</button>
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
                    <button onClick={() => onChangeView('main')} className="mb-8 text-blue-600 dark:text-blue-400 font-bold hover:underline">&larr; Voltar</button>
                    <h1>Termos de Uso</h1>
                    <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                    <h2>1. Aceitação dos Termos</h2>
                    <p>Ao acessar e utilizar o ReviewFlow, você concorda em cumprir e ficar vinculado a estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve utilizar o nosso serviço.</p>
                    <h2>2. Descrição do Serviço</h2>
                    <p>O ReviewFlow é uma plataforma de planejamento de estudos baseada em repetição espaçada, projetada para todos os estudantes e profissionais que buscam otimizar seu aprendizado.</p>
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

    return <div className="rf-landing">
      <header className="rf-landing-header"><button className="rf-brand" onClick={() => onChangeView('main')} aria-label="ReviewFlow — início"><BookOpen size={26} strokeWidth={1.3} /><span>ReviewFlow.</span></button><nav aria-label="Sobre o ReviewFlow"><a href="#como-funciona">Como funciona</a><a href="#duvidas">Dúvidas</a><button className="rf-text-button" onClick={onStart}>Entrar no meu espaço <ArrowRight size={16} /></button></nav></header>
      <main>
        <section className="rf-landing-hero"><div><p className="journal-eyebrow">Um caderno para o longo prazo</p><h1>O que você aprende<br /><em>merece ficar.</em></h1><p className="journal-deck">Organize seus estudos e reencontre cada assunto na hora de revisar. Menos decisões sobre o cronograma. Mais espaço para aprender.</p><button className="rf-primary" onClick={onStart}>Começar meu caderno <ArrowRight size={18} /></button><p className="rf-landing-caption">Para medicina, concursos e tudo o que desperta sua curiosidade.</p></div>
          <div className="rf-routine-example" aria-label="Exemplo de uma rotina de revisão"><p className="journal-eyebrow">Aprender é voltar</p><h2>Um assunto.<br /> Novos encontros.</h2><ol><li><span>01</span><div><small>Primeiro contato</small><h3>Entender o essencial</h3><p>Estude e registre seu tema.</p></div><BookOpen size={18} /></li><li><span>02</span><div><small>Próximo encontro</small><h3>Trazer de volta</h3><p>Pratique, recorde, descubra as lacunas.</p></div><Activity size={18} /></li><li><span>03</span><div><small>No seu ritmo</small><h3>Construir familiaridade</h3><p>O intervalo se adapta ao seu desempenho.</p></div><Calendar size={18} /></li></ol><p className="rf-example-caption">Um exemplo do ciclo de estudo com revisão adaptativa.</p></div>
        </section>
        <section className="rf-landing-method" id="como-funciona"><p className="journal-eyebrow">Simples o suficiente para continuar</p><h2>Seu estudo, com um fio condutor.</h2><ol><li><span>01 / Organizar</span><h3>Dê um lugar ao que quer aprender.</h3><p>Crie temas, reúna materiais e acompanhe suas aulas em um cronograma.</p></li><li><span>02 / Praticar</span><h3>Volte ao conteúdo com intenção.</h3><p>Encontre as revisões do dia e registre suas questões e dificuldades.</p></li><li><span>03 / Acompanhar</span><h3>Perceba o caminho que está fazendo.</h3><p>Veja seu histórico, ajuste a carga e mantenha uma rotina que cabe na sua vida.</p></li></ol></section>
        <section className="rf-landing-faq" id="duvidas"><div><p className="journal-eyebrow">Antes de começar</p><h2>Algumas boas perguntas.</h2></div><div><details className="rf-disclosure"><summary>Preciso estudar medicina para usar?</summary><p>Não. Você pode criar temas em qualquer área do conhecimento. Os cronogramas prontos disponíveis hoje têm foco em medicina e concursos.</p></details><details className="rf-disclosure"><summary>Como o aplicativo escolhe a próxima revisão?</summary><p>No modo adaptativo, o FSRS-6 considera seu histórico e desempenho. Você também pode escolher intervalos fixos e ajustar suas preferências.</p></details><details className="rf-disclosure"><summary>Posso estudar sem internet?</summary><p>Depois do primeiro carregamento da versão instalada, as funções locais podem ser usadas offline. Faça backups dos seus dados; a sincronização entre dispositivos precisa de internet e configuração.</p></details></div></section>
        <section className="rf-landing-last"><p className="journal-eyebrow">O próximo capítulo é seu</p><h2>Comece pequeno.<br /><em>Continue curioso.</em></h2><button className="rf-primary" onClick={onStart}>Abrir meu espaço de estudo <ArrowRight size={18} /></button></section>
      </main>
      <footer className="journal-colophon"><span>ReviewFlow</span><p>Aprender. Retomar. Seguir em frente.</p><div><button onClick={() => onChangeView('privacy')}>Privacidade</button><button onClick={() => onChangeView('terms')}>Termos de uso</button></div></footer>
    </div>;
};
