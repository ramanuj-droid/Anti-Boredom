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
