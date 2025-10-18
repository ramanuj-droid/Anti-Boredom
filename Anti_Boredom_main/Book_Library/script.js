// Core DOM refs
const container = document.getElementById('book-container');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const filterAuthor = document.getElementById('filterAuthor');
const filterGenre = document.getElementById('filterGenre');
const suggestions = document.getElementById('suggestions');
const loader = document.getElementById('loader');
const bookOfDay = document.getElementById('bookOfDay');
const tabAll = document.getElementById('tabAll');
const tabFav = document.getElementById('tabFav');

// App state
const state = {
  books: [],
  sort: '',
  view: 'all',
};

// Loader
function showLoader(show) {
  if (!loader) return;
  loader.classList[show ? 'remove' : 'add']('hidden');
}

// Theme persistence
function initTheme() {
  const pref = localStorage.getItem('theme') || 'light';
  if (pref === 'dark') document.documentElement.classList.add('dark');
}

// Open Library fetch
async function fetchBooks(query = 'bestseller books') {
  showLoader(true);
  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=36`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.docs || [];
  } catch (e) {
    console.error('Fetch failed', e);
    // Fallback to a more reliable query if the first one fails
    if (query !== 'popular books') {
      console.log('Retrying with fallback query...');
      return await fetchBooks('popular books');
    }
    return [];
  } finally {
    showLoader(false);
  }
}

// Suggestions 
let suggestIndex = -1;
let suggestTimer;
async function fetchSuggestions(q) {
  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=8`);
  const data = await res.json();
    return (data.docs || []).map(d => ({
      title: d.title || 'Untitled',
      author: (d.author_name && d.author_name[0]) || '',
      year: d.first_publish_year || ''
    }));
  } catch {
    return [];
  }
}
function renderSuggestions(items) {
  if (!suggestions) return;
  if (!items.length) { suggestions.classList.add('hidden'); return; }
  suggestions.innerHTML = items.map((it,i)=>
    `<div class="px-3 py-2 text-sm cursor-pointer ${i===suggestIndex?'bg-amber-100 dark:bg-stone-700':''}" data-index="${i}">
      <div class="font-medium">${it.title}</div>
      <div class="text-xs text-stone-500 dark:text-stone-400">${it.author}${it.year?` • ${it.year}`:''}</div>
    </div>`
  ).join('');
  suggestions.classList.remove('hidden');
  Array.from(suggestions.children).forEach((el) => {
    el.addEventListener('click', () => {
      const idx = Number(el.getAttribute('data-index'));
      const chosen = items[idx];
      searchInput.value = `${chosen.title}${chosen.author?` ${chosen.author}`:''}`;
      suggestions.classList.add('hidden');
      triggerSearch();
    });
  });
}

function triggerSearch() {
  const q = searchInput.value.trim() || 'bestseller books';
  fetchBooks(q).then(list => {
    state.books = list;
    buildAuthors(list);
    renderBookOfDay(list);
    applyFiltersAndRender();
  });
}

// Ratings (localStorage)
function ratingKey(bookKey) { return `rating:${bookKey}`; }
function getLocalRating(key) { try { return Number(localStorage.getItem(key)) || 0; } catch { return 0; } }
function setLocalRating(key, value) { try { localStorage.setItem(key, String(value)); } catch {} }

