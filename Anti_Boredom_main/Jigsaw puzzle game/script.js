// Game State
let difficulty = null;
let gridSize = 0;
let pieces = [];
let selectedPiece = null;
let moves = 0;
let timer = 0;
let timerInterval = null;
let isRunning = false;
let isComplete = false;
let bestTime = null;
let currentImage = null;

// Available images (nature landscapes)
const images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', // Mountain landscape
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80', // Forest
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80', // Nature scene
];

const gridSizes = {
    easy: 3,
    medium: 4,
    hard: 5
};

// DOM Elements
const difficultyScreen = document.getElementById('difficultyScreen');
const gameScreen = document.getElementById('gameScreen');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const changeLevelBtn = document.getElementById('changeLevelBtn');
const newGameBtn = document.getElementById('newGameBtn');
const mainMenuBtn = document.getElementById('mainMenuBtn');
const puzzleBoard = document.getElementById('puzzleBoard');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const bestTimeDisplay = document.getElementById('bestTime');
const bestTimeValue = document.getElementById('bestTimeValue');
const bestTimeContainer = document.getElementById('bestTimeDisplay');
const completionScreen = document.getElementById('completionScreen');
const finalTime = document.getElementById('finalTime');
const finalMoves = document.getElementById('finalMoves');
const newBestMessage = document.getElementById('newBestMessage');

// Initialize game
function init() {
    loadBestTime();
    
    difficultyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.getAttribute('data-level');
            startGame(level);
        });
    });

    changeLevelBtn.addEventListener('click', showDifficultyScreen);
    mainMenuBtn.addEventListener('click', showDifficultyScreen);
    newGameBtn.addEventListener('click', () => startGame(difficulty));
}

// Load best time from localStorage
function loadBestTime() {
    const saved = localStorage.getItem('jigsawBestTime');
    if (saved) {
        bestTime = parseInt(saved);
        bestTimeValue.textContent = formatTime(bestTime);
        bestTimeDisplay.textContent = formatTime(bestTime);
        bestTimeContainer.classList.remove('hidden');
    }
}

// Save best time to localStorage
function saveBestTime() {
    localStorage.setItem('jigsawBestTime', bestTime.toString());
}

// Start game with selected difficulty
function startGame(level) {
    difficulty = level;
    gridSize = gridSizes[level];
    
    // Select random image
    currentImage = images[Math.floor(Math.random() * images.length)];
    
    // Reset game state
    moves = 0;
    timer = 0;
    isComplete = false;
    selectedPiece = null;
    
    // Update UI
    movesDisplay.textContent = moves;
    timerDisplay.textContent = formatTime(timer);
    completionScreen.classList.add('hidden');
    
    // Initialize puzzle
    initializePuzzle();
    
    // Show game screen
    difficultyScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    // Start timer
    startTimer();
}

// Initialize puzzle pieces
function initializePuzzle() {
    const totalPieces = gridSize * gridSize;
    pieces = [];
    
    // Create pieces array
    for (let i = 0; i < totalPieces; i++) {
        pieces.push({
            id: i,
            currentPos: i,
            correctPos: i
        });
    }
    
    // Shuffle pieces
    shufflePieces();
    
    // Render puzzle
    renderPuzzle();
}

// Shuffle pieces
function shufflePieces() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
    
    // Update current positions
    pieces.forEach((piece, index) => {
        piece.currentPos = index;
    });
}

// Render puzzle board
function renderPuzzle() {
    puzzleBoard.innerHTML = '';
    puzzleBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    
    pieces.forEach((piece, index) => {
        const pieceElement = createPieceElement(piece, index);
        puzzleBoard.appendChild(pieceElement);
    });
}

// Create puzzle piece element
function createPieceElement(piece, index) {
    const pieceElement = document.createElement('div');
    pieceElement.className = 'puzzle-piece';
    pieceElement.dataset.index = index;
    
    // Calculate background position
    const row = Math.floor(piece.correctPos / gridSize);
    const col = piece.correctPos % gridSize;
    const pieceSize = 100 / gridSize;
    
    pieceElement.style.backgroundImage = `url(${currentImage})`;
    pieceElement.style.backgroundSize = `${gridSize * 100}% ${gridSize * 100}%`;
    pieceElement.style.backgroundPosition = `-${col * pieceSize}% -${row * pieceSize}%`;
    
    // Check if piece is in correct position
    if (piece.currentPos === piece.correctPos) {
        pieceElement.classList.add('correct');
    }
    
    // Add click event
    pieceElement.addEventListener('click', () => handlePieceClick(index));
    
    return pieceElement;
}

// Handle piece click
function handlePieceClick(index) {
    if (isComplete) return;
    
    if (selectedPiece === null) {
        // Select first piece
        selectedPiece = index;
        const pieceElements = document.querySelectorAll('.puzzle-piece');
        pieceElements[index].classList.add('selected');
    } else if (selectedPiece === index) {
        // Deselect piece
        const pieceElements = document.querySelectorAll('.puzzle-piece');
        pieceElements[index].classList.remove('selected');
        selectedPiece = null;
    } else {
        // Swap pieces
        swapPieces(selectedPiece, index);
        selectedPiece = null;
    }
}

// Swap two pieces
function swapPieces(index1, index2) {
    // Swap in array
    [pieces[index1], pieces[index2]] = [pieces[index2], pieces[index1]];
    
    // Update positions
    pieces[index1].currentPos = index1;
    pieces[index2].currentPos = index2;
    
    // Increment moves
    moves++;
    movesDisplay.textContent = moves;
    
    // Re-render puzzle
    renderPuzzle();
    
    // Check if puzzle is complete
    checkCompletion();
}

// Check if puzzle is complete
function checkCompletion() {
    const allCorrect = pieces.every(piece => piece.currentPos === piece.correctPos);
    
    if (allCorrect) {
        isComplete = true;
        stopTimer();
        showCompletion();
    }
}

// Show completion screen
function showCompletion() {
    finalTime.textContent = formatTime(timer);
    finalMoves.textContent = moves;
    
    // Check for new best time
    if (!bestTime || timer < bestTime) {
        bestTime = timer;
        bestTimeDisplay.textContent = formatTime(bestTime);
        bestTimeValue.textContent = formatTime(bestTime);
        saveBestTime();
        newBestMessage.classList.remove('hidden');
        bestTimeContainer.classList.remove('hidden');
    } else {
        newBestMessage.classList.add('hidden');
    }
    
    completionScreen.classList.remove('hidden');
}

// Start timer
function startTimer() {
    isRunning = true;
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = formatTime(timer);
    }, 1000);
}

// Stop timer
function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
}

// Format time (seconds to mm:ss)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Show difficulty screen
function showDifficultyScreen() {
    stopTimer();
    gameScreen.classList.add('hidden');
    difficultyScreen.classList.remove('hidden');
    difficulty = null;
}

// Initialize on page load
init();