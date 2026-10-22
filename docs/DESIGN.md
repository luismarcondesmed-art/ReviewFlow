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
