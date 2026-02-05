const question = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

const teaseMessages = [
  "😏 Bien essayé…",
  "😌 Presque !",
  "😈 Nope.",
  "😉 Tu pensais vraiment ?",
  "💖 Tu peux y arriver !",
  "😅 Pas cette fois !",
  "😂 Tu t'es trompée !",
  "😬 Essaie encore !",
  "🙃 Toujours pas !",
  "😜 Tu y es presque !",
  "🤭 Pas aujourd'hui !",
  "😇 Réessaye !",
];

let step = 1;

// --- Effet étape 1 : le Non devient Oui
noBtn.addEventListener("mouseenter", () => {
  if (step === 1) {
    noBtn.textContent = "Oui 💖";
    noBtn.classList.add("yes-mode");
  }
});

noBtn.addEventListener("mouseleave", () => {
  if (step === 1) {
    noBtn.textContent = "Non 😅";
    noBtn.classList.remove("yes-mode");
  }
});

function clearMessage() {
  message.textContent = "";
  message.classList.remove("show");
}

function getRandomTease() {
  return teaseMessages[Math.floor(Math.random() * teaseMessages.length)];
}

// --- Clic sur OUI
yesBtn.addEventListener("click", () => {
  if (step === 1) {
    step = 2;
    question.textContent = "Es-tu sûre ? 😌";
    noBtn.textContent = "Non 😬";
    noBtn.classList.remove("yes-mode");
    clearMessage();
    return;
  }

  if (step === 2) {
    step = 3;
    question.textContent = "Vraiment sûre ? 😏";

    noBtn.textContent = "Non 😬";
    noBtn.classList.remove("yes-mode");

    clearMessage();
    return;
  }

  if (step === 3) {
    message.textContent = "❤️ Je l'ai toujours su, mon amour ! ❤️";
    message.classList.add("show");

    launchConfetti();

    const endMusic = document.getElementById("endMusic");
    endMusic.currentTime = 0;
    endMusic.volume = 0.5;
    endMusic.play().catch(() => {});
  }
});

// --- Clic sur NON
noBtn.addEventListener("click", () => {
  if (step === 1) {
    step = 2;
    question.textContent = "Es-tu sûr(e) ? 😌";
    noBtn.textContent = "Non 😬";
    noBtn.classList.remove("yes-mode");
    clearMessage();
    return;
  }

  if (step === 2) {
    message.textContent =
      "⚠️ Erreur suite à un problème technique, veuillez réessayer.";
    message.classList.add("show");
    return;
  }
});

function moveNoButton() {
  if (step !== 3) return;

  noBtn.classList.add("free");

  // 🎭 Texte taquin AU MOMENT DU HOVER
  noBtn.textContent = getRandomTease();
  noBtn.classList.remove("yes-mode");

  const padding = 20;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Desktop : hover
noBtn.addEventListener("mouseenter", moveNoButton);

// Mobile : tentative de toucher
noBtn.addEventListener("touchstart", (e) => {
  if (step === 3) {
    e.preventDefault();
    moveNoButton();
  }
});

function launchConfetti() {
  const confettiCount = 140;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    // Position horizontale aléatoire
    confetti.style.left = Math.random() * 100 + "vw";

    // Taille variable
    const size = 6 + Math.random() * 8;
    confetti.style.width = size + "px";
    confetti.style.height = size * 1.4 + "px";

    // Couleur vive
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 90%, 60%)`;

    // Durée & délai aléatoires (clé du rendu naturel)
    const duration = 2.5 + Math.random() * 2.5;
    const delay = Math.random() * 2.5;

    confetti.style.animationDuration = `${duration}s`;
    confetti.style.animationDelay = `${delay}s`;

    // Rotation initiale
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(confetti);

    // Nettoyage
    setTimeout(() => confetti.remove(), (duration + delay) * 1000);
  }
}
