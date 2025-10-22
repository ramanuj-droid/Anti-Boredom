const quoteDisplay = document.getElementById("quote-display");
const quoteInput = document.getElementById("quote-input");
const startButton = document.getElementById("start-button");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const stopOnMistakeCheckbox = document.getElementById(
  "stop-on-mistake-checkbox"
);
const quoteScrollContainer = document.getElementById("quote-scroll-container"); // Get the scroll container

const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Never underestimate the power of a good book, it can transport you to different worlds and introduce you to unforgettable characters.",
  "Practice makes perfect, especially when typing, consistency and focus are key to improving your speed and accuracy over time.",
  "The early bird catches the worm, but the second mouse gets the cheese, illustrating that sometimes patience and strategy can yield better results.",
  "Coding is like magic, but with more debugging, it requires logical thinking, problem-solving skills, and a good understanding of algorithms and data structures to create robust and efficient applications.",
  "The sun always shines brightest after the rain has cleared, reminding us that difficult times often lead to periods of growth and clarity.",
  "Technology has revolutionized the way we live, work, and interact, connecting people across vast distances and opening up new possibilities for innovation.",
];

let currentQuote = "";
let startTime;
let timerInterval;
let charIndex = 0;
let correctChars = 0;
let totalCharsTyped = 0; // Tracks actual characters user typed (including backspaces and errors)
let errors = 0;
let hasStartedTyping = false; // To prevent timer starting before first valid input

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

  // Reset all states
  quoteInput.value = "";
  quoteInput.disabled = false;
  quoteInput.classList.add("active"); // Make input visible
  quoteInput.focus();
  startButton.innerText = "Reset";
  timeDisplay.innerText = "0s";
  wpmDisplay.innerText = "0";
  accuracyDisplay.innerText = "0%";
  charIndex = 0;
  correctChars = 0;
  totalCharsTyped = 0;
  errors = 0;
  hasStartedTyping = false;
  clearInterval(timerInterval);
  highlightCurrentChar();
  quoteDisplay.style.transform = "translateY(0)"; // Reset scroll position
}

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    timeDisplay.innerText = `${elapsedTime}s`;
    if (hasStartedTyping) {
      // Only update WPM/Acc if typing has actually started
      wpmDisplay.innerText = calculateWPM();
      accuracyDisplay.innerText = calculateAccuracy() + "%";
    }
  }, 1000);
}

// Net WPM calculation (common in typing tests)
function calculateWPM() {
  const elapsedTimeInMinutes = (new Date() - startTime) / 1000 / 60;
  if (
    elapsedTimeInMinutes <= 0 ||
    isNaN(elapsedTimeInMinutes) ||
    !hasStartedTyping
  )
    return 0;

  // Gross WPM: (Correct Characters / 5) / Time in minutes
  // Net WPM: ((Total Typed Characters - Errors) / 5) / Time in minutes
  // Or, more commonly, just use correct characters for accurate words
  const wordsTyped = correctChars / 5; // A "word" is 5 characters
  return Math.max(0, Math.round(wordsTyped / elapsedTimeInMinutes)); // WPM can't be negative
}

function calculateAccuracy() {
  if (totalCharsTyped === 0) return 0;
  return Math.round(((totalCharsTyped - errors) / totalCharsTyped) * 100);
}

function highlightCurrentChar() {
  const spans = quoteDisplay.querySelectorAll("span");
  spans.forEach((span, index) => {
    // Clear all previous state classes
    span.classList.remove("current", "correct", "incorrect");

    if (index < charIndex) {
      // These characters have been typed
      if (quoteInput.value[index] === currentQuote[index]) {
        span.classList.add("correct");
      } else {
        span.classList.add("incorrect");
      }
    } else if (index === charIndex && charIndex < currentQuote.length) {
      // This is the current character to type
      span.classList.add("current");
      // If the current character was previously typed incorrectly and then backspaced,
      // we might want its text color to revert to untyped-color, but its cursor state is `current`.
      // The CSS now handles the `current` text color as `untyped-color` by default.
      // If it was already correct due to a backspace, that's handled by other CSS rules.
    }
    // Characters beyond charIndex naturally remain as default (untyped-color) as no classes are added
  });

  scrollToCurrentChar();
}

