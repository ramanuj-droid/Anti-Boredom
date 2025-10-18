(() => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const restartBtn = document.getElementById('restartBtn');
  const scoreEl = document.getElementById('score');
  const speedEl = document.getElementById('speed');

  const GAME_WIDTH = 360;
  const GAME_HEIGHT = 640;

  function resizeCanvasForHiDPI() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = GAME_WIDTH * ratio;
    canvas.height = GAME_HEIGHT * ratio;
    canvas.style.width = `${GAME_WIDTH}px`;
    canvas.style.height = `${GAME_HEIGHT}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  resizeCanvasForHiDPI();
  window.addEventListener('resize', resizeCanvasForHiDPI);

 
  let running = false;
  let paused = false;
  let lastTime = 0;
  let score = 0;
  let speedMultiplier = 1; // increases over time
  let spawnTimer = 0;
  let spawnInterval = 1200; // ms (will decrease with speed)
  let obstacles = [];
  let keys = { left: false, right: false };
  let animationId = null;

  // Player car
  const player = {
    w: 44,
    h: 80,
    x: (GAME_WIDTH - 44) / 2,
    y: GAME_HEIGHT - 110,
    vx: 0,
    speed: 240, // px per second (base)
    color: '#ff6b35',
    draw() {
      // car shape
      ctx.save();
      ctx.translate(this.x, this.y);
      // body
      roundRect(ctx, 0, 0, this.w, this.h, 8, '#ff6b35');
      // windshield
      ctx.fillStyle = '#0b1220';
      ctx.fillRect(8, 10, this.w - 16, 18);
      // wheels
      ctx.fillStyle = '#111827';
      ctx.fillRect(6, this.h - 12, 12, 8);
      ctx.fillRect(this.w - 18, this.h - 12, 12, 8);
      ctx.restore();
    },
    update(dt) {
      const move = (keys.left ? -1 : 0) + (keys.right ? 1 : 0);
      this.vx = move * this.speed * speedMultiplier;
      this.x += this.vx * dt;
      const margin = 8;
      this.x = Math.max(margin, Math.min(GAME_WIDTH - this.w - margin, this.x));
    }
  };

  function roundRect(ctx, x, y, w, h, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fill();
  }

  // Road rendering helper
  function drawRoad(scrollY) {
    const roadW = GAME_WIDTH * 0.7;
    const roadX = (GAME_WIDTH - roadW) / 2;
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = '#0f1724';
    ctx.fillRect(roadX - 6, 0, roadW + 12, GAME_HEIGHT);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.setLineDash([24, 24]);
    ctx.lineDashOffset = -scrollY * 0.8;
    ctx.beginPath();
    ctx.moveTo(GAME_WIDTH / 2, -1000);
    ctx.lineTo(GAME_WIDTH / 2, 2000);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function spawnObstacle() {
    const roadW = GAME_WIDTH * 0.7;
    const roadX = (GAME_WIDTH - roadW) / 2;
    const lanes = 3;
    const laneW = roadW / lanes;
    const laneIndex = Math.floor(Math.random() * lanes);
    const obsW = Math.min(64, laneW - 12);
    const obsH = 40 + Math.random() * 40;
    const x = roadX + laneIndex * laneW + (laneW - obsW) / 2;
    const y = -obsH - 20;
    const speed = (80 + Math.random() * 60) * speedMultiplier;
    const color = Math.random() < 0.7 ? '#ef4444' : '#f59e0b';
    obstacles.push({ x, y, w: obsW, h: obsH, speed, color });
  }

  function updateObstacles(dt) {
    for (let i = obstacles.length - 1; i >= 0; i--) {
      const o = obstacles[i];
      o.y += o.speed * dt;
      if (o.y > GAME_HEIGHT + 80) obstacles.splice(i, 1);
    }
  }

  function drawObstacles() {
    for (const o of obstacles) {
      roundRect(ctx, o.x, o.y, o.w, o.h, 6, o.color);
      // windows / decoration
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(o.x + 8, o.y + 6, o.w - 16, 10);
    }
  }

  function checkCollision(a, b) {
    return !(a.x + a.w < b.x || a.x > b.x + b.w || a.y + a.h < b.y || a.y > b.y + b.h);
  }

  let accumulatedScroll = 0;
  function gameLoop(ts) {
    if (!running) return;
    if (paused) {
      animationId = requestAnimationFrame(gameLoop);
      return;
    }

    if (!lastTime) lastTime = ts;
    const dt = Math.min(0.05, (ts - lastTime) / 1000); // clamp dt
    lastTime = ts;

    score += dt * 10 * speedMultiplier;
    accumulatedScroll += dt * 150 * speedMultiplier;

    spawnTimer += dt * 1000;
    const dynamicInterval = Math.max(500, spawnInterval - (speedMultiplier - 1) * 150);
    if (spawnTimer > dynamicInterval) {
      spawnTimer = 0;
      spawnObstacle();
    }

    
    speedMultiplier += dt * 0.02; // difficulty ramp
    
    scoreEl.textContent = Math.floor(score);
    speedEl.textContent = speedMultiplier.toFixed(2);

    
    player.update(dt);
    updateObstacles(dt);

  
    for (const o of obstacles) {
      if (checkCollision(player, o)) {
        endGame();
        return;
      }
    }

    
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    drawRoad(accumulatedScroll);
    drawObstacles();
    player.draw();

    animationId = requestAnimationFrame(gameLoop);
  }

  function startGame() {
    if (running) return;
    running = true;
    paused = false;
    lastTime = 0;
    score = 0;
    speedMultiplier = 1;
    spawnTimer = 0;
    obstacles = [];
    player.x = (GAME_WIDTH - player.w) / 2;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    restartBtn.disabled = false;
    pauseBtn.textContent = 'Pause';
    animationId = requestAnimationFrame(gameLoop);
  }

  function pauseGame() {
    if (!running) return;
    paused = !paused;
    pauseBtn.textContent = paused ? 'Resume' : 'Pause';
  }

  function endGame() {
    running = false;
    paused = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    restartBtn.disabled = false;
    cancelAnimationFrame(animationId);
    showGameOver();
  }

  function restartGame() {
    running = false;
    paused = false;
    lastTime = 0;
    score = 0;
    speedMultiplier = 1;
    spawnTimer = 0;
    obstacles = [];
    player.x = (GAME_WIDTH - player.w) / 2;
    scoreEl.textContent = '0';
    speedEl.textContent = '1';
    startGame();
  }

  function showGameOver() {
    ctx.save();
    ctx.fillStyle = 'rgba(2,6,23,0.75)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = '#fff';
    ctx.font = '26px system-ui, Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 10);
    ctx.font = '16px system-ui, Arial';
    ctx.fillText(`Score: ${Math.floor(score)}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 22);
    ctx.restore();
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keys.left = true;
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keys.right = true;
    if (e.key === ' ' && running) {
      pauseGame();
      e.preventDefault();
    }
  });
  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keys.left = false;
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keys.right = false;
  });

  canvas.addEventListener('touchstart', (e) => {
    if (!running) return;
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    for (const t of e.changedTouches) {
      const x = t.clientX - rect.left;
      if (x < rect.width / 2) keys.left = true;
      else keys.right = true;
    }
  }, { passive: false });

  canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    keys.left = false; keys.right = false;
  }, { passive: false });

  startBtn.addEventListener('click', startGame);
  pauseBtn.addEventListener('click', pauseGame);
  restartBtn.addEventListener('click', restartGame);

 
  function drawIntro() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    drawRoad(0);
    player.draw();
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = '16px system-ui, Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Press Start to play', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 20);
    ctx.fillText('Use ← → or A / D', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 6);
    ctx.restore();
  }
  drawIntro();

  window._game = { startGame, pauseGame, restartGame, getState: () => ({ running, score, speedMultiplier }) };

})();
