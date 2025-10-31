// Wait for the document to load before starting the game
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Setup and Variables ---

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Get UI elements
    const messageEl = document.getElementById('message');
    const scoreEl = document.getElementById('score');
    const startButton = document.getElementById('startButton');

    // In-memory canvases for score calculation
    const originalCanvas = document.createElement('canvas');
    originalCanvas.width = canvas.width;
    originalCanvas.height = canvas.height;
    const originalCtx = originalCanvas.getContext('2d');

    const userCanvas = document.createElement('canvas');
    userCanvas.width = canvas.width;
    userCanvas.height = canvas.height;
    const userCtx = userCanvas.getContext('2d');

    // Game state
    let isDrawing = false;
    let currentShape = null;
    let userPath = [];

    // --- 2. Shape Definitions ---
    // An array of functions, each drawing a unique shape
    
    const shapes = [
        // Shape 1: A simple "S" curve
        (context) => {
            context.beginPath();
            context.moveTo(150, 100);
            context.bezierCurveTo(250, 50, 350, 350, 450, 300);
            context.stroke();
        },
        // Shape 2: A boxy spiral
        (context) => {
            context.beginPath();
            context.moveTo(300, 200);
            context.lineTo(300, 150);
            context.lineTo(350, 150);
            context.lineTo(350, 250);
            context.lineTo(250, 250);
            context.lineTo(250, 100);
            context.stroke();
        },
        // Shape 3: A wave
        (context) => {
            context.beginPath();
            context.moveTo(100, 200);
            context.quadraticCurveTo(200, 100, 300, 200);
            context.quadraticCurveTo(400, 300, 500, 200);
            context.stroke();
        },
        // Shape 4: A triangle
        (context) => {
            context.beginPath();
            context.moveTo(300, 100);
            context.lineTo(450, 300);
            context.lineTo(150, 300);
            context.closePath();
            context.stroke();
        }
    ];

    // --- 3. Game Logic Functions ---

    /**
     * Starts a new round
     */
    function startNewRound() {
        // Clear all canvases
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        originalCtx.clearRect(0, 0, canvas.width, canvas.height);
        userCtx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Reset user path
        userPath = [];
        scoreEl.textContent = '0';
        messageEl.textContent = 'Memorize the shape...';
        
        // Disable button during memorization
        startButton.disabled = true;

        // Pick a random shape
        currentShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Draw the shape to be memorized
        drawShape(ctx, currentShape, '#4d94ff', 8);

        // Set a timer to fade the shape
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            messageEl.textContent = 'Now... draw!';
            startButton.disabled = false;
            
            // Allow drawing only after shape fades
            addDrawingListeners();
        }, 2500); // 2.5 seconds to memorize
    }

    /**
     * A helper function to draw a shape on a given context
     */
    function drawShape(context, shapeFunction, strokeStyle, lineWidth) {
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        shapeFunction(context);
    }
    
    /**
     * Draws the user's path as they draw
     */
    function drawUserPath() {
        if (userPath.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(userPath[0].x, userPath[0].y);
        for (let i = 1; i < userPath.length; i++) {
            ctx.lineTo(userPath[i].x, userPath[i].y);
        }
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.stroke();
    }
    
    /**
     * Calculates the score by comparing two canvases
     */
    function calculateScore() {
        if (!currentShape) return;
        
        messageEl.textContent = 'Calculating score...';

        // Draw the original shape on its hidden canvas
        drawShape(originalCtx, currentShape, 'white', 8);
        
        // Draw the user's path on its hidden canvas
        userCtx.beginPath();
        if (userPath.length > 1) {
            userCtx.moveTo(userPath[0].x, userPath[0].y);
            for (let i = 1; i < userPath.length; i++) {
                userCtx.lineTo(userPath[i].x, userPath[i].y);
            }
            userCtx.strokeStyle = 'white';
            userCtx.lineWidth = 5;
            userCtx.stroke();
        }

        // Get pixel data for both hidden canvases
        const originalData = originalCtx.getImageData(0, 0, canvas.width, canvas.height).data;
        const userData = userCtx.getImageData(0, 0, canvas.width, canvas.height).data;

        let overlap = 0;
        let originalPixels = 0;
        let userPixels = 0;

        // Iterate through all pixels (checking alpha channel)
        for (let i = 0; i < originalData.length; i += 4) {
            const originalAlpha = originalData[i + 3];
            const userAlpha = userData[i + 3];

            if (originalAlpha > 0) {
                originalPixels++;
            }
            if (userAlpha > 0) {
                userPixels++;
            }
            if (originalAlpha > 0 && userAlpha > 0) {
                overlap++;
            }
        }

        // Calculate score using Jaccard index (overlap / union)
        const union = originalPixels + userPixels - overlap;
        let score = 0;
        if (union > 0) {
            score = (overlap / union) * 100;
        }

        // Display the score
        scoreEl.textContent = score.toFixed(0);
        
        // Show the comparison on the main canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawShape(ctx, currentShape, '#4d94ff', 8); // Original in blue
        drawUserPath(); // User's in white
        
        messageEl.textContent = 'Click \'Start\' for the next shape!';
    }


    // --- 4. Event Handlers ---

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        // Scale mouse coordinates to canvas coordinates
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        if (e.touches) {
            return {
                x: (e.touches[0].clientX - rect.left) * scaleX,
                y: (e.touches[0].clientY - rect.top) * scaleY
            };
        }
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    function startDrawing(e) {
        e.preventDefault();
        isDrawing = true;
        
        // Clear user path and canvas for new drawing
        userPath = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        
        const pos = getMousePos(e);
        userPath.push(pos);
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        
        const pos = getMousePos(e);
        userPath.push(pos);
        
        // Redraw the path smoothly
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawUserPath();
    }

    function stopDrawing(e) {
        if (!isDrawing) return;
        e.preventDefault();
        
        isDrawing = false;
        removeDrawingListeners();
        calculateScore();
    }
    
    // --- 5. Listeners ---

    function addDrawingListeners() {
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);
        
        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);
    }
    
    function removeDrawingListeners() {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseout', stopDrawing);
        
        canvas.removeEventListener('touchstart', startDrawing);
        canvas.removeEventListener('touchmove', draw);
        canvas.removeEventListener('touchend', stopDrawing);
    }

    // Start button listener
    startButton.addEventListener('click', startNewRound);
});
