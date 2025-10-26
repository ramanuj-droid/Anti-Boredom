const riddles = [
  { emojis: "🐝🍃", answer: "believe", hint: "bee + leaf" },
  { emojis: "👁️❤️🫵", answer: "i love you", hint: "classic love message" },
  { emojis: "🌧️🌈", answer: "rainbow", hint: "weather phenomenon" },
  { emojis: "🍎📱", answer: "iphone", hint: "tech company's phone" },
  { emojis: "⭐💵", answer: "starbucks", hint: "coffee place" },
  { emojis: "🔥🦊", answer: "firefox", hint: "internet browser" },
  { emojis: "🐦", answer: "twitter", hint: "old social media name" },
  { emojis: "🍔👑", answer: "burger king", hint: "fast food chain" },
  { emojis: "🌙💡", answer: "moonlight", hint: "natural nighttime glow" },
  { emojis: "❄️👸", answer: "frozen", hint: "disney movie with ice" },
];

let current = 0;
let score = 0;
let attempts = 3;

const emojis = document.getElementById("emojis");
const hintBox = document.getElementById("hint");
const feedback = document.getElementById("feedback");
const input = document.getElementById("guessInput");
const progress = document.getElementById("progress");
const tries = document.getElementById("tries");
const scoreDisplay = document.getElementById("score");
const hintBtn = document.getElementById("hintBtn");
const submitBtn = document.getElementById("submitBtn");
const gameOver = document.getElementById("gameOver");
const game = document.getElementById("game");
const finalScore = document.getElementById("finalScore");
const finalMsg = document.getElementById("finalMsg");
const restartBtn = document.getElementById("restartBtn");

function loadRiddle() {
  const r = riddles[current];
  emojis.textContent = r.emojis;
  hintBox.classList.add("hidden");
  feedback.classList.add("hidden");
  input.value = "";
  progress.textContent = `${current + 1}/${riddles.length}`;
  tries.textContent = attempts;
  scoreDisplay.textContent = score;
}

function checkAnswer() {
  const user = input.value.toLowerCase().trim().replace(/[^a-z\s]/g, "");
  const correct = riddles[current].answer.toLowerCase().replace(/[^a-z\s]/g, "");

  if (user === correct) {
    score++;
    feedback.textContent = "yes! that's it 🎉";
    feedback.className = "feedback correct";
    feedback.classList.remove("hidden");
    setTimeout(nextRiddle, 1200);
  } else {
    attempts--;
    feedback.textContent = attempts > 0 ? `nope, try again (${attempts} left)` : "moving on...";
    feedback.className = "feedback wrong";
    feedback.classList.remove("hidden");
    tries.textContent = attempts;
    if (attempts === 0) setTimeout(nextRiddle, 1200);
  }
}

function nextRiddle() {
  if (current < riddles.length - 1) {
    current++;
    attempts = 3;
    loadRiddle();
  } else {
    endGame();
  }
}

function showHint() {
  hintBox.textContent = `💡 ${riddles[current].hint}`;
  hintBox.classList.remove("hidden");
}

function endGame() {
  game.classList.add("hidden");
  gameOver.classList.remove("hidden");
  const percent = (score / riddles.length) * 100;
  finalScore.textContent = `${score}/${riddles.length}`;

  if (percent === 100) finalMsg.textContent = "perfect score! 🎉";
  else if (percent >= 80) finalMsg.textContent = "wow that's really good! 🌟";
  else if (percent >= 60) finalMsg.textContent = "pretty solid ngl 👍";
  else if (percent >= 40) finalMsg.textContent = "not bad! some tricky ones in there";
  else finalMsg.textContent = "hey you tried! wanna go again?";
}

function restartGame() {
  current = 0;
  score = 0;
  attempts = 3;
  gameOver.classList.add("hidden");
  game.classList.remove("hidden");
  loadRiddle();
}

submitBtn.addEventListener("click", checkAnswer);
hintBtn.addEventListener("click", showHint);
restartBtn.addEventListener("click", restartGame);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkAnswer();
});

loadRiddle();
