import Card from "./Card.jsx";
import { getGenerationIds } from "../helpers/card-generators.js";
import "../stylesheets/CardTable.css";

export default function CardTable({
  deckIds,
  pokedex,
  selectHandler,
  generation,
}) {
  const [indexOffset] = getGenerationIds(generation);

  return (
    <div className="table">
      {deckIds.map(
        (deckId) =>
          pokedex[deckId - indexOffset] && (
            <Card
              key={crypto.randomUUID()}
              id={deckId}
              name={pokedex[deckId - indexOffset].name}
              img={pokedex[deckId - indexOffset].sprites.front_default}
              selectHandler={selectHandler}
            />
          )
      )}
    </div>
  );
}
