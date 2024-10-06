// ui.js

// Function to show Toast Notifications
export function showToast(title, body, sound = true) {
  const toastContainer = document.getElementById("toast-container");
  const toastElement = createToastElement(title, body);
  toastContainer.appendChild(toastElement);
  const toast = new bootstrap.Toast(toastElement);
  toast.show();

  if (sound) {
    speakText(`${title}: ${body}`, "ar-SA", 1.3);
  }
}

// Create Toast Element
function createToastElement(title, body) {
  const toastElement = document.createElement("div");
  toastElement.className = "toast";
  toastElement.role = "alert";
  toastElement.ariaLive = "assertive";
  toastElement.ariaAtomic = "true";

  const toastHeader = createToastHeader(title);
  const toastBody = createToastBody(body);

  toastElement.append(toastHeader, toastBody);
  toastElement.style.marginBottom = "10px"; // Add margin between toasts

  return toastElement;
}

// Create Toast Header
function createToastHeader(title) {
  const toastHeader = document.createElement("div");
  toastHeader.className = "toast-header";

  const strong = document.createElement("strong");
  strong.className = "me-auto";
  strong.textContent = title;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn-close";
  button.dataset.bsDismiss = "toast";
  button.ariaLabel = "Close";

  toastHeader.append(strong, button);
  return toastHeader;
}

// Create Toast Body
function createToastBody(body) {
  const toastBody = document.createElement("div");
  toastBody.className = "toast-body";
  toastBody.textContent = body;
  return toastBody;
}

// Speak Text
function speakText(text, lang, rate) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  speechSynthesis.speak(utterance);
}

// Function to show or hide loading spinner
export function showLoadingSpinner(show) {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.toggle("d-none", !show); // Toggle the visibility of the spinner
}

// Function to update URL status message
export function updateUrlStatus(message, isError = false) {
  const statusElement = document.getElementById("url-status");
  statusElement.textContent = message;
  statusElement.classList.toggle("text-danger", isError);
  statusElement.classList.toggle("text-success", !isError);
}
