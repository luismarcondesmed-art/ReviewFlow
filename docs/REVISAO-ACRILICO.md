# Revisão global e interface acrílica — 28/10/2026

## Escopo e resultado

Revisão estática dos pontos centrais de navegação, persistência local, sincronização, FSRS, backup, integrações externas, temporizador, notificações, atualização PWA e segurança do desktop. Inclui execução da suíte automatizada e inspeção do hub no navegador. Não é uma certificação de ausência de bugs nem uma auditoria das regras do Firebase implantadas.

## Interface entregue

- Fila de revisões antes dos atalhos e tarefas; ações secundárias em duas seções expansíveis.
- “Minha rotina” só monta os widgets quando aberta. O atalho Metas da lateral abre a seção automaticamente.
- Removida visualmente a faixa redundante de breadcrumb; navegação superior e lateral preservadas.
- Material acrílico na área de trabalho e barra superior, bordas suaves e espaçamento maior. CSS isolado em `src/styles/acrylic.css`.
- Opção anterior `mica` preservada nos dados, agora apresentada como Acrílico. Modos Editorial e Contraste continuam disponíveis.
- Sem blur quando não suportado; preferência de transparência reduzida e contraste elevado usa superfícies sólidas. Prefixo WebKit incluído, sem alegar efeito nativo do sistema Apple.
- Ajuste do filtro de trilhas em telas estreitas.

## Achados técnicos e prioridades

| Prioridade | Área | Evidência e ação |
| --- | --- | --- |
| Corrigido | Sincronização | Metadados persistidos eram espalhados sobre os defaults sem validar tipos. Strings, números negativos ou datas futuras podiam distorcer cooldown/backoff. Parser agora aceita apenas inteiros válidos, recupera entradas inválidas e limita falhas ao teto efetivamente usado. Teste de regressão incluído. |
| Corrigido | Hub | Ferramentas secundárias competiam com a ação principal e seus widgets eram montados sempre. Reorganização e montagem condicional. |
| Corrigido | Tipagem do foco | `any[]` substituído por revisão associada a tema e índice. |
| Alta, pendente | Controle de acesso remoto | Código simples de sincronização não equivale a autenticação forte. Inspecionar regras implantadas e migrar identidade/permissões antes de tratar o sistema como armazenamento privado robusto. Nenhuma regra foi alterada nesta entrega. |
| Média, pendente | Escala do Firebase | Documento único por usuário tem limite de tamanho; o guard de 800 KB evita exceder orçamento, mas não substitui particionamento futuro. Edições simultâneas do mesmo campo/tarefa não têm mesclagem por operação. |
| Média, pendente | Validação local | A leitura local faz verificações mais superficiais que o backup. Centralizar schemas com migração versionada reduziria diferenças de comportamento; preservar backups antes de endurecer validação de dados antigos. |
| Média, pendente | Manutenção | `App.tsx`, `components/index.tsx` e `modals/index.tsx` concentram muitas responsabilidades. `syncMerge`, calendário e cronograma ainda usam `any`. Refatorar por domínio em entregas com testes de regressão. |
| Média, pendente | Datas | O To-Do mantém a data escolhida em estado; uma sessão aberta durante a virada do dia não deve mudar silenciosamente a data da edição. Definir comportamento explícito de “hoje” antes de alterar. |
| Baixa, pendente | PWA | Intervalo de atualização em `UpdatePrompt` não tem limpeza explícita; revisar lifecycle se houver remontagens da aplicação. |
| Verificado | FSRS | Serviço usa histórico real, exclui datas inválidas/futuras e aplica limite máximo; testes existentes passaram. Acertos em questões continuam sendo aproximação de recordação, não validação pedagógica individual. |
| Verificado | Integrações | Notion restringe URLs a HTTPS e domínios esperados; ChatGPT é preparação manual de prompts. Nenhuma chave de IA adicionada. |
| Verificado | Desktop | Testes de isolamento de caminhos e restrição de links externos passaram. Não foi produzido instalador novo. |

## Validação

- TypeScript e 42 testes Vitest + 2 testes de segurança desktop passaram.
- `npm audit --omit=dev`: zero vulnerabilidades reportadas nesta execução; não inclui dependências de desenvolvimento.
- Inspeção visual do hub escuro em desktop e viewport de 390 × 844. Área principal sem overflow horizontal (clientWidth e scrollWidth de 376 px).
- Atalho lateral Metas abre o painel recolhido e mantém acesso às ferramentas.
- Ainda requer QA em dispositivos físicos iOS/Android, temas personalizados extremos, listas extensas e Firebase de produção. Não foi medido consumo real de Firestore nesta entrega.
