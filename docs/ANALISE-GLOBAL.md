# ReviewFlow: análise de código e produto

Data: 21 de outubro de 2026. Base examinada: commit 2d62f0f, mais as alterações desta entrega.

## Objetivo e direção

O produto deve conectar quatro atividades: escolher o que aprender, estudar, recuperar o conteúdo da memória e acompanhar resultados. O planejamento precisa continuar funcionando depois de uma prova e acomodar um ou dois anos sem exigir que o estudante cadastre manualmente cada revisão.

O FSRS-6 agora agenda o próximo encontro após uma conclusão. Não é necessário gerar antecipadamente dois anos de revisões fictícias: o desempenho real modifica os intervalos. A data da prova continua disponível para o planejamento fixo; o FSRS não antecipa automaticamente uma revisão final por causa da prova.

## Arquitetura atual

React 19 e TypeScript, Vite 7, PWA com Workbox, Firebase anônimo opcional. App.tsx coordena navegação e operações. hooks/index.ts contém sincronização, calendário e analytics. utils/index.ts concentra regras de carga, otimização e estatísticas. components/index.tsx e modals/index.tsx são módulos grandes. As telas usam lazy loading, mas todos os cronogramas entram no mesmo chunk da tela de cronograma.

Os dados primários são temas, revisões, simulados, configurações, progresso de aulas e notas diárias. Há persistência imediata no navegador. Uma chave compartilhada identifica o documento remoto. Os conflitos de temas e simulados continuam usando a última atualização do item, enquanto configurações, progresso e notas são mesclados por chave. Duas alterações simultâneas no mesmo tema podem concorrer: a transação impede sobrescrever o documento inteiro com uma leitura obsoleta, mas não produz um histórico imutável por revisão.

## Correções implementadas

- IA paga desativada por padrão; não há chave nem SDK de provedor no frontend. Rota de produção reservada responde JSON 503. Há distribuição e banco didático locais.
- FSRS-6 via ts-fsrs 5.4.2, 21 parâmetros padrão, retenção entre 80% e 97%, intervalo máximo configurável (padrão 730 dias), histórico de conclusões e estado serializado por tema. Sem otimização personalizada de pesos nesta etapa.
- Novos temas em modo FSRS começam pelo estudo inicial; conclusões normais e rápidas deixam exatamente uma revisão futura. Alterações nos parâmetros recalculam os temas com histórico. Revisões antigas migram por replay. Acerto agregado é uma aproximação de recordação, não equivale a avaliações individuais de flashcards.
- Sincronização com transação, recuperação de autenticação, mesclagem por campo e preservação de edições durante requisições. Estado online somente depois de uma gravação bem-sucedida. Autosync após 30 segundos sem alterações, reconexão e abertura, sem os antigos limites locais por categoria de usuário.
- Removida a inferência de administrador a partir de variáveis públicas. A preferência local de foco automático não representa autorização de servidor.
- Troca de chave preserva backup local; chaves novas são validadas e há gerador aleatório. Dados corrompidos são copiados antes da recuperação. Falhas de armazenamento têm aviso.
- Backup exportado inclui progresso e notas. Importação valida a estrutura e preserva cópia anterior. Itens restaurados recebem atualização recente para concorrer corretamente na sincronização.
- CSS compilado localmente; retirada a dependência do Tailwind e confetti via CDN. Zoom permitido, inputs maiores, viewport dinâmico e respeito a movimento reduzido.
- Atualizações PWA disponíveis por aviso, com botão para aplicar depois de concluir uma edição. Recarregamento automático no meio de um formulário foi evitado.
- Notificações não bloqueiam esperando um service worker inexistente e verificam suporte/permissão antes de executar.
- Meta sem atividades começa em zero. Questões de treino são identificadas como simuladas.
- Workflow GitHub verifica tipos, testes e build. Envio automático local valida antes de criar commit e fazer push.

## Revisão da interface

Inspeção no navegador local: painel, cadastro de tema fora da medicina, conclusão de revisão e acervo; ajustes de algoritmo em viewport de 390 × 844. O fluxo de teste cadastrou Álgebra, registrou 20 de 25 acertos e atualizou o painel para 80%. O ambiente de teste fica em localhost, sem sincronização configurada.

A identidade visual tem boa consistência de cartões, cores e navegação. A barra inferior é adequada ao celular. Os ajustes FSRS ficam em uma coluna em telas estreitas, com ações de salvar acessíveis. O painel ainda apresenta muita informação para um usuário novo, e vários rótulos e indicadores usam texto de 9–11 px. Há botões somente com ícones e formulários antigos sem associação completa entre label e input. O modal comum ainda precisa de gestão completa de foco, retorno ao elemento original e testes de leitor de tela.

