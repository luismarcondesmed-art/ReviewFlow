# ReviewFlow — revisão técnica e integração do hub

Data: 25/10/2026. Revisão estática dos fluxos de aplicação, persistência, sincronização, revisão, cronogramas, gráficos, formulários, navegação, PWA e desktop; testes automatizados e verificações de uso no navegador. Não equivale a um pentest nem a homologação em aparelhos físicos.

## Entregue

| Área | Problema identificado | Correção |
| --- | --- | --- |
| Navegação | Atalhos separados e ausência de histórico de telas | Ações tipadas compartilhadas entre hub, barra lateral, Notion e assistente; rotas por hash permitem voltar/avançar e recarregar a tela atual. |
| Hub | Muitos parágrafos, ações dispersas e indicadores incompletos | Acesso aos seis módulos, criar/buscar, foco, metas, ajustes, ajuda, estado da sincronização, Notion e ChatGPT. Questões e aproveitamento incluem simulados. |
| Continuidade | Tema, tarefa e material de apoio sem ligação direta | Menu da revisão inclui planejar hoje, abrir Notion e preparar resumo com o assunto já selecionado. A inclusão no plano evita duplicatas. |
| Persistência | Uma aba podia gravar por cima de alterações de outra | Reconciliação local de três vias, eventos de armazenamento e proteção contra troca de conta em outra aba. Não há leituras adicionais no Firebase para comunicação entre abas. |
| Dados inválidos | Inicialização podia substituir dados corrompidos por listas vazias | Interrupção com recuperação de backup antes de prosseguir; validação da resposta da nuvem antes da mesclagem. |
| Firebase | Aplicativo Firebase incorreto podia ser reutilizado; erros pouco claros | Reutilização apenas da configuração correspondente; mensagens para permissões, cota e rede. |
| Custo | Envios redundantes e conflitos entre abas | Mantidos lotes de 10 minutos/30 segundos no perfil prioritário, ausência de polling ocioso e escrita apenas quando muda. Lock/lease identificado e retentativas espaçadas. |
| Volume | Histórico podia ultrapassar o documento único | Limite preventivo de 800 KB de JSON antes de autenticar/enviar, e nova conferência depois de mesclar. O limite real também considera metadados; dados locais não são apagados. |
| Desempenho | Base de sincronização era lida/parseada a cada render | Inicialização única; reconciliação de disco somente quando os valores armazenados mudam. |
| Temporizador | Contagem baseada em ticks atrasava no segundo plano | Prazo absoluto, atualização na volta à aba e estado mantido durante a sessão de navegação. |
| Formulários | Foco podia sair de ajustes; Escape fechava diálogos empilhados | Contenção de foco em todos os diálogos, incluindo textarea e links; Escape atua apenas no diálogo superior. |
| Layout | Foco em um modal podia deslocar a janela inteira | Área do aplicativo fixada à viewport, mantendo a rolagem dentro dos módulos. |
| Dependências | gRPC transitivo do Firebase tinha alertas de segurança | Override para 1.13.6, versão corrigida. Auditoria de produção sem vulnerabilidades relatadas. |
| Envio Git | Watcher não funcionava em worktree com HEAD destacado | Destino explícito `--target=main`, validação prévia, push sem force e proteção contra edições durante o build. |

## Integração ChatGPT

A tela ChatGPT prepara pedidos de resumo, guidelines e questões a partir do assunto escolhido e de material opcional. O usuário copia o pedido, abre ChatGPT e envia na própria conversa. Não há geração embutida, OAuth, chave de API, cobrança de API ou transmissão automática. Rascunhos ficam no sessionStorage desta aba, separados por código local e contexto; não entram no Firebase. A resposta pode ser levada manualmente ao Notion.

O pedido de guidelines solicita fontes primárias verificáveis, entidade/ano, força da evidência e declaração de limitações. Isso orienta a resposta; não certifica a correção de conteúdo clínico. A integração futura por API exige backend, autenticação por usuário, limites de gasto e credenciais no servidor.

## Opções de design implementadas

Em Ajustes → Geral → Estilo da interface:

1. **Mica suave**: padrão, transparência apenas nas camadas de navegação; módulos com superfície mais opaca para leitura.
2. **Editorial**: superfícies sólidas, composição calma, sem desfoque adicional.
3. **Contraste**: bordas e texto secundário reforçados, superfícies sólidas.

