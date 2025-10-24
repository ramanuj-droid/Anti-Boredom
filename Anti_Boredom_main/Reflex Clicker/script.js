const startBtn = document.getElementById("startBtn");
const target = document.getElementById("target");
const message = document.getElementById("message");
const result = document.getElementById("result");

let appearTime, clickTime;

startBtn.addEventListener("click", startGame);

function startGame() {
  message.textContent = "Wait for the circle to appear...";
  result.textContent = "";
  target.style.display = "none";
  const randomDelay = Math.random() * 3000 + 1000; // 1–4 sec

  setTimeout(() => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    target.style.display = "block";
    appearTime = Date.now();
  }, randomDelay);
}

target.addEventListener("click", () => {
  clickTime = Date.now();
  const reaction = clickTime - appearTime;
  target.style.display = "none";
  message.textContent = "Click 'Start' to try again!";
  result.textContent = `⚡ Your reaction time: ${reaction} ms`;
});
