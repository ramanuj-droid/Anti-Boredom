const MYSTERY_SOURCE = "mysteries.json";

/** @type {Array<{ id:number, text:string, options:string[], answer:number, explanation:string }>} */
let mysteries = [];
let currentIndex = -1;

async function loadMysteries() {
  try {
    const res = await fetch(MYSTERY_SOURCE, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    mysteries = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to load mysteries:", err);
    mysteries = [];
  }
}

function pickNextIndex() {
  if (mysteries.length === 0) return -1;
  if (mysteries.length === 1) return 0;
  let next;
  do {
    next = Math.floor(Math.random() * mysteries.length);
  } while (next === currentIndex);
  return next;
}

function renderMystery(index) {
  const promptEl = document.getElementById("mystery-text");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");

  if (!promptEl || !optionsEl || !feedbackEl) return;

  const m = mysteries[index];
  if (!m) {
    promptEl.textContent = "No mysteries available.";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    return;
  }

  promptEl.textContent = m.text;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  optionsEl.innerHTML = "";

  m.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.type = "button";
    btn.textContent = opt;
    btn.setAttribute("aria-label", `Option ${i + 1}: ${opt}`);
    btn.addEventListener("click", () => handleAnswer(i));
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(choiceIndex) {
  const feedbackEl = document.getElementById("feedback");
  const optionsEl = document.getElementById("options");
  if (!feedbackEl || !optionsEl) return;

  const m = mysteries[currentIndex];
  if (!m) return;

  const isCorrect = choiceIndex === m.answer;
  feedbackEl.textContent = (isCorrect ? "Correct! " : "Not quite. ") + m.explanation;
  feedbackEl.className = "feedback " + (isCorrect ? "correct" : "wrong");

 
  optionsEl.querySelectorAll("button").forEach((b, idx) => {
    b.disabled = true;
    if (idx === m.answer) b.style.borderColor = "#86efac";
    if (idx === choiceIndex && !isCorrect) b.style.borderColor = "#fca5a5";
  });
}

async function showNextMystery() {
  if (mysteries.length === 0) {
    await loadMysteries();
  }
  const next = pickNextIndex();
  currentIndex = next;
  renderMystery(next);
}

document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");
  if (nextBtn) nextBtn.addEventListener("click", showNextMystery);
  showNextMystery();
});


