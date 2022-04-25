// import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetScore } from "../../redux/actions";

const NewGameButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetScore());
  };

  return (
    <div className="NewGameButton">
      <button onClick={handleClick}>New Game</button>
    </div>
  );
};

export default NewGameButton;
