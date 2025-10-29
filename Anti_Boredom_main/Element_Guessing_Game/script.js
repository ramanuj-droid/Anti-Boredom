// Element Guessing Game
// Tries to fetch data from a public JSON on GitHub; falls back to a small built-in subset

const DATA_URL = 'https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/periodic-table-lookup.json';

// Minimal fallback subset to guarantee the game works offline
const FALLBACK_ELEMENTS = [
  { name: 'Hydrogen', symbol: 'H', number: 1, group: 1, period: 1, category: 'diatomic nonmetal' },
  { name: 'Helium', symbol: 'He', number: 2, group: 18, period: 1, category: 'noble gas' },
  { name: 'Carbon', symbol: 'C', number: 6, group: 14, period: 2, category: 'polyatomic nonmetal' },
  { name: 'Nitrogen', symbol: 'N', number: 7, group: 15, period: 2, category: 'diatomic nonmetal' },
  { name: 'Oxygen', symbol: 'O', number: 8, group: 16, period: 2, category: 'diatomic nonmetal' },
  { name: 'Sodium', symbol: 'Na', number: 11, group: 1, period: 3, category: 'alkali metal' },
  { name: 'Magnesium', symbol: 'Mg', number: 12, group: 2, period: 3, category: 'alkaline earth metal' },
  { name: 'Aluminum', symbol: 'Al', number: 13, group: 13, period: 3, category: 'post-transition metal' },
  { name: 'Silicon', symbol: 'Si', number: 14, group: 14, period: 3, category: 'metalloid' },
  { name: 'Chlorine', symbol: 'Cl', number: 17, group: 17, period: 3, category: 'diatomic nonmetal' },
  { name: 'Argon', symbol: 'Ar', number: 18, group: 18, period: 3, category: 'noble gas' },
  { name: 'Iron', symbol: 'Fe', number: 26, group: 8, period: 4, category: 'transition metal' },
  { name: 'Copper', symbol: 'Cu', number: 29, group: 11, period: 4, category: 'transition metal' },
  { name: 'Zinc', symbol: 'Zn', number: 30, group: 12, period: 4, category: 'transition metal' },
  { name: 'Silver', symbol: 'Ag', number: 47, group: 11, period: 5, category: 'transition metal' },
  { name: 'Tin', symbol: 'Sn', number: 50, group: 14, period: 5, category: 'post-transition metal' },
  { name: 'Iodine', symbol: 'I', number: 53, group: 17, period: 5, category: 'diatomic nonmetal' },
  { name: 'Gold', symbol: 'Au', number: 79, group: 11, period: 6, category: 'transition metal' },
  { name: 'Mercury', symbol: 'Hg', number: 80, group: 12, period: 6, category: 'transition metal' },
  { name: 'Lead', symbol: 'Pb', number: 82, group: 14, period: 6, category: 'post-transition metal' },
];

const els = {
  clues: document.getElementById('clues'),
  clueTpl: document.getElementById('clueItemTemplate'),
  guessForm: document.getElementById('guessForm'),
  guessInput: document.getElementById('guessInput'),
  submitBtn: document.getElementById('submitBtn'),
  hintBtn: document.getElementById('hintBtn'),
  skipBtn: document.getElementById('skipBtn'),
  feedback: document.getElementById('feedback'),
  score: document.getElementById('score'),
  streak: document.getElementById('streak'),
  timer: document.getElementById('timer'),
  timerBar: document.getElementById('timerBar'),
  difficulty: document.getElementById('difficulty'),
  lbList: document.getElementById('leaderboardList'),
  clearLbBtn: document.getElementById('clearLbBtn'),
  confetti: document.getElementById('confetti'),
};

const game = {
  allElements: [],
  current: null,
  revealedClueCount: 0,
  score: 0,
  streak: 0,
  timeLeft: 60,
  timerId: null,
  usedIndexes: new Set(),
};

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

