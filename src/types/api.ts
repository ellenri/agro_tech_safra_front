export interface AnaliseIAResponse {
  sucesso: boolean;
  mensagemErro?: string;
  praga?: IdentificacaoPraga;
  nomeCultura?: string;
  nomePropriedade?: string;
  recomendacoes: RecomendacaoManejo[];
  risco?: AnaliseRisco;
  analiseCompleta: string;
  metricas?: MetricasProcessamento;
}

export interface IdentificacaoPraga {
  nomePopular: string;
  nomeCientifico: string;
  descricao: string;
  tipoDano: string;
  sintomasCaracteristicos: string[];
  confiancaIdentificacao: number;
}

export interface RecomendacaoManejo {
  tipo: string;
  descricao: string;
  urgencia: string;
  produtosSugeridos: string[];
  dosagem: string;
  melhorEpocaAplicacao: string;
}

export interface AnaliseRisco {
  nivelInfestacao: string;
  percentualRisco: number;
  impactoEconomico: string;
  fatoresRisco: string[];
  tempoReacao: string;
}

export interface MetricasProcessamento {
  totalRegistrosProcessados: number;
  tempoProcessamento: string;
  tokensUtilizados: number;
  modeloIA: string;
  processadoEm: string;
}

export interface RequestAnalise {
  arquivo: File;
  instrucoesEspecificas?: string;
  incluirRecomendacoes?: boolean;
  incluirAnaliseRisco?: boolean;
  maximoRegistros?: number;
}