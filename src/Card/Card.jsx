import { useState } from "react";
import "./Card.css";

const Card = ({ clueData: { question, value } }) => {
  const [showing, setShowing] = useState("front");
  const [clickable, setClickable] = useState(true);

  const handleClick = () => {
    clickable && setShowing("back");
    setClickable(false);
  };

  return (
    <div className="Card">
      <div
        className={`card-front ${showing === "back" ? "hidden" : ""}`}
        onClick={handleClick}
      >
        <p className="card-value">{value}</p>
      </div>
      <div className={`card-back ${showing === "front" ? "hidden" : ""}`}>
        <p className="card-question">{question}</p>
      </div>
    </div>
  );
};

export default Card;
