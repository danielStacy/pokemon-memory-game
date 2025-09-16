import { getGenerationIds } from "./card-generators.js";
import { useEffect, useState, useRef } from "react";

async function fetchPokemonById(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const result = await fetch(url);
  if (!result.ok) throw new Error(`Failed to fetch Pokemon ${id}: ${result.status}`);
  return result.json();
}

export function usePokedex(
  generation, 
  initialBatchSize, 
  batchSize,
  playerScore
) {
  const [pokedex, setPokedex] = useState([]);
  const [range, setRange] = useState(null);
  const [nextId, setNextId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // initial load or when changing generation
  useEffect(() => {
    const [start, end] = getGenerationIds(generation);
    setIsLoading(true);
    setRange([start, end]);
    setPokedex([]);

    (async () => {
      const lastId = start + initialBatchSize - 1;
      const ids = Array.from({ length: lastId - start + 1 }, (_, i) => start + i);
      const batch = await Promise.all(ids.map((id) => fetchPokemonById(id)));
      setPokedex(batch);
      setNextId(lastId + 1);
      setIsLoading(false);
    })();
  }, [generation, initialBatchSize]);

  const prevScore = useRef(playerScore);
  useEffect(() => {
    if (playerScore === 0) return;
    
    const [start, end] = range;
    if (playerScore > prevScore.current && nextId != null && nextId <= end) {
      setIsLoading(true);
      const count = Math.min(batchSize, end - nextId + 1);
      const ids = Array.from({ length: count }, (_, i) => nextId + i);
      (async () => {
        const batch = await Promise.all(ids.map(fetchPokemonById));
        setPokedex((p) => [...p, ...batch]);
        setNextId(prev => prev + count);
        setIsLoading(false);
      })();
    }
    prevScore.current = playerScore;
  }, [playerScore]);

  return [pokedex, isLoading];
}
