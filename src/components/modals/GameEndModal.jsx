import React from "react";
import { getGenerationIds } from "../../helpers/card-generators.js";
import { modalTypes } from "../../helpers/modalTypes.js";

export default function GameEndModal({
  setModalType,
  playerScore,
  highScore,
  playerDeck,
  pokedex,
  generation,
}) {
  function onClose() {
    setModalType(modalTypes.gameStart);
  }

  const [indexOffset] = getGenerationIds(generation);

  return (
    <>
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <div className="modal__text-container">
        <h1>Game Results</h1>
        <h2>Generation: {generation}</h2>
        <p>Your Score: {playerScore}!</p>
        <p>High Score: {highScore[`gen${generation}`]}</p>
      </div>
      <div className="end-list-container">
        <ul className="end-list">
          {playerDeck.map((deckId) => (
            <li className="end-list__item" key={deckId}>
              <img
                className="end-list__item__icon"
                src={pokedex[deckId - indexOffset].sprites.front_default}
              />
              {pokedex[deckId - indexOffset].name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
