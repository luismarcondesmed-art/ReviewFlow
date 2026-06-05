export const especialidadesData = [
  { name: 'Pediatria', count: 308, percentage: 14.41 },
  { name: 'Cirurgia', count: 280, percentage: 13.10 },
  { name: 'Preventiva', count: 238, percentage: 11.13 },
  { name: 'Obstetrícia', count: 206, percentage: 9.64 },
  { name: 'Ginecologia', count: 204, percentage: 9.54 },
  { name: 'Infectologia', count: 188, percentage: 8.79 },
  { name: 'Gastroenterologia', count: 95, percentage: 4.44 },
  { name: 'Psiquiatria', count: 94, percentage: 4.40 },
  { name: 'Endocrinologia', count: 84, percentage: 3.93 },
  { name: 'Cardiologia', count: 74, percentage: 3.46 },
  { name: 'Neurologia', count: 62, percentage: 2.90 },
  { name: 'Nefrologia', count: 53, percentage: 2.48 },
  { name: 'Hematologia', count: 46, percentage: 2.15 },
  { name: 'Pneumologia', count: 43, percentage: 2.01 },
  { name: 'Dermatologia', count: 34, percentage: 1.59 },
  { name: 'Ortopedia', count: 34, percentage: 1.59 },
  { name: 'Reumatologia', count: 33, percentage: 1.54 },
  { name: 'Hepatologia', count: 23, percentage: 1.08 },
  { name: 'Otorrinolaringologia', count: 21, percentage: 0.98 },
  { name: 'Oftalmologia', count: 18, percentage: 0.84 },
];

