let isMuted = false;

// Load components into the app
const app = document.getElementById("template");
app.appendChild(createNavBar());
app.appendChild(createAppBar());

// Initialize event listeners
initEventListeners();

function createAppBar() {
  const appBar = document.createElement("div");
  appBar.className = "app-bar";

  const controls = document.createElement("div");
  controls.className = "controls";

  // Mute Button
  const muteButton = createButton(
    "mute-button",
    "Mute/Unmute",
    '<i class="fas fa-microphone"></i>'
  );
  controls.appendChild(muteButton);
  appBar.appendChild(controls);

  // Logo
  const logo = document.createElement("img");
  logo.src = "../assets/logo.png";
  logo.alt = "App Logo";
  logo.className = "logo";
  appBar.appendChild(logo);

  return appBar;
}

function createNavBar() {
  const navBar = document.createElement("div");
  navBar.className = "nav-bar";

  const buttons = [
    { id: "back-button", icon: "fas fa-arrow-left", title: "Back" },
    { id: "forward-button", icon: "fas fa-arrow-right", title: "Forward" },
    { id: "refresh-button", icon: "fas fa-sync", title: "Refresh" },
  ];

  buttons.forEach((btn) => {
    const button = createButton(
      btn.id,
      btn.title,
      `<i class="${btn.icon}"></i>`
    );
    navBar.appendChild(button);
  });

  // URL Input
  const urlInput = document.createElement("input");
  urlInput.type = "text";
  urlInput.placeholder = "Enter URL";
  urlInput.id = "url-input";
  navBar.appendChild(urlInput);

  // Profile and Options Buttons
  navBar.appendChild(
    createButton(
      "profile-icon",
      "Profile",
      '<i class="fas fa-user-circle"></i>'
    )
  );
  navBar.appendChild(
    createButton("options-icon", "Options", '<i class="fas fa-cog"></i>')
  );

  return navBar;
}

function createButton(id, title, innerHTML) {
  const button = document.createElement("button");
  button.id = id;
  button.title = title;
  button.innerHTML = innerHTML;
  return button;
}

function speakText(text, lang = "ar-SA", rate = 1) {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;

    // Get the available voices and select the desired Arabic voice
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.filter((voice) =>
      voice.lang.startsWith("ar")
    )[3]; // 4th Arabic voice

    if (arabicVoice) {
      utterance.voice = arabicVoice;
    } else {
      console.warn("Desired Arabic voice not available.");
    }

    if (!isMuted) {
      utterance.onend = resolve; // Resolve the promise when the utterance ends
      speechSynthesis.speak(utterance);
    } else {
      resolve(); // Resolve immediately if muted
    }
  });
}

async function describeScreen() {
  if (window.location.href.includes("link-check")) {
    await speakText("صفحة فحص الروابط.");
    return;
  }
  if (!window.location.href.includes("platforms")) {
    const title = document.querySelector("h1")?.innerText || "";
    const description = document.querySelector("p")?.innerText || "";
    await speakText(`الصفحة تحتوي على: ${title}. ${description}`);
  }

  const cards = document.querySelectorAll(".card");
  if (cards.length > 0) {
    await speakText(`يوجد ${cards.length} بطاقة متاحة.`);
    for (let index = 0; index < cards.length; index++) {
      const card = cards[index];
      const cardTitle = card.querySelector(".card-title")?.innerText || "";
      const cardDescription = card.querySelector(".card-text")?.innerText || "";
      await speakText(`بطاقة ${index + 1}: ${cardTitle}. ${cardDescription}`);
    }
  }
}

async function readContent() {
  speechSynthesis.cancel(); // Stop any ongoing speech
  //only speak in the home or root page
  if (
    
    !window.location.href.includes("platforms") &&
    !window.location.href.includes("link-check")
  ) {
   
    await speakText(
      "للتنقل: استخدم الأسهم لأعلى ولأسفل للانتقال بين البطاقات، واستخدم السهم الأيسر للعودة، والسهم الأيمن للتقدم. اضغط على Enter للدخول إلى البطاقة والمزيد من المعلومات.");
  }
  await describeScreen(); // Read the page content
}

