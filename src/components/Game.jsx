import React, { useState, useEffect } from "react";
import { generateDeck } from "../helpers/card-generators.js";
import { fetchPokedex } from "../helpers/api-helpers.js";
import CardTable from "./CardTable.jsx";
import { modalTypes } from "../helpers/modalTypes.js";
import { Modal } from "./modals/Modal.jsx";

const tableSize = 10;

export default function Game({
  playerScore,
  setPlayerScore,
  highScore,
  setHighScore,
  generation,
  setGeneration,
}) {
  const [playerDeck, setPlayerDeck] = useState([]);
  const [pokedex, setPokedex] = useState([]);
  const [cardTable, setCardTable] = useState([]);
  const [modalType, setModalType] = useState(modalTypes.gameStart);
  const [endScoreDisplay, setEndScoreDisplay] = useState(0);
  const [endPlayerDeck, setEndPlayerDeck] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchAndSetPokedex() {
      setIsLoading(true);
      const pokeData = await fetchPokedex(generation);
      setPokedex(pokeData);
      setIsLoading(false);
    }
    fetchAndSetPokedex();
  }, [generation]);

  useEffect(() => {
    setCardTable(generateDeck(tableSize, playerScore, playerDeck, generation));
  }, [playerScore, playerDeck, generation]);

  function handleClick(e) {
    const id = Number(e.currentTarget.dataset.id);
    let newScore = playerScore;
    let newDeck = playerDeck;

    if (!playerDeck.includes(id)) {
      newScore = playerScore + 1;
      newDeck = [...playerDeck, id];
      if (newScore > highScore) setHighScore(newScore);
    } else {
      // triggers modal
      setEndScoreDisplay(playerScore);
      setEndPlayerDeck(playerDeck);
      setModalType(modalTypes.gameEnd);
      newScore = 0;
      newDeck = [];
      setCardTable([]);
    }

    setPlayerScore(newScore);
    setPlayerDeck(newDeck);
  }

  return (
    <>
      <Modal
        modalType={modalType}
        setModalType={setModalType}
        playerScore={endScoreDisplay}
        highScore={highScore}
        playerDeck={endPlayerDeck}
        generation={generation}
        setGeneration={setGeneration}
        pokedex={pokedex}
      />
      {isLoading ? (
        <p>Loading Pokemon...</p>
      ) : (
        <CardTable
          deckIds={cardTable}
          pokedex={pokedex}
          selectHandler={handleClick}
          generation={generation}
        />
      )}
    </>
  );
}
