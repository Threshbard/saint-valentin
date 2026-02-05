function isToday(dateStr) {
  const today = new Date();
  const d = new Date(dateStr);
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

// 👉 Modifie ici votre histoire
// image: null => pas d'image
// date: format YYYY-MM-DD (pratique pour trier)
let events = [
  {
    date: "2023-12-06",
    title: "Le premier « salut »",
    description: "Ce jour-là, tout a commencé. Le début d’une belle aventure",
    image: "./medias/gerardmer.jpg",
    label: "Gérardmer",
  },
  {
    date: "2023-12-07",
    title: "La première partie",
    description: "J'ai gagné la manche de bowling, mais tu as gagné mon cœur",
    image: "./medias/bowling.jpg",
    label: "Fun Park",
  },
  {
    date: "2023-12-09",
    title: "Le premier bisou",
    description: "Un moment magique sur notre petit nuage",
    image: "./medias/couple3.jpg",
    label: "Champs Elysées",
  },
  {
    date: "2023-12-16",
    title: "Le premier week-end",
    description: "Avec le premier restaurant Asiatique 👀",
    image: "./medias/couple2.jpg",
    label: "Metz",
  },
  {
    date: "2024-08-14",
    title: "Les premières vacances à l'étranger",
    description: "Le beau temps, le buffet, la mer et toi.",
    image: "./medias/couple1.jpg",
    label: "Salou",
  },
  {
    date: "2024-12-31",
    title: "Le premier nouvel an ensemble",
    description: "On a très bien dormi cette nuit-là ! (non)",
    image: "./medias/nouvelan.jpg",
    label: "Lyon",
  },
  {
    date: "2025-12-28",
    title: "Les premiers sushis faits-maison",
    description: "Il fallait bien qu'on le fasse un jour !",
    image: "./medias/sushis.jpg",
    label: "Toulouse",
  },
];

const todayStr = new Date().toISOString().split("T")[0];
const hasToday = events.some((ev) => ev.date === todayStr);

if (!hasToday) {
  events.push({
    date: todayStr,
    title: "Aujourd’hui 💖",
    description:
      "Et ce n’est pas un souvenir… c’est notre présent. Merci d’écrire cette histoire avec moi. Je t'aime et je t'aimerai toujours ❤️",
    image: null,
    label: "Maintenant",
  });
}

const timelineEl = document.getElementById("timeline");
const sortAscBtn = document.getElementById("sortAsc");
const sortDescBtn = document.getElementById("sortDesc");
const toggleImagesBtn = document.getElementById("toggleImages");

let showImages = true;

function formatDateFR(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dt);
}

function renderTimeline(list) {
  timelineEl.innerHTML = "";

  list.forEach((ev, index) => {
    const isLeft = index % 2 === 0; // alterne gauche/droite
    const sideClass = isLeft ? "side" : "side right";

    const item = document.createElement("article");
    item.className = "item";

    item.addEventListener("click", () => {
      item.classList.add("open");
    });

    if (isToday(ev.date)) {
      item.classList.add("today");
    }

    const left = document.createElement("div");
    left.className = "side";
    const right = document.createElement("div");
    right.className = "side right";

    const pin = document.createElement("div");
    pin.className = "pin";

    const card = document.createElement("div");
    card.className = "card";

    if (showImages && ev.image) {
      const img = document.createElement("img");
      img.className = "media";
      img.src = ev.image;
      img.alt = ev.title;
      img.loading = "lazy";
      card.appendChild(img);
    }

    const inner = document.createElement("div");
    inner.className = "card-inner";

    inner.innerHTML = `
    <div class="meta">
        <span class="tag"><span class="date">${formatDateFR(ev.date)}</span></span>
        ${ev.label ? `<span class="tag">${ev.label}</span>` : ""}
    </div>
    <h3 class="title">${ev.title}</h3>
    <p class="desc">${ev.description}</p>
    `;

    card.appendChild(inner);

    // Place la card à gauche ou droite
    if (window.matchMedia("(max-width: 760px)").matches) {
      // mobile: toujours en colonne
      item.appendChild(pin);
      right.appendChild(card);
      item.appendChild(right);
    } else {
      if (isLeft) {
        left.appendChild(card);
        item.appendChild(left);
        item.appendChild(pin);
        item.appendChild(right);
      } else {
        item.appendChild(left);
        item.appendChild(pin);
        right.appendChild(card);
        item.appendChild(right);
      }
    }

    timelineEl.appendChild(item);
  });
}

function sortAsc() {
  events = [...events].sort((a, b) => a.date.localeCompare(b.date));
  renderTimeline(events);
}

function sortDesc() {
  events = [...events].sort((a, b) => b.date.localeCompare(a.date));
  renderTimeline(events);
}

// Événements UI
sortAscBtn.addEventListener("click", sortAsc);
sortDescBtn.addEventListener("click", sortDesc);
toggleImagesBtn.addEventListener("click", () => {
  showImages = !showImages;
  renderTimeline(events);
});

// Re-render au changement de taille (pour l’alternance desktop/mobile)
window.addEventListener("resize", () => renderTimeline(events));

// Initial render (par défaut: tri ancien->récent)
sortAsc();

// 🎵 Musique au chargement (1 seule fois, après interaction)
const music = document.getElementById("music");
let musicStarted = false;

function startMusicOnce() {
  if (musicStarted) return;

  music.volume = 0.6;
  music.loop = false;
  music.play().catch(() => {});
  musicStarted = true;

  // Nettoyage des listeners
  document.removeEventListener("click", startMusicOnce);
  document.removeEventListener("touchstart", startMusicOnce);
  document.removeEventListener("keydown", startMusicOnce);
}

// Déclenchement au premier geste utilisateur
document.addEventListener("click", startMusicOnce);
document.addEventListener("touchstart", startMusicOnce);
document.addEventListener("keydown", startMusicOnce);