function scrollToCurrentChar() {
  const currentSpan = quoteDisplay.querySelector(".current");
  if (!currentSpan) return;

  const containerRect = quoteScrollContainer.getBoundingClientRect();
  const spanRect = currentSpan.getBoundingClientRect();

  // Calculate how much the quoteDisplay needs to shift
  // Only scroll if the current char is out of bounds vertically
  if (
    spanRect.top < containerRect.top ||
    spanRect.bottom > containerRect.bottom
  ) {
    const currentTransformY = parseFloat(
      quoteDisplay.style.transform
        .replace("translateY(", "")
        .replace("px)", "") || "0"
    );
    let newScrollY =
      currentTransformY -
      (spanRect.top - containerRect.top - containerRect.height / 3); // Adjust to keep it roughly 1/3 down from top

    // Prevent scrolling too far up (past the beginning of the quote)
    newScrollY = Math.min(0, newScrollY);

    // Prevent scrolling too far down
    const quoteDisplayHeight = quoteDisplay.scrollHeight;
    const maxScrollDown =
      quoteScrollContainer.clientHeight - quoteDisplayHeight;
    if (maxScrollDown < 0) {
      // Only if quote is actually taller than container
      newScrollY = Math.max(maxScrollDown, newScrollY);
    } else {
      // If quote is shorter, don't scroll
      newScrollY = 0;
    }

    quoteDisplay.style.transform = `translateY(${newScrollY}px)`;
  }
}

function finishTest() {
  clearInterval(timerInterval);
  quoteInput.disabled = true;
  quoteInput.classList.remove("active"); // Hide input again
  startButton.innerText = "New Test";
  wpmDisplay.innerText = calculateWPM();
  accuracyDisplay.innerText = calculateAccuracy() + "%";
  hasStartedTyping = false;

  // Ensure all remaining chars are greyed out if test finished prematurely
  const spans = quoteDisplay.querySelectorAll("span");
  spans.forEach((span, index) => {
    if (index >= charIndex) {
      span.classList.remove("current"); // Remove current highlight from any remaining chars
    }
  });
}

quoteInput.addEventListener("input", (e) => {
  if (!hasStartedTyping) {
    startTimer();
    hasStartedTyping = true;
  }

  const typedValue = quoteInput.value;
  const currentTargetChar = currentQuote[charIndex]; // The character we are supposed to type next
  const lastTypedChar = typedValue[typedValue.length - 1]; // The most recent character typed

  // --- Error Handling Logic ---
  // If user backspaces, charIndex decreases, errors might need to be re-evaluated
  // A more precise error calculation involves comparing `typedValue` against `currentQuote`

  let currentErrors = 0;
  let currentCorrectChars = 0;
  for (let i = 0; i < typedValue.length; i++) {
    if (typedValue[i] === currentQuote[i]) {
      currentCorrectChars++;
    } else {
      currentErrors++;
    }
  }

  correctChars = currentCorrectChars;
  errors = currentErrors;
  totalCharsTyped = typedValue.length;

  charIndex = typedValue.length; // Update charIndex to the current input length

  // Update visual highlighting
  highlightCurrentChar();

  // Check for "Stop on First Mistake" mode
  if (stopOnMistakeCheckbox.checked && errors > 0) {
    quoteInput.disabled = true;
    finishTest();
    return; // Stop further processing if mistake made and mode is active
  }

  // Check if test is finished
  if (charIndex >= currentQuote.length) {
    // If they typed beyond the quote, trim it (like Monkeytype)
    if (typedValue.length > currentQuote.length) {
      quoteInput.value = typedValue.substring(0, currentQuote.length);
    }
    finishTest();
  }

  // Update WPM and Accuracy continuously
  wpmDisplay.innerText = calculateWPM();
  accuracyDisplay.innerText = calculateAccuracy() + "%";
});

startButton.addEventListener("click", () => {
  // Only render new quote if the button is 'Start Test' or 'Reset' or 'New Test'
  if (
    startButton.innerText === "Start Test" ||
    startButton.innerText === "Reset" ||
    startButton.innerText === "New Test"
  ) {
    renderNewQuote();
  }
});

// Initial setup
renderNewQuote(); // Display a quote when the page loads
quoteInput.disabled = true; // Disable input until 'Start Test' is clicked
quoteInput.classList.remove("active"); // Ensure input is hidden initially
startButton.innerText = "Start Test"; // Set initial button text
