import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import UploadArea from '../components/UploadArea';
import FileSpecifications from '../components/FileSpecifications';
import RecentUploads from '../components/RecentUploads';
import HelpSection from '../components/HelpSection';
import type { UploadFile, NavigationItem } from '../types';

export default function UploadCSV() {
  const [uploads, setUploads] = useState<UploadFile[]>([
    {
      id: '1',
      name: 'dados_safra_2024.csv',
      size: 1200000,
      status: 'completed',
      uploadDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      recordCount: 2847,
    },
    {
      id: '2',
      name: 'analise_pragas_jan.csv',
      size: 890000,
      status: 'processing',
      uploadDate: new Date(Date.now() - 45 * 60 * 1000), // 45 minutos atrás
      recordCount: 1523,
    },
    {
      id: '3',
      name: 'monitoramento_dez.csv',
      size: 2100000,
      status: 'completed',
      uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
      recordCount: 4156,
    },
    {
      id: '4',
      name: 'campo_norte_nov.csv',
      size: 1800000,
      status: 'completed',
      uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 semana atrás
      recordCount: 3024,
    },
    {
      id: '5',
      name: 'teste_formato.csv',
      size: 45000,
      status: 'error',
      uploadDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 semanas atrás
      errorMessage: 'Formato inválido',
    },
  ]);
  
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: UploadFile) => {
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
    // Criar um CSV template
    const template = 'Data,Localização,Cultura,Área,Produção\n2024-01-01,Fazenda Norte,Soja,100,2500\n2024-01-02,Fazenda Sul,Milho,80,1800';
    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'template_agro_tech_safra.csv';
    link.click();
  };

  const handleViewDocumentation = () => {
    window.open('https://docs.exemplo.com/csv-format', '_blank');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeItem="upload" onItemClick={handleNavigationClick} />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {/* Top Bar */}
          <div className="flex justify-end p-4 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-r from-green-medium to-accent-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
          </div>
          
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

            {/* File Specifications */}
            <FileSpecifications />

            {/* Help Section */}
            <div className="mt-8">
              <HelpSection
                onDownloadTemplate={handleDownloadTemplate}
                onViewDocumentation={handleViewDocumentation}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 bg-white border-l border-gray-200 overflow-auto">
          <RecentUploads uploads={uploads} onViewAll={handleViewAllUploads} />
        </div>
      </div>
    </div>
  );
}