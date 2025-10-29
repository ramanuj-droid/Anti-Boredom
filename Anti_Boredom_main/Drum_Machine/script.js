const grid = document.querySelector('.grid');
const steps = 8;
const sounds = ['kick', 'snare', 'hihat'];
let isPlaying = false;
let step = 0;

// create pads
sounds.forEach(sound => {
  const row = document.querySelector(`[data-sound="${sound}"]`);
  for (let i = 0; i < steps; i++) {
    const pad = document.createElement('button');
    pad.classList.add('pad');
    pad.addEventListener('click', () => pad.classList.toggle('active'));
    row.appendChild(pad);
  }
});

function playSound(type) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain).connect(ctx.destination);

  if (type === 'kick') osc.frequency.setValueAtTime(100, ctx.currentTime);
  if (type === 'snare') osc.frequency.setValueAtTime(200, ctx.currentTime);
  if (type === 'hihat') osc.frequency.setValueAtTime(400, ctx.currentTime);

  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  osc.start();
  osc.stop(ctx.currentTime + 0.2);
}

function loop() {
  if (!isPlaying) return;

  const rows = document.querySelectorAll('.row');
  rows.forEach(row => {
    const pads = row.querySelectorAll('.pad');
    if (pads[step].classList.contains('active')) {
      playSound(row.dataset.sound);
    }
  });

  step = (step + 1) % steps;
  setTimeout(loop, 200); // Adjust speed here
}

document.getElementById('play').addEventListener('click', () => {
  if (!isPlaying) {
    isPlaying = true;
    loop();
  }
});

document.getElementById('stop').addEventListener('click', () => isPlaying = false);

// Save pattern
document.getElementById('save').addEventListener('click', () => {
  const pattern = [];
  document.querySelectorAll('.pad').forEach(pad => {
    pattern.push(pad.classList.contains('active'));
  });
  localStorage.setItem('drumPattern', JSON.stringify(pattern));
  alert('Pattern saved!');
});

// Load pattern
document.getElementById('load').addEventListener('click', () => {
  const saved = JSON.parse(localStorage.getItem('drumPattern'));
  if (!saved) return alert('No saved pattern found!');
  document.querySelectorAll('.pad').forEach((pad, i) => {
    pad.classList.toggle('active', saved[i]);
  });
  alert('Pattern loaded!');
});
