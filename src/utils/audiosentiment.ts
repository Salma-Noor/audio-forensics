export const analyzeSentiment = async (audioFile: File): Promise<string> => {
  
  const formData = new FormData();
  formData.append("file", audioFile);

  const response = await fetch("http://127.0.0.1:8000/sentiment/", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Sentiment analysis failed");
  }

  return result.sentiment;
};

