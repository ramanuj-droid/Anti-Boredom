import React, { useEffect, useState, useRef } from "react";

// Element Guess Game - Single-file React component
// Drop into a Create-React-App / Vite React project as App.jsx (or default export from a page)
// Features:
// - Local JSON of elements (first 36 included; extendable)
// - Timed rounds (configurable)
// - Hints: atomic number, group, period, category (metal/nonmetal)
// - Immediate feedback and running score
// - Animations via CSS classes
// - Leaderboard persisted in localStorage
// - Toggle to fetch from a Periodic Table API (commented out)

const ELEMENTS = [
  { name: "Hydrogen", symbol: "H", number: 1, group: 1, period: 1, category: "nonmetal" },
  { name: "Helium", symbol: "He", number: 2, group: 18, period: 1, category: "noble gas" },
  { name: "Lithium", symbol: "Li", number: 3, group: 1, period: 2, category: "alkali metal" },
  { name: "Beryllium", symbol: "Be", number: 4, group: 2, period: 2, category: "alkaline earth metal" },
  { name: "Boron", symbol: "B", number: 5, group: 13, period: 2, category: "metalloid" },
  { name: "Carbon", symbol: "C", number: 6, group: 14, period: 2, category: "nonmetal" },
  { name: "Nitrogen", symbol: "N", number: 7, group: 15, period: 2, category: "nonmetal" },
  { name: "Oxygen", symbol: "O", number: 8, group: 16, period: 2, category: "nonmetal" },
  { name: "Fluorine", symbol: "F", number: 9, group: 17, period: 2, category: "halogen" },
  { name: "Neon", symbol: "Ne", number: 10, group: 18, period: 2, category: "noble gas" },
  { name: "Sodium", symbol: "Na", number: 11, group: 1, period: 3, category: "alkali metal" },
  { name: "Magnesium", symbol: "Mg", number: 12, group: 2, period: 3, category: "alkaline earth metal" },
  { name: "Aluminium", symbol: "Al", number: 13, group: 13, period: 3, category: "post-transition metal" },
  { name: "Silicon", symbol: "Si", number: 14, group: 14, period: 3, category: "metalloid" },
  { name: "Phosphorus", symbol: "P", number: 15, group: 15, period: 3, category: "nonmetal" },
  { name: "Sulfur", symbol: "S", number: 16, group: 16, period: 3, category: "nonmetal" },
  { name: "Chlorine", symbol: "Cl", number: 17, group: 17, period: 3, category: "halogen" },
  { name: "Argon", symbol: "Ar", number: 18, group: 18, period: 3, category: "noble gas" },
  { name: "Potassium", symbol: "K", number: 19, group: 1, period: 4, category: "alkali metal" },
  { name: "Calcium", symbol: "Ca", number: 20, group: 2, period: 4, category: "alkaline earth metal" },
  { name: "Scandium", symbol: "Sc", number: 21, group: 3, period: 4, category: "transition metal" },
  { name: "Titanium", symbol: "Ti", number: 22, group: 4, period: 4, category: "transition metal" },
  { name: "Vanadium", symbol: "V", number: 23, group: 5, period: 4, category: "transition metal" },
  { name: "Chromium", symbol: "Cr", number: 24, group: 6, period: 4, category: "transition metal" },
  { name: "Manganese", symbol: "Mn", number: 25, group: 7, period: 4, category: "transition metal" },
  { name: "Iron", symbol: "Fe", number: 26, group: 8, period: 4, category: "transition metal" },
  { name: "Cobalt", symbol: "Co", number: 27, group: 9, period: 4, category: "transition metal" },
  { name: "Nickel", symbol: "Ni", number: 28, group: 10, period: 4, category: "transition metal" },
  { name: "Copper", symbol: "Cu", number: 29, group: 11, period: 4, category: "transition metal" },
  { name: "Zinc", symbol: "Zn", number: 30, group: 12, period: 4, category: "transition metal" },
  { name: "Gallium", symbol: "Ga", number: 31, group: 13, period: 4, category: "post-transition metal" },
  { name: "Germanium", symbol: "Ge", number: 32, group: 14, period: 4, category: "metalloid" },
  { name: "Arsenic", symbol: "As", number: 33, group: 15, period: 4, category: "metalloid" },
  { name: "Selenium", symbol: "Se", number: 34, group: 16, period: 4, category: "nonmetal" },
  { name: "Bromine", symbol: "Br", number: 35, group: 17, period: 4, category: "halogen" },
  { name: "Krypton", symbol: "Kr", number: 36, group: 18, period: 4, category: "noble gas" }
];

