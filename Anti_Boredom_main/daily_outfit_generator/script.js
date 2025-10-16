/*
  Local "API" simulation and app logic
  - outfitsData: local array of outfit objects
  - api.* functions simulate async fetches (Promise)
  - daily deterministic suggestion: hash(date+occasion) % N
  - favorites stored in localStorage under key "dw_favs"
*/

const outfitsData = [
  { id: "o1", title: "Cozy Casual — Denim & Tee", emoji: "👕", label: "Casual Day", occasion: "casual",
    top:"Cotton Tee", bottom:"Relaxed Denim", shoes:"White Sneakers", acc:"Canvas Backpack",
    desc:"A comfy cotton tee, relaxed denim, and white sneakers — ideal for college, coffee, or errands." },
  { id: "o2", title: "Smart Formal — Shirt & Chinos", emoji: "👔", label: "Office Ready", occasion: "formal",
    top:"Button-down Shirt", bottom:"Slim Chinos", shoes:"Leather Loafers", acc:"Minimal Watch",
    desc:"Clean lines and neutral tones for presentations, interviews, or office days." },
  { id: "o3", title: "Sporty Ease — Track & Tee", emoji: "🏃", label: "Gym Vibes", occasion: "sporty",
    top:"Performance Tee", bottom:"Track Pants", shoes:"Running Shoes", acc:"Cap",
    desc:"Breathable fabrics and comfy trainers — perfect for workouts or quick runs." },
  { id: "o4", title: "Party Look — Shirt & Boots", emoji: "🕺", label: "Night Out", occasion: "party",
    top:"Satin Shirt", bottom:"Black Jeans", shoes:"Chelsea Boots", acc:"Chain Necklace",
    desc:"A little sheen, well-fitted pants, and bold boots for evenings out." },
  { id: "o5", title: "Layered Fall — Knit & Jacket", emoji: "🧥", label: "Layer Up", occasion: "casual",
    top:"Knit Sweater + Jacket", bottom:"Corduroy Trousers", shoes:"Desert Boots", acc:"Scarf",
    desc:"Warm layers and textured fabrics for cool-weather comfort." },
  { id: "o6", title: "Smart Casual — Polo & Slacks", emoji: "🧑‍💼", label: "Meet & Greet", occasion: "formal",
    top:"Polo Shirt", bottom:"Tailored Slacks", shoes:"Derby Shoes", acc:"Leather Belt",
    desc:"A crisp polo and slacks: relaxed but polished." },
  { id: "o7", title: "Summer Fresh — Linen Set", emoji: "🌞", label: "Breezy", occasion: "casual",
    top:"Linen Shirt", bottom:"Linen Shorts", shoes:"Sandals", acc:"Sunglasses",
    desc:"Lightweight linen for hot days — breathable and effortless." },
  { id: "o8", title: "Edgy Street — Hoodie & Rips", emoji: "🧑‍🎤", label: "Street", occasion: "casual",
    top:"Oversized Hoodie", bottom:"Ripped Jeans", shoes:"High-top Sneakers", acc:"Beanie",
    desc:"Comfort-forward with an edge — for urban strolls and cafe hangs." },
  { id: "o9", title: "Athleisure — Hoodie & Joggers", emoji: "🛹", label: "Chill Sport", occasion: "sporty",
    top:"Zip Hoodie", bottom:"Joggers", shoes:"Slip-on Trainers", acc:"Sport Watch",
    desc:"Move-ready but lounge-friendly — the modern everyday uniform." },
  { id: "o10", title: "Semi-Formal — Blazer Combo", emoji: "🧑‍⚖️", label: "Semi-Formal", occasion: "formal",
    top:"Unstructured Blazer", bottom:"Dark Trousers", shoes:"Brogues", acc:"Pocket Square",
    desc:"Dressy but not stiff — ideal for dinners or semi-formal events." }
];

// ----- Local API (simulated) -----
const api = {
  getAllOutfits: async () => {
    // simulate small delay
    await new Promise(r => setTimeout(r, 80));
    return outfitsData.slice();
  },

  getOutfitById: async (id) => {
    await new Promise(r => setTimeout(r, 40));
    return outfitsData.find(o => o.id === id) || null;
  },

  getDailyOutfit: async (dateStr = null, occasion = "all") => {
    // deterministic pick for a given date + occasion
    await new Promise(r => setTimeout(r, 60));
    const d = dateStr || (new Date()).toISOString().slice(0,10);
    const pool = (occasion === 'all') ? outfitsData : outfitsData.filter(o => o.occasion === occasion);
    if (!pool.length) return null;
    const idx = seededIndex(d + "|" + occasion, pool.length);
    return pool[idx];
  },

  getRandomOutfit: async (occasion = "all") => {
    await new Promise(r => setTimeout(r, 40));
    const pool = (occasion === 'all') ? outfitsData : outfitsData.filter(o => o.occasion === occasion);
    if (!pool.length) return null;
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
  }
};

