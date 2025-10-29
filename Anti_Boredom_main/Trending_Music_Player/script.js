// Genres to display. Apple iTunes Search API doesn't expose genre IDs consistently
// for discovery without auth, so we query by genre terms and sort by popularity.
const GENRES = [
  { key: "pop", label: "Pop" },
  { key: "hip hop", label: "Hip-Hop" },
  { key: "rock", label: "Rock" },
  { key: "electronic", label: "Electronic" },
  { key: "country", label: "Country" },
  { key: "classical", label: "Classical" },
  { key: "jazz", label: "Jazz" },
  { key: "latin", label: "Latin" },
];

const state = {
  currentGenreKey: GENRES[0].key,
  genreToTracks: new Map(),
  playQueue: [],
  currentIndex: -1,
  isPlaying: false,
};

const els = {
  tabs: document.querySelector(".genre-tabs"),
  sections: document.getElementById("genreSections"),
  audio: document.getElementById("audio"),
  prevBtn: document.getElementById("prevBtn"),
  playPauseBtn: document.getElementById("playPauseBtn"),
  nextBtn: document.getElementById("nextBtn"),
  seekBar: document.getElementById("seekBar"),
  currentTime: document.getElementById("currentTime"),
  duration: document.getElementById("duration"),
  npArtwork: document.getElementById("npArtwork"),
  npTitle: document.getElementById("npTitle"),
  npArtist: document.getElementById("npArtist"),
  cardTpl: document.getElementById("songCardTemplate"),
};

function formatTime(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

function createTab(genre) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.role = "tab";
  btn.setAttribute("aria-selected", genre.key === state.currentGenreKey ? "true" : "false");
  btn.textContent = genre.label;
  btn.addEventListener("click", () => selectGenre(genre.key));
  return btn;
}

function createGenreSection(genre) {
  const section = document.createElement("section");
  section.className = "genre-section";
  section.id = `genre-${genre.key}`;

  const header = document.createElement("div");
  header.className = "genre-header";
  const title = document.createElement("h2");
  title.className = "genre-title";
  title.textContent = `${genre.label} Picks`;
  const refresh = document.createElement("button");
  refresh.className = "refresh-btn";
  refresh.textContent = "Refresh";
  refresh.addEventListener("click", () => loadGenre(genre.key, true));
  header.appendChild(title);
  header.appendChild(refresh);

  const grid = document.createElement("div");
  grid.className = "songs-grid";
  grid.setAttribute("role", "list");

  const status = document.createElement("div");
  status.className = "status";
  status.textContent = "Loading…";

  section.appendChild(header);
  section.appendChild(grid);
  section.appendChild(status);
  return section;
}

function renderTracks(genreKey, tracks) {
  const section = document.getElementById(`genre-${genreKey}`);
  if (!section) return;
  const grid = section.querySelector(".songs-grid");
  const status = section.querySelector(".status");
  grid.innerHTML = "";
  status.textContent = tracks.length ? "" : "No results.";

  const frag = document.createDocumentFragment();
  for (let i = 0; i < tracks.length; i++) {
    const t = tracks[i];
    const node = els.cardTpl.content.firstElementChild.cloneNode(true);
    const img = node.querySelector(".thumb");
    const title = node.querySelector(".song-title");
    const artist = node.querySelector(".song-artist");
    const overlayBtn = node.querySelector(".play-overlay");

    img.src = t.artworkUrl100?.replace("100x100bb", "200x200bb") || "";
    img.alt = `${t.trackName} artwork`;
    title.textContent = t.trackName || "Unknown Title";
    artist.textContent = t.artistName || "Unknown Artist";

    const onPlay = () => playFromGenre(genreKey, i);
    node.addEventListener("click", onPlay);
    node.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPlay(); }
    });
    overlayBtn.addEventListener("click", (e) => { e.stopPropagation(); onPlay(); });

    node.dataset.genre = genreKey;
    node.dataset.index = String(i);
    frag.appendChild(node);
  }
  grid.appendChild(frag);
}

async function loadGenre(genreKey, force = false) {
  const section = document.getElementById(`genre-${genreKey}`);
  if (!section) return;
  const status = section.querySelector(".status");
  const cached = state.genreToTracks.get(genreKey);
  if (cached && !force) { renderTracks(genreKey, cached); return; }

  status.textContent = "Loading…";
  try {
    const url = new URL("https://itunes.apple.com/search");
    url.searchParams.set("term", genreKey);
    url.searchParams.set("media", "music");
    url.searchParams.set("entity", "song");
    url.searchParams.set("limit", "24");
    url.searchParams.set("country", "US");

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    // Filter for those with a preview
    const tracks = (data.results || []).filter(r => r.previewUrl);
    state.genreToTracks.set(genreKey, tracks);
    renderTracks(genreKey, tracks);
  } catch (err) {
    status.innerHTML = `<span class="error">Failed to load (${String(err)})</span>`;
  }
}

