import './App.css';

import { Routes, Route } from 'react-router-dom';
import Newspage from "./component/Newspage";
import { useState } from 'react';

function App() {

  const [category, setCategory] = useState("business");

  return (
    <div className="app-body">
      <div className="Header">
        <h1>NewsHub </h1>

      </div>

      <main>
        <Routes>

          <Route path="/" element={<Newspage category={category} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
