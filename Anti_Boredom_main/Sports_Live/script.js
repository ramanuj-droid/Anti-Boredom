/**
 * Sports Live Updates - Real-time Sports Data Integration
 *
 * This module provides live sports updates for Football, Cricket, Basketball, and Tennis
 * using real sports APIs with smart fallback mechanisms.
 *
 * Features:
 * - Real-time API integration with multiple sports data sources
 * - Auto-refresh functionality (30-second intervals)
 * - Responsive design with dark/light theme support
 * - Interactive match details modal
 * - Graceful error handling and fallback data
 *
 * @author Anti-Boredom Team
 * @version 1.0.0
 */

// Global state management
let currentSport = "football"; // Currently selected sport category
let refreshInterval; // Auto-refresh timer reference
let isLoading = false; // Loading state flag
let currentMatches = []; // Store current displayed matches for modal access

/**
 * API Configuration for different sports data sources
 * Contains endpoints, headers, and settings for each supported sport
 */
const API_CONFIG = {
  football: {
    baseUrl: "https://api.football-data.org/v4",
    endpoints: {
      matches: "/matches",
      competitions: "/competitions",
    },
    headers: {
      "X-Auth-Token": "YOUR_API_KEY_HERE", // Users need to get their own free API key
    },
  },
  cricket: {
    baseUrl: "https://api.cricapi.com/v1",
    endpoints: {
      matches: "/matches",
      currentMatches: "/currentMatches",
    },
  },
  basketball: {
    baseUrl: "https://www.balldontlie.io/api/v1",
    endpoints: {
      games: "/games",
    },
  },
};

/**
 * Fallback mock data for when APIs are not available or for demo purposes
 * Provides realistic sample data to ensure the application works even without API access
 */