// deterministic seed -> index
function seededIndex(seed, max) {
  // simple hash
  let h = 2166136261 >>> 0;
  for (let i=0;i<seed.length;i++){
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // convert to positive and mod
  return Math.abs(h) % max;
}

// ----- UI helpers & state -----
const els = {
  visualEmoji: document.getElementById('visualEmoji'),
  visualLabel: document.getElementById('visualLabel'),
  outfitTitle: document.getElementById('outfitTitle'),
  chips: document.getElementById('chips'),
  outfitDesc: document.getElementById('outfitDesc'),
  topItem: document.getElementById('topItem'),
  bottomItem: document.getElementById('bottomItem'),
  shoesItem: document.getElementById('shoesItem'),
  accItem: document.getElementById('accItem'),
  occItem: document.getElementById('occItem'),
  todayLabel: document.getElementById('todayLabel'),
  seedNote: document.getElementById('seedNote'),
  favBtn: document.getElementById('favBtn'),
  nextBtn: document.getElementById('nextBtn'),
  copyBtn: document.getElementById('copyBtn'),
  shareBtn: document.getElementById('shareBtn'),
  favList: document.getElementById('favList'),
  noFavs: document.getElementById('noFavs'),
  clearFavs: document.getElementById('clearFavs'),
  randomBtn: document.getElementById('randomBtn'),
  todayBtn: document.getElementById('todayBtn'),
  openAll: document.getElementById('openAll'),
  occasionSelect: document.getElementById('occasionSelect'),
  themeToggle: document.getElementById('themeToggle'),
  visual: document.getElementById('visual'),
};

let currentOutfit = null;

const FAV_KEY = 'dw_favs_v1';

// ----- favorites management -----
function loadFavs(){
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(e){ return [];}
}
function saveFavs(arr){
  localStorage.setItem(FAV_KEY, JSON.stringify(arr));
}

function isFavorited(id){
  return loadFavs().some(f=>f.id===id);
}

function toggleFavorite(outfit){
  const favs = loadFavs();
  const idx = favs.findIndex(f => f.id === outfit.id);
  if (idx === -1){
    favs.unshift(outfit);
    saveFavs(favs);
    renderFavs();
    favBtnText(true);
    flashMessage("Saved to favorites!");
  } else {
    favs.splice(idx,1);
    saveFavs(favs);
    renderFavs();
    favBtnText(false);
    flashMessage("Removed from favorites.");
  }
}

function favBtnText(state){
  els.favBtn.textContent = state ? "Favorited ★" : "Add to favorites ★";
}

// ----- rendering -----
function renderOutfit(o, noteSeed = '') {
  if (!o) {
    els.outfitTitle.textContent = "No outfit";
    els.outfitDesc.textContent = "No suggestion could be found for that filter.";
    return;
  }
  currentOutfit = o;
  els.visualEmoji.textContent = o.emoji || '👕';
  els.visualLabel.textContent = o.label || '';
  els.outfitTitle.textContent = o.title;
  els.outfitDesc.textContent = o.desc;
  els.topItem.textContent = o.top;
  els.bottomItem.textContent = o.bottom;
  els.shoesItem.textContent = o.shoes;
  els.accItem.textContent = o.acc;
  els.occItem.textContent = o.occasion;

  // chips
  els.chips.innerHTML = '';
  const chips = [o.occasion, o.top, o.bottom];
  chips.forEach(c=>{
    const el = document.createElement('div'); el.className='chip'; el.textContent=c;
    els.chips.appendChild(el);
  });

  // seed note
  els.todayLabel.textContent = new Date().toLocaleDateString();
  els.seedNote.textContent = noteSeed ? noteSeed : '';
  favBtnText(isFavorited(o.id));
}

// favorites list UI
function renderFavs(){
  const favs = loadFavs();
  els.favList.innerHTML = '';
  if (!favs.length){
    els.noFavs.style.display = 'block';
    return;
  }
  els.noFavs.style.display = 'none';
  favs.forEach(f=>{
    const item = document.createElement('div'); item.className='fav-item';
    item.innerHTML = `
      <div class="fav-left" style="background:linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))">${f.emoji}</div>
      <div class="fav-right">
        <div style="font-weight:600">${escapeHtml(f.title)}</div>
        <div class="small muted">${escapeHtml(f.occasion)} · ${escapeHtml(f.top)}</div>
      </div>
      <div>
        <button class="ghost" data-id="${f.id}" title="Remove">Delete</button>
      </div>
    `;
    els.favList.appendChild(item);
  });

  // attach delete handlers
  els.favList.querySelectorAll('button[data-id]').forEach(btn=>{
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const favs2 = loadFavs().filter(x=>x.id!==id);
      saveFavs(favs2);
      renderFavs();
      if (currentOutfit && currentOutfit.id === id) favBtnText(false);
    });
  });
}

