import Category from "../Category/Category";
import "./Board.css";

const Board = ({ allClues }) => {
  return (
    <div className="Board">
      {allClues.map((categoryClues, i) => (
        <Category categoryClues={categoryClues} key={i} />
      ))}
    </div>
  );
};

export default Board;
