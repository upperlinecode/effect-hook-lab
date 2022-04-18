import { useEffect, useState } from "react";
import "./App.css";
import Board from "../Board/Board";
import { callAPI, cleanData } from "../utils";
import NewGameButton from "../NewGameButton/NewGameButton";

function App() {
  const [score, setScore] = useState(0);
  const [data, setData] = useState({});
  const [reset, setReset] = useState(false);

  const updateScore = (scoreToAdd: number) => {
    setScore(score + scoreToAdd);
  };

  const newGame = () => {
    setReset(!reset);
    return reset;
  };

  useEffect(() => {
    callAPI().then((data) => {
      const cleanedData = cleanData(data);
      setData(cleanedData);
    });
  }, [reset]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title"> Welcome to Jeopardy! </h1>
        <div className="score-box">
          <h2>Score: {score}</h2>
          <NewGameButton clickHandler={() => newGame()} />
        </div>
      </header>
      <Board updateScore={updateScore} categories={data} />
    </div>
  );
}

export default App;