function starSvg(active) {
  return `<span class="inline-block">${active ? filledStar() : emptyStar()}</span>`;
}
function filledStar() {
  return `<svg viewBox="0 0 24 24" class="w-5 h-5" fill="#f59e0b"><path d="M12 .587l3.668 7.431L24 9.748l-6 5.847 1.417 8.268L12 19.771l-7.417 4.092L6 15.595 0 9.748l8.332-1.73z"/></svg>`;
}
function emptyStar() {
  return `<svg viewBox="0 0 24 24" class="w-5 h-5" fill="#d6d3d1"><path d="M22.765 9.748l-7.097-1.474L12 .587 8.332 8.274 1.235 9.748l5.135 5.002L5.1 22.132 12 18.417l6.9 3.715-1.27-7.382 5.135-5.002z"/></svg>`;
}
function attachStarHandlers(cardEl, key) {
  const starEls = cardEl.querySelectorAll('[data-star]');
  starEls.forEach((s) => {
    s.addEventListener('click', () => {
      const val = Number(s.getAttribute('data-star'));
      setLocalRating(ratingKey(key), val);
      const starsRow = cardEl.querySelector('.stars');
      starsRow.innerHTML = [1,2,3,4,5].map(i => `<button data-star="${i}">${starSvg(i <= val)}</button>`).join('');
      attachStarHandlers(cardEl, key);
    });
  });
}

// Favourites (localStorage)
const FAV_KEY = 'favourites:v1';
function loadFavourites() { try { return JSON.parse(localStorage.getItem(FAV_KEY) || '{}'); } catch { return {}; } }
function saveFavourites(map) { try { localStorage.setItem(FAV_KEY, JSON.stringify(map)); } catch {} }
function isFavourite(key) { const favs = loadFavourites(); return Boolean(favs[key]); }
function toggleFavourite(key, info) {
  const favs = loadFavourites();
  if (favs[key]) delete favs[key]; else favs[key] = info;
  saveFavourites(favs);
}

