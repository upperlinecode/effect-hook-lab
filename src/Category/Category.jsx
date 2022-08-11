// import Card from "../Card/Card";
import { useState } from "react";
import { useEffect } from "react";
import "./Category.css";

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
