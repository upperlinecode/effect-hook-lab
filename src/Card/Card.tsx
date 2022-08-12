import { ChangeEvent, useEffect, useState } from "react";
import "./Card.css";
import { cleanAnswer, Clue } from "../utils";

interface CardProps {
  updateScore: (scoreChange: number) => void;
  questionData: Clue;
}

const Card = (props: CardProps) => {
  const { updateScore, questionData } = props;
  const [showing, setShowing] = useState<string>("front");
  const [guess, setGuess] = useState<string>("");
  const [clickable, setClickable] = useState<boolean>(true);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  useEffect(() => {
    // console.log(cleanAnswer(data.answer.toLowerCase()));
    setCorrectAnswer(cleanAnswer(questionData.answer.toLowerCase()));
  }, [questionData.answer]);

  const handleClick = () => {
    clickable && setShowing("back");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
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
        <form className="answer-group" onSubmit={handleSubmit}>
          <input
            type="text"
            name="answer-box"
            onChange={(e) => handleChange(e)}
          />
          <input type="submit" value="Guess!" />
        </form>
      </div>
    </div>
  );
};

export default Card;