// UI rendering
function renderBooks(list) {
  container.innerHTML = '';
  if (!list || !list.length) {
    container.innerHTML = '<div class="text-sm text-stone-500">No books found.</div>';
    return;
  }
  list.forEach(b => {
    const title = b.title || 'No title';
    const authors = b.author_name ? b.author_name.join(', ') : 'Unknown';
    // Generate cover image URL - prioritize real book covers
    let cover;
    if (b.cover_i) {
      cover = `https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg`;
      console.log(`Using cover_i for "${title}": ${cover}`);
    } else if (b.isbn && b.isbn.length > 0) {
      cover = `https://covers.openlibrary.org/b/isbn/${b.isbn[0]}-L.jpg`;
      console.log(`Using ISBN for "${title}": ${cover}`);
    } else {
      // Only use fallback if no real cover is available
      cover = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3';
      console.log(`Using fallback for "${title}" - no cover_i or ISBN available`);
    }
    
    const key = b.key || b.cover_edition_key || title;
    const userRating = getLocalRating(ratingKey(key));
    const apiRating = b.ratings_average ? parseFloat(b.ratings_average).toFixed(1) : null;
    const fav = isFavourite(key);
    const card = document.createElement('div');
    card.className = 'rounded-2xl border border-amber-300/60 dark:border-stone-700 bg-white dark:bg-stone-800 p-3 shadow hover:shadow-lg transition group';
    card.innerHTML = `
      <!-- Book Cover Section - Fixed Height -->
      <div class="book-cover-wrapper mb-4">
        <div class="flip w-full h-full">
          <div class="flip-inner rounded-xl w-full h-full">
            <div class="flip-front overflow-hidden rounded-xl border border-amber-200/60 dark:border-stone-700 bg-gradient-to-br from-amber-100 to-orange-100 relative w-full h-full">
              <img src="${cover}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition bg-amber-50" 
                   onerror="
                     if (this.src.includes('covers.openlibrary.org')) {
                       // Try smaller size if large fails
                       this.src = this.src.replace('-L.jpg', '-M.jpg');
                     } else if (this.src.includes('-M.jpg')) {
                       // Try even smaller size
                       this.src = this.src.replace('-M.jpg', '-S.jpg');
                     } else {
                       // Final fallback
                       this.src = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop';
                       this.onerror = null;
                     }
                   "
                   style="width: 100%; height: 100%; display: block;"
                   />
              <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="flip-back bg-white/95 dark:bg-stone-800/95 rounded-xl">
              <div class="summary-shell summary-container">
                <div class="summary-header px-3 py-2 rounded-t-xl">
                  <div class="text-[11px] uppercase tracking-wide text-amber-900/80 dark:text-amber-200">Summary</div>
                  <div class="text-xs font-semibold line-clamp-1">${title}</div>
                </div>
                <div class="p-3 summary-scroll grow">
                  <p class="summary-text" data-summary>Loading summary…</p>
                  <div class="summary-fade"></div>
                </div>
                <div class="px-3 py-2 border-t border-amber-200/60 dark:border-stone-700 text-right">
                  <a class="text-xs text-amber-700 dark:text-amber-300 hover:underline" target="_blank" rel="noopener" data-more>Read more ↗</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Book Info Section - Separate and Protected -->
      <div class="book-info-wrapper">
        <h3 class="book-card-title text-sm font-semibold text-stone-800 dark:text-stone-100 mb-1">${title}</h3>
        <p class="book-card-author text-xs text-stone-600 dark:text-stone-300 mb-2">${authors}</p>
        ${apiRating ? `<div class="text-xs text-amber-600 dark:text-amber-400 mb-2">⭐ ${apiRating}/5 (API)</div>` : ''}
        <div class="flex items-center justify-between">
          <button class="fav px-2 py-1 text-xs rounded border border-amber-300/60 dark:border-stone-600 hover:bg-amber-100 dark:hover:bg-stone-700 transition">${fav ? '❤️ Favourited' : '🤍 Add to Favourites'}</button>
          <div class="stars flex gap-1">${[1,2,3,4,5].map(i => `<button data-star="${i}">${starSvg(i <= userRating)}</button>`).join('')}</div>
        </div>
      </div>`;
    attachStarHandlers(card, key);
    const favBtn = card.querySelector('.fav');
    favBtn.addEventListener('click', () => {
      toggleFavourite(key, { title, authors, cover });
      favBtn.textContent = isFavourite(key) ? '❤️ Favourited' : '🤍 Add to Favourites';
    });
    //fetch summary on first hover
    const flipEl = card.querySelector('.flip');
    const summaryEl = card.querySelector('[data-summary]');
    let fetched = false;
    const summaryCacheKey = `summary:${key}`;
    flipEl.addEventListener('mouseenter', async () => {
      if (fetched) return;
      fetched = true;
      try {
        // cache check
        const cached = localStorage.getItem(summaryCacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          summaryEl.textContent = parsed.text;
          if (parsed.moreUrl) card.querySelector('[data-more]').href = parsed.moreUrl;
          return;
        }

        const workKey = (b.key || '').startsWith('/works/') ? b.key : null;
        let text = 'No summary available.';
        let moreUrl = '';
        if (workKey) {
          const res = await fetch(`https://openlibrary.org${workKey}.json`);
          const data = await res.json();
          text = (typeof data.description === 'string') ? data.description : (data.description && data.description.value) || data.subtitle || text;
          moreUrl = `https://openlibrary.org${workKey}`;
        }
        summaryEl.textContent = text;
        if (moreUrl) card.querySelector('[data-more]').href = moreUrl;
        localStorage.setItem(summaryCacheKey, JSON.stringify({ text, moreUrl }));
      } catch (e) {
        summaryEl.textContent = 'No summary available.';
      }
    });
    container.appendChild(card);
  });
}

