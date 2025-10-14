
class PlanetExplorer {
    constructor() {
        this.isPlaying = true;
        this.speed = 1;
        this.currentSpeed = 1;
        this.showOrbits = true;
        this.realScale = false;
        this.followMode = false;
        this.followedPlanet = null;
        this.trailsEnabled = false;
        
        this.planetData = {
            mercury: {
                name: "Mercury",
                icon: "planets/Mercury.png",
                distance: "57.9 million km",
                diameter: "4,879 km",
                dayLength: "59 Earth days",
                yearLength: "88 Earth days",
                facts: [
                    "Mercury is the smallest planet in our solar system",
                    "It has no atmosphere, so temperatures vary wildly",
                    "One day on Mercury lasts about 59 Earth days",
                    "It's the closest planet to the Sun",
                    "Mercury has no moons or rings"
                ]
            },
            venus: {
                name: "Venus",
                icon: "planets/Venus.png",
                distance: "108.2 million km",
                diameter: "12,104 km",
                dayLength: "243 Earth days",
                yearLength: "225 Earth days",
                facts: [
                    "Venus is the hottest planet in our solar system",
                    "It rotates backwards compared to most planets",
                    "A day on Venus is longer than its year",
                    "Venus is often called Earth's twin due to similar size",
                    "It has a thick, toxic atmosphere of carbon dioxide"
                ]
            },
            earth: {
                name: "Earth",
                icon: "planets/earth.png",
                distance: "149.6 million km",
                diameter: "12,756 km",
                dayLength: "24 hours",
                yearLength: "365.25 days",
                facts: [
                    "Earth is the only known planet with life",
                    "About 71% of Earth's surface is covered by water",
                    "Earth has one natural satellite: the Moon",
                    "It has a protective magnetic field",
                    "Earth's atmosphere is 78% nitrogen and 21% oxygen"
                ]
            },
            mars: {
                name: "Mars",
                icon: "planets/mars.png",
                distance: "227.9 million km",
                diameter: "6,792 km",
                dayLength: "24.6 hours",
                yearLength: "687 Earth days",
                facts: [
                    "Mars is known as the Red Planet due to iron oxide",
                    "It has the largest volcano in the solar system: Olympus Mons",
                    "Mars has two small moons: Phobos and Deimos",
                    "Evidence suggests Mars once had liquid water",
                    "A day on Mars is very similar to Earth's day"
                ]
            },
            jupiter: {
                name: "Jupiter",
                icon: "planets/jupiter.png",
                distance: "778.5 million km",
                diameter: "142,984 km",
                dayLength: "9.9 hours",
                yearLength: "12 Earth years",
                facts: [
                    "Jupiter is the largest planet in our solar system",
                    "It has more than 80 known moons",
                    "Jupiter's Great Red Spot is a giant storm",
                    "It acts as a 'cosmic vacuum cleaner' protecting inner planets",
                    "Jupiter is mostly made of hydrogen and helium"
                ]
            },
            saturn: {
                name: "Saturn",
                icon: "planets/Saturn.png",
                distance: "1.43 billion km",
                diameter: "120,536 km",
                dayLength: "10.7 hours",
                yearLength: "29 Earth years",
                facts: [
                    "Saturn is famous for its beautiful ring system",
                    "It's the least dense planet - it would float in water",
                    "Saturn has 146 known moons, including Titan",
                    "Its rings are made mostly of ice particles",
                    "Saturn's moon Titan has lakes of liquid methane"
                ]
            },
            uranus: {
                name: "Uranus",
                icon: "planets/uranus.png",
                distance: "2.87 billion km",
                diameter: "51,118 km",
                dayLength: "17.2 hours",
                yearLength: "84 Earth years",
                facts: [
                    "Uranus rotates on its side at a 98-degree angle",
                    "It's the coldest planet in our solar system",
                    "Uranus has faint rings discovered in 1977",
                    "It has 27 known moons named after Shakespeare characters",
                    "Uranus appears blue-green due to methane in its atmosphere"
                ]
            },
            neptune: {
                name: "Neptune",
                icon: "planets/Neptune.png",
                distance: "4.50 billion km",
                diameter: "49,528 km",
                dayLength: "16.1 hours",
                yearLength: "165 Earth years",
                facts: [
                    "Neptune has the strongest winds in the solar system",
                    "It was the first planet discovered through mathematics",
                    "Neptune has 16 known moons, with Triton being the largest",
                    "It takes 165 Earth years to orbit the Sun once",
                    "Neptune's deep blue color comes from methane in its atmosphere"
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        this.createStars();
        this.createAsteroidBelt();
        this.setupEventListeners();
        this.startAnimation();
        this.initializeTrails();
    }
    
    createStars() {
        const starsContainer = document.getElementById('stars');
        const numStars = 100;
        
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Create different star sizes for depth
            const size = Math.random() * 3 + 1;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            // Add different brightness levels
            star.style.opacity = Math.random() * 0.8 + 0.2;
            
            starsContainer.appendChild(star);
        }
    }
    
    createAsteroidBelt() {
        const asteroidBelt = document.getElementById('asteroidBelt');
        const numAsteroids = 50;
        
        for (let i = 0; i < numAsteroids; i++) {
            const asteroid = document.createElement('div');
            asteroid.className = 'asteroid';
            
            // Position asteroids between Mars and Jupiter orbits
            const angle = (i / numAsteroids) * 360;
            const radius = 280 + Math.random() * 40; // Between 280-320px
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            asteroid.style.left = `calc(50% + ${x}px)`;
            asteroid.style.top = `calc(50% + ${y}px)`;
            asteroid.style.animationDelay = Math.random() * 60 + 's';
            
            asteroidBelt.appendChild(asteroid);
        }
    }
    
    initializeTrails() {
        const svg = document.getElementById('planetTrails');
        const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
        
        planets.forEach(planet => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.id = `${planet}-trail`;
            path.className = 'planet-trail';
            path.style.stroke = this.getPlanetColor(planet);
            path.style.strokeWidth = '1';
            path.style.fill = 'none';
            path.style.opacity = '0.3';
            svg.appendChild(path);
        });
    }
    
    getPlanetColor(planet) {
        const colors = {
            mercury: '#8c7853',
            venus: '#ffc649',
            earth: '#6b93d6',
            mars: '#c1440e',
            jupiter: '#d8ca9d',
            saturn: '#fad5a5',
            uranus: '#4fd0e7',
            neptune: '#4b70dd'
        };
        return colors[planet] || '#ffffff';
    }
    
    setupEventListeners() {
        // Planet click events
        const planets = document.querySelectorAll('.planet');
        console.log('Found planets:', planets.length); // Debug log
        
        planets.forEach((planet, index) => {
            console.log(`Planet ${index}:`, planet.dataset.planet); // Debug log
            planet.addEventListener('click', (e) => {
                e.stopPropagation();
                const planetName = planet.dataset.planet;
                console.log('Planet clicked:', planetName); // Debug log
                this.showPlanetInfo(planetName);
            });
            
            // Also add touch events for mobile
            planet.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const planetName = planet.dataset.planet; // Use planet instead of e.target
                console.log('Planet touched:', planetName); // Debug log
                this.showPlanetInfo(planetName);
            });
        });
        
