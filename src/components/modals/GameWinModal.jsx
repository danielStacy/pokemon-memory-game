import React from "react";
import { getGenerationIds } from "../../helpers/card-generators.js";
import { modalTypes } from "../../helpers/modalTypes.js";

export default function GameWinModal({
  setModalType,
  playerScore,
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
      <h1>You Caught them All!</h1>
      <p>
        Congratulations! you caught all {playerScore} generation {generation}{" "}
        Pokemon!
      </p>

      <div className="end-list-container">
        <ul>
          {playerDeck.map((deckId) => (
            <li key={deckId}>
              <img src={pokedex[deckId - indexOffset].sprites.front_default} />
              {pokedex[deckId - indexOffset].name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
