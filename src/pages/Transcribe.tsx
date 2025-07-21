import React, { useState } from 'react';
import AudioUploader from '../components/audio/AudioUploader';

const Transcribe: React.FC = () => {
  const [transcript, setTranscript] = useState('');

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/transcribe/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setTranscript(data.transcription || 'No transcription found');
    } catch (error) {
      console.error('Transcription failed', error);
      setTranscript('An error occurred during transcription.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Transcribe Audio</h1>
      <AudioUploader onUpload={handleUpload} />
      {transcript && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Transcript:</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default Transcribe;
