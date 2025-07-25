import React, { useState } from 'react';
import ActionButton from '../components/ui/ActionButton';

const Dashboard: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setAudioFile(file);
      setUploadMessage(`Audio Uploaded: ${file.name}`);
      setTranscription(null);
      setSentiment(null);
    }
  };

  const handleTranscribe = async () => {
    if (!audioFile) {
      alert("Please upload an audio.");
      return;
    }

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/transcribe/", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Transcription failed");
      }

      setTranscription(result.transcription);
    } catch (error) {
      console.error("Error:", error);
      setTranscription("An error occurred during transcription.");
    }
  };

  const handleSentiment = async () => {
    if (!audioFile) {
      alert("Please upload an audio.");
      return;
    }

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const response = await fetch("http://localhost:8000/sentiment/", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Sentiment analysis failed");
      }

      setSentiment(result.sentiment);
    } catch (error) {
      console.error("Error:", error);
      setSentiment("An error occurred during sentiment analysis.");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* Header */}
      <div className="bg-[#a94064] rounded-xl py-8 px-4 text-center mb-10">
        <h1 className="text-white text-[60px] font-bold font-sans leading-tight">
          Audio Forensics and Tampering Detection
        </h1>
      </div>

      {/* File Upload */}
      <div className="mb-16 flex flex-col items-center space-y-4">
        <label className="text-[#a94064] text-2xl font-semibold">
          Choose Audio File
        </label>

        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="text-lg text-gray-800 border-2 border-[#a94064] px-6 py-4 rounded-xl w-96 cursor-pointer shadow-md hover:shadow-lg transition"
        />

        {uploadMessage && (
          <p className="text-md text-gray-700 mt-2 font-medium">{uploadMessage}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center mb-16">
        <ActionButton onClick={handleTranscribe} text="Transcribe" />
        <ActionButton onClick={handleSentiment} text="Sentiment Analysis" />
      </div>

      {/* Output Section */}
      {transcription && (
        <div className="mt-16 mx-auto w-full sm:w-[80%] bg-[#f9f1f3] text-[#a94064] border border-[#a94064] rounded-2xl px-8 py-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Transcription Result:</h2>
          <p className="text-lg leading-relaxed">{transcription}</p>
        </div>
      )}

      {sentiment && (
        <div className="mt-10 mx-auto w-full sm:w-[80%] bg-[#f2e6ea] text-[#a94064] border border-[#a94064] rounded-2xl px-8 py-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Sentiment Result:</h2>
          <p className="text-lg leading-relaxed">{sentiment}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
