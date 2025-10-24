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

let mediaRecorder = null;
let audioChunks = [];
let audioBlob = null;
let selectedEffect = 'chipmunk';
let isRecording = false;

// EFFECT CONFIG
const EFFECTS = {
  chipmunk: { pitch: 4, rate: 1.5, delay: 0, feedback: 0 },
  ogre: { pitch: -6, rate: 0.8, delay: 0, feedback: 0 },
  robot: { pitch: 0, rate: 1.0, delay: 0.4, feedback: 0.7 }
};

// Helper: convert AudioBuffer to WAV Blob
const bufferToWav = (buffer) => {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const length = buffer.length;
  const numSamples = length * numChannels;
  const channels = new Array(numChannels).fill(0).map((_, i) => buffer.getChannelData(i));

  const bufferArray = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(bufferArray);
  let offset = 0;
  const writeString = (s) => {
    for (let i = 0; i < s.length; i++) view.setUint8(offset++, s.charCodeAt(i));
  };

  writeString('RIFF');
  view.setUint32(offset, 36 + numSamples * 2, true); offset += 4;
  writeString('WAVE');
  writeString('fmt ');
  view.setUint32(offset, 16, true); offset += 4;
  view.setUint16(offset, 1, true); offset += 2;
  view.setUint16(offset, numChannels, true); offset += 2;
  view.setUint32(offset, sampleRate, true); offset += 4;
  view.setUint32(offset, sampleRate * numChannels * 2, true); offset += 4;
  view.setUint16(offset, numChannels * 2, true); offset += 2;
  view.setUint16(offset, 16, true); offset += 2;
  writeString('data');
  view.setUint32(offset, numSamples * 2, true); offset += 4;

  for (let i = 0; i < length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      let s = channels[ch][i];
      s = Math.max(-1, Math.min(1, s));
      view.setInt16(offset, s * 0x7fff, true);
      offset += 2;
    }
  }

  return new Blob([view], { type: 'audio/wav' });
};

const setStatus = (message, colorClass = 'bg-indigo-100 text-indigo-700') => {
  statusDisplay.textContent = message;
  statusDisplay.className = `font-bold text-lg p-3 rounded-lg ${colorClass} transition duration-300`;
};

const updateControls = (recording, recorded) => {
  if (recording) {
    recordBtn.classList.add('pulse-red');
    micIcon.classList.add('hidden');
    stopIcon.classList.remove('hidden');
    setStatus('Recording...', 'bg-red-100 text-red-700');
  } else {
    recordBtn.classList.remove('pulse-red');
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
  }
};

// APPLY EFFECT AND PLAY (using Tone.js)
const applyEffectAndPlay = async () => {
  if (!audioBlob) {
    setStatus('Please record audio first!', 'bg-yellow-100 text-yellow-700');
    return;
  }

  playBtn.disabled = true;
  playBtn.classList.add('disabled-btn');
  setStatus(`Applying and playing ${selectedEffect}...`, 'bg-blue-100 text-blue-700');

  try {
    await Tone.start();

    const arrayBuffer = await audioBlob.arrayBuffer();
    // decode with Tone's context
    const audioBuffer = await Tone.context.decodeAudioData(arrayBuffer);

    const cfg = EFFECTS[selectedEffect] || EFFECTS.chipmunk;

    // Player and effects
    const player = new Tone.Player(audioBuffer).toDestination();
    player.playbackRate = cfg.rate;

    const pitchShift = new Tone.PitchShift({ pitch: cfg.pitch });
    const feedbackDelay = new Tone.FeedbackDelay(cfg.delay, cfg.feedback);

    // Chain: player -> pitchShift -> delay -> destination
    player.connect(pitchShift);
    pitchShift.connect(feedbackDelay);
    feedbackDelay.toDestination();

    player.onstop = () => {
      updateControls(false, true);
      setStatus(`Finished playing ${selectedEffect}.`, 'bg-green-100 text-green-700');
      playBtn.disabled = false;
      playBtn.classList.remove('disabled-btn');
      // dispose nodes
      player.dispose();
      pitchShift.dispose();
      feedbackDelay.dispose();
    };

    player.start();
  } catch (err) {
    console.error('Error during playback', err);
    setStatus('An error occurred during playback. Try recording again.', 'bg-red-100 text-red-700');
    updateControls(false, true);
    playBtn.disabled = false;
    playBtn.classList.remove('disabled-btn');
  }
};

// DOWNLOAD (simple: download recorded blob; name reflects effect)
const downloadAudio = async () => {
  if (!audioBlob) {
    setStatus('No audio recorded to download.', 'bg-yellow-100 text-yellow-700');
    return;
  }

  setStatus('Preparing download...', 'bg-blue-100 text-blue-700');

  // For simplicity we download the recorded blob and name it to indicate the effect.
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

// Init UI
window.addEventListener('load', () => {
  updateControls(false, false);
  console.log('Mimic app ready.');
});