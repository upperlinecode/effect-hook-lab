// import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "../Board/Board";

const App = () => {
  const defaultCategories = [74, 115, 268, 217, 783];

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title"> Welcome to Jeopardy! </h1>
        <div className="score-box">
          <h2>Score: </h2>
        </div>
      </header>
      <Board categoryNumbers={defaultCategories} />
    </div>
  );
};

export default App;
