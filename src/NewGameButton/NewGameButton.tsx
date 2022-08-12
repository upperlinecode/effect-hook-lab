// import React, { useState } from "react";

interface NewGameButtonProps {
  clickHandler: () => boolean;
}

export default function NewGameButton(props: NewGameButtonProps) {
  const { clickHandler } = props;
  return (
    <div className="NewGameButton">
      <button onClick={() => clickHandler()}>New Game</button>
    </div>
  );
}
