import React, { useRef, useState } from 'react';
import { Upload, FileAudio, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppStore } from '../../store';

interface AudioUploaderProps {
  onUpload?: (file: File) => void;
  className?: string;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ onUpload, className = '' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { addAudioFile } = useAppStore();

  const supportedFormats = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/flac', 'audio/aac', 'audio/ogg'];
  const maxFileSize = 100 * 1024 * 1024; // 100MB

  const handleFiles = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    // Validate file type
    if (!supportedFormats.includes(file.type) && !file.name.match(/\.(wav|mp3|flac|aac|ogg)$/i)) {
      alert('Please upload a valid audio file (WAV, MP3, FLAC, AAC, OGG)');
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      alert('File size must be less than 100MB');
      return;
    }

    setUploading(true);

    try {
      // Create audio element to get duration
      const audio = new Audio();
      const audioUrl = URL.createObjectURL(file);
      
      audio.onloadedmetadata = () => {
        const audioFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          duration: audio.duration,
          file: file,
          processedAt: new Date()
        };

        addAudioFile(audioFile);
        onUpload?.(file);
        URL.revokeObjectURL(audioUrl);
        setUploading(false);
        
        // Show success message
        alert(`Successfully uploaded: ${file.name}`);
      };

      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        setUploading(false);
        alert('Error loading audio file. Please try another file.');
      };

      audio.src = audioUrl;
    } catch (error) {
      setUploading(false);
      alert('Error uploading file. Please try again.');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".wav,.mp3,.flac,.aac,.ogg,audio/*"
        onChange={handleFileInput}
        className="hidden"
      />
      
      <div
        className={`
          relative w-full p-3 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200
          ${dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex items-center justify-center space-x-3">
          {uploading ? (
            <>
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-blue-700">Uploading...</p>
            </>
          ) : (
            <>
              <div className={`p-2 rounded-full ${dragActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <Upload className={`w-4 h-4 ${dragActive ? 'text-blue-600' : 'text-gray-600'}`} />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  {dragActive ? 'Drop your audio file here' : 'Upload Audio File'}
                </p>
                <p className="text-xs text-gray-500">
                  Drag & drop or click to browse
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioUploader;
