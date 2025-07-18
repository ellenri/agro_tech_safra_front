export interface UploadFile {
  id: string;
  name: string;
  size: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  uploadDate: Date;
  recordCount?: number;
  errorMessage?: string;
}

export interface FileValidation {
  isValid: boolean;
  errors: string[];
}

export interface CSVData {
  headers: string[];
  rows: string[][];
}

export type NavigationItem = {
  id: string;
  label: string;
  icon: string;
  path: string;
  active?: boolean;
};

export interface AmostragemPragasCsvModel {
  Id: number;
  AvaliacaoPragaId: number;
  DataAvaliacao: string;
  Propriedade: string;
  Talhao: string;
  Latitude?: number;
  Longitude?: number;
  ResponsavelColeta: string;
  CondicoesClimaticas: string;
  TemperaturaGraus: number;
  UmidadePercentual: number;
  ChuvaUltimas24h: boolean;
  NomeCultura: string;
  VariedadeHibrido: string;
  DataPlantio: string;
  EstadioFenologico: string;
  DensidadePlantio: number;
  SistemaManejo: string;
  UltimasAplicacoes: string;
  MetodoAmostragem: string;
  NumeroPontosAmostrados: number;
  DistanciaEntrePontos: number;
  AreaTotalAvaliada: number;
  PlantasPorPonto: number;
  PartesDaPlanta: string;
  DetalhePragaId: number;
  NomeCientifico: string;
  NomeComum: string;
  EstadioDesenvolvimento: string;
  NumeroIndividuosPorPlanta: number;
  PlantasAtacadasPorPonto: number;
  PercentualPlantasInfestadas: number;
  NivelDano: number;
  PercentualDano: number;
  DistribuicaoNaPlanta: string;
  TipoDano: string;
  SeveridadeDano: number;
  ImpactoProducaoEstimado: number;
  SintomasSecundarios: string;
}