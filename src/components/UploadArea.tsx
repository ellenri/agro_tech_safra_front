import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DragEvent, ChangeEvent } from 'react';
import { validateFile, parseCSV, validateCSVStructure } from '../utils/csvValidation';
import csvUploadService from '../services/csvUploadService';
import type { UploadFile } from '../types';

interface UploadAreaProps {
  onFileUpload?: (file: UploadFile) => void;
  onError?: (error: string) => void;
}

export default function UploadArea({ onFileUpload, onError }: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const processFile = async (file: File) => {
    setIsProcessing(true);
    
    try {
      // Validar arquivo
      const fileValidation = validateFile(file);
      if (!fileValidation.isValid) {
        onError?.(fileValidation.errors.join(' '));
        return;
      }

      // Ler conteúdo do arquivo para validação local
      const content = await file.text();
      
      // Parse e validação do CSV
      try {
        const csvData = parseCSV(content);
        const structureValidation = validateCSVStructure(csvData);
        
        if (!structureValidation.isValid) {
          onError?.(structureValidation.errors.join(' '));
          return;
        }

        // Criar objeto de upload inicial
        const uploadFile: UploadFile = {
          id: Date.now().toString(),
          name: file.name,
          size: file.size,
          status: 'processing',
          uploadDate: new Date(),
          recordCount: csvData.rows.length,
        };

        onFileUpload?.(uploadFile);

        // Fazer upload para a API
        try {
          const uploadResponse = await csvUploadService.uploadCSV(file);
          
          if (uploadResponse.success && uploadResponse.analiseIA) {
            const completedFile: UploadFile = {
              ...uploadFile,
              status: 'completed',
              recordCount: uploadResponse.recordCount,
            };
            onFileUpload?.(completedFile);
            
            // Navegar para a página de resultados com os dados da análise
            setTimeout(() => {
              navigate('/results', { 
                state: { analysisData: uploadResponse.analiseIA } 
              });
            }, 1500);
          } else {
            const errorFile: UploadFile = {
              ...uploadFile,
              status: 'error',
              errorMessage: uploadResponse.message,
            };
            onFileUpload?.(errorFile);
            onError?.(uploadResponse.message);
          }
        } catch (apiError) {
          const errorFile: UploadFile = {
            ...uploadFile,
            status: 'error',
            errorMessage: apiError instanceof Error ? apiError.message : 'Erro no upload',
          };
          onFileUpload?.(errorFile);
          onError?.(apiError instanceof Error ? apiError.message : 'Erro ao fazer upload para a API');
        }

      } catch (error) {
        onError?.(`Erro ao processar arquivo CSV: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }
    } catch (error) {
      onError?.(`Erro ao ler arquivo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
      // Reset input
      e.target.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
        isDragOver
          ? 'border-green-medium bg-green-50'
          : 'border-gray-300 hover:border-gray-400'
      } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileSelect}
        className="hidden"
      />

      {isProcessing ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Processando arquivo...
            </h3>
            <p className="text-gray-600">
              Validando estrutura e conteúdo do CSV
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-[#f59e0b] rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15V3m0 0l-4 4m4-4l4 4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Arraste seu arquivo CSV aqui
            </h3>
            <p className="text-gray-500 mb-4">
              ou clique para selecionar
            </p>
            <button
              onClick={openFileDialog}
              className="bg-[#3d6b4d] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#4a7c59] transition-colors inline-flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Selecionar Arquivo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}