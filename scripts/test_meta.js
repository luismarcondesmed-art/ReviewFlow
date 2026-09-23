
const fs = require('fs');

const FAFIPA_METADATA = {
    banca: "FAFIPA",
    cargo_referencia: "Médico (ESF/Clínico Geral) - baseado nos editais de Foz do Iguaçu, Ivaiporã, Mirador, Coronel Vivida, Cruz Machado, Paula Freitas, Siqueira Campos e Quitandinha",
    gerado_em: "2026-09-22",
    aviso_incidencia: "Estimativa qualitativa baseada no perfil documentado da banca (fidelidade ao conteúdo programático do edital, forte peso em interpretação de texto, cobrança literal de legislação e peso elevado para conhecimentos específicos da área de saúde).",
    legenda_semana: "0 = estudo contínuo/recorrente ao longo de todo o ciclo; 1-14 = semana de foco principal no cronograma sugerido",
    total_temas: 56
};

console.log('Metadata ready');
