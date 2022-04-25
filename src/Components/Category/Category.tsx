import { CardType } from "../../utils";
import Card from "../Card/Card";
import "./Category.css";

const Category = (props: { name: string; cards: CardType[] }) => {
  return (
    <div className="Category">
      <div className="title-card">
        <h3 className="category-title">{props.name}</h3>
      </div>
      {props.cards.map((card) => {
        return <Card key={card.id} data={card} />;
      })}
    </div>
  );
};

export default Category;
