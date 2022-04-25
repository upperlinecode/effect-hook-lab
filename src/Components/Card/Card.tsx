import React, { useEffect, useState } from "react";
import "./Card.css";
import { CardType, cleanAnswer } from "../../utils";
import { useDispatch } from "react-redux";
import { increaseScore } from "../../redux/actions";

const Card = (props: { data: CardType }) => {
  const [showing, setShowing] = useState<"front" | "back">("front");
  const [guess, setGuess] = useState("");
  const [clickable, setClickable] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(cleanAnswer(props.data.answer.toLowerCase()));
    setCorrectAnswer(cleanAnswer(props.data.answer.toLowerCase()));
  }, [props.data.answer]);

  const handleClick = () => {
    clickable && setShowing("back");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };

  const handleSubmit = () => {
    // update the score based on whether the guess was correct
    const guessIsCorrect =
      cleanAnswer(guess.toLowerCase().trim()) === correctAnswer;
    const value = props.data.value ?? 100;
    // ===== Let's refactor this to redux ====
    // const scoreToAdd = guessIsCorrect ? value : value * -1;
    // props.updateScore(scoreToAdd);
    // ===== Redux Refactor ========
    if (guessIsCorrect) {
      dispatch(increaseScore(value));
    } else {
      dispatch({
        type: "DECREASE_SCORE",
        payload: value,
      });
    }

    // turn the card back to the front and make it not clickable
    setShowing("front");
    setClickable(false);
  };

  return (
    <div className="Card">
      <div
        className={`card-front ${showing === "back" ? "hidden" : ""}`}
        onClick={handleClick}
        style={{ color: clickable ? "" : "white" }}
      >
        <h4 className="card-value">{props.data.value}</h4>
        <p className={`answer ${clickable ? "hidden" : ""}`}>
          Answer: {correctAnswer}
        </p>
      </div>
      <div className={`card-back ${showing === "front" ? "hidden" : ""}`}>
        <p className="card-question">{props.data.question}</p>
        <div className="answer-group">
          <input
            type="text"
            name="answer-box"
            onChange={(e) => handleChange(e)}
          />
          <button onClick={() => handleSubmit()}>Guess!</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
