import Category from "../Category/Category";
import "./Board.css";

interface BoardProps {
  categoryNumbers: number[];
  updateScore: (scoreChange: number) => void;
  reset: boolean;  
}

const Board = (props: BoardProps) => {
  const { categoryNumbers, updateScore, reset } = props;
  //Hover your cursor over the catNum variable to see how Typescript infers its type
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
