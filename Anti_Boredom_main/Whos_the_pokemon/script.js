// PokeAPI Base URL
const API_BASE = 'https://pokeapi.co/api/v2';
const TOTAL_POKEMON = 898;

// Game State
let currentPokemon = null;
let options = [];
let score = 0;
let streak = 0;
let hasAnswered = false;

// DOM Elements
const pokemonImage = document.getElementById('pokemonImage');
const questionEl = document.getElementById('question');
const questionMark = document.getElementById('questionMark');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const loadingEl = document.getElementById('loading');
const scoreEl = document.getElementById('score');
const streakEl = document.getElementById('streak');

// Fetch Pokémon data from PokeAPI
async function fetchPokemon(id) {
    try {
        const response = await fetch(`${API_BASE}/pokemon/${id}`);
        if (!response.ok) throw new Error('Pokemon not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
        return null;
    }
}

// Get random Pokemon ID
function getRandomPokemonId() {
    return Math.floor(Math.random() * TOTAL_POKEMON) + 1;
}

// Get multiple unique random Pokemon IDs
function getUniqueRandomIds(count) {
    const ids = new Set();
    while (ids.size < count) {
        ids.add(getRandomPokemonId());
    }
    return Array.from(ids);
}

// Load new game round
async function loadNewRound() {
    hasAnswered = false;
    showLoading(true);
    
    // Reset UI
    feedbackEl.classList.add('hidden');
    nextBtn.classList.add('hidden');
    questionEl.textContent = "Who's that Pokémon?";
    
    // Show question mark
    if (questionMark) {
        questionMark.classList.remove('hidden');
    }
    
    // Reset Pokemon image to silhouette
    pokemonImage.classList.remove('revealed');
    pokemonImage.style.filter = 'brightness(0) drop-shadow(0 0 20px rgba(0, 0, 0, 0.8))';
    
    // Get 3 unique random Pokemon from PokeAPI
    const pokemonIds = getUniqueRandomIds(3);
    const pokemonPromises = pokemonIds.map(id => fetchPokemon(id));
    const pokemonData = await Promise.all(pokemonPromises);
    
    // Filter out any failed fetches
    const validPokemon = pokemonData.filter(p => p !== null);
    
    if (validPokemon.length < 3) {
        console.error('Failed to load enough Pokemon');
        showLoading(false);
        return;
    }
    
    // Randomly select one as the correct answer
    const correctIndex = Math.floor(Math.random() * 3);
    currentPokemon = validPokemon[correctIndex];
    options = validPokemon;
    
    // Load Pokemon image (will be shown as silhouette)
    pokemonImage.src = currentPokemon.sprites.other['official-artwork'].front_default;
    pokemonImage.alt = 'Mystery Pokémon';
    
    // Wait for image to load
    pokemonImage.onload = () => {
        showLoading(false);
    };
    
    // Display options
    displayOptions();
}

// Display answer options
function displayOptions() {
    const optionButtons = document.querySelectorAll('.option-btn');
    
    optionButtons.forEach((btn, index) => {
        btn.textContent = options[index].name;
        btn.className = 'option-btn';
        btn.disabled = false;
        btn.onclick = () => handleAnswer(index);
    });
}

// Handle answer selection
function handleAnswer(selectedIndex) {
    if (hasAnswered) return;
    
    hasAnswered = true;
    const selectedPokemon = options[selectedIndex];
    const isCorrect = selectedPokemon.id === currentPokemon.id;
    
    // Hide question mark
    if (questionMark) {
        questionMark.classList.add('hidden');
    }
    
    // REVEAL THE POKEMON NOW!
    pokemonImage.classList.add('revealed');
    
    // Update question text to show the Pokemon name
    questionEl.textContent = `It's ${capitalize(currentPokemon.name)}!`;
    
    // Disable all buttons
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => btn.disabled = true);
    
    // Update button states with animations
    optionButtons.forEach((btn, index) => {
        if (options[index].id === currentPokemon.id) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Show feedback
    if (isCorrect) {
        score += 10;
        streak++;
        feedbackEl.textContent = `🎉 Correct! You got it!`;
        feedbackEl.className = 'feedback correct';
    } else {
        streak = 0;
        feedbackEl.textContent = `❌ Wrong! Better luck next time!`;
        feedbackEl.className = 'feedback incorrect';
    }
    
    feedbackEl.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    
    // Update score display
    updateScoreDisplay();
}

// Update score display
function updateScoreDisplay() {
    scoreEl.textContent = score;
    streakEl.textContent = streak;
}

// Capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Show/hide loading animation
function showLoading(show) {
    if (show) {
        loadingEl.classList.remove('hidden');
    } else {
        loadingEl.classList.add('hidden');
    }
}

// Event Listeners
nextBtn.addEventListener('click', loadNewRound);

// Initialize game on page load
window.addEventListener('DOMContentLoaded', () => {
    loadNewRound();
});