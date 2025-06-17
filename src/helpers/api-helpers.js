import { getGenerationIds } from "./card-generators.js";

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
