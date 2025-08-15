import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../components/ui/ActionButton';
import { handleTranscribe } from "../utils/audiotranscribe";
import { analyzeSentiment } from "../utils/audiosentiment";
import { detectGender } from "../utils/genderDetect";
import { fetchDiarization } from "../utils/diarization"; 

const Dashboard: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setAudioFile(file);
      setUploadMessage(`Audio Uploaded: ${file.name}`);
    }
  };

  const handleTranscribeClick = async () => {
    if (!audioFile) {
      alert("Please upload an audio.");
      return;
    }
    try {
      const result = await new Promise<string>((resolve) => {
        handleTranscribe(audioFile, (res) => resolve(res));
      });
      navigate('/transcribe-result', { state: { transcription: result } });
    } catch (error) {
      console.error("Error during transcription:", error);
      alert("Transcription failed.");
    }
  };

  const handleSentimentClick = async () => {
    if (!audioFile) {
      alert("Please upload an audio.");
      return;
    }
    try {
      const result = await analyzeSentiment(audioFile);
      navigate('/sentiment-result', { state: { sentiment: result } });
    } catch (error) {
      console.error("Error during sentiment analysis:", error);
      alert("Sentiment analysis failed.");
    }
  };

  const handleGenderClick = async () => {
    if (!audioFile) {
      alert("Please upload an audio.");
      return;
    }
    try {
      const result = await detectGender(audioFile);
      navigate('/gender-result', { state: { genderData: result } });
    } catch (error) {
      console.error("Error during gender detection:", error);
      alert("Gender detection failed.");
    }
  };

  


  const handleDiarizationClick = async () => {
  if (!audioFile) {
    alert("Please upload an audio.");
    return;
  }

  console.log("Starting diarization...");

  try {
    const formData = new FormData();
    formData.append("file", audioFile);

    const res = await fetch("http://127.0.0.1:8000/diarization/", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Backend error: ${res.status} ${res.statusText}`);
    }

    const result = await res.json();
    console.log("Diarization result from backend:", result);

    // Navigate with the same key your result page expects
    navigate("/diarization-result", { state: { diarization: result } });

  } catch (error) {
    console.error("Error during diarization:", error);
    alert(`Diarization failed: ${
      error instanceof Error ? error.message : "Unknown error"
    }`);
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
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 justify-items-center mb-16">
        <ActionButton onClick={handleTranscribeClick} text="Transcribe" />
        <ActionButton onClick={handleSentimentClick} text="Sentiment Analysis" />
        <ActionButton onClick={handleGenderClick} text="Gender Detection" />
        <ActionButton onClick={handleDiarizationClick} text="Diarization" />
      </div>
    </div>
  );
};

export default Dashboard;
