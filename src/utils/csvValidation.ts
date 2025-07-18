import type { FileValidation, CSVData } from '../types';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const REQUIRED_COLUMNS = ['Id', 'DataAvaliacao', 'Propriedade', 'NomeCultura'];

export const validateFile = (file: File): FileValidation => {
  const errors: string[] = [];

  // Validar extensão
  if (!file.name.toLowerCase().endsWith('.csv')) {
    errors.push('Formato de arquivo inválido. Apenas arquivos CSV são aceitos.');
  }

  // Validar tamanho
  if (file.size > MAX_FILE_SIZE) {
    errors.push('Arquivo muito grande. Tamanho máximo permitido: 50MB.');
  }

  // Validar tipo MIME
  if (file.type && !file.type.includes('csv') && !file.type.includes('text')) {
    errors.push('Tipo de arquivo inválido.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const parseCSV = (content: string): CSVData => {
  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length === 0) {
    throw new Error('Arquivo CSV vazio');
  }

  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const rows = lines.slice(1).map(line => 
    line.split(',').map(cell => cell.trim().replace(/"/g, ''))
  );

  return { headers, rows };
};

export const validateCSVStructure = (csvData: CSVData): FileValidation => {
  const errors: string[] = [];

  // Validar colunas obrigatórias
  const missingColumns = REQUIRED_COLUMNS.filter(
    col => !csvData.headers.some(header => 
      header.toLowerCase().includes(col.toLowerCase())
    )
  );

  if (missingColumns.length > 0) {
    errors.push(`Colunas obrigatórias ausentes: ${missingColumns.join(', ')}`);
  }

  // Validar se há dados
  if (csvData.rows.length === 0) {
    errors.push('Arquivo não contém dados.');
  }

  // Validar consistência de colunas
  const headerCount = csvData.headers.length;
  const invalidRows = csvData.rows.filter(row => row.length !== headerCount);
  
  if (invalidRows.length > 0) {
    errors.push(`${invalidRows.length} linha(s) com número incorreto de colunas.`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const formatRecordCount = (count: number): string => {
  return `${count.toLocaleString('pt-BR')} registro${count !== 1 ? 's' : ''}`;
};