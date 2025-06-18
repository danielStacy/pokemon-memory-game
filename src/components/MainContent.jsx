// import React, { useState } from "react";
import Game from "./Game.jsx";

export default function MainContent({
  playerScore,
  setPlayerScore,
  highScore,
  setHighScore,
  generation,
  setGeneration,
}) {
  return (
    <>
      <Game
        playerScore={playerScore}
        setPlayerScore={setPlayerScore}
        highScore={highScore}
        setHighScore={setHighScore}
        generation={generation}
        setGeneration={setGeneration}
      />
    </>
  );
}
