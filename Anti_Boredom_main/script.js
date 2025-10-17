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


// Animal Showdown functionality

// Using a hardcoded dataset for simplicity as per plan's "simpler alternative" clause.
// If Wikipedia API integration is desired later, this data structure would be augmented
// or replaced with API fetching logic. Image URLs are direct links to Wikimedia Commons.
const animalData = [
  { name: "Lion", size: 250, speed: 80, strength: 90, image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg" },
  { name: "Elephant", size: 6000, speed: 40, strength: 95, image: "https://upload.wikimedia.org/wikipedia/commons/3/30/African_elephant_bull_%28Loxodonta_africana%29.jpg" },
  { name: "Cheetah", size: 70, speed: 120, strength: 60, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Cheetah_at_Etosha_National_Park_%28cropped%29.jpg/640px-Cheetah_at_Etosha_National_Park_%28cropped%29.jpg" },
  { name: "Grizzly Bear", size: 350, speed: 55, strength: 85, image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Grizzly_Bear_at_Lake_Clark_National_Park_%26_Preserve_%2828620807095%29.jpg" },
  { name: "Tiger", size: 220, speed: 65, strength: 88, image: "https://upload.wikimedia.org/wikipedia/commons/5/54/Tiger_in_Ranthambhore.jpg" },
  { name: "Rhino", size: 2300, speed: 50, strength: 92, image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/White_Rhino_at_Etosha_National_Park_edit.jpg" },
  { name: "Hippopotamus", size: 1500, speed: 30, strength: 98, image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Hippopotamus_%28Hippopotamus_amphibius%29_in_the_Okavango_Delta.jpg" },
  { name: "Crocodile", size: 700, speed: 32, strength: 82, image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Nile_Crocodile_%28Crocodylus_niloticus%29.jpg" },
  { name: "Gorilla", size: 200, speed: 35, strength: 80, image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Western_Lowland_Gorilla_at_San_Diego_Zoo.jpg" },
  { name: "Wolf", size: 40, speed: 60, strength: 70, image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Canis_lupus_standing_in_snow.jpg" },
];

const DEFAULT_ANIMAL_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"; // Placeholder for missing images

/**
 * Displays an animal's information in the specified container.
 * @param {object} animal - The animal object containing name, image, size, speed, strength.
 * @param {string} containerId - The ID of the HTML container to display the animal info.
 */
function displayAnimal(animal, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Error: Container with ID '${containerId}' not found for animal display.`);
    return;
  }

  const nameElement = container.querySelector(".animal-name");
  const imageElement = container.querySelector(".animal-image");
  const sizeElement = container.querySelector(".animal-size");
  const speedElement = container.querySelector(".animal-speed");
  const strengthElement = container.querySelector(".animal-strength");

  if (!nameElement || !imageElement || !sizeElement || !speedElement || !strengthElement) {
    console.error(`Error: One or more animal info elements missing in container '${containerId}'.`);
    return;
  }

  nameElement.textContent = animal.name;
  imageElement.src = animal.image || DEFAULT_ANIMAL_IMAGE; // Use default if image URL is missing
  imageElement.alt = animal.name;
  sizeElement.textContent = `Size: ${animal.size} kg`;
  speedElement.textContent = `Speed: ${animal.speed} km/h`;
  strengthElement.textContent = `Strength: ${animal.strength}`;
}

/**
 * Randomly selects two distinct animals from the animalData array.
 * @returns {Array<object>} An array containing two distinct animal objects.
 */
function getRandomAnimals() {
  if (animalData.length < 2) {
    console.error("Not enough animals in the data to pair for a battle.");
    return [];
  }
  const animal1Index = Math.floor(Math.random() * animalData.length);
  let animal2Index;
  do {
    animal2Index = Math.floor(Math.random() * animalData.length);
  } while (animal2Index === animal1Index); // Ensure animals are distinct

  return [animalData[animal1Index], animalData[animal2Index]];
}

/**
 * Determines the winner of a battle between two animals based on a weighted sum of their stats.
 * @param {object} animal1 - The first animal object.
 * @param {object} animal2 - The second animal object.
 * @returns {string} The battle result message (e.g., "Lion wins!", "It's a draw!").
 */
function battle(animal1, animal2) {
  // Simple battle logic: weighted sum of stats. Weights can be adjusted for different battle dynamics.
  const animal1Score = animal1.size * 0.2 + animal1.speed * 0.3 + animal1.strength * 0.5;
  const animal2Score = animal2.size * 0.2 + animal2.speed * 0.3 + animal2.strength * 0.5;

  if (animal1Score > animal2Score) {
    return `${animal1.name} wins!`;
  } else if (animal2Score > animal1Score) {
    return `${animal2.name} wins!`;
  } else {
    return "It's a draw!";
  }
}

/**
 * Initiates a random animal battle, displays the animals, and shows the result.
 */
function startRandomBattle() {
  const [animal1, animal2] = getRandomAnimals();

  if (!animal1 || !animal2) {
    const battleResultElement = document.getElementById("battle-result");
    if (battleResultElement) {
        battleResultElement.textContent = "Error: Could not select animals for battle.";
    }
    console.error("Error: Could not select animals for battle due to insufficient data.");
    return;
  }

  // Animal objects already contain image URLs from animalData
  displayAnimal(animal1, "animal1-container");
  displayAnimal(animal2, "animal2-container");

  const result = battle(animal1, animal2);
  const battleResultElement = document.getElementById("battle-result");
  if (battleResultElement) {
    battleResultElement.textContent = result;
  } else {
    console.error("Error: Battle result element with ID 'battle-result' not found.");
  }
}

// Add event listeners once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const randomPairButton = document.getElementById("random-pair-btn");
  const rematchButton = document.getElementById("rematch-btn");

  if (randomPairButton) {
    randomPairButton.addEventListener("click", startRandomBattle);
  } else {
    console.warn("Warning: Random Pair button with ID 'random-pair-btn' not found. Ensure HTML is correctly set up.");
  }

  if (rematchButton) {
    rematchButton.addEventListener("click", startRandomBattle);
  } else {
    console.warn("Warning: Rematch button with ID 'rematch-btn' not found. Ensure HTML is correctly set up.");
  }

  // Initialize with a random battle when the page loads
  startRandomBattle();
});