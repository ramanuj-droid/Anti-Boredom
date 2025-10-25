// Theme toggle functionality
(function initThemeToggle() {
  const themeBtn = document.getElementById("themeBtn");
  const body = document.body;

  if (!body) return;

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Set initial theme
  const initialTheme =
    savedTheme === "dark" || (!savedTheme && prefersDark) ? "dark" : "light";
  body.setAttribute("data-theme", initialTheme);

  function syncIcon(theme) {
    if (!themeBtn) return;
    themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  syncIcon(initialTheme);

  function toggleTheme() {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    syncIcon(newTheme);

    if (themeBtn) {
      themeBtn.classList.add("theme-changing");
      setTimeout(() => themeBtn.classList.remove("theme-changing"), 300);
    }
  }

  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
})();

// This listener now handles button animations, reveal-on-scroll, AND search
document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Button click animation logic ---
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add click animation
      // We use currentTarget to avoid issues if the button has child elements (like an SVG)
      e.currentTarget.style.transform = "scale(0.95)";
      setTimeout(() => {
        e.currentTarget.style.transform = "";
      }, 150);
    });
  });

  // --- 2. Reveal-on-scroll logic ---
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length > 0) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // optionally unobserve to run once
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((r) => io.observe(r));
  }

  // --- 3. Live Search Logic ---

  // 3.1: Dynamically scrape app data from the page
  const allApps = [];
  document.querySelectorAll(".card").forEach((card) => {
    const titleEl = card.querySelector("h3");
    const linkEl = card.querySelector("a.btn");

    if (titleEl && linkEl) {
      allApps.push({
        name: titleEl.textContent.trim(),
        url: linkEl.getAttribute("href"),
      });
    }
  });

  // 3.2: Get search elements
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const searchForm = document.getElementById("search-form");

  // If search HTML elements don't exist, stop running search code
  if (!searchInput || !searchResults || !searchForm) {
    return;
  }

  // 3.3: Define the search handler function
  function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    // Clear previous results
    searchResults.innerHTML = "";

    // If search is empty, hide results and exit
    if (searchTerm === "") {
      searchResults.style.display = "none";
      return;
    }

    // Filter the apps array based on the search term
    const filteredApps = allApps.filter((app) =>
      app.name.toLowerCase().includes(searchTerm)
    );

    // If no results, show a "not found" message
    if (filteredApps.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No apps found.";
      li.className = "search-no-results"; // Add class for styling
      searchResults.appendChild(li);
    } else {
      // Create and append a list item for each result
      filteredApps.forEach((app) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = app.url;
        a.textContent = app.name;
        li.appendChild(a);
        searchResults.appendChild(li);
      });
    }

    // Show the results container
    searchResults.style.display = "block";
  }

  // 3.4: Attach Event Listeners

  // Run the search function on every key press
  searchInput.addEventListener("input", handleSearch);

  // Prevent the form from submitting (reloading the page)
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
  });

  // Hide results when clicking anywhere else on the page
  document.addEventListener("click", function (e) {
    // Hide if the click is NOT on the input and NOT on the results list
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = "none";
    }
  });

  // Show results again if user clicks back into the input
  searchInput.addEventListener("focus", handleSearch);
});

