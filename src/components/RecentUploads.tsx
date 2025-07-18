import type { UploadFile } from '../types';
import { formatFileSize, formatRecordCount } from '../utils/csvValidation';

interface RecentUploadsProps {
  uploads: UploadFile[];
  onViewAll?: () => void;
}

const getStatusColor = (status: UploadFile['status']) => {
  switch (status) {
    case 'completed':
      return 'text-green-600 bg-green-100';
    case 'processing':
      return 'text-yellow-600 bg-yellow-100';
    case 'error':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getStatusText = (status: UploadFile['status']) => {
  switch (status) {
    case 'completed':
      return 'Concluído';
    case 'processing':
      return 'Processando';
    case 'error':
      return 'Erro';
    default:
      return 'Pendente';
  }
};

const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    return `${diffInMinutes} min atrás`;
  } else if (diffInHours < 24) {
    return `Hoje às ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return 'Ontem às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays < 7) {
      return `${diffInDays} dias atrás`;
    } else {
      const diffInWeeks = Math.floor(diffInDays / 7);
      return `${diffInWeeks} semana${diffInWeeks > 1 ? 's' : ''} atrás`;
    }
  }
};

export default function RecentUploads({ uploads, onViewAll }: RecentUploadsProps) {
  return (
    <div className="bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900 flex items-center space-x-2">
          <span>🕒</span>
          <span>Uploads Recentes</span>
        </h3>
      </div>

      <div className="space-y-3">
        {uploads.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-gray-400 text-xl">📄</span>
            </div>
            <p>Nenhum upload realizado ainda</p>
          </div>
        ) : (
          uploads.slice(0, 4).map((upload) => (
            <div
              key={upload.id}
              className="border-l-4 border-gray-200 pl-3 py-2"
              style={{
                borderLeftColor: upload.status === 'completed' ? '#22c55e' : 
                                upload.status === 'processing' ? '#f59e0b' : 
                                upload.status === 'error' ? '#ef4444' : '#6b7280'
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {upload.name}
                </p>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                    upload.status
                  )}`}
                >
                  {getStatusText(upload.status)}
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-1">
                <div>
                  {formatFileSize(upload.size)}
                  {upload.recordCount && ` • ${formatRecordCount(upload.recordCount)}`}
                </div>
                <div>{getTimeAgo(upload.uploadDate)}</div>
              </div>
              {upload.status === 'error' && upload.errorMessage && (
                <p className="text-xs text-red-600 mt-1">{upload.errorMessage}</p>
              )}
            </div>
          ))
        )}
      </div>

      {uploads.length > 4 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={onViewAll}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Ver Todos os Uploads
          </button>
        </div>
      )}
    </div>
  );
}