const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const missedDisplay = document.getElementById('missed');
const countdown = document.getElementById('countdown');
const messageBox = document.getElementById('message');

let score = 0;
let missed = 0;
let gameActive = false;

const messages = [
  "🔥 You're on fire!",
  "💥 Nice reflexes!",
  "⚡ Lightning fast!",
  "💫 Unstoppable!",
  "🚀 Keep it up!"
];

// Show a random motivational message
function showMessage() {
  const msg = messages[Math.floor(Math.random() * messages.length)];
  messageBox.textContent = msg;
  messageBox.style.opacity = 1;
  setTimeout(() => (messageBox.style.opacity = 0), 1000);
}

// Create particles that match the color of the caught box
function createParticles(x, y, color) {
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.background = color; // use the color of the caught box only
    p.style.left = x + 'px';
    p.style.top = y + 'px';

    // Random explosion direction
    const dx = (Math.random() - 0.5) * 100;
    const dy = (Math.random() - 0.5) * 100;
    p.style.setProperty('--x', `${dx}px`);
    p.style.setProperty('--y', `${dy}px`);

    gameArea.appendChild(p);
    setTimeout(() => p.remove(), 600);
  }
}

// Create a new clickable box
function createBox() {
  if (!gameActive) return;

  const box = document.createElement('div');
  box.className = 'box';
  const size = 40;
  box.style.left = Math.random() * (400 - size) + 'px';
  box.style.top = Math.random() * (400 - size) + 'px';
  box.style.background = `hsl(${Math.random() * 360}, 80%, 55%)`;

  let clicked = false;

  // When player clicks the box
  box.addEventListener('click', (e) => {
    clicked = true;
    score++;
    scoreDisplay.textContent = score;

    // create particles using box color only
    createParticles(e.offsetX + box.offsetLeft, e.offsetY + box.offsetTop, box.style.background);

    showMessage();
    box.remove();
  });

  // Missed if not clicked in time
  setTimeout(() => {
    if (!clicked && gameActive) {
      missed++;
      missedDisplay.textContent = missed;
    }
    box.remove();
  }, 1600);

  gameArea.appendChild(box);
}

// Countdown before starting game
function startCountdown() {
  let count = 3;
  countdown.textContent = count;
  countdown.style.opacity = 1;

  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      countdown.textContent = count;
    } else {
      clearInterval(timer);
      countdown.style.opacity = 0;
      startGame();
    }
  }, 1000);
}

// Start the actual game
function startGame() {
  gameActive = true;
  score = 0;
  missed = 0;
  scoreDisplay.textContent = score;
  missedDisplay.textContent = missed;

  const duration = 30000; // 30 seconds
  const spawnInterval = setInterval(createBox, 500);

  setTimeout(() => {
    clearInterval(spawnInterval);
    gameActive = false;
    const accuracy = (score / (score + missed) * 100).toFixed(1);
    alert(`Game Over!\nScore: ${score}\nMissed: ${missed}\nAccuracy: ${accuracy}%`);
  }, duration);
}

startCountdown();
