// api.js

const API_BASE_URL = "https://www.virustotal.com/api/v3";
let API_KEY;

// Fetch the API key from the backend on page load
export async function fetchApiKey() {
  try {
    const response = await fetch("/api-key");
    const data = await response.json();
    API_KEY = data.apiKey;
  } catch (error) {
    console.error("Error fetching API key:", error);
    showToast("خطأ", "حدث خطأ أثناء جلب مفتاح الواجهة البرمجية.");
  }
}

// Fetch Analysis ID
export async function fetchAnalysisId(url) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "x-apikey": API_KEY,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ url }),
  };

  const response = await fetch(`${API_BASE_URL}/urls`, options);
  if (!response.ok) {
    const data = await response.json();
    throw new Error("Error fetching URL analysis: " + data.message);
  }

  return (await response.json()).data.id;
}

// Fetch Analysis Result
export async function fetchAnalysisResult(analysisId) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-apikey": API_KEY,
    },
  };

  const response = await fetch(
    `${API_BASE_URL}/analyses/${analysisId}`,
    options
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error("Error fetching analysis results: " + data.message);
  }

  return await response.json();
}
