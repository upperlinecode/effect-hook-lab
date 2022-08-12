import Category from "../Category/Category";
import "./Board.css";

const Board = ({ categoryNumbers, updateScore, reset }) => {
  return (
    <div className="Board">
      {categoryNumbers.map((catNum) => {
        return (
          <Category reset={reset} catNum={catNum} updateScore={updateScore} />
        );
      })}
    </div>
  );
};

export default Board;
