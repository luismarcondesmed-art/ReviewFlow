import { ScheduleItem } from '../types';

const generateId = (item: any) => {
    return `${item.bloco}-${item.aula}-${item.professor}`.replace(/\s+/g, '-').toLowerCase();
};

const RAW_DATA = [
    // Semana 1
    { bloco: "1", aula: "Hepatologia 01 - Cirrose Hepática e Complicações", professor: "Juliana Lacerda", disciplina: "Gastroenterologia", grandeArea: "Clínica", importancia: "Verde" },
    { bloco: "1", aula: "Abdome Agudo I", professor: "Phellipe Fabrini", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia", importancia: "Verde" },
    
    // Semana 2
    { bloco: "2", aula: "Hepatologia 02 - Hepatites e Tumores Hepáticos", professor: "Juliana e Vitor", disciplina: "Gastroenterologia", grandeArea: "Clínica", importancia: "Azul" },
    { bloco: "2", aula: "Abdome Agudo II", professor: "Phellipe Fabrini", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia", importancia: "Azul" },

    // Semana 3
    { bloco: "3", aula: "Pneumologia I - Pneumonia, SDRA e VM", professor: "Davi e Juliana", disciplina: "Pneumologia", grandeArea: "Clínica", importancia: "Verde" },
    { bloco: "3", aula: "SUS e MFC", professor: "Isabella Zanfra", disciplina: "Preventiva", grandeArea: "Preventiva", importancia: "Verde" },

    // Semana 4
    { bloco: "4", aula: "Pneumologia II - Asma e DPOC", professor: "Paulo, Diego, Juliana e Davi", disciplina: "Pneumologia", grandeArea: "Clínica", importancia: "Azul" },
    { bloco: "4", aula: "SUS e MFC - Políticas e Programas", professor: "Isabella", disciplina: "Preventiva", grandeArea: "Preventiva", importancia: "Azul" },

    // Semana 5
    { bloco: "5", aula: "Pneumologia III - Câncer, Derrame, TEP e TVP", professor: "Vitor, Juliana e Diego", disciplina: "Pneumologia", grandeArea: "Clínica", importancia: "Amarelo" },
    { bloco: "5", aula: "Bases da Ginecologia", professor: "Juliana", disciplina: "Ginecologia", grandeArea: "G.O.", importancia: "Verde" },

    // Semana 6
    { bloco: "6", aula: "Toxicologia", professor: "Raquel", disciplina: "Clínica Médica", grandeArea: "Clínica", importancia: "Azul" },
    { bloco: "6", aula: "Endocrinologia Ginecológica", professor: "Juliana", disciplina: "Ginecologia", grandeArea: "G.O.", importancia: "Verde" },

    // Semana 7
    { bloco: "7", aula: "Endocrinologia I - Tireoide I", professor: "Letícia", disciplina: "Endocrinologia", grandeArea: "Clínica", importancia: "Verde" },
    { bloco: "7", aula: "Neonatologia I", professor: "Equipe Pediatria", disciplina: "Neonatologia", grandeArea: "Pediatria", importancia: "Verde" },

    // Semana 8
    { bloco: "8", aula: "Endocrinologia II - Pâncreas e DM", professor: "Juliana e Letícia", disciplina: "Endocrinologia", grandeArea: "Clínica", importancia: "Azul" },
    { bloco: "8", aula: "Neonatologia II - Infecções Congênitas", professor: "Equipe Pediatria", disciplina: "Neonatologia", grandeArea: "Pediatria", importancia: "Azul" },

    // Semana 9
    { bloco: "9", aula: "Endocrinologia III - Adrenais e Paratireoides", professor: "Juliana e Letícia", disciplina: "Endocrinologia", grandeArea: "Clínica", importancia: "Amarelo" },
    { bloco: "9", aula: "Neonatologia III - Cardiopatias", professor: "Equipe Pediatria", disciplina: "Neonatologia", grandeArea: "Pediatria", importancia: "Amarelo" },

    // Semana 10
    { bloco: "10", aula: "Cardiologia I - ECG e Coronariopatias", professor: "Juliana e Letícia", disciplina: "Cardiologia", grandeArea: "Clínica", importancia: "Verde" },
    { bloco: "10", aula: "Bases da Obstetrícia", professor: "Ingrid e Bruna", disciplina: "Obstetrícia", grandeArea: "G.O.", importancia: "Verde" },

    // Semana 11
    { bloco: "11", aula: "Cardiologia II - HAS e Choques", professor: "Diego e Juliana", disciplina: "Cardiologia", grandeArea: "Clínica", importancia: "Azul" },
    { bloco: "11", aula: "Pré-Natal", professor: "Juliana Araújo", disciplina: "Obstetrícia", grandeArea: "G.O.", importancia: "Azul" },

    // Semana 12
    { bloco: "12", aula: "Cardiologia III - Arritmias e PCR", professor: "Juliana e Davi", disciplina: "Cardiologia", grandeArea: "Clínica", importancia: "Amarelo" },
    { bloco: "12", aula: "Assistência ao Parto I", professor: "Ingrid", disciplina: "Obstetrícia", grandeArea: "G.O.", importancia: "Amarelo" },

    // Semana 13
    { bloco: "13", aula: "Cardiologia IV - Insuficiência Cardíaca", professor: "Letícia", disciplina: "Cardiologia", grandeArea: "Clínica", importancia: "Vermelho" },
    { bloco: "13", aula: "Assistência ao Parto II e Puerpério", professor: "Juliana", disciplina: "Obstetrícia", grandeArea: "G.O.", importancia: "Vermelho" },

    // Semana 14
    { bloco: "14", aula: "Cardiologia V - Outros Temas", professor: "Letícia e Raquel", disciplina: "Cardiologia", grandeArea: "Clínica", importancia: "Vermelho" },
    { bloco: "14", aula: "Trauma I", professor: "Vitor Arienzo", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia", importancia: "Verde" },

    // Semana 15
    { bloco: "15", aula: "Epidemiologia - Conceitos e Prevenção", professor: "Isabella e Natalia", disciplina: "Preventiva", grandeArea: "Preventiva", importancia: "Verde" },
    { bloco: "15", aula: "Trauma II", professor: "Vitor Arienzo", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia", importancia: "Azul" },

    // Semana 16
    { bloco: "16", aula: "Neurologia I - Urgências", professor: "Raquel", disciplina: "Neurologia", grandeArea: "Clínica", importancia: "Verde" },
    { bloco: "16", aula: "Epidemiologia II - Medidas de Saúde Coletiva", professor: "Natalia", disciplina: "Preventiva", grandeArea: "Preventiva", importancia: "Azul" },

    // Semana 17
    { bloco: "17", aula: "Neurologia II - Ambulatorial 1", professor: "Raquel", disciplina: "Neurologia", grandeArea: "Clínica", importancia: "Azul" },
    { bloco: "17", aula: "Estatística I", professor: "Natalia", disciplina: "Preventiva", grandeArea: "Preventiva", importancia: "Amarelo" },

    // Semana 18
    { bloco: "18", aula: "Estatística II", professor: "Isabella", disciplina: "Preventiva", grandeArea: "Preventiva", importancia: "Amarelo" },
    { bloco: "18", aula: "Puericultura I - Nutrição Infantil", professor: "Equipe Pediatria", disciplina: "Puericultura", grandeArea: "Pediatria", importancia: "Verde" },

    // Semana 19
    { bloco: "19", aula: "Geriatria", professor: "Clínica Médica", disciplina: "Geriatria", grandeArea: "Clínica", importancia: "Verde" },
    { bloco: "19", aula: "Puericultura II - Imunização", professor: "Equipe Pediatria", disciplina: "Puericultura", grandeArea: "Pediatria", importancia: "Azul" },

    // Semana 20
    { bloco: "20", aula: "Hematologia I - Hemostasia e Transfusão", professor: "Diego", disciplina: "Hematologia", grandeArea: "Clínica", importancia: "Verde" },
    { bloco: "20", aula: "Puericultura III - Crescimento e Puberdade", professor: "Equipe Pediatria", disciplina: "Puericultura", grandeArea: "Pediatria", importancia: "Amarelo" },

    // Semana 21
    { bloco: "21", aula: "Hematologia II - Série Vermelha", professor: "Diego e Paulo", disciplina: "Hematologia", grandeArea: "Clínica", importancia: "Azul" },
    { bloco: "21", aula: "Planejamento Familiar", professor: "Ingrid", disciplina: "Ginecologia", grandeArea: "G.O.", importancia: "Azul" },

    // Semana 22
    { bloco: "22", aula: "Hematologia III - Série Branca", professor: "Diego", disciplina: "Hematologia", grandeArea: "Clínica", importancia: "Amarelo" },
    { bloco: "22", aula: "Ginecologia Geral I - Dor Pélvica e SUA", professor: "Ingrid e Juliana", disciplina: "Ginecologia", grandeArea: "G.O.", importancia: "Amarelo" },

    // Semana 23
    { bloco: "23", aula: "Gastroenterologia I - Esôfago", professor: "Juliana e Vitor", disciplina: "Gastroenterologia", grandeArea: "Clínica", importancia: "Verde" },
    { bloco: "23", aula: "Ginecologia Geral II - Infecções e Menopausa", professor: "Bruna, Ingrid e Juliana", disciplina: "Ginecologia", grandeArea: "G.O.", importancia: "Amarelo" },

    // Semana 24
    { bloco: "24", aula: "Gastroenterologia II - Estômago", professor: "Juliana, Diego e Vitor", disciplina: "Gastroenterologia", grandeArea: "Clínica", importancia: "Azul" },
    { bloco: "24", aula: "Perioperatório e Cirurgia Segura", professor: "Cirurgia Geral", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia", importancia: "Verde" },

    // Semana 25
    { bloco: "25", aula: "Gastroenterologia III - Pâncreas e Intestinos", professor: "Juliana, Diego e Vitor", disciplina: "Gastroenterologia", grandeArea: "Clínica", importancia: "Amarelo" },
    { bloco: "25", aula: "Doenças Clínicas na Gestação I", professor: "Ingrid e Bruna", disciplina: "Obstetrícia", grandeArea: "G.O.", importancia: "Verde" },

    // Semana 26
    { bloco: "26", aula: "Dermatologia", professor: "Clara, Raquel e Vitor", disciplina: "Dermatologia", grandeArea: "Clínica", importancia: "Verde" },
    { bloco: "26", aula: "Doenças Clínicas na Gestação II", professor: "Juliana, Ingrid e Bruna", disciplina: "Obstetrícia", grandeArea: "G.O.", importancia: "Azul" },

    // Semana 27
    { bloco: "27", aula: "Reumatologia I - Artrites", professor: "Raquel", disciplina: "Reumatologia", grandeArea: "Clínica", importancia: "Verde" },
    { bloco: "27", aula: "Saúde do Trabalhador e Vigilância", professor: "Natalia", disciplina: "Preventiva", grandeArea: "Preventiva", importancia: "Amarelo" },

    // Semana 28
    { bloco: "28", aula: "Reumatologia II - Colagenoses", professor: "Raquel", disciplina: "Reumatologia", grandeArea: "Clínica", importancia: "Azul" },
    { bloco: "28", aula: "Urgência e Emergência Pediátrica", professor: "Equipe Pediatria", disciplina: "Emergências", grandeArea: "Pediatria", importancia: "Verde" },

    // Semana 29
    { bloco: "29", aula: "Reumatologia III - Vasculites", professor: "Diego e Paulo", disciplina: "Reumatologia", grandeArea: "Clínica", importancia: "Amarelo" },
    { bloco: "29", aula: "Mastologia, Urogineco e Osteoporose", professor: "Ingrid", disciplina: "Ginecologia", grandeArea: "G.O.", importancia: "Azul" },

    // Semana 30
    { bloco: "30", aula: "Oncologia Ginecológica", professor: "Bruna", disciplina: "Ginecologia", grandeArea: "G.O.", importancia: "Amarelo" },
    { bloco: "30", aula: "Coloproctologia e Hérnias", professor: "Ingrid", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia", importancia: "Verde" },

    // Semana 31
    { bloco: "31", aula: "Nefrologia I - Doenças Renais", professor: "Letícia e Paulo", disciplina: "Nefrologia", grandeArea: "Clínica", importancia: "Verde" },
    { bloco: "31", aula: "Ética Médica", professor: "Isabella e Natalia", disciplina: "Preventiva", grandeArea: "Preventiva", importancia: "Vermelho" },

    // Semana 32
    { bloco: "32", aula: "Nefrologia II - Distúrbios da Água e Sódio", professor: "Juliana e Letícia", disciplina: "Nefrologia", grandeArea: "Clínica", importancia: "Azul" },
    { bloco: "32", aula: "Doenças na Infância I - Pneumopediatria", professor: "Equipe Pediatria", disciplina: "Pediatria", grandeArea: "Pediatria", importancia: "Verde" },

    // Semana 33
    { bloco: "33", aula: "Nefrologia III - Distúrbios K e Gasometria", professor: "Tiarles", disciplina: "Nefrologia", grandeArea: "Clínica", importancia: "Amarelo" },
    { bloco: "33", aula: "Doenças na Infância II - Outras Infecções", professor: "Equipe Pediatria", disciplina: "Pediatria", grandeArea: "Pediatria", importancia: "Azul" },

    // Semana 34
    { bloco: "34", aula: "Infectologia I - Síndromes Febris", professor: "Raquel", disciplina: "Infectologia", grandeArea: "Clínica", importancia: "Verde" },
    { bloco: "34", aula: "Doenças Clínicas na Gestação IV", professor: "Juliana e Bruna", disciplina: "Obstetrícia", grandeArea: "G.O.", importancia: "Azul" },

    // Semana 35
    { bloco: "35", aula: "Infectologia II - HIV e TB", professor: "Clara, Raquel e Vitor", disciplina: "Infectologia", grandeArea: "Clínica", importancia: "Azul" },
    { bloco: "35", aula: "Doenças da Infância III - Gastropediatria", professor: "Equipe Pediatria", disciplina: "Pediatria", grandeArea: "Pediatria", importancia: "Amarelo" },

    // Semana 36
    { bloco: "36", aula: "Infectologia III - Bactérias e Sepse", professor: "Raquel e Juliana", disciplina: "Infectologia", grandeArea: "Clínica", importancia: "Amarelo" },
    { bloco: "36", aula: "Doenças da Infância IV - Nefro e Onco", professor: "Equipe Pediatria", disciplina: "Pediatria", grandeArea: "Pediatria", importancia: "Amarelo" },

    // Semana 37
    { bloco: "37", aula: "Infectologia IV - Outras Infecções", professor: "Raquel", disciplina: "Infectologia", grandeArea: "Clínica", importancia: "Vermelho" },
    { bloco: "37", aula: "Especialidades Cirúrgicas - Pediátrica e Vascular", professor: "Cirurgia", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia", importancia: "Amarelo" },

    // Semana 38
    { bloco: "38", aula: "Doenças Clínicas na Gestação V", professor: "Juliana e Ingrid", disciplina: "Obstetrícia", grandeArea: "G.O.", importancia: "Vermelho" },
    { bloco: "38", aula: "Urologia", professor: "Cirurgia", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia", importancia: "Amarelo" },

    // Semana 39
    { bloco: "39", aula: "Psiquiatria", professor: "Raquel", disciplina: "Psiquiatria", grandeArea: "Clínica", importancia: "Verde" },
    { bloco: "39", aula: "CCP e Princípios de Anestesiologia", professor: "Cirurgia", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia", importancia: "Amarelo" },

    // Semana 40
    { bloco: "40", aula: "Oftalmologia e Ortopedia", professor: "Especialidades", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia", importancia: "Amarelo" },
    { bloco: "40", aula: "Doenças da Infância V", professor: "Equipe Pediatria", disciplina: "Pediatria", grandeArea: "Pediatria", importancia: "Azul" },

];

export const MEDREVIEW_SCHEDULE: ScheduleItem[] = RAW_DATA.map(item => ({
    id: generateId(item),
    bloco: item.bloco,
    grandeArea: item.grandeArea,
    disciplina: item.disciplina,
    aula: item.aula,
    professor: item.professor,
    importancia: item.importancia as ScheduleItem["importancia"]
}));
