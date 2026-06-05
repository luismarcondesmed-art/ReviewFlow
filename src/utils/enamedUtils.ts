import { especialidadesData, temasData, assuntosData } from '../data/enamedStats';
import { ImportanceType } from '../types';

// Helper to normalize strings for comparison
const normalize = (str: string) => {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
};

const SYNONYMS: Record<string, string[]> = {
    // Neurologia
    "acidentes vasculares cerebrais (avc)": ["avc", "acidente vascular cerebral", "derrame", "ave", "isquemia cerebral", "hemorragia cerebral", "ataque isquemico transitorio", "ait"],
    "coma e alteracoes da consciencia": ["coma", "rebaixamento do nivel de consciencia", "glasgow", "morte encefalica", "estado vegetativo", "delirium", "confusao mental"],
    "cefaleias": ["cefaleia", "dor de cabeca", "enxaqueca", "migranea", "cefaleia tensional", "cefaleia em salvas"],
    "traumatismo craniencefalico": ["tce", "trauma craniano", "concussao", "hematoma subdural", "hematoma epidural"],
    "disturbios do movimento": ["parkinson", "tremor", "coreia", "distonia", "huntington"],

    // Cardiologia
    "hipertensao arterial sistemica (has)": ["has", "hipertensao", "pressao alta", "crise hipertensiva", "emergencia hipertensiva", "urgencia hipertensiva"],
    "aterosclerose e doenca arterial coronariana": ["dac", "iam", "infarto", "angina", "sindrome coronariana", "doenca isquemica do coracao", "infarto agudo do miocardio", "supra de st", "infra de st"],
    "arritmias cardiacas": ["arritmia", "fibrilacao atrial", "fa", "taquicardia", "bradicardia", "bav", "bloqueio atrioventricular", "extrassistole", "flutter"],
    "insuficiencia cardiaca": ["ic", "insuficiencia cardiaca congestiva", "icc", "edema agudo de pulmao", "eap", "cor pulmonale"],
    "valvopatias": ["valvopatia", "estenose aortica", "insuficiencia aortica", "estenose mitral", "insuficiencia mitral", "prolapso da valva mitral"],
    "febre reumatica": ["febre reumatica", "doenca reumatica", "coreia de sydenham", "criterios de jones"],

    // Pneumologia
    "doenca pulmonar obstrutiva cronica (dpoc)": ["dpoc", "bronquite cronica", "enfisema", "exacerbacao da dpoc"],
    "asma": ["asma", "crise asthmatica", "broncoespasmo", "hiperreatividade bronquica"],
    "derrame pleural": ["derrame pleural", "pleuris", "empyema", "transudato", "exsudato", "criterios de light"],
    "cancer de pulmao": ["cancer de pulmao", "neoplasia pulmonar", "carcinoma broncogenico", "nodulo pulmonar solitario"],
    "pneumonias na infancia": ["pneumonia", "pac", "pneumonia adquirida na comunidade", "broncopneumonia", "pneumonia atipica"],
    "pneumonias bacterianas": ["pneumonia", "pac", "pneumonia adquirida na comunidade", "broncopneumonia", "pneumonia atipica", "pneumonia nosocomial", "pav"],

    // Nefrologia
    "infeccao do trato urinario (itu)": ["itu", "infeccao urinaria", "cistite", "pielonefrite", "bacteriuria assintomatica"],
    "lesao renal aguda (lra)": ["lra", "insuficiencia renal aguda", "ira", "necrose tubular aguda", "nta"],
    "doenca renal cronica": ["drc", "insuficiencia renal cronica", "irc", "sindrome uremica", "terapia de substituicao renal", "hemodialise"],
    "disturbios do equilibrio acidobasico (dhe)": ["dhe", "disturbios acido-base", "gasometria", "acidose", "alcalose", "disturbios hidroeletroliticos", "sodio", "potassio", "calcio", "hiponatremia", "hipernatremia", "hipocalemia", "hipercalemia"],
    "glomerulopatias": ["glomerulopatia", "sindrome nefritica", "sindrome nefrotica", "gnpe", "doenca de lesao minima", "gesf", "nefropatia por iga", "doenca de berger"],

    // Endocrinologia
    "diabetes": ["dm", "diabetes mellitus", "cetoacidose", "estado hiperosmolar", "hipoglicemia", "neuropatia diabetica", "nefropatia diabetica", "retinopatia diabetica"],
    "tireoide": ["hipotireoidismo", "hipertireoidismo", "tireoidite", "hashimoto", "graves", "nodulo tireoidiano", "cancer de tireoide", "bocio"],
    "obesidade e sindrome metabolica": ["obesidade", "sindrome metabolica", "resistencia insulinica", "dislipidemia", "cirurgia bariatrica"],
    "metabolismo osseo e mineral": ["osteoporose", "hiperparatireoidismo", "hipoparatireoidismo", "vitamina d", "osteomalacia", "doenca de paget"],
    "adrenal": ["cushing", "addison", "feocromocitoma", "hiperaldosteronismo", "incidentaloma adrenal"],

    // Infectologia
    "tuberculose": ["tb", "tuberculose pulmonar", "tuberculose extrapulmonar", "baciloscopia", "ppd", "igra", "rifampicina", "isoniazida", "pirazinamida", "etambutol", "esquema rhze"],
    "hiv/aids": ["hiv", "aids", "sida", "antirretroviral", "tarv", "infeccoes oportunistas", "profilaxia pos-exposicao", "pep", "prep"],
    "infeccoes sexualmente transmissiveis": ["ist", "dst", "sifilis", "gonorreia", "clamidia", "hpv", "herpes genital", "cancro mole", "donovanose", "linfogranuloma venereo", "corrimento", "ulcera genital"],
    "arboviroses": ["dengue", "zika", "chikungunya", "febre amarela", "aedes aegypti"],
    "infeccoes do sistema nervoso central": ["meningite", "meningoencefalite", "encefalite", "liquor", "puncao lombar"],
    "parasitoses": ["parasitose", "verminose", "ascaridiase", "giardiase", "amebiase", "esquistossomose", "teniase", "cisticercose", "estrongiloidiase", "enterobiase", "oxiuriase"],
    "sepse": ["sepse", "septicemia", "choque septico", "qsofa", "sofa", "sirs"],

    // Gastroenterologia e Hepatologia
    "hepatites virais": ["hepatite a", "hepatite b", "hepatite c", "hepatite d", "hepatite e", "ictericia", "hcv", "hbv", "hav"],
    "cirrose": ["cirrose", "hipertensao portal", "ascite", "encefalopatia hepatica", "varizes esofagicas", "pbe", "peritonite bacteriana espontanea", "sindrome hepatorrenal"],
    "doenca ulcerosa peptica, inibidores da bomba de protons e helicobacter pylori": ["ulcera peptica", "h. pylori", "helicobacter pylori", "ibp", "omeprazol", "ulcera gastrica", "ulcera duodenal"],
    "hemorragia digestiva alta varicosa": ["hda", "hemorragia digestiva alta", "varizes esofagicas", "sangramento varicoso"],
    "hemorragia digestiva baixa (hdb)": ["hdb", "hemorragia digestiva baixa", "hematoquezia", "enterorragia", "doenca diverticular", "angiodisplasia"],
    "doenca inflamatoria intestinal": ["dii", "doenca de crohn", "retocolite ulcerativa", "rcau"],
    "pancreatite aguda e cronica (pancreatites)": ["pancreatite", "pancreatite aguda", "pancreatite cronica", "amilase", "lipase", "criterios de ranson"],
    "vesicula e vias biliares": ["colelitiase", "colecistite", "coledocolitiase", "colangite", "pedra na vesicula", "sinal de murphy"],

    // Preventiva
    "sistema unico de saude (sus)": ["sus", "lei 8080", "lei 8142", "pnab", "atencao basica", "principios do sus", "diretrizes do sus", "pacto pela saude", "redes de atencao"],
    "medicina de familia e comunidade": ["mfc", "aps", "esf", "estrategia saude da familia", "genograma", "ecomapa", "metodo clinico centrado na pessoa", "mccp", "visita domiciliar"],
    "epidemiologia": ["epidemiologia", "incidencia", "prevalencia", "mortalidade", "letalidade", "transicao demografica", "transicao epidemiologica", "estudos epidemiologicos", "coorte", "caso-controle", "ensaio clinico", "risco relativo", "odds ratio", "sensibilidade", "especificidade", "vpp", "vpn"],
    "etica medica": ["etica", "bioetica", "codigo de etica medica", "cem", "sigilo medico", "autonomia", "beneficencia", "nao maleficencia", "justica", "responsabilidade civil", "eutanasia", "ortotanasia", "distanasia", "documentos medicos", "atestado", "prontuario", "declaracao de obito"],
    "saude do trabalhador": ["saude do trabalhador", "doencas ocupacionais", "cat", "comunicacao de acidente de trabalho", "ler", "dort", "pneumoconioses", "silicose", "asbestose", "saturnismo", "benzenismo", "burnout"],

    // Ginecologia e Obstetricia
    "doencas associadas a gestacao": ["dheg", "pre-eclampsia", "eclampsia", "hellp", "diabetes gestacional", "dmg", "hipertensao na gestacao"],
    "hemorragia pos-parto (hpp)": ["hpp", "atonia uterina", "hemorragia puerperal", "inversao uterina", "laceracao de trajeto", "retencao placentaria", "indice de choque"],
    "sangramento uterino anormal (sua)": ["sua", "mioma", "adenomiose", "polipo endometrial", "sangramento disfuncional", "palm-coein"],
    "sangramento da primeira metade": ["abortamento", "aborto", "gravidez ectopica", "doenca trofoblastica gestacional", "mola hidatiforme"],
    "sangramento da segunda metade": ["descolamento prematuro de placenta", "dpp", "placenta previa", "rotura uterina", "vasa previa"],
    "pre-natal": ["pre-natal", "consultas de pre-natal", "exames de pre-natal", "suplementacao na gestacao", "acido folico", "sulfato ferroso", "vacinas na gestacao"],
    "parto": ["parto", "trabalho de parto", "fases do parto", "dilatacao", "expulsivo", "secundamento", "distocia", "partograma", "fórceps", "cesarea", "inducao do parto"],
    "rastreamento do cancer de colo uterino": ["preventivo", "papanicolau", "hpv", "nic", "cancer de colo de utero", "colposcopia"],
    "rastreamento do cancer de mama": ["mamografia", "birads", "cancer de mama", "nodulo mamario", "mastologia"],
    "planejamento familiar": ["anticoncepcao", "contraceptivos", "diu", "pilula", "laqueadura", "vasectomia", "metodos comportamentais", "metodos de barreira"],
    "vulvovaginites": ["vulvovaginite", "candidíase", "vaginose bacteriana", "tricomoníase", "gardnerella", "corrimento vaginal"],
    "amenorreia": ["amenorreia", "falencia ovariana", "sop", "sindrome dos ovarios policisticos", "hiperprolactinemia", "menopausa", "climaterio"],

    // Pediatria
    "puericultura": ["puericultura", "desenvolvimento infantil", "marcos do desenvolvimento", "crescimento", "graficos de crescimento", "z-score", "alimentacao infantil", "introducao alimentar"],
    "imunizacoes": ["vacina", "calendario vacinal", "pni", "bcg", "hepatite b", "pentavalente", "polio", "vip", "vop", "rotavirus", "pneumococica", "meningococica", "febre amarela", "triplice viral", "tetraviral", "dtp", "hpv"],
    "aleitamento materno": ["amamentacao", "leite materno", "colostro", "pega correta", "desmame", "mastite", "fissura mamilar"],
    "neonatologia": ["rn", "recem-nascido", "reanimacao neonatal", "apgar", "capurro", "ballard", "prematuridade", "sdr", "doenca da membrana hialina", "taquipneia transitoria", "sam", "sindrome de aspiracao meconial"],
    "ictericia e sepse neonatal": ["ictericia neonatal", "hiperbilirrubinemia", "kernicterus", "fototerapia", "exsanguineotransfusao", "incompatibilidade abo", "incompatibilidade rh", "sepse neonatal", "infeccao neonatal"],
    "infeccoes congenitas": ["torch", "toxoplasmose congenita", "rubeola congenita", "citomegalovirus congenito", "cmv", "sifilis congenita", "zika congenita"],
    "diarreia": ["diarreia aguda", "desidratacao", "tro", "terapia de reidratacao oral", "gastroenterite", "rotavirus", "zinco"],

    // Cirurgia
    "trauma": ["trauma", "atls", "avaliacao inicial", "vias aereas", "choque", "trauma toracico", "trauma abdominal", "trauma pelvico", "tce", "trauma raquimedular"],
    "abdome agudo inflamatorio - apendicite aguda": ["abdome agudo", "apendicite", "sinal de blumberg", "sinal de rovsing", "alvarado"],
    "abdome agudo obstrutivo": ["obstrucao intestinal", "bridas", "aderencias", "volvo", "intussuscepcao", "fecaloma", "tumor intestinal", "sinal do grao de cafe"],
    "complicacoes pos-operatorias": ["pos-operatorio", "febre no pos-operatorio", "infeccao de sitio cirurgico", "isc", "deiscencia", "seroma", "hematoma", "atelectasia", "tvp", "tep"],
    "proctologia": ["hemorroidas", "fissura anal", "fistula anal", "abscesso anorretal", "cancer colorretal", "doenca pilonidal"],

    // Outros
    "eletrocardiograma": ["ecg", "eletrocardiografia", "eixo cardiaco", "sobrecarga", "bloqueio de ramo", "brd", "bre"],
    "anatomia": ["anatomia", "morfologia"],
    "fisiologia": ["fisiologia", "funcionamento"],
    "farmacologia": ["farmacologia", "medicamentos", "drogas", "terapeutica"],
    "patologia": ["patologia", "fisiopatologia", "mecanismo de doenca"]
};

