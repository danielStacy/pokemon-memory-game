import React from "react";
import { modalTypes } from "../../helpers/modalTypes.js";

export default function TutorialModal({ setModalType }) {
  function onClose() {
    setModalType(modalTypes.gameStart);
  }

  return (
    <>
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <h1>Pokemon Memory Game</h1>
      <h2>How to Play</h2>
      <section>
        <p>
          In this game your aim is to collect as many Pokemon as you can.
          However,
          <em>you must only collect one of each Pokemon</em>.
        </p>
        <p>
          You will have to memorise each Pokemon you have collected, try your
          hardest to only select each Pokemon once! Simply click on a Pokemon to
          add it to your collection.
        </p>
      </section>
    </>
  );
}
