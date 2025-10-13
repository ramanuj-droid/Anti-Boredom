// API Configuration File
// Replace the placeholder values with your actual API keys

const SPORTS_API_CONFIG = {
    // Football Data API (football-data.org)
    // Get your free API key at: https://www.football-data.org/client/register
    FOOTBALL_API_KEY: 'YOUR_FOOTBALL_API_KEY_HERE',
    
    // Cricket API (cricapi.com)
    // Get your free API key at: https://www.cricapi.com/
    CRICKET_API_KEY: 'YOUR_CRICKET_API_KEY_HERE',
    
    // Basketball API (balldontlie.io) - No API key required
    // This API is completely free and doesn't require authentication
    
    // Tennis API - Most tennis APIs are paid
    // For now, we use fallback data
    
    // API Rate Limits (requests per minute)
    RATE_LIMITS: {
        football: 10,  // football-data.org free tier: 10 requests/minute
        cricket: 100,  // cricapi.com free tier: 100 requests/day
        basketball: 60 // balldontlie.io: no official limit but be respectful
    },
    
    // Enable/Disable APIs (set to false to use fallback data)
    ENABLE_APIS: {
        football: true,
        cricket: true,
        basketball: true,
        tennis: false // Using fallback data
    }
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SPORTS_API_CONFIG;
}
