import React, { useState, useEffect } from "react";
import CardTable from "./CardTable.jsx";
import Modal from "./modals/Modal.jsx";
import { modalTypes } from "../helpers/modalTypes.js";
import { generateDeck } from "../helpers/card-generators.js";
import { usePokedex } from "../helpers/api-helpers.js";
import { handleCardClick } from "../helpers/game-utils.js";

const tableSize = 12;
const nextLoadSize = 3;

export default function Game({
  playerScore,
  setPlayerScore,
  highScore,
  setHighScore,
  generation,
  setGeneration,
}) {
  const [playerDeck, setPlayerDeck] = useState([]);
  const [tableDeck, setTableDeck] = useState([]);
  const [modalType, setModalType] = useState(modalTypes.gameStart);
  const [endScoreDisplay, setEndScoreDisplay] = useState(0);
  const [endPlayerDeck, setEndPlayerDeck] = useState([]);
  const [pokedex, isLoading] = usePokedex(generation, tableSize, nextLoadSize, playerScore);

  useEffect(() => {
    setTableDeck([]);
    setPlayerDeck([]);
    setPlayerScore(0);
  }, [generation]);

  useEffect(() => {
    if (isLoading) return;
    const availableIds = pokedex.map(p => p.id);

    const newDeck = generateDeck(
      tableSize,
      playerScore,
      playerDeck,
      generation,
      availableIds 
    );

    setTableDeck(newDeck);
    if (newDeck.length === 0) {
      setEndScoreDisplay(playerScore);
      setModalType(modalTypes.gameWin);
    }
  }, [pokedex, playerScore, playerDeck]);

  function handleClick(e) {
    const id = Number(e.currentTarget.dataset.id);
    handleCardClick({
      id,
      playerDeck,
      playerScore,
      highScore,
      generation,
      setPlayerDeck,
      setPlayerScore,
      setHighScore,
      setModalType,
      setEndScoreDisplay,
      setEndPlayerDeck,
    });
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
          generation={generation}
          deck={tableDeck}
          pokedex={pokedex}
          selectHandler={handleClick}
        />
      )}
    </>
  );
}