async function initEventListeners() {
  const muteButton = document.getElementById("mute-button");
  const backButton = document.getElementById("back-button");
  const forwardButton = document.getElementById("forward-button");
  const refreshButton = document.getElementById("refresh-button");
  const settingsButton = document.getElementById("options-icon");
  const profileButton = document.getElementById("profile-icon");
  const urlInput = document.getElementById("url-input");
  const cards = document.querySelectorAll(".card");

  muteButton.addEventListener("click", toggleMute);
  backButton.addEventListener("click", () => {
    speechSynthesis.cancel(); // Stop any ongoing speech
    window.history.back();
  });
  forwardButton.addEventListener("click", () => {
    speechSynthesis.cancel(); // Stop any ongoing speech
    window.history.forward();
  });
  refreshButton.addEventListener("click", () => {
    speechSynthesis.cancel(); // Stop any ongoing speech
    window.location.reload();
  });

  settingsButton.addEventListener("click", () => {
    speechSynthesis.cancel(); // Stop any ongoing speech
    window.location.href = "ms-settings:easeofaccess";
  });

  profileButton.addEventListener("click", () => {
    speechSynthesis.cancel(); // Stop any ongoing speech
    window.location.href = "/login";
  });

  urlInput.addEventListener("keypress", handleUrlInput);

  document.addEventListener("keydown", (event) =>
    handleKeyboardNavigation(event, cards)
  );

  await readContent(); // Read the content when the app loads
}

async function toggleMute() {
  isMuted = !isMuted;
  const muteButton = document.getElementById("mute-button");
  muteButton.innerHTML = isMuted
    ? '<i class="fas fa-microphone-slash"></i>'
    : '<i class="fas fa-microphone"></i>';
  if (isMuted) {
    speechSynthesis.cancel(); // Stop any ongoing speech
  } else {
    await readContent(); // Read the content when unmuted
  }
}

function handleUrlInput(event) {
  if (event.key === "Enter") {
    const urlInput = document.getElementById("url-input");
    const url = urlInput.value.startsWith("http")
      ? urlInput.value
      : `http://${urlInput.value}`;
    window.location.href = url;
  }
}

function handleKeyboardNavigation(event, cards) {
  let currentIndex = Array.from(cards).findIndex(
    (card) => document.activeElement === card
  );

  switch (event.key) {
    case "ArrowLeft":
      document.getElementById("back-button").click();
      break;
    case "ArrowRight":
      document.getElementById("forward-button").click();
      break;
    case "ArrowUp":
      if (currentIndex > 0) {
        cards[currentIndex - 1].focus();
        speakText(`انتقلت إلى البطاقة ${currentIndex}.`);
      } else if (cards.length == 0) {
        speakText("لا توجد بطاقات.");
      } else {
        speakText("أنت في أعلى القائمة.");
      }
      break;
    case "ArrowDown":
      if (currentIndex < cards.length - 1) {
        cards[currentIndex + 1].focus();
        speakText(`انتقلت إلى البطاقة ${currentIndex + 2}.`);
      } else if (cards.length == 0) {
        speakText("لا توجد بطاقات.");
      } else {
        speakText("أنت في أسفل القائمة.");
      }
      break;
    case "Space":
      if (currentIndex >= 0) {
        const title =
          cards[currentIndex].querySelector(".card-title").innerText;
        const text = cards[currentIndex].querySelector(".card-text").innerText;
        speakText(`${title}. ${text}`);
      }
      break;
    case "Enter":
      if (currentIndex >= 0) {
        const link = cards[currentIndex].querySelector("a");
        if (link) {
          speechSynthesis.cancel(); // Stop any ongoing speech
          window.location.href = link.href; // Navigate to the card link
        }
      }
      break;
  }
}

utterance.cancel();
