// ------------------------------
// KLONDIKE SOLITAIRE SCRIPT.JS
// ------------------------------

let tableau = [];
let foundations = [[], [], [], []];
let stock = [];
let waste = [];
let moveHistory = [];
let moves = 0;
let timerInterval = null;
let seconds = 0;

// ------------------------------
// CARD SETUP
// ------------------------------
const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

// Create a deck
function createDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value, faceUp: false });
        }
    }
    return deck;
}

// Shuffle deck
function shuffle(deck) {
    for (let i = deck.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// ------------------------------
// GAME SETUP
// ------------------------------
function setupGame() {
    const deck = createDeck();
    shuffle(deck);

    tableau = [];
    for (let i = 0; i < 7; i++) {
        tableau[i] = [];
        for (let j = 0; j <= i; j++) {
            const card = deck.pop();
            card.faceUp = j === i;
            tableau[i].push(card);
        }
    }

    stock = deck;
    waste = [];
    foundations = [[], [], [], []];
    moveHistory = [];
    moves = 0;
    seconds = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        updateTimer();
    }, 1000);

    renderAll();
}

// ------------------------------
// RENDER FUNCTIONS
// ------------------------------
function renderAll() {
    renderTableau();
    renderStock();
    renderWaste();
    renderFoundations();
    updateMoves();
}

function symbol(suit) {
    return suit === "hearts" ? "♥" :
           suit === "diamonds" ? "♦" :
           suit === "clubs" ? "♣" : "♠";
}

function renderTableau() {
    const tableauEls = document.querySelectorAll("#tableau .pile");
    tableauEls.forEach((pileEl, i) => {
        pileEl.innerHTML = "";
        tableau[i].forEach((card, j) => {
            const div = document.createElement("div");
            div.className = `card ${card.faceUp ? "" : "back"} ${["hearts","diamonds"].includes(card.suit) ? "red" : ""}`;
            div.textContent = card.faceUp ? `${card.value}${symbol(card.suit)}` : "";
            div.style.top = `${j * 25}px`;
            div.style.zIndex = j;
            pileEl.appendChild(div);

            if (card.faceUp) makeCardDraggable(div, i, j);
        });
        makePileDroppable(pileEl, i);
    });
}

function renderStock() {
    const stockEl = document.getElementById("stock");
    stockEl.innerHTML = stock.length ? "🂠" : "";
}

function renderWaste() {
    const wasteEl = document.getElementById("waste");
    wasteEl.innerHTML = "";
    if (waste.length) {
        const card = waste[waste.length-1];
        const div = document.createElement("div");
        div.className = `card ${["hearts","diamonds"].includes(card.suit) ? "red" : ""}`;
        div.textContent = `${card.value}${symbol(card.suit)}`;
        div.draggable = true;
        div.addEventListener("dragstart", e => {
            dragged = div;
            dragStartPile = "waste";
            dragStartIndex = waste.length-1;
            e.dataTransfer.setData("text/plain","");
        });
        wasteEl.appendChild(div);
    }
}

function renderFoundations() {
    const foundationEls = document.querySelectorAll("#foundations .pile");
    foundationEls.forEach((pileEl, i) => {
        pileEl.innerHTML = "";
        const card = foundations[i][foundations[i].length-1];
        if (card) {
            const div = document.createElement("div");
            div.className = `card ${["hearts","diamonds"].includes(card.suit) ? "red" : ""}`;
            div.textContent = `${card.value}${symbol(card.suit)}`;
            pileEl.appendChild(div);
        }
    });
}

function updateMoves() {
    document.getElementById("moves").textContent = `Moves: ${moves}`;
}

function updateTimer() {
    const min = Math.floor(seconds/60).toString().padStart(2,"0");
    const sec = (seconds%60).toString().padStart(2,"0");
    document.getElementById("timer").textContent = `${min}:${sec}`;
}

// ------------------------------
// DRAG & DROP
// ------------------------------
let dragged = null;
let dragStartPile = null;
let dragStartIndex = null;

function makeCardDraggable(cardDiv, pileIdx, cardIdx) {
    cardDiv.draggable = true;
    cardDiv.addEventListener("dragstart", e => {
        dragged = cardDiv;
        dragStartPile = pileIdx;
        dragStartIndex = cardIdx;
        e.dataTransfer.setData("text/plain", "");
        e.dataTransfer.effectAllowed = "move";
    });
    cardDiv.addEventListener("dragend", () => {
        dragged = null;
        dragStartPile = null;
        dragStartIndex = null;
    });
}

function makePileDroppable(pileEl, targetPileIdx) {
    pileEl.addEventListener("dragover", e => e.preventDefault());
    pileEl.addEventListener("drop", e => {
        e.preventDefault();
        if (!dragged) return;

        let movingCards;
        if (dragStartPile === "waste") {
            movingCards = waste.splice(dragStartIndex);
        } else {
            movingCards = tableau[dragStartPile].splice(dragStartIndex);
        }

        const topTarget = tableau[targetPileIdx][tableau[targetPileIdx].length-1];
        if (isValidTableauMove(movingCards[0], topTarget)) {
            tableau[targetPileIdx].push(...movingCards);
            if (dragStartPile !== "waste" && tableau[dragStartPile].length)
                tableau[dragStartPile][tableau[dragStartPile].length-1].faceUp = true;

            moveHistory.push({ type: "tableau", fromPile: dragStartPile, fromIndex: dragStartIndex, toPile: targetPileIdx, count: movingCards.length });
            moves++;
            updateMoves();
            renderAll();
            checkWin();
        } else {
            // revert
            if (dragStartPile === "waste") waste.push(...movingCards);
            else tableau[dragStartPile].push(...movingCards);
        }

        dragged = null;
    });
}

// ------------------------------
// VALID MOVE CHECK
// ------------------------------
function isValidTableauMove(card, topCard) {
    if (!card) return false;
    if (!topCard) return card.value === "K";
    const valDiff = values.indexOf(topCard.value) - values.indexOf(card.value);
    const colorsDiffer = (["hearts","diamonds"].includes(topCard.suit)) !== (["hearts","diamonds"].includes(card.suit));
    return valDiff === 1 && colorsDiffer;
}

// ------------------------------
// STOCK & WASTE
// ------------------------------
document.getElementById("stock").addEventListener("click", () => {
    if (!stock.length) {
        stock = waste.reverse().map(c => ({...c, faceUp: false}));
        waste = [];
    } else {
        const card = stock.pop();
        card.faceUp = true;
        waste.push(card);
    }
    moves++;
    updateMoves();
    renderAll();
});

// ------------------------------
// UNDO
// ------------------------------
document.getElementById("undo").addEventListener("click", () => {
    if (!moveHistory.length) return;
    const last = moveHistory.pop();
    if (last.type === "tableau") {
        const movingCards = tableau[last.toPile].splice(-last.count);
        if (last.fromPile === "waste") waste.push(...movingCards);
        else tableau[last.fromPile].splice(last.fromIndex,0,...movingCards);
    }
    moves++;
    updateMoves();
    renderAll();
});

// ------------------------------
// WIN CHECK
// ------------------------------
function checkWin() {
    if (foundations.every(f => f.length === 13)) {
        clearInterval(timerInterval);
        setTimeout(()=>alert(`You won in ${moves} moves and ${seconds} seconds! 🎉`),100);
    }
}

// ------------------------------
// INIT
// ------------------------------
setupGame();
