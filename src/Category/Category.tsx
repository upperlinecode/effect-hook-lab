import { useEffect, useState } from "react";
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
  const [clues, setClues] = useState<Clue[]>([]);
  const [categoryName, setCategoryName] = useState<string>("Cat");

  useEffect(() => {
    const getQuestions = async (categoryNumber: number) => {
      const endpoint =
        `https://jservice.io/api/clues?category=${categoryNumber}`;
      const response = await fetch(endpoint);
      const newQuestions: Clue[] = await response.json();

      // Access the category name and update state accordingly.
      setCategoryName(newQuestions[0].category.title);

      // Use the helper function to get an array of five clues in ascending value order.
      const topFiveQuestions = getFiveClues(newQuestions);
      setClues(topFiveQuestions);
    };

    getQuestions(catNum);
  }, [reset, catNum]);

  return (
    <div className="Category">
      <div className="title-card">
        <h3 className="category-title">{categoryName}</h3>
      </div>
      {clues.map((clue) => {
        return (
          <Card updateScore={updateScore} key={clue.id} questionData={clue} />
        );
      })}
    </div>
  );
};

export default Category;
