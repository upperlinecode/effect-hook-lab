import React, { useEffect, useState } from "react";
import "./Card.css";
import { cleanAnswer } from "../utils";

const Card = ({ updateScore, questionData }) => {
  const [showing, setShowing] = useState("front");
  const [guess, setGuess] = useState("");
  const [clickable, setClickable] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    // console.log(cleanAnswer(data.answer.toLowerCase()));
    setCorrectAnswer(cleanAnswer(questionData.answer.toLowerCase()));
  }, [questionData.answer]);

  const handleClick = () => {
    clickable && setShowing("back");
  };

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // update the score based on whether the guess was correct
    const guessIsCorrect =
      cleanAnswer(guess.toLowerCase().trim()) === correctAnswer;
    const value = questionData.value ?? 100;
    const scoreToAdd = guessIsCorrect ? value : value * -1;
    updateScore(scoreToAdd);

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
        <h4 className="card-value">{questionData.value}</h4>
        <p className={`answer ${clickable ? "hidden" : ""}`}>
          Answer: {correctAnswer}
        </p>
      </div>
      <div className={`card-back ${showing === "front" ? "hidden" : ""}`}>
        <p className="card-question">{questionData.question}</p>
        <form className="answer-group">
          <input
            type="text"
            name="answer-box"
            onChange={(e) => handleChange(e)}
          />
          <input type="submit" onClick={handleSubmit} value="Guess!" />
        </form>
      </div>
    </div>
  );
};

export default Card;
