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