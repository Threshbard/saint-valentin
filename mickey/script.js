const SECRET_SEQUENCE = "012345";

const display = document.getElementById("display");
const audioArea = document.getElementById("audioArea");
const player = document.getElementById("player");
const errorMsg = document.getElementById("error");

const clearBtn = document.getElementById("clearBtn");
const backBtn = document.getElementById("backBtn");

let entered = "";
let unlocked = false;

function renderDisplay() {
  const cells = [...display.querySelectorAll(".cell")];
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = entered[i] ?? "_";
  }
}

function addDigit(digit) {
  if (unlocked) return;

  hideError();

  if (entered.length < 6) {
    entered += digit;
  } else {
    entered = entered.slice(1) + digit;
  }

  renderDisplay();
  checkSecret();
}

function backspace() {
  if (unlocked) return;
  hideError();
  entered = entered.slice(0, -1);
  renderDisplay();
}

function clearAll() {
  if (unlocked) return;
  hideError();
  entered = "";
  renderDisplay();
}

function checkSecret() {
  if (entered.length === 6) {
    if (entered === SECRET_SEQUENCE) {
      unlock();
    } else {
      showError();
    }
  }
}

function showError() {
  errorMsg.hidden = false;
}

function hideError() {
  errorMsg.hidden = true;
}

function unlock() {
  unlocked = true;
  audioArea.hidden = false;
  hideError();
}

document.querySelectorAll(".key").forEach((btn) => {
  btn.addEventListener("click", () => addDigit(btn.dataset.digit));
});

clearBtn.addEventListener("click", clearAll);

player.addEventListener("click", () => {
  player.play().catch(() => {});
});

window.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") addDigit(e.key);
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") clearAll();
});

renderDisplay();

const lyricsBtn = document.getElementById("lyricsBtn");
const lyrics = document.getElementById("lyrics");

lyricsBtn.addEventListener("click", () => {
  const isHidden = lyrics.hidden;
  lyrics.hidden = !isHidden;
  lyricsBtn.textContent = isHidden
    ? "🙈 Masquer les paroles"
    : "📜 Afficher les paroles";
});
