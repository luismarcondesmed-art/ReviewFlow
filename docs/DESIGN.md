# ReviewFlow — direção visual editorial

## Intenção

Trocar o painel de cartões com peso visual semelhante por uma sequência de leitura: o que fazer agora, o que vem depois e ferramentas de apoio. Tipografia, espaço e divisórias organizam as informações, sem depender de uma coleção de caixas arredondadas.

## Sistema visual

- Source Serif 4 variável em títulos, textos e controles, com Georgia como fallback. Arquivos WOFF2 locais para o alfabeto latino, normal e itálico, aproximadamente 51 kB cada. Pesos variáveis; sem pedido ao Google Fonts.
- Papel claro `#f7f5ef`, tinta `#253d30`, verde de ação `#245d47` e linhas discretas. No tema escuro, fundo `#1b211e`, tinta `#e8eadf` e verde claro `#b4d2b0`.
- Seções abertas, listas alinhadas, bordas de separação e botões com raios pequenos. Números usam algarismos tabulares.
- Ação principal com presença suficiente para ser encontrada rapidamente. Ações secundárias aparecem como texto ou contorno.

## Mudanças de organização

1. “Dashboard” passa a “Hoje”. Navegação de desktop em uma única linha; navegação inferior preservada no celular. Pesquisa, configurações e perfil continuam acessíveis.
2. Painel abre com a ação de iniciar a revisão. A fila usa linhas numeradas, contexto do tema e botão Revisar. Editar e registrar aproveitamento integral ficam em opções secundárias.
3. Próximos encontros aparecem em uma lista lateral no desktop e abaixo no celular. Ferramentas de anotações, metas, simulados, constância, reforço e carga ficam em “Seu caderno”.
4. Estatísticas usam uma faixa de indicadores, seleção de período e lista de áreas; a classificação por tempo desde o estudo fica em uma seção expansível, com explicação de seu limite.
5. A página de entrada apresenta o ciclo de aprendizado em sequência, com explicação de funcionamento e perguntas frequentes. Os textos legais existentes foram preservados.
6. Pesquisa deixa de cobrir a tela com uma mensagem vazia: exibe temas e simulados encontrados, com abertura direta para edição. Escape ou o botão de fechar limpam a busca.

## Responsividade e acessibilidade

As duas métricas operacionais mais importantes ficam no início do celular; o restante está disponível em Estatísticas. Layouts se reorganizam em uma coluna. Existem estilos de foco visível, rótulos na navegação e tabulação por setas nas ferramentas do caderno. Preferência por movimento reduzido continua respeitada. As fontes também entram no precache da PWA.

Contrastes calculados entre as cores principais (sem opacidade): texto secundário claro 4,66:1, verde de ação claro 7,05:1 e texto secundário escuro 7,56:1. Isso não substitui uma auditoria completa de todos os estados e componentes antigos.

## Referências e limites

- [Google Design — pesquisa do Material 3 Expressive](https://design.google/library/expressive-material-design-google-research): destacar ações e usar hierarquia de tamanho, forma e cor para orientar a atenção. A proposta do ReviewFlow interpreta esses princípios em uma linguagem editorial; não replica os componentes Material.
- [Nielsen Norman Group — Cards](https://www.nngroup.com/articles/cards-component/): listas de posição previsível favorecem a procura e a comparação de itens; cartões continuam úteis em outros contextos, mas não precisam organizar toda a interface.

Conferência em navegador local com temas claro/escuro, viewport de 390 px, fonte carregada, ausência de rolagem horizontal da página inicial, cadastro de tema, início de revisão, busca e abertura de edição, estatísticas e página de entrada. Tipos, testes de domínio e build são verificados antes do envio.

Não houve pesquisa de usabilidade com estudantes nem teste em aparelhos físicos nesta entrega. A nova hierarquia é uma hipótese de melhoria fundamentada nos princípios acima e deve ser avaliada com uso real. Telas de cronograma, acervo, calendário e modais receberam a tipografia e os tokens comuns; seus fluxos específicos foram preservados, com simplificação das superfícies existentes.
