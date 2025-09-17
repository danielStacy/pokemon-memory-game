import Card from "./Card.jsx";
import "../stylesheets/CardTable.css";

export default function CardTable({ generation, deck, pokedex, selectHandler }) {
  return (
    <div className="card-table">
      {deck.map((id) => {
        const pokemon = pokedex.find((p) => p.id === Number(id));
        return (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            img={pokemon.sprites.front_default}
            type={pokemon.types[0].type.name}
            selectHandler={selectHandler}
          />
        );
      })}
    </div>
  );
}
