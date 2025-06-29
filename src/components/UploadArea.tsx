import { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import { validateFile, parseCSV, validateCSVStructure } from '../utils/csvValidation';
import type { UploadFile } from '../types';

interface UploadAreaProps {
  onFileUpload?: (file: UploadFile) => void;
  onError?: (error: string) => void;
}

export default function UploadArea({ onFileUpload, onError }: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setIsProcessing(true);
    
    try {
      // Validar arquivo
      const fileValidation = validateFile(file);
      if (!fileValidation.isValid) {
        onError?.(fileValidation.errors.join(' '));
        return;
      }

      // Ler conteúdo do arquivo
      const content = await file.text();
      
      // Parse e validação do CSV
      try {
        const csvData = parseCSV(content);
        const structureValidation = validateCSVStructure(csvData);
        
        if (!structureValidation.isValid) {
          onError?.(structureValidation.errors.join(' '));
          return;
        }

        // Criar objeto de upload
        const uploadFile: UploadFile = {
          id: Date.now().toString(),
          name: file.name,
          size: file.size,
          status: 'processing',
          uploadDate: new Date(),
          recordCount: csvData.rows.length,
        };

        onFileUpload?.(uploadFile);

        // Simular processamento
        setTimeout(() => {
          const completedFile: UploadFile = {
            ...uploadFile,
            status: 'completed',
          };
          onFileUpload?.(completedFile);
        }, 2000);

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
          ? 'border-primary-500 bg-primary-50'
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
          <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Arraste seu arquivo CSV aqui
            </h3>
            <p className="text-gray-600 mb-4">
              ou clique para selecionar
            </p>
            <button
              onClick={openFileDialog}
              className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
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