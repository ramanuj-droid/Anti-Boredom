const quoteDisplay = document.getElementById("quote-display");
const quoteInput = document.getElementById("quote-input");
const startButton = document.getElementById("start-button");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Never underestimate the power of a good book.",
  "Practice makes perfect, especially when typing.",
  "The early bird catches the worm, but the second mouse gets the cheese.",
  "Coding is like magic, but with more debugging.",
];

let currentQuote = "";
let startTime;
let timerInterval;
let charIndex = 0;
let correctChars = 0;
let totalCharsTyped = 0;

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function renderNewQuote() {
  currentQuote = getRandomQuote();
  quoteDisplay.innerHTML = ""; // Clear previous quote

  currentQuote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    quoteDisplay.appendChild(charSpan);
  });

  // Reset for new test
  quoteInput.value = "";
  quoteInput.disabled = false;
  quoteInput.classList.add("active"); // Make input visible
  quoteInput.focus();
  startButton.innerText = "Reset"; // Changed button text to be more Monkeytype-like
  timeDisplay.innerText = "0s";
  wpmDisplay.innerText = "0";
  accuracyDisplay.innerText = "0%";
  charIndex = 0;
  correctChars = 0;
  totalCharsTyped = 0;
  clearInterval(timerInterval); // Clear any existing timer
  highlightCurrentChar();
}

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    timeDisplay.innerText = `${elapsedTime}s`;
  }, 1000);
}

function calculateWPM() {
  const elapsedTimeInMinutes = (new Date() - startTime) / 1000 / 60;
  if (elapsedTimeInMinutes <= 0 || isNaN(elapsedTimeInMinutes)) return 0; // Handle division by zero or invalid time
  // WPM = (Number of correct characters / 5) / Time taken in minutes
  const wordsTyped = correctChars / 5;
  return Math.round(wordsTyped / elapsedTimeInMinutes);
}

function calculateAccuracy() {
  if (totalCharsTyped === 0) return 0;
  return Math.round((correctChars / totalCharsTyped) * 100);
}

function highlightCurrentChar() {
  const spans = quoteDisplay.querySelectorAll("span");
  spans.forEach((span, index) => {
    span.classList.remove("current", "correct", "incorrect");
    // Re-apply correct/incorrect based on current input
    if (index < charIndex) {
      if (quoteInput.value[index] === currentQuote[index]) {
        span.classList.add("correct");
      } else {
        span.classList.add("incorrect");
      }
    } else if (index === charIndex) {
      span.classList.add("current");
    }
  });
}

function finishTest() {
  clearInterval(timerInterval);
  quoteInput.disabled = true;
  quoteInput.classList.remove("active"); // Hide input again
  startButton.innerText = "New Test"; // Changed button text
  wpmDisplay.innerText = calculateWPM();
  accuracyDisplay.innerText = calculateAccuracy() + "%";
  // Ensure all remaining chars are greyed out if test finished prematurely
  const spans = quoteDisplay.querySelectorAll("span");
  spans.forEach((span, index) => {
    if (index >= charIndex) {
      span.classList.remove("current"); // Remove current highlight from any remaining chars
    }
  });
}

quoteInput.addEventListener("input", () => {
  if (!startTime) {
    // Start timer only on first input
    startTimer();
  }

  const typedValue = quoteInput.value;
  totalCharsTyped = typedValue.length;

  charIndex = typedValue.length;
  correctChars = 0;

  const spans = quoteDisplay.querySelectorAll("span");
  let hasMistake = false;

  spans.forEach((charSpan, index) => {
    const char = currentQuote[index];
    const typedChar = typedValue[index];

    if (typedChar == null) {
      // User hasn't typed this far yet
      charSpan.classList.remove("correct", "incorrect", "current");
    } else if (typedChar === char) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect", "current");
      correctChars++;
    } else {
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct", "current");
      hasMistake = true;
    }

    // Highlight the next character to type
    if (
      index === typedValue.length &&
      typedValue.length < currentQuote.length
    ) {
      charSpan.classList.add("current");
    } else {
      charSpan.classList.remove("current");
    }
  });

  // If all correct and quote length matched, finish test
  if (typedValue.length === currentQuote.length) {
    finishTest();
  } else if (typedValue.length > currentQuote.length) {
    // Prevent typing beyond the quote length and finish
    quoteInput.value = typedValue.substring(0, currentQuote.length);
    finishTest();
  }

  // Update WPM and Accuracy continuously
  wpmDisplay.innerText = calculateWPM();
  accuracyDisplay.innerText = calculateAccuracy() + "%";
});

startButton.addEventListener("click", () => {
  // Only render new quote if the button is 'Start Test' or 'Reset'
  if (
    startButton.innerText === "Start Test" ||
    startButton.innerText === "Reset" ||
    startButton.innerText === "New Test"
  ) {
    renderNewQuote();
    startTime = null; // Reset startTime to null
    clearInterval(timerInterval);
    timeDisplay.innerText = "0s";
    wpmDisplay.innerText = "0";
    accuracyDisplay.innerText = "0%";
  }
});

// Initial setup
renderNewQuote(); // Display a quote when the page loads
quoteInput.disabled = true; // Disable input until 'Start Test' is clicked
quoteInput.classList.remove("active"); // Ensure input is hidden initially
startButton.innerText = "Start Test"; // Set initial button text