(function initFaqBot() {
  const root = document.getElementById("ab-faq-bot");
  if (!root) return;

  const toggleBtn = root.querySelector(".ab-bot-toggle");
  const win = root.querySelector(".ab-bot-window");
  const closeBtn = root.querySelector(".ab-bot-close");
  const msgs = root.querySelector("#ab-bot-messages");
  const form = root.querySelector("#ab-bot-form");
  const input = root.querySelector("#ab-bot-text");
  const quick = root.querySelector("#ab-bot-quick");

  const GH_URL = "https://github.com/ramanuj-droid/Anti-Boredom";

  const FAQ = [
    {
      "id": "about",
      "title": "What is Anti-Boredom?",
      "questions": ["what is anti-boredom", "what is this project", "about anti boredom", "about project"],
      "answer": "Anti-Boredom is a community-driven collection of small, fun web experiences and mini apps to cure boredom. Browse the homepage cards and jump into anything that looks fun. Source: https://github.com/ramanuj-droid/Anti-Boredom"
    },
    {
      "id": "contribute",
      "title": "How do I contribute?",
      "questions": ["how do i contribute", "contribute", "contributing", "open source", "how to help"],
      "answer": "Fork the repo, create a feature branch, add or improve a mini app, then open a pull request. Please read Contribution.md for tips: https://github.com/ramanuj-droid/Anti-Boredom/blob/main/Contribution.md"
    },
    {
      "id": "run-locally",
      "title": "How do I run the project locally?",
      "questions": ["how to run locally", "run locally", "setup", "local development", "start local"],
      "answer": "Clone the repo. You can open Anti_Boredom_main/index.html directly in a browser or, preferably, run a simple static server (e.g., npx serve) from the Anti_Boredom_main directory. No backend is required."
    },
    {
      "id": "where-apps",
      "title": "Where are the mini apps?",
      "questions": ["where are the mini apps", "apps location", "games location", "projects location"],
      "answer": "All mini apps live under the Anti_Boredom_main folder, usually each with its own index.html (and optional style.css/script.js). The homepage links to several featured ones."
    },
    {
      "id": "add-app",
      "title": "How do I add a new app?",
      "questions": ["add an app", "how do i add", "new app", "create app"],
      "answer": "Create a new folder: Anti_Boredom_main/Your_App. Include index.html (plus optional style.css/script.js). Add a card/link on the homepage pointing to your app, then open a PR."
    },
    {
      "id": "star",
      "title": "How can I support the project?",
      "questions": ["star", "github star", "support", "like", "how to support"],
      "answer": "Starring the repo helps visibility. Visit and click ⭐ Star: https://github.com/ramanuj-droid/Anti-Boredom — thanks for the support!"
    },
    {
      "id": "report-bug",
      "title": "How do I report a bug?",
      "questions": ["report bug", "bug report", "issue", "problem"],
      "answer": "Open a GitHub issue with steps to reproduce, expected vs actual behavior, and your browser/environment: https://github.com/ramanuj-droid/Anti-Boredom/issues"
    },
    {
      "id": "license",
      "title": "What is the license?",
      "questions": ["license", "licence", "open source license"],
      "answer": "The project is open source. See the repository for the license details and README: https://github.com/ramanuj-droid/Anti-Boredom"
    },
    {
      "id": "tech-stack",
      "title": "What technologies does it use?",
      "questions": ["tech stack", "technology", "what is it built with"],
      "answer": "Most mini apps are plain HTML/CSS/JavaScript. A few use frameworks or build tools (e.g., Vite/React) within their own subfolders."
    },
    {
      "id": "coding-style",
      "title": "Is there a coding style guide?",
      "questions": ["coding style", "style guide", "code guidelines", "formatting"],
      "answer": "Keep changes simple and focused. Follow existing patterns in each mini app. If a sub-project has its own tooling or config, stick to it. Use clear names and avoid unrelated changes."
    },
    {
      "id": "assets",
      "title": "Where should I place images or assets?",
      "questions": ["assets", "images", "where to put images", "media"],
      "answer": "Place assets within your mini app folder. If shared on the homepage, add them under Anti_Boredom_main/media with sensible naming."
    },
    {
      "id": "design-tips",
      "title": "Any UI/UX tips for contributions?",
      "questions": ["design tips", "ui", "ux", "responsive design"],
      "answer": "Favor simple, responsive layouts. Test in light/dark themes if relevant. Keep performance in mind, avoid heavy libraries for small tasks, and ensure keyboard accessibility where possible."
    },
    {
      "id": "browser-support",
      "title": "What browsers are supported?",
      "questions": ["browser support", "supported browsers", "which browsers"],
      "answer": "Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Aim for graceful degradation on older versions and avoid cutting-edge features without fallbacks."
    },
    {
      "id": "pr-review",
      "title": "How long do PR reviews take?",
      "questions": ["pr review time", "how long review", "when will pr be reviewed"],
      "answer": "Review time varies with maintainer availability. We try to review within a few days. You can help by making PRs focused and well-described."
    },
    {
      "id": "hacktoberfest",
      "title": "Is this project good for Hacktoberfest?",
      "questions": ["hacktoberfest", "good first issue", "beginner friendly"],
      "answer": "Yes! There are many small, self-contained apps where beginners can learn and contribute. Look for good-first-issue labels or open small enhancements."
    },
    {
      "id": "community",
      "title": "How do I ask questions?",
      "questions": ["community", "ask question", "contact", "support"],
      "answer": "Use GitHub issues for help or discussion: https://github.com/ramanuj-droid/Anti-Boredom/issues"
    },
    {
      "id": "security",
      "title": "How are vulnerabilities handled?",
      "questions": ["security", "vulnerability", "report security"],
      "answer": "Please report security concerns privately to the maintainers if possible, or open a minimal public issue without sensitive details and we will follow up."
    },
    {
      "id": "book-library",
      "title": "Where is the Book Library app?",
      "questions": ["book library", "library"],
      "answer": "Find it under Anti_Boredom_main/Book_Library/index.html."
    },
    {
      "id": "roadmap",
      "title": "Is there a roadmap?",
      "questions": ["roadmap", "future", "plans"],
      "answer": "We evolve based on ideas and contributions from the community. Check open issues and discussions for upcoming ideas: https://github.com/ramanuj-droid/Anti-Boredom/issues"
    },
    {
      "id": "tests",
      "title": "Are there tests?",
      "questions": ["tests", "testing"],
      "answer": "Most mini apps are small and don’t include tests, but feel free to add lightweight tests or validation where it adds value without complexity."
    }
  ];

  function isOpen() {
    return win && win.hidden === false;
  }
  function openWin() {
    if (!win) return;
    win.hidden = false;
    msgs?.focus();
    if (!msgs?.dataset.booted) {
      (async () => {
        rebuildQuickChips();
        botSay("Hi, I'm Quipster! I can answer FAQs about Anti-Boredom. Ask anything or use a quick question below.");
        msgs.dataset.booted = "1";
      })();
    }
  }
  function closeWin() {
    if (!win) return;
    win.hidden = true;
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
  }
  function toggleWin() {
    if (!win) return;
    if (isOpen()) {
      closeWin();
    } else {
      openWin();
      if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
    }
  }

  function userSay(text) {
    if (!msgs) return;
    const b = document.createElement("div");
    b.className = "ab-msg user";
    b.textContent = text;
    msgs.appendChild(b);
    msgs.scrollTop = msgs.scrollHeight;
  }
  function botSay(text) {
    if (!msgs) return;
    const b = document.createElement("div");
    b.className = "ab-msg bot";
    b.textContent = text;
    msgs.appendChild(b);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    if (!msgs) return null;
    const wrap = document.createElement("div");
    wrap.className = "ab-typing";
    wrap.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
    return wrap;
  }

  function removeTyping(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function normalize(str) {
    return str.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  }
  function scoreEntry(entry, s) {
    const qs = (entry.questions || [entry.title || ""]).map(normalize);
    let score = 0;
    for (const p of qs) {
      if (!p) continue;
      if (s.includes(p)) score += 4;
      const ptoks = new Set(p.split(" "));
      const stoks = new Set(s.split(" "));
      let overlap = 0;
      ptoks.forEach((t) => { if (stoks.has(t)) overlap++; });
      score += Math.min(overlap, 3);
    }
    return score;
  }
  function answer(q) {
    const s = normalize(q);
    let best = null;
    let bestScore = -1;
    for (const item of FAQ) {
      const sc = scoreEntry(item, s);
      if (sc > bestScore) { best = item; bestScore = sc; }
    }
    if (best && bestScore >= 2) return best.answer;

    const suggestions = FAQ.slice(0, 5).map(x => x.title).join(", ");
    return "I couldn't find an exact match. Try one of these: " + suggestions + ". Or visit: " + GH_URL;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    userSay(text);
    input.value = "";
    const a = answer(text);
    const t = showTyping();
    const delay = Math.min(1400, Math.max(280, a.length * 12));
    setTimeout(() => {
      removeTyping(t);
      botSay(a);
    }, delay);
  }

  function rebuildQuickChips() {
    if (!quick) return;
    if (!FAQ || FAQ.length === 0) return;
    quick.innerHTML = "";
    FAQ.slice(0, 6).forEach((item) => {
      const b = document.createElement("button");
      const q = (item.questions && item.questions[0]) || item.title || "Question";
      b.textContent = q.replace(/^[a-z]/, (m) => m.toUpperCase());
      b.setAttribute("data-q", q);
      quick.appendChild(b);
    });
  }

  toggleBtn?.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); toggleWin(); });
  closeBtn?.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); closeWin(); });
  root.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const closeEl = t.closest(".ab-bot-close");
    const toggleEl = t.closest(".ab-bot-toggle");
    if (closeEl) { e.preventDefault(); e.stopPropagation(); closeWin(); }
    if (toggleEl) { e.preventDefault(); e.stopPropagation(); toggleWin(); }
  });
  form?.addEventListener("submit", handleSubmit);
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeWin();
  });
  quick?.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const q = t.getAttribute("data-q");
    if (q) {
      input.value = q;
      form.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  });
})();