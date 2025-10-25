
const zodiacSigns = [
    { name: 'Aries', icon: '♈', dates: 'Mar 21 - Apr 19', color: 'from-red-500 to-orange-500' },
    { name: 'Taurus', icon: '♉', dates: 'Apr 20 - May 20', color: 'from-green-500 to-emerald-500' },
    { name: 'Gemini', icon: '♊', dates: 'May 21 - Jun 20', color: 'from-yellow-500 to-amber-500' },
    { name: 'Cancer', icon: '♋', dates: 'Jun 21 - Jul 22', color: 'from-blue-400 to-cyan-400' },
    { name: 'Leo', icon: '♌', dates: 'Jul 23 - Aug 22', color: 'from-orange-500 to-red-500' },
    { name: 'Virgo', icon: '♍', dates: 'Aug 23 - Sep 22', color: 'from-green-600 to-teal-500' },
    { name: 'Libra', icon: '♎', dates: 'Sep 23 - Oct 22', color: 'from-pink-500 to-rose-500' },
    { name: 'Scorpio', icon: '♏', dates: 'Oct 23 - Nov 21', color: 'from-purple-600 to-pink-600' },
    { name: 'Sagittarius', icon: '♐', dates: 'Nov 22 - Dec 21', color: 'from-indigo-500 to-purple-500' },
    { name: 'Capricorn', icon: '♑', dates: 'Dec 22 - Jan 19', color: 'from-gray-700 to-slate-600' },
    { name: 'Aquarius', icon: '♒', dates: 'Jan 20 - Feb 18', color: 'from-blue-500 to-indigo-500' },
    { name: 'Pisces', icon: '♓', dates: 'Feb 19 - Mar 20', color: 'from-teal-500 to-cyan-500' }
];

