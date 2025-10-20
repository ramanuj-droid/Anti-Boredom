// Chess Puzzle Game Logic
const BOARD_SIZE = 8;
let currentPiece = 'queen';
let board = [];
let placedPieces = [];
let currentChallenge = '8-queens';

const pieceSymbols = {
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞'
};

const challenges = {
    '8-queens': { piece: 'queen', target: 8 },
    '8-rooks': { piece: 'rook', target: 8 },
    '14-bishops': { piece: 'bishop', target: 14 },
    'custom': { piece: 'queen', target: 8 }
};

// Initialize the game
function init() {
    createBoard();
    setupEventListeners();
    updateStats();
}

// Create chessboard
function createBoard() {
    const chessboard = document.getElementById('chessboard');
    chessboard.innerHTML = '';
    board = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
        board[row] = [];
        for (let col = 0; col < BOARD_SIZE; col++) {
            const square = document.createElement('div');
            square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
            square.dataset.row = row;
            square.dataset.col = col;
            square.addEventListener('click', handleSquareClick);
            chessboard.appendChild(square);
            board[row][col] = null;
        }
    }
}

// Handle square click
function handleSquareClick(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    if (board[row][col]) {
        // Remove piece
        removePiece(row, col);
    } else {
        // Place piece
        placePiece(row, col, currentPiece);
    }

    updateBoard();
    updateStats();
    checkWin();
}

// Place piece on board
function placePiece(row, col, piece) {
    board[row][col] = piece;
    placedPieces.push({ row, col, piece });
}

// Remove piece from board
function removePiece(row, col) {
    board[row][col] = null;
    placedPieces = placedPieces.filter(p => !(p.row === row && p.col === col));
}

// Update board visual
function updateBoard() {
    const squares = document.querySelectorAll('.square');
    
    squares.forEach(square => {
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        const piece = board[row][col];

        // Reset classes
        square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
        square.textContent = '';

        // Show piece
        if (piece) {
            square.textContent = pieceSymbols[piece];
            square.classList.add('has-piece');
        }

        // Show attacked squares
        if (isAttacked(row, col)) {
            square.classList.add('attacked');
        }
    });
}

// Check if square is attacked
function isAttacked(targetRow, targetCol) {
    for (let piece of placedPieces) {
        if (piece.row === targetRow && piece.col === targetCol) continue;

        if (canAttack(piece.row, piece.col, targetRow, targetCol, piece.piece)) {
            return true;
        }
    }
    return false;
}

// Check if piece can attack target square
function canAttack(fromRow, fromCol, toRow, toCol, pieceType) {
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    switch (pieceType) {
        case 'queen':
            return fromRow === toRow || fromCol === toCol || rowDiff === colDiff;
        case 'rook':
            return fromRow === toRow || fromCol === toCol;
        case 'bishop':
            return rowDiff === colDiff;
        case 'knight':
            return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
        default:
            return false;
    }
}

// Count conflicts
function countConflicts() {
    let conflicts = 0;
    for (let piece of placedPieces) {
        if (isAttacked(piece.row, piece.col)) {
            conflicts++;
        }
    }
    return conflicts;
}

// Update stats
function updateStats() {
    document.getElementById('pieces-count').textContent = placedPieces.length;
    document.getElementById('conflicts-count').textContent = countConflicts();
}

// Check win condition
function checkWin() {
    const challenge = challenges[currentChallenge];
    const conflicts = countConflicts();
    
    if (placedPieces.length === challenge.target && conflicts === 0) {
        document.getElementById('chessboard').classList.add('success');
        setTimeout(() => {
            document.getElementById('success-modal').classList.remove('hidden');
        }, 500);
    }
}

// Reset board
function resetBoard() {
    board = [];
    placedPieces = [];
    createBoard();
    updateStats();
    document.getElementById('chessboard').classList.remove('success');
}

// Show hint (place one piece safely)
function showHint() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (!board[row][col] && !isAttacked(row, col)) {
                placePiece(row, col, currentPiece);
                updateBoard();
                updateStats();
                return;
            }
        }
    }
    alert('No safe positions available!');
}

// Show solution (8 queens example)
function showSolution() {
    resetBoard();
    // Classic 8-queens solution
    const solution = [
        [0, 0], [1, 4], [2, 7], [3, 5],
        [4, 2], [5, 6], [6, 1], [7, 3]
    ];

    solution.forEach(([row, col]) => {
        placePiece(row, col, currentPiece);
    });

    updateBoard();
    updateStats();
}

// Setup event listeners
function setupEventListeners() {
    // Piece selector
    document.querySelectorAll('.piece-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.piece-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentPiece = e.target.dataset.piece;
        });
    });

    // Challenge selector
    document.getElementById('challenge').addEventListener('change', (e) => {
        currentChallenge = e.target.value;
        const challenge = challenges[currentChallenge];
        currentPiece = challenge.piece;
        document.getElementById('target-count').textContent = challenge.target;
        resetBoard();
        
        // Update active piece button
        document.querySelectorAll('.piece-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`[data-piece="${currentPiece}"]`).classList.add('active');
    });

    // Control buttons
    document.getElementById('reset-btn').addEventListener('click', resetBoard);
    document.getElementById('hint-btn').addEventListener('click', showHint);
    document.getElementById('solve-btn').addEventListener('click', showSolution);

    // Modal buttons
    document.getElementById('next-challenge').addEventListener('click', () => {
        document.getElementById('success-modal').classList.add('hidden');
        const select = document.getElementById('challenge');
        const currentIndex = select.selectedIndex;
        if (currentIndex < select.options.length - 1) {
            select.selectedIndex = currentIndex + 1;
            select.dispatchEvent(new Event('change'));
        } else {
            resetBoard();
        }
    });

    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('success-modal').classList.add('hidden');
        resetBoard();
    });
}

// Initialize game when page loads
window.addEventListener('DOMContentLoaded', init);