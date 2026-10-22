# ReviewFlow 2.0

Planejamento de estudos e revisão espaçada para medicina, concursos e outras áreas do conhecimento. React, TypeScript, Vite e PWA.

Esta versão inclui anotações do Notion por matéria, To-Do Today, cor de fundo configurável, sincronização agrupada e base desktop Windows em Electron.

- [Guia didático de todas as funções](docs/GUIA-REVIEWFLOW-2.0.md)
- [Implementação, correções, sincronização e base desktop](docs/REVIEWFLOW-2.0.md)

A sincronização automática comum respeita dez minutos entre tentativas; o perfil prioritário usa trinta segundos. Não há gravação de payloads iguais. Um código curto é aceito e não representa uma permissão administrativa. Notion incorpora páginas publicadas mediante o código fornecido pelo próprio Notion; páginas privadas abrem no serviço.

## Desenvolvimento

Requer Node.js 24 e npm.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. O modo local não precisa de Firebase ou Gemini. Para sincronização, copie `.env.example` para `.env.local` e configure o Firebase. Nunca adicione `.env.local` ao Git.

```sh
npm run check   # TypeScript e testes
npm run build   # Bundle e service worker de produção
npm run preview # Testar a versão compilada
npm run desktop:pack # Gerar pasta de teste Windows, sem instalar
npm run desktop:build # Gerar executável portátil de protótipo
```

## Revisão adaptativa

Em Ajustes → Algoritmo, configure FSRS-6, retenção desejada (padrão 90%) e intervalo máximo (padrão 730 dias). Novos usuários começam com FSRS ativo; configurações antigas são preservadas. Há também modo fixo com intervalos personalizados. O agendamento adaptativo usa o histórico de conclusões e gera uma única próxima revisão após cada conclusão, continuando por anos. Questões agregadas estimam recordação; flashcards com avaliação individual são uma evolução planejada.

O motor usa `ts-fsrs` 5.4.2 (FSRS-6, 21 parâmetros), sem cobrança por API. Passos em minutos estão desativados porque a unidade atual é um bloco diário de estudo. Pesos personalizados por usuário ainda não são treinados.

## Dados e sincronização

Dados ficam salvos no navegador. Exporte backups regularmente em Ajustes → Dados. O backup inclui temas, revisões, simulados, configurações, progresso e notas. Trocas de chave e importações preservam cópias locais anteriores.

Se configurado, o Firebase sincroniza na abertura, reconexão, solicitação manual e após 30 segundos sem edições. Não há categorias administrativas concedidas por variáveis públicas. A chave de sincronização é um segredo compartilhado: use o gerador de chave segura e mantenha a chave privada. É necessário auditar as regras reais do Firestore antes de disponibilizar sincronização publicamente. Este repositório não implanta regras nem cria autorização de servidor.

## IA futura

`VITE_ENABLE_AI=false` é o padrão. Não há chave Gemini nem SDK do provedor no frontend. O banco didático e as heurísticas locais funcionam sem chamadas pagas. `api/ai/[action].ts` reserva a rota Vercel e retorna JSON 503; habilitar a flag sozinha não ativa IA. A integração futura deve usar segredo no servidor, autenticação, orçamento e limitação de chamadas.

## Atualização automática do código no GitHub

```sh
npm run autosubmit
```

Mantenha esse processo em execução em um terminal separado enquanto trabalha. Após 60 segundos sem edições nos arquivos do projeto, ele verifica credenciais conhecidas, tipos, testes, whitespace e build; depois cria commit e faz push para a branch atual em `origin`. Há uma nova tentativa a cada cinco minutos, inclusive para commits cujo push falhou. Encerre com Ctrl+C. O processo precisa de acesso de gravação ao Git e autenticação existente no GitHub; não sobrevive a desligar o computador e não instala uma tarefa do Windows.

Para enviar uma única atualização validada: `npm run submit` ou `.update.bat`.

O script usa uma lista de caminhos permitidos, exclui ambientes/credenciais, respeita arquivos já preparados manualmente e nunca faz force push, reset ou merge automático. Rejeições de push são reportadas para resolução. O detector de credenciais é uma proteção básica, não uma garantia de detectar todo segredo. Os workflows GitHub repetem os checks em pushes e pull requests. Se o projeto já está conectado à Vercel, um push para a branch de produção pode disparar o deploy configurado lá.

## Atualização do aplicativo instalado

A PWA verifica novas versões e apresenta um aviso para aplicar a atualização ao concluir uma edição. CSS é compilado localmente, e os arquivos do app são armazenados pelo service worker. A instalação inicial e a sincronização exigem conexão. Fontes externas usam fallback do sistema quando indisponíveis. Notificações locais dependem da página em execução; alertas com app fechado exigem uma futura integração push.

## Análise e próximos passos

A interface usa Inter local, camadas neutras inspiradas no Mica, barra lateral recolhível e navegação superior contextual. Veja [as decisões de design](docs/DESIGN.md) para a organização dos módulos, responsividade e limites da aproximação web do material nativo do Windows.

Veja [a análise global](docs/ANALISE-GLOBAL.md) para a avaliação da arquitetura, interface, segurança, desempenho, limitações e prioridades de evolução. iOS/Android físicos, autorização Firestore, IndexedDB, cronogramas autorais e flashcards completos permanecem itens de validação/desenvolvimento.