function selectGenre(genreKey) {
  state.currentGenreKey = genreKey;
  for (const btn of els.tabs.querySelectorAll("button")) {
    btn.setAttribute("aria-selected", btn.textContent === getGenreLabel(genreKey) ? "true" : "false");
  }
  // Optionally scroll into view
  const section = document.getElementById(`genre-${genreKey}`);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function getGenreLabel(key) { return GENRES.find(g => g.key === key)?.label || key; }

function setQueueFromGenre(genreKey) {
  const tracks = state.genreToTracks.get(genreKey) || [];
  state.playQueue = tracks;
}

function playFromGenre(genreKey, index) {
  if (state.currentGenreKey !== genreKey) {
    state.currentGenreKey = genreKey;
  }
  setQueueFromGenre(genreKey);
  playIndex(index);
}

function playIndex(index) {
  if (!state.playQueue.length) return;
  state.currentIndex = Math.max(0, Math.min(index, state.playQueue.length - 1));
  const track = state.playQueue[state.currentIndex];
  if (!track?.previewUrl) return;

  els.audio.src = track.previewUrl;
  els.audio.play().then(() => {
    state.isPlaying = true;
    updatePlayerUI();
    updatePlayingHighlight();
  }).catch(() => {
    // Autoplay might be blocked; set to paused state
    state.isPlaying = false;
    updatePlayerUI();
    updatePlayingHighlight();
  });

  els.npArtwork.src = track.artworkUrl100?.replace("100x100bb", "200x200bb") || "";
  els.npTitle.textContent = track.trackName || "—";
  els.npArtist.textContent = track.artistName || "—";
}

function playPause() {
  if (!els.audio.src) return;
  if (state.isPlaying) {
    els.audio.pause();
  } else {
    els.audio.play().catch(() => {});
  }
}

function next() {
  if (!state.playQueue.length) return;
  const nextIdx = (state.currentIndex + 1) % state.playQueue.length;
  playIndex(nextIdx);
}

function prev() {
  if (!state.playQueue.length) return;
  const prevIdx = (state.currentIndex - 1 + state.playQueue.length) % state.playQueue.length;
  playIndex(prevIdx);
}

function updatePlayerUI() {
  els.playPauseBtn.textContent = state.isPlaying ? "❚❚" : "►";
  els.playPauseBtn.setAttribute("aria-label", state.isPlaying ? "Pause" : "Play");
  const enabled = Boolean(state.playQueue.length);
  els.playPauseBtn.disabled = !enabled;
  els.nextBtn.disabled = !enabled;
  els.prevBtn.disabled = !enabled;
  els.seekBar.disabled = !enabled;
}

function updatePlayingHighlight() {
  document.querySelectorAll('.song-card.playing').forEach(el => el.classList.remove('playing'));
  if (state.currentIndex < 0) return;
  const current = state.playQueue[state.currentIndex];
  if (!current) return;
  const genreKey = state.currentGenreKey;
  const cards = document.querySelectorAll(`.song-card[data-genre="${genreKey}"]`);
  const target = Array.from(cards).find(c => Number(c.dataset.index) === state.currentIndex);
  if (target) target.classList.add('playing');
}

function attachPlayerEvents() {
  els.prevBtn.addEventListener('click', prev);
  els.nextBtn.addEventListener('click', next);
  els.playPauseBtn.addEventListener('click', playPause);

  els.audio.addEventListener('play', () => { state.isPlaying = true; updatePlayerUI(); });
  els.audio.addEventListener('pause', () => { state.isPlaying = false; updatePlayerUI(); });
  els.audio.addEventListener('ended', next);
  els.audio.addEventListener('timeupdate', () => {
    const ct = els.audio.currentTime || 0;
    const dur = els.audio.duration || 30;
    els.currentTime.textContent = formatTime(ct);
    els.duration.textContent = isFinite(dur) ? formatTime(dur) : '0:30';
    const pct = dur ? Math.min(100, Math.max(0, (ct / dur) * 100)) : 0;
    els.seekBar.value = String(pct);
  });
  els.seekBar.addEventListener('input', () => {
    const dur = els.audio.duration || 30;
    els.audio.currentTime = (Number(els.seekBar.value) / 100) * dur;
  });

  // Basic keyboard support
  window.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement) return; // ignore typing on range
    if (e.code === 'Space') { e.preventDefault(); playPause(); }
    if (e.key === 'ArrowRight') { next(); }
    if (e.key === 'ArrowLeft') { prev(); }
  });
}

async function boot() {
  // Build tabs and sections
  GENRES.forEach(g => {
    els.tabs.appendChild(createTab(g));
    els.sections.appendChild(createGenreSection(g));
  });
  attachPlayerEvents();

  // Initial loads in parallel with a small stagger to be gentle
  // Load first genre immediately, then queue others
  await loadGenre(GENRES[0].key);
  GENRES.slice(1).forEach((g, i) => setTimeout(() => loadGenre(g.key), 150 * i));

  updatePlayerUI();
}

boot();


