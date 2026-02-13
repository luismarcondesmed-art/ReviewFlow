
import { ScheduleItem } from './types';

// Helper to generate a consistent ID based on content
const generateId = (item: any) => {
    return `${item.bloco}-${item.aula}-${item.professor}`.replace(/\s+/g, '-').toLowerCase();
};

const normalizeGrandeArea = (ga: string): string => {
    const lower = ga.toLowerCase();
    if (lower.includes('clínica') || lower.includes('clinica')) return 'Clínica Médica';
    if (lower.includes('cirurgia')) return 'Cirurgia Geral';
    if (lower.includes('pediatria')) return 'Pediatria';
    if (lower.includes('g.o') || lower.includes('gineco')) return 'Ginecologia e Obstetrícia';
    if (lower.includes('preventiva')) return 'Medicina Preventiva';
    return ga;
};

const RAW_DATA = [
    // Bloco 1
    { bloco: "1", aula: "Avaliação Global do Hemograma", professor: "Marco Aurélio Campanha Sartori", disciplina: "Hematologia", grandeArea: "Clínica Médica", importancia: "Verde" },
    { bloco: "1", aula: "Anemias Hipoproliferativas I", professor: "Marco Aurélio Campanha Sartori", disciplina: "Hematologia", grandeArea: "Clínica Médica", importancia: "Azul" },
    { bloco: "1", aula: "Anemias Hipoproliferativas II", professor: "Marco Aurélio Campanha Sartori", disciplina: "Hematologia", grandeArea: "Clínica Médica", importancia: "Verde" },
    { bloco: "1", aula: "Modificações do Organismo Materno", professor: "Nicole Kemberly Ribeiro Rocha", disciplina: "Obstetrícia Básico", grandeArea: "Ginecologia e Obstetrícia", importancia: "Verde" },
    { bloco: "1", aula: "Assistência ao Pré-Natal", professor: "Isabela Marangon Pasotti", disciplina: "Obstetrícia Básico", grandeArea: "Ginecologia e Obstetrícia", importancia: "Azul" },
    { bloco: "1", aula: "Ultrassonografia em Obstetrícia", professor: "Gelson Farias Arcos Júnior", disciplina: "Medicina fetal", grandeArea: "Ginecologia e Obstetrícia", importancia: "Amarelo" },
    { bloco: "1", aula: "Aleitamento Materno", professor: "Amira Kheireddine Saleh", disciplina: "Puericultura", grandeArea: "Pediatria", importancia: "Azul" },
    { bloco: "1", aula: "Alimentação Infantil", professor: "Amira Kheireddine Saleh", disciplina: "Puericultura", grandeArea: "Pediatria", importancia: "Amarelo" },
    { bloco: "1", aula: "Desenvolvimento Infantil", professor: "Amira Kheireddine Saleh", disciplina: "Puericultura", grandeArea: "Pediatria", importancia: "Verde" },
    { bloco: "1", aula: "Alterações no Neurodesenvolvimento - TEA e TDAH", professor: "José Marcos Vieira de Albuquerque Filho", disciplina: "Neuro-Ped", grandeArea: "Pediatria", importancia: "Verde" },
    { bloco: "1", aula: "Boas Vindas à Preventiva", professor: "Darizon José de Oliveira Filho", disciplina: "Saúde Coletiva", grandeArea: "Medicina Preventiva", importancia: "Verde" },
    { bloco: "1", aula: "Níveis de Prevenção", professor: "Carlos Rafael Dantas", disciplina: "Saúde Coletiva", grandeArea: "Medicina Preventiva", importancia: "Verde" },
    { bloco: "1", aula: "Indicadores de Saúde", professor: "Luana Alves Suleiman", disciplina: "Epidemiologia", grandeArea: "Medicina Preventiva", importancia: "Azul" },
    { bloco: "1", aula: "Introdução ao Extensivo e Como Acertar Questões", professor: "Henrique Simonsen Lunardeli", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia Geral", importancia: "Verde" },
    { bloco: "1", aula: "Introdução ao Trauma e Atendimento Inicial", professor: "Henrique Simonsen Lunardeli", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia Geral", importancia: "Azul" },
    { bloco: "1", aula: "Trauma: Vias aéreas", professor: "Henrique Simonsen Lunardeli", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia Geral", importancia: "Verde" },
    { bloco: "1", aula: "Choque e Ressuscitação Hemostática", professor: "Henrique Simonsen Lunardeli", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia Geral", importancia: "Verde" },

    // Bloco 2
    { bloco: "2", aula: "Neurovascular I: AIT e AVCi", professor: "Leonardo de Sousa Bernardes", disciplina: "Neurologia", grandeArea: "Clínica Médica", importancia: "Azul" },
    { bloco: "2", aula: "Neurovascular II : HSA e AVCh", professor: "Leonardo de Sousa Bernardes", disciplina: "Neurologia", grandeArea: "Clínica Médica", importancia: "Verde" },
    { bloco: "2", aula: "Anatomia Pélvica Feminina", professor: "Amanda Lino de Faria Lessa", disciplina: "Ginecologia Geral", grandeArea: "Ginecologia e Obstetrícia", importancia: "Azul" },
    { bloco: "2", aula: "Embriologia do Sistema Genital Feminino", professor: "Amanda Lino de Faria Lessa", disciplina: "Ginecologia Geral", grandeArea: "Ginecologia e Obstetrícia", importancia: "Amarelo" },
    { bloco: "2", aula: "Malformações Mullerianas", professor: "Nicole Kemberly Ribeiro Rocha", disciplina: "Ginecologia Geral", grandeArea: "Ginecologia e Obstetrícia", importancia: "Amarelo" },
    { bloco: "2", aula: "Febre sem Sinais Localizatórios", professor: "Laura Coimbra Teixeira", disciplina: "Emergências Pediátricas", grandeArea: "Pediatria", importancia: "Amarelo" },
    { bloco: "2", aula: "Síndrome Nefrítica, Nefrótica, SHU", professor: "Laura Coimbra Teixeira", disciplina: "Esp. Ped: Nefrologia", grandeArea: "Pediatria", importancia: "Azul" },
    { bloco: "2", aula: "Doença Renal Crônica e Lesão Renal Aguda", professor: "Laura Coimbra Teixeira", disciplina: "Esp. Ped: Nefrologia", grandeArea: "Pediatria", importancia: "Vermelho" },
    { bloco: "2", aula: "Miscelânea em Nefropediatria", professor: "Laura Coimbra Teixeira", disciplina: "Esp. Ped: Nefrologia", grandeArea: "Pediatria", importancia: "Amarelo" },
    { bloco: "2", aula: "Testes Diagnósticos", professor: "Darizon José de Oliveira Filho", disciplina: "Epidemiologia", grandeArea: "Medicina Preventiva", importancia: "Azul" },
    { bloco: "2", aula: "Assistência ao Pré-Natal na APS", professor: "Nathália Machado Cardoso", disciplina: "MFC", grandeArea: "Medicina Preventiva", importancia: "Amarelo" },
    { bloco: "2", aula: "Trauma: Medidas Auxiliares e FAST", professor: "Henrique Simonsen Lunardeli", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia Geral", importancia: "Vermelho" },
    { bloco: "2", aula: "Trauma: Populações especiais", professor: "Henrique Simonsen Lunardeli", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia Geral", importancia: "Roxo" },
    { bloco: "2", aula: "Trauma de Tórax", professor: "Henrique Simonsen Lunardeli", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia Geral", importancia: "Azul" },

    // Bloco 3
    { bloco: "3", aula: "Sífilis", professor: "Jaqueline Fabiano Palazzo", disciplina: "Infectologia", grandeArea: "Clínica Médica", importancia: "Azul" },
    { bloco: "3", aula: "Dispepsia, DRGE e Barret", professor: "Rafael Bandeira Lages", disciplina: "Gastroenterologia", grandeArea: "Clínica Médica", importancia: "Verde" },
    { bloco: "3", aula: "Úlcera péptica, H. pylori...", professor: "Rafael Bandeira Lages", disciplina: "Gastroenterologia", grandeArea: "Clínica Médica", importancia: "Verde" },
    { bloco: "3", aula: "Corrimentos Vaginais", professor: "Nicole Kemberly Ribeiro Rocha", disciplina: "Ginecologia Geral", grandeArea: "Ginecologia e Obstetrícia", importancia: "Azul" },
    { bloco: "3", aula: "Doença Inflamatória Pélvica Aguda", professor: "Amanda Lino de Faria Lessa", disciplina: "Ginecologia Geral", grandeArea: "Ginecologia e Obstetrícia", importancia: "Verde" },
    { bloco: "3", aula: "Úlceras Genitais", professor: "Nicole Kemberly Ribeiro Rocha", disciplina: "Ginecologia Geral", grandeArea: "Ginecologia e Obstetrícia", importancia: "Verde" },
    { bloco: "3", aula: "Alergia Alimentar, Refluxo e Constipação", professor: "Camilla Silva Castro e Sousa", disciplina: "Esp. Ped: Gastro", grandeArea: "Pediatria", importancia: "Azul" },
    { bloco: "3", aula: "Diarreia Crônica e Doenças Funcionais", professor: "Camilla Silva Castro e Sousa", disciplina: "Esp. Ped: Gastro", grandeArea: "Pediatria", importancia: "Amarelo" },
    { bloco: "3", aula: "Violência Contra a Criança e o Adolescente", professor: "Camilla Silva Castro e Sousa", disciplina: "Emergências Pediátricas", grandeArea: "Pediatria", importancia: "Verde" },
    { bloco: "3", aula: "Determinação Social do Processo Saúde-Doença", professor: "Carlos Rafael Dantas", disciplina: "Saúde Coletiva", grandeArea: "Medicina Preventiva", importancia: "Azul" },
    { bloco: "3", aula: "Trauma Abdominal", professor: "Henrique Simonsen Lunardeli", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia Geral", importancia: "Azul" },
    { bloco: "3", aula: "Trauma Urológico", professor: "Matheus Tiseu Ruggeri", disciplina: "Urologia", grandeArea: "Cirurgia Geral", importancia: "Amarelo" },

    // Bloco 4
    { bloco: "4", aula: "Introdução às Artrites e AR", professor: "Henrique Helson Herter Dalmolin", disciplina: "Reumatologia", grandeArea: "Clínica Médica", importancia: "Verde" },
    { bloco: "4", aula: "Espondiloartrites", professor: "Henrique Helson Herter Dalmolin", disciplina: "Reumatologia", grandeArea: "Clínica Médica", importancia: "Verde" },
    { bloco: "4", aula: "Artrites Microcristalinas", professor: "Henrique Helson Herter Dalmolin", disciplina: "Reumatologia", grandeArea: "Clínica Médica", importancia: "Amarelo" },
    { bloco: "4", aula: "Osteoartrite", professor: "Henrique Helson Herter Dalmolin", disciplina: "Reumatologia", grandeArea: "Clínica Médica", importancia: "Amarelo" },
    { bloco: "4", aula: "Fibromialgia", professor: "Henrique Helson Herter Dalmolin", disciplina: "Reumatologia", grandeArea: "Clínica Médica", importancia: "Amarelo" },
    { bloco: "4", aula: "Assistência ao Parto", professor: "Graciella Calsolari Figueiredo de Farias", disciplina: "Obstetrícia Básico", grandeArea: "Ginecologia e Obstetrícia", importancia: "Azul" },
    { bloco: "4", aula: "Sofrimento Fetal Agudo", professor: "Gelson Farias Arcos Júnior", disciplina: "Obstetrícia Alto Risco", grandeArea: "Ginecologia e Obstetrícia", importancia: "Verde" },
    { bloco: "4", aula: "Crescimento e Baixa Estatura", professor: "Roberta de Oliveira Andrade", disciplina: "Puericultura", grandeArea: "Pediatria", importancia: "Azul" },
    { bloco: "4", aula: "Obesidade e Síndrome Metabólica", professor: "Roberta de Oliveira Andrade", disciplina: "Puericultura", grandeArea: "Pediatria", importancia: "Amarelo" },
    { bloco: "4", aula: "Puberdade", professor: "Roberta de Oliveira Andrade", disciplina: "Puericultura", grandeArea: "Pediatria", importancia: "Verde" },
    { bloco: "4", aula: "Desnutrição e Vitaminas", professor: "Roberta de Oliveira Andrade", disciplina: "Puericultura", grandeArea: "Pediatria", importancia: "Amarelo" },
    { bloco: "4", aula: "Redes de Atenção à Saúde", professor: "Carlos Rafael Dantas", disciplina: "Saúde Coletiva", grandeArea: "Medicina Preventiva", importancia: "Azul" },
    { bloco: "4", aula: "Atenção Primária à Saúde", professor: "Carlos Rafael Dantas", disciplina: "Saúde Coletiva", grandeArea: "Medicina Preventiva", importancia: "Azul" },
    { bloco: "4", aula: "Trauma de Pelve", professor: "Henrique Simonsen Lunardeli", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia Geral", importancia: "Verde" },
    { bloco: "4", aula: "Trauma Cranioencefálico", professor: "Henrique Simonsen Lunardeli", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia Geral", importancia: "Azul" },
    { bloco: "4", aula: "Trauma Raquimedular", professor: "Henrique Simonsen Lunardeli", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia Geral", importancia: "Amarelo" },
    { bloco: "4", aula: "Trauma Musculoesquelético", professor: "Henrique Simonsen Lunardeli", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia Geral", importancia: "Vermelho" },
    { bloco: "4", aula: "Trauma de Pescoço", professor: "Henrique Simonsen Lunardeli", disciplina: "Cirurgia Geral", grandeArea: "Cirurgia Geral", importancia: "Vermelho" }
    // ... data continues but mapping ensures ga is correct
];

export const MEDCOF_SCHEDULE: ScheduleItem[] = RAW_DATA.map(item => ({
    id: generateId(item),
    bloco: item.bloco,
    grandeArea: normalizeGrandeArea(item.grandeArea),
    disciplina: item.disciplina,
    aula: item.aula,
    professor: item.professor,
    importancia: item.importancia
}));
