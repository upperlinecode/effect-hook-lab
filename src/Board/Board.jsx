<<<<<<< HEAD
// import Category from "../Category/Category";
import "./Board.css";

const Board = (props) => {
  return <div className="Board"></div>;
=======
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
>>>>>>> 7758ea4fddd6ffc7fbadbf151946b23022c3574c
};

export default Board;
