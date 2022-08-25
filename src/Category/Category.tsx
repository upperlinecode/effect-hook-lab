import Card from "../Card/Card";
import "./Category.css";
import { Clue } from "../utils";

interface CategoryProps {
  updateScore: (scoreChange: number) => void;
  reset: boolean;
  clues: Clue[];
}

const Category = (props: CategoryProps) => {
  const { updateScore, clues } = props;

  return (
    <div className="Category">
      <div className="title-card">
        <h3 className="category-title">{clues?.[0]?.category?.title}</h3>
      </div>
      {clues.map((clue) => {
        return (
          <Card updateScore={updateScore} key={clue.id} questionData={clue} />
        );
      })}
    </div>
  );
};

export default Category;
