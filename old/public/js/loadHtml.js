//loadHtml.js

// Function to load HTML and inject into the target element
function loadHTML(file, elementId) {
  fetch(file)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById(elementId).innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading the file:", error);
    });
}

// Load individual HTML files into the corresponding sections
loadHTML("../html/header.html", "header");
loadHTML("../html/footer.html", "footer");
loadHTML("../html/voice-command.html", "voice-command");
loadHTML("../html/website-safety.html", "website-safety");
loadHTML("../html/emergency-numbers.html", "emergency-numbers");
loadHTML("../html/gov-links.html", "gov-links");