// Horoscope Data with 5-6 descriptions per sign
const horoscopeData = {
    aries: {
        descriptions: [
            "Today is full of energy for you. Take the lead and others will follow your enthusiasm.",
            "Your confidence is contagious. Opportunities in leadership or creativity may appear.",
            "Be bold in your decisions today; your courage will open new doors.",
            "Communication with peers may bring unexpected positive results.",
            "A challenging situation will show your resilience and determination.",
            "Take time to reflect on your personal goals and act decisively."
        ],
        color: "Red",
        lucky_number: "7",
        lucky_time: "2pm - 4pm",
        mood: "Confident",
        compatibility: "Leo & Sagittarius"
    },
    taurus: {
        descriptions: [
            "Patience and persistence bring rewards today; stay grounded.",
            "Focus on financial or practical matters; stability is key.",
            "Relationships benefit from your caring and thoughtful approach.",
            "A relaxing day at home rejuvenates your spirit and energy.",
            "Be mindful of indulgences; balance is essential for well-being.",
            "Trust your instincts when making personal or work decisions."
        ],
        color: "Green",
        lucky_number: "6",
        lucky_time: "10am - 12pm",
        mood: "Grounded",
        compatibility: "Virgo & Capricorn"
    },
    gemini: {
        descriptions: [
            "Your curiosity leads to exciting discoveries; explore new ideas.",
            "Adapt to changing plans with ease; variety keeps life interesting.",
            "Social interactions bring laughter and new connections.",
            "Learning something new may spark inspiration and creativity.",
            "Express your thoughts freely; your communication skills shine today.",
            "Networking or connecting with someone new brings positive energy."
        ],
        color: "Yellow",
        lucky_number: "5",
        lucky_time: "3pm - 5pm",
        mood: "Curious",
        compatibility: "Libra & Aquarius"
    },
    cancer: {
        descriptions: [
            "Your intuition is strong; trust your gut feelings.",
            "Family or home matters may require your attention and care.",
            "Emotional conversations bring clarity and strengthen bonds.",
            "Nurture yourself today; self-care will improve your outlook.",
            "Support from friends or loved ones enhances your confidence.",
            "Reflect on your emotions and let your empathy guide decisions."
        ],
        color: "Silver",
        lucky_number: "2",
        lucky_time: "6pm - 8pm",
        mood: "Nurturing",
        compatibility: "Scorpio & Pisces"
    },
    leo: {
        descriptions: [
            "Your natural charisma attracts attention and admiration.",
            "Creative projects receive recognition; showcase your talents.",
            "Generosity towards others brings unexpected rewards and joy.",
            "Leadership opportunities may appear; embrace them with confidence.",
            "Express your feelings openly; authenticity strengthens bonds.",
            "Social activities or events will highlight your charm and energy."
        ],
        color: "Gold",
        lucky_number: "1",
        lucky_time: "12pm - 2pm",
        mood: "Radiant",
        compatibility: "Aries & Sagittarius"
    },
    virgo: {
        descriptions: [
            "Attention to detail brings efficiency and success today.",
            "Organize your tasks; structure creates a productive day.",
            "Health and wellness efforts are especially rewarding today.",
            "Helping others with your skills enhances relationships.",
            "Focus on analysis and logical planning; results are guaranteed.",
            "Practicality and patience guide your decisions and interactions."
        ],
        color: "Navy Blue",
        lucky_number: "4",
        lucky_time: "8am - 10am",
        mood: "Analytical",
        compatibility: "Taurus & Capricorn"
    },
    libra: {
        descriptions: [
            "Harmony and balance create a smooth day; use diplomacy wisely.",
            "Artistic or aesthetic pursuits inspire creativity and joy.",
            "Partnerships strengthen through understanding and compromise.",
            "Seek fairness in decisions; your sense of justice is sharp.",
            "Social gatherings provide enriching experiences and fun.",
            "Collaboration with others will lead to successful outcomes."
        ],
        color: "Pink",
        lucky_number: "6",
        lucky_time: "4pm - 6pm",
        mood: "Harmonious",
        compatibility: "Gemini & Aquarius"
    },
    scorpio: {
        descriptions: [
            "Transformation is powerful; embrace change and growth.",
            "Hidden truths may emerge; clarity brings wisdom.",
            "Deep emotional connections strengthen through honesty.",
            "Focus your energy on passion projects; results are fulfilling.",
            "Intuition guides you through complex situations successfully.",
            "Inner strength helps overcome challenges with confidence."
        ],
        color: "Burgundy",
        lucky_number: "8",
        lucky_time: "9pm - 11pm",
        mood: "Intense",
        compatibility: "Cancer & Pisces"
    },
    sagittarius: {
        descriptions: [
            "Adventure and exploration bring excitement and inspiration.",
            "Optimism lifts your spirits and those around you.",
            "Philosophical insights lead to personal growth today.",
            "Travel or learning experiences bring joy and knowledge.",
            "Freedom to express yourself creatively brings fulfillment.",
            "Keep an open mind; new ideas may expand your horizons."
        ],
        color: "Purple",
        lucky_number: "3",
        lucky_time: "11am - 1pm",
        mood: "Adventurous",
        compatibility: "Aries & Leo"
    },
    capricorn: {
        descriptions: [
            "Hard work and discipline lead to success; stay focused.",
            "Professional recognition is within reach; keep effort steady.",
            "Structuring your day efficiently maximizes achievements.",
            "Patience and persistence yield long-term rewards today.",
            "A cautious approach in finances or planning is beneficial.",
            "Your ambitions are supported by careful, consistent action."
        ],
        color: "Brown",
        lucky_number: "8",
        lucky_time: "7am - 9am",
        mood: "Ambitious",
        compatibility: "Taurus & Virgo"
    },
    aquarius: {
        descriptions: [
            "Innovation and unique ideas set you apart today.",
            "Collaborating creatively brings new solutions and joy.",
            "Your perspective helps solve old problems in new ways.",
            "Embrace your individuality while supporting your team.",
            "Humanitarian efforts or helping others bring satisfaction.",
            "Keep open to unconventional ideas; they bring breakthroughs."
        ],
        color: "Electric Blue",
        lucky_number: "11",
        lucky_time: "1pm - 3pm",
        mood: "Innovative",
        compatibility: "Gemini & Libra"
    },
    pisces: {
        descriptions: [
            "Creativity and imagination guide your day beautifully.",
            "Empathy allows you to connect deeply with others.",
            "Intuition helps you navigate decisions with confidence.",
            "Dreams or inspirations lead to meaningful actions.",
            "Helping others brings emotional satisfaction and joy.",
            "Spiritual or artistic pursuits bring peace and clarity."
        ],
        color: "Sea Green",
        lucky_number: "9",
        lucky_time: "5pm - 7pm",
        mood: "Dreamy",
        compatibility: "Cancer & Scorpio"
    }
};

// State
let currentSign = null;
let currentHoroscope = null;

