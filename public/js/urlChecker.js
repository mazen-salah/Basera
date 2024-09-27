// urlChecker.js
import { fetchAnalysisId, fetchAnalysisResult } from "./api.js";
import { showToast, updateUrlStatus, showLoadingSpinner } from "./ui.js";
import { playSound } from "./sounds.js";

// Function to check URL safety
export async function checkUrlSafety() {
  const url = document.getElementById("url-input").value.trim();

  if (!url) {
    playSound("error");
    return showToast("خطأ", "يرجى إدخال رابط لفحص أمانه.");
  }

  updateUrlStatus("جاري فحص أمان الموقع...");
  showLoadingSpinner(true);

  try {
    const analysisId = await fetchAnalysisId(url);
    const analysisData = await fetchAnalysisResult(analysisId);
    displayUrlCheckResult(analysisData);
    playSound("success");
  } catch (error) {
    console.error("Error fetching data from VirusTotal:", error);
    playSound("error");
    showToast("خطأ", "حدث خطأ أثناء فحص الموقع.");
    updateUrlStatus("حدث خطأ أثناء فحص الموقع.", true);
  } finally {
    showLoadingSpinner(false);
  }
}

// Function to display URL check result
function displayUrlCheckResult(data) {
  const attributes = data.data.attributes;
  const stats = attributes.stats;
  const totalDetections = stats.malicious + stats.suspicious;

  const message =
    totalDetections > 0
      ? `تحذير! الموقع قد يكون خبيثًا. تم الإبلاغ عنه كخبيث من قبل ${stats.malicious} خدمات و مشبوه من قبل ${stats.suspicious} خدمات.`
      : "الموقع آمن.";
  const title = totalDetections > 0 ? "تحذير!" : "أمان الموقع";
  showToast(title, message);
  updateUrlStatus(message, totalDetections > 0);

  if (totalDetections > 0) {
    playSound("alert");
  }

  // Log the results from all engines
  const resultsMessage = Object.entries(attributes.results)
    .map(([engine, result]) => `${engine}: ${result.result}`)
    .join("\n");

  //open the results in a new window
  // const resultsWindow = window.open("", "_blank");
  // resultsWindow.document.write(`<pre>${resultsMessage}</pre>`);
}
