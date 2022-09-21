import Card from "../Card/Card";
import "./Category.css";

const Category = ({ categoryClues }) => {
  const categoryName = categoryClues[0].category.title;
  return (
    <div className="Category">
      <div className="title-card">
        <h3 className="category-title">{categoryName}</h3>
      </div>
      {categoryClues.map((clueData, i) => (
        <Card clueData={clueData} key={i} />
      ))}
    </div>
  );
};

export default Category;