function renderBookOfDay(list) {
  if (!bookOfDay) return;
  if (!list || !list.length) { bookOfDay.classList.add('hidden'); return; }
  
  const today = new Date().toISOString().split('T')[0];
  
  const stored = localStorage.getItem('bookOfDay');
  let bookOfDayData = null;
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) {
        bookOfDayData = parsed.book;
      }
    } catch (e) {
      console.log('Invalid stored book of day data');
    }
  }
  
  // If no book for today, pick a new one
  if (!bookOfDayData) {
    const pick = list[Math.floor(Math.random()*list.length)];
    bookOfDayData = {
      title: pick.title || 'Featured Book',
      authors: pick.author_name ? pick.author_name.join(', ') : 'Unknown',
      cover: pick.cover_i ? `https://covers.openlibrary.org/b/id/${pick.cover_i}-L.jpg` : 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop'
    };
    
    // Store for today
    localStorage.setItem('bookOfDay', JSON.stringify({
      date: today,
      book: bookOfDayData
    }));
  }
  
  bookOfDay.classList.remove('hidden');
  bookOfDay.innerHTML = `
    <div class="flex gap-4 items-center">
      <img src="${bookOfDayData.cover}" alt="${bookOfDayData.title}" class="w-24 h-32 object-cover rounded-lg border border-amber-200/60 dark:border-stone-700" />
      <div>
        <div class="text-xs uppercase tracking-wide text-amber-700 dark:text-amber-300">Book of the Day</div>
        <h3 class="text-lg font-semibold">${bookOfDayData.title}</h3>
        <div class="text-sm text-stone-500 dark:text-stone-400">${bookOfDayData.authors}</div>
      </div>
    </div>`;
}

// Populate author filter
function buildAuthors(list) {
  if (!filterAuthor) return;
  const authors = [...new Set((list||[]).flatMap(b => b.author_name || []))].slice(0, 24).sort();
  filterAuthor.innerHTML = '<option value="">All authors</option>' + authors.map(a => `<option value="${a}">${a}</option>`).join('');
}

// Sorting and filtering
function sortBooks(list, mode) {
  const arr = [...list];
  switch (mode) {
    case 'title-asc': return arr.sort((a,b)=> (a.title||'').localeCompare(b.title||''));
    case 'title-desc': return arr.sort((a,b)=> (b.title||'').localeCompare(a.title||''));
    case 'rating-asc': return arr.sort((a,b)=> {
      const aRating = a.ratings_average ? parseFloat(a.ratings_average) : 0;
      const bRating = b.ratings_average ? parseFloat(b.ratings_average) : 0;
      return aRating - bRating;
    });
    case 'rating-desc': return arr.sort((a,b)=> {
      const aRating = a.ratings_average ? parseFloat(a.ratings_average) : 0;
      const bRating = b.ratings_average ? parseFloat(b.ratings_average) : 0;
      return bRating - aRating;
    });
    default: return arr;
  }
}

function applyFiltersAndRender() {
  let list = [...state.books];
  // Author filter
  const author = filterAuthor && filterAuthor.value;
  if (author) list = list.filter(b => (b.author_name||[]).includes(author));
  // Genre filter (subjects)
  const genre = filterGenre && filterGenre.value;
  if (genre) list = list.filter(b => (b.subject||[]).map(s=> String(s).toLowerCase().replace(/\s+/g,'_')).includes(genre));
  // Sort
  if (state.sort) list = sortBooks(list, state.sort);
  // View
  if (state.view === 'fav') {
    const favs = loadFavourites();
    const favList = Object.entries(favs).map(([key, info]) => ({
      title: info.title,
      author_name: [info.authors],
      cover_i: null,
      key,
      _coverUrl: info.cover,
    }));
    // Render favourites using stored info
    container.innerHTML = '';
    if (!favList.length) { container.innerHTML = '<div class="text-sm text-stone-500">No favourites yet.</div>'; return; }
    favList.forEach(b => {
      const title = b.title;
      const authors = b.author_name ? b.author_name.join(', ') : '';
      const cover = b._coverUrl || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop';
      const key = b.key;
      const userRating = getLocalRating(ratingKey(key));
      const fav = isFavourite(key);
      const card = document.createElement('div');
      card.className = 'rounded-2xl border border-amber-300/60 dark:border-stone-700 bg-white dark:bg-stone-800 p-3 shadow hover:shadow-lg transition group';
      card.innerHTML = `
        <div class="aspect-[3/4] w-full overflow-hidden rounded-xl border border-amber-200/60 dark:border-stone-700 bg-amber-50">
          <img src="${cover}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition" />
        </div>
        <h3 class="mt-2 text-sm font-semibold">${title}</h3>
        <p class="text-xs text-stone-500 dark:text-stone-400">${authors}</p>
        <div class="mt-2 flex items-center justify-between">
          <button class="fav px-2 py-1 text-xs rounded border border-amber-300/60 dark:border-stone-600 hover:bg-amber-100 dark:hover:bg-stone-700 transition">${fav ? '❤️ Favourited' : '🤍 Add to Favourites'}</button>
          <div class="stars flex gap-1">${[1,2,3,4,5].map(i => `<button data-star="${i}">${starSvg(i <= userRating)}</button>`).join('')}</div>
        </div>`;
      attachStarHandlers(card, key);
      const favBtn = card.querySelector('.fav');
      favBtn.addEventListener('click', () => {
        toggleFavourite(key, { title, authors, cover });
        favBtn.textContent = isFavourite(key) ? '❤️ Favourited' : '🤍 Add to Favourites';
      });
      container.appendChild(card);
    });
    return;
  }
  renderBooks(list);
}