export const calculateEnamedStats = (areaName: string, lessonNames: string[]): { priority: ImportanceType, questions: number, lessonQuestions: number[] } => {
    // Flatten all assuntos and temas to search
    const allAssuntos: { name: string, esp: string, normName: string }[] = [];
    Object.entries(assuntosData).forEach(([esp, assuntos]) => {
        assuntos.forEach(a => allAssuntos.push({ name: a, esp, normName: normalize(a) }));
    });

    const allTemas: { name: string, esp: string, percentage: number, normName: string }[] = [];
    Object.entries(temasData).forEach(([esp, temas]) => {
        temas.forEach(t => allTemas.push({ name: t.name, esp, percentage: t.percentage, normName: normalize(t.name) }));
    });

    const lessonScores: number[] = [];
    let totalScore = 0;

    lessonNames.forEach(lesson => {
        const normLesson = normalize(lesson);
        let lessonScore = 0;
        let matched = false;

        // Helper to check if a lesson matches a target string or its synonyms
        const checkMatch = (targetNorm: string) => {
            if (normLesson.includes(targetNorm) || targetNorm.includes(normLesson)) return true;
            const synonyms = SYNONYMS[targetNorm];
            if (synonyms) {
                return synonyms.some(syn => normLesson.includes(syn) || normLesson.split(' ').includes(syn));
            }
            return false;
        };

        // 1. Check if it matches any top Assunto (high priority)
        const matchedAssunto = allAssuntos.find(a => checkMatch(a.normName));
        if (matchedAssunto) {
            lessonScore += 50; // High score for being a top assunto
            matched = true;
        }

        // 2. Check if it matches any Tema
        const matchedTema = allTemas.find(t => checkMatch(t.normName));
        if (matchedTema) {
            // Add score based on tema percentage directly
            lessonScore += matchedTema.percentage;
            matched = true;
        }

        // 3. Fallback: Check specialty prevalence if area matches
        if (!matched) {
            const matchedEsp = especialidadesData.find(e => 
                normalize(e.name) === normalize(areaName) || 
                (normalize(areaName) === 'clinica' && !['cirurgia', 'pediatria', 'preventiva', 'ginecologia', 'obstetricia'].includes(normalize(e.name))) ||
                (normalize(areaName) === 'go' && ['ginecologia', 'obstetricia'].includes(normalize(e.name)))
            );
            
            if (matchedEsp) {
                // Add score based on specialty percentage
                lessonScore += matchedEsp.percentage;
            } else {
                // Base score if nothing matches
                lessonScore += 5;
            }
        }

        lessonScores.push(lessonScore);
        totalScore += lessonScore;
    });

    const avgScore = lessonNames.length > 0 ? totalScore / lessonNames.length : 0;

    // Determine overall priority based on avgScore
    let priority: ImportanceType = 'medium';
    if (avgScore >= 30) {
        priority = 'high';
    } else if (avgScore >= 10) {
        priority = 'medium';
    } else {
        priority = 'low';
    }

    // Determine total questions for the block (between 20 and 40)
    let totalQuestions = 20;
    if (avgScore >= 40) {
        totalQuestions = 40;
    } else if (avgScore >= 25) {
        totalQuestions = 35;
    } else if (avgScore >= 15) {
        totalQuestions = 30;
    } else if (avgScore >= 8) {
        totalQuestions = 25;
    } else {
        totalQuestions = 20;
    }

    // Distribute totalQuestions proportionally among lessons based on lessonScores
    const lessonQuestions: number[] = [];
    if (totalScore === 0) {
        // Even distribution if all scores are 0
        const avg = Math.floor(totalQuestions / lessonNames.length);
        const rem = totalQuestions % lessonNames.length;
        lessonNames.forEach((_, i) => lessonQuestions.push(i === 0 ? avg + rem : avg));
    } else {
        let remainingQuestions = totalQuestions;
        
        // Initial proportional distribution
        const initialDistribution = lessonScores.map(score => {
            const proportion = score / totalScore;
            // Ensure every lesson gets at least 2 questions if possible
            const q = Math.max(2, Math.round(proportion * totalQuestions));
            return q;
        });

        // Adjust to make sure the sum equals totalQuestions
        let currentSum = initialDistribution.reduce((a, b) => a + b, 0);
        
        while (currentSum !== totalQuestions) {
            if (currentSum < totalQuestions) {
                // Add to the highest score
                const maxIdx = lessonScores.indexOf(Math.max(...lessonScores));
                initialDistribution[maxIdx]++;
                currentSum++;
            } else {
                // Subtract from the highest score that has more than 2
                const validIndices = initialDistribution.map((q, i) => q > 2 ? i : -1).filter(i => i !== -1);
                if (validIndices.length > 0) {
                    let minScoreIdx = validIndices[0];
                    for (const idx of validIndices) {
                        if (lessonScores[idx] < lessonScores[minScoreIdx]) {
                            minScoreIdx = idx;
                        }
                    }
                    initialDistribution[minScoreIdx]--;
                    currentSum--;
                } else {
                    initialDistribution[0]--;
                    currentSum--;
                }
            }
        }
        
        lessonQuestions.push(...initialDistribution);
    }

    return { priority, questions: totalQuestions, lessonQuestions };
};
<<<<<<< HEAD

