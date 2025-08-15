
export interface DiarizationResult {
  estimated_speakers: number;
  grouped_diarization: {
    speaker: string;
    segments: [number, number][];
  }[];
}

export const fetchDiarization = async (
  audioFile: File
): Promise<DiarizationResult> => {
  const formData = new FormData();
  formData.append("file", audioFile);

  try {
    const response = await fetch("http://127.0.0.1:8000/diarization/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Your backend already returns correct structure
    if (result.estimated_speakers !== undefined && Array.isArray(result.grouped_diarization)) {
      return result;
    } else {
      throw new Error("Invalid response structure from server");
    }
  } catch (error) {
    console.error("Diarization error:", error);
    throw new Error(error instanceof Error ? error.message : "Diarization failed");
  }
};
