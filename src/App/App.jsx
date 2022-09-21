import { useState, useEffect } from "react";

import { categoryIds } from "../data";
import { getFiveClues } from "../utils";

import "./App.css";
import Board from "../Board/Board";

const App = () => {
  const [allClues, setAllClues] = useState([]);

  useEffect(() => {
    const getClues = async (categoryIds: number[]) => {
      /*
        We should use Promise.all if we have to group a number of network request
        together and need to await for all of them to resolve before continuing
        processing.

        Promise.all keeps the passed in array order regardless of when each
        promise resolves.

        SO ref on Promise.all with fetch
        https://stackoverflow.com/questions/31710768/how-can-i-fetch-an-array-of-urls-with-promise-all

        MDN Promise.all
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
      */
      const responses = categoryIds.map(async (catId) => {
        const response = await fetch(
          `https://jservice.io/api/clues?category=${catId}`
        );

        const newQuestions = await response.json();
        const topFiveQuestions = getFiveClues(newQuestions);
        return topFiveQuestions;
      });

      const cluesResult = await Promise.all(responses);

      setAllClues(cluesResult);
    };

    getClues(categoryIds);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title"> Welcome to Jeopardy! </h1>
        <div className="score-box">
          <h2>Score: </h2>
        </div>
      </header>
      {allClues.length && <Board allClues={allClues} />}
    </div>
  );
};

export default App;
