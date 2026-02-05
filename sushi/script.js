// 📅 Date de début (09/12/2023 à 18h30)
const startDate = new Date(2023, 11, 9, 18, 30, 0);
const music = document.getElementById("music");
let musicStarted = false;

const el = {
  years: document.getElementById("years"),
  months: document.getElementById("months"),
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

function calculateDiff(start, end) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  let hours = end.getHours() - start.getHours();
  let minutes = end.getMinutes() - start.getMinutes();
  let seconds = end.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }

  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  if (hours < 0) {
    hours += 24;
    days--;
  }

  if (days < 0) {
    const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += previousMonth.getDate();
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days, hours, minutes, seconds };
}

function updateCounter() {
  const now = new Date();
  const diff = calculateDiff(startDate, now);

  el.years.textContent = diff.years;
  el.months.textContent = diff.months;
  el.days.textContent = diff.days;
  el.hours.textContent = diff.hours;
  el.minutes.textContent = diff.minutes;
  el.seconds.textContent = diff.seconds;
}

updateCounter();
setInterval(updateCounter, 1000);

function startMusicOnce() {
  if (musicStarted) return;

  music.volume = 0.6;
  music.loop = false;
  music.play().catch(() => {});
  musicStarted = true;

  // On enlève les écouteurs après le premier déclenchement
  document.removeEventListener("click", startMusicOnce);
  document.removeEventListener("touchstart", startMusicOnce);
  document.removeEventListener("keydown", startMusicOnce);
}

// ▶️ Lance la musique dès l’arrivée + première interaction
document.addEventListener("click", startMusicOnce);
document.addEventListener("touchstart", startMusicOnce);
document.addEventListener("keydown", startMusicOnce);
