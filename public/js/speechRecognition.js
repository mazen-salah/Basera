// speechRecognition.js
import { showToast } from "./ui.js";
import { playSound } from "./sounds.js";
import { simulatePoliceCall } from "./events.js";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "ar-SA"; // Set language to Arabic (Saudi Arabia)

recognition.onresult = handleSpeechResult;
recognition.onerror = handleSpeechError;
recognition.onend = () => toggleListeningIndicator(false);

let firstTime = true;

// Function to start voice recognition
export function startVoiceRecognition() {
  showToast(
    "تم تفعيل الأوامر الصوتية",
    "يرجى الانتظار حتى تسمع الصوت ثم قول أمر مثل 'اتصل بالشرطة' أو 'فحص الموقع'.",
    firstTime
  );
  setTimeout(
    () => {
      playSound("startRecognition");
      recognition.start();
    },
    firstTime ? 8000 : 0
  );
  firstTime = false;
  toggleListeningIndicator(true);
}

// Function to handle speech result
function handleSpeechResult(event) {
  const speechResult = event.results[0][0].transcript;
  showToast("لقد قلت:", speechResult);

  if (
    speechResult.includes("اتصل بالشرطة") ||
    speechResult.includes("الشرطة")
  ) {
    simulatePoliceCall();
  } else if (
    speechResult.includes("فحص الموقع") ||
    speechResult.includes("تحقق من الموقع")
  ) {
    document.getElementById("check-url").click();
  } else if (speechResult.includes("لصق")) {
    navigator.clipboard
      .readText()
      .then((clipText) => {
        document.getElementById("url-input").value = clipText;
        showToast("تم اللصق", clipText);
      })
      .catch((err) => {
        console.error("فشل في قراءة الحافظة:", err);
        showToast("خطأ", "فشل في قراءة الحافظة.");
      });
  }
}

// Function to handle speech error
function handleSpeechError(event) {
  console.error("حدث خطأ:", event.error);
  playSound("error");
  showToast("خطأ", "حدث خطأ أثناء معالجة الصوت.");
}

// Function to toggle the listening indicator
function toggleListeningIndicator(show) {
  const indicator = document.getElementById("listening-indicator");
  indicator.classList.toggle("d-none", !show); // Show or hide the indicator
}