// Init
async function init() {
  initTheme();
  
  // Show loading state immediately
  container.innerHTML = '<div class="text-center py-8"><div class="text-lg">📖 Loading books...</div><div class="text-sm text-stone-500 mt-2">Fetching from Open Library</div></div>';
  
  // Try multiple queries to ensure we get books
  let books = [];
  const queries = ['bestseller books', 'popular books', 'classic literature', 'fiction'];
  
  for (const query of queries) {
    books = await fetchBooks(query);
    if (books && books.length > 0) {
      console.log(`Successfully loaded ${books.length} books with query: ${query}`);
      break;
    }
  }
  
  if (!books || books.length === 0) {
    // some sample books
    books = [
      {
        title: "The Great Gatsby",
        author_name: ["F. Scott Fitzgerald"],
        cover_i: 8238576,
        key: "fallback1"
      },
      {
        title: "To Kill a Mockingbird", 
        author_name: ["Harper Lee"],
        cover_i: 8238577,
        key: "fallback2"
      },
      {
        title: "1984",
        author_name: ["George Orwell"],
        cover_i: 8238578,
        key: "fallback3"
      }
    ];
    console.log('Using fallback books');
  }
  
  state.books = books;
  buildAuthors(state.books);
  renderBookOfDay(state.books);
  applyFiltersAndRender();

  // Search with suggestions
  searchInput.addEventListener('keyup', async (e) => {
    const q = searchInput.value.trim();
    if (['ArrowDown','ArrowUp','Enter','Escape'].includes(e.key)) {
      if (e.key==='Escape') { suggestions.classList.add('hidden'); return; }
      if (e.key==='Enter') { suggestions.classList.add('hidden'); triggerSearch(); return; }
      if (!suggestions.classList.contains('hidden')) {
        const children = Array.from(suggestions.children);
        if (e.key==='ArrowDown') suggestIndex = Math.min(suggestIndex+1, children.length-1);
        if (e.key==='ArrowUp') suggestIndex = Math.max(suggestIndex-1, 0);
        renderSuggestions(children.map(el=>({
          title: el.querySelector('.font-medium')?.textContent || '',
          author: '', year: ''
        })));
      }
    } else {
      clearTimeout(suggestTimer);
      if (!q) { suggestions.classList.add('hidden'); return; }
      suggestTimer = setTimeout(async () => {
        const items = await fetchSuggestions(q);
        suggestIndex = -1;
        renderSuggestions(items);
      }, 200);
    }
  });

  // Sort/filters
  sortSelect.addEventListener('change', () => { state.sort = sortSelect.value; applyFiltersAndRender(); });
  filterAuthor.addEventListener('change', applyFiltersAndRender);
  filterGenre.addEventListener('change', applyFiltersAndRender);

  // Views
  tabAll.addEventListener('click', () => { state.view = 'all'; applyFiltersAndRender(); });
  tabFav.addEventListener('click', () => { state.view = 'fav'; applyFiltersAndRender(); });

}

init();