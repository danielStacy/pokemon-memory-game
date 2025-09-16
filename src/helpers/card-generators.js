import range from "lodash/range.js";

const gen1Start = 1,   gen1End = 151;
const gen2Start = 152, gen2End = 251;
const gen3Start = 252, gen3End = 386;
const gen4Start = 387, gen4End = 493;
const gen5Start = 494, gen5End = 649;
const gen6Start = 650, gen6End = 721;
const gen7Start = 722, gen7End = 809;
const gen8Start = 810, gen8End = 905;
const gen9Start = 906, gen9End = 1010;

// --- helpers ---
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function sampleUnique(drawFrom, count, exclude = []) {
  // drawFrom/exclude are arrays of numbers (ids)
  const excludeSet = new Set(exclude);
  const pool = drawFrom.filter((id) => !excludeSet.has(id));
  const out = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = getRandomInt(0, pool.length - 1);
    out.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return out;
}

// If availableIds is omitted, we fall back to the full generation range (old behavior).
export function generateDeck(
  deckSize,
  playerScore,
  playerDeck,
  generation = 1,
  availableIds // array of loaded IDs (e.g. pokedex.map(p => p.id))
) {
  const [min, max] = getGenerationIds(generation);
  const fullGenIds = range(min, max + 1);

  // pick source = availableIds if provided, otherwise full generation
  const sourceIds = Array.isArray(availableIds) && availableIds.length > 0
    ? availableIds
    : fullGenIds;

  // Ensure playerDeck is a subset of sourceIds (just in case)
  const sourceSet = new Set(sourceIds);
  const sanitizedPlayerDeck = playerDeck.filter((id) => sourceSet.has(id));

  let build;
  if (playerScore === 0) {
    build = () => generateFirstDeck(deckSize, sourceIds);
  } else if (playerScore < deckSize) {
    build = () =>
      generateLowScoreDeck(deckSize, sourceIds, playerScore, sanitizedPlayerDeck);
  } else {
    build = () =>
      generateHighScoreDeck(deckSize, sourceIds, sanitizedPlayerDeck);
  }

  return shuffleDeck(build());
}

function generateFirstDeck(deckSize, sourceIds) {
  // First hand: all random, but only from available IDs
  return sampleUnique(sourceIds, deckSize);
}

function generateLowScoreDeck(deckSize, sourceIds, playerScore, playerDeck) {
  if (playerScore >= deckSize) {
    throw new Error(
      `generateLowScoreDeck should not be called when player score (${playerScore}) equals deck size (${deckSize})`
    );
  }

  // Keep mostly repeats early on; taper a bit after score > 5
  const nRepeatCards =
    playerScore > 5 ? Math.max(0, playerDeck.length - getRandomInt(0, 2))
                    : playerDeck.length;

  const repeatCardsDeck = sampleUnique(playerDeck, nRepeatCards);
  const nCardsLeft = Math.max(0, deckSize - repeatCardsDeck.length);

  // New cards come only from available IDs not in playerDeck
  const restOfDeck = sampleUnique(sourceIds, nCardsLeft, playerDeck);

  return [...repeatCardsDeck, ...restOfDeck];
}

function generateHighScoreDeck(deckSize, sourceIds, playerDeck) {
  // Late game: mostly repeats, add 1–3 new if available
  const totalAvailable = sourceIds.length;
  const ownedSet = new Set(playerDeck);
  const newPool = sourceIds.filter((id) => !ownedSet.has(id));
  const cardsLeftInPool = newPool.length;

  if (cardsLeftInPool === 0) return sampleUnique(playerDeck, Math.min(deckSize, playerDeck.length));

  const nNewCards = cardsLeftInPool <= 3 ? cardsLeftInPool : getRandomInt(1, 3);
  const nRepeatCards = Math.max(0, deckSize - nNewCards);

  const repeatCardsDeck = sampleUnique(playerDeck, nRepeatCards);
  const restOfDeck = sampleUnique(newPool, nNewCards);

  return [...repeatCardsDeck, ...restOfDeck];
}

export function getGenerationIds(generation) {
  switch (generation) {
    case 1: return [gen1Start, gen1End];
    case 2: return [gen2Start, gen2End];
    case 3: return [gen3Start, gen3End];
    case 4: return [gen4Start, gen4End];
    case 5: return [gen5Start, gen5End];
    case 6: return [gen6Start, gen6End];
    case 7: return [gen7Start, gen7End];
    case 8: return [gen8Start, gen8End];
    case 9: return [gen9Start, gen9End];
    default:
      throw new Error(`${generation} is not a valid generation.`);
  }
}
