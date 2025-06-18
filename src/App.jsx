import React, { useState } from "react";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import "./stylesheets/App.css";

export default function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [generation, setGeneration] = useState(1);

  return (
    <>
      <Header
        playerScore={playerScore}
        highScore={highScore}
        generation={generation}
      />
      <MainContent
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