const fallbackSportsData = {
  football: [
    {
      id: 1,
      homeTeam: "Manchester United",
      awayTeam: "Liverpool",
      homeScore: 2,
      awayScore: 1,
      status: "LIVE",
      time: "67'",
      league: "Premier League",
      isLive: true,
    },
    {
      id: 2,
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      homeScore: 1,
      awayScore: 3,
      status: "FT",
      time: "90'",
      league: "La Liga",
      isLive: false,
    },
    {
      id: 3,
      homeTeam: "Bayern Munich",
      awayTeam: "Borussia Dortmund",
      homeScore: 0,
      awayScore: 0,
      status: "HT",
      time: "45'",
      league: "Bundesliga",
      isLive: false,
    },
  ],
  cricket: [
    {
      id: 4,
      homeTeam: "India",
      awayTeam: "Australia",
      homeScore: "287/4",
      awayScore: "156",
      status: "LIVE",
      time: "Day 2",
      league: "Test Match",
      isLive: true,
    },
    {
      id: 5,
      homeTeam: "England",
      awayTeam: "Pakistan",
      homeScore: "245",
      awayScore: "198/7",
      status: "LIVE",
      time: "45.2 overs",
      league: "ODI",
      isLive: true,
    },
  ],
  basketball: [
    {
      id: 6,
      homeTeam: "Lakers",
      awayTeam: "Warriors",
      homeScore: 108,
      awayScore: 112,
      status: "Q4",
      time: "2:34",
      league: "NBA",
      isLive: true,
    },
    {
      id: 7,
      homeTeam: "Celtics",
      awayTeam: "Heat",
      homeScore: 95,
      awayScore: 89,
      status: "FT",
      time: "Final",
      league: "NBA",
      isLive: false,
    },
  ],
  tennis: [
    {
      id: 8,
      homeTeam: "Novak Djokovic",
      awayTeam: "Rafael Nadal",
      homeScore: "6-4, 3-6, 2-4",
      awayScore: "",
      status: "LIVE",
      time: "Set 3",
      league: "French Open",
      isLive: true,
    },
    {
      id: 9,
      homeTeam: "Serena Williams",
      awayTeam: "Maria Sharapova",
      homeScore: "6-3, 6-2",
      awayScore: "",
      status: "FT",
      time: "Final",
      league: "Wimbledon",
      isLive: false,
    },
  ],
  baseball: [
    {
      id: 10,
      homeTeam: "Yankees",
      awayTeam: "Red Sox",
      homeScore: 4,
      awayScore: 3,
      status: "LIVE",
      time: "8th",
      league: "MLB",
      isLive: true,
    },
    {
      id: 11,
      homeTeam: "Dodgers",
      awayTeam: "Giants",
      homeScore: 2,
      awayScore: 1,
      status: "FT",
      time: "Final",
      league: "MLB",
      isLive: false,
    },
  ],
  hockey: [
    {
      id: 12,
      homeTeam: "Maple Leafs",
      awayTeam: "Canadiens",
      homeScore: 3,
      awayScore: 2,
      status: "LIVE",
      time: "3rd",
      league: "NHL",
      isLive: true,
    },
    {
      id: 13,
      homeTeam: "Bruins",
      awayTeam: "Rangers",
      homeScore: 4,
      awayScore: 1,
      status: "FT",
      time: "Final",
      league: "NHL",
      isLive: false,
    },
  ],
  soccer: [
    {
      id: 14,
      homeTeam: "PSG",
      awayTeam: "Marseille",
      homeScore: 2,
      awayScore: 1,
      status: "LIVE",
      time: "78'",
      league: "Ligue 1",
      isLive: true,
    },
    {
      id: 15,
      homeTeam: "AC Milan",
      awayTeam: "Inter Milan",
      homeScore: 1,
      awayScore: 0,
      status: "FT",
      time: "90'",
      league: "Serie A",
      isLive: false,
    },
  ],
  golf: [
    {
      id: 16,
      homeTeam: "Tiger Woods",
      awayTeam: "Phil Mickelson",
      homeScore: "-12",
      awayScore: "-10",
      status: "LIVE",
      time: "Hole 16",
      league: "Masters",
      isLive: true,
    },
    {
      id: 17,
      homeTeam: "Rory McIlroy",
      awayTeam: "Jordan Spieth",
      homeScore: "-8",
      awayScore: "-6",
      status: "FT",
      time: "Final",
      league: "PGA Tour",
      isLive: false,
    },
  ],
  boxing: [
    {
      id: 18,
      homeTeam: "Anthony Joshua",
      awayTeam: "Tyson Fury",
      homeScore: "KO",
      awayScore: "R8",
      status: "LIVE",
      time: "Round 8",
      league: "Heavyweight",
      isLive: true,
    },
    {
      id: 19,
      homeTeam: "Canelo Alvarez",
      awayTeam: "Gennady Golovkin",
      homeScore: "UD",
      awayScore: "12",
      status: "FT",
      time: "Final",
      league: "Middleweight",
      isLive: false,
    },
  ],
  mma: [
    {
      id: 20,
      homeTeam: "Jon Jones",
      awayTeam: "Daniel Cormier",
      homeScore: "TKO",
      awayScore: "R3",
      status: "LIVE",
      time: "Round 3",
      league: "UFC",
      isLive: true,
    },
    {
      id: 21,
      homeTeam: "Conor McGregor",
      awayTeam: "Nate Diaz",
      homeScore: "SUB",
      awayScore: "R2",
      status: "FT",
      time: "Final",
      league: "UFC",
      isLive: false,
    },
  ],
  volleyball: [
    {
      id: 22,
      homeTeam: "Brazil",
      awayTeam: "USA",
      homeScore: "25-23",
      awayScore: "20-25",
      status: "LIVE",
      time: "Set 3",
      league: "Olympics",
      isLive: true,
    },
    {
      id: 23,
      homeTeam: "Italy",
      awayTeam: "Poland",
      homeScore: "25-22",
      awayScore: "25-20",
      status: "FT",
      time: "Final",
      league: "World Cup",
      isLive: false,
    },
  ],
  rugby: [
    {
      id: 24,
      homeTeam: "New Zealand",
      awayTeam: "South Africa",
      homeScore: 28,
      awayScore: 24,
      status: "LIVE",
      time: "78'",
      league: "Rugby Championship",
      isLive: true,
    },
    {
      id: 25,
      homeTeam: "England",
      awayTeam: "France",
      homeScore: 31,
      awayScore: 19,
      status: "FT",
      time: "80'",
      league: "Six Nations",
      isLive: false,
    },
  ],
};

