import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import UploadArea from '../components/UploadArea';
import FileSpecifications from '../components/FileSpecifications';
import RecentUploads from '../components/RecentUploads';
import UploadTrackingCard from '../components/UploadTrackingCard';
import csvUploadService from '../services/csvUploadService';
import type { UploadFile, NavigationItem } from '../types';

export default function UploadCSV() {
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [currentUpload, setCurrentUpload] = useState<UploadFile | null>(null);

  useEffect(() => {
    loadUploadHistory();
  }, []);

  const loadUploadHistory = async () => {
    try {
      const history = await csvUploadService.getUploadHistory();
      setUploads(history);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      setUploads([
        {
          id: '1',
          name: 'dados_safra_2024.csv',
          size: 1200000,
          status: 'completed',
          uploadDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
          recordCount: 2847,
        },
        {
          id: '2',
          name: 'analise_pragas_jan.csv',
          size: 890000,
          status: 'processing',
          uploadDate: new Date(Date.now() - 45 * 60 * 1000),
          recordCount: 1523,
        },
      ]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleFileUpload = (file: UploadFile) => {
    // Atualizar o card de acompanhamento
    setCurrentUpload(file);
    
    // Se o upload foi concluído ou teve erro, adicionar ao histórico após 3 segundos
    if (file.status === 'completed' || file.status === 'error') {
      setTimeout(() => {
        setCurrentUpload(null);
      }, 3000);
    }
    
    setUploads(prev => {
      const existingIndex = prev.findIndex(upload => upload.id === file.id);
      if (existingIndex >= 0) {
        // Atualizar upload existente
        const updated = [...prev];
        updated[existingIndex] = file;
        return updated;
      } else {
        // Adicionar novo upload no início
        return [file, ...prev];
      }
    });
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleNavigationClick = (item: NavigationItem) => {
    console.log('Navigate to:', item.path);
  };

  const handleViewAllUploads = () => {
    console.log('View all uploads');
  };

  const handleDownloadTemplate = () => {
    // Criar um CSV template baseado no modelo da API
    const headers = [
      'Id', 'AvaliacaoPragaId', 'DataAvaliacao', 'Propriedade', 'Talhao', 'Latitude', 'Longitude',
      'ResponsavelColeta', 'CondicoesClimaticas', 'TemperaturaGraus', 'UmidadePercentual', 'ChuvaUltimas24h',
      'NomeCultura', 'VariedadeHibrido', 'DataPlantio', 'EstadioFenologico', 'DensidadePlantio',
      'SistemaManejo', 'UltimasAplicacoes', 'MetodoAmostragem', 'NumeroPontosAmostrados',
      'DistanciaEntrePontos', 'AreaTotalAvaliada', 'PlantasPorPonto', 'PartesDaPlanta',
      'DetalhePragaId', 'NomeCientifico', 'NomeComum', 'EstadioDesenvolvimento',
      'NumeroIndividuosPorPlanta', 'PlantasAtacadasPorPonto', 'PercentualPlantasInfestadas',
      'NivelDano', 'PercentualDano', 'DistribuicaoNaPlanta', 'TipoDano', 'SeveridadeDano',
      'ImpactoProducaoEstimado', 'SintomasSecundarios'
    ];
    
    const exampleRow = [
      '1', '1', '2024-01-15', 'Fazenda Norte', 'Talhão A1', '-23.5505', '-46.6333',
      'João Silva', 'Nublado', '28.5', '65.2', 'false',
      'Soja', 'Híbrido X1', '2023-10-15', 'R4', '300000',
      'Plantio Direto', 'Herbicida 2023-12-10', 'Zigzag', '20',
      '50', '5.5', '5', 'Folhas',
      '1', 'Anticarsia gemmatalis', 'Lagarta da Soja', 'Larva',
      '3', '2', '15.5',
      '2', '8.2', 'Folhas superiores', 'Desfolha', '2.1',
      '5.8', 'Amarelecimento'
    ];
    
    const template = [headers.join(','), exampleRow.join(',')].join('\n');
    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'template_amostragem_pragas.csv';
    link.click();
  };

  const handleViewDocumentation = () => {
    window.open('https://docs.exemplo.com/csv-format', '_blank');
  };

  return (
    <div className="h-screen bg-[#f8fafc] flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeItem="upload" onItemClick={handleNavigationClick} />
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Upload de Dados CSV
              </h1>
              <p className="text-gray-600 text-sm">
                Envie seus arquivos CSV para análise de pragas e obtenha recomendações personalizadas
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-red-600">⚠️</span>
                  <p className="text-red-700 font-medium">Erro no upload:</p>
                </div>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            )}

            {/* Upload Area */}
            <div className="mb-8">
              <UploadArea onFileUpload={handleFileUpload} onError={handleError} />
            </div>

            {/* Upload Tracking Card */}
            {currentUpload && (
              <div className="mb-6">
                <UploadTrackingCard 
                  file={currentUpload} 
                  onClose={() => setCurrentUpload(null)}
                />
              </div>
            )}

            {/* File Specifications */}
            <FileSpecifications />
           
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-72 bg-white border-l border-gray-200 overflow-auto">
            {isLoadingHistory ? (
              <div className="p-4 text-center text-gray-500">
                Carregando histórico...
              </div>
            ) : (
              <RecentUploads uploads={uploads} onViewAll={handleViewAllUploads} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}