        // Sun click event
        document.getElementById('sun').addEventListener('click', (e) => {
            e.stopPropagation();
            this.showSunInfo();
        });
        
        document.getElementById('sun').addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.showSunInfo();
        });
        
        // Control buttons
        document.getElementById('playPause').addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        document.getElementById('speedControl').addEventListener('click', () => {
            this.changeSpeed();
        });
        
        document.getElementById('resetView').addEventListener('click', () => {
            this.resetView();
        });
        
        // Advanced control buttons
        document.getElementById('showOrbits').addEventListener('click', () => {
            this.toggleOrbits();
        });
        
        document.getElementById('realScale').addEventListener('click', () => {
            this.toggleRealScale();
        });
        
        document.getElementById('followPlanet').addEventListener('click', () => {
            this.toggleFollowMode();
        });
        
        // Close modal on background click
        document.getElementById('modalOverlay').addEventListener('click', () => {
            this.closePlanetInfo();
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
                case 'Escape':
                    this.closePlanetInfo();
                    break;
                case 'r':
                case 'R':
                    this.resetView();
                    break;
                case 's':
                case 'S':
                    this.changeSpeed();
                    break;
                case 'o':
                case 'O':
                    this.toggleOrbits();
                    break;
                case 'f':
                case 'F':
                    this.toggleFollowMode();
                    break;
                case 't':
                case 'T':
                    this.toggleTrails();
                    break;
            }
        });
    }
    
    showPlanetInfo(planetName) {
        const planet = this.planetData[planetName];
        if (!planet) {
            console.error('Planet data not found for:', planetName);
            return;
        }
        
        console.log('Showing info for:', planet.name); // Debug log
        
        document.getElementById('planetName').textContent = planet.name;
        document.getElementById('planetIcon').innerHTML = `<img src="${planet.icon}" alt="${planet.name}" style="width: 70px; height: 70px; border-radius: 50%; box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);">`;
        document.getElementById('distance').textContent = planet.distance;
        document.getElementById('diameter').textContent = planet.diameter;
        document.getElementById('dayLength').textContent = planet.dayLength;
        document.getElementById('yearLength').textContent = planet.yearLength;
        
        const factsList = document.getElementById('funFactsList');
        factsList.innerHTML = '';
        planet.facts.forEach(fact => {
            const factDiv = document.createElement('div');
            factDiv.textContent = fact;
            factsList.appendChild(factDiv);
        });
        
        const modal = document.getElementById('planetInfo');
        modal.style.display = 'flex'; // Set display first
        // Use setTimeout to ensure display is set before adding active class for animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        console.log('Modal opened for:', planet.name); // Debug log
    }
    
    showSunInfo() {
        document.getElementById('planetName').textContent = 'The Sun';
        document.getElementById('planetIcon').innerHTML = '<img src="planets/sun.png" alt="Sun" style="width: 70px; height: 70px; border-radius: 50%; box-shadow: 0 0 15px rgba(255, 235, 59, 0.4);">';
        document.getElementById('distance').textContent = 'Center of Solar System';
        document.getElementById('diameter').textContent = '1.39 million km';
        document.getElementById('dayLength').textContent = '25-35 days (rotation)';
        document.getElementById('yearLength').textContent = '230 million years (galactic orbit)';
        
        const sunFacts = [
            'The Sun contains 99.86% of the Solar System\'s mass',
            'It\'s a G-type main-sequence star (yellow dwarf)',
            'The Sun\'s core temperature is about 15 million°C',
            'It produces energy through nuclear fusion',
            'The Sun is about 4.6 billion years old',
            'Light from the Sun takes 8 minutes to reach Earth'
        ];
        
        const factsList = document.getElementById('funFactsList');
        factsList.innerHTML = '';
        sunFacts.forEach(fact => {
            const factDiv = document.createElement('div');
            factDiv.textContent = fact;
            factsList.appendChild(factDiv);
        });
        
        const modal = document.getElementById('planetInfo');
        modal.style.display = 'flex'; // Set display first
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        console.log('Sun modal opened'); // Debug log
    }
    
    closePlanetInfo() {
        const modal = document.getElementById('planetInfo');
        modal.classList.remove('active');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400); // Match the CSS transition duration
        
        console.log('Modal closed'); // Debug log
    }
    
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const btn = document.getElementById('playPause');
        
        if (this.isPlaying) {
            btn.textContent = '⏸️ Pause';
            this.resumeAnimations();
        } else {
            btn.textContent = '▶️ Play';
            this.pauseAnimations();
        }
    }
    
    changeSpeed() {
        const speeds = [0.5, 1, 2, 4];
        const currentIndex = speeds.indexOf(this.speed);
        this.speed = speeds[(currentIndex + 1) % speeds.length];
        
        document.getElementById('speedControl').textContent = `🚀 Speed: ${this.speed}x`;
        this.updateAnimationSpeed();
    }
    
    resetView() {
        // Reset all orbits to starting position
        document.querySelectorAll('.orbit').forEach(orbit => {
            orbit.style.animation = 'none';
            orbit.offsetHeight; // Trigger reflow
            orbit.style.animation = null;
        });
        
        // Reset controls
        this.isPlaying = true;
        this.speed = 1;
        document.getElementById('playPause').textContent = '⏸️ Pause';
        document.getElementById('speedControl').textContent = '🚀 Speed: 1x';
        
        this.updateAnimationSpeed();
    }
    
    pauseAnimations() {
        document.querySelectorAll('.orbit').forEach(orbit => {
            orbit.style.animationPlayState = 'paused';
        });
        document.getElementById('sun').style.animationPlayState = 'paused';
    }
    
    resumeAnimations() {
        document.querySelectorAll('.orbit').forEach(orbit => {
            orbit.style.animationPlayState = 'running';
        });
        document.getElementById('sun').style.animationPlayState = 'running';
    }
    
    updateAnimationSpeed() {
        const orbits = [
            { element: '.mercury-orbit', duration: 8 },
            { element: '.venus-orbit', duration: 12 },
            { element: '.earth-orbit', duration: 16 },
            { element: '.mars-orbit', duration: 24 },
            { element: '.jupiter-orbit', duration: 40 },
            { element: '.saturn-orbit', duration: 50 },
            { element: '.uranus-orbit', duration: 70 },
            { element: '.neptune-orbit', duration: 90 }
        ];
        
        orbits.forEach(orbit => {
            const element = document.querySelector(orbit.element);
            const newDuration = orbit.duration / this.speed;
            element.style.animationDuration = `${newDuration}s`;
        });
    }
    
    startAnimation() {
        // Add some initial randomization to orbit positions
        document.querySelectorAll('.orbit').forEach((orbit, index) => {
            const randomDelay = Math.random() * -10;
            orbit.style.animationDelay = `${randomDelay}s`;
        });
        

    }
    

    
    toggleOrbits() {
        this.showOrbits = !this.showOrbits;
        const btn = document.getElementById('showOrbits');
        const orbits = document.querySelectorAll('.orbit');
        
        if (this.showOrbits) {
            btn.textContent = '👁️ Hide Orbits';
            orbits.forEach(orbit => orbit.style.borderColor = 'rgba(255, 255, 255, 0.1)');
        } else {
            btn.textContent = '👁️ Show Orbits';
            orbits.forEach(orbit => orbit.style.borderColor = 'transparent');
        }
    }
    
    toggleRealScale() {
        this.realScale = !this.realScale;
        const btn = document.getElementById('realScale');
        const solarSystem = document.getElementById('solarSystem');
        
        if (this.realScale) {
            btn.textContent = '🎨 Artistic Scale';
            solarSystem.classList.add('real-scale');
            this.applyRealScale();
        } else {
            btn.textContent = '📏 Real Scale';
            solarSystem.classList.remove('real-scale');
            this.removeRealScale();
        }
    }
    
    toggleFollowMode() {
        this.followMode = !this.followMode;
        const btn = document.getElementById('followPlanet');
        
        if (this.followMode) {
            btn.textContent = '🌍 Free View';
            this.followedPlanet = 'earth'; // Default to Earth
            this.startFollowMode();
        } else {
            btn.textContent = '🎯 Follow Mode';
            this.stopFollowMode();
        }
    }
    
    toggleTrails() {
        this.trailsEnabled = !this.trailsEnabled;
        const trails = document.getElementById('planetTrails');
        
        if (this.trailsEnabled) {
            trails.style.display = 'block';
            this.startTrailAnimation();
        } else {
            trails.style.display = 'none';
            this.stopTrailAnimation();
        }
    }
    

    
    applyRealScale() {
        // Apply more realistic planet sizes (still scaled for visibility)
        const planets = {
            '.mercury': { size: 8 },
            '.venus': { size: 12 },
            '.earth': { size: 13 },
            '.mars': { size: 9 },
            '.jupiter': { size: 60 },
            '.saturn': { size: 50 },
            '.uranus': { size: 20 },
            '.neptune': { size: 19 }
        };
        
        Object.entries(planets).forEach(([selector, props]) => {
            const planet = document.querySelector(selector);
            if (planet) {
                planet.style.width = props.size + 'px';
                planet.style.height = props.size + 'px';
                planet.style.fontSize = (props.size * 0.6) + 'px';
            }
        });
        
        // Make sun much larger
        const sun = document.getElementById('sun');
        sun.style.width = '100px';
        sun.style.height = '100px';
        sun.style.fontSize = '3rem';
    }
    
    removeRealScale() {
        // Reset to artistic scale
        const planets = document.querySelectorAll('.planet');
        planets.forEach(planet => {
            planet.style.width = '';
            planet.style.height = '';
            planet.style.fontSize = '';
        });
        
        // Reset sun
        const sun = document.getElementById('sun');
        sun.style.width = '60px';
        sun.style.height = '60px';
        sun.style.fontSize = '2rem';
    }
    
    startFollowMode() {
        if (!this.followedPlanet) return;
        
        this.followInterval = setInterval(() => {
            const planet = document.querySelector(`[data-planet="${this.followedPlanet}"]`);
            if (planet) {
                const rect = planet.getBoundingClientRect();
                const solarSystem = document.getElementById('solarSystem');
                const container = document.querySelector('.container');
                
                const offsetX = window.innerWidth / 2 - rect.left - rect.width / 2;
                const offsetY = window.innerHeight / 2 - rect.top - rect.height / 2;
                
                solarSystem.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
            }
        }, 100);
    }
    
    stopFollowMode() {
        if (this.followInterval) {
            clearInterval(this.followInterval);
            document.getElementById('solarSystem').style.transform = 'translate(-50%, -50%)';
        }
    }
    

    
    startTrailAnimation() {
        // This would create animated trails behind planets
        // Implementation would track planet positions and draw SVG paths
        console.log('Trail animation started');
    }
    
    stopTrailAnimation() {
        const trails = document.querySelectorAll('.planet-trail');
        trails.forEach(trail => {
            trail.setAttribute('d', '');
        });
    }
}

// Initialize the Planet Explorer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PlanetExplorer();
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
    const planets = document.querySelectorAll('.planet');
    
    planets.forEach(planet => {
        planet.addEventListener('mouseenter', () => {
            planet.style.filter = 'brightness(1.5) saturate(1.3)';
            planet.style.transform = 'translateX(-50%) scale(1.8)';
        });
        
        planet.addEventListener('mouseleave', () => {
            planet.style.filter = '';
            planet.style.transform = 'translateX(-50%) scale(1)';
        });
    });
    
    // Sun hover effect removed
});