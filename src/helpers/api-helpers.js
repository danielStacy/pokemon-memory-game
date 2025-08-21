import { getGenerationIds } from "./card-generators.js";
import { useEffect, useState } from "react";

async function fetchPokemonById(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const result = await fetch(url);
  return result.json();
}

export function usePokedex(generation, batchSize = 10) {
  const [pokedex, setPokedex] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const [start, end] = getGenerationIds(generation);
    const ids = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    let currentPokedex = [];

    setPokedex(currentPokedex);
    setIsLoading(true);

    (async () => {
      for (let i = 0; i < ids.length; i += batchSize) {
        const batchIds = ids.slice(
          i, i + batchSize < ids.length ? i + batchSize : ids.length
        );
        const batchResp = await Promise.all(
          batchIds.map((id) => fetchPokemonById(id))
        );
        currentPokedex = [...currentPokedex, ...batchResp];
      }

      setPokedex(currentPokedex);
      setIsLoading(false);
    })();
  }, [generation]);

  return [pokedex, isLoading];
}
