# 🏆 Sports Live API Setup Guide

This guide will help you set up real live sports data APIs for the Sports Live Updates feature.

## 🚀 Quick Start (No API Keys Required)

The application works **immediately** with these free APIs:

### ✅ **Currently Working APIs (No Setup Required)**

1. **🏀 Basketball** - `balldontlie.io` (Completely free, no auth)
2. **⚽ Football** - `TheSportsDB.com` (Free tier, no auth for basic data)
3. **🏏 Cricket** - `TheSportsDB.com` (Free tier, no auth for basic data)

## 🔑 Enhanced APIs (Requires Free Registration)

For more comprehensive and real-time data, you can register for these free APIs:

### 1. **⚽ Football Data API** (football-data.org)

**Features:** Real-time scores, fixtures, standings
**Free Tier:** 10 requests/minute, major European leagues

**Setup Steps:**
1. Visit: https://www.football-data.org/client/register
2. Create free account
3. Get your API key from dashboard
4. Replace `YOUR_FOOTBALL_API_KEY_HERE` in `config.js`

```javascript
FOOTBALL_API_KEY: 'your_actual_api_key_here'
```

### 2. **🏏 Cricket API** (cricapi.com)

**Features:** Live scores, ball-by-ball updates
**Free Tier:** 100 requests/day

**Setup Steps:**
1. Visit: https://www.cricapi.com/
2. Sign up for free account
3. Get API key from dashboard
4. Replace `YOUR_CRICKET_API_KEY_HERE` in `config.js`

```javascript
CRICKET_API_KEY: 'your_actual_api_key_here'
```

## 📊 **Current API Status**

| Sport | API Source | Status | Auth Required | Rate Limit |
|-------|------------|--------|---------------|------------|
| ⚽ Football | TheSportsDB | ✅ Active | ❌ No | Unlimited |
| 🏏 Cricket | TheSportsDB | ✅ Active | ❌ No | Unlimited |
| 🏀 Basketball | BallDontLie | ✅ Active | ❌ No | ~60/min |
| 🎾 Tennis | Fallback Data | ⚠️ Demo | ❌ No | N/A |

## 🛠️ **Configuration**

Edit the `config.js` file to customize API settings:

```javascript
const SPORTS_API_CONFIG = {
    // Add your API keys here
    FOOTBALL_API_KEY: 'your_key_here',
    CRICKET_API_KEY: 'your_key_here',
    
    // Enable/Disable specific APIs
    ENABLE_APIS: {
        football: true,
        cricket: true,
        basketball: true,
        tennis: false
    }
};
```

## 🔄 **How It Works**

1. **Primary APIs:** Try to fetch from real sports APIs
2. **Fallback System:** If API fails, use enhanced mock data
3. **Error Handling:** Graceful degradation with user notifications
4. **Auto-Refresh:** Updates every 30 seconds
5. **Live Simulation:** Adds realistic score changes to demo data

## 🌐 **Free API Alternatives**

If you want to explore other free sports APIs:

### Football:
- **API-Sports** (api-sports.io) - 100 requests/day free
- **SportMonks** (sportmonks.com) - 14-day free trial

### Cricket:
- **CricketData.org** - Free cricket API
- **Roanuz Cricket API** - Free tier available

### Basketball:
- **NBA API** (nba.com) - Official but limited
- **SportsData.io** - Free tier available

### Tennis:
- **Tennis Live Data** (rapidapi.com) - Various providers
- **ATP/WTA APIs** - Official but mostly paid

## 🚨 **Important Notes**

### CORS Issues
Some APIs may have CORS restrictions. Solutions:
1. Use a CORS proxy service
2. Set up a backend server
3. Use browser extensions for development

### Rate Limiting
- Respect API rate limits
- Implement caching for better performance
- Use fallback data when limits are exceeded

### API Keys Security
- Never commit API keys to public repositories
- Use environment variables in production
- Rotate keys regularly

## 🧪 **Testing**

To test the API integration:

1. **Open Browser Console** (F12)
2. **Check Network Tab** for API calls
3. **Look for Console Logs** showing API responses
4. **Verify Data Updates** every 30 seconds

## 🔧 **Troubleshooting**

### Common Issues:

**1. "API Key Invalid"**
- Check if API key is correctly set in `config.js`
- Verify API key is active on provider's dashboard

**2. "CORS Error"**
- API doesn't allow browser requests
- Use a CORS proxy or backend server

**3. "Rate Limit Exceeded"**
- Too many requests sent
- Wait for rate limit reset
- Implement request caching

**4. "No Data Returned"**
- API might be down
- Check API status page
- Fallback data will be used automatically

## 📈 **Performance Tips**

1. **Cache API Responses** for 30-60 seconds
2. **Batch Multiple Requests** when possible
3. **Use WebSockets** for real-time updates (advanced)
4. **Implement Request Queuing** for rate limit management

## 🎯 **Next Steps**

1. **Get API Keys** for enhanced data
2. **Test Different Sports** to see live updates
3. **Monitor API Usage** to stay within limits
4. **Consider Paid Plans** for production use

---

**Need Help?** Check the browser console for detailed error messages and API response logs.
