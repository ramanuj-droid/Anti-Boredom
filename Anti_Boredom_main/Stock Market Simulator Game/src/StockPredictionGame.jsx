import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Award, Clock, BarChart3, Zap, Trophy, History } from 'lucide-react';

const StockPredictionGame = () => {
  const [price, setPrice] = useState(1000);
  const [priceHistory, setPriceHistory] = useState([1000]);
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('stockGameCoins');
    return saved ? parseInt(saved) : 10000;
  });
  const [currentBet, setCurrentBet] = useState(null);
  const [betAmount, setBetAmount] = useState(100);
  const [countdown, setCountdown] = useState(null);
  const [result, setResult] = useState(null);
  const [streak, setStreak] = useState(0);
  const [totalGames, setTotalGames] = useState(() => {
    const saved = localStorage.getItem('stockGameTotal');
    return saved ? parseInt(saved) : 0;
  });
  const [wins, setWins] = useState(() => {
    const saved = localStorage.getItem('stockGameWins');
    return saved ? parseInt(saved) : 0;
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [recentResults, setRecentResults] = useState([]);
  const canvasRef = useRef(null);

  const stocks = [
    { symbol: 'TECH', name: 'TechCorp', volatility: 0.02 },
    { symbol: 'BIO', name: 'BioMed', volatility: 0.025 },
    { symbol: 'ENERGY', name: 'EnergyCo', volatility: 0.018 },
    { symbol: 'FINANCE', name: 'FinanceHub', volatility: 0.022 }
  ];

  const [currentStock, setCurrentStock] = useState(stocks[0]);

  // Simulate price movement
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prevPrice => {
        const change = (Math.random() - 0.5) * 2 * currentStock.volatility;
        const newPrice = prevPrice * (1 + change);
        const clampedPrice = Math.max(800, Math.min(1200, newPrice));
        
        setPriceHistory(prev => {
          const newHistory = [...prev, clampedPrice];
          return newHistory.slice(-50);
        });
        
        return clampedPrice;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStock]);

  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (priceHistory.length < 2) return;

    const minPrice = Math.min(...priceHistory);
    const maxPrice = Math.max(...priceHistory);
    const priceRange = maxPrice - minPrice || 1;

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw gradient area
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
    gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');

    ctx.beginPath();
    ctx.moveTo(0, height);

    priceHistory.forEach((p, i) => {
      const x = (width / (priceHistory.length - 1)) * i;
      const y = height - ((p - minPrice) / priceRange) * height;
      if (i === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    priceHistory.forEach((p, i) => {
      const x = (width / (priceHistory.length - 1)) * i;
      const y = height - ((p - minPrice) / priceRange) * height;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw current price point
    const lastX = width;
    const lastY = height - ((priceHistory[priceHistory.length - 1] - minPrice) / priceRange) * height;
    ctx.beginPath();
    ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#22c55e';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

  }, [priceHistory]);

  // Countdown timer
  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      resolveBet();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const placeBet = (direction) => {
    if (currentBet || coins < betAmount) return;

    setCurrentBet({
      direction,
      amount: betAmount,
      startPrice: price,
      timestamp: Date.now()
    });
    setCoins(coins - betAmount);
    setCountdown(8);
    setResult(null);
    setIsAnimating(false);
  };

  const resolveBet = () => {
    if (!currentBet) return;

    const priceChange = price - currentBet.startPrice;
    const won = (currentBet.direction === 'up' && priceChange > 0) || 
                (currentBet.direction === 'down' && priceChange < 0);

    const multiplier = 1.9;
    const winAmount = Math.floor(currentBet.amount * multiplier);
    
    setIsAnimating(true);
    
    if (won) {
      setCoins(prev => prev + winAmount);
      setStreak(prev => prev + 1);
      setWins(prev => {
        const newWins = prev + 1;
        localStorage.setItem('stockGameWins', newWins.toString());
        return newWins;
      });
      setResult({
        type: 'win',
        amount: winAmount,
        change: priceChange
      });
    } else {
      setStreak(0);
      setResult({
        type: 'loss',
        amount: currentBet.amount,
        change: priceChange
      });
    }

    setTotalGames(prev => {
      const newTotal = prev + 1;
      localStorage.setItem('stockGameTotal', newTotal.toString());
      return newTotal;
    });

    setRecentResults(prev => [{
      won,
      amount: won ? winAmount : currentBet.amount,
      direction: currentBet.direction,
      change: priceChange
    }, ...prev].slice(0, 5));

    setTimeout(() => {
      setCurrentBet(null);
      setCountdown(null);
      setIsAnimating(false);
    }, 3000);
  };

  // Save coins
  useEffect(() => {
    localStorage.setItem('stockGameCoins', coins.toString());
  }, [coins]);

  const resetGame = () => {
    setCoins(10000);
    setStreak(0);
    setTotalGames(0);
    setWins(0);
    setRecentResults([]);
    localStorage.setItem('stockGameCoins', '10000');
    localStorage.setItem('stockGameTotal', '0');
    localStorage.setItem('stockGameWins', '0');
  };

  const priceChange = priceHistory.length >= 2 
    ? priceHistory[priceHistory.length - 1] - priceHistory[priceHistory.length - 2]
    : 0;

  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-xl bg-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    Bull vs Bear
                  </h1>
                  <p className="text-sm text-gray-400">Predict. Win. Repeat.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    <span className="text-2xl font-bold text-white">{coins.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Virtual Coins</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Trading Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stock Selector */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {stocks.map(stock => (
                  <button
                    key={stock.symbol}
                    onClick={() => setCurrentStock(stock)}
                    className={`px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                      currentStock.symbol === stock.symbol
                        ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-xl scale-105'
                        : 'bg-white/5 hover:bg-white/10 text-gray-400'
                    }`}
                  >
                    <div className="font-bold">{stock.symbol}</div>
                    <div className="text-xs opacity-80">{stock.name}</div>
                  </button>
                ))}
              </div>

              {/* Price Chart */}
              <div className="bg-white/5 rounded-3xl border border-white/10 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">{currentStock.name}</div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold">${price.toFixed(2)}</span>
                      <span className={`flex items-center gap-1 text-lg font-semibold ${
                        priceChange >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {priceChange >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Volatility</div>
                    <div className="text-xl font-bold">{(currentStock.volatility * 100).toFixed(1)}%</div>
                  </div>
                </div>

                <canvas 
                  ref={canvasRef} 
                  width={800} 
                  height={300}
                  className="w-full rounded-xl"
                  style={{ maxHeight: '300px' }}
                />
              </div>

              {/* Betting Interface */}
              <div className="bg-white/5 rounded-3xl border border-white/10 p-6 backdrop-blur-xl">
                <div className="mb-6">
                  <label className="text-sm text-gray-400 mb-2 block">Bet Amount</label>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="50"
                      max="1000"
                      step="50"
                      value={betAmount}
                      onChange={(e) => setBetAmount(parseInt(e.target.value))}
                      disabled={currentBet !== null}
                      className="flex-1"
                    />
                    <div className="px-4 py-2 rounded-xl bg-white/10 font-bold min-w-[100px] text-center">
                      ${betAmount}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[50, 100, 250, 500, 1000].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setBetAmount(amount)}
                        disabled={currentBet !== null}
                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm disabled:opacity-50"
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>

                {countdown !== null && (
                  <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50">
                      <Clock className="w-5 h-5 animate-pulse" />
                      <span className="text-2xl font-bold">{countdown}s</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Resolving bet...</p>
                  </div>
                )}

                {result && (
                  <div className={`mb-6 p-6 rounded-2xl text-center ${
                    result.type === 'win' 
                      ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-2 border-emerald-500/50' 
                      : 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-2 border-red-500/50'
                  } ${isAnimating ? 'animate-bounce' : ''}`}>
                    <div className="text-4xl mb-2">{result.type === 'win' ? '🎉' : '😔'}</div>
                    <div className="text-2xl font-bold mb-2">
                      {result.type === 'win' ? 'Winner!' : 'Better luck next time!'}
                    </div>
                    <div className="text-xl">
                      {result.type === 'win' ? '+' : '-'}${result.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      Price change: {result.change >= 0 ? '+' : ''}{result.change.toFixed(2)}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => placeBet('up')}
                    disabled={currentBet !== null || coins < betAmount}
                    className="relative overflow-hidden group px-8 py-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                    <div className="relative flex flex-col items-center gap-2">
                      <TrendingUp className="w-8 h-8" />
                      <span className="text-xl font-bold">BULL</span>
                      <span className="text-sm opacity-90">Price goes UP</span>
                    </div>
                  </button>

                  <button
                    onClick={() => placeBet('down')}
                    disabled={currentBet !== null || coins < betAmount}
                    className="relative overflow-hidden group px-8 py-6 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                    <div className="relative flex flex-col items-center gap-2">
                      <TrendingDown className="w-8 h-8" />
                      <span className="text-xl font-bold">BEAR</span>
                      <span className="text-sm opacity-90">Price goes DOWN</span>
                    </div>
                  </button>
                </div>

                <p className="text-center text-sm text-gray-400 mt-4">
                  Win 1.9x your bet! Predict correctly in 8 seconds.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="bg-white/5 rounded-3xl border border-white/10 p-6 backdrop-blur-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm text-gray-400">Win Rate</span>
                    </div>
                    <span className="text-xl font-bold">{winRate}%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm text-gray-400">Wins</span>
                    </div>
                    <span className="text-xl font-bold">{wins}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-400" />
                      <span className="text-sm text-gray-400">Streak</span>
                    </div>
                    <span className="text-xl font-bold">{streak}🔥</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2">
                      <History className="w-5 h-5 text-blue-400" />
                      <span className="text-sm text-gray-400">Total Games</span>
                    </div>
                    <span className="text-xl font-bold">{totalGames}</span>
                  </div>
                </div>
              </div>

              {/* Recent Results */}
              <div className="bg-white/5 rounded-3xl border border-white/10 p-6 backdrop-blur-xl">
                <h3 className="text-lg font-semibold mb-4">Recent Results</h3>
                <div className="space-y-2">
                  {recentResults.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">No games played yet</p>
                  ) : (
                    recentResults.map((r, i) => (
                      <div 
                        key={i}
                        className={`p-3 rounded-xl flex items-center justify-between ${
                          r.won ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {r.direction === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="text-sm font-semibold">{r.won ? 'Won' : 'Lost'}</span>
                        </div>
                        <span className={`text-sm font-bold ${r.won ? 'text-emerald-400' : 'text-red-400'}`}>
                          {r.won ? '+' : '-'}${r.amount}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetGame}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-semibold"
              >
                Reset Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPredictionGame;