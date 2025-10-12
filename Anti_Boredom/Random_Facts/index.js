class RandomFactsWidget {
  constructor() {
    this.facts = [
      "Octopuses have three hearts and blue blood! Two hearts pump blood to the gills, while the third pumps blood to the rest of the body.",
      "Honey never spoils! Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible.",
      "A group of flamingos is called a 'flamboyance' - quite fitting for such colorful and elegant birds!",
      "Bananas are berries, but strawberries aren't! Botanically speaking, berries must have seeds inside their flesh.",
      "The human brain uses about 20% of the body's total energy, despite only weighing about 2% of body weight.",
      "Sharks have been around longer than trees! Sharks evolved around 400 million years ago, while trees appeared around 350 million years ago.",
      "A day on Venus is longer than its year! Venus takes 243 Earth days to rotate once, but only 225 Earth days to orbit the sun.",
      "The Great Wall of China isn't visible from space with the naked eye, contrary to popular belief.",
      "Wombat poop is cube-shaped! This unique shape helps prevent it from rolling away and marks their territory effectively.",
      "The shortest war in history lasted only 38-45 minutes! It was between Britain and Zanzibar in 1896.",
      "Butterflies taste with their feet! They have chemoreceptors on their feet to identify suitable plants for laying eggs.",
      "A single cloud can weigh more than a million pounds! Despite floating in the air, clouds contain massive amounts of water droplets.",
      "Sea otters hold hands while sleeping to prevent drifting apart in the ocean currents.",
      "The human nose can distinguish about 1 trillion different scents, making it more sensitive than previously thought.",
      "Penguins propose to their mates with pebbles! Male penguins search for the perfect pebble to present to their chosen female.",
      "Lightning strikes the Earth about 100 times per second, totaling roughly 8.6 million strikes per day.",
      "A group of owls is called a 'parliament' - perhaps because they look so wise and contemplative.",
      "The loudest bone in your body is your jaw! The masseter muscle can exert a force of up to 200 pounds per square inch.",
      "Dolphins have names for each other! They develop unique whistle signatures that other dolphins use to call them.",
      "The longest recorded flight of a chicken is 13 seconds - not exactly built for soaring through the skies!",
      "Your stomach gets an entirely new lining every 3-4 days because stomach acid would otherwise digest it.",
      "The fingerprints of koalas are so similar to human fingerprints that they have confused crime scene investigators.",
      "A bolt of lightning is five times hotter than the surface of the sun, reaching temperatures of about 30,000 Kelvin.",
      "The word 'serendipity' was coined by author Horace Walpole in 1754, inspired by a Persian fairy tale.",
      "Hummingbirds are the only birds that can fly backwards, thanks to their unique wing structure and rapid wing beats.",
      "The longest place name in the world has 85 letters and is a hill in New Zealand: Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu.",
      "Cleopatra lived closer in time to the moon landing than to the construction of the Great Pyramid of Giza.",
      "A group of ravens is called a 'conspiracy' or an 'unkindness' - quite ominous names for intelligent birds!",
      "The human eye can distinguish about 10 million different colors, making our vision incredibly sophisticated.",
      "Sloths only defecate once a week, and they lose up to 30% of their body weight when they do!",
      "The northern lights occur when charged particles from the sun interact with Earth's magnetic field and atmosphere.",
      "A jiffy is an actual unit of time! In computing, it represents 1/60th of a second.",
      "The heart of a blue whale is so large that a small child could crawl through its major blood vessels.",
      "Bubble wrap was originally invented as wallpaper in 1957, but it didn't become popular until it found its true calling as packaging material.",
      "The unicorn is Scotland's national animal - a mythical creature representing purity, innocence, and power in Celtic mythology."
    ];
    
    this.factCount = parseInt(localStorage.getItem('factCount')) || 0;
    this.usedFacts = JSON.parse(localStorage.getItem('usedFacts')) || [];
    
    this.factText = document.getElementById('fact-text');
    this.factBtn = document.getElementById('fact-btn');
    this.factCountDisplay = document.getElementById('fact-count');
    this.factContainer = document.querySelector('.fact-container');
    
    this.init();
  }
  
  init() {
    this.updateFactCount();
    this.factBtn.addEventListener('click', () => this.generateRandomFact());
    
    // Add keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        this.generateRandomFact();
      }
    });
  }
  
  generateRandomFact() {
    // Disable button during generation
    this.factBtn.disabled = true;
    this.factContainer.classList.add('loading');
    
    // Reset used facts if all have been shown
    if (this.usedFacts.length >= this.facts.length) {
      this.usedFacts = [];
      localStorage.setItem('usedFacts', JSON.stringify(this.usedFacts));
    }
    
    // Get available facts (not yet shown)
    const availableFacts = this.facts.filter((_, index) => !this.usedFacts.includes(index));
    
    // Select random fact from available ones
    const randomIndex = Math.floor(Math.random() * availableFacts.length);
    const selectedFact = availableFacts[randomIndex];
    const originalIndex = this.facts.indexOf(selectedFact);
    
    // Add to used facts
    this.usedFacts.push(originalIndex);
    localStorage.setItem('usedFacts', JSON.stringify(this.usedFacts));
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      this.displayFact(selectedFact);
      this.incrementFactCount();
      this.factBtn.disabled = false;
      this.factContainer.classList.remove('loading');
    }, 500);
  }
  
  displayFact(fact) {
    // Fade out current fact
    this.factText.style.opacity = '0';
    
    setTimeout(() => {
      this.factText.textContent = fact;
      this.factText.style.opacity = '1';
      
      // Add some visual flair
      this.factContainer.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.factContainer.style.transform = 'scale(1)';
      }, 150);
      
    }, 200);
  }
  
  incrementFactCount() {
    this.factCount++;
    this.updateFactCount();
    localStorage.setItem('factCount', this.factCount.toString());
  }
  
  updateFactCount() {
    this.factCountDisplay.textContent = this.factCount;
    
    // Add celebration animation for milestones
    if (this.factCount > 0 && this.factCount % 10 === 0) {
      this.celebrateMilestone();
    }
  }
  
  celebrateMilestone() {
    const celebration = document.createElement('div');
    celebration.innerHTML = '🎉';
    celebration.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      font-size: 3rem;
      z-index: 1000;
      animation: bounce 1s ease-in-out;
      pointer-events: none;
    `;
    
    document.body.appendChild(celebration);
    
    // Remove after animation
    setTimeout(() => {
      if (celebration.parentNode) {
        celebration.parentNode.removeChild(celebration);
      }
    }, 1000);
  }
}

// Add bounce animation for celebration
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -30px, 0);
    }
    70% {
      transform: translate3d(0, -15px, 0);
    }
    90% {
      transform: translate3d(0, -4px, 0);
    }
  }
`;
document.head.appendChild(style);

// Initialize the widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RandomFactsWidget();
});

// Add some Easter eggs
document.addEventListener('keydown', (e) => {
  // Konami code easter egg (simplified)
  if (e.ctrlKey && e.shiftKey && e.code === 'KeyF') {
    const easterEgg = document.createElement('div');
    easterEgg.innerHTML = '🦄 You found the secret unicorn fact shortcut! 🦄';
    easterEgg.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
      color: white;
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      font-weight: bold;
      text-align: center;
      animation: fadeInOut 3s ease-in-out forwards;
    `;
    
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
      }
    `;
    document.head.appendChild(fadeStyle);
    document.body.appendChild(easterEgg);
    
    setTimeout(() => {
      if (easterEgg.parentNode) {
        easterEgg.parentNode.removeChild(easterEgg);
      }
      if (fadeStyle.parentNode) {
        fadeStyle.parentNode.removeChild(fadeStyle);
      }
    }, 3000);
  }
});