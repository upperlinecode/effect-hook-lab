import Card from "../Card/Card";
import "./Category.css";

const Category = ({ categoryClues }) => {
  const categoryName = "CATEGORY NAME"; // Replace this with some logic
  return (
    <div className="Category">
      <div className="title-card">
        <h3 className="category-title">{categoryName}</h3>
      </div>
      RENDER CARDS HERE
    </div>
  );
};

export default Category;
