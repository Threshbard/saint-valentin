const cardsEl = document.getElementById("cards");
const messageEl = document.getElementById("message");
const retryBtn = document.getElementById("retry");
const loseSound = new Audio("music.mp3");
const winSound = new Audio("music2.mp3");

let winnerIndex;
let hasScratched = false;

function init() {
  cardsEl.innerHTML = "";
  messageEl.textContent = "";
  retryBtn.classList.remove("show");
  hasScratched = false;

  winnerIndex = Math.floor(Math.random() * 3);

  for (let i = 0; i < 3; i++) {
    createCard(i);
  }
  activeCard = null;
}

function createCard(index) {
  const card = document.createElement("div");
  card.className = "card";

  const result = document.createElement("div");
  result.className = "result";
  result.innerHTML =
    index === winnerIndex
      ? "💖 GAGNÉ<br><small>Tu gagnes un<br>cadeau surprise !!!</small>"
      : "😢 PERDU<br><small>Essaie encore…</small>";

  const canvas = document.createElement("canvas");
  canvas.width = 160;
  canvas.height = 220;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#b0b0b0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "18px sans-serif";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.fillText("GRATTE ICI ✨", canvas.width / 2, canvas.height / 2);

  let scratching = false;
  let scratched = 0;

  function scratch(x, y) {
    if (activeCard && activeCard !== card) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();
    scratched++;

    if (scratched > 120) {
      reveal(card, index);
    }
  }

  canvas.addEventListener("mousedown", () => {
    if (hasScratched) return;
    scratching = true;
    activate(card);
  });
  canvas.addEventListener("mouseup", () => (scratching = false));
  canvas.addEventListener("mousemove", (e) => {
    if (scratching) {
      const r = canvas.getBoundingClientRect();
      scratch(e.clientX - r.left, e.clientY - r.top);
    }
  });

  canvas.addEventListener("touchstart", () => {
    if (hasScratched) return;
    activate(card);
  });
  canvas.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      scratch(t.clientX - r.left, t.clientY - r.top);
    },
    { passive: false },
  );

  card.appendChild(result);
  card.appendChild(canvas);
  cardsEl.appendChild(card);
}

function activate(card) {
  if (activeCard) return; // déjà une carte en cours

  activeCard = card;
  card.classList.add("active");

  [...cardsEl.children].forEach((c) => {
    if (c !== card) {
      c.classList.add("disabled");
    }
  });
}

function reveal(card, index) {
  if (card.classList.contains("revealed")) return;
  card.classList.add("revealed");

  if (index !== winnerIndex) {
    loseSound.currentTime = 0;
    loseSound.play();

    messageEl.textContent = "😏 Pas cette carte… veux-tu réessayer ?";
    retryBtn.classList.add("show");
    retryBtn.onclick = init;
  } else {
    winSound.currentTime = 0;
    winSound.play();

    messageEl.textContent = "🎉 BRAVO ! Carte gagnante 💖";
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        launchFireworks();
      }, i * 900); // délai entre chaque feu
    }
    retryBtn.classList.add("show");
    retryBtn.onclick = init;
  }
}

function launchFireworks() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = 0;
  canvas.style.pointerEvents = "none";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const particles = [];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      life: 100,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.life--;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    if (particles.some((p) => p.life > 0)) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }

  animate();
}

init();
