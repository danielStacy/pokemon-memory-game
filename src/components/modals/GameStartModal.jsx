import React, { useState } from "react";
import { modalTypes } from "../../helpers/modalTypes.js";

export default function GameStartModal({
  setModalType,
  setGeneration,
  generation,
}) {
  const [selected, setSelected] = useState(generation);

  function onGenerationSubmit(e) {
    e.preventDefault();
    setGeneration(Number(selected));
    setModalType(null);
  }

  function onSelectTutorial() {
    setModalType(modalTypes.tutorial);
  }

  return (
    <>
      <div class="game-start-modal modal__text-container">
        <h1>Pokemon Memory Game</h1>
        <button className="button tutorial-button" onClick={onSelectTutorial}>
          How to Play
        </button>
      </div>
      <div className="game-start-modal modal__form-container">
        <form className="select-generation" onSubmit={onGenerationSubmit}>
          <label>
            Pokemon Generation:
            <br />
            <select
              name="generation"
              value={selected}
              onChange={(e) => {
                setSelected(e.target.value);
              }}
            >
              <option value={1}>Gen 1 (Bulbasaur, Charmander, Squirtle)</option>
              <option value={2}>Gen 2 (Chikorita, Cyndaquil, Totodile)</option>
              <option value={3}>Gen 3 (Treecko, Torchic, Mudkip)</option>
              <option value={4}>Gen 4 (Turtwig, Chimchar, Piplup)</option>
              <option value={5}>Gen 5 (Snivy, Tepig, Oshawott)</option>
              <option value={6}>Gen 6 (Chespin, Fennekin, Froakie)</option>
              <option value={7}>Gen 7 (Rowlet, Litten, Popplio)</option>
              <option value={8}>Gen 8 (Grookey, Scorbunny, Sobble)</option>
              <option value={9}>Gen 9 (Sprigatito, Fuecoco, and Quaxly)</option>
            </select>
          </label>
          <button type="submit">Play Now!</button>
        </form>
      </div>
    </>
  );
}
