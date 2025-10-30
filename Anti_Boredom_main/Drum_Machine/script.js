const grid = document.querySelector('.grid');
const steps = 8;
const sounds = ['kick', 'snare', 'hihat', 'guitar', 'piano'];
const ctx = new (window.AudioContext || window.webkitAudioContext)();
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
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain).connect(ctx.destination);

  let attack = 0.001;
  let decay = 0.2;
  let freq = 100;
  let wave = 'sine';

  if (type === 'kick') {
    freq = 100; wave = 'sine'; decay = 0.25;
  } else if (type === 'snare') {
    freq = 200; wave = 'triangle'; decay = 0.2;
  } else if (type === 'hihat') {
    freq = 400; wave = 'square'; decay = 0.15;
  } else if (type === 'guitar') {
    freq = 196; wave = 'triangle'; attack = 0.002; decay = 0.35;
  } else if (type === 'piano') {
    freq = 261.63; wave = 'sine'; attack = 0.005; decay = 0.5;
  }

  osc.type = wave;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(1, ctx.currentTime + attack);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + decay);
  osc.start();
  osc.stop(ctx.currentTime + decay);
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

document.getElementById('example').addEventListener('click', () => {
  const rows = document.querySelectorAll('.row');
  rows.forEach(row => {
    const pads = row.querySelectorAll('.pad');
    pads.forEach(p => p.classList.remove('active'));
    const sound = row.dataset.sound;
    const onSteps = getExampleSteps(sound);
    onSteps.forEach(i => {
      if (pads[i]) pads[i].classList.add('active');
    });
  });
});

function getExampleSteps(sound) {
  switch (sound) {
    case 'kick': return [0, 4];
    case 'snare': return [2, 6];
    case 'hihat': return [0, 2, 4, 6];
    case 'guitar': return [1, 5];
    case 'piano': return [3, 7];
    default: return [];
  }
}