async function loadData(){
  try{
    const res = await fetch(DATA_URL, { cache: 'no-store' });
    if(!res.ok) throw new Error('network');
    const data = await res.json();
    // Transform lookup format into a flat array
    const arr = Object.values(data).map(e => ({
      name: e.name,
      symbol: e.symbol,
      number: e.number,
      group: e.group,
      period: e.period,
      category: e.category,
    })).filter(e => e.name && e.symbol && e.number);
    return arr;
  }catch{
    return FALLBACK_ELEMENTS.slice();
  }
}

function formatClues(element, difficulty){
  const base = [
    `Atomic number: ${element.number}`,
    element.group ? `Group: ${element.group}` : null,
    element.period ? `Period: ${element.period}` : null,
    element.category ? `Category: ${element.category}` : null,
  ].filter(Boolean);
  if(difficulty === 'easy'){
    base.push(`Symbol starts with: ${element.symbol[0]}`);
    base.push(`Name length: ${element.name.length}`);
  } else if(difficulty === 'hard'){
    // Fewer easy clues, reorder to make it trickier
    base.sort(()=>Math.random()-0.5);
  }
  return shuffle(base);
}

function renderClues(clues, revealCount){
  els.clues.innerHTML = '';
  const frag = document.createDocumentFragment();
  for(let i=0;i<Math.min(revealCount, clues.length);i++){
    const li = els.clueTpl.content.firstElementChild.cloneNode(true);
    li.textContent = clues[i];
    frag.appendChild(li);
  }
  els.clues.appendChild(frag);
}

function startTimer(){
  clearInterval(game.timerId);
  game.timerId = setInterval(()=>{
    game.timeLeft = Math.max(0, game.timeLeft - 1);
    els.timer.textContent = String(game.timeLeft);
    const pct = (game.timeLeft/60)*100;
    if(els.timerBar){ els.timerBar.style.width = pct + '%'; }
    if(game.timeLeft === 0){
      clearInterval(game.timerId);
      endRound(false, 'Time up!');
    }
  }, 1000);
}

function pickNextElement(){
  if(game.usedIndexes.size >= game.allElements.length) game.usedIndexes.clear();
  let idx;
  do{ idx = Math.floor(Math.random()*game.allElements.length); } while(game.usedIndexes.has(idx));
  game.usedIndexes.add(idx);
  return game.allElements[idx];
}

function startRound(resetTimer=true){
  game.current = pickNextElement();
  game.revealedClueCount = 2; // start with 2 clues
  const clues = formatClues(game.current, els.difficulty.value);
  game.current._clues = clues; // attach for rendering
  renderClues(clues, game.revealedClueCount);
  els.feedback.className = 'feedback';
  els.feedback.textContent = '';
  els.guessInput.value = '';
  document.querySelector('.card')?.classList.add('pop');
  setTimeout(()=>document.querySelector('.card')?.classList.remove('pop'),180);
  if(resetTimer){
    game.timeLeft = 60;
    els.timer.textContent = '60';
    if(els.timerBar){ els.timerBar.style.width = '100%'; }
    startTimer();
  }
}

function giveHint(){
  const total = game.current?._clues?.length || 0;
  if(game.revealedClueCount < total){
    game.revealedClueCount++;
    renderClues(game.current._clues, game.revealedClueCount);
    els.feedback.className = 'feedback hint';
    els.feedback.textContent = 'Hint revealed! (-1 point)';
    game.score = Math.max(0, game.score - 1);
    updateHud();
  }
}

function normalize(s){ return String(s).trim().toLowerCase(); }

function checkGuess(guess){
  const g = normalize(guess);
  const name = normalize(game.current.name);
  const symbol = normalize(game.current.symbol);
  return g === name || g === symbol;
}

