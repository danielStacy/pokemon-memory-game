import React, { useState, useEffect } from "react";
import CardTable from "./CardTable.jsx";
import Modal from "./modals/Modal.jsx";
import { generateDeck } from "../helpers/card-generators.js";
import { fetchPokedex } from "../helpers/api-helpers.js";
import { modalTypes } from "../helpers/modalTypes.js";
import { setHighScores } from "../helpers/local-storage-utils.js";

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
  const [tableDeck, setTableDeck] = useState([]);
  const [modalType, setModalType] = useState(modalTypes.gameStart);
  const [endScoreDisplay, setEndScoreDisplay] = useState(0);
  const [endPlayerDeck, setEndPlayerDeck] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    const newDeck = generateDeck(
      tableSize,
      playerScore,
      playerDeck,
      generation
    );
    setTableDeck(newDeck);
    // might need to check !isLoading
    if (newDeck.length === 0) setModalType(modalTypes.gameWin);
  }, [playerScore, playerDeck, generation]);

  function handleClick(e) {
    const id = Number(e.currentTarget.dataset.id);
    let newScore = playerScore;
    let newDeck = playerDeck;

    // if selected correctly:
    if (!playerDeck.includes(id)) {
      newScore = playerScore + 1;
      newDeck = [...playerDeck, id];
      if (newScore > highScore[`gen${generation}`]) {
        const newHighScore = { ...highScore, [`gen${generation}`]: newScore };
        setHighScores(newHighScore);
        setHighScore(newHighScore);
      }
    } else {
      setEndScoreDisplay(playerScore);
      setEndPlayerDeck(playerDeck);
      setModalType(modalTypes.gameEnd);
      newScore = 0;
      newDeck = [];
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
          deckIds={tableDeck}
          pokedex={pokedex}
          selectHandler={handleClick}
          generation={generation}
        />
      )}
    </>
  );
}
