import { CategoryType } from "../../utils";
import Category from "../Category/Category";
import "./Board.css";

const Board = (props: { categories: CategoryType }) => {
  const categoryList = Object.keys(props.categories).slice(0, 5);
  return (
    <div className="Board">
      {categoryList.map((categoryName) => {
        const categoryCards = props.categories[categoryName];
        return (
          <Category
            key={categoryName}
            name={categoryName}
            cards={categoryCards}
          />
        );
      })}
    </div>
  );
};

export default Board;