// small utility
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// flashing message (tiny)
function flashMessage(msg){
  const el = document.createElement('div');
  el.textContent = msg;
  Object.assign(el.style,{position:'fixed',right:'18px',bottom:'18px',background:'rgba(0,0,0,0.6)',color:'#fff',padding:'10px 12px',borderRadius:'8px',zIndex:9999});
  document.body.appendChild(el);
  setTimeout(()=> el.style.opacity = '0', 1000);
  setTimeout(()=> el.remove(), 1600);
}

// ----- actions -----
els.nextBtn.addEventListener('click', async () => {
  const occ = els.occasionSelect.value;
  const r = await api.getRandomOutfit(occ);
  renderOutfit(r, "(random)");
});

els.randomBtn.addEventListener('click', async () => {
  const occ = els.occasionSelect.value;
  const r = await api.getRandomOutfit(occ);
  renderOutfit(r, "(temp random)");
});

els.todayBtn.addEventListener('click', async () => {
  const occ = els.occasionSelect.value;
  const d = (new Date()).toISOString().slice(0,10);
  const ot = await api.getDailyOutfit(d, occ);
  renderOutfit(ot, `Deterministic for ${d}`);
});

els.favBtn.addEventListener('click', () => {
  if (!currentOutfit) return;
  toggleFavorite(currentOutfit);
});

els.clearFavs.addEventListener('click', () => {
  if (confirm("Clear all favorites?")) {
    saveFavs([]);
    renderFavs();
  }
});

els.copyBtn.addEventListener('click', () => {
  if (!currentOutfit) return;
  const txt = `${currentOutfit.title} — ${currentOutfit.desc}\nTop: ${currentOutfit.top}\nBottom: ${currentOutfit.bottom}\nShoes: ${currentOutfit.shoes}\nAccessory: ${currentOutfit.acc}`;
  navigator.clipboard?.writeText(txt).then(()=> flashMessage("Copied to clipboard"));
});

els.shareBtn.addEventListener('click', async () => {
  if (!currentOutfit) return flashMessage("No outfit to share.");
  const txt = `${currentOutfit.title} — ${currentOutfit.desc}`;
  if (navigator.share) {
    navigator.share({title:currentOutfit.title,text:txt}).catch(()=> flashMessage("Share canceled"));
  } else {
    navigator.clipboard?.writeText(txt).then(()=> flashMessage("Share text copied (use your apps)"));
  }
});

els.openAll.addEventListener('click', async () => {
  const all = await api.getAllOutfits();
  // quick modal basic
  const list = all.map(a => `${a.emoji} ${a.title} — ${a.occasion}`).join('\n');
  alert("All outfits:\n\n" + list);
});

els.occasionSelect.addEventListener('change', async () => {
  // when the occasion changes, show today's deterministic for that occasion
  const occ = els.occasionSelect.value;
  const d = (new Date()).toISOString().slice(0,10);
  const ot = await api.getDailyOutfit(d, occ);
  renderOutfit(ot, `Deterministic for ${d}`);
});

els.themeToggle.addEventListener('click', () => {
  const cur = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', cur === 'light' ? 'light' : 'dark');
});

// favorites initial render
renderFavs();

// init: show today's outfit for selected occasion
(async function init(){
  try {
    const occ = els.occasionSelect.value;
    const d = (new Date()).toISOString().slice(0,10);
    const outfit = await api.getDailyOutfit(d, occ);
    renderOutfit(outfit, `Deterministic for ${d}`);
  } catch(e){
    console.error(e);
    renderOutfit(null);
  }
})();

