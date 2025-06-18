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
}) {
  const [playerDeck, setPlayerDeck] = useState([]);
  const [pokeGeneration, setPokeGeneration] = useState(1);
  const [pokedex, setPokedex] = useState([]);
  const [cardTable, setCardTable] = useState(
    generateDeck(tableSize, playerScore, playerDeck, pokeGeneration)
  );
  const [modalType, setModalType] = useState(modalTypes.gameStart);
  const [endScoreDisplay, setEndScoreDisplay] = useState(0);
  const [endPlayerDeck, setEndPlayerDeck] = useState([]);

  useEffect(() => {
    async function fetchAndSetPokedex() {
      const data = await fetchPokedex(pokeGeneration);
      setPokedex(data);
    }
    fetchAndSetPokedex();
  }, [pokeGeneration]);

  // useEffect(() => {
  //   setCardTable(generateDeck(tableSize, 0, [], pokeGeneration));
  // }, [pokeGeneration]);

  useEffect(() => {
    setCardTable(
      generateDeck(tableSize, playerScore, playerDeck, pokeGeneration)
    );
  }, [playerScore, playerDeck, pokeGeneration]);

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
    }

    setPlayerScore(newScore);
    setPlayerDeck(newDeck);
    // setCardTable(generateDeck(tableSize, newScore, newDeck, pokeGeneration));
  }

  return (
    <>
      <Modal
        modalType={modalType}
        setModalType={setModalType}
        playerScore={endScoreDisplay}
        highScore={highScore}
        playerDeck={endPlayerDeck}
        generation={pokeGeneration}
        setGeneration={setPokeGeneration}
        pokedex={pokedex}
      />
      <CardTable
        deckIds={cardTable}
        pokedex={pokedex}
        selectHandler={handleClick}
        generation={pokeGeneration}
      />
    </>
  );
}
