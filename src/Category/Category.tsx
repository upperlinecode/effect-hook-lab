/*
ref unwrap():
https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-results
*/

import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../Redux/hooks";
import {
  selectCluesByCategory,
  fetchQuestionsByCategory,
  selectRequestStatus,
} from "../Redux/questionsSlice";

import Card from "../Card/Card";
import "./Category.css";
import { Clue } from "../utils";

interface CategoryProps {
  catNum: number;
  updateScore: (scoreChange: number) => void;
  reset: boolean;
}

const Category = (props: CategoryProps) => {
  const { catNum, reset, updateScore } = props;
  const dispatch = useAppDispatch();

  // selector: select data from state
  const reduxClues: Clue[] = useAppSelector((state) =>
    selectCluesByCategory(state, catNum)
  );

  const loadingState = useAppSelector((state) => selectRequestStatus(state));

  useEffect(() => {
    const getQuestions = async (categoryNumber: number) => {
      if (categoryNumber) {
        try {
          await dispatch(fetchQuestionsByCategory(categoryNumber)).unwrap();
        } catch (error) {
          console.error("thunk error: ", error);
        }
      }
    };

    getQuestions(catNum);
  }, [reset, catNum, dispatch]);

  return (
    <div className="Category">
      <div className="title-card">
        <h3 className="category-title">
          {loadingState !== "pending"
            ? reduxClues?.[0]?.category?.title
            : "Loading..."}
        </h3>
      </div>
      {reduxClues?.map((clue) => {
        return (
          <Card updateScore={updateScore} key={clue.id} questionData={clue} />
        );
      })}
    </div>
  );
};

export default Category;