O fundo continua personalizável. Safari/iOS recebe `-webkit-backdrop-filter` quando suportado, campos de 16 px e margem inferior segura. Navegadores sem suporte mantêm fundos legíveis; preferência por transparência reduzida ou mais contraste remove o desfoque. É uma aproximação visual na web, não o material Mica nativo do Windows. Não houve teste em iPhone/iPad físico.

## Limitações que continuam relevantes

- **Alta — autorização do Firebase:** o repositório não contém as regras publicadas nem credenciais do projeto real. Autenticação anônima mais código simples de compartilhamento não comprova propriedade de uma conta. Antes de distribuir dados privados, migrar para identidade verificável e associação server-side entre usuário e documento, com regras versionadas e testes no emulador. Nenhuma regra foi tornada pública ou modificada nesta atualização.
- **Média — documento único:** o bloqueio de tamanho evita tentativas repetidas inviáveis, mas não substitui uma migração para documentos por tema/resultado. A migração exige compatibilidade com instalações antigas e validação no projeto real; não foi realizada silenciosamente.
- **Média — conflitos simultâneos:** campos independentes são preservados; edições concorrentes no mesmo texto de tarefas/dia ou tema ainda usam resolução por campo/registro, sem CRDT. Não é um editor colaborativo de texto em tempo real.
- **Média — indexação:** temas, simulados, config, tarefas e progresso não são consultados por campo; considerar isentar esses campos de indexação no collection group `users` após conferir outros usos do projeto. A recomendação não foi aplicada à nuvem sem acesso às configurações existentes.
- **Média — manutenção:** `App.tsx`, modais e utilitários ainda concentram lógica histórica; a camada de ações e os serviços extraídos permitem evolução incremental. Não foram removidas funções existentes por uma reescrita ampla.
- **Baixa/Média — ferramentas:** instalação ainda relata 4 alertas em dependências de desenvolvimento (1 baixo, 3 moderados). A auditoria de produção retorna zero. Não foi usado `audit fix --force` nem downgrade do Firebase.
- **Desktop/PWA:** notificações dependem das permissões e das condições da plataforma. Binário desktop assinado, atualização do executável e validação física em iOS/Android continuam etapas distintas.

## Validação

43 testes: 41 Vitest + 2 desktop. TypeScript e build/PWA. Novos testes cobrem ausência de escrita redundante, mesclagem de alterações da nuvem, recusa de dados inválidos e grandes antes da rede, roteamento, planejamento sem duplicatas, preparação de guidelines e precisão do relógio. Chamadas Firebase foram simuladas; não houve teste com cobrança, medição real de consumo ou validação das regras em produção.

No navegador, ambiente separado em porta 3004: criar/concluir/remover tarefa entre duas abas, voltar pelo histórico, copiar pedido de guideline, abertura do Notion e troca de aparência. Dados reais do usuário não foram usados nesses testes.

## Publicação automática

`npm run submit -- --target=main` valida e envia uma atualização. `npm run autosubmit -- --target=main` observa o diretório, espera 60 segundos sem alterações, executa testes/build e faz commit/push. O observador precisa permanecer em execução; não é um serviço permanente instalado no Windows. Divergências remotas são rejeitadas pelo Git, sem force push. Nenhuma falha de validação deve ser publicada.

## Referências

- [OpenAI — credenciais no servidor](https://developers.openai.com/api/reference/overview)
- [Firebase — limites de documentos](https://firebase.google.com/docs/firestore/quotas)
- [Firebase — práticas de indexação e custo](https://firebase.google.com/docs/firestore/best-practices)
- [WebKit — backdrop-filter no Safari](https://webkit.org/blog/15865/webkit-features-in-safari-18-0/)
- [gRPC — advisory e versões corrigidas](https://github.com/grpc/grpc-node/security/advisories/GHSA-m9gg-hp2v-232j)

A conferência responsiva adicional usou uma área de navegação isolada de 390 px: largura do app e largura rolável permaneceram em 390 px. Transparência foi conferida em Chromium; suporte Safari foi implementado com base na documentação WebKit, sem alegar homologação em dispositivo iOS.
