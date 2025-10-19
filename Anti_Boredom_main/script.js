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

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add click animation
      e.target.style.transform = "scale(0.95)";
      setTimeout(() => {
        e.target.style.transform = "";
      }, 150);
    });
  });
});