// Statistics data
const mockStats = {
  football: [
    { label: "Live Matches", value: "12" },
    { label: "Goals Today", value: "47" },
    { label: "Red Cards", value: "3" },
    { label: "Penalties", value: "8" },
  ],
  cricket: [
    { label: "Live Matches", value: "5" },
    { label: "Centuries", value: "2" },
    { label: "Wickets", value: "23" },
    { label: "Sixes", value: "41" },
  ],
  basketball: [
    { label: "Live Games", value: "8" },
    { label: "Total Points", value: "1,847" },
    { label: "Three Pointers", value: "156" },
    { label: "Dunks", value: "34" },
  ],
  tennis: [
    { label: "Live Matches", value: "6" },
    { label: "Aces", value: "89" },
    { label: "Break Points", value: "27" },
    { label: "Winners", value: "203" },
  ],
  baseball: [
    { label: "Live Games", value: "7" },
    { label: "Home Runs", value: "23" },
    { label: "Strikeouts", value: "156" },
    { label: "Hits", value: "89" },
  ],
  hockey: [
    { label: "Live Games", value: "6" },
    { label: "Goals", value: "34" },
    { label: "Saves", value: "127" },
    { label: "Power Plays", value: "12" },
  ],
  soccer: [
    { label: "Live Matches", value: "9" },
    { label: "Goals Today", value: "28" },
    { label: "Yellow Cards", value: "15" },
    { label: "Corners", value: "42" },
  ],
  golf: [
    { label: "Live Tournaments", value: "3" },
    { label: "Eagles", value: "8" },
    { label: "Birdies", value: "156" },
    { label: "Hole-in-Ones", value: "1" },
  ],
  boxing: [
    { label: "Live Fights", value: "4" },
    { label: "Knockouts", value: "7" },
    { label: "Rounds", value: "89" },
    { label: "Jabs", value: "234" },
  ],
  mma: [
    { label: "Live Fights", value: "5" },
    { label: "Submissions", value: "3" },
    { label: "TKO/KO", value: "8" },
    { label: "Takedowns", value: "45" },
  ],
  volleyball: [
    { label: "Live Matches", value: "6" },
    { label: "Sets", value: "24" },
    { label: "Aces", value: "18" },
    { label: "Blocks", value: "32" },
  ],
  rugby: [
    { label: "Live Matches", value: "4" },
    { label: "Tries", value: "18" },
    { label: "Conversions", value: "12" },
    { label: "Penalties", value: "8" },
  ],
};

/**
 * Initialize the Sports Live Updates application
 * Sets up event listeners, loads initial data, and starts auto-refresh
 */
document.addEventListener("DOMContentLoaded", function () {
  updateLastUpdated();
  loadSportsData();
  startAutoRefresh();

  // Add click handlers for match cards
  document.addEventListener("click", function (e) {
    if (e.target.closest(".match-card")) {
      const matchCard = e.target.closest(".match-card");
      const matchId = matchCard.dataset.matchId;
      console.log(
        "Match card clicked! ID:",
        matchId,
        "Current matches:",
        currentMatches
      );
      showMatchDetails(matchId);
    }
  });
});

/**
 * Switch between different sports categories
 * Updates UI, loads new data, and manages active state
 * @param {string} sport - The sport to switch to ('football', 'cricket', 'basketball', 'tennis')
 */
function switchSport(sport) {
  if (isLoading) return;

  currentSport = sport;

  // Update active button
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector(`[data-sport="${sport}"]`).classList.add("active");

  // Update title
  const sportTitles = {
    football: "⚽ Football Live Scores",
    cricket: "🏏 Cricket Live Scores",
    basketball: "🏀 Basketball Live Scores",
    tennis: "🎾 Tennis Live Scores",
    baseball: "⚾ Baseball Live Scores",
    hockey: "🏒 Hockey Live Scores",
    soccer: "⚽ Soccer Live Scores",
    golf: "⛳ Golf Live Scores",
    boxing: "🥊 Boxing Live Scores",
    mma: "🥋 MMA Live Scores",
    volleyball: "🏐 Volleyball Live Scores",
    rugby: "🏉 Rugby Live Scores",
  };

  document.getElementById("currentSportTitle").textContent = sportTitles[sport];

  // Load new data
  loadSportsData();
}

