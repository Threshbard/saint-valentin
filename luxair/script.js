const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreEl = document.getElementById("score");
const end = document.getElementById("end");
const startMusic = document.getElementById("startMusic");
const endMusic = document.getElementById("endMusic");

startMusic.volume = 0.35;
endMusic.volume = 0.5;

let score = 0;
let playerX = 180;
let gameFinished = false;

// Déplacement clavier
document.addEventListener("keydown", (e) => {
  if (gameFinished) return;

  if (startMusic.paused) {
    startMusic.play().catch(() => {});
  }

  if (e.key === "ArrowLeft") playerX -= 30;
  if (e.key === "ArrowRight") playerX += 30;
  playerX = Math.max(20, Math.min(300, playerX));
  player.style.left = playerX + "px";
});

// Mobile : toucher
game.addEventListener("click", (e) => {
  if (gameFinished) return;

  if (startMusic.paused) {
    startMusic.play().catch(() => {});
  }

  const rect = game.getBoundingClientRect();
  playerX = e.clientX - rect.left;
  player.style.left = playerX + "px";
});

// Génération des cœurs
function spawnHeart() {
  if (gameFinished) return;
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 320 + "px";
  heart.style.animationDuration = 2 + Math.random() * 2 + "s";

  game.appendChild(heart);

  const fallInterval = setInterval(() => {
    const hRect = heart.getBoundingClientRect();
    const pRect = player.getBoundingClientRect();

    if (
      hRect.bottom > pRect.top &&
      hRect.left < pRect.right &&
      hRect.right > pRect.left
    ) {
      heart.remove();
      clearInterval(fallInterval);
      score++;
      scoreEl.textContent = score;

      if (score >= 20) {
        finish();
      }
    }
  }, 50);

  heart.addEventListener("animationend", () => {
    heart.remove();
    clearInterval(fallInterval);
  });
}

let loop = setInterval(spawnHeart, 900);

function finish() {
  if (gameFinished) return;
  gameFinished = true;

  // 🛑 Stop la génération
  clearInterval(loop);

  // 🔇 Stop musique de jeu
  startMusic.pause();
  startMusic.currentTime = 0;

  // 🎵 Musique de fin (1 seule fois)
  endMusic.pause();
  endMusic.currentTime = 0;
  endMusic.loop = false;
  endMusic.play().catch(() => {});

  // ❤️ Affiche l’écran de fin
  end.classList.add("show");
}

function yes() {
  end.innerHTML = "<h1>❤️ Je t’aime ❤️</h1><p>Merci d’avoir dit oui 💕</p>";
}

function no() {
  alert("Mauvaise réponse 😜 essaie encore !");
}
