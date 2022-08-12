import { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Category.css";
import { getFiveClues } from "../utils";

const Category = ({ catNum, reset, updateScore }) => {
  const [clues, setClues] = useState([]);
  const [categoryName, setCategoryName] = useState("Cat");

  useEffect(() => {
    const getQuestions = async (categoryNumber) => {
      const endpoint =
        "https://jservice.io/api/clues?category=" + String(categoryNumber);
      const response = await fetch(endpoint);
      const newQuestions = await response.json();

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