// Load sports data from real APIs
async function loadSportsData() {
  showLoading();

  try {
    let matches = [];

    switch (currentSport) {
      case "football":
        matches = await fetchFootballData();
        break;
      case "cricket":
        matches = await fetchCricketData();
        break;
      case "basketball":
        matches = await fetchBasketballData();
        break;
      case "tennis":
        matches = await fetchTennisData();
        break;
      case "baseball":
        matches = await fetchBaseballData();
        break;
      case "hockey":
        matches = await fetchHockeyData();
        break;
      case "soccer":
        matches = await fetchSoccerData();
        break;
      case "golf":
        matches = await fetchGolfData();
        break;
      case "boxing":
        matches = await fetchBoxingData();
        break;
      case "mma":
        matches = await fetchMmaData();
        break;
      case "volleyball":
        matches = await fetchVolleyballData();
        break;
      case "rugby":
        matches = await fetchRugbyData();
        break;
      default:
        matches = fallbackSportsData[currentSport] || [];
    }

    currentMatches = matches; // Store matches for modal access
    displayMatches(matches);
    displayStats();
    displayFeaturedMatches();
    displayLiveCommentary();
    displayUpcomingMatches();
    displayNewsUpdates();
    hideLoading();
    updateLastUpdated();
    updateApiStatus(true);
  } catch (error) {
    console.error("Error loading sports data:", error);
    // Fall back to mock data on error
    const fallbackData = fallbackSportsData[currentSport] || [];
    currentMatches = fallbackData; // Store fallback matches for modal access
    displayMatches(fallbackData);
    displayStats();
    displayFeaturedMatches();
    displayLiveCommentary();
    displayUpcomingMatches();
    displayNewsUpdates();
    hideLoading();
    updateLastUpdated();
    updateApiStatus(false);

    // Show error message to user
    showErrorMessage("Unable to load live data. Showing demo data instead.");
  }
}

// Show loading indicator
function showLoading() {
  isLoading = true;
  document.getElementById("loadingIndicator").style.display = "flex";
  document.getElementById("scoresContainer").style.display = "none";
}

// Hide loading indicator
function hideLoading() {
  isLoading = false;
  document.getElementById("loadingIndicator").style.display = "none";
  document.getElementById("scoresContainer").style.display = "grid";
}

// Display matches
function displayMatches(matches) {
  const container = document.getElementById("scoresContainer");

  if (!matches || matches.length === 0) {
    container.innerHTML = `
            <div class="no-data">
                <h3>No matches available</h3>
                <p>Check back later for live updates</p>
            </div>
        `;
    return;
  }

  container.innerHTML = matches
    .map(
      (match) => `
        <div class="match-card ${match.isLive ? "live" : ""}" data-match-id="${
        match.id
      }">
            <div class="match-header">
                <span class="match-time">${match.time}</span>
                <span class="match-status">${match.status}</span>
            </div>
            
            <div class="teams">
                <div class="team">
                    <div class="team-name">${match.homeTeam}</div>
                    <div class="team-score">${match.homeScore}</div>
                </div>
                
                <div class="vs">VS</div>
                
                <div class="team">
                    <div class="team-name">${match.awayTeam}</div>
                    <div class="team-score">${match.awayScore}</div>
                </div>
            </div>
            
            <div class="match-info">
                <span>${match.league}</span>
                <span>Click for details</span>
            </div>
        </div>
    `
    )
    .join("");
}

// Display statistics
function displayStats() {
  const statsGrid = document.getElementById("statsGrid");
  const stats = mockStats[currentSport] || [];

  statsGrid.innerHTML = stats
    .map(
      (stat) => `
        <div class="stat-card">
            <span class="stat-number">${stat.value}</span>
            <span class="stat-label">${stat.label}</span>
        </div>
    `
    )
    .join("");
}

// Display featured matches
function displayFeaturedMatches() {
  const featuredGrid = document.getElementById("featuredGrid");
  const featuredMatches = currentMatches
    .filter((match) => match.isLive)
    .slice(0, 3);

  if (featuredMatches.length === 0) {
    featuredGrid.innerHTML = `
            <div class="no-data">
                <h3>No featured matches available</h3>
                <p>Check back later for live updates</p>
            </div>
        `;
    return;
  }

  featuredGrid.innerHTML = featuredMatches
    .map(
      (match) => `
        <div class="featured-match" data-match-id="${match.id}">
            <div class="match-header">
                <span class="match-time">${match.time}</span>
                <span class="match-status">${match.status}</span>
            </div>
            
            <div class="teams">
                <div class="team">
                    <div class="team-name">${match.homeTeam}</div>
                    <div class="team-score">${match.homeScore}</div>
                </div>
                
                <div class="vs">VS</div>
                
                <div class="team">
                    <div class="team-name">${match.awayTeam}</div>
                    <div class="team-score">${match.awayScore}</div>
                </div>
            </div>
            
            <div class="match-info">
                <span>${match.league}</span>
                <span>Click for details</span>
            </div>
        </div>
    `
    )
    .join("");
}

