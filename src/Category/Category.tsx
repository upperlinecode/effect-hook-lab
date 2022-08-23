import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../Redux/hooks";
import {
  selectCluesByCategory,
  setQuestionsByCategory,
} from "../Redux/questionsSlice";

import Card from "../Card/Card";
import "./Category.css";
import { Clue, getFiveClues } from "../utils";

interface CategoryProps {
  catNum: number;
  updateScore: (scoreChange: number) => void;
  reset: boolean;
}

const Category = (props: CategoryProps) => {
  const { catNum, reset, updateScore } = props;
  const [categoryName, setCategoryName] = useState<string>("Cat");
  const dispatch = useAppDispatch();

  // selector: select data from state
  const reduxClues: Clue[] = useAppSelector((state) =>
    selectCluesByCategory(state, catNum)
  );

  useEffect(() => {
    const getQuestions = async (categoryNumber: number) => {
      const endpoint = `https://jservice.io/api/clues?category=${categoryNumber}`;
      const response = await fetch(endpoint);
      const newQuestions: Clue[] = await response.json();

      // Access the category name and update state accordingly.
      setCategoryName(newQuestions[0].category.title);

      // Use the helper function to get an array of five clues in ascending value order.
      const topFiveQuestions = getFiveClues(newQuestions);

      // dispatch the action/reducer
      dispatch(setQuestionsByCategory({ categoryNumber, topFiveQuestions }));
    };

    getQuestions(catNum);
  }, [reset, catNum, dispatch]);

  return (
    <div className="Category">
      <div className="title-card">
        <h3 className="category-title">{categoryName}</h3>
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
