import React from "react";

export default function Header({ playerScore, highScore, generation }) {
  return (
    <div className="header">
      <h1>Pokemon Memory Game</h1>
      <p>Currently Playing: Generation: {generation}</p>
      <div className="scoreboard">
        <p>Current Score: {playerScore}</p>
        <p>High Score: {highScore}</p>
      </div>
    </div>
  );
}
