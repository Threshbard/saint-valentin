const routes = {
  sushi: "./sushi/index.html",
  lasagnes: "./lasagnes/index.html",
  sephora: "./sephora/index.html",
  luxair: "./luxair/index.html",
  oscar: "./oscar/index.html",
  rose: "./rose/index.html",
  mickey: "./mickey/index.html",
};

function checkKeyword() {
  const input = document.getElementById("keyword").value.toLowerCase().trim();
  const feedback = document.getElementById("feedback");

  if (!input) {
    feedback.textContent = "Entre un mot clé 💭";
    feedback.className = "error";
    return;
  }

  if (routes[input]) {
    feedback.textContent = "Bravo 😍 Surprise débloquée...";
    feedback.className = "success";

    setTimeout(() => {
      window.location.href = routes[input];
    }, 1400);
  } else {
    feedback.textContent = "Ce n’est pas le bon mot… réfléchis encore 😏";
    feedback.className = "error";
  }
}