// Add getAISummary export to the end
export const getAILessonSummary = (areaName: string, blockLessons: string[]): string => {
    const keywords = blockLessons.join(' ').toLowerCase();
    
    if (keywords.includes('pediatria') || keywords.includes('neonatologia') || areaName.toLowerCase() === 'pediatria') {
        return "Resumo IA: Foco extremo em Puericultura e Marcos do Desenvolvimento. Em doenças exantemáticas, diferencie o período de contágio e lesão clássica. Em neonatologia, preste atenção aos passos de reanimação e icterícia precoce vs tardia.";
    }
    if (keywords.includes('cirurgia') || keywords.includes('trauma') || areaName.toLowerCase() === 'cirurgia') {
        return "Resumo IA: Memorize o ATLS e passos essenciais do ABCDE. Em abdome agudo, foque na clínica e no exame de imagem padrão-ouro (Tomografia x USG). Hérnias e complicações pós-operatórias (febre PO) caem muito.";
    }
    if (keywords.includes('ginecologia') || keywords.includes('obstetrícia') || areaName.toLowerCase() === 'go') {
        return "Resumo IA: Rastreamentos (Câncer de Mama e Colo) são absolutos! Em Obstetrícia, domine Sangramentos da gestação, patologias da gravidez (DHEG/DMG) e estágios do parto com intervenções necessárias (Forceps/Ocitocina).";
    }
    if (keywords.includes('preventiva') || keywords.includes('sus') || areaName.toLowerCase() === 'preventiva') {
        return "Resumo IA: Foco nos pilares do SUS e Leis 8.080. Desenho de estudos epidemiológicos caem em todas as bancas. Lembre-se: Incidência x Prevalência e Sensibilidade (triagem) vs Especificidade (confirmação).";
    }
    if (keywords.includes('cardio') || keywords.includes('infarto') || keywords.includes('has')) {
        return "Resumo IA: Cardiologia é pilar. Foque nos algoritmos de emergência para IAM, HAS e Arritmias. Identifique os ECGS chaves (Supra, FA) e no tratamento farmacológico rápido (AAS, Estatinas, Betabloqueadores).";
    }

    return `Resumo IA: Priorize os conceitos de alta relevância (Blue/Green) deste bloco de ${areaName}. Tente mapear diagnósticos diferenciais rapidamente da doença abordada para não errar questões de sintomatologia ambígua.`;
};
=======
>>>>>>> f71e79ffd4dd38d111ba5f8a2e672154ded765f5
