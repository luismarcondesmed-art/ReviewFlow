import { FafipaQuestion } from './fafipaQuestionService';

export interface PortugueseQuestion extends FafipaQuestion {
    subtema: string;
    prioridade: 'alta' | 'media' | 'baixa';
    metaQuestoes: number; // 10 a 20 questões conforme prioridade
}

export const PORTUGUESE_QUESTION_BANK: PortugueseQuestion[] = [
    // -------------------------------------------------------------
    // TEMA 1: ORTOGRAFIA E ACENTUAÇÃO GRÁFICA (Prioridade Média: 15 Qs)
    // -------------------------------------------------------------
    {
        id: 'port-4000206882',
        topic: 'Ortografia e Acentuação Gráfica',
        subtema: 'Regras de Acentuação Gráfica (Oxítonas, Paroxítonas e Proparoxítonas)',
        prioridade: 'media',
        metaQuestoes: 15,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Prefeitura / Médico',
        enunciado: 'Em um dos textos, o autor discute: "...ao mesmo tempo, de suportar as dores diárias da sobrevivência... pois desde que nascemos as pedras espreitam nosso caminho... Não só os da periferia geográfica... Aliás, ser artista neste país não é um privilégio...".\n\nTodos os vocábulos abaixo, retirados do texto, recebem o acento gráfico em razão da mesma regra de acentuação, EXCETO:',
        alternativas: [
            { letra: 'A', texto: 'diárias' },
            { letra: 'B', texto: 'sobrevivência' },
            { letra: 'C', texto: 'geográfica' },
            { letra: 'D', texto: 'privilégio' }
        ],
        respostaCorreta: 'C',
        justificativa: 'Os vocábulos "di-á-rias", "so-bre-vi-vên-cia" e "pri-vi-lé-gio" são acentuados pela regra das paroxítonas terminadas em ditongo oral crescente (eventualmente tratadas como proparoxítonas eventuais). Já "geo-grá-fi-ca" diverge das demais porque é proparoxítona pura, e toda palavra proparoxítona é obrigatoriamente acentuada.',
        dicaBanca: 'Bancas de concursos adoram opor paroxítonas terminadas em ditongo crescente a proparoxítonas legítimas. Lembre-se: toda proparoxítona é acentuada!'
    },
    {
        id: 'port-4000206895',
        topic: 'Ortografia e Acentuação Gráfica',
        subtema: 'Emprego do Hífen e Novo Acordo Ortográfico',
        prioridade: 'media',
        metaQuestoes: 15,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Prefeitura / Médico',
        enunciado: 'Quanto às regras de ortografia e emprego do hífen conforme o Novo Acordo Ortográfico, assinale a alternativa em que há uma palavra grafada INCORRETAMENTE:',
        alternativas: [
            { letra: 'A', texto: 'super-homem, sobrenatural, cosseno.' },
            { letra: 'B', texto: 'cooperador, coexistente, agroindustrial.' },
            { letra: 'C', texto: 'anti-inflacionário, pan-americano, autoescola.' },
            { letra: 'D', texto: 'girassol, hiper-ativo, recém-casado.' }
        ],
        respostaCorreta: 'D',
        justificativa: 'A grafia incorreta é "hiper-ativo". Com o prefixo "hiper-", só se utiliza hífen se o segundo elemento iniciar por "h" ou por "r" (ex.: hiper-humano, hiper-resistente). Diante de vogal, junta-se sem hífen: "hiperativo". Nas outras alternativas todas estão corretas: super-homem (prefixo + h), anti-inflacionário (vogais iguais com hífen), autoescola (vogais diferentes sem hífen).',
        dicaBanca: 'Regra geral do hífen com prefixos: letras iguais se separam com hífen (anti-inflacionário, micro-ondas); letras diferentes se unem sem hífen (autoescola, semiaberto); antes de H sempre tem hífen.'
    },
    {
        id: 'port-4000198769',
        topic: 'Ortografia e Acentuação Gráfica',
        subtema: 'Homônimos, Parônimos e Expressões Problemáticas',
        prioridade: 'media',
        metaQuestoes: 15,
        banca: 'FGV - Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico Especialista',
        enunciado: 'A frase abaixo em que a grafia da palavra sublinhada está CORRETA é:',
        alternativas: [
            { letra: 'A', texto: 'Não vejo porque os homens que creem em elétrons devam considerar-se menos crédulos do que os homens que creem em anjos.' },
            { letra: 'B', texto: 'As universidades são lugares aonde os cascalhos são polidos e os brilhantes embaciados;' },
            { letra: 'C', texto: 'A educação deve ter algo haver com a tolice dominante nas crianças;' },
            { letra: 'D', texto: 'Nem todos os professores estão afim de fazer seus alunos progredir;' },
            { letra: 'E', texto: 'Ao invés de falar, o inteligente caça.' }
        ],
        respostaCorreta: 'E',
        justificativa: 'Em "Ao invés de falar", a expressão indica oposição exata (falar vs caçar/calar), estando perfeitamente empregada. Erros das demais: A) "por que" em pergunta indireta deve ser separado; B) "lugares onde" (sem movimento, não "aonde"); C) deve ser "algo a ver com"; D) locução "a fim de" (finalidade/interesse) escreve-se separada, pois "afim" junto significa semelhante.',
        dicaBanca: '"A fim de" = com o intuito de. "Ao invés de" = oposição estrita. "Em vez de" = em lugar de (serve para oposição ou mera substituição).'
    },

    // -------------------------------------------------------------
    // TEMA 2: MORFOLOGIA E FORMAÇÃO DE PALAVRAS (Prioridade Média: 15 Qs)
    // -------------------------------------------------------------
    {
        id: 'port-4000195161',
        topic: 'Morfologia',
        subtema: 'Processos de Derivação e Semântica de Prefixos',
        prioridade: 'media',
        metaQuestoes: 15,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Prefeitura / Médico Clínico',
        enunciado: 'Considere o poema "O rio da minha terra": "Nas solidões das noites enluaradas / a maldição de Crispim desce / sobre as águas encrespadas...".\n\nConsiderado no contexto do poema, o prefixo "en-", constituinte de "enluaradas" e "encrespadas", apresenta, respectivamente, efeito semântico semelhante nas palavras:',
        alternativas: [
            { letra: 'A', texto: 'enterradas e enraizadas.' },
            { letra: 'B', texto: 'ensacadas e engarrafadas.' },
            { letra: 'C', texto: 'enfeitiçadas e enroladas.' },
            { letra: 'D', texto: 'enlatadas e ensimesmadas.' },
            { letra: 'E', texto: 'encaixadas e enchidas.' }
        ],
        respostaCorreta: 'C',
        justificativa: 'O prefixo "en-" expressa a ideia de passagem para um estado ou transformação provocada: "enluaradas" (iluminadas pela lua, enfeitiçadas pela luz da lua) e "encrespadas" (que se tornaram crespas, enroladas/onduladas em ondas). Nas outras alternativas o prefixo atua como locativo ("pôr dentro de": em terra, em saco, em lata, em caixa).',
        dicaBanca: 'Prefixos parassintéticos (en-...-ar) podem denotar localização física (ensacar = pôr no saco) ou mudança/atribuição de estado (entristecer, enfeitiçar).'
    },
    {
        id: 'port-4000206873',
        topic: 'Morfologia',
        subtema: 'Processos de Formação de Palavras: Parassíntese e Sufixação',
        prioridade: 'media',
        metaQuestoes: 15,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Saúde Pública / Médico',
        enunciado: 'Considerando-se o vocábulo destacado em "Centro de Envelhecimento Cognitivo e Epidemiologia Cognitiva", é possível notar que foi constituído a partir dos seguintes processos formadores:',
        alternativas: [
            { letra: 'A', texto: 'prefixação e aglutinação.' },
            { letra: 'B', texto: 'parassíntese e sufixação.' },
            { letra: 'C', texto: 'justaposição e prefixação.' },
            { letra: 'D', texto: 'hibridismo e sufixação.' },
            { letra: 'E', texto: 'aglutinação e parassíntese.' }
        ],
        respostaCorreta: 'B',
        justificativa: 'A palavra "envelhecimento" tem como raiz "velho". Primeiro formou-se o verbo "envelhecer" por derivação parassintética (en- + velh- + -ecer, onde não existem isoladamente *envelho nem *velhecer). A seguir, agregou-se o sufixo nominal formador de ação "-mento" (envelhecer + mento), configurando sufixação sobre base parassintética.',
        dicaBanca: 'Na derivação parassintética, o acréscimo simultâneo de prefixo e sufixo é obrigatório: se você retirar um deles, a palavra resultante não existe no vocabulário.'
    },

    // -------------------------------------------------------------
    // TEMA 3: VERBOS - TEMPOS, MODOS, VOZES E CORRELAÇÃO (Prioridade Alta: 20 Qs)
    // -------------------------------------------------------------
    {
        id: 'port-4000195106',
        topic: 'Verbos e Vozes Verbais',
        subtema: 'Transposição de Voz Ativa para Voz Passiva Analítica',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico / Perito',
        enunciado: 'Considere a oração: "Harold Bloom descreve as razões que marcam a relação entre escritores de diferentes gerações."\n\nTranspondo-se a oração principal para a voz passiva, a forma verbal resultante será:',
        alternativas: [
            { letra: 'A', texto: 'são descritas.' },
            { letra: 'B', texto: 'descreve-se.' },
            { letra: 'C', texto: 'descrito.' },
            { letra: 'D', texto: 'tinha sido descrito.' },
            { letra: 'E', texto: 'eram descritas.' }
        ],
        respostaCorreta: 'A',
        justificativa: 'Na transposição de voz ativa para passiva analítica: 1) O objeto direto ("as razões") vira o sujeito paciente (feminino plural); 2) O verbo auxiliar "ser" assume o mesmo tempo e modo do verbo ativo ("descreve" = presente do indicativo -> "são"); 3) O particípio concorda em gênero e número com o novo sujeito -> "descritas". Resultado: "As razões são descritas por Harold Bloom".',
        dicaBanca: 'Regra infalível de transposição verbal: o tempo verbal do verbo principal ativo torna-se o tempo do verbo auxiliar SER na passiva analítica!'
    },
    {
        id: 'port-4000195112',
        topic: 'Verbos e Vozes Verbais',
        subtema: 'Uniformidade de Tempo e Modo Verbal no Período',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico',
        enunciado: 'Os verbos que se encontram nos mesmos tempo e modo estão reunidos em:',
        alternativas: [
            { letra: 'A', texto: 'Mas o que experimentava naquele momento era diferente' },
            { letra: 'B', texto: 'mas era como se já tivessem sido amigos a vida inteira' },
            { letra: 'C', texto: 'Um amigo é alguém com quem estivemos desde sempre.' },
            { letra: 'D', texto: 'Repetia para si mesmo: “tenho um amigo”.' },
            { letra: 'E', texto: 'Dei-me conta da coisa rara que é a amizade.' }
        ],
        respostaCorreta: 'A',
        justificativa: 'Em "experimentava" e "era", ambas as formas verbais estão conjugadas no Pretérito Imperfeito do Modo Indicativo. Nas demais alternativas há mistura de tempos: B) "era" (pret. imperf. ind.) e "tivessem sido" (pret. mais-que-perf. composto do subjuntivo); C) "é" (presente) e "estivemos" (pret. perfeito); D) "repetia" (imperfeito) e "tenho" (presente); E) "dei" (perfeito) e "é" (presente).',
        dicaBanca: 'Ao buscar verbos no mesmo tempo/modo, classifique cada um: desinências -va, -ia indicam pretérito imperfeito do indicativo.'
    },
    {
        id: 'port-4000195170',
        topic: 'Verbos e Vozes Verbais',
        subtema: 'Correlação Verbal entre Modos Indicativo e Subjuntivo',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico Legista',
        enunciado: 'Considere o período: "Todavia, também somos bastante desprovidos de imaginação, e raramente − exceto quando crianças ou se somos poetas − logramos conceber mais do que meras duplicações dos acontecimentos..."\n\nNuma nova redação, mantém-se a adequada correlação entre os tempos e modos verbais da frase acima substituindo-se os verbos sublinhados por:',
        alternativas: [
            { letra: 'A', texto: 'seremos, seríamos, lográvamos' },
            { letra: 'B', texto: 'somos, fomos, lográvamos' },
            { letra: 'C', texto: 'éramos, formos, lograríamos' },
            { letra: 'D', texto: 'fôramos, fôramos, lográssemos' },
            { letra: 'E', texto: 'fomos, fôssemos, logramos' }
        ],
        respostaCorreta: 'E',
        justificativa: 'A oração condicional introduzida por "se" demanda pretérito imperfeito do subjuntivo ("se fôssemos poetas"), harmonizando-se no pretérito com a oração de fato pretérito ("fomos desprovidos") e a ação concomitante expressa no pretérito perfeito/presente histórico ("logramos"). As outras alternativas geram anomalias lógicas (ex.: "se seríamos" é erro crasso; "se formos" requer futuro do presente, não pretérito imperfeito).',
        dicaBanca: 'Emprego clássico de hipótese condicional: "Se eu tivesse/fizesse (imperfeito do subjuntivo), eu teria/faria (futuro do pretérito)". Nunca use futuro do pretérito com a conjunção "se"!'
    },
    {
        id: 'port-4000198768',
        topic: 'Verbos e Vozes Verbais',
        subtema: 'Diferenciação de Voz Passiva vs Estrutura Ativa/Predicativa',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'FGV - Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico Geral',
        enunciado: 'A frase abaixo que, ao CONTRÁRIO das demais, NÃO apresenta uma estrutura na voz passiva é:',
        alternativas: [
            { letra: 'A', texto: 'Avalia-se a inteligência de um indivíduo pela quantidade de incertezas que ele é capaz de suportar;' },
            { letra: 'B', texto: 'Má é uma opinião que não pode ser mudada;' },
            { letra: 'C', texto: 'Um problema está, de início, resolvido, se está bem colocado;' },
            { letra: 'D', texto: 'Se você quiser ser uma ponte, precisa estar preparado para ser pisado;' },
            { letra: 'E', texto: 'De erro em erro descobre-se a verdade inteira.' }
        ],
        respostaCorreta: 'C',
        justificativa: 'Na opção C, "está resolvido" indica o estado resultante do problema (verbo de ligação "estar" + predicativo do sujeito "resolvido"), não uma ação passiva analítica praticada por um agente. Já nas demais: A) "avalia-se" (passiva sintética = a inteligência é avaliada); B) "pode ser mudada" (locução passiva); D) "ser pisado" (passiva analítica); E) "descobre-se" (passiva sintética = a verdade é descoberta).',
        dicaBanca: 'Cuidado: verbo "estar" + particípio frequentemente expressa estado resultante (predicativo), enquanto "ser" + particípio expressa o processo dinâmico da voz passiva.'
    },

    // -------------------------------------------------------------
    // TEMA 4: SINTAXE DO PERÍODO SIMPLES - TERMOS DA ORAÇÃO (Prioridade Alta: 20 Qs)
    // -------------------------------------------------------------
    {
        id: 'port-4000195165',
        topic: 'Sintaxe do Período Simples',
        subtema: 'Identificação de Sujeito e Objeto Direto em Orações Invertidas',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Prefeitura / Médico Clínico',
        enunciado: 'Considere os versos:\n"Pois tão irado e tão potente fez-se o rio\nque todo um povo se juntou para enfrentá-lo"\n\nOs termos sublinhados nos versos acima ("o rio" e "-lo") exercem, respectivamente, a função sintática de:',
        alternativas: [
            { letra: 'A', texto: 'objeto indireto e objeto direto.' },
            { letra: 'B', texto: 'sujeito e objeto direto.' },
            { letra: 'C', texto: 'objeto direto e sujeito.' },
            { letra: 'D', texto: 'objeto direto e objeto indireto.' },
            { letra: 'E', texto: 'sujeito e objeto indireto.' }
        ],
        respostaCorreta: 'B',
        justificativa: 'Na oração "fez-se o rio" (o rio se tornou irado e potente), "o rio" é o termo sobre o qual se faz a declaração, isto é, o sujeito da oração. Já em "para enfrentá-lo", o verbo transitivo direto "enfrentar" exige complemento sem preposição; o pronome oblíquo "lo" retoma "o rio" exercendo a função de objeto direto.',
        dicaBanca: 'Os pronomes oblíquos átonos o, a, os, as (e suas variantes lo, la, no, na) funcionam sempre como Objeto Direto quando complementam verbos transitivos diretos.'
    },
    {
        id: 'port-4000206880',
        topic: 'Sintaxe do Período Simples',
        subtema: 'Transitividade Verbal: Objeto Direto e Objeto Indireto',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico Perito',
        enunciado: 'Assinale a alternativa que apresenta a correta classificação sintática dos fragmentos numerados na oração:\n"(01) O júri concedeu (02) à Liebeck (03) o equivalente a dois dias de receita de vendas de café."',
        alternativas: [
            { letra: 'A', texto: '(01) sujeito – (02) objeto direto – (03) complemento nominal.' },
            { letra: 'B', texto: '(01) predicativo do sujeito – (02) complemento nominal – (03) objeto direto.' },
            { letra: 'C', texto: '(01) sujeito – (02) objeto indireto – (03) objeto direto.' },
            { letra: 'D', texto: '(01) objeto indireto – (02) complemento nominal – (03) sujeito.' },
            { letra: 'E', texto: '(01) complemento nominal – (02) sujeito – (03) predicativo do sujeito.' }
        ],
        respostaCorreta: 'C',
        justificativa: 'O verbo "conceder" é transitivo direto e indireto (VTDI - quem concede, concede algo a alguém). (01) "O júri" é quem pratica a ação = sujeito; (02) "à Liebeck" é o destinatário preposicionado = objeto indireto; (03) "o equivalente..." é o complemento sem preposição = objeto direto.',
        dicaBanca: 'VTDI sempre exige um complemento sem preposição (OD) e outro com preposição (OI). Não existem dois complementos diretos nem dois indiretos para um mesmo verbo.'
    },
    {
        id: 'port-4000206897',
        topic: 'Sintaxe do Período Simples',
        subtema: 'Predicativo do Sujeito, Predicado Nominal e Adjunto Adnominal',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico / ESF',
        enunciado: 'Analise as afirmativas sobre o enunciado: "A vida é singular ao tempo, pois que o tempo é eterno, e a criatura humana é botão de rosa, matéria orgânica falível na passagem do eterno".\n\nI. O vocábulo "singular" funciona como predicativo do sujeito.\nII. Há a presença de predicados nominais em todas as orações do período composto.\nIII. O vocábulo "humana" funciona como complemento nominal.\nIV. As palavras "orgânica" e "falível" funcionam como adjuntos adnominais.\n\nAssinale a alternativa correta:',
        alternativas: [
            { letra: 'A', texto: 'Apenas as afirmativas II, III e IV estão corretas.' },
            { letra: 'B', texto: 'Apenas as afirmativas I, II e IV estão corretas.' },
            { letra: 'C', texto: 'Apenas as afirmativas I, II e III estão corretas.' },
            { letra: 'D', texto: 'Apenas as afirmativas I, III e IV estão corretas.' }
        ],
        respostaCorreta: 'B',
        justificativa: 'I está correta: "singular" é predicativo do sujeito "a vida" ligado pelo verbo "é". II está correta: todas as 3 orações utilizam verbo de ligação "é" acompanhado de predicativo ("singular", "eterno", "botão de rosa"), logo todos são predicados nominais. III está incorreta: "humana" é adjetivo sem preposição caracterizando "criatura", logo é adjunto adnominal (o complemento nominal seria obrigatoriamente preposicionado). IV está correta: "orgânica" e "falível" qualificam o substantivo "matéria", atuando como adjuntos adnominais.',
        dicaBanca: 'Complemento nominal liga-se a substantivo abstrato, adjetivo ou advérbio e é SEMPRE preposicionado com sentido passivo. Se não tiver preposição, é adjunto adnominal!'
    },
    {
        id: 'port-4000206885',
        topic: 'Sintaxe do Período Simples',
        subtema: 'Aposto Explicativo e Vocativo',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico de Família',
        enunciado: 'A Sintaxe estuda a disposição e relação que as palavras exercem dentro de um enunciado ou texto. A este respeito, assinale a alternativa que apresenta corretamente a função sintática da expressão sublinhada em: "O diretor médico da Dasa, Gustavo Campana, lembrou que 80% das 8 mil doenças consideradas raras têm origem genética":',
        alternativas: [
            { letra: 'A', texto: 'Aposto' },
            { letra: 'B', texto: 'Sujeito' },
            { letra: 'C', texto: 'Vocativo' },
            { letra: 'D', texto: 'Complemento Nominal' }
        ],
        respostaCorreta: 'A',
        justificativa: 'A expressão entre vírgulas "Gustavo Campana" tem valor substantivo que identifica e esclarece o termo substantivo antecedente ("O diretor médico da Dasa"), caracterizando um aposto explicativo.',
        dicaBanca: 'O aposto explica ou especifica um termo substantivo antecedente e pode ser retirado da oração sem quebrar a estrutura sintática; já o vocativo é um chamamento/invocação e não pertence nem ao sujeito nem ao predicado.'
    },

    // -------------------------------------------------------------
    // TEMA 5: SINTAXE DO PERÍODO COMPOSTO E CONECTIVOS (Prioridade Alta: 20 Qs)
    // -------------------------------------------------------------
    {
        id: 'port-4000195162',
        topic: 'Sintaxe do Período Composto',
        subtema: 'Orações Subordinadas Adverbiais: Finais e Consecutivas',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico Sanitarista',
        enunciado: 'Considere os trechos do texto "O rio de minha terra":\n"Um dia ele deixou o monótono caminhar de corpo mole para subir as poucas rampas do seu cais."\n"Pois tão irado e tão potente fez-se o rio que todo um povo se juntou para enfrentá-lo."\n\nNo contexto em que aparecem, as orações sublinhadas transmitem, respectivamente, ideias de:',
        alternativas: [
            { letra: 'A', texto: 'finalidade e consequência.' },
            { letra: 'B', texto: 'condição e concessão.' },
            { letra: 'C', texto: 'proporcionalidade e conformidade.' },
            { letra: 'D', texto: 'temporalidade e comparação.' },
            { letra: 'E', texto: 'causa e explicação.' }
        ],
        respostaCorreta: 'A',
        justificativa: '"Para subir as poucas rampas..." é oração reduzida de infinitivo com valor de finalidade (objetivo da ação de deixar o caminhar). Já em "tão irado... que todo um povo se juntou", a correlação "tão... que" introduz o resultado/efeito da intensidade da ira do rio, configurando oração subordinada adverbial consecutiva.',
        dicaBanca: 'A correlação intensiva (tão... que, tanto... que, tamanho... que) sempre introduz oração subordinada adverbial consecutiva!'
    },
    {
        id: 'port-4000206924',
        topic: 'Sintaxe do Período Composto',
        subtema: 'Orações Subordinadas Substantivas Objetivas Diretas',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico / Prefeituras',
        enunciado: 'Analise o trecho destacado a seguir e assinale a alternativa que classifica corretamente a oração nele sublinhada:\n"Não diga à sua mãe que eu falei isso".',
        alternativas: [
            { letra: 'A', texto: 'Oração Subordinada Substantiva Subjetiva.' },
            { letra: 'B', texto: 'Oração Subordinada Adjetiva Explicativa.' },
            { letra: 'C', texto: 'Oração Subordinada Substantiva Objetiva Direta.' },
            { letra: 'D', texto: 'Oração Subordinada Adverbial de Companhia.' }
        ],
        respostaCorreta: 'C',
        justificativa: 'O verbo principal "dizer" é transitivo direto e indireto. A quem não diga? À sua mãe (objeto indireto). Não diga o quê? "Que eu falei isso" (equivale a: não diga ISSO). Por ser substituível por "isso" e exercer a função de objeto direto do verbo "diga", classifica-se como Oração Subordinada Substantiva Objetiva Direta.',
        dicaBanca: 'Macete infalível para oração subordinada substantiva: substitua a oração inteira introduzida por "que/se" pelo pronome "ISSO". Se couber com sentido (Não diga à sua mãe ISSO), ela é substantiva!'
    },
    {
        id: 'port-4000206860',
        topic: 'Sintaxe do Período Composto',
        subtema: 'Paralelismo Sintático na Coordenação',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico Auditor',
        enunciado: 'O período: "Por meio do último decreto, solicitou-se a saída dos moradores e que demolissem as construções." possui uma falha em sua estruturação que seria resolvida com a seguinte reescritura:',
        alternativas: [
            { letra: 'A', texto: 'Por meio do último decreto, foram solicitadas a saída dos moradores e que demolissem as construções.' },
            { letra: 'B', texto: 'Por meio do último decreto, solicitou-se a saída dos moradores e a demolição das construções.' },
            { letra: 'C', texto: 'Solicitou-se, por meio do último decreto, a saída dos moradores e que demolissem as construções.' },
            { letra: 'D', texto: 'Solicitaram-se, por meio do último decreto, a saída dos moradores e que demolissem as construções.' },
            { letra: 'E', texto: 'Por meio do último decreto, foi solicitada a saída dos moradores e que demolissem as construções.' }
        ],
        respostaCorreta: 'B',
        justificativa: 'A frase original quebra o paralelismo sintático porque coordena um sintagma nominal ("a saída dos moradores") com uma oração desenvolvida ("e que demolissem as construções"). Para manter a simetria gramatical, ambos os termos coordenados devem ter a mesma forma gramatical: dois sintagmas nominais ("a saída dos moradores e a demolição das construções") ou duas orações ("que os moradores saíssem e que demolissem as construções").',
        dicaBanca: 'Paralelismo sintático exige estruturas coordenadas simétricas: substantivo com substantivo, oração com oração, infinitivo com infinitivo.'
    },

    // -------------------------------------------------------------
    // TEMA 6: CONCORDÂNCIA VERBAL E NOMINAL (Prioridade Alta: 20 Qs)
    // -------------------------------------------------------------
    {
        id: 'port-4000195153',
        topic: 'Concordância Verbal e Nominal',
        subtema: 'Concordância Verbal com Pronomes e Sujeitos Compostos/Invertidos',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico / Saúde da Família',
        enunciado: 'As normas de concordância verbal encontram-se plenamente observadas na frase:',
        alternativas: [
            { letra: 'A', texto: 'Aos melancólicos, a menos que fossem grandes artistas, ninguém perdoava sua condição infeliz.' },
            { letra: 'B', texto: 'Convêm evitar os chatos, mas é justo que não se os confundam com os melancólicos criativos.' },
            { letra: 'C', texto: 'Nas mais variadas artes destacam-se o desempenho superior dos grandes criadores melancólicos.' },
            { letra: 'D', texto: 'A realização plena das formas artísticas trazem consigo o prazer estética, que se sobrepõe à melancolia de fundo.' },
            { letra: 'E', texto: 'Chaplin encarnou-se em Carlitos, e à poesia de ambos vieram-se render-se a plateia de todos os cinemas.' }
        ],
        respostaCorreta: 'A',
        justificativa: 'Em A, o sujeito "ninguém" é singular e o verbo "perdoava" concorda perfeitamente no singular; a oração adverbial "a menos que fossem" concorda com "grandes artistas". Erros das demais: B) "Convém" (singular para oração subjetiva infinitiva); C) "destaca-se o desempenho" (sujeito singular posposto); D) "A realização plena... traz" (núcleo singular); E) "veio render-se a plateia" (sujeito singular).',
        dicaBanca: 'Em orações com o verbo antes do sujeito, atente-se ao núcleo real do sujeito paciente/agente para não concordar erroneamente com o adjunto.'
    },
    {
        id: 'port-4000195175',
        topic: 'Concordância Verbal e Nominal',
        subtema: 'Voz Passiva Sintética e Flexão Obrigatória no Plural',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico Clínico',
        enunciado: 'O verbo indicado entre parênteses deverá flexionar-se numa forma do PLURAL para integrar adequadamente a frase:',
        alternativas: [
            { letra: 'A', texto: 'Muitos dos anseios aos quais se (curvar) são na verdade caprichos dele, como o de habitar uma ilha.' },
            { letra: 'B', texto: 'Velhas perguntas imaginosas a toda hora se (formular), só para se avaliar o caráter de quem responde.' },
            { letra: 'C', texto: 'As ilhas em que se (imaginar) viver dias tranquilos podem propiciar surpresas desagradáveis.' },
            { letra: 'D', texto: 'Todas as suas aspirações (poder) uma ilha proporcionar-lhe caso ele não temesse o mar.' },
            { letra: 'E', texto: 'A muitos curiosos (intrigar) esse tipo de pergunta especulativa, que pretende revelar algo íntimo do próximo.' }
        ],
        respostaCorreta: 'B',
        justificativa: 'Em B, temos voz passiva sintética: "Velhas perguntas imaginosas... se formulam" (= velhas perguntas são formuladas). O sujeito paciente é plural ("Velhas perguntas imaginosas"), exigindo a flexão do verbo no plural: "formulam". Nas outras: A) sujeito de curvar é ele (se curva); C) sujeito oracional "viver dias tranquilos" deixa o verbo no singular (se imagina); D) sujeito é "uma ilha" (pode); E) sujeito é "esse tipo de pergunta" (intriga).',
        dicaBanca: 'Com o pronome apassivador "se" + VTD, o substantivo que o acompanha é o sujeito paciente. Se o substantivo estiver no plural, o verbo TEM de ir para o plural: "Alugam-se casas", "Formulam-se perguntas".'
    },
    {
        id: 'port-4000206878',
        topic: 'Concordância Verbal e Nominal',
        subtema: 'Concordância Nominal e Nomes Próprios Plurais',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico Plantonista',
        enunciado: 'Em relação às normas de concordância nominal e verbal, assinale a alternativa INCORRETA:',
        alternativas: [
            { letra: 'A', texto: 'A mãe ou a esposa o acompanhará, visto que só há a permissão para um acompanhante.' },
            { letra: 'B', texto: 'Os Estados Unidos ficou entre os melhores países nos jogos olímpicos.' },
            { letra: 'C', texto: 'Pais, professores, alunos, cada um teve sua participação e envolvimento no projeto escolar.' },
            { letra: 'D', texto: 'Ângela disse depois de sua merecida festa: - Aos que me prestigiaram, meu muito obrigada.' }
        ],
        respostaCorreta: 'B',
        justificativa: 'Nomes de lugar que têm forma no plural precedidos de artigo no plural exigem verbo no plural: "Os Estados Unidos ficaram...". Se não houvesse artigo ("Estados Unidos"), o verbo ficaria no singular ("Estados Unidos domina o mercado"). As demais estão corretas: A) "ou" com valor de exclusão mantém singular; C) pronome indefinido "cada um" resume o sujeito e atrai singular; D) mulher diz "muito obrigada".',
        dicaBanca: 'Topônimos no plural: com artigo -> concordância no plural ("Os Estados Unidos venceram"); sem artigo -> verbo no singular ("Minas Gerais produz café").'
    },

    // -------------------------------------------------------------
    // TEMA 7: REGÊNCIA VERBAL, NOMINAL E CRASE (Prioridade Alta: 20 Qs)
    // -------------------------------------------------------------
    {
        id: 'port-4000195176',
        topic: 'Regência e Crase',
        subtema: 'Regência de Pronomes Relativos e Complementos Preposicionados',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Especialidades Médicas',
        enunciado: 'Considere a frase: "Todos nós temos um traço romântico que gostamos de preservar."\n\nA frase acima permanecerá gramaticalmente CORRETA caso se substitua o elemento sublinhado por:',
        alternativas: [
            { letra: 'A', texto: 'ao qual nos envaidecemos.' },
            { letra: 'B', texto: 'de que amamos cultuar.' },
            { letra: 'C', texto: 'cujo mantemos vivo.' },
            { letra: 'D', texto: 'onde nos orgulhamos.' },
            { letra: 'E', texto: 'de que não abrimos mão.' }
        ],
        respostaCorreta: 'E',
        justificativa: 'A locução verbal "abrir mão" rege a preposição "de" (quem abre mão, abre mão DE algo). Essa preposição deve obrigatoriamente anteceder o pronome relativo "que": "de que não abrimos mão". Nas outras opções: A) "envaidecer-se" exige preposição "com" ou "de"; B) "cultuar" é VTD (não admite "de que"); C) "cujo" exige relação de posse entre dois substantivos; D) "onde" só pode ser empregado para lugares físicos concretos.',
        dicaBanca: '"Onde" só retoma lugar físico! Para situações abstratas, teorias ou traços psicológicos, use "em que", "no qual" ou a preposição solicitada pela regência do verbo subordinado.'
    },
    {
        id: 'port-4000195130',
        topic: 'Regência e Crase',
        subtema: 'Crase Diante de Pronomes Demonstrativos e Termos Subentendidos',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Residência / Médicos',
        enunciado: 'Considere a frase adaptada de Adam Smith:\n"I_______ habituados II_______ posse, ou mesmo III _______esperança da admiração pública, todos os demais prazeres esmaecem e definham."\n\nEm conformidade com a norma-padrão da língua portuguesa, as lacunas I, II e III do texto devem ser preenchidas, respectivamente, por:',
        alternativas: [
            { letra: 'A', texto: 'Àqueles − à – a' },
            { letra: 'B', texto: 'Aqueles − à – à' },
            { letra: 'C', texto: 'Àqueles − a – a' },
            { letra: 'D', texto: 'Aqueles − à – a' },
            { letra: 'E', texto: 'Àqueles − à − à' }
        ],
        respostaCorreta: 'E',
        justificativa: 'I: A oração está na ordem indireta: "todos os demais prazeres esmaecem e definham [a quem?] ÀQUELES habituados..." (preposição "a" exigida pela regência + "aqueles" = Àqueles). II: O adjetivo "habituados" rege a preposição "a", que se funde com o artigo feminino de "posse" = "à posse". III: Pela elipse do termo regente ("ou mesmo habituados à esperança"), a preposição "a" continua sendo exigida diante de "esperança" = "à esperança". Assim, todas recebem crase.',
        dicaBanca: 'A crase em pronomes demonstrativos (àquele, àquela, àquilo) ocorre quando a palavra anterior exige preposição "a". Dica: troque por "a este" / "a estes". Se der "a este", leva acento grave!'
    },
    {
        id: 'port-4000206879',
        topic: 'Regência e Crase',
        subtema: 'Casos Proibidos e Obrigatórios do Acento Grave',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Prefeitura / Médico Clínico Geral',
        enunciado: 'Em relação ao uso do acento indicativo de crase, assinale a alternativa CORRETA:',
        alternativas: [
            { letra: 'A', texto: 'Muitos pais estavam à espera de seus filhos na frente do colégio.' },
            { letra: 'B', texto: 'Com a chegada do verão, vamos à Veneza, cidade encantadora.' },
            { letra: 'C', texto: 'Em todo lugar, há muitos divagando a vida e à morte.' },
            { letra: 'D', texto: 'Os aventureiros percorreram a Rota 66 de ponta à ponta.' }
        ],
        respostaCorreta: 'A',
        justificativa: 'Em A, "à espera de" é uma locução prepositiva com núcleo feminino, cujo uso do acento grave é obrigatório. Erros das demais: B) Cidade de Veneza não aceita artigo feminino ("Vou a Veneza, volto de Veneza"); C) "divagar" não rege crase antes de objeto direto coordenado sem preposição; D) Entre palavras repetidas ("ponta a ponta", "cara a cara", "gota a gota"), a crase é estritamente proibida.',
        dicaBanca: 'Macete para cidades: "Se vou A e volto DA, crase há; se vou A e volto DE, crase pra quê?". Ex: Vou a Veneza, volto de Veneza (sem crase); Vou à Bahia, volto da Bahia (com crase).'
    },
    {
        id: 'port-4000206916',
        topic: 'Regência e Crase',
        subtema: 'Regência de Verbos Específicos e Casos Proibidos',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Saúde Municipal',
        enunciado: 'Quanto às normas para o uso do acento grave indicador de crase, assinale a alternativa CORRETA:',
        alternativas: [
            { letra: 'A', texto: 'Os médicos atenderão nas salas de 1 à 5.' },
            { letra: 'B', texto: 'Desde às duas horas estou no ponto.' },
            { letra: 'C', texto: 'Eu assisti à cerimônia do casamento de minha sobrinha.' },
            { letra: 'D', texto: 'As encomendas já foram repassadas à todas as escolas.' },
            { letra: 'E', texto: 'A moça vai à pé todos os dias para o trabalho.' }
        ],
        respostaCorreta: 'C',
        justificativa: 'O verbo "assistir" no sentido de presenciar/ver é transitivo indireto regido pela preposição "a" (assistir a algo). Diante do substantivo feminino determinado "a cerimônia", ocorre a fusão da preposição com o artigo, exigindo o acento grave: "assisti à cerimônia". Erros: A) Em "de 1 a 5" há apenas preposição, sem artigo; B) Após a preposição "desde" não se usa crase ("desde as duas horas"); D) Nunca há crase antes do pronome indefinido "todas"; E) "Pé" é palavra masculina (crase proibida).',
        dicaBanca: 'Nunca ocorre crase: 1) antes de palavra masculina; 2) antes de verbo; 3) antes de pronomes indefinidos (todas, qualquer); 4) depois de preposições como para, desde, perante, com.'
    },

    // -------------------------------------------------------------
    // TEMA 8: COESÃO, COERÊNCIA E REESCRITA (Prioridade Alta: 20 Qs)
    // -------------------------------------------------------------
    {
        id: 'port-4000195119',
        topic: 'Coesão e Coerência',
        subtema: 'Retomada de Referentes: Pronomes Anafóricos e Relativos',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico / Prova Geral',
        enunciado: 'Considere as passagens do texto sobre o filme "Parasita":\n"...entre os muros que os separam da realidade" (5° parágrafo)\n"...como a esconde, encobre, transforma-a em fantasma" (8° parágrafo)\n\nOs pronomes sublinhados acima referem-se, respectivamente, a:',
        alternativas: [
            { letra: 'A', texto: 'muros − casa da família rica' },
            { letra: 'B', texto: 'desempregados – modernidade' },
            { letra: 'C', texto: 'ricos frívolos − desigualdade econômica' },
            { letra: 'D', texto: 'ricos frívolos − casa da família rica' },
            { letra: 'E', texto: 'desempregados − desigualdade econômica' }
        ],
        respostaCorreta: 'C',
        justificativa: 'No 5º parágrafo: "o filme opõe uma família de desempregados... a uma família de ricos frívolos... entre os muros que os separam [separam os ricos frívolos] da realidade". No 8º parágrafo: "A casa da família rica... não resolve a desigualdade econômica como a esconde, encobre, transforma-a [transforma a desigualdade econômica] em fantasma". Assim, os pronomes anafóricos recuperam "ricos frívolos" e "desigualdade econômica".',
        dicaBanca: 'Em questões de coesão referencial anafórica, faça a pergunta direta ao verbo: quem é separado da realidade? Quem é transformado em fantasma?'
    },
    {
        id: 'port-4000206861',
        topic: 'Coesão e Coerência',
        subtema: 'Pronomes Demonstrativos como Mecanismos de Coesão Textual',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico / Perito Forense',
        enunciado: 'Considere o trecho: "Sabemos que o processo trabalhista se divide em dois tipos fundamentais não coincidentes em todos os seus aspectos e diferentes nos seus fins, dissídios individuais e dissídios coletivos. Estes são da competência originária dos órgãos de segundo grau. Aqueles, da competência originária das Varas do Trabalho...".\n\nEm relação ao papel coesivo dos pronomes "Estes" e "Aqueles", é correto afirmar que estão empregados:',
        alternativas: [
            { letra: 'A', texto: 'na representação espacial dos referentes.' },
            { letra: 'B', texto: 'em referência textual anafórica.' },
            { letra: 'C', texto: 'na indicação de tempos distintos.' },
            { letra: 'D', texto: 'em uma alusão catafórica.' },
            { letra: 'E', texto: 'para explicitar o sentido dos referentes.' }
        ],
        respostaCorreta: 'B',
        justificativa: 'Os pronomes demonstrativos "Estes" e "Aqueles" atuam como elementos de coesão anafórica textual, recuperando termos já citados anteriormente no texto: "Estes" retoma o elemento mais próximo ("dissídios coletivos") e "Aqueles" retoma o elemento mais afastado ("dissídios individuais").',
        dicaBanca: 'Regra canônica da FGV e FAFIPA: ao citar dois termos, "este" retoma o segundo (último citado, mais próximo) e "aquele" retoma o primeiro (mais distante).'
    },
    {
        id: 'port-4000206763',
        topic: 'Coesão e Coerência',
        subtema: 'Substituição Pronominal e Alomorfia de Clíticos (-lo, -lhe)',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico / Nível Superior',
        enunciado: 'Considere o período: "O nosso tempo é a nossa medida exclusiva, tornamos o nosso próprio tempo o soberano de nós mesmos, atribuímos ao nosso próprio tempo qualidades que não deveriam transformar o nosso próprio tempo num tempo absoluto."\n\nEvitam-se as viciosas repetições do texto acima substituindo-se os elementos sublinhados, na ordem dada, por:',
        alternativas: [
            { letra: 'A', texto: 'tornamos-lhe - atribuímos-lhe - transformar-lhe' },
            { letra: 'B', texto: 'tornamo-lo - atribuímo-lo - transformá-lo' },
            { letra: 'C', texto: 'o tornamos - lhe atribuímos - lhe transformamos' },
            { letra: 'D', texto: 'tornamo-lhe - o atribuímos - o transformar' },
            { letra: 'E', texto: 'tornamo-lo - atribuímos-lhe - transformá-lo' }
        ],
        respostaCorreta: 'E',
        justificativa: '1) "tornamos [o quê?] o nosso próprio tempo" = Objeto Direto. Verbo terminado em "s" perde a terminação ao receber o pronome "o", virando "tornamo-lo". 2) "atribuímos [a quê?] ao nosso próprio tempo" = Objeto Indireto, substituído pelo pronome "lhe" -> "atribuímos-lhe". 3) "transformar [o quê?] o nosso próprio tempo" = Objeto Direto com verbo no infinitivo terminado em "r", virando "transformá-lo".',
        dicaBanca: 'Lembre-se: verbos terminados em R, S ou Z perdem a consoante e recebem LO, LA, LOS, LAS: amar + o = amá-lo; fizemos + o = fizemo-lo; diz + o = di-lo.'
    },

    // -------------------------------------------------------------
    // TEMA 9: SEMÂNTICA, VOCABULÁRIO E SENTIDO (Prioridade Média: 15 Qs)
    // -------------------------------------------------------------
    {
        id: 'port-4000195140',
        topic: 'Semântica e Vocabulário',
        subtema: 'Significação Contextual e Sinonímia no Texto Literário',
        prioridade: 'media',
        metaQuestoes: 15,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico Especialista',
        enunciado: 'Considere a passagem de Quincas Borba, de Machado de Assis:\n"O espírito do ex-professor, vexado daquele pensamento, arrepiou caminho, buscou outro assunto..."\n\nSem que haja prejuízo para o sentido do texto, as expressões sublinhadas ("vexado" e "arrepiou caminho") podem ser substituídas, respectivamente, por:',
        alternativas: [
            { letra: 'A', texto: 'horrorizado e tomou um susto' },
            { letra: 'B', texto: 'desanimado e desconfiou da direção' },
            { letra: 'C', texto: 'orgulhoso e discordou da direção' },
            { letra: 'D', texto: 'constrangido e mudou de rumo' },
            { letra: 'E', texto: 'desconfiado e tomou uma decisão' }
        ],
        respostaCorreta: 'D',
        justificativa: '"Vexado" significa envergonhado, embaraçado, constrangido moralmente perante o próprio pensamento egoísta. "Arrepiar caminho" é locução tradicional que denota retroceder, recuar ou mudar a direção do pensamento/caminho.',
        dicaBanca: 'O vocabulário machadiano é recorrente em provas: "vexado" = constrangido; "arrepiar caminho" = retroceder ou mudar de rumo.'
    },
    {
        id: 'port-4000198754',
        topic: 'Semântica e Vocabulário',
        subtema: 'Inferência Semântica e Interpretação de Aforismos',
        prioridade: 'media',
        metaQuestoes: 15,
        banca: 'FGV - Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico do Trabalho',
        enunciado: '“Os médicos trabalham sem cessar para conservar a nossa saúde e os cozinheiros para destruí-la; os segundos estão certos do seu êxito.” (Diderot)\n\nAssinale a opção que apresenta uma inferência adequada retirada desse pensamento:',
        alternativas: [
            { letra: 'A', texto: 'Os cozinheiros não possuem conhecimentos de Medicina.' },
            { letra: 'B', texto: 'Os médicos são profissionais extremamente competentes.' },
            { letra: 'C', texto: 'Os cozinheiros são mais admirados que os médicos.' },
            { letra: 'D', texto: 'Os cozinheiros mostram má intenção no que fazem.' },
            { letra: 'E', texto: 'Os médicos devem indicar a alimentação natural.' }
        ],
        respostaCorreta: 'E',
        justificativa: 'Se a culinária dos cozinheiros tradicionais destrói a saúde e obtém êxito nisso, a inferência preventiva na perspectiva da preservação da saúde é que cabe aos médicos orientar hábitos alimentares saudáveis e naturais para combater os efeitos nocivos dessa culinária.',
        dicaBanca: 'Questões de inferência da FGV exigem identificar a dedução plausível que decorre do raciocínio global sem extrapolar para juízos morais descabidos (como atribuir "má intenção" aos cozinheiros).'
    },

    // -------------------------------------------------------------
    // TEMA 10: TIPOLOGIAS, GÊNEROS E INTERPRETAÇÃO (Prioridade Alta: 20 Qs)
    // -------------------------------------------------------------
    {
        id: 'port-4000195146',
        topic: 'Tipologias e Gêneros Textuais',
        subtema: 'Identificação de Tipologia Narrativa e Progressão Temporal',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Residência Médica',
        enunciado: 'Considere o texto "Velha história" de Mario Quintana:\n"Era uma vez um homem que estava pescando, Maria. Até que apanhou um peixinho!... E desde então ficaram inseparáveis... Ora, um dia o homem e o peixinho passeavam à margem do rio... Dito isso, verteu copioso pranto e atirou o peixinho n’água... e o peixinho morreu afogado..."\n\nTendo em vista a tipologia textual predominante, “Velha história” constitui um texto, sobretudo:',
        alternativas: [
            { letra: 'A', texto: 'injuntivo.' },
            { letra: 'B', texto: 'expositivo.' },
            { letra: 'C', texto: 'informativo.' },
            { letra: 'D', texto: 'narrativo.' },
            { letra: 'E', texto: 'dissertativo.' }
        ],
        respostaCorreta: 'D',
        justificativa: 'O texto organiza-se com todos os pilares essenciais da narrativa: enredo (pesca, convivência inusitada e desfecho trágico), personagens (o homem e o peixinho), narrador, tempo cronológico marcado por verbos de ação no pretérito ("apanhou", "passeavam", "verteu", "morreu") e espaço.',
        dicaBanca: 'A tipologia narrativa tem como espinha dorsal a evolução de ações no tempo desencadeadas por personagens. Os tempos verbais típicos são pretérito perfeito e imperfeito do indicativo.'
    },
    {
        id: 'port-4000195110',
        topic: 'Tipologias e Gêneros Textuais',
        subtema: 'Transposição de Discurso Direto para Discurso Indireto',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico / Saúde Pública',
        enunciado: 'Considere a fala do texto: "Tanto tempo que a gente não se vê." (1º parágrafo)\n\nO sentido da frase acima está mantido em discurso indireto do seguinte modo: "Ele percebeu que..."',
        alternativas: [
            { letra: 'A', texto: 'há muito que já não haveremos de nos ver.' },
            { letra: 'B', texto: 'faria bastante tempo sem que nós nos víssemos.' },
            { letra: 'C', texto: 'haveria muito tempo que eles não tinham se visto.' },
            { letra: 'D', texto: 'houvera bastante tempo que não se verão.' },
            { letra: 'E', texto: 'fazia muito tempo que eles não se viam.' }
        ],
        respostaCorreta: 'E',
        justificativa: 'Na transposição para discurso indireto regido por verbo no pretérito ("ele percebeu que"): 1) O presente do indicativo "vê" transforma-se no pretérito imperfeito do indicativo "viam"; 2) A 1ª pessoa plural/coloquial "a gente" passa para a 3ª pessoa do plural "eles"; 3) O verbo "fazer" impessoal indicando tempo decorrido no pretérito assume a forma "fazia". Logo: "fazia muito tempo que eles não se viam".',
        dicaBanca: 'Tabela de conversão do discurso indireto: Presente -> Pretérito Imperfeito; Pretérito Perfeito -> Pretérito Mais-que-perfeito; 1ª pessoa -> 3ª pessoa.'
    },
    {
        id: 'port-4000195678',
        topic: 'Tipologias e Gêneros Textuais',
        subtema: 'Discurso Indireto Livre: Características e Reconhecimento',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'Concursos para Médicos',
        ano: 2021,
        concurso: 'Concurso Saúde Pública / Médico',
        enunciado: 'A frase abaixo que mostra a presença do discurso indireto livre é:',
        alternativas: [
            { letra: 'A', texto: 'Passageiros e parentes estavam na plataforma. Adeus, meu filho. O trem teve sua chegada anunciada pelo alto-falante;' },
            { letra: 'B', texto: 'Todos os passageiros carregavam malas e reclamavam bastante do calor;' },
            { letra: 'C', texto: 'O trem chegou buzinando de forma estridente. Todos se prepararam para entrar nos vagões;' },
            { letra: 'D', texto: 'Os vagões estavam vazios e muito bem limpos, não deixando espaço para reclamações;' },
            { letra: 'E', texto: 'A viagem transcorreu com tranquilidade e ouviam-se roncos de alguns que dormiam.' }
        ],
        respostaCorreta: 'A',
        justificativa: 'No discurso indireto livre, a fala ou pensamento da personagem irrompe no meio da narrativa do narrador sem verbos dicendi (dizer, falar) e sem pontuação demarcadora explícita (como aspas ou travessão). Em A, "Adeus, meu filho" é a fala/pensamento da personagem fundida diretamente à narrativa dos passageiros.',
        dicaBanca: 'Discurso indireto livre é a fusão da voz do narrador com o pensamento/fala interna do personagem sem travessão e sem verbo de elocução prévio.'
    },
    {
        id: 'port-4000206398',
        topic: 'Tipologias e Gêneros Textuais',
        subtema: 'Falácias e Estratégias Argumentativas (Generalização Excessiva)',
        prioridade: 'alta',
        metaQuestoes: 20,
        banca: 'FGV - Concursos para Médicos',
        ano: 2024,
        concurso: 'Concurso Médico Universitário',
        enunciado: 'Numa reunião de departamento, um professor mostrou os péssimos resultados de seus alunos no primeiro semestre para demonstrar a falência do ensino universitário.\n\nEssa argumentação do professor mostra um problema de raciocínio lógico, que é:',
        alternativas: [
            { letra: 'A', texto: 'um círculo vicioso, pois a primeira e a segunda parte do raciocínio mostram o mesmo significado.' },
            { letra: 'B', texto: 'uma falsa relação de causa e efeito, pois a primeira parte indica uma causa não verdadeira para a conclusão.' },
            { letra: 'C', texto: 'um estereótipo, pois hoje se consideram os alunos universitários como símbolos da incompetência.' },
            { letra: 'D', texto: 'uma falsa analogia, já que os elementos comparados são diferentes em um ponto essencial.' },
            { letra: 'E', texto: 'uma generalização excessiva, pois fez uma dedução para um todo (o ensino universitário), que pode ser injusta.' }
        ],
        respostaCorreta: 'E',
        justificativa: 'O professor incorre na falácia da generalização precipitada/excessiva ao projetar a experiência isolada e específica de uma única turma particular para decretar a falência de todo o complexo sistema de ensino universitário.',
        dicaBanca: 'Generalização precipitada é a falácia em que se extrai uma conclusão universal ou ampla com base em evidências insuficientes ou amostragem pontual.'
    }
];
