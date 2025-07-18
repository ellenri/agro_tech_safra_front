import { useState, useEffect } from 'react';
import type { UploadFile } from '../types';

interface UploadTrackingCardProps {
  file: UploadFile;
  onClose?: () => void;
}

export default function UploadTrackingCard({ file, onClose }: UploadTrackingCardProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (file.status === 'processing') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    } else if (file.status === 'completed') {
      setProgress(100);
    }
  }, [file.status]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + ' KB';
    const mb = kb / 1024;
    return mb.toFixed(1) + ' MB';
  };

  const getStatusIcon = () => {
    switch (file.status) {
      case 'processing':
        return (
          <div className="w-5 h-5 border-2 border-[#f59e0b] border-t-transparent rounded-full animate-spin"></div>
        );
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusMessage = () => {
    switch (file.status) {
      case 'processing':
        return 'Processando arquivo...';
      case 'completed':
        return 'Upload concluído com sucesso!';
      case 'error':
        return 'Erro no upload';
      default:
        return 'Aguardando...';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            {getStatusIcon()}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900 truncate max-w-xs">
              {file.name}
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              {formatFileSize(file.size)}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-2">
        {file.status === 'processing' && (
          <div className="w-full">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{getStatusMessage()}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#f59e0b] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {file.status === 'completed' && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">
                  {getStatusMessage()}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  {file.recordCount?.toLocaleString('pt-BR')} registros processados
                </p>
              </div>
              <div className="bg-green-100 rounded-full px-3 py-1">
                <span className="text-sm font-semibold text-green-800">
                  {file.recordCount?.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        )}

        {file.status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm font-medium text-red-800">
              {getStatusMessage()}
            </p>
            {file.errorMessage && (
              <p className="text-xs text-red-600 mt-1">
                {file.errorMessage}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}