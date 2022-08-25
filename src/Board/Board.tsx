import { useEffect, useState } from "react";
import Category from "../Category/Category";
import "./Board.css";
import { Clue, getFiveClues } from "../utils";

import { useAppSelector, useAppDispatch } from "../Redux/hooks";
import { selectCluesByCategory, setAllClues } from "../Redux/questionsSlice";

interface BoardProps {
  categoryNumbers: number[];
  updateScore: (scoreChange: number) => void;
  reset: boolean;
}

const Board = (props: BoardProps) => {
  const { categoryNumbers, updateScore, reset } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  // selector: select data from state
  const cluesByCategory: Clue[][] = useAppSelector((state) =>
    selectCluesByCategory(state)
  );

  useEffect(() => {
    const getQuestions = async (categoryNumbers: number[]) => {
      setIsLoading(true);

      // SO ref on Promise.all with fetch
      // https://stackoverflow.com/questions/31710768/how-can-i-fetch-an-array-of-urls-with-promise-all

      // MDN Promise.all
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

      // Basically we should use Promise.all if we are using an array of Promises
      // and need to await for all of them to resolve.
      //
      // Promise.all keeps the passed in array order regardless of when each
      // promise resolves.

      const responses = categoryNumbers.map(async (catId) => {
        const response = await fetch(
          `https://jservice.io/api/clues?category=${catId}`
        );

        const newQuestions: Clue[] = await response.json();
        const topFiveQuestions = getFiveClues(newQuestions);
        return topFiveQuestions;
      });

      const allQuestions = await Promise.all(responses);

      // setCluesByCategory(allQuestions);

      // dispatch the action/reducer
      dispatch(setAllClues(allQuestions));
      setIsLoading(false);
    };

    getQuestions(categoryNumbers);
  }, [reset, categoryNumbers, dispatch]);

  //Hover your cursor over the catNum variable to see how Typescript infers its type
  return (
    <>
      {isLoading && <div>Loading...</div>}
      <div className="Board">
        {cluesByCategory?.map((clues: Clue[], i: number) => {
          return (
            <Category
              reset={reset}
              updateScore={updateScore}
              key={i}
              clues={clues}
            />
          );
        })}
      </div>
    </>
  );
};

export default Board;