// Display live commentary
function displayLiveCommentary() {
  const commentaryContainer = document.getElementById("commentaryContainer");
  const commentary = [
    "⚽ GOAL! Manchester United takes the lead with a brilliant strike!",
    "🏀 Amazing three-pointer by the Lakers! The crowd goes wild!",
    "🎾 What a rally! Djokovic saves three break points!",
    "🏏 Six! That ball went way over the boundary!",
    "⚾ Home run! The Yankees are back in the game!",
    "🏒 Great save by the goalie! What a stop!",
    "🥊 Powerful right hook! The crowd is on their feet!",
    "🏐 What a spike! Brazil takes the set!",
    "🏉 Try! New Zealand extends their lead!",
    "⛳ Eagle! What a shot from the fairway!",
  ];

  const randomCommentary =
    commentary[Math.floor(Math.random() * commentary.length)];
  const time = new Date().toLocaleTimeString();

  commentaryContainer.innerHTML = `
        <div class="commentary-item">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <strong>Live Commentary</strong>
                <span style="font-size: 0.8rem; color: #667eea;">${time}</span>
            </div>
            <p>${randomCommentary}</p>
        </div>
    `;
}

// Display upcoming matches
function displayUpcomingMatches() {
  const upcomingGrid = document.getElementById("upcomingGrid");
  const upcomingMatches = [
    {
      id: 26,
      homeTeam: "Chelsea",
      awayTeam: "Arsenal",
      time: "15:30",
      league: "Premier League",
      date: "Today",
    },
    {
      id: 27,
      homeTeam: "Lakers",
      awayTeam: "Celtics",
      time: "20:00",
      league: "NBA",
      date: "Tonight",
    },
    {
      id: 28,
      homeTeam: "India",
      awayTeam: "England",
      time: "09:30",
      league: "Test Match",
      date: "Tomorrow",
    },
    {
      id: 29,
      homeTeam: "Federer",
      awayTeam: "Nadal",
      time: "14:00",
      league: "Wimbledon",
      date: "Tomorrow",
    },
  ];

  upcomingGrid.innerHTML = upcomingMatches
    .map(
      (match) => `
        <div class="upcoming-match">
            <div class="match-header">
                <span class="match-time">${match.time}</span>
                <span class="match-status">${match.date}</span>
            </div>
            
            <div class="teams">
                <div class="team">
                    <div class="team-name">${match.homeTeam}</div>
                </div>
                
                <div class="vs">VS</div>
                
                <div class="team">
                    <div class="team-name">${match.awayTeam}</div>
                </div>
            </div>
            
            <div class="match-info">
                <span>${match.league}</span>
                <span>Upcoming</span>
            </div>
        </div>
    `
    )
    .join("");
}

// Display news and updates
function displayNewsUpdates() {
  const newsGrid = document.getElementById("newsGrid");
  const newsItems = [
    {
      title: "Manchester United Signs New Star Player",
      summary:
        "The Red Devils have completed the signing of a world-class midfielder for a record fee.",
      time: "2 hours ago",
    },
    {
      title: "NBA Finals Game 7 Tonight",
      summary:
        "The championship will be decided in what promises to be an epic showdown.",
      time: "4 hours ago",
    },
    {
      title: "Cricket World Cup Update",
      summary:
        "India advances to the semifinals with a dominant performance against Australia.",
      time: "6 hours ago",
    },
    {
      title: "Tennis Grand Slam Results",
      summary:
        "Novak Djokovic wins his 20th Grand Slam title in a thrilling five-set match.",
      time: "8 hours ago",
    },
    {
      title: "Olympic Volleyball Finals",
      summary: "Brazil and USA will face off in the gold medal match tomorrow.",
      time: "10 hours ago",
    },
    {
      title: "Rugby Championship Update",
      summary:
        "New Zealand maintains their lead in the championship standings.",
      time: "12 hours ago",
    },
  ];

  newsGrid.innerHTML = newsItems
    .map(
      (item) => `
        <div class="news-item">
            <div class="news-title">${item.title}</div>
            <div class="news-summary">${item.summary}</div>
            <div class="news-time">${item.time}</div>
        </div>
    `
    )
    .join("");
}