export const temasData: Record<string, { name: string, percentage: number }[]> = {
  'Pediatria': [
    { name: 'Puericultura', percentage: 29.90 },
    { name: 'Neonatologia', percentage: 20.93 },
    { name: 'Pneumologia Pediátrica', percentage: 10.96 },
    { name: 'Gastrologia Pediátrica', percentage: 8.64 },
    { name: 'Reumatologia Pediátrica', percentage: 6.98 },
  ],
  'Cirurgia': [
    { name: 'Trauma', percentage: 24.48 },
    { name: 'Urgências Abdominais', percentage: 19.93 },
    { name: 'Cirurgia Infantil', percentage: 11.54 },
    { name: 'Urologia', percentage: 6.64 },
    { name: 'Complicações Pós-Operatórias', percentage: 4.90 },
  ],
  'Preventiva': [
    { name: 'Epidemiologia', percentage: 35.10 },
    { name: 'Sistema Único de Saúde (SUS)', percentage: 28.16 },
    { name: 'Medicina de Família e Comunidade', percentage: 15.92 },
    { name: 'Ética Médica', percentage: 14.69 },
    { name: 'Saúde do Trabalhador', percentage: 6.12 },
  ],
  'Obstetrícia': [
    { name: 'Doenças Associadas à Gestação', percentage: 30.14 },
    { name: 'Intercorrências Obstétricas', percentage: 23.44 },
    { name: 'Pré-Natal', percentage: 13.88 },
    { name: 'Parto', percentage: 12.92 },
    { name: 'Medicina Fetal', percentage: 12.92 },
  ],
  'Ginecologia': [
    { name: 'Ginecologia Endócrina', percentage: 34.76 },
    { name: 'Oncologia Ginecológica', percentage: 24.76 },
    { name: 'Infecções em Ginecologia', percentage: 14.76 },
    { name: 'Mastologia', percentage: 13.81 },
    { name: 'Ginecologia Geral', percentage: 10.48 },
  ],
  'Infectologia': [
    { name: 'Tuberculose', percentage: 13.11 },
    { name: 'Arboviroses', percentage: 13.11 },
    { name: 'Infecções do Sistema Nervoso Central', percentage: 12.02 },
    { name: 'Infecções Sexualmente Transmissíveis', percentage: 7.65 },
    { name: 'HIV/AIDS', percentage: 6.56 },
  ],
  'Gastroenterologia': [
    { name: 'Neoplasias do Sistema Digestivo', percentage: 31.87 },
    { name: 'Intestinos', percentage: 20.88 },
    { name: 'Hemorragia Digestiva', percentage: 16.48 },
    { name: 'Estômago', percentage: 10.99 },
    { name: 'Pâncreas', percentage: 10.99 },
  ],
  'Psiquiatria': [
    { name: 'Dependência Química', percentage: 21.15 },
    { name: 'Transtornos de Humor', percentage: 15.38 },
    { name: 'Intoxicações Exógenas', percentage: 15.38 },
    { name: 'Psiquiatria Infantil', percentage: 13.46 },
    { name: 'Psicofarmacologia', percentage: 7.69 },
  ],
  'Endocrinologia': [
    { name: 'Diabetes', percentage: 45.78 },
    { name: 'Tireoide', percentage: 32.53 },
    { name: 'Obesidade e Síndrome Metabólica', percentage: 9.64 },
    { name: 'Metabolismo Ósseo e Mineral', percentage: 8.43 },
    { name: 'Adrenal', percentage: 1.20 },
  ],
  'Cardiologia': [
    { name: 'Hipertensão Arterial Sistêmica (HAS)', percentage: 28.57 },
    { name: 'Aterosclerose e Doença Arterial Coronariana', percentage: 28.57 },
    { name: 'Arritmias Cardíacas', percentage: 28.57 },
    { name: 'Insuficiência Cardíaca', percentage: 6.49 },
    { name: 'Valvopatias', percentage: 6.49 },
  ],
  'Nefrologia': [
    { name: 'Glomerulopatias', percentage: 28.00 },
    { name: 'Infecção do Trato Urinário (ITU)', percentage: 26.00 },
    { name: 'Doença Renal Crônica', percentage: 14.00 },
    { name: 'Lesão Renal Aguda (LRA)', percentage: 10.00 },
    { name: 'Distúrbios do Equilíbrio Acidobásico (DHE)', percentage: 10.00 },
  ],
  'Neurologia': [
    { name: 'Coma e Alterações da Consciência', percentage: 16.67 },
    { name: 'Cefaleias', percentage: 16.67 },
    { name: 'Acidentes Vasculares Cerebrais (AVC)', percentage: 16.67 },
    { name: 'Traumatismo Craniencefálico', percentage: 16.67 },
    { name: 'Distúrbios do Movimento', percentage: 13.33 },
  ],
  'Hematologia': [
    { name: 'Hemoglobinopatias', percentage: 20.83 },
    { name: 'Hemostasia', percentage: 14.58 },
    { name: 'Linfomas', percentage: 12.50 },
    { name: 'Anemias Macrocíticas', percentage: 10.42 },
    { name: 'Leucemias', percentage: 8.33 },
  ],
  'Pneumologia': [
    { name: 'Asma', percentage: 22.73 },
    { name: 'Derrame Pleural', percentage: 20.45 },
    { name: 'Doença Pulmonar Obstrutiva Crônica (DPOC)', percentage: 18.18 },
    { name: 'Câncer de Pulmão', percentage: 13.64 },
    { name: 'Introdução à Pneumologia', percentage: 9.09 },
  ],
  'Reumatologia': [
    { name: 'Artropatias Inflamatórias', percentage: 30.30 },
    { name: 'Doenças Autoimunes do Tecido Conjuntivo', percentage: 30.30 },
    { name: 'Artropatias Infecciosas', percentage: 18.18 },
    { name: 'Síndromes Dolorosas Crônicas', percentage: 15.15 },
    { name: 'Vasculites', percentage: 6.06 },
  ],
  'Hepatologia': [
    { name: 'Hepatites Virais', percentage: 56.00 },
    { name: 'Outras Hepatopatias', percentage: 16.00 },
    { name: 'Complicações da Insuficiência Hepática', percentage: 16.00 },
    { name: 'Cirrose', percentage: 4.00 },
    { name: 'Tumores Hepáticos', percentage: 4.00 },
  ],
  'Dermatologia': [
    { name: 'Dermatoses Infecciosas', percentage: 28.13 },
    { name: 'Câncer de Pele', percentage: 21.88 },
    { name: 'Hanseníase', percentage: 15.63 },
    { name: 'Dermatoses Eczematosas', percentage: 15.63 },
    { name: 'Anatomia e Fisiologia da Pele', percentage: 6.25 },
  ],
  'Ortopedia': [
    { name: 'Ortopedia Geral', percentage: 54.84 },
    { name: 'Trauma Ortopédico', percentage: 29.03 },
    { name: 'Ortopedia Pediátrica', percentage: 16.13 },
  ],
  'Otorrinolaringologia': [
    { name: 'Infecções das Vias Aéreas Superiores', percentage: 85.71 },
    { name: 'Linfadenites Cervicais', percentage: 4.76 },
    { name: 'Corpo Estranho Nasal', percentage: 4.76 },
    { name: 'Epistaxe', percentage: 4.76 },
  ],
  'Oftalmologia': [
    { name: 'Traumatismos Oculares', percentage: 43.75 },
    { name: 'Síndrome do Olho Vermelho', percentage: 37.50 },
    { name: 'Glaucoma', percentage: 12.50 },
    { name: 'Óptica e Distúrbios da Refração', percentage: 6.25 },
  ],
};

export const assuntosData: Record<string, string[]> = {
  'Pediatria': [
    'Imunizações', 'Aleitamento Materno', 'Icterícia e Sepse Neonatal', 'Infecções Congênitas',
    'Diarreia', 'Febre Reumática', 'Asma', 'Crescimento', 'Pneumonias na Infância', 'Cuidados Neonatais'
  ],
  'Cirurgia': [
    'Trauma - Avaliação Inicial, Vias Aéreas e Trauma Torácico', 'Proctologia', 'Urologia',
    'Trauma Abdominal e Pélvico', 'Cirurgia Infantil Pt. II', 'Temas Gerais em Cirurgia',
    'Abdome Agudo Obstrutivo', 'Vesícula e Vias Biliares', 'Complicações Pós-Operatórias',
    'Abdome Agudo Inflamatório - Apendicite Aguda'
  ],
  'Preventiva': [
    'Ética Médica', 'Saúde do Idoso', 'Atenção Primária à Saúde no Brasil', 'Saúde do Trabalhador',
    'Medicina de Família e Comunidade', 'Políticas de Saúde', 'Sistemas de Informação em Saúde',
    'Vigilância em Saúde', 'Processo Saúde-Doença', 'Medidas de Saúde Coletiva Pt. II'
  ],
  'Obstetrícia': [
    'Distúrbios Hipertensivos da Gestação', 'Diabetes na Gestação', 'Pré-Natal', 'Partograma e Distocia',
    'Sangramento da Primeira Metade', 'Hemorragia Pós-Parto (HPP)', 'Sífilis na Gestação e Sífilis Congênita',
    'Sangramento da Segunda Metade', 'Assistência ao Parto', 'Vitalidade Fetal'
  ],
  'Ginecologia': [
    'Rastreamento do Câncer de Colo Uterino', 'Rastreamento do Câncer de Mama', 'Planejamento Familiar',
    'Assistência à Vítima de Violência Sexual', 'Vulvovaginites', 'Doenças Benignas da Mama',
    'Amenorreia', 'Úlceras Genitais', 'Sangramento Uterino Anormal (SUA)', 'Tumores Anexiais e Câncer de Ovário'
  ],
  'Infectologia': [
    'Tuberculose', 'Parasitoses', 'Arboviroses (Dengue, Chikungunya e Zika)', 'Infecção Hospitalar',
    'Meningites e Meningoencefalites', 'Piodermites', 'Pneumonias Bacterianas', 'Sepse',
    'HIV', 'Raiva, Tétano, Mordedura e Arranhadura Animal'
  ],
  'Gastroenterologia': [
    'Pólipos e Neoplasias Intestinais', 'Corpo Estranho', 'Doença Ulcerosa Péptica, Inibidores da Bomba de Prótons e Helicobacter Pylori',
    'Neoplasias de Estômago e Esôfago', 'Pancreatite Aguda e Crônica (Pancreatites)', 'Distúrbios Disabsortivos',
    'Anatomia e Fisiologia do Pâncreas e Neoplasias Pancreáticas', 'Hemorragia Digestiva Alta Varicosa',
    'Doença Inflamatória Intestinal', 'Hemorragia Digestiva Baixa (HDB)'
  ],
  'Endocrinologia': [
    'Diabetes Mellitus - Complicações Agudas', 'Obesidade e Síndrome Metabólica', 'Diabetes Mellitus Tipo 2',
    'Tireotoxicose', 'Hipotireoidismo', 'Osteoporose e Doença Óssea de Paget', 'Introdução ao Diabetes Mellitus',
    'Diabetes Mellitus - Complicações Crônicas', 'Diabetes Mellitus - Insulinoterapia e Cirurgia Metabólica',
    'Fisiologia, Semiologia e Avaliação Diagnóstica'
  ],
  'Psiquiatria': [
    'Dependência Química', 'Transtornos de Ansiedade', 'Transtornos de Humor', 'Psiquiatria Social e Reforma Psiquiátrica',
    'Intoxicações Exógenas', 'Transtornos Alimentares', 'Psiquiatria Infantil', 'Transtornos Psicóticos',
    'Psicofarmacologia', 'TOC, Transt. Somático, Dissociativos e Estresse'
  ],
  'Cardiologia': [
    'Hipertensão Arterial Sistêmica Pt. 2 (Tratamento)', 'Insuficiência Cardíaca Pt.2 (Tratamento)',
    'Fibrilação e Flutter Atrial', 'Hipertensão Arterial Sistêmica Pt. 3 (HAS Complicada)',
    'IAMCSSST (Infarto Agudo do Miocardio)', 'Taquiarritmias', 'Dislipidemia e Estratificação de Risco Cardiovascular',
    'Valvopatias', 'SCASSST - Síndrome Coronariana Aguda S/ Supra do Seg. ST', 'Parada Cardiorrespiratória (PCR)'
  ],
  'Nefrologia': [
    'Doenças Glomerulares', 'Doença Renal Crônica - Pt. 1', '(ITU) Infecção do Trato Urinário', 'Nefrolitíase',
    'Lesão Renal Aguda (LRA)', 'Distúrbios do Potássio', 'Distúrbios Ácido-Base', 'Disnatremias',
    'Doença Renal Crônica - Pt. 2'
  ],
  'Neurologia': [
    'Acidentes Vasculares Cerebrais', 'Epilepsias', 'Traumatismo Cranioencefálico', 'Doenças Neuromusculares',
    'Coma e Alterações da Consciência', 'Anatomia, Fisiologia e Semiologia Neurológica', 'Cefaleia',
    'Demências', 'Distúrbios do Movimento', 'Mielopatias'
  ],
  'Hematologia': [
    'Anemias Hemolíticas', 'Anemias Microcíticas', 'Hemostasia II', 'Introdução ao Estudo das Anemias',
    'Leucemias Crônicas, Linfomas, Mielodisplasias e Mieloproliferações', 'Gamopatias Monoclonais',
    'Anemias Macrocíticas', 'Medicina Transfusional', 'Leucemias Agudas', 'Anemia Associada a Condições Não Hematológicas'
  ],
  'Pneumologia': [
    'Asma', 'Introdução à Pneumologia', 'Derrame Pleural', 'Tromboembolismo Pulmonar (TEP)',
    'Doença Pulmonar Obstrutiva Crônica (DPOC)', 'Pneumopatias Intersticiais, Hipertensão Pulmonar, Bronquiectasias e Pneumotórax Espontâneo',
    'Neoplasias Pulmonares', 'Pneumologia Intensiva'
  ],
  'Reumatologia': [
    'Doenças Inflamatória do Tecido Conjuntivo II', 'Espondiloartrite', 'Artrite Reumatóide', 'Vasculites',
    'Artropatias Infecciosas', 'Artrites Microcristalinas', 'Síndromes Dolorosas Crônicas', 'Doenças Inflamatória do Tecido Conjuntivo I'
  ],
  'Hepatologia': [
    'Hepatites Virais', 'Tumores Hepáticos', 'Complicações da Cirrose Hepática', 'Transplante Hepático e Hepatite Fulminante',
    'Outras Hepatopatias', 'Cirrose Hepática', 'Hepatopatias Autoimunes'
  ],
  'Dermatologia': [
    'Dermatoses Infecciosas', 'Dermatoses Eczematosas', 'Síndromes Verrucosas', 'Histologia e Fisiologia da Pele e Lesões Elementares',
    'Oncologia Cutânea (Câncer de Pele)', 'Farmacodermias', 'Hanseníase', 'Miscelânea'
  ],
  'Ortopedia': [
    'Doenças da Coluna Vertebral', 'Quadril Pediátrico', 'Maus Tratos', 'Conceitos Básicos do Trauma Ortopédico',
    'Politrauma Ortopédico', 'Complicações do Trauma Ortopédico', 'Fraturas e Luxações', 'Fratura Exposta',
    'Oncologia Ortopédica e Osteomielite', 'Coluna Pediátrica'
  ],
  'Otorrinolaringologia': [
    'Manejo dos Nódulos de Tireoide, Câncer de Tireoide e Tireoidectomia', 'Neoplasias Benignas e Malignas de Cabeça e Pescoço, Doenças Congênitas Cervicofaciais e Traqueostomia',
    'Infecções das Vias Aéreas Superiores Pt. 2', 'Infecções das Vias Aéreas Superiores Pt. 3', 'Infecções das Vias Aéreas Superiores Pt. 1'
  ],
  'Oftalmologia': [
    'Traumatismos Oculares', 'Óptica e Distúrbios da Refração', 'Síndrome do Olho Vermelho', 'Neuroftalmologia', 'Glaucoma'
  ]
};