const defaultRoundTime = 25; // seconds
const roundsPerGame = 8;

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ElementGuessGame() {
  const [pool, setPool] = useState(() => shuffle(ELEMENTS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(defaultRoundTime);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null); // { correct: bool, text: string }
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintLevel, setHintLevel] = useState(0); // 0 none, 1 atomic number, 2 group/period, 3 category
  const [leaderboard, setLeaderboard] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("eg_leaderboard")) || [];
    } catch (e) {
      return [];
    }
  });
  const timerRef = useRef(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, currentIndex]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  function startTimer() {
    clearInterval(timerRef.current);
    setTimeLeft(defaultRoundTime);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
  }

  function handleTimeout() {
    clearInterval(timerRef.current);
    const element = pool[currentIndex];
    setFeedback({ correct: false, text: `Time's up! It was ${element.name} (${element.symbol})` });
    nextRound(false);
  }

  function useHint() {
    // cycling hints: 1 -> 2 -> 3
    setHintLevel((h) => Math.min(3, h + 1));
    setHintsUsed((n) => n + 1);
  }

  function checkGuess(raw) {
    const guess = raw.trim().toLowerCase();
    const element = pool[currentIndex];
    const correctNames = [element.name.toLowerCase(), element.symbol.toLowerCase()];
    if (correctNames.includes(guess)) {
      // score calculation: base + time bonus - hint penalty
      const base = 10;
      const timeBonus = Math.max(0, Math.floor((timeLeft / defaultRoundTime) * 10));
      const hintPenalty = hintsUsed * 2;
      const gained = Math.max(1, base + timeBonus - hintPenalty);
      setScore((s) => s + gained);
      setFeedback({ correct: true, text: `Correct! +${gained} pts — ${element.name} (${element.symbol})` });
      animateCorrect();
      nextRound(true);
    } else {
      setFeedback({ correct: false, text: `Nope — try again or press Skip` });
      animateWrong();
    }
  }

  function animateCorrect() {
    setAnimKey((k) => k + 1);
  }

  function animateWrong() {
    setAnimKey((k) => k + 1);
  }

  function nextRound(wasCorrect) {
    clearInterval(timerRef.current);
    setHintsUsed(0);
    setHintLevel(0);
    setInput("");
    // small pause for feedback, then move on
    setTimeout(() => {
      if (round >= roundsPerGame) {
        endGame();
        return;
      }
      const nextIdx = currentIndex + 1;
      if (nextIdx >= pool.length) {
        setPool(shuffle(ELEMENTS));
        setCurrentIndex(0);
      } else {
        setCurrentIndex(nextIdx);
      }
      setRound((r) => r + 1);
      startTimer();
    }, 1200);
  }

  function skip() {
    setFeedback({ correct: false, text: `Skipped. The answer was ${pool[currentIndex].name}` });
    nextRound(false);
  }

  function endGame() {
    clearInterval(timerRef.current);
    const name = prompt("Game over! Enter your name for the leaderboard:", "Player");
    const newScore = { name: name || "Player", score, date: new Date().toISOString() };
    const newBoard = [...leaderboard, newScore].sort((a, b) => b.score - a.score).slice(0, 10);
    setLeaderboard(newBoard);
    localStorage.setItem("eg_leaderboard", JSON.stringify(newBoard));
    // reset for new game
    setRound(1);
    setScore(0);
    setPool(shuffle(ELEMENTS));
    setCurrentIndex(0);
    setHintsUsed(0);
    setHintLevel(0);
    setFeedback({ correct: true, text: `Saved to leaderboard as ${newScore.name}` });
    startTimer();
  }

  const current = pool[currentIndex];

  function renderHints() {
    if (!current) return null;
    const hints = [];
    if (hintLevel >= 1) hints.push(`Atomic #: ${current.number}`);
    if (hintLevel >= 2) hints.push(`Group ${current.group} · Period ${current.period}`);
    if (hintLevel >= 3) hints.push(`Category: ${current.category}`);
    return (
      <div className="hints">
        {hints.map((h, i) => (
          <div key={i} className="hint-item">
            {h}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="eg-wrap">
      <style>{`
        .eg-wrap{font-family:Inter,system-ui,Segoe UI,Roboto,"Helvetica Neue",Arial;margin:20px;max-width:900px}
        .card{background:linear-gradient(180deg,#0f172a, #071024);color:#e6eef8;padding:18px;border-radius:12px;box-shadow:0 6px 30px rgba(2,6,23,.6)}
        .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
        .timer{font-weight:700}
        .clue{margin:14px 0;padding:14px;background:rgba(255,255,255,0.03);border-radius:8px}
        .hint-item{padding:8px 10px;background:rgba(255,255,255,0.02);border-radius:6px;margin:6px 0}
        .input-row{display:flex;gap:8px;margin-top:10px}
        .input{flex:1;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:inherit}
        .btn{padding:10px 12px;border-radius:8px;border:none;background:#2563eb;color:white;font-weight:700;cursor:pointer}
        .btn-ghost{background:transparent;border:1px solid rgba(255,255,255,0.06)}
        .feedback{margin-top:12px;padding:10px;border-radius:8px}
        .feedback.correct{background:linear-gradient(90deg,#064e3b,#064e3b7a)}
        .feedback.wrong{background:linear-gradient(90deg,#7f1d1d,#7f1d1d7a)}
        .scoreboard{display:flex;gap:12px;align-items:center}
        .pulse{animation:pulse 1s ease}
        @keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.03)}100%{transform:scale(1)}}
        .shake{animation:shake 0.6s}
        @keyframes shake{10%{transform:translateX(-5px)}30%{transform:translateX(5px)}50%{transform:translateX(-3px)}70%{transform:translateX(3px)}90%{transform:translateX(-1px)}100%{transform:translateX(0)}}
        .leaderboard{margin-top:16px;background:rgba(255,255,255,0.02);padding:10px;border-radius:8px}
      `}</style>

      <div className="card">
        <div className="top">
          <div>
            <h2>Element Guess — Quickfire</h2>
            <div className="scoreboard">Round {round}/{roundsPerGame} · <div style={{marginLeft:10}}>Score: <strong>{score}</strong></div></div>
          </div>
          <div style={{textAlign:"right"}}>
            <div className="timer">⏱ {timeLeft}s</div>
            <div style={{fontSize:12,opacity:0.8}}>Hints used: {hintsUsed}</div>
          </div>
        </div>

        <div className={`clue ${animKey % 2 === 0 ? "pulse" : ""}`}>
          {/* Primary clue: category & periodic table zone */}
          <div style={{fontSize:18,fontWeight:700}}>{current ? current.category.toUpperCase() : "—"}</div>
          <div style={{opacity:0.85,marginTop:6}}>Guess the element from these clues. You can answer by name (e.g., Oxygen) or symbol (e.g., O).</div>
        </div>

        {renderHints()}

        <div className="input-row">
          <input
            className={`input ${feedback && !feedback.correct ? "shake" : ""}`}
            placeholder="Type element name or symbol..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") checkGuess(input);
            }}
          />
          <button className="btn" onClick={() => checkGuess(input)}>Guess</button>
          <button className="btn btn-ghost" onClick={skip}>Skip</button>
          <button className="btn btn-ghost" onClick={useHint}>Hint</button>
        </div>

        {feedback && (
          <div className={`feedback ${feedback.correct ? "correct" : "wrong"}`}>{feedback.text}</div>
        )}

        <div style={{display:"flex",justifyContent:"space-between",marginTop:12}}>
          <div style={{fontSize:12,opacity:0.9}}>
            Tip: use hints wisely — each hint increases accuracy but reduces points.
          </div>
          <div>
            <button
              className="btn btn-ghost"
              onClick={() => {
                // shuffle and restart
                setPool(shuffle(ELEMENTS));
                setCurrentIndex(0);
                setRound(1);
                setScore(0);
                setFeedback(null);
                setHintsUsed(0);
                setHintLevel(0);
                startTimer();
              }}
            >Restart</button>
          </div>
        </div>

        <div className="leaderboard">
          <h4 style={{margin:6}}>Leaderboard</h4>
          {leaderboard.length === 0 ? (
            <div style={{opacity:0.7}}>No scores yet — be the first!</div>
          ) : (
            <ol>
              {leaderboard.map((l, i) => (
                <li key={i}>{l.name} — {l.score} pts</li>
              ))}
            </ol>
          )}
        </div>

        <div style={{marginTop:12,fontSize:12,opacity:0.8}}>
          <strong>Extending / API:</strong> To fetch live element data, replace the local ELEMENTS constant with a fetch to a Periodic Table API
          (e.g., https://periodic-table-api.herokuapp.com) and setPool(data). Keep a cached copy in localStorage for offline play.
        </div>
      </div>
    </div>
  );
}
