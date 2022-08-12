<<<<<<< HEAD
// import Card from "../Card/Card";
import { useState } from "react";
import { useEffect } from "react";
import "./Category.css";

const catNames = {
  74: "Animals",
  115: "Science",
  268: "Stupid Answers",
  217: "3-letter Words",
  783: "Mythology",
};

const Category = (props) => {
  const [clues, setClues] = useState([]);

  useEffect(() => {}, []);
=======
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
>>>>>>> 7758ea4fddd6ffc7fbadbf151946b23022c3574c

  return (
    <div className="Category">
      <div className="title-card">
<<<<<<< HEAD
        <h3 className="category-title">{/* CATEGORY NAME HERE*/}</h3>
      </div>
      {/* ADD CARDS HERE */}
=======
        <h3 className="category-title">{categoryName}</h3>
      </div>
      {clues.map((clue) => {
        return (
          <Card updateScore={updateScore} key={clue.id} questionData={clue} />
        );
      })}
>>>>>>> 7758ea4fddd6ffc7fbadbf151946b23022c3574c
    </div>
  );
};

export default Category;
