import React from "react";
import { createPortal } from "react-dom";
import GameStartModal from "./GameStartModal.jsx";
import GameEndModal from "./GameEndModal.jsx";
import TutorialModal from "./TutorialModal.jsx";
import { modalTypes } from "../../helpers/modalTypes";
import "../../stylesheets/Modal.css";

export function Modal({
  modalType,
  setModalType,
  playerScore,
  highScore,
  playerDeck,
  generation,
  setGeneration,
  pokedex,
}) {
  let modalContent = null;

  switch (modalType) {
    case modalTypes.gameStart:
      modalContent = (
        <GameStartModal
          setModalType={setModalType}
          generation={generation}
          setGeneration={setGeneration}
        />
      );
      break;
    case modalTypes.gameEnd:
      modalContent = (
        <GameEndModal
          setModalType={setModalType}
          playerScore={playerScore}
          highScore={highScore}
          playerDeck={playerDeck}
          pokedex={pokedex}
          generation={generation}
        />
      );
      break;
    case modalTypes.tutorial:
      modalContent = <TutorialModal setModalType={setModalType} />;
      break;
    default:
      // modalContent remains null
      break;
  }

  return (
    modalType &&
    createPortal(
      <div className="modal-backdrop">
        <div className="modal">
          <>{modalContent}</>
        </div>
      </div>,
      document.getElementById("modal-root")
    )
  );
}
