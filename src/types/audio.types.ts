export interface AudioFile {
  id: string;
  name: string;
  size: number;
  duration: number;
  sampleRate: number;
  bitRate: number;
  channels: number;
  format: 'wav' | 'mp3' | 'flac' | 'aac' | 'ogg' | 'other';
  file: File;
  uploadedAt: Date;
  processedAt?: Date;
  metadata?: AudioMetadata;
}

export interface AudioMetadata {
  artist?: string;
  title?: string;
  album?: string;
  year?: number;
  genre?: string;
  comment?: string;
  recordingDevice?: string;
  recordingLocation?: string;
}

export interface AnalysisResult {
  id: string;
  audioFileId: string;
  type: AnalysisType;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result: any;
  confidence: number;
  timestamp: Date;
  processingTime: number;
  parameters?: AnalysisParameters;
}

export type AnalysisType = 
  | 'noise-reduction'
  | 'spectral-analysis'
  | 'authentication'
  | 'voice-identification'
  | 'enhancement'
  | 'tampering-detection';

export interface AnalysisParameters {
  [key: string]: any;
}
