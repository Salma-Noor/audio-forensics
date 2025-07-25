// src/components/audio/AudioUploader.tsx
import React, { useRef } from 'react';

interface AudioUploaderProps {
  onUpload: (file: File) => void;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      onUpload(file);
    } else {
      alert('Please upload a valid audio file.');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      onUpload(file);
    } else {
      alert('Please upload a valid audio file.');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex justify-center">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        htmlFor="audio-upload"
        className="w-full max-w-md p-6 border-2 border-rose-400 border-dashed rounded-lg cursor-pointer hover:bg-rose-50 transition duration-200 text-center"
      >
        <div className="text-rose-600 font-medium mb-2">Upload Audio</div>
        <div className="text-gray-500 text-sm">
          Click or drag an audio file here
        </div>
        <input
          id="audio-upload"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default AudioUploader;
