import React, { useEffect, useState } from "react";
import "./Card.css";
import { CardType, cleanAnswer } from "../utils";
import {
  CardFace,
  CardRoot,
  CardValue,
  CardQuestion,
  Answer,
  AnswerGroup,
} from "./Card.styles";

export interface CardProps {
  data: CardType;
  updateScore: Function;
}

const Card = (props: CardProps) => {
  const [showing, setShowing] = useState<"front" | "back">("front");
  const [guess, setGuess] = useState("");
  const [clickable, setClickable] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    console.log(cleanAnswer(props.data.answer.toLowerCase()));
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
    const value = props.data.value ? parseInt(props.data.value) : 0;
    const scoreToAdd = guessIsCorrect ? value : value * -1;
    props.updateScore(scoreToAdd);

    // turn the card back to the front and make it not clickable
    setShowing("front");
    setClickable(false);
  };

  return (
    <CardRoot>
      <CardFace
        className={showing === "back" ? "hidden" : ""}
        onClick={handleClick}
        style={{ color: clickable ? "" : "white" }}
      >
        <CardValue>{props.data.value}</CardValue>
        <Answer className={clickable ? "hidden" : ""}>
          Answer: {correctAnswer}
        </Answer>
      </CardFace>
      <CardFace className={showing === "front" ? "hidden" : ""}>
        <CardQuestion>{props.data.question}</CardQuestion>
        <AnswerGroup>
          <input
            type="text"
            name="answer-box"
            onChange={(e) => handleChange(e)}
          />
          <button onClick={() => handleSubmit()}>Guess!</button>
        </AnswerGroup>
      </CardFace>
    </CardRoot>
  );
};

export default Card;
