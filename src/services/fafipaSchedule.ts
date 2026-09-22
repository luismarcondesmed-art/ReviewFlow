import { ScheduleItem } from '../types';

const generateId = (item: { bloco: string; aula: string; disciplina: string }) => {
    return `fafipa-${item.bloco}-${item.disciplina}-${item.aula}`
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
        .toLowerCase();
};

const RAW_DATA = [
    // ==========================================
    // LÍNGUA PORTUGUESA
    // ==========================================
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Interpretação de texto", 
        aula: "Interpretação de Texto: Compreensão global, ideia central, ponto de vista e linha argumentativa", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Azul" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Interpretação de texto", 
        aula: "Estrutura Textual: Relações intratextuais, intertextualidade, parágrafos e efeitos de sentido", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Azul" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Gêneros e Tipologia", 
        aula: "Tipologias Textuais: Narração, Dissertação, Descrição, Injunção e Exposição", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Gêneros e Tipologia", 
        aula: "Gêneros Textuais e Funções Sociais: Níveis de linguagem e variação linguística", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Gêneros e Tipologia", 
        aula: "Funções da Linguagem: Emotiva, Referencial, Conativa, Metalinguística, Fática e Poética", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Coesão e Coerência", 
        aula: "Mecanismos de Coesão Referencial e Sequencial (Conectivos e Anáforas)", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Coesão e Coerência", 
        aula: "Reescrita de Frases, Substituição de Termos e Correção Gramatical", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Semântica", 
        aula: "Semântica: Sinônimos, Antônimos, Homônimos e Parônimos", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Verde" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Semântica", 
        aula: "Sentido Próprio e Figurado: Denotação, Conotação e Polissemia", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Verde" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Fonologia e Ortografia", 
        aula: "Fonologia: Encontros Vocálicos, Consonantais, Dígrafos e Divisão Silábica", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Verde" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Fonologia e Ortografia", 
        aula: "Ortografia Oficial e Novas Regras do Acordo Ortográfico", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Fonologia e Ortografia", 
        aula: "Acentuação Gráfica: Proparoxítonas, Paroxítonas, Oxítonas e Hiatos", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Morfossintaxe", 
        aula: "Emprego das Partículas 'Que' e 'Se' (Conjunção, Pronome e Partícula Apassivadora)", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Morfossintaxe", 
        aula: "Emprego dos Porquês (porque, por que, por quê, porquê) e Palavras Homófonas", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Morfologia", 
        aula: "Classes de Palavras Nominais: Substantivo, Adjetivo, Artigo e Numeral", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Morfologia", 
        aula: "Pronomes: Classificação, Emprego e Colocação Pronominal (Próclise, Ênclise e Mesóclise)", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Morfologia", 
        aula: "Verbos: Tempos, Modos, Vozes Verbais e Correlação Temporal", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Morfologia", 
        aula: "Conectivos Gramaticais: Conjunções Coordenativas, Subordinativas e Preposições", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Sintaxe da Oração", 
        aula: "Termos Essenciais e Integrantes: Sujeito, Predicado, Objeto Direto/Indireto e Complemento Nominal", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Sintaxe da Oração", 
        aula: "Termos Acessórios da Oração: Adjunto Adnominal, Adjunto Adverbial, Aposto e Vocativo", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Sintaxe do Período", 
        aula: "Orações Coordenadas: Assindéticas e Sindéticas (Aditivas, Adversativas, Alternativas, Conclusivas, Explicativas)", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Sintaxe do Período", 
        aula: "Orações Subordinadas: Substantivas, Adjetivas e Adverbiais", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Concordância e Regência", 
        aula: "Concordância Verbal: Regra Geral e Casos Especiais mais Frequentes em Concurso", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Concordância e Regência", 
        aula: "Concordância Nominal: Regras Gerais e Expressões Especiais", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Concordância e Regência", 
        aula: "Regência Verbal e Regência Nominal de Verbos/Nomes Clássicos da FAFIPA", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Concordância e Regência", 
        aula: "Crase: Casos Obrigatórios, Proibidos e Facultativos", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Pontuação", 
        aula: "Pontuação: Emprego da Vírgula (Proibições e Obrigatoriedades)", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Língua Portuguesa", 
        disciplina: "Estilística", 
        aula: "Figuras de Linguagem: Metáfora, Metonímia, Antítese, Paradoxo, Hipérbole e Ironia", 
        professor: "FAFIPA / Português", 
        grandeArea: "Língua Portuguesa", 
        importancia: "Verde" 
    },

    // ==========================================
    // MATEMÁTICA E RACIOCÍNIO LÓGICO
    // ==========================================
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Aritmética Básica", 
        aula: "Operações Fundamentais com Números Inteiros, Decimais e Frações", 
        professor: "FAFIPA / Matemática", 
        grandeArea: "Matemática e RLM", 
        importancia: "Verde" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Aritmética Básica", 
        aula: "Potenciação, Radiciação e Notação Científica", 
        professor: "FAFIPA / Matemática", 
        grandeArea: "Matemática e RLM", 
        importancia: "Verde" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Aritmética Básica", 
        aula: "Múltiplos, Divisores, Critérios de Divisibilidade, MMC e MDC", 
        professor: "FAFIPA / Matemática", 
        grandeArea: "Matemática e RLM", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Conjuntos", 
        aula: "Teoria dos Conjuntos: Operações, Diagramas de Venn e Cardinalidade", 
        professor: "FAFIPA / Matemática", 
        grandeArea: "Matemática e RLM", 
        importancia: "Verde" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Proporcionalidade", 
        aula: "Razão, Proporção e Divisão Proporcional (Direta e Inversa)", 
        professor: "FAFIPA / Matemática", 
        grandeArea: "Matemática e RLM", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Proporcionalidade", 
        aula: "Regra de Três Simples e Composta", 
        professor: "FAFIPA / Matemática", 
        grandeArea: "Matemática e RLM", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Proporcionalidade", 
        aula: "Porcentagem: Variação Percentual, Lucro, Descontos e Aumentos Sucessivos", 
        professor: "FAFIPA / Matemática", 
        grandeArea: "Matemática e RLM", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Matemática Financeira", 
        aula: "Juros Simples: Fórmulas, Taxas e Montante", 
        professor: "FAFIPA / Matemática", 
        grandeArea: "Matemática e RLM", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Matemática Financeira", 
        aula: "Juros Compostos: Aplicações Práticas e Comparativo com Juros Simples", 
        professor: "FAFIPA / Matemática", 
        grandeArea: "Matemática e RLM", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Álgebra e Equações", 
        aula: "Equações e Sistemas do 1º Grau aplicados a Problemas", 
        professor: "FAFIPA / Matemática", 
        grandeArea: "Matemática e RLM", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Álgebra e Equações", 
        aula: "Equações do 2º Grau (Fórmula de Bhaskara, Soma e Produto)", 
        professor: "FAFIPA / Matemática", 
        grandeArea: "Matemática e RLM", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Geometria", 
        aula: "Geometria Plana: Perímetro e Área de Figuras Planas (Triângulos, Retângulos e Círculos)", 
        professor: "FAFIPA / Matemática", 
        grandeArea: "Matemática e RLM", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Geometria", 
        aula: "Teorema de Pitágoras e Relações Trigonométricas Básicas no Triângulo Retângulo", 
        professor: "FAFIPA / Matemática", 
        grandeArea: "Matemática e RLM", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Geometria", 
        aula: "Geometria Espacial: Volume e Capacidade de Prismas, Cubos e Cilindros", 
        professor: "FAFIPA / Matemática", 
        grandeArea: "Matemática e RLM", 
        importancia: "Verde" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Lógica Proposicional", 
        aula: "Proposições Simples, Compostas e Conectivos Lógicos (E, OU, SE...ENTÃO, SE E SOMENTE SE)", 
        professor: "FAFIPA / RLM", 
        grandeArea: "Matemática e RLM", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Lógica Proposicional", 
        aula: "Tabela-Verdade, Tautologia, Contradição e Equivalências Lógicas Clássicas", 
        professor: "FAFIPA / RLM", 
        grandeArea: "Matemática e RLM", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Lógica Proposicional", 
        aula: "Negação de Proposições Compostas e Leis de De Morgan", 
        professor: "FAFIPA / RLM", 
        grandeArea: "Matemática e RLM", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Matemática e RLM", 
        disciplina: "Sequências e Raciocínio", 
        aula: "Sequências Lógicas: Numéricas, Geométricas e de Palavras", 
        professor: "FAFIPA / RLM", 
        grandeArea: "Matemática e RLM", 
        importancia: "Amarelo" 
    },

    // ==========================================
    // INFORMÁTICA
    // ==========================================
    { 
        bloco: "Informática", 
        disciplina: "Hardware e Software", 
        aula: "Conceitos de Informática: Hardware, Processador, Memórias (RAM/ROM) e Periféricos", 
        professor: "FAFIPA / Informática", 
        grandeArea: "Informática", 
        importancia: "Verde" 
    },
    { 
        bloco: "Informática", 
        disciplina: "Sistemas Operacionais", 
        aula: "Windows 10 e 11: Gerenciador de Arquivos, Pastas, Extensões e Atalhos Principais", 
        professor: "FAFIPA / Informática", 
        grandeArea: "Informática", 
        importancia: "Azul" 
    },
    { 
        bloco: "Informática", 
        disciplina: "Editor de Texto", 
        aula: "Microsoft Word: Formatação de Fontes, Parágrafos, Quebras e Mala Direta", 
        professor: "FAFIPA / Informática", 
        grandeArea: "Informática", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Informática", 
        disciplina: "Planilhas Eletrônicas", 
        aula: "Microsoft Excel: Fórmulas Básicas (SOMA, MÉDIA, SE, PROCV, CONT.SE) e Células Relativas/Absolutas", 
        professor: "FAFIPA / Informática", 
        grandeArea: "Informática", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Informática", 
        disciplina: "Apresentações", 
        aula: "Microsoft PowerPoint: Transições, Animações e Modos de Apresentação", 
        professor: "FAFIPA / Informática", 
        grandeArea: "Informática", 
        importancia: "Verde" 
    },
    { 
        bloco: "Informática", 
        disciplina: "Internet e Navegação", 
        aula: "Navegadores Web (Chrome, Edge, Firefox): Abas, Histórico, Favoritos e Navegação Anônima", 
        professor: "FAFIPA / Informática", 
        grandeArea: "Informática", 
        importancia: "Azul" 
    },
    { 
        bloco: "Informática", 
        disciplina: "Correio e Nuvem", 
        aula: "Correio Eletrônico: Campos (Para, Cc, Cco), Protocolos (POP3, IMAP, SMTP) e Anexos", 
        professor: "FAFIPA / Informática", 
        grandeArea: "Informática", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Informática", 
        disciplina: "Correio e Nuvem", 
        aula: "Armazenamento em Nuvem e Backup: Google Drive, OneDrive e Sincronização", 
        professor: "FAFIPA / Informática", 
        grandeArea: "Informática", 
        importancia: "Verde" 
    },
    { 
        bloco: "Informática", 
        disciplina: "Segurança da Informação", 
        aula: "Segurança da Informação: Malware (Vírus, Worm, Ransomware, Phishing) e Firewall/Antivírus", 
        professor: "FAFIPA / Informática", 
        grandeArea: "Informática", 
        importancia: "Vermelho" 
    },

    // ==========================================
    // LEGISLAÇÃO E ADMINISTRAÇÃO PÚBLICA
    // ==========================================
    { 
        bloco: "Legislação e Adm. Pública", 
        disciplina: "Constituição Federal", 
        aula: "CF/88: Princípios Fundamentais e Direitos Individuais e Coletivos (Art. 5º)", 
        professor: "FAFIPA / Legislação", 
        grandeArea: "Legislação e Adm. Pública", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Legislação e Adm. Pública", 
        disciplina: "Constituição Federal", 
        aula: "CF/88: Direitos Sociais e Nacionalidade (Arts. 6º a 13)", 
        professor: "FAFIPA / Legislação", 
        grandeArea: "Legislação e Adm. Pública", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Legislação e Adm. Pública", 
        disciplina: "Constituição Federal", 
        aula: "CF/88: Organização do Estado e Autonomia dos Municípios (Arts. 18, 29 e 30)", 
        professor: "FAFIPA / Legislação", 
        grandeArea: "Legislação e Adm. Pública", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Legislação e Adm. Pública", 
        disciplina: "Constituição Federal", 
        aula: "CF/88: Da Administração Pública e Servidores Públicos (Arts. 37 a 41 - LIMPE)", 
        professor: "FAFIPA / Legislação", 
        grandeArea: "Legislação e Adm. Pública", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Legislação e Adm. Pública", 
        disciplina: "Leis Federais", 
        aula: "Lei de Improbidade Administrativa (Lei 8.429/1992 com alterações da Lei 14.230/2021)", 
        professor: "FAFIPA / Legislação", 
        grandeArea: "Legislação e Adm. Pública", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Legislação e Adm. Pública", 
        disciplina: "Leis Federais", 
        aula: "Lei de Acesso à Informação - LAI (Lei 12.527/2011)", 
        professor: "FAFIPA / Legislação", 
        grandeArea: "Legislação e Adm. Pública", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Legislação e Adm. Pública", 
        disciplina: "Leis Federais", 
        aula: "Estatuto da Criança e do Adolescente - ECA (Lei 8.069/1990: Direitos Fundamentais)", 
        professor: "FAFIPA / Legislação", 
        grandeArea: "Legislação e Adm. Pública", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Legislação e Adm. Pública", 
        disciplina: "Leis Federais", 
        aula: "Estatuto da Pessoa Idosa (Lei 10.741/2003: Direitos Fundamentais e Crimes)", 
        professor: "FAFIPA / Legislação", 
        grandeArea: "Legislação e Adm. Pública", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Legislação e Adm. Pública", 
        disciplina: "Leis Federais", 
        aula: "LGPD - Lei Geral de Proteção de Dados (Lei 13.709/2018: Princípios e Tratamento no Poder Público)", 
        professor: "FAFIPA / Legislação", 
        grandeArea: "Legislação e Adm. Pública", 
        importancia: "Amarelo" 
    },

    // ==========================================
    // MEDICINA: ATENÇÃO BÁSICA E CLÍNICA MÉDICA
    // ==========================================
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "SUS e Saúde Coletiva", 
        aula: "SUS na CF/88 (Arts. 196 a 200) e Leis Orgânicas da Saúde (Lei 8.080/90 e Lei 8.142/90)", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "SUS e Saúde Coletiva", 
        aula: "Evolução Histórica das Normas Operacionais do SUS: NOB/91, NOB/93, NOB/96 e NOAS-SUS", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "SUS e Saúde Coletiva", 
        aula: "Política Nacional de Atenção Básica (PNAB 2017) e Estratégia Saúde da Família (ESF)", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Ética e Bioética Médica", 
        aula: "Código de Ética Médica: Princípios Fundamentais, Autonomia, Relação Médico-Paciente e Deveres", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Ética e Bioética Médica", 
        aula: "Documentos Médicos: Prontuário, Sigilo Profissional, Atestados e Declaração de Óbito", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Medicina Preventiva", 
        aula: "Rastreamento de Neoplasias Malignas na APS (Mama, Colo Uterino, Cólon e Próstata)", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Medicina Preventiva", 
        aula: "Calendário Vacinal do Adulto e Idoso (PNI/SBIm) e Imunizações Especiais (CRIE)", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Azul" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Medicina Preventiva", 
        aula: "Abordagem e Cessação do Tabagismo e Manejo do Alcoolismo na Atenção Primária", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Azul" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Saúde do Idoso", 
        aula: "Avaliação Geriátrica Ampla (AGA), Síndrome da Fragilidade, Quedas e Polifarmácia no Idoso", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Azul" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Cardiologia", 
        aula: "Hipertensão Arterial Sistêmica (HAS): Diagnóstico, Metas Pressóricas e Terapia Farmacológica", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Cardiologia", 
        aula: "Dislipidemias: Estratificação de Risco Cardiovascular e Metas de Tratamento com Estatinas", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Cardiologia", 
        aula: "Abordagem da Dor Torácica e Síndromes Coronarianas Agudas (IAM com e sem supra de ST)", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Cardiologia", 
        aula: "Insuficiência Cardíaca: Diagnóstico Clínico, Critérios de Framingham, NYHA e Terapia Quádrupla", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Cardiologia", 
        aula: "Valvopatias e Febre Reumática: Critérios de Jones, Profilaxia Primária e Secundária", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Cardiologia", 
        aula: "Síncope e Hipotensão Postural: Diagnóstico Diferencial e Estratificação de Risco", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Cardiologia e Emergência", 
        aula: "Princípios de Eletrocardiograma (ECG): Ritmo, Eixo, Sobrecargas Atriais/Ventriculares e Isquemia", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Cardiologia e Emergência", 
        aula: "Taquiarritmias e Bradiarritmias: Manejo da Fibrilação Atrial, Flutter, TSV e Bloqueios AV", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Cardiologia e Emergência", 
        aula: "Parada Cardiorrespiratória (PCR): Protocolo ACLS/BLS para Ritmos Chocáveis e Não Chocáveis", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Endocrinologia", 
        aula: "Diabetes Mellitus: Critérios Diagnósticos, Metas de HbA1c e Manejo Não Insulínico na APS", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Endocrinologia", 
        aula: "Insulinoterapia no Diabetes e Complicações Agudas (Cetoacidose Diabética e EHH)", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Endocrinologia", 
        aula: "Hipotireoidismo e Hipertireoidismo: Diagnóstico Laboratorial, Doença de Hashimoto e Graves", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Endocrinologia", 
        aula: "Nódulos Tireoidianos: Classificação de Bethesda, USG e Indicação de PAAF", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Endocrinologia e Metabologia", 
        aula: "Síndrome Metabólica e Obesidade: Critérios Clínicos e Abordagem Terapêutica", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Endocrinologia e Metabologia", 
        aula: "Distúrbios Hidroeletrolíticos (Sódio e Potássio) e Equilíbrio Ácido-Básico", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Pneumologia", 
        aula: "Asma Brônquica no Adulto: Diagnóstico Clínico-Espirométrico, Classificação GINA e Crise Aguda", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Pneumologia", 
        aula: "DPOC: Diagnóstico Espirométrico, Critérios GOLD e Manejo de Exacerbações Agudas", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Pneumologia", 
        aula: "Pneumonia Adquirida na Comunidade (PAC): Escore CURB-65, Diagnóstico e Antibioticoterapia Empírica", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Pneumologia", 
        aula: "Tuberculose Pulmonar: Baciloscopia, TRM-TB, Esquema RIPE e Acompanhamento na Atenção Básica", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Pneumologia", 
        aula: "Trombose Venosa Profunda (TVP) e Tromboembolismo Pulmonar (TEP): Escore de Wells e Conduta", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Gastroenterologia", 
        aula: "Doença do Refluxo Gastroesofágico (DRGE), Esofagites e Esôfago de Barrett", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Gastroenterologia", 
        aula: "Dispepsia Funcional, Gastrites e Terapia de Erradicação do Helicobacter pylori", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Gastroenterologia", 
        aula: "Doença Ulcerosa Péptica e Complicações: Hemorragia Digestiva Alta (HDA) e Perfuração", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Gastroenterologia e Hepatologia", 
        aula: "Hepatites Virais (A, B e C): Marcadores Sorológicos, Profilaxia e Tratamento", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Gastroenterologia e Hepatologia", 
        aula: "Cirrose Hepática e Hipertensão Portal: Manejo de Ascite, PBE, Encefalopatia e Varizes Esofágicas", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Gastroenterologia e Hepatologia", 
        aula: "Doença Hepática Esteatótica (Esteatose/EHNA) e Abordagem de Nódulos Hepáticos", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Gastroenterologia e Cirurgia Geral", 
        aula: "Litíase Biliar e Complicações: Colelitíase, Colecistite Aguda, Coledocolitíase e Colangite Aguda", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Gastroenterologia", 
        aula: "Pancreatite Aguda e Crônica: Etiologias, Critérios de Ranson e Manejo Clínico", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Gastroenterologia", 
        aula: "Diarreia Aguda Infecciosa no Adulto: Reidratação, Critérios para Antibióticos e Alarme", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Gastroenterologia", 
        aula: "Diarreia Crônica, Síndrome do Intestino Irritável (SII) e Doenças Inflamatórias Intestinais (Crohn e RCUI)", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Gastroenterologia", 
        aula: "Parasitoses Intestinais Mais Frequentes no Brasil: Diagnóstico e Tratamento na APS", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Azul" 
    },
    { 
        bloco: "Medicina: Atenção Básica e Clínica", 
        disciplina: "Cirurgia e Proctologia", 
        aula: "Doenças Orificiais (Hemorroidas, Fissura Anal, Abscessos) e Hérnias da Parede Abdominal", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Atenção Básica e Clínica", 
        importancia: "Vermelho" 
    },

    // ==========================================
    // MEDICINA: ESPECIALIDADES E URGÊNCIA
    // ==========================================
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Nefrologia e Urologia", 
        aula: "Infecções do Trato Urinário (ITU): Cistite Aguda, Pielonefrite e ITU Recorrente", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Nefrologia e Urologia", 
        aula: "Hiperplasia Prostática Benigna (HPB) e Nefrolitíase (Cólica Nefrética Aguda)", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Nefrologia", 
        aula: "Lesão Renal Aguda (LRA) e Doença Renal Crônica (DRC): Critérios KDIGO e Manejo Conservador", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Nefrologia", 
        aula: "Síndromes Glomerulares: Síndrome Nefrítica vs. Síndrome Nefrótica", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Hematologia", 
        aula: "Anemias Microcíticas e Hipocrômicas: Diagnóstico Diferencial entre Ferropriva, Doença Crônica e Talassemia", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Hematologia", 
        aula: "Anemias Macrocíticas (Megaloblástica por B12/Folato) e Anemias Hemolíticas", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Hematologia e Oncologia", 
        aula: "Abordagem das Linfadenopatias e Suspeita de Neoplasias Hematológicas (Leucemias e Linfomas)", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Azul" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Hematologia", 
        aula: "Distúrbios da Coagulação e Hemostasia: Trombocitopenias, Hemofilias e Coagulopatias", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Infectologia", 
        aula: "Antibioticoterapia Racional e Manejo de Resistência Bacteriana na Atenção Básica", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Infectologia", 
        aula: "Infecções Sexualmente Transmissíveis (ISTs): Sífilis (Primária, Secundária e Latente) e Corrimentos Uretrais", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Infectologia", 
        aula: "Infecção pelo HIV/AIDS: Diagnóstico, Profilaxias PEP/PrEP e Infecções Oportunistas", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Infectologia", 
        aula: "Hanseníase e Leishmaniose Tegumentar/Visceral: Diagnóstico, Notificação e Tratamento", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Infectologia", 
        aula: "Arboviroses (Dengue, Chikungunya, Zika): Classificação de Risco, Prova do Laço e Manejo Clínico", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Infectologia e Urgência", 
        aula: "Acidentes por Animais Peçonhentos: Ofídico (Bothrops, Crotalus), Escorpiônico e Aracnídico", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Dermatologia Sanitária", 
        aula: "Dermatologia na APS: Piodermites, Micoses Superficiais, Escabiose e Eczemas", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Dermatologia e Alergologia", 
        aula: "Lesões Pré-Malignas e Câncer de Pele (Melanoma, CBC, CEC) e Regra do ABCDE", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Dermatologia e Alergologia", 
        aula: "Urticária, Angioedema e Choque Anafilático: Reconhecimento e Uso Imediato de Adrenalina IM", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Neurologia", 
        aula: "Cefaleias Primárias (Enxaqueca, Tensional, Salvas) e Sinais de Alarme (Red Flags)", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Neurologia", 
        aula: "Acidente Vascular Cerebral (AVC Isquêmico e Hemorrágico): Janela de Trombólise e Escala NIHSS", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Neurologia", 
        aula: "Crises Epilépticas e Epilepsia: Manejo na Urgência, Estado de Mal Epiléptico e Anticonvulsivantes", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Neurologia", 
        aula: "Síndromes Demenciais (Doença de Alzheimer, Demência Vascular) e Diagnóstico Diferencial de Tontura e Vertigem", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Psiquiatria", 
        aula: "Depressão Maior e Transtornos de Ansiedade (TAG, Transtorno do Pânico): Diagnóstico e Farmacoterapia", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Psiquiatria", 
        aula: "Dependência Química, Abstinência Alcoólica e Manejo de Crises Psiquiátricas / Risco de Suicídio", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Psiquiatria", 
        aula: "Transtorno Afetivo Bipolar e Psicoses: Diagnóstico Diferencial e Condutas", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Reumatologia", 
        aula: "Monoartrites e Poliartrites: Abordagem da Artrite Séptica, Artrite Reumatoide e Artropatia por Gota", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Reumatologia", 
        aula: "Lúpus Eritematoso Sistêmico (LES) e Síndrome do Anticorpo Antifosfolípide (SAF)", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Reumatologia e Ortopedia", 
        aula: "Lombalgia e Cervicopatia na APS: Sinais de Alarme, Hérnia Discal e Tratamento", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Reumatologia", 
        aula: "Osteoartrite e Fibromialgia: Diagnóstico Clínico e Estratégia de Manejo da Dor Crônica", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Amarelo" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Cirurgia e Trauma", 
        aula: "Atendimento Inicial ao Politraumatizado: Protocolo ATLS (ABCDE do Trauma)", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Medicina: Especialidades e Urgência", 
        disciplina: "Cirurgia e Trauma", 
        aula: "Traumatismo Abdominal Fechado e Penetrante: FAST, Lavado Peritoneal e Indicações de Laparotomia", 
        professor: "FAFIPA / Medicina", 
        grandeArea: "Medicina: Especialidades e Urgência", 
        importancia: "Amarelo" 
    },

    // ==========================================
    // SAÚDE DA CRIANÇA
    // ==========================================
    {
        bloco: "Saúde da Criança",
        disciplina: "Puericultura",
        aula: "Crescimento Infantil e Curvas da OMS: Peso, Estatura, IMC e Perímetro Cefálico",
        professor: "FAFIPA / Pediatria",
        grandeArea: "Saúde da Criança",
        importancia: "Azul"
    },
    {
        bloco: "Saúde da Criança",
        disciplina: "Puericultura",
        aula: "Marcos do Desenvolvimento Neuropsicomotor (DNPM) nos Primeiros 2 Anos de Vida",
        professor: "FAFIPA / Pediatria",
        grandeArea: "Saúde da Criança",
        importancia: "Azul"
    },
    {
        bloco: "Saúde da Criança",
        disciplina: "Nutrição e Vacinação",
        aula: "Aleitamento Materno (Vantagens, Técnica e Dificuldades) e Alimentação Complementar Saudável",
        professor: "FAFIPA / Pediatria",
        grandeArea: "Saúde da Criança",
        importancia: "Azul"
    },
    {
        bloco: "Saúde da Criança",
        disciplina: "Nutrição e Vacinação",
        aula: "Calendário Vacinal da Criança (PNI): Vacinas aos 2, 3, 4, 5, 6, 9 e 12 Meses",
        professor: "FAFIPA / Pediatria",
        grandeArea: "Saúde da Criança",
        importancia: "Vermelho"
    },
    {
        bloco: "Saúde da Criança",
        disciplina: "Infectopediatria",
        aula: "Doenças Exantemáticas na Infância: Sarampo, Rubéola, Varicela e Escarlatina",
        professor: "FAFIPA / Pediatria",
        grandeArea: "Saúde da Criança",
        importancia: "Azul"
    },
    {
        bloco: "Saúde da Criança",
        disciplina: "Infectopediatria",
        aula: "Exantema Súbito (Roséola), Eritema Infeccioso e Doença Mão-Pé-Boca",
        professor: "FAFIPA / Pediatria",
        grandeArea: "Saúde da Criança",
        importancia: "Verde"
    },
    {
        bloco: "Saúde da Criança",
        disciplina: "Gastroenterologia Pediátrica",
        aula: "Diarreia Aguda e Desidratação na Criança: Avaliação e Manejo dos Planos A, B e C da OMS",
        professor: "FAFIPA / Pediatria",
        grandeArea: "Saúde da Criança",
        importancia: "Vermelho"
    },
    {
        bloco: "Saúde da Criança",
        disciplina: "Pneumopediatria",
        aula: "Infecções Respiratórias Agudas na Infância: Resfriado, Faringoamigdalite, Crupe Viral e Epiglotite",
        professor: "FAFIPA / Pediatria",
        grandeArea: "Saúde da Criança",
        importancia: "Vermelho"
    },
    {
        bloco: "Saúde da Criança",
        disciplina: "Pneumopediatria",
        aula: "Bronquiolite Viral Aguda (BVA), Asma na Criança e Síndrome do Lactente Sibilante",
        professor: "FAFIPA / Pediatria",
        grandeArea: "Saúde da Criança",
        importancia: "Vermelho"
    },
    {
        bloco: "Saúde da Criança",
        disciplina: "Neonatologia e Triagens",
        aula: "Triagens Neonatais no SUS: Teste do Pezinho, Olhinho, Coraçãozinho, Orelhinha e Linguinha",
        professor: "FAFIPA / Pediatria",
        grandeArea: "Saúde da Criança",
        importancia: "Amarelo"
    },
    {
        bloco: "Saúde da Criança",
        disciplina: "Prevenção e Cuidados",
        aula: "Desnutrição Infantil, Anemia Ferropriva e Prevenção de Acidentes e Intoxicações na Infância",
        professor: "FAFIPA / Pediatria",
        grandeArea: "Saúde da Criança",
        importancia: "Amarelo"
    },

    // ==========================================
    // SAÚDE DA MULHER
    // ==========================================
    {
        bloco: "Saúde da Mulher",
        disciplina: "Obstetrícia",
        aula: "Assistência ao Pré-Natal de Baixo Risco: Rotina de Consultas, Exames Laboratoriais e Suplementações",
        professor: "FAFIPA / GO",
        grandeArea: "Saúde da Mulher",
        importancia: "Azul"
    },
    {
        bloco: "Saúde da Mulher",
        disciplina: "Obstetrícia",
        aula: "Síndromes Hipertensivas na Gestação: Pré-Eclâmpsia, Eclâmpsia e Sulfatação no Parto",
        professor: "FAFIPA / GO",
        grandeArea: "Saúde da Mulher",
        importancia: "Vermelho"
    },
    {
        bloco: "Saúde da Mulher",
        disciplina: "Obstetrícia",
        aula: "Diabetes Mellitus Gestacional (DMG) e Infecções na Gravidez (ITU, Toxoplasmose e Sífilis Gestacional)",
        professor: "FAFIPA / GO",
        grandeArea: "Saúde da Mulher",
        importancia: "Vermelho"
    },
    {
        bloco: "Saúde da Mulher",
        disciplina: "Obstetrícia",
        aula: "Sangramentos da Primeira Metade da Gravidez: Abortamento, Gravidez Ectópica e Doença Trofoblástica",
        professor: "FAFIPA / GO",
        grandeArea: "Saúde da Mulher",
        importancia: "Vermelho"
    },
    {
        bloco: "Saúde da Mulher",
        disciplina: "Obstetrícia",
        aula: "Sangramentos da Segunda Metade da Gravidez: Placenta Prévia vs. Descolamento Prematuro de Placenta (DPP)",
        professor: "FAFIPA / GO",
        grandeArea: "Saúde da Mulher",
        importancia: "Vermelho"
    },
    {
        bloco: "Saúde da Mulher",
        disciplina: "Ginecologia Preventiva",
        aula: "Rastreamento do Câncer de Colo do Útero (Diretrizes do INCA / Citologia Oncótica) e Câncer de Mama",
        professor: "FAFIPA / GO",
        grandeArea: "Saúde da Mulher",
        importancia: "Azul"
    },
    {
        bloco: "Saúde da Mulher",
        disciplina: "Ginecologia Geral",
        aula: "Sangramento Uterino Anormal (SUA): Sistema de Classificação PALM-COEIN e Diagnóstico",
        professor: "FAFIPA / GO",
        grandeArea: "Saúde da Mulher",
        importancia: "Verde"
    },
    {
        bloco: "Saúde da Mulher",
        disciplina: "Ginecologia Geral",
        aula: "Climatério e Menopausa: Sintomas Vasomotores e Indicações de Terapia de Reposição Hormonal (TRH)",
        professor: "FAFIPA / GO",
        grandeArea: "Saúde da Mulher",
        importancia: "Verde"
    },
    {
        bloco: "Saúde da Mulher",
        disciplina: "Ginecologia Geral",
        aula: "Vulvovaginites: Diagnóstico Diferencial Clínico e Microscópico (Vaginose Bacteriana, Candidíase e Tricomoníase)",
        professor: "FAFIPA / GO",
        grandeArea: "Saúde da Mulher",
        importancia: "Vermelho"
    },
    {
        bloco: "Saúde da Mulher",
        disciplina: "Ginecologia Geral",
        aula: "Cervicites e Doença Inflamatória Pélvica (DIP): Critérios Diagnósticos e Manejo Clínico",
        professor: "FAFIPA / GO",
        grandeArea: "Saúde da Mulher",
        importancia: "Vermelho"
    },

    // ==========================================
    // OFTALMOLOGIA E ORL BÁSICOS
    // ==========================================
    {
        bloco: "Oftalmologia e ORL Básicos",
        disciplina: "Oftalmologia na APS",
        aula: "Olho Vermelho na Atenção Primária: Diagnóstico Diferencial de Conjuntivites e Sinais de Alarme",
        professor: "FAFIPA / Oftalmologia",
        grandeArea: "Oftalmologia e ORL Básicos",
        importancia: "Verde"
    },
    {
        bloco: "Oftalmologia e ORL Básicos",
        disciplina: "Oftalmologia na APS",
        aula: "Urgências Oftalmológicas: Corpo Estranho Ocular, Trauma Contuso e Queimaduras Químicas",
        professor: "FAFIPA / Oftalmologia",
        grandeArea: "Oftalmologia e ORL Básicos",
        importancia: "Verde"
    },
    {
        bloco: "Oftalmologia e ORL Básicos",
        disciplina: "Otorrinolaringologia na APS",
        aula: "Afecções do Ouvido: Otite Média Aguda (OMA), Otite Externa e Remoção de Cerume/Corpo Estranho",
        professor: "FAFIPA / Otorrinolaringologia",
        grandeArea: "Oftalmologia e ORL Básicos",
        importancia: "Verde"
    },
    {
        bloco: "Oftalmologia e ORL Básicos",
        disciplina: "Otorrinolaringologia na APS",
        aula: "Rinossinusite Aguda e Manejo Prático da Epistaxe (Tampamento Anterior e Posterior)",
        professor: "FAFIPA / Otorrinolaringologia",
        grandeArea: "Oftalmologia e ORL Básicos",
        importancia: "Verde"
    },
    {
        bloco: "Oftalmologia e ORL Básicos",
        disciplina: "Otorrinolaringologia na APS",
        aula: "Faringoamigdalites Agudas no Pronto Atendimento: Escore de Centor e Etiologia Viral vs. Bacteriana",
        professor: "FAFIPA / Otorrinolaringologia",
        grandeArea: "Oftalmologia e ORL Básicos",
        importancia: "Verde"
    },

    // ==========================================
    // VIGILÂNCIA E PROTEÇÃO
    // ==========================================
    {
        bloco: "Vigilância e Proteção",
        disciplina: "Vigilância Epidemiológica",
        aula: "Lista Nacional de Notificação Compulsória de Doenças, Agravos e Eventos de Saúde Pública (SINAN)",
        professor: "FAFIPA / Saúde Pública",
        grandeArea: "Vigilância e Proteção",
        importancia: "Vermelho"
    },
    {
        bloco: "Vigilância e Proteção",
        disciplina: "Proteção Social e Saúde",
        aula: "Notificação e Protocolo de Atendimento às Vítimas de Violência Doméstica e Sexual (Lei Maria da Penha)",
        professor: "FAFIPA / Saúde Pública",
        grandeArea: "Vigilância e Proteção",
        importancia: "Vermelho"
    },
    {
        bloco: "Vigilância e Proteção",
        disciplina: "Proteção Social e Saúde",
        aula: "Notificação de Suspeita ou Confirmação de Maus-Tratos contra Crianças, Adolescentes e Idosos",
        professor: "FAFIPA / Saúde Pública",
        grandeArea: "Vigilância e Proteção",
        importancia: "Vermelho"
    },

    // ==========================================
    // LEGISLAÇÃO MUNICIPAL DOS EDITAIS
    // ==========================================
    { 
        bloco: "Legislação Municipal dos Editais", 
        disciplina: "Legislação Municipal", 
        aula: "Cruz Machado: Lei Orgânica do Município e Lei Complementar nº 1/2006 (Estatuto do Servidor)", 
        professor: "Legislação Municipal", 
        grandeArea: "Legislação Municipal dos Editais", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Legislação Municipal dos Editais", 
        disciplina: "Legislação Municipal", 
        aula: "Coronel Vivida: Lei Orgânica, LC nº 071 (Estatuto dos Servidores) e LC nº 073 (Plano de Cargos/Carreira)", 
        professor: "Legislação Municipal", 
        grandeArea: "Legislação Municipal dos Editais", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Legislação Municipal dos Editais", 
        disciplina: "Legislação Municipal", 
        aula: "Foz do Iguaçu: Estatuto do Servidor (Lei Complementar nº 17/1993 e alterações)", 
        professor: "Legislação Municipal", 
        grandeArea: "Legislação Municipal dos Editais", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Legislação Municipal dos Editais", 
        disciplina: "Legislação Municipal", 
        aula: "Paula Freitas: Lei Orgânica Municipal e Lei Complementar nº 2.095/2013 (Regime Jurídico Único)", 
        professor: "Legislação Municipal", 
        grandeArea: "Legislação Municipal dos Editais", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Legislação Municipal dos Editais", 
        disciplina: "Legislação Municipal", 
        aula: "Siqueira Campos: Estatuto dos Servidores Públicos e Lei Orgânica do Município de Siqueira Campos-PR", 
        professor: "Legislação Municipal", 
        grandeArea: "Legislação Municipal dos Editais", 
        importancia: "Vermelho" 
    },
    { 
        bloco: "Legislação Municipal dos Editais", 
        disciplina: "Legislação Municipal", 
        aula: "Quitandinha: História, Geografia, Cidade, Meio de Vida, Trabalho e Economia do Município", 
        professor: "Legislação Municipal", 
        grandeArea: "Legislação Municipal dos Editais", 
        importancia: "Vermelho" 
    }
];

export const FAFIPA_SCHEDULE: ScheduleItem[] = RAW_DATA.map(item => ({
    id: generateId(item),
    bloco: item.grandeArea,
    grandeArea: item.grandeArea,
    disciplina: item.disciplina,
    aula: item.aula,
    professor: item.professor,
    importancia: item.importancia
}));