function endRound(correct, msg){
  clearInterval(game.timerId);
  if(correct){
    els.feedback.className = 'feedback ok';
    els.feedback.textContent = msg || 'Correct! +10';
    game.score += 10 + Math.max(0, game.timeLeft - 30); // time bonus
    game.streak += 1;
    try{ celebrate(); }catch{}
  } else {
    els.feedback.className = 'feedback err';
    els.feedback.textContent = msg || `Incorrect! It was ${game.current.name} (${game.current.symbol}).`;
    game.streak = 0;
    // Shake the main card
    const card = document.querySelector('.card');
    if(card){
      card.classList.remove('shake');
      // Force reflow to restart animation
      void card.offsetWidth;
      card.classList.add('shake');
      setTimeout(()=>card.classList.remove('shake'), 400);
    }
  }
  updateHud();
  setTimeout(()=>startRound(true), 900);
}

function updateHud(){
  els.score.textContent = String(game.score);
  els.streak.textContent = String(game.streak);
  updateLeaderboard();
}

function updateLeaderboard(){
  const best = Number(localStorage.getItem('egg_best')||'0');
  if(game.score > best){ localStorage.setItem('egg_best', String(game.score)); }
  const history = JSON.parse(localStorage.getItem('egg_history')||'[]');
  // Keep top 5
  const combined = [...history, { date: new Date().toISOString(), score: game.score }]
    .sort((a,b)=>b.score-a.score).slice(0,5);
  localStorage.setItem('egg_history', JSON.stringify(combined));
  renderLeaderboard(combined);
}

function renderLeaderboard(items){
  els.lbList.innerHTML = '';
  items.forEach((it, i)=>{
    const li = document.createElement('li');
    const d = new Date(it.date).toLocaleString();
    li.textContent = `${i+1}. ${it.score} pts — ${d}`;
    els.lbList.appendChild(li);
  });
}

function bindEvents(){
  els.guessForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const guess = els.guessInput.value;
    if(!guess) return;
    if(checkGuess(guess)) endRound(true);
    else endRound(false);
  });
  els.hintBtn.addEventListener('click', giveHint);
  els.skipBtn.addEventListener('click', ()=>{ endRound(false, `Skipped! It was ${game.current.name}.`); });
  els.difficulty.addEventListener('change', ()=> startRound(false));
  els.clearLbBtn.addEventListener('click', ()=>{
    localStorage.removeItem('egg_history');
    els.lbList.innerHTML = '';
  });
}

async function boot(){
  bindEvents();
  const arr = await loadData();
  // Normalize keys to match our expectations
  game.allElements = arr.map(e=>({
    name: e.name,
    symbol: e.symbol,
    number: Number(e.number),
    group: Number(e.group)||null,
    period: Number(e.period)||null,
    category: e.category||null,
  }));
  // Seed leaderboard UI
  renderLeaderboard(JSON.parse(localStorage.getItem('egg_history')||'[]'));
  startRound(true);
}

boot();

// Simple confetti burst
function celebrate(){
  const canvas = els.confetti;
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width = window.innerWidth;
  const H = canvas.height = window.innerHeight;
  const N = 120;
  const colors = ['#58a6ff','#2ea043','#ffd166','#f85149','#a371f7'];
  const parts = Array.from({length:N}, ()=>({
    x: Math.random()*W,
    y: -10,
    r: 4+Math.random()*4,
    vx: -2+Math.random()*4,
    vy: 2+Math.random()*4,
    a: 1,
    c: colors[Math.floor(Math.random()*colors.length)],
    spin: Math.random()*6.28
  }));
  let t0 = performance.now();
  function step(t){
    const dt = Math.min(0.033, (t - t0)/1000); t0 = t;
    ctx.clearRect(0,0,W,H);
    parts.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.a -= 0.008;
      p.spin += 0.2;
      ctx.globalAlpha = Math.max(0, p.a);
      ctx.fillStyle = p.c;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin);
      ctx.fillRect(-p.r, -p.r, p.r*2, p.r*2);
      ctx.restore();
    });
    ctx.globalAlpha = 1;
    if(parts.some(p=>p.a>0 && p.y<H+20)){
      requestAnimationFrame(step);
    }else{
      ctx.clearRect(0,0,W,H);
    }
  }
  requestAnimationFrame(step);
}