Os filtros de residência e FAFIPA permanecem muito destacados. Para ampliar a todas as áreas, recomenda-se perguntar a área de interesse no onboarding, mostrar trilhas relevantes e permitir cronogramas autorais. O nome principal já foi generalizado, mas os cronogramas embarcados continuam predominantemente médicos.

No acervo, a porcentagem de revisões concluídas não representa domínio nem retenção, especialmente em um ciclo FSRS contínuo. O indicador principal deve evoluir para “em dia/atrasado”, próximo encontro e histórico de acertos. A retenção exibida por widgets antigos é estimativa; não deve ser apresentada como garantia de memória.

## Pendências por prioridade

### P0 — proteção e durabilidade dos dados

1. Auditar e implantar as regras reais do Firestore. Elas não foram fornecidas e não foram alteradas remotamente. A chave atual é um segredo compartilhado: quem a possui pode tentar acessar o mesmo documento. O gerador reduz previsibilidade, mas não substitui contas autenticadas e autorização no servidor. Não habilitar listagem pública de usuários. Não afirmar segurança apenas com base no frontend.
2. Migrar de um documento com todos os dados para coleções por tema, sessão e cartão. O limite de um documento Firestore e a gravação de arrays inteiros prejudicam anos de histórico. Implementar eventos de revisão com ID estável, resolução por campo e testes com emulador.
3. Migrar persistência primária para IndexedDB, com migrações versionadas e exportação de segurança. localStorage tem quota pequena, escrita síncrona e é vulnerável à remoção de dados pelo navegador. Múltiplas abas editando o mesmo armazenamento ainda exigem coordenação explícita.

### P1 — método de estudo e expansão

4. Implementar flashcards completos: baralhos, frente/verso, sessão de evocação, quatro avaliações explícitas, FSRS por cartão, importação e exportação. Não existe um módulo completo de flashcards nesta entrega.
5. Permitir criar e importar cronogramas de qualquer área, com disciplinas e temas personalizados. Os cronogramas existentes continuam úteis como modelos médicos.
6. Separar planejamento de aulas da fila de revisão. Exibir duração disponível e carga estimada; deixar claro quando o limite diário redistribui uma data sugerida pelo FSRS.
7. Curadoria de questões: fonte, licença, ano e revisão editorial. O motor local usa material simulado e heurísticas; não é um acervo oficial validado. Revisar a correção pedagógica e médica separadamente antes de publicação ampla.
8. Evitar que “concluir em um clique” atribua 100% sem medição. O comportamento atual foi preservado e agora agenda o próximo encontro; a UI já informa que esse atalho registra aproveitamento integral.

### P1 — experiência móvel e qualidade

9. Testar Safari em iPhone/iPad e Chrome em Android reais: teclado, safe areas, rotação, instalação, modo offline, atualização de service worker, restauração e reconexão. Viewport estreito no navegador desktop não certifica essas plataformas.
10. Lembretes com app fechado precisam de push e backend; setInterval na página só funciona enquanto a página executa. Não prometer alertas agendados com o app fechado.
11. Estabelecer orçamento de desempenho e medir em aparelhos modestos. O build desta entrega precacheia aproximadamente 1,65 MB antes de compressão. O chunk de cronograma é aproximadamente 321 kB, e o Firebase aproximadamente 517 kB. Lazy loading por provedor e virtualização do acervo são próximos passos.

### P2 — manutenção

12. Dividir App, hooks, componentes e modais em módulos de domínio; habilitar strict progressivamente, adicionando validação de dados nas fronteiras. Não ativar strict em massa sem reparar os contratos existentes.
13. Consolidar páginas de estatísticas e funções duplicadas de streak. Usar datas de conclusão nas métricas de atividade, mantendo datas agendadas para planejamento.
14. Resolver os avisos restantes de dependências com atualizações avaliadas individualmente. A atualização compatível eliminou os alertas críticos da primeira instalação; restam 11 avisos no audit consultado, incluindo a cadeia gRPC do Firebase e dependências de desenvolvimento do Tailwind 3. Não foi aplicado o downgrade incompatível sugerido pelo audit para Firebase.

## Validação e limites

Checagem TypeScript e testes de FSRS/mesclagem executados. Os testes cobrem continuidade por dois anos, uma única revisão futura, falha de recordação, retenção, teto de intervalo, data local, mesclagem por campo, exclusões e edições durante requisição. Build de produção e geração do service worker verificados.

Não houve teste com Firebase real, emulador, credenciais de produção, dispositivos físicos, leitores de tela ou carga de milhares de temas. Não foi publicado um deploy Vercel por esta execução; um push pode disparar o deploy já conectado ao repositório.

Referência de implementação: https://github.com/open-spaced-repetition/ts-fsrs e https://open-spaced-repetition.github.io/ts-fsrs/ . O mecanismo utilizado identifica-se como “v5.4.2 using FSRS-6.0”. Pesos padrão não foram treinados com dados dos usuários do ReviewFlow.
