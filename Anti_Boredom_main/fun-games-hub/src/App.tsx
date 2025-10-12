import './App.css'

import RandomMeme from "./components/RandomMeme";

function App() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Fun Games Hub</h1>
      <RandomMeme />
      {/* Add other games here later */}
    </div>
  );
}

export default App;
