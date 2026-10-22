# ReviewFlow 2.0 — implementação e limites

O [guia do usuário](GUIA-REVIEWFLOW-2.0.md) cobre navegação, matérias, prioridades, revisões, FSRS, intervalos fixos, To-Do Today, Notion, cronogramas, agenda, Kanban, simulados, estatísticas, metas, foco, cores, notificações, dados e instalação. O guia também abre no primeiro acesso à versão 2.0 e pode ser reaberto em Ajuda.

## Notion configurável

Anotações é uma área própria da navegação. A matéria guarda `notionLink` (campo existente, preservado) e `notionEmbedUrl`. Um caderno inicial opcional fica nas configurações. Ao clicar em uma matéria, um código de incorporação configurado é aberto no leitor interno; links sem incorporação são abertos no Notion em uma nova aba/janela. O botão externo permanece disponível quando a incorporação for bloqueada ou exigir autenticação.

O app extrai somente o `src` do código de iframe, valida HTTPS e os domínios oficiais do Notion, e não injeta HTML. Não há token de integração, publicação automática, cópia dos textos do Notion para o Firebase nem OAuth. Páginas privadas continuam privadas e abrem no Notion. Domínios próprios do Notion Sites não são aceitos nesta primeira integração; use o endereço oficial `notion.site`.

O [Notion documenta a incorporação de páginas publicadas](https://www.notion.com/help/public-pages-and-web-publishing). É necessário copiar o código de **Incorporar esta página**. O app não consegue tornar uma página privada incorporável por conta própria. Nenhum caderno real foi fornecido para homologar autenticação ou conteúdo de uma conta Notion.

## Redução de chamadas ao Firebase

- Salvamento local imediato. Somente os campos locais que mudaram são regravados no armazenamento.
- Usuários comuns: intervalo mínimo de dez minutos entre tentativas automáticas. Alterações são agrupadas, sem reiniciar um debounce a cada tecla.
- Perfil prioritário: trinta segundos entre tentativas automáticas. Administradores confirmados pela claim `admin: true` do Firebase também recebem esse intervalo. O reconhecimento do perfil por resumo SHA-256 define apenas frequência; não concede privilégios administrativos.
- Sincronização manual: mínimo de um minuto para usuários comuns e três segundos no perfil rápido. Falhas impõem espera progressiva até uma hora, também após recarregamento.
- Abas ocultas não sincronizam automaticamente. Foco, retorno da rede e abertura inicial pedem uma leitura respeitando o intervalo persistido. Sem alterações, o temporizador não consulta o Firestore.
- Web Locks coordenam abas do mesmo navegador. Em webviews sem Web Locks, uma concessão temporária de dois minutos reduz duplicações, sem garantia forte de exclusão mútua.
- A transação faz uma leitura e só escreve se o conteúdo combinado for diferente do documento remoto. Metadados como `updatedAt` não provocam gravações por si só. Até três tentativas por transação.
- Alterações feitas durante o envio continuam sendo preservadas; exclusões de temas e simulados usam marcadores de exclusão. O status distingue dados pendentes no aparelho de sincronização concluída.

Isso reduz tentativas e elimina gravações redundantes; não é uma medição de economia em reais. A comparação de payload e a política são cobertas por testes; não houve teste de carga faturável no projeto Firebase. O acesso continua pelo modelo de código compartilhado existente: quem conhece o código pode acessar o documento, sujeito às regras do projeto. A versão não altera nem publica regras Firestore. Autorizações administrativas reais dependem de [claims atribuídas no servidor](https://firebase.google.com/docs/auth/admin/custom-claims).

Leituras de transação e repetições ainda podem ser cobradas conforme as [regras de transações do Firestore](https://firebase.google.com/docs/firestore/manage-data/transactions). A sincronização entre dois dispositivos não é instantânea; use o botão manual antes de trocar de aparelho. Edições simultâneas de tarefas no mesmo dia ou no mesmo campo de configuração ainda usam a preferência local da combinação de três versões. Para resolver cada tarefa independentemente, a próxima etapa é migrar para registros com identificador próprio e timestamp, com migração explícita.

## Correções de uso

- Um vínculo Notion, título ou tag não adia uma revisão vencida.
- Mudanças de data ou intervalos preservam todos os registros concluídos. O recálculo foi centralizado em `topicEditing.ts`, com regressões para FSRS e modo fixo.
- Prioridades Extrema e Opcional, presentes nos cronogramas antigos, podem ser editadas sem perder seu valor.
- A etapa do Kanban agora pode ser alterada na edição da matéria.
- Corrigir a data de uma revisão concluída também corrige o horário usado na reconstituição FSRS. Resultados impossíveis são rejeitados.
- Editar ou excluir simulados remove marcações de aulas difíceis que deixaram de existir em provas ativas.
- A lista diária persiste cada alteração no estado central: sair da tela não perde os últimos 500 ms de edição. O formato anterior de anotações por dia foi mantido.
- Trocar de código não aplica configurações da conta anterior à nova conta. Outra aba é avisada e interrompe salvamentos quando detecta troca de conta.
- Importações validam tarefas, acertos e datas dos simulados; itens substituídos recebem marcadores para evitar reaparecimento na próxima sincronização. A cópia anterior permanece guardada.
- Avatar acompanha a configuração do usuário, em vez de um valor global que se sobrepunha ao dado sincronizado.
- A tela de erro oferece exportação para recuperação em vez de apagar estudos. Notificações evitam envio simultâneo duplicado.
- O servidor de desenvolvimento ignora `release/` para não tentar observar executáveis Windows em uso.

## Aparência

O seletor passa a controlar `backgroundColor`. A preferência antiga de destaque permanece nos backups, mas deixa de alterar a navegação; os destaques voltam à paleta padrão. O tema do texto é escolhido conforme a luminância do fundo. Remover a personalização faz o aplicativo voltar ao fundo claro/escuro do tema. As superfícies têm variações discretas da cor escolhida.

## Base desktop

A aplicação web/PWA continua funcionando. `desktop/main.cjs` abre o mesmo build em Electron 45, com sandbox, isolamento de contexto, Node desabilitado no renderizador, protocolo local próprio, restrição de navegação, validação de caminhos e política de conteúdo. Links HTTPS externos abrem no navegador do sistema. Não há API nativa exposta ao iframe do Notion. Referência: [segurança do Electron](https://www.electronjs.org/docs/latest/tutorial/security/).

Em Windows, com Node 22.12 ou superior:

```powershell
npm ci
npm run desktop:dev
npm run desktop:pack
npm run desktop:build
```

`desktop:pack` produz a pasta `release/win-unpacked`; `desktop:build` gera um executável portátil. O runtime é baixado do Electron quando necessário. O pacote é um protótipo sem assinatura: antes de distribuir ao público, faltam identidade visual do executável, assinatura, instalador definitivo, atualização automática de binários e testes em dispositivos físicos. A publicação automática no GitHub/Vercel atualiza a web, não o binário desktop. O armazenamento do navegador e do Electron é separado: use exportação/importação ou o código de sincronização para levar os dados.

O pacote Windows foi gerado; a interface nativa não foi homologada em uso real. Os testes cobrem o confinamento dos caminhos locais e os protocolos permitidos nos links externos. A instalação das dependências reportou 19 avisos de auditoria (10 moderados e 9 altos); a consulta detalhada ao serviço de auditoria npm retornou HTTP 503. Nenhuma atualização forçada com quebra de compatibilidade foi aplicada. A auditoria de dependências e a assinatura continuam pendências antes da distribuição desktop pública.
