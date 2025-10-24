// ...existing code...

/* Mimic app JavaScript (moves inline script from mimic.html here) */

const statusDisplay = document.getElementById('status-display');
const recordBtn = document.getElementById('record-btn');
const playBtn = document.getElementById('play-btn');
const downloadBtn = document.getElementById('download-btn');
const effectButtons = document.querySelectorAll('.effect-btn');
const micIcon = document.getElementById('mic-icon');
const stopIcon = document.getElementById('stop-icon');
const playText = document.getElementById('play-text');
const particles = document.getElementById('particles');
const visualizerCanvas = document.getElementById('visualizer');

let mediaRecorder = null;
let audioChunks = [];
let audioBlob = null;
let selectedEffect = 'chipmunk';
let isRecording = false;

let visualizerAnim = null;
let analyserNode = null;

// EFFECT CONFIG
const EFFECTS = {
  chipmunk: { pitch: 4, rate: 1.5, delay: 0, feedback: 0 },
  ogre: { pitch: -6, rate: 0.8, delay: 0, feedback: 0 },
  robot: { pitch: 0, rate: 1.0, delay: 0.4, feedback: 0.7 }
};

const setStatus = (message, colorClass = 'bg-indigo-100 text-indigo-700') => {
  statusDisplay.textContent = message;
  statusDisplay.className = `font-bold text-lg p-3 rounded-lg ${colorClass} transition duration-300`;
};

const updateControls = (recording, recorded) => {
  if (recording) {
    recordBtn.classList.add('recording');
    micIcon.classList.add('hidden');
    stopIcon.classList.remove('hidden');
    setStatus('Recording...', 'bg-red-100 text-red-700');
  } else {
    recordBtn.classList.remove('recording');
    micIcon.classList.remove('hidden');
    stopIcon.classList.add('hidden');
  }

  if (!recording && recorded) {
    playBtn.disabled = false;
    downloadBtn.disabled = false;
    playBtn.classList.remove('disabled-btn');
    downloadBtn.classList.remove('disabled-btn');
    setStatus('Recording saved. Select an effect and play!', 'bg-green-100 text-green-700');
  } else if (!recording && !recorded) {
    playBtn.disabled = true;
    downloadBtn.disabled = true;
    playBtn.classList.add('disabled-btn');
    downloadBtn.classList.add('disabled-btn');
    setStatus('Ready to record', 'bg-indigo-100 text-indigo-700');
  }
  playText.textContent = `Play ${selectedEffect.charAt(0).toUpperCase() + selectedEffect.slice(1)} Voice`;
};

// small particle burst around the record button
function burstParticles(count = 14) {
  const rect = recordBtn.getBoundingClientRect();
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    // random color blend
    const hue = 330 + Math.round(Math.random() * 60);
    p.style.background = `linear-gradient(90deg, hsl(${hue} 90% 60%), rgba(255,255,255,0.18))`;
    // start near center of button
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    p.style.left = `${startX - document.documentElement.clientLeft}px`;
    p.style.top = `${startY - document.documentElement.clientTop}px`;
    // random translate
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 80;
    const tx = Math.cos(angle) * dist + 'px';
    const ty = Math.sin(angle) * dist + 'px';
    p.style.setProperty('--tx', tx);
    p.style.setProperty('--ty', ty);
    particles.appendChild(p);
    // cleanup after animation
    p.addEventListener('animationend', () => p.remove());
  }
}

// RECORDING
const startRecording = async () => {
  if (isRecording) {
    stopRecording();
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];
    audioBlob = null;
    isRecording = true;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      isRecording = false;
      updateControls(false, true);
    };

    mediaRecorder.start();
    updateControls(true, false);
    burstParticles(20);
  } catch (err) {
    console.error('Microphone access error', err);
    setStatus('Error: Microphone access denied or failed.', 'bg-red-100 text-red-700');
  }
};

const stopRecording = () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    // stop tracks so browser can release mic
    mediaRecorder.stream?.getTracks?.().forEach(t => t.stop());
    burstParticles(10);
  }
};

// visualizer helpers
function resizeCanvas(canvas) {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return ctx;
}

function startVisualizerForNode(node) {
  stopVisualizer();
  if (!visualizerCanvas) return;
  const ctx = resizeCanvas(visualizerCanvas);
  analyserNode = Tone.context.createAnalyser();
  analyserNode.fftSize = 256;
  // connect the node to analyser, and analyser to destination if needed
  try {
    node.connect(analyserNode);
  } catch (e) {
    // fallback: if node is a Tone.Player use its output
    if (node.output) node.output.connect(analyserNode);
  }
  analyserNode.connect(Tone.context.destination);

  const bufferLength = analyserNode.frequencyBinCount;
  const data = new Uint8Array(bufferLength);

  function draw() {
    visualizerAnim = requestAnimationFrame(draw);
    analyserNode.getByteFrequencyData(data);

    // clear
    ctx.clearRect(0, 0, visualizerCanvas.clientWidth, visualizerCanvas.clientHeight);

    const barWidth = Math.max(2, visualizerCanvas.clientWidth / bufferLength);
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = data[i] / 255;
      const barHeight = v * visualizerCanvas.clientHeight;
      const hue = 200 + i / bufferLength * 120;
      ctx.fillStyle = `hsl(${hue} 80% ${30 + v * 40}%)`;
      ctx.fillRect(x, visualizerCanvas.clientHeight - barHeight, barWidth * 0.85, barHeight);
      x += barWidth;
    }
  }
  draw();
}

