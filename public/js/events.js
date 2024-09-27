// events.js
import { startVoiceRecognition } from "./speechREcognition.js";
import { checkUrlSafety } from "./urlChecker.js";
import { playSound } from "./sounds.js";
import { showToast } from "./ui.js";

// Add event listeners for buttons and keydown events
export function addEventListeners() {
  document
    .getElementById("mic-button")
    .addEventListener("click", startVoiceRecognition);
  document
    .getElementById("check-url")
    .addEventListener("click", checkUrlSafety);
  document
    .getElementById("call-police")
    .addEventListener("click", simulatePoliceCall);

  // Add event listener for spacebar keydown
  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      startVoiceRecognition();
    }
    if (event.shiftKey && event.ctrlKey) {
      simulatePoliceCall();
    }
    if (event.ctrlKey && event.code === "KeyV") {
      navigator.clipboard.readText().then((text) => {
        document.getElementById("url-input").value = text;
      });
    }
    if (event.code === "Enter") {
      checkUrlSafety();
    }
  });
}

// Function to simulate call to police
export function simulatePoliceCall() {
  playSound("policeCall");
  showToast("اتصال الشرطة", "سوف نقوم بالاتصال بالشرطة. هذه محاكاة.");
}
