const animalData = [
  { name: "Lion", size: 250, speed: 80, strength: 90, image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg" },
  { name: "Elephant", size: 6000, speed: 40, strength: 95, image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/African_elephant_%28Loxodonta_africana%29_3.jpg" },
  { name: "Cheetah", size: 70, speed: 120, strength: 60, image: "https://upload.wikimedia.org/wikipedia/commons/3/37/Hunting_Cheetah.jpg" },
  { name: "Grizzly_Bear", size: 350, speed: 55, strength: 85, image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Grizzly_Bear_%28Ursus_arctos_ssp.%29.jpg" },
  { name: "Tiger", size: 220, speed: 65, strength: 88, image: "https://upload.wikimedia.org/wikipedia/commons/6/62/Panthera_tigris_sumatran_subspecies.jpg" },
  { name: "Rhino", size: 2300, speed: 50, strength: 92, image: "https://upload.wikimedia.org/wikipedia/commons/8/87/White_rhinoceros_head_-_Sofia_zoo_-_2.jpg" },
  { name: "Hippopotamus", size: 1500, speed: 30, strength: 98, image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Chobe_River_Front%2C_Botswana_%282625496300%29.jpg" },
  { name: "Crocodile", size: 700, speed: 32, strength: 82, image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Nile_crocodile_head.jpg" },
  { name: "Gorilla", size: 200, speed: 35, strength: 80, image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/N%27Tami%2C_Western_Gorilla.jpg" },
  { name: "Wolf", size: 40, speed: 60, strength: 70, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Canis_lupus_Ernstbrunn.jpg" },
];

for(animal of animalData){
  document.getElementById("animal1-selection").innerHTML += `<option value=${animal.name}>${animal.name}</option>`
  document.getElementById("animal2-selection").innerHTML += `<option value=${animal.name}>${animal.name}</option>`
}

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
  document.getElementById('animal1-selection').value = animal1.name
  document.getElementById('animal2-selection').value = animal2.name
  updateDisplay(1, animal1)
  updateDisplay(2, animal2)
  const result = battle(animal1, animal2);
  const battleResultElement = document.getElementById("battle-result");
  if (battleResultElement) {
    battleResultElement.innerHTML = `<p class='result'>${result}</p>`;
  } else {
    console.error("Error: Battle result element with ID 'battle-result' not found.");
  }
}

function updateDisplay(elementNumber, animal){
  document.getElementById(`animal${elementNumber}-name`).innerText = `Name: ${animal.name}`
  document.getElementById(`animal${elementNumber}-size`).innerText = `Size: ${animal.size} kg`
  document.getElementById(`animal${elementNumber}-speed`).innerText = `Speed: ${animal.speed} km/h`
  document.getElementById(`animal${elementNumber}-strength`).innerText = `Strength: ${animal.strength}`
  document.getElementById(`animal${elementNumber}-image-container`).innerHTML = `<img src="${animal.image}" alt="${animal.name} Picture">`
}

// Add event listeners once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const randomPairButton = document.getElementById("random-pair-btn");
  const battleButton = document.getElementById("battle-btn");

  if (randomPairButton) {
    randomPairButton.addEventListener("click", startRandomBattle);
  } else {
    console.warn("Warning: Random Pair button with ID 'random-pair-btn' not found. Ensure HTML is correctly set up.");
  }

  if (battleButton) {
    battleButton.addEventListener('click', () => {
        const animal1 = animalData.find(animal => animal.name == document.getElementById('animal1-selection').value)
        const animal2 = animalData.find(animal => animal.name == document.getElementById('animal2-selection').value)
        const result = battle(animal1, animal2)
        document.getElementById("battle-result").innerHTML = `<p class='result'>${result}</p>`
    });
  } else {
    console.warn("Warning: Rematch button with ID 'battle-btn' not found. Ensure HTML is correctly set up.");
  }

  document.getElementById("animal1-selection").addEventListener('change', (event) => {
    const selectedAnimal = animalData.find(animal => animal.name == event.target.value)
    updateDisplay(1, selectedAnimal)
  })

  document.getElementById("animal2-selection").addEventListener('change', (event) => {
    const selectedAnimal = animalData.find(animal => animal.name == event.target.value)
    updateDisplay(2, selectedAnimal)
  })
});