function stopVisualizer() {
  if (visualizerAnim) {
    cancelAnimationFrame(visualizerAnim);
    visualizerAnim = null;
  }
  if (analyserNode) {
    try { analyserNode.disconnect(); } catch {}
    analyserNode = null;
  }
  if (visualizerCanvas) {
    const ctx = visualizerCanvas.getContext('2d');
    ctx && ctx.clearRect(0, 0, visualizerCanvas.clientWidth, visualizerCanvas.clientHeight);
  }
}

// APPLY EFFECT AND PLAY (using Tone.js)
const applyEffectAndPlay = async () => {
  if (!audioBlob) {
    setStatus('Please record audio first!', 'bg-yellow-100 text-yellow-700');
    return;
  }

  playBtn.disabled = true;
  playBtn.classList.add('disabled-btn', 'playing');
  setStatus(`Applying and playing ${selectedEffect}...`, 'bg-blue-100 text-blue-700');

  try {
    await Tone.start();

    const arrayBuffer = await audioBlob.arrayBuffer();
    // decode with Tone's context
    const audioBuffer = await Tone.context.decodeAudioData(arrayBuffer);

    const cfg = EFFECTS[selectedEffect] || EFFECTS.chipmunk;

    // Player and effects
    const player = new Tone.Player(audioBuffer).toDestination();
    player.autostart = false;
    player.playbackRate = cfg.rate;

    const pitchShift = new Tone.PitchShift({ pitch: cfg.pitch }).toDestination();
    const feedbackDelay = new Tone.FeedbackDelay(cfg.delay, cfg.feedback).toDestination();

    // Chain: player -> pitchShift -> delay -> destination
    player.connect(pitchShift);
    pitchShift.connect(feedbackDelay);
    feedbackDelay.toDestination();

    // For visualizer we connect player -> analyser
    startVisualizerForNode(player);

    player.onstop = () => {
      updateControls(false, true);
      setStatus(`Finished playing ${selectedEffect}.`, 'bg-green-100 text-green-700');
      playBtn.disabled = false;
      playBtn.classList.remove('disabled-btn', 'playing');
      // dispose nodes
      try { player.dispose(); pitchShift.dispose(); feedbackDelay.dispose(); } catch {}
      stopVisualizer();
    };

    player.start();
  } catch (err) {
    console.error('Error during playback', err);
    setStatus('An error occurred during playback. Try recording again.', 'bg-red-100 text-red-700');
    updateControls(false, true);
    playBtn.disabled = false;
    playBtn.classList.remove('disabled-btn', 'playing');
    stopVisualizer();
  }
};

// DOWNLOAD (simple: download recorded blob; name reflects effect)
const downloadAudio = async () => {
  if (!audioBlob) {
    setStatus('No audio recorded to download.', 'bg-yellow-100 text-yellow-700');
    return;
  }

  setStatus('Preparing download...', 'bg-blue-100 text-blue-700');

  const fileName = `voice_${selectedEffect}.webm`;
  const url = URL.createObjectURL(audioBlob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();

  setStatus(`Downloaded ${fileName}!`, 'bg-green-100 text-green-700');
  // small confetti-like burst
  burstParticles(18);
};

// EFFECT BUTTONS
effectButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    effectButtons.forEach(b => b.classList.remove('ring-4', 'ring-offset-2', 'scale-105'));
    e.currentTarget.classList.add('ring-4', 'ring-offset-2', 'scale-105');
    selectedEffect = e.currentTarget.dataset.effect || selectedEffect;
    updateControls(isRecording, audioBlob !== null);
  });

  if (button.dataset.effect === selectedEffect) {
    button.classList.add('ring-4', 'ring-offset-2', 'scale-105');
  }
});

// Wire up UI buttons
recordBtn.addEventListener('click', startRecording);
playBtn.addEventListener('click', applyEffectAndPlay);
downloadBtn.addEventListener('click', downloadAudio);

// handle keyboard space to toggle record
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    recordBtn.click();
  }
});

// Init UI
window.addEventListener('load', () => {
  updateControls(false, false);
  // ensure canvas sized
  if (visualizerCanvas) resizeCanvas(visualizerCanvas);
  window.addEventListener('resize', () => { if (visualizerCanvas) resizeCanvas(visualizerCanvas); });
  console.log('Mimic app ready with animations.');
});
