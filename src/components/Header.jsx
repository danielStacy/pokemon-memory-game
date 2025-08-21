import React from "react";
import "../stylesheets/Header.css";

export default function Header({ playerScore, highScore, generation }) {
  return (
    <div className="header">
      <h1>Pokemon Memory Game</h1>
      <p>Currently Playing: Generation {generation}</p>
      <div className="scoreboard">
        <p>Current Score: {playerScore}</p>
        <p>High Score: {highScore[`gen${generation}`]}</p>
      </div>
    </div>
  );
}
