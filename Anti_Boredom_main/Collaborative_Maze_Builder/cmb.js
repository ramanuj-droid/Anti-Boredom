window.initMazeApp = function(db, userId, appId, doc, setDoc, onSnapshot, collection, query) { 
            
            // --- Maze Constants and State ---
            const GRID_SIZE = 25; // 25x25 grid
            let mazeGrid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(1)); // 1=Wall, 0=Path
            
            // Ensure start and end cells are always path (0) on initial load for playability
            mazeGrid[0][0] = 0;
            mazeGrid[GRID_SIZE - 1][GRID_SIZE - 1] = 0;
            
            let hoverCoords = { row: -1, col: -1 }; 
            let players = {}; // Stores all other players' positions
            let playerColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
            
            let playerState = {
                row: 0,
                col: 0,
                mode: 'BUILD', // 'BUILD' or 'RACE'
                color: playerColor,
                lastMove: new Date().getTime()
            };
            
            // --- Confetti State and Constants ---
            let confettiInterval = null; 
            let confettiPieces = [];
            const CONFETTI_DURATION = 3000; // 3 seconds for animation
            const CONFETTI_COLORS = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff', '#fff'];


            // --- DOM Elements ---
            const canvas = document.getElementById('mazeCanvas');
            const ctx = canvas.getContext('2d');
            const statusMessage = document.getElementById('statusMessage');
            const userIdDisplay = document.getElementById('userIdDisplay');
            const clearBtn = document.getElementById('clearBtn');
            const resetBtn = document.getElementById('resetBtn');
            const randomizeBtn = document.getElementById('randomizeBtn');
            const raceModeBtn = document.getElementById('raceModeBtn');

            // --- Configuration ---
            const MAZE_DOC_PATH = db ? `artifacts/${appId}/public/data/mazes/master_maze` : null;
            const PLAYER_COLLECTION_PATH = db ? `artifacts/${appId}/public/data/players` : null;
            const PLAYER_DOC_PATH = db ? `${PLAYER_COLLECTION_PATH}/${userId}` : null;

            // Display user ID
            userIdDisplay.textContent = `User ID: ${userId}`;
            
            // --- Canvas Setup ---
            
            const container = document.getElementById('canvas-container');
            let CELL_SIZE;

            function resizeCanvas() {
                const size = container.offsetWidth;
                canvas.width = size;
                canvas.height = size;
                CELL_SIZE = size / GRID_SIZE;
                drawMaze();
            }

            // Initial resize and listener
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);


            // --- Confetti Logic ---

            class ConfettiPiece {
                constructor(x, y, color) {
                    this.x = x;
                    this.y = y;
                    this.size = Math.random() * 5 + 2;
                    this.color = color;
                    this.velocity = {
                        x: Math.random() * 4 - 2, // -2 to 2
                        y: Math.random() * -10 - 5 // Strong upward velocity
                    };
                    this.gravity = 0.5;
                    this.rotation = Math.random() * 360;
                    this.rotationSpeed = Math.random() * 10 - 5;
                    this.lifetime = CONFETTI_DURATION;
                }

                update() {
                    this.velocity.y += this.gravity;
                    this.x += this.velocity.x;
                    this.y += this.velocity.y;
                    this.rotation += this.rotationSpeed;
                    this.lifetime -= 16; // Approximation for 60 FPS update
                }

                draw(ctx) {
                    ctx.save();
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.rotation * Math.PI / 180);
                    ctx.fillStyle = this.color;
                    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                    ctx.restore();
                }
            }

            function generateConfetti() {
                confettiPieces = [];
                const NUM_CONFETTI = 100;
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;

                for (let i = 0; i < NUM_CONFETTI; i++) {
                    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
                    // Start confetti near the center of the canvas
                    confettiPieces.push(new ConfettiPiece(
                        centerX + (Math.random() * 100 - 50), 
                        centerY + (Math.random() * 100 - 50), 
                        color
                    ));
                }
            }

            function confettiAnimationLoop() {
                // 1. Draw the maze background first (clears previous frame)
                drawMaze(); 

                // 2. Update and draw confetti
                confettiPieces = confettiPieces.filter(p => p.lifetime > 0);
                
                if (confettiPieces.length > 0) {
                    for (const piece of confettiPieces) {
                        piece.update();
                        piece.draw(ctx);
                    }
                    confettiInterval = requestAnimationFrame(confettiAnimationLoop);
                } else {
                    // Stop animation if all pieces are gone
                    confettiInterval = null;
                }
            }

            function startConfetti() {
                // If running, stop and reset
                if (confettiInterval) {
                    cancelAnimationFrame(confettiInterval);
                    confettiInterval = null;
                }
                
                generateConfetti();
                
                // Start the loop
                confettiInterval = requestAnimationFrame(confettiAnimationLoop);

                // Stop after the duration
                setTimeout(() => {
                    if (confettiInterval) {
                        cancelAnimationFrame(confettiInterval);
                        confettiInterval = null;
                        drawMaze(); // Redraw static maze after confetti ends
                    }
                }, CONFETTI_DURATION);
            }


            // --- Drawing Functions ---

            function drawCell(row, col, value, isHovering = false) {
                const x = col * CELL_SIZE;
                const y = row * CELL_SIZE;

                // 1. Draw Cell Background (Path or Wall)
                ctx.fillStyle = value === 1 ? '#1d4ed8' : '#0f172a'; // Blue for Wall, Dark Blue/Black for Path
                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

                // 2. Draw Grid Lines
                ctx.strokeStyle = '#374151'; // Gray-600
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);

                // 3. Draw Hover Effect (Only in BUILD mode)
                if (isHovering && playerState.mode === 'BUILD') {
                    ctx.strokeStyle = '#facc15'; // Yellow-400
                    ctx.lineWidth = 3;
                    ctx.strokeRect(x + 1.5, y + 1.5, CELL_SIZE - 3, CELL_SIZE - 3);
                }
            }

            function drawPlayer(pState, pId) {
                if (pState.mode !== 'RACE') return; // Only draw players in RACE mode

                const isMe = pId === userId;
                
                const x = pState.col * CELL_SIZE + CELL_SIZE / 2;
                const y = pState.row * CELL_SIZE + CELL_SIZE / 2;
                const radius = CELL_SIZE * 0.35;

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = pState.color;
                ctx.fill();

                // Draw a distinct border for the local player
                if (isMe) {
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 3;
                    ctx.stroke();
                } else {
                    // Draw a subtle border for other players
                    ctx.strokeStyle = pState.color;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            function drawStartAndFinish() {
                // Start (Top Left)
                ctx.fillStyle = '#10b981'; // Green-500
                ctx.fillRect(0, 0, CELL_SIZE, CELL_SIZE);
                
                // Finish (Bottom Right)
                const finishX = (GRID_SIZE - 1) * CELL_SIZE;
                const finishY = (GRID_SIZE - 1) * CELL_SIZE;
                ctx.fillStyle = '#ef4444'; // Red-500
                ctx.fillRect(finishX, finishY, CELL_SIZE, CELL_SIZE);
            }

            function drawMaze() {
                if (!ctx) return;
                
                // 1. Draw all cells
                for (let r = 0; r < GRID_SIZE; r++) {
                    for (let c = 0; c < GRID_SIZE; c++) {
                        const isHover = (r === hoverCoords.row && c === hoverCoords.col);
                        drawCell(r, c, mazeGrid[r][c], isHover);
                    }
                }
                
                // 2. Draw Start and Finish cells
                drawStartAndFinish();

                // 3. Draw all players (including local player)
                // Filter out old states and draw
                const now = new Date().getTime();
                for (const pId in players) {
                    // Remove players who haven't moved in 10 seconds (or are in BUILD mode)
                    if (players[pId].mode === 'RACE' && (now - players[pId].lastMove < 10000 || pId === userId)) {
                        drawPlayer(players[pId], pId);
                    }
                }
                
                // 4. Draw the local player's state if in RACE mode (redundant with step 3 but guarantees local visibility if players list is empty)
                if (playerState.mode === 'RACE') {
                    drawPlayer(playerState, userId);
                }
            }

            // --- Firestore Synchronization ---

            /** Saves the current local maze state to Firestore. */
            async function saveMazeState() {
                if (!db || !MAZE_DOC_PATH || playerState.mode !== 'BUILD') return;
                
                const serializedMaze = JSON.stringify(mazeGrid);

                try {
                    await setDoc(doc(db, MAZE_DOC_PATH), {
                        grid: serializedMaze,
                        updatedAt: new Date().getTime(),
                        updatedBy: userId
                    });
                    statusMessage.textContent = "Maze saved and shared!";
                    statusMessage.className = "text-sm text-green-400 pt-2 border-t border-sky-600";
                } catch (error) {
                    console.error("Error writing maze document: ", error);
                    statusMessage.textContent = "Error saving maze to database.";
                    statusMessage.className = "text-sm text-red-400 pt-2 border-t border-sky-600";
                }
            }

            /** Saves the local player's position and mode to Firestore. */
            async function updatePlayerState() {
                if (!db || !PLAYER_DOC_PATH) return;

                try {
                    await setDoc(doc(db, PLAYER_DOC_PATH), playerState, { merge: true });
                } catch (error) {
                    console.error("Error writing player document: ", error);
                }
            }
            
            /** Attaches a real-time listener to Firestore to update the local maze state. */
            function listenForMazeUpdates() {
                if (!db || !MAZE_DOC_PATH) {
                    // Update for local mode
                    statusMessage.textContent = "Local Mode (Offline). Click/tap to build.";
                    statusMessage.className = "text-sm font-bold text-gray-300 pt-2 border-t border-sky-600";
                    return;
                }

                statusMessage.textContent = "Connected to Firestore. Syncing...";
                
                onSnapshot(doc(db, MAZE_DOC_PATH), (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const data = docSnapshot.data();
                        
                        try {
                            const newGrid = JSON.parse(data.grid);
                            
                            if (newGrid.length === GRID_SIZE && newGrid.every(row => row.length === GRID_SIZE)) {
                                mazeGrid = newGrid;
                                drawMaze();
                                
                                const date = new Date(data.updatedAt).toLocaleTimeString();
                                const updater = data.updatedBy === userId ? 'You' : data.updatedBy.substring(0, 8) + '...';
                                statusMessage.textContent = `Synced: Last update by ${updater} at ${date}`;
                                statusMessage.className = "text-sm text-green-400 pt-2 border-t border-sky-600";

                            } else {
                                console.warn("Received invalid grid data structure.");
                            }
                        } catch (e) {
                            console.error("Error parsing maze data:", e);
                        }
                    } else {
                        // Document doesn't exist, initialize it with a default state (all walls)
                        mazeGrid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(1));
                        
                        // Ensure start and finish are paths for playability when document is first created
                        mazeGrid[0][0] = 0;
                        mazeGrid[GRID_SIZE - 1][GRID_SIZE - 1] = 0;

                        saveMazeState(); // Write the initial structure
                        statusMessage.textContent = "Created new master maze document.";
                    }
                }, (error) => {
                    console.error("Firestore listen error (Maze): ", error);
                    statusMessage.textContent = "Maze sync failed. Check console for details.";
                    statusMessage.className = "text-sm text-red-400 pt-2 border-t border-sky-600";
                });
            }

            /** Attaches a real-time listener for all players in the game. */
            function listenForPlayerUpdates() {
                if (!db || !PLAYER_COLLECTION_PATH) return;
                
                // Using collection to listen to all documents in the players subcollection
                onSnapshot(collection(db, PLAYER_COLLECTION_PATH), (querySnapshot) => {
                    querySnapshot.docChanges().forEach((change) => {
                        const pId = change.doc.id;
                        const pData = change.doc.data();

                        if (change.type === 'removed') {
                            delete players[pId];
                        } else {
                            players[pId] = pData;
                        }
                    });
                    drawMaze(); // Redraw the maze and players
                }, (error) => {
                    console.error("Firestore listen error (Players): ", error);
                });
            }

            // --- Game Logic ---

            function canMove(newRow, newCol) {
                // Bounds check
                if (newRow < 0 || newRow >= GRID_SIZE || newCol < 0 || newCol >= GRID_SIZE) {
                    return false;
                }
                // Wall check (1 is Wall)
                if (mazeGrid[newRow][newCol] === 1) {
                    return false;
                }
                return true;
            }

            function checkWinCondition() {
                if (playerState.row === GRID_SIZE - 1 && playerState.col === GRID_SIZE - 1) {
                    const winTime = new Date().toLocaleTimeString();
                    const winMessage = `🏆 YOU ARE THE MAZE MASTER! Completed at ${winTime}! 🎉`;
                    
                    statusMessage.textContent = winMessage;
                    statusMessage.className = "text-sm font-bold text-yellow-400 pt-2 border-t border-sky-600 animate-pulse";
                    
                    // Start the confetti animation
                    startConfetti();
                }
            }

            // --- Event Handlers ---

            function handleCanvasClick(event) {
                if (playerState.mode !== 'BUILD') return;

                const rect = canvas.getBoundingClientRect();
                
                // Handle touch and click events
                const clientX = event.clientX || (event.touches ? event.touches[0].clientX : null);
                const clientY = event.clientY || (event.touches ? event.touches[0].clientY : null);

                if (clientX === null || clientY === null) return;

                const x = clientX - rect.left;
                const y = clientY - rect.top;

                const col = Math.floor(x / CELL_SIZE);
                const row = Math.floor(y / CELL_SIZE);

                if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
                    // Prevent placing walls on the Start (0, 0) and Finish (N-1, N-1) cells
                    if ((row === 0 && col === 0) || (row === GRID_SIZE - 1 && col === GRID_SIZE - 1)) {
                         console.log("Cannot place a wall on the Start or Finish cells.");
                         return; 
                    }

                    // Toggle the cell state: 1 (Wall) -> 0 (Path) or 0 -> 1
                    mazeGrid[row][col] = 1 - mazeGrid[row][col];
                    
                    drawMaze(); // Update locally immediately
                    saveMazeState(); // Push change to the database (will be skipped in local mode)
                }
            }

            function handleMouseMove(event) {
                if (playerState.mode !== 'BUILD') return;
                
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const col = Math.floor(x / CELL_SIZE);
                const row = Math.floor(y / CELL_SIZE);

                if (row !== hoverCoords.row || col !== hoverCoords.col) {
                    // Redraw previous cell to remove hover effect
                    if (hoverCoords.row !== -1) {
                         drawCell(hoverCoords.row, hoverCoords.col, mazeGrid[hoverCoords.row][hoverCoords.col], false);
                    }
                    
                    // Set new hover coords and redraw the new cell with hover effect
                    hoverCoords = { row, col };
                    if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
                        drawCell(row, col, mazeGrid[row][col], true);
                    } else {
                        hoverCoords = { row: -1, col: -1 }; // Reset if mouse moves out
                    }
                }
            }

            function handleMouseOut() {
                if (hoverCoords.row !== -1 && playerState.mode === 'BUILD') {
                    // Redraw the cell without the hover effect
                    drawCell(hoverCoords.row, hoverCoords.col, mazeGrid[hoverCoords.row][hoverCoords.col], false);
                    hoverCoords = { row: -1, col: -1 };
                }
            }

            function handleKeyDown(event) {
                if (playerState.mode !== 'RACE') return;
                
                // Prevent movement if the player has already won
                if (playerState.row === GRID_SIZE - 1 && playerState.col === GRID_SIZE - 1) {
                    return;
                }
                
                let newRow = playerState.row;
                let newCol = playerState.col;
                let moved = false;

                switch (event.key) {
                    case 'ArrowUp':
                    case 'w':
                        newRow--;
                        moved = true;
                        break;
                    case 'ArrowDown':
                    case 's':
                        newRow++;
                        moved = true;
                        break;
                    case 'ArrowLeft':
                    case 'a':
                        newCol--;
                        moved = true;
                        break;
                    case 'ArrowRight':
                    case 'd':
                        newCol++;
                        moved = true;
                        break;
                }

                if (moved && canMove(newRow, newCol)) {
                    playerState.row = newRow;
                    playerState.col = newCol;
                    playerState.lastMove = new Date().getTime();
                    
                    // Update local state of current player for drawing
                    players[userId] = {...playerState}; 

                    drawMaze();
                    updatePlayerState(); // Will update remote state if connected
                    checkWinCondition();
                    event.preventDefault(); // Prevent scrolling
                }
            }

            // --- Control Buttons ---

            raceModeBtn.addEventListener('click', () => {
                const isBuilding = playerState.mode === 'BUILD';
                
                playerState.mode = isBuilding ? 'RACE' : 'BUILD';
                playerState.row = 0; // Reset player to start
                playerState.col = 0;
                playerState.lastMove = new Date().getTime();
                
                // Stop any running confetti animation if the mode changes
                if (confettiInterval) {
                    cancelAnimationFrame(confettiInterval);
                    confettiInterval = null;
                }

                if (isBuilding) {
                    raceModeBtn.textContent = 'Switch to Build Mode';
                    raceModeBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                    raceModeBtn.classList.add('bg-purple-600', 'hover:bg-purple-700');
                    statusMessage.textContent = 'RACE MODE: Use WASD or Arrow Keys to move!';
                    statusMessage.className = "text-sm font-semibold text-yellow-300 pt-2 border-t border-sky-600";
                } else {
                    raceModeBtn.textContent = 'Switch to Race Mode';
                    raceModeBtn.classList.remove('bg-purple-600', 'hover:bg-purple-700');
                    raceModeBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                    // Reset status message if in collaborative mode
                    if (db) {
                        statusMessage.textContent = 'BUILD MODE: Click/tap to toggle walls.';
                        statusMessage.className = "text-sm text-green-400 pt-2 border-t border-sky-600";
                    } else {
                         statusMessage.textContent = "Local Mode (Offline). Click/tap to build.";
                         statusMessage.className = "text-sm font-bold text-gray-300 pt-2 border-t border-sky-600";
                    }
                }

                // If in RACE mode, ensure local player is in the 'players' object for drawing consistency
                if (playerState.mode === 'RACE') {
                    players[userId] = {...playerState};
                }
                
                updatePlayerState(); // Update mode change (will be skipped in local mode)
                drawMaze(); // Redraw to hide/show hover/players
            });

            clearBtn.addEventListener('click', () => {
                if (playerState.mode !== 'BUILD') return;
                mazeGrid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0)); // All paths (0)
                mazeGrid[0][0] = 0;
                mazeGrid[GRID_SIZE - 1][GRID_SIZE - 1] = 0;
                drawMaze();
                saveMazeState();
            });

            resetBtn.addEventListener('click', () => {
                if (playerState.mode !== 'BUILD') return;
                mazeGrid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(1)); // All walls (1)
                
                // Ensure start and finish are paths for playability
                mazeGrid[0][0] = 0;
                mazeGrid[GRID_SIZE - 1][GRID_SIZE - 1] = 0;
                
                drawMaze();
                saveMazeState();
            });

            randomizeBtn.addEventListener('click', () => {
                if (playerState.mode !== 'BUILD') return;
                mazeGrid = Array(GRID_SIZE).fill(0).map(() => 
                    Array(GRID_SIZE).fill(0).map(() => Math.round(Math.random()))
                );
                // Ensure start and finish are paths for playability
                mazeGrid[0][0] = 0;
                mazeGrid[GRID_SIZE - 1][GRID_SIZE - 1] = 0;
                
                drawMaze();
                saveMazeState();
            });


            // --- Initialization and Listeners ---
            
            canvas.addEventListener('click', handleCanvasClick);
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseout', handleMouseOut);
            canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleCanvasClick(e); }, { passive: false });
            window.addEventListener('keydown', handleKeyDown);

            // Start synchronization (only runs if db is not null)
            listenForMazeUpdates();
            listenForPlayerUpdates();
            updatePlayerState(); 
            
            // Final explicit draw to ensure the initial maze state is always rendered in all modes
            drawMaze(); 
        }
