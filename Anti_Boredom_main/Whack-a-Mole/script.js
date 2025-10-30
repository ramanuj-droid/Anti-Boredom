// Game State
let score = 0;
let timeLeft = 30;
let gameStarted = false;
let gameOver = false;
let highScore = 0;
let activeMoleIndex = null;
let moleTimeout = null;
let gameInterval = null;

// DOM Elements
const scoreElement = document.getElementById('score');
const timeLeftElement = document.getElementById('timeLeft');
const highScoreElement = document.getElementById('highScore');
const startButton = document.getElementById('startButton');
const playAgainButton = document.getElementById('playAgainButton');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreElement = document.getElementById('finalScore');
const newHighScoreElement = document.getElementById('newHighScore');
const helpText = document.getElementById('helpText');
const holes = document.querySelectorAll('.hole');

// Load high score from localStorage
function loadHighScore() {
    const savedHighScore = localStorage.getItem('whackAMoleHighScore');
    if (savedHighScore) {
        highScore = parseInt(savedHighScore);
        highScoreElement.textContent = highScore;
    }
}

// Save high score to localStorage
function saveHighScore() {
    localStorage.setItem('whackAMoleHighScore', highScore.toString());
}

// Initialize game
function init() {
    loadHighScore();
    startButton.addEventListener('click', startGame);
    playAgainButton.addEventListener('click', startGame);
    
    holes.forEach((hole, index) => {
        hole.addEventListener('click', () => whackMole(index));
    });
}

// Start the game
function startGame() {
    // Reset game state
    score = 0;
    timeLeft = 30;
    gameStarted = true;
    gameOver = false;
    activeMoleIndex = null;
    
    // Update UI
    scoreElement.textContent = score;
    timeLeftElement.textContent = `${timeLeft}s`;
    startButton.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    helpText.classList.remove('hidden');
    
    // Clear any active moles
    holes.forEach(hole => {
        hole.classList.remove('active', 'whacked');
    });
    
    // Start game timer
    gameInterval = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = `${timeLeft}s`;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    // Show first mole
    showRandomMole();
}

// Show a random mole
function showRandomMole() {
    if (!gameStarted || gameOver) return;
    
    // Clear previous mole
    if (activeMoleIndex !== null) {
        holes[activeMoleIndex].classList.remove('active');
    }
    
    // Random hole selection
    const randomIndex = Math.floor(Math.random() * holes.length);
    activeMoleIndex = randomIndex;
    
    // Show mole
    holes[randomIndex].classList.add('active');
    holes[randomIndex].classList.remove('whacked');
    
    // Random duration (500ms to 1200ms)
    const duration = Math.random() * 700 + 500;
    
    // Hide mole after duration
    moleTimeout = setTimeout(() => {
        if (activeMoleIndex === randomIndex) {
            holes[randomIndex].classList.remove('active');
            activeMoleIndex = null;
        }
        showRandomMole();
    }, duration);
}

// Whack a mole
function whackMole(index) {
    if (!gameStarted || gameOver) return;
    
    const hole = holes[index];
    
    // Check if this is the active mole and hasn't been whacked
    if (activeMoleIndex === index && hole.classList.contains('active')) {
        // Increase score
        score++;
        scoreElement.textContent = score;
        
        // Show whack effect
        hole.classList.remove('active');
        hole.classList.add('whacked');
        
        // Clear the timeout and show next mole
        clearTimeout(moleTimeout);
        activeMoleIndex = null;
        
        setTimeout(() => {
            hole.classList.remove('whacked');
            showRandomMole();
        }, 200);
    }
}

// End the game
function endGame() {
    gameOver = true;
    gameStarted = false;
    
    // Clear timers
    clearInterval(gameInterval);
    clearTimeout(moleTimeout);
    
    // Hide all moles
    holes.forEach(hole => {
        hole.classList.remove('active', 'whacked');
    });
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        saveHighScore();
        newHighScoreElement.classList.remove('hidden');
    } else {
        newHighScoreElement.classList.add('hidden');
    }
    
    // Show game over screen
    finalScoreElement.textContent = score;
    gameOverScreen.classList.remove('hidden');
    helpText.classList.add('hidden');
}

// Initialize the game when page loads
init();