export const detectGender = async (audioFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", audioFile);

  const response = await fetch("http://127.0.0.1:8000/gender/", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Gender detection failed");
  }

  return result.gender;  
};
