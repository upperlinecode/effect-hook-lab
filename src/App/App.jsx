<<<<<<< HEAD
// import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "../Board/Board";

const App = () => {
  const defaultCategories = [74, 115, 268, 217, 783];

=======
import { useState } from "react";
// import { useEffect } from "react";
import "./App.css";
import Board from "../Board/Board";
// import sampleData from "../sample_data.json";
import NewGameButton from "../NewGameButton/NewGameButton";

const App = () => {
  const [score, setScore] = useState(0);
  const [reset, setReset] = useState(false);
  const defaultCategories = [74, 115, 268, 217, 783];

  const updateScore = (scoreChange) => {
    setScore(score + scoreChange);
  };

  const newGame = () => {
    setScore(0);
    setReset(!reset);
    return reset;
  };

>>>>>>> 7758ea4fddd6ffc7fbadbf151946b23022c3574c
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title"> Welcome to Jeopardy! </h1>
        <div className="score-box">
<<<<<<< HEAD
          <h2>Score: </h2>
        </div>
      </header>
      <Board categoryNumbers={defaultCategories} />
=======
          <h2>Score: {score}</h2>
          <NewGameButton clickHandler={newGame} />
        </div>
      </header>
      <Board
        reset={reset}
        updateScore={updateScore}
        categoryNumbers={defaultCategories}
      />
>>>>>>> 7758ea4fddd6ffc7fbadbf151946b23022c3574c
    </div>
  );
};

export default App;
