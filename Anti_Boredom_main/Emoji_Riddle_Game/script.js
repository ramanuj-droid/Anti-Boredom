
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

  { emojis: "🎬🍿", answer: "movie night", hint: "watching films with snacks" },
  { emojis: "🐈🧢", answer: "catfish", hint: "online faker or a fish" },
  { emojis: "🦋🗺️", answer: "butterfly effect", hint: "small change, big impact" },
  { emojis: "🌍🔥", answer: "global warming", hint: "climate issue" },
  { emojis: "🎵🎧", answer: "music", hint: "something you listen to" },
  { emojis: "🦸‍♂️🦸‍♀️", answer: "superheroes", hint: "they save the world" },
  { emojis: "💤💭", answer: "dream", hint: "happens during sleep" },
  { emojis: "🕐🕒🕕🕘", answer: "around the clock", hint: "all day long" },
  { emojis: "🍞💰", answer: "breadwinner", hint: "earns money for the family" },
  { emojis: "🧊🧋", answer: "ice tea", hint: "cold beverage" },

  { emojis: "💡⚡", answer: "bright idea", hint: "great thought" },
  { emojis: "🎯🏆", answer: "goal achieved", hint: "you made it!" },
  { emojis: "👟🏃‍♂️", answer: "running shoes", hint: "used for jogging" },
  { emojis: "🧠💪", answer: "mind power", hint: "mental strength" },
  { emojis: "📱💬", answer: "text message", hint: "common phone feature" },
  { emojis: "🎂🎉", answer: "birthday", hint: "special day every year" },
  { emojis: "🕵️‍♂️🔍", answer: "detective", hint: "solves mysteries" },
  { emojis: "🚗💨", answer: "fast car", hint: "zoom!" },
  { emojis: "🌹❤️", answer: "love rose", hint: "romantic flower" },
  { emojis: "🎓📚", answer: "education", hint: "learning stuff" },

  { emojis: "🌊🏄‍♂️", answer: "surfing", hint: "ocean sport" },
  { emojis: "🐍🎮", answer: "snake game", hint: "classic phone game" },
  { emojis: "💻🐞", answer: "debugging", hint: "fixing code" },
  { emojis: "🕹️👾", answer: "video game", hint: "digital entertainment" },
  { emojis: "🎭🎤", answer: "talent show", hint: "stage competition" },
  { emojis: "🧳✈️", answer: "travel", hint: "journey by air" },
  { emojis: "🐶🐾", answer: "dog walk", hint: "daily pet routine" },
  { emojis: "🍕🥤", answer: "pizza party", hint: "food and fun" },
  { emojis: "🌞😎", answer: "summer vibes", hint: "hot and chill mood" },
  { emojis: "📸🤳", answer: "selfie", hint: "photo of yourself" },

  { emojis: "🧊🐻", answer: "polar bear", hint: "lives in Arctic" },
  { emojis: "💎👑", answer: "royalty", hint: "king or queen" },
  { emojis: "💤☕", answer: "need coffee", hint: "morning struggle" },
  { emojis: "🦸‍♂️🕸️", answer: "spiderman", hint: "marvel hero" },
  { emojis: "🐭🧀", answer: "tom and jerry", hint: "cartoon duo" },
  { emojis: "🦄🌈", answer: "unicorn", hint: "magical creature" },
  { emojis: "🚀🌕", answer: "moon mission", hint: "space travel" },
  { emojis: "🎧🎶", answer: "headphones", hint: "for private listening" },
  { emojis: "🌌🔭", answer: "stargazing", hint: "night sky hobby" },
  { emojis: "🛍️💳", answer: "shopping spree", hint: "lots of buying" },

  { emojis: "🕰️📖", answer: "time travel", hint: "past or future journey" },
  { emojis: "🐢🏁", answer: "slow and steady", hint: "wins the race" },
  { emojis: "🧠🤔", answer: "thinking", hint: "mental process" },
  { emojis: "💰🏦", answer: "bank", hint: "money place" },
  { emojis: "🎤🔥", answer: "rap battle", hint: "musical showdown" },
  { emojis: "🥇🏃‍♀️", answer: "first place", hint: "winner spot" },
  { emojis: "📱🔋", answer: "low battery", hint: "need charging" },
  { emojis: "🌧️☂️", answer: "rainy day", hint: "umbrella time" },
  { emojis: "🪄✨", answer: "magic", hint: "illusion or spell" },
  { emojis: "🎁🎅", answer: "christmas gift", hint: "holiday present" }
];


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let shuffledRiddles = shuffle([...riddles]);
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
  const r = shuffledRiddles[current];
  emojis.textContent = r.emojis;
  hintBox.classList.add("hidden");
  feedback.classList.add("hidden");
  input.value = "";
  progress.textContent = `${current + 1}/${shuffledRiddles.length}`;
  tries.textContent = attempts;
  scoreDisplay.textContent = score;
}


function checkAnswer() {
  const user = input.value.toLowerCase().trim().replace(/[^a-z\s]/g, "");
  const correct = shuffledRiddles[current].answer.toLowerCase().replace(/[^a-z\s]/g, "");

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
  if (current < shuffledRiddles.length - 1) {
    current++;
    attempts = 3;
    loadRiddle();
  } else {
    endGame();
  }
}


function showHint() {
  hintBox.textContent = `💡 ${shuffledRiddles[current].hint}`;
  hintBox.classList.remove("hidden");
}

function endGame() {
  game.classList.add("hidden");
  gameOver.classList.remove("hidden");
  const percent = (score / shuffledRiddles.length) * 100;
  finalScore.textContent = `${score}/${shuffledRiddles.length}`;

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
  shuffledRiddles = shuffle([...riddles]); // reshuffle on restart
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