// DOM Elements
const currentDateEl = document.getElementById('currentDate');
const zodiacGridEl = document.getElementById('zodiacGrid');
const zodiacSelectionEl = document.getElementById('zodiacSelection');
const loadingStateEl = document.getElementById('loadingState');
const horoscopeDisplayEl = document.getElementById('horoscopeDisplay');
const changeSignBtn = document.getElementById('changeSignBtn');
const refreshBtn = document.getElementById('refreshBtn');

// Initialize App
function init() {
    displayCurrentDate();
    renderZodiacGrid();
    loadSavedHoroscope();
    
    changeSignBtn.addEventListener('click', showZodiacSelection);
    refreshBtn.addEventListener('click', () => fetchHoroscope(currentSign));
}

// Display Current Date
function displayCurrentDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toLocaleDateString('en-US', options);
    currentDateEl.textContent = date;
}

// Render Zodiac Grid
function renderZodiacGrid() {
    zodiacGridEl.innerHTML = '';
    
    zodiacSigns.forEach(sign => {
        const card = document.createElement('div');
        card.className = 'zodiac-card';
        card.innerHTML = `
            <div class="icon">${sign.icon}</div>
            <div class="name">${sign.name}</div>
            <div class="dates">${sign.dates}</div>
        `;
        card.addEventListener('click', () => selectSign(sign));
        zodiacGridEl.appendChild(card);
    });
}

// Select Sign
function selectSign(sign) {
    currentSign = sign;
    fetchHoroscope(sign);
}

// Fetch Horoscope with random message
async function fetchHoroscope(sign) {
    showLoading();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const signKey = sign.name.toLowerCase();
    const data = horoscopeData[signKey];

    // Pick a random description
    const randomIndex = Math.floor(Math.random() * data.descriptions.length);
    const randomDescription = data.descriptions[randomIndex];
    
    currentHoroscope = {
        horoscope_data: randomDescription,
        color: data.color,
        lucky_number: data.lucky_number,
        lucky_time: data.lucky_time,
        mood: data.mood,
        compatibility: data.compatibility,
        sign: sign,
        date: new Date().toDateString()
    };
    
    saveHoroscope();
    displayHoroscope();
}

// Show Loading
function showLoading() {
    zodiacSelectionEl.classList.add('hidden');
    horoscopeDisplayEl.classList.add('hidden');
    loadingStateEl.classList.remove('hidden');
}

// Display Horoscope
function displayHoroscope() {
    loadingStateEl.classList.add('hidden');
    horoscopeDisplayEl.classList.remove('hidden');
    horoscopeDisplayEl.classList.add('fade-in');
    
    document.getElementById('signIcon').textContent = currentHoroscope.sign.icon;
    document.getElementById('signName').textContent = currentHoroscope.sign.name;
    document.getElementById('signDates').textContent = currentHoroscope.sign.dates;
    document.getElementById('horoscopeText').textContent = currentHoroscope.horoscope_data;
    document.getElementById('luckyColor').textContent = currentHoroscope.color;
    document.getElementById('luckyNumber').textContent = currentHoroscope.lucky_number;
    document.getElementById('luckyTime').textContent = currentHoroscope.lucky_time;
    document.getElementById('mood').textContent = currentHoroscope.mood;
    document.getElementById('compatibility').textContent = currentHoroscope.compatibility;
}

// Show Zodiac Selection
function showZodiacSelection() {
    horoscopeDisplayEl.classList.add('hidden');
    zodiacSelectionEl.classList.remove('hidden');
}

// Save Horoscope to LocalStorage
function saveHoroscope() {
    localStorage.setItem('savedSign', currentSign.name);
    localStorage.setItem('horoscopeDate', currentHoroscope.date);
    localStorage.setItem('horoscopeData', JSON.stringify(currentHoroscope));
}

// Load Saved Horoscope
function loadSavedHoroscope() {
    const savedSign = localStorage.getItem('savedSign');
    const savedDate = localStorage.getItem('horoscopeDate');
    const today = new Date().toDateString();
    
    if (savedSign && savedDate === today) {
        const sign = zodiacSigns.find(s => s.name === savedSign);
        if (sign) {
            currentSign = sign;
            const savedHoroscope = localStorage.getItem('horoscopeData');
            if (savedHoroscope) {
                currentHoroscope = JSON.parse(savedHoroscope);
                zodiacSelectionEl.classList.add('hidden');
                displayHoroscope();
            }
        }
    }
}

// Start App
document.addEventListener('DOMContentLoaded', init);