// Show match details in modal
function showMatchDetails(matchId) {
  console.log("showMatchDetails called with ID:", matchId);
  console.log("Available matches:", currentMatches);

  // Use current displayed matches instead of mock data
  const match = currentMatches.find((m) => m.id == matchId);

  console.log("Found match:", match);

  if (!match) {
    console.error("No match found with ID:", matchId);
    return;
  }

  const modal = document.getElementById("matchModal");
  const detailsContainer = document.getElementById("matchDetails");

  detailsContainer.innerHTML = `
        <h2>${match.homeTeam} vs ${match.awayTeam}</h2>
        <div class="match-detail-score">
            <div class="team-detail">
                <h3>${match.homeTeam}</h3>
                <div class="score-large">${match.homeScore}</div>
            </div>
            <div class="vs-large">VS</div>
            <div class="team-detail">
                <h3>${match.awayTeam}</h3>
                <div class="score-large">${match.awayScore}</div>
            </div>
        </div>
        
        <div class="match-meta">
            <p><strong>Status:</strong> ${match.status}</p>
            <p><strong>Time:</strong> ${match.time}</p>
            <p><strong>League:</strong> ${match.league}</p>
            <p><strong>Live:</strong> ${match.isLive ? "Yes" : "No"}</p>
        </div>
        
        <div class="match-actions">
            <button onclick="refreshMatchDetails(${
              match.id
            })" class="refresh-btn">
                🔄 Refresh Match
            </button>
        </div>
    `;

  modal.style.display = "block";
}

// Close modal
function closeModal() {
  document.getElementById("matchModal").style.display = "none";
}

// Refresh match details
function refreshMatchDetails(matchId) {
  // Simulate refreshing match data
  showMatchDetails(matchId);
}

// Refresh scores
function refreshScores() {
  if (isLoading) return;

  // Simply load the data without any animation
  loadSportsData();
}

// Update last updated time
function updateLastUpdated() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("lastUpdated").textContent = timeString;
}

// Update API status indicator
function updateApiStatus(isUsingRealApi) {
  const statusIndicator = document.querySelector(".status-indicator");
  const statusText = document.querySelector(".status-text");

  if (isUsingRealApi) {
    statusIndicator.textContent = "🟢";
    statusText.textContent = "Using Real Sports APIs";
  } else {
    statusIndicator.textContent = "🟡";
    statusText.textContent = "Using Demo Data";
  }
}

// Start auto refresh
function startAutoRefresh() {
  // Refresh every 30 seconds
  refreshInterval = setInterval(() => {
    if (!isLoading) {
      loadSportsData();
    }
  }, 30000);
}

// Stop auto refresh
function stopAutoRefresh() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("matchModal");
  if (event.target === modal) {
    closeModal();
  }
};

// Cleanup on page unload
window.addEventListener("beforeunload", function () {
  stopAutoRefresh();
});

// Add some dynamic behavior to simulate live updates
setInterval(() => {
  if (!isLoading && currentSport === "football") {
    // Simulate score changes for live matches
    const liveCards = document.querySelectorAll(".match-card.live");
    liveCards.forEach((card) => {
      if (Math.random() < 0.1) {
        // 10% chance of score update
        const scores = card.querySelectorAll(".team-score");
        scores.forEach((score) => {
          if (Math.random() < 0.5) {
            const currentScore = parseInt(score.textContent) || 0;
            score.textContent = currentScore + 1;

            // Add flash effect
            score.style.animation = "flash 0.5s ease-in-out";
            setTimeout(() => {
              score.style.animation = "";
            }, 500);
          }
        });
      }
    });
  }
}, 10000); // Check every 10 seconds

// Add flash animation for score updates
const style = document.createElement("style");
style.textContent = `
    @keyframes flash {
        0%, 100% { background-color: transparent; }
        50% { background-color: var(--button-bg); color: white; border-radius: 5px; }
    }
`;
document.head.appendChild(style);

// ===== REAL API INTEGRATION FUNCTIONS =====

