export async function detectGender(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/gender-detect/", { 
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Gender detection failed: ${response.statusText}`);
  }

  return await response.json();
}