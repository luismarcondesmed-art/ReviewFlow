# ReviewFlow — workspace inspirado no Windows

## Direção

A interface foi reorganizada como um aplicativo de trabalho: moldura contínua, navegação lateral, abas superiores contextuais e camada de conteúdo. Substitui a direção editorial anterior, com fonte serifada, verde e títulos promocionais grandes.

O componente `src/components/AppShell.tsx` concentra essa estrutura. O painel inicial mantém revisões, indicadores, próximos encontros e ferramentas, com uma hierarquia mais compacta. Inter variável é a fonte principal, servida localmente, com Segoe UI Variable Text e Segoe UI como alternativas. Textos regulares usam peso 400; destaque é reservado a títulos e ações.

## Camadas e material

A base usa cinzas neutros e reflexos discretos. A área de conteúdo tem fundo de baixa transparência, borda sutil e elevação pequena; menus e diálogos usam desfoque de fundo. Há versões clara e escura, preferência por movimento reduzido, fallback sem backdrop-filter e ajustes para forced-colors.

Isto é uma aproximação visual no navegador. O Mica nativo incorpora o tema e o papel de parede do Windows por APIs do sistema; CSS não dá ao site acesso ao papel de parede nem à área de trabalho atrás do navegador. Não foram adicionados controles falsos de minimizar, maximizar ou fechar uma janela nativa.

Referência: [Microsoft — Mica material](https://learn.microsoft.com/en-us/windows/apps/design/style/mica), particularmente o uso de uma base contínua com uma camada de conteúdo para diferenciar áreas permanentes da aplicação.

## Navegação simultânea

No desktop, a lateral e a barra superior ficam disponíveis ao mesmo tempo:

- Lateral: Meu dia, Cronograma, Agenda, Matérias, Simulados e Estatísticas. Ela pode ser recolhida para ícones; a preferência é lembrada no dispositivo.
- Ferramentas: Anotações, Metas e Temporizador abrem o recurso correspondente no painel, sem remover os demais acessos às ferramentas.
- Abas superiores: Meu dia/Estatísticas, Cronograma/Agenda ou Matérias/Simulados, conforme o módulo aberto. Ambas as navegações atualizam o mesmo estado de tela.
- Busca global: comando na barra superior e atalho Ctrl+K/Cmd+K.
- Criar: menu com Novo tema e Novo simulado. Novo tema também fica disponível na lateral e nos módulos pertinentes.
- Configurações, ajuda, perfil e sincronização continuam acessíveis pela moldura do aplicativo.

Em telas estreitas, a lateral vira um painel de navegação acionado pelo menu. Ela tem fechamento por botão, clique externo e Escape, além de contenção de foco. As abas superiores continuam visíveis. Os controles e textos se reorganizam para evitar rolagem horizontal da página.

## Funções preservadas

Os manipuladores de temas, revisões normais/rápidas, edição de histórico, FSRS, cronogramas, calendário, simulados, notas, metas, estatísticas, importação/exportação, notificações, instalação PWA, foco, gamificação e sincronização continuam ligados aos componentes existentes. O estado de estudo não foi migrado nem reformatado por esta mudança de interface.

Os dois caminhos para registrar simulados (menu Criar e botão na tela Simulados) limpam a seleção anterior antes da criação. Os atalhos de ferramentas não mudam as configurações do método de estudo.

## Verificação

Checagem TypeScript, testes de domínio e build de produção fazem parte do envio. A conferência visual realizada mostrou o desktop com navegação lateral expandida/recolhida, abas superiores e menu de criação. A inspeção automatizada do navegador ficou indisponível na etapa final, impedindo concluir a conferência móvel e percorrer todos os formulários. As fontes são incluídas no precache da PWA.

Essa conferência não equivale a uma auditoria completa de acessibilidade, a testes com estudantes nem à homologação em dispositivos físicos. O efeito visual não transforma a PWA em um aplicativo WinUI nativo.

## Cor de destaque e formulários

Em Ajustes → Geral, a cor de destaque pode ser escolhida entre seis opções ou pelo seletor de cor nativo. A alteração é aplicada ao salvar e persiste na configuração do usuário, incluindo backup e sincronização. Os tons de navegação, foco, seleções e ações principais usam a mesma paleta. Cores muito claras são ajustadas nas ações preenchidas para manter contraste de pelo menos 4,5:1 com texto branco; as cores de desempenho e alertas mantêm seu significado.

Os formulários de matérias e simulados usam largura máxima de 620 px, uma área interna de rolagem e ações fixas no rodapé. As informações essenciais aparecem primeiro; organização, tags, aulas e reforço ficam em seções expansíveis. O formulário de matérias preserva o histórico e os ajustes personalizados. O registro de simulados calcula o aproveitamento durante o preenchimento e exige números inteiros, total positivo e acertos entre zero e o total. Os campos têm rótulos associados e os criadores contêm a navegação por Tab.

Nesta atualização, foram conferidos no navegador os formulários no desktop e o simulado em 390 × 844 px, incluindo limites de largura e ações visíveis. A seleção de cor foi aplicada, salva e conferida após recarregamento. Os testes de paleta cobrem preferências inválidas e contraste de cores personalizadas. Isso não substitui a homologação em iOS e Android físicos.

## Atualização 2.0

O controle de cores foi substituído por **Cor de fundo**; o seletor anterior de destaque não é mais exibido. A paleta de ações permanece estável, e o tema do texto acompanha a luminância do fundo escolhido. To-Do Today aparece diretamente em Meu dia; Anotações tem uma tela própria com lista de matérias e leitor Notion. O tutorial foi refeito em 12 passos, com seletor para ir direto a uma função. Veja [o registro da versão](REVIEWFLOW-2.0.md) e [o guia do usuário](GUIA-REVIEWFLOW-2.0.md).

Nesta rodada foram conferidos no navegador o tutorial inicial, a criação/conclusão/edição de tarefas e sua persistência ao navegar, a seleção de matérias em Anotações, a abertura da edição do vínculo, a rejeição de links inválidos e a mudança do fundo sem alteração do destaque. Meu dia e Anotações foram percorridos em 390 px. A leitura de um caderno real do Notion e testes físicos permanecem pendentes.

## Atualização dos gráficos — 25/10/2026

- Estatísticas com evolução por período, alternância questões/acertos e agrupamento explícito para históricos longos.
- Gráficos compartilhados entre Meu dia, Simulados e Estatísticas, sem biblioteca adicional.
- Escala de acertos de 0 a 100%, meta identificada e períodos sem questões sem percentual inventado.
- Calendário de atividade selecionável por toque/teclado, usando a data real de conclusão e ignorando registros excluídos.
- Carga futura com horizonte de 1/7/30/90 dias; totais limitados ao intervalo e atrasos mostrados separadamente.
- Recência distingue temas nunca revisados de temas antigos, sem chamar isso de retenção.
- Tabelas alternativas, foco visível, anúncios dos pontos selecionados e movimento reduzido.
- Tipografia, navegação e espaçamento refinados, mantendo o fundo configurável e a estrutura Mica.

Referências: [Fluent 2 — acessibilidade](https://fluent2.microsoft.design/accessibility) e [Microsoft — visualização de dados](https://learn.microsoft.com/en-us/office/dev/add-ins/design/data-visualization-guidelines).

Validação: TypeScript, 33 testes Vitest e 2 testes desktop; build/PWA. Conferência no navegador em temas claro/escuro e largura de 390 px, com dados fictícios isolados, seleção de ponto pelo teclado, seleção de dia e tabela de valores. Sem teste físico de iOS/Android. Nenhum dado fictício foi gravado na conta ou incluído no aplicativo.
