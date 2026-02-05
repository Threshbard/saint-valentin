const words = [
  "Je",
  "t’",
  "aime",
  "plus",
  "que",
  "tout",
  "au",
  "monde",
  "mon",
  "bébé",
  "d'",
  "amour",
  "❤️",
  "❤️",
  "❤️",
  "❤️",
];

const puzzle = document.getElementById("puzzle");
const finalMessage = document.getElementById("finalMessage");
const music = document.getElementById("music");

let finished = false;
let dragged = null;

// Mélange
const indices = [...Array(16).keys()].sort(() => Math.random() - 0.5);

// Créer pièces
indices.forEach((correctIndex) => {
  const piece = document.createElement("div");
  piece.className = "piece";
  piece.draggable = true;
  piece.dataset.correct = correctIndex;

  const x = (correctIndex % 4) * -75;
  const y = Math.floor(correctIndex / 4) * -75;
  piece.style.backgroundPosition = `${x}px ${y}px`;

  const span = document.createElement("span");
  span.textContent = words[correctIndex];
  piece.appendChild(span);

  piece.addEventListener("dragstart", () => {
    dragged = piece;
  });

  piece.addEventListener("dragover", (e) => e.preventDefault());

  piece.addEventListener("drop", () => {
    if (dragged && dragged !== piece) {
      swapPieces(dragged, piece);
      check();
    }
  });

  // 📱 mobile : tap pour échanger
  piece.addEventListener("click", () => {
    if (!dragged) {
      dragged = piece;
      piece.style.outline = "2px solid #ff4d8d";
    } else if (dragged !== piece) {
      dragged.style.outline = "none";
      swapPieces(dragged, piece);
      dragged = null;
      check();
    }
  });

  puzzle.appendChild(piece);
});

function swapPieces(a, b) {
  const tmp = document.createElement("div");
  puzzle.replaceChild(tmp, a);
  puzzle.replaceChild(a, b);
  puzzle.replaceChild(b, tmp);
}

function check() {
  let correct = 0;

  [...puzzle.children].forEach((piece, index) => {
    if (+piece.dataset.correct === index) {
      piece.classList.add("correct");
      correct++;
    } else {
      piece.classList.remove("correct");
    }
  });

  if (correct === 16 && !finished) {
    finish();
  }
}

function finish() {
  finished = true;

  // ❤️ message final
  finalMessage.classList.add("show");

  // 🎵 musique UNIQUEMENT à la fin
  music.currentTime = 0;
  music.volume = 0.7;
  music.play().catch(() => {});

  // 💖 cœurs UNIQUEMENT à la fin
  for (let i = 0; i < 30; i++) {
    spawnHeart();
  }
}

function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = "❤️";
  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDuration = 3 + Math.random() * 2 + "s";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 5000);
}
