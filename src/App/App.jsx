import { useState, useEffect } from "react";

import { allCluesHardcoded } from "../data";

import "./App.css";
import Board from "../Board/Board";

const App = () => {
  const [allClues, setAllClues] = useState(allCluesHardcoded);

  // useEffect(() => {}, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title"> Welcome to Jeopardy! </h1>
        <div className="score-box">
          <h2>Score: </h2>
        </div>
      </header>
      <Board allClues={allClues} />
    </div>
  );
};

export default App;