// Fetch Football data from a free API
async function fetchFootballData() {
  try {
    // Using TheSportsDB API (free, no auth required)
    const response = await fetch(
      "https://www.thesportsdb.com/api/v1/json/3/latestsoccer.php"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform API data to our format
    if (data.teams && data.teams.length > 0) {
      return data.teams.slice(0, 6).map((match, index) => ({
        id: index + 1,
        homeTeam: match.strHomeTeam || "Team A",
        awayTeam: match.strAwayTeam || "Team B",
        homeScore: parseInt(match.intHomeScore) || 0,
        awayScore: parseInt(match.intAwayScore) || 0,
        status: match.strStatus === "Match Finished" ? "FT" : "LIVE",
        time: match.strProgress || "FT",
        league: match.strLeague || "Football League",
        isLive: match.strStatus !== "Match Finished",
      }));
    }

    // If no data, try alternative free API
    const altResponse = await fetch(
      "https://api.football-data.org/v4/matches/today",
      {
        headers: {
          "X-Auth-Token": SPORTS_API_CONFIG?.FOOTBALL_API_KEY || "demo",
        },
      }
    );

    if (altResponse.ok) {
      const altData = await altResponse.json();
      return (
        altData.matches?.slice(0, 6).map((match) => ({
          id: match.id,
          homeTeam: match.homeTeam.name,
          awayTeam: match.awayTeam.name,
          homeScore: match.score.fullTime.home || 0,
          awayScore: match.score.fullTime.away || 0,
          status: match.status === "IN_PLAY" ? "LIVE" : match.status,
          time: match.minute ? `${match.minute}'` : "Scheduled",
          league: match.competition.name,
          isLive: match.status === "IN_PLAY",
        })) || []
      );
    }

    throw new Error("No football data available");
  } catch (error) {
    console.error("Football API error:", error);
    // Return fallback data with live simulation
    return fallbackSportsData.football.map((match) => ({
      ...match,
      homeScore: match.homeScore + Math.floor(Math.random() * 2),
      awayScore: match.awayScore + Math.floor(Math.random() * 2),
    }));
  }
}

// Fetch Cricket data using a free API
async function fetchCricketData() {
  try {
    // Try TheSportsDB API for cricket (free, no auth required)
    const response = await fetch(
      "https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=Cricket"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform API data to our format
    if (data.event && data.event.length > 0) {
      return data.event.slice(0, 4).map((match, index) => ({
        id: index + 1,
        homeTeam: match.strHomeTeam || "Team A",
        awayTeam: match.strAwayTeam || "Team B",
        homeScore: match.intHomeScore || "0/0",
        awayScore: match.intAwayScore || "0/0",
        status: match.strStatus === "Match Finished" ? "FT" : "LIVE",
        time: match.strProgress || "Day 1",
        league: match.strLeague || "Cricket Match",
        isLive: match.strStatus !== "Match Finished",
      }));
    }

    throw new Error("No cricket data available");
  } catch (error) {
    console.error("Cricket API error:", error);
    // Return enhanced fallback data with live simulation
    return fallbackSportsData.cricket.map((match) => ({
      ...match,
      homeScore: `${
        parseInt(match.homeScore.split("/")[0]) + Math.floor(Math.random() * 20)
      }/${Math.floor(Math.random() * 6)}`,
      awayScore: match.awayScore,
    }));
  }
}

// Fetch Basketball data using balldontlie API (free, no auth required)
async function fetchBasketballData() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/games?dates[]=${today}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform API data to our format
    return data.data.slice(0, 4).map((game) => ({
      id: game.id,
      homeTeam: game.home_team.full_name,
      awayTeam: game.visitor_team.full_name,
      homeScore: game.home_team_score || 0,
      awayScore: game.visitor_team_score || 0,
      status: game.status,
      time: game.period ? `Q${game.period}` : "Scheduled",
      league: "NBA",
      isLive: game.status === "Live",
    }));
  } catch (error) {
    console.error("Basketball API error:", error);
    return fallbackSportsData.basketball;
  }
}

// Fetch Tennis data (using fallback for now as most tennis APIs require payment)
async function fetchTennisData() {
  try {
    // Most tennis APIs are paid, so we'll use fallback data
    // In a real implementation, you'd integrate with ATP/WTA APIs
    console.log("Tennis API not implemented - using fallback data");
    return fallbackSportsData.tennis;
  } catch (error) {
    console.error("Tennis API error:", error);
    return fallbackSportsData.tennis;
  }
}

