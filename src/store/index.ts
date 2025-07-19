import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface AudioFile {
  id: string;
  name: string;
  size: number;
  duration: number;
  file: File;
  processedAt?: Date;
}

export interface AnalysisResult {
  id: string;
  audioFileId: string;
  type: 'noise-reduction' | 'spectral-analysis' | 'authentication';
  result: any;
  timestamp: Date;
}

interface AppState {
  currentPage: 'dashboard' | 'analysis' | 'reports' | 'settings';
  setCurrentPage: (page: AppState['currentPage']) => void;
  audioFiles: AudioFile[];
  selectedAudioFile: AudioFile | null;
  addAudioFile: (file: AudioFile) => void;
  removeAudioFile: (id: string) => void;
  setSelectedAudioFile: (file: AudioFile | null) => void;
  analysisResults: AnalysisResult[];
  isAnalyzing: boolean;
  addAnalysisResult: (result: AnalysisResult) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      currentPage: 'dashboard',
      setCurrentPage: (page) => set({ currentPage: page }),
      audioFiles: [],
      selectedAudioFile: null,
      addAudioFile: (file) => 
        set((state) => ({ 
          audioFiles: [...state.audioFiles, file] 
        })),
      removeAudioFile: (id) =>
        set((state) => ({
          audioFiles: state.audioFiles.filter(file => file.id !== id),
          selectedAudioFile: state.selectedAudioFile?.id === id ? null : state.selectedAudioFile
        })),
      setSelectedAudioFile: (file) => set({ selectedAudioFile: file }),
      analysisResults: [],
      isAnalyzing: false,
      addAnalysisResult: (result) =>
        set((state) => ({
          analysisResults: [...state.analysisResults, result]
        })),
      setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }))
    }),
    {
      name: 'audio-forensics-store'
    }
  )
);
