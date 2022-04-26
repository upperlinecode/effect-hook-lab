// import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { slice } from "../../redux/configureStore";

const NewGameButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(slice.actions.resetScore());
  };

  return (
    <div className="NewGameButton">
      <button onClick={handleClick}>New Game</button>
    </div>
  );
};

export default NewGameButton;