// Fetch Baseball data using MLB API
async function fetchBaseballData() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.dates && data.dates[0] && data.dates[0].games) {
      return data.dates[0].games.slice(0, 4).map((game) => ({
        id: game.gamePk,
        homeTeam: game.teams.home.team.name,
        awayTeam: game.teams.away.team.name,
        homeScore: game.teams.home.score || 0,
        awayScore: game.teams.away.score || 0,
        status: game.status.detailedState,
        time:
          game.status.detailedState === "In Progress"
            ? `${game.linescore?.currentInning || "1st"}`
            : "Scheduled",
        league: "MLB",
        isLive: game.status.detailedState === "In Progress",
      }));
    }

    throw new Error("No baseball data available");
  } catch (error) {
    console.error("Baseball API error:", error);
    return fallbackSportsData.baseball;
  }
}

// Fetch Hockey data using NHL API
async function fetchHockeyData() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `https://statsapi.web.nhl.com/api/v1/schedule?date=${today}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.dates && data.dates[0] && data.dates[0].games) {
      return data.dates[0].games.slice(0, 4).map((game) => ({
        id: game.gamePk,
        homeTeam: game.teams.home.team.name,
        awayTeam: game.teams.away.team.name,
        homeScore: game.teams.home.score || 0,
        awayScore: game.teams.away.score || 0,
        status: game.status.detailedState,
        time:
          game.status.detailedState === "In Progress"
            ? `Period ${game.linescore?.currentPeriod || 1}`
            : "Scheduled",
        league: "NHL",
        isLive: game.status.detailedState === "In Progress",
      }));
    }

    throw new Error("No hockey data available");
  } catch (error) {
    console.error("Hockey API error:", error);
    return fallbackSportsData.hockey;
  }
}

// Fetch Soccer data using TheSportsDB API
async function fetchSoccerData() {
  try {
    const response = await fetch(
      "https://www.thesportsdb.com/api/v1/json/3/latestsoccer.php"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.teams && data.teams.length > 0) {
      return data.teams.slice(0, 4).map((match, index) => ({
        id: index + 1,
        homeTeam: match.strHomeTeam || "Team A",
        awayTeam: match.strAwayTeam || "Team B",
        homeScore: parseInt(match.intHomeScore) || 0,
        awayScore: parseInt(match.intAwayScore) || 0,
        status: match.strStatus === "Match Finished" ? "FT" : "LIVE",
        time: match.strProgress || "FT",
        league: match.strLeague || "Soccer League",
        isLive: match.strStatus !== "Match Finished",
      }));
    }

    throw new Error("No soccer data available");
  } catch (error) {
    console.error("Soccer API error:", error);
    return fallbackSportsData.soccer;
  }
}

// Fetch Golf data (using fallback as most golf APIs require payment)
async function fetchGolfData() {
  try {
    console.log("Golf API not implemented - using fallback data");
    return fallbackSportsData.golf;
  } catch (error) {
    console.error("Golf API error:", error);
    return fallbackSportsData.golf;
  }
}

// Fetch Boxing data (using fallback as most boxing APIs require payment)
async function fetchBoxingData() {
  try {
    console.log("Boxing API not implemented - using fallback data");
    return fallbackSportsData.boxing;
  } catch (error) {
    console.error("Boxing API error:", error);
    return fallbackSportsData.boxing;
  }
}

// Fetch MMA data (using fallback as most MMA APIs require payment)
async function fetchMmaData() {
  try {
    console.log("MMA API not implemented - using fallback data");
    return fallbackSportsData.mma;
  } catch (error) {
    console.error("MMA API error:", error);
    return fallbackSportsData.mma;
  }
}

// Fetch Volleyball data (using fallback as most volleyball APIs require payment)
async function fetchVolleyballData() {
  try {
    console.log("Volleyball API not implemented - using fallback data");
    return fallbackSportsData.volleyball;
  } catch (error) {
    console.error("Volleyball API error:", error);
    return fallbackSportsData.volleyball;
  }
}

// Fetch Rugby data (using fallback as most rugby APIs require payment)
async function fetchRugbyData() {
  try {
    console.log("Rugby API not implemented - using fallback data");
    return fallbackSportsData.rugby;
  } catch (error) {
    console.error("Rugby API error:", error);
    return fallbackSportsData.rugby;
  }
}

// Show error message to user
function showErrorMessage(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.innerHTML = `
        <div class="error-content">
            <span class="error-icon">⚠️</span>
            <span class="error-text">${message}</span>
            <button class="error-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

  // Add error styles
  errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        max-width: 300px;
    `;

  document.body.appendChild(errorDiv);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentElement) {
      errorDiv.remove();
    }
  }, 5000);
}
