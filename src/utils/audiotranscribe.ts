// audiotranscribe.ts
export const transcribeAudio = async (audioFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", audioFile);

  const response = await fetch("http://127.0.0.1:8000/transcribe/", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Transcription failed");
  }

  return result.transcription;
};

// Add this handler function (optional, if you want logic separated)
export const handleTranscribe = async (
  audioFile: File,
  setTranscription: (value: string) => void
) => {
  try {
    const result = await transcribeAudio(audioFile);
    setTranscription(result);
  } catch (error) {
    console.error("Error:", error);
    setTranscription("An error occurred during transcription.");
  }
};
