import { useEffect } from "react";
import Category from "../Category/Category";
import "./Board.css";
import { Clue } from "../utils";

import { useAppSelector, useAppDispatch } from "../Redux/hooks";
import {
  selectAllClues,
  fetchCluesByCategory,
  selectRequestStatus,
} from "../Redux/cluesSlice";

interface BoardProps {
  categoryNumbers: number[];
  updateScore: (scoreChange: number) => void;
  reset: boolean;
}

const Board = (props: BoardProps) => {
  const { categoryNumbers, updateScore, reset } = props;
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  // selector: select data from Redux state
  const allClues: Clue[][] = useAppSelector((state) => selectAllClues(state));
  const loadingState = useAppSelector((state) => selectRequestStatus(state));

  useEffect(() => {
    const getQuestions = async (categoryNumbers: number[]) => {
      // ref unwrap():
      // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-results
      try {
        await dispatch(fetchCluesByCategory(categoryNumbers)).unwrap();
      } catch (error) {
        console.error("thunk error: ", error);
      }
    };

    getQuestions(categoryNumbers);
  }, [reset, categoryNumbers, dispatch]);

  //Hover your cursor over the catNum variable to see how Typescript infers its type
  return (
    <>
      {loadingState === "pending" && <div>Loading...</div>}
      <div className="Board">
        {allClues?.map((clues: Clue[], i: number) => {
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
