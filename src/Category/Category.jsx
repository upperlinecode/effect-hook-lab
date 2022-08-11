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

  return (
    <div className="Category">
      <div className="title-card">
        <h3 className="category-title">{/* CATEGORY NAME HERE*/}</h3>
      </div>
      {/* ADD CARDS HERE */}
    </div>
  );
};

export default Category;
