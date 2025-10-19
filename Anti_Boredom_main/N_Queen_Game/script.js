const boardContainer = document.getElementById("board");
const levelSelect = document.getElementById("level");
const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");

let N = 4;
let board = [];

startBtn.addEventListener("click", () => {
    N = parseInt(levelSelect.value);
    board = Array(N).fill(null).map(() => Array(N).fill(0));
    renderBoard();
    message.textContent = "";
});

function renderBoard() {
    boardContainer.innerHTML = "";
    boardContainer.style.gridTemplateColumns = `repeat(${N}, 40px)`;
    boardContainer.style.gridTemplateRows = `repeat(${N}, 40px)`;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add((i + j) % 2 === 0 ? "white" : "black");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.textContent = board[i][j] === 1 ? "♛" : "";
            cell.addEventListener("click", placeQueen);
            boardContainer.appendChild(cell);
        }
    }
}

function placeQueen(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    if (board[row][col] === 1) {
        board[row][col] = 0;
    } else {
        if (isSafe(row, col)) {
            board[row][col] = 1;
        } else {
            alert("Cannot place queen here!");
        }
    }
    renderBoard();
    if (checkWin()) {
        message.textContent = "🎉 Congratulations! You solved the board!";
    }
}

function isSafe(row, col) {
    // Check column
    for (let i = 0; i < N; i++) {
        if (board[i][col] === 1) return false;
    }
    // Check row
    for (let j = 0; j < N; j++) {
        if (board[row][j] === 1) return false;
    }
    // Check diagonals
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] === 1 && Math.abs(row - i) === Math.abs(col - j)) return false;
        }
    }
    return true;
}

function checkWin() {
    let count = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] === 1) count++;
        }
    }
    return count === N;
}
