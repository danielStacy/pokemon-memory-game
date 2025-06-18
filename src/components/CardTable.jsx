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
        (deckId, idx) =>
          pokedex[deckId - indexOffset] && (
            <Card
              // Index keys not a problem in THIS context, we won't be needing
              // to manipulate the array in any way.
              key={idx}
              // key={crypto.randomUUID()}
              id={Number(deckId)}
              name={pokedex[deckId - indexOffset].name}
              img={pokedex[deckId - indexOffset].sprites.front_default}
              selectHandler={selectHandler}
            />
          )
      )}
    </div>
  );
}
