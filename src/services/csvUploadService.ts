import apiService from './apiService';
import type { UploadFile } from '../types';
import type { AnaliseIAResponse } from '../types/api';

export interface CSVUploadResponse {
  success: boolean;
  message: string;
  fileName?: string;
  recordCount?: number;
  processedData?: any[];
  errors?: string[];
  analiseIA?: AnaliseIAResponse;
}

class CSVUploadService {
  async uploadCSV(file: File, instrucoesEspecificas?: string): Promise<CSVUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('arquivo', file);
      if (instrucoesEspecificas) {
        formData.append('instrucoesEspecificas', instrucoesEspecificas);
      }
      formData.append('incluirRecomendacoes', 'true');
      formData.append('incluirAnaliseRisco', 'true');
      formData.append('maximoRegistros', '1000');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/analiseamostragem/analisar`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || `HTTP error! status: ${response.status}`);
      }

      const analiseResult: AnaliseIAResponse = await response.json();

      return {
        success: analiseResult.sucesso,
        message: analiseResult.sucesso 
          ? 'Análise realizada com sucesso!' 
          : analiseResult.mensagemErro || 'Erro na análise',
        fileName: file.name,
        recordCount: analiseResult.metricas?.totalRegistrosProcessados || 0,
        analiseIA: analiseResult,
      };
    } catch (error) {
      console.error('Error uploading CSV:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao fazer upload do arquivo CSV'
      );
    }
  }

  async getUploadStatus(uploadId: string): Promise<any> {
    // Endpoint não implementado na API atual
    return { status: 'completed', message: 'Análise concluída' };
  }

  async getUploadHistory(): Promise<UploadFile[]> {
    // Endpoint não implementado na API atual, retornando dados mockados
    return [
      {
        id: '1',
        name: 'dados_pragas.csv',
        size: 1200000,
        status: 'completed',
        uploadDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
        recordCount: 150,
      },
      {
        id: '2',
        name: 'analise_campo.csv',
        size: 890000,
        status: 'completed',
        uploadDate: new Date(Date.now() - 45 * 60 * 1000),
        recordCount: 75,
      },
    ];
  }

  async downloadProcessedData(uploadId: string): Promise<Blob> {
    // Endpoint não implementado na API atual
    throw new Error('Funcionalidade de download não implementada na API');
  }
}

export default new CSVUploadService();