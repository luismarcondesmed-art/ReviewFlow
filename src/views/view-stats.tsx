import React, { useState } from 'react';
import { BarChart2, PieChart, TrendingUp, BookOpen, ChevronRight, Activity } from 'lucide-react';

const especialidadesData = [
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

const temasData: Record<string, { name: string, percentage: number }[]> = {
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

const assuntosData: Record<string, string[]> = {
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

export const StatsView = () => {
  const [selectedEspecialidade, setSelectedEspecialidade] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-20 lg:pb-0">
      <div className="bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-white/5 backdrop-blur-2xl rounded-[32px] p-6 lg:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <BarChart2 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Estatísticas ENAMED</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Guia Estatístico INEP 2011-2026</p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-5 mb-8">
          <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
            <BookOpen size={16} /> Como usar estes dados?
          </h3>
          <ul className="text-xs text-blue-700 dark:text-blue-400/80 space-y-2 list-disc list-inside">
            <li><strong>Por Especialidade:</strong> Direcione seu tempo de estudo proporcionalmente às disciplinas mais cobradas.</li>
            <li><strong>Por Tema:</strong> Foque seu estudo nos temas mais prevalentes de cada especialidade.</li>
            <li><strong>Por Assunto:</strong> Estude de maneira objetiva os assuntos mais cobrados pelo INEP.</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1: Especialidades */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <PieChart size={18} className="text-indigo-500" /> 1º Nível: Especialidades
            </h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {especialidadesData.map((esp, idx) => (
                <button
                  key={esp.name}
                  onClick={() => setSelectedEspecialidade(esp.name)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                    selectedEspecialidade === esp.name 
                      ? 'bg-indigo-50 dark:bg-indigo-500/20 border-indigo-200 dark:border-indigo-500/30' 
                      : 'bg-white dark:bg-zinc-800/50 border-slate-100 dark:border-white/5 hover:border-indigo-200 dark:hover:border-indigo-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      idx < 5 ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/30 dark:text-indigo-300' : 'bg-slate-100 text-slate-500 dark:bg-zinc-700 dark:text-slate-400'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${selectedEspecialidade === esp.name ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>
                        {esp.name}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {esp.count} questões
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${selectedEspecialidade === esp.name ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      {esp.percentage}%
                    </span>
                    <ChevronRight size={14} className={`transition-transform ${selectedEspecialidade === esp.name ? 'text-indigo-500 translate-x-1' : 'text-slate-300 dark:text-slate-600 group-hover:translate-x-1'}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Coluna 2 e 3: Detalhes da Especialidade */}
          <div className="lg:col-span-2">
            {selectedEspecialidade ? (
              <div className="space-y-8 animate-fade-in">
                {/* Temas */}
                <div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp size={18} className="text-emerald-500" /> 2º Nível: Temas em {selectedEspecialidade}
                  </h2>
                  <div className="bg-white dark:bg-zinc-800/50 border border-slate-100 dark:border-white/5 rounded-2xl p-5">
                    <div className="space-y-4">
                      {temasData[selectedEspecialidade]?.map((tema, idx) => (
                        <div key={tema.name}>
                          <div className="flex justify-between text-xs font-bold mb-1.5">
                            <span className="text-slate-700 dark:text-slate-300">{idx + 1}. {tema.name}</span>
                            <span className="text-emerald-600 dark:text-emerald-400">{tema.percentage}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500 rounded-full" 
                              style={{ width: `${tema.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      {!temasData[selectedEspecialidade] && (
                        <div className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
                          Dados de temas não disponíveis para esta especialidade.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Assuntos */}
                <div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-purple-500" /> 3º Nível: Top Assuntos em {selectedEspecialidade}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {assuntosData[selectedEspecialidade]?.map((assunto, idx) => (
                      <div key={idx} className="bg-white dark:bg-zinc-800/50 border border-slate-100 dark:border-white/5 rounded-xl p-3 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-tight">
                          {assunto}
                        </span>
                      </div>
                    ))}
                    {!assuntosData[selectedEspecialidade] && (
                      <div className="col-span-2 text-sm text-slate-500 dark:text-slate-400 text-center py-4 bg-white dark:bg-zinc-800/50 border border-slate-100 dark:border-white/5 rounded-xl">
                        Dados de assuntos não disponíveis para esta especialidade.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-slate-50 dark:bg-zinc-800/30 border border-dashed border-slate-200 dark:border-white/10 rounded-3xl">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-500 flex items-center justify-center mb-4">
                  <PieChart size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">Selecione uma Especialidade</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                  Clique em uma especialidade na lista ao lado para ver os temas e assuntos mais cobrados pelo INEP.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
