import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Game from "./components/Game.jsx";
import { getHighScores } from "./helpers/local-storage-utils.js";
import "./stylesheets/App.css";

export default function App() {
  const [generation, setGeneration] = useState(1);
  const [playerScore, setPlayerScore] = useState(0);
  const [highScore, setHighScore] = useState(getHighScores());

  return (
    <>
      <Header
        playerScore={playerScore}
        highScore={highScore}
        generation={generation}
      />
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
