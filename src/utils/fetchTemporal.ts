// src/api/fetchTemporal.ts
const API_URL = "http://127.0.0.1:8000/detect-temporal-inconsistency";

async function fetchTemporal(audioFile: File) {
  const formData = new FormData();
  formData.append("file", audioFile);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch temporal inconsistency result");
  }

  const result = await response.json();

  // Separate text output and graph, so UI can decide when to show the graph
  return {
    textOutput: result.text_output || "",
    graphBase64: result.graph_base64 || null, // only render when needed
  };
}

export default fetchTemporal;


