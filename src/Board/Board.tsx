import { CategoryType } from "../utils";
import Category from "../Category/Category";
import "./Board.css";

const Board = (props: { categories: CategoryType; updateScore: Function }) => {
  const categoryList = props.categories
    ? Object.keys(props.categories).slice(0, 5)
    : null;
  return (
    <div className="Board">
      {categoryList &&
        categoryList.map((categoryName) => {
          const categoryCards = props.categories[categoryName];
          return (
            <Category
              updateScore={props.updateScore}
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
