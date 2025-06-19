import { getGenerationIds } from "./card-generators.js";
import { useEffect, useState } from "react";

export async function fetchPokedex(generation) {
  let pokedex = [];
  const [start, end] = getGenerationIds(generation);

  for (let id = start; id <= end; id++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const response = await fetch(url, { cache: "default" });
    pokedex.push(await response.json());
  }

  return pokedex;
}

export function usePokedex(generation) {
  const [pokedex, setPokedex] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await fetchPokedex(generation);
      setPokedex(data);
      setIsLoading(false);
    }
    fetchData();
  }, [generation]);

  return [pokedex, isLoading];
}
