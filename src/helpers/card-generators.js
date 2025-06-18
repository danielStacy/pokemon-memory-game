import range from "lodash/range.js";

const gen1Start = 1,
  gen1End = 151;
const gen2Start = 152,
  gen2End = 251;
const gen3Start = 252,
  gen3End = 386;
const gen4Start = 387,
  gen4End = 493;
const gen5Start = 494,
  gen5End = 649;
const gen6Start = 650,
  gen6End = 721;
const gen7Start = 722,
  gen7End = 809;
const gen8Start = 810,
  gen8End = 905;
const gen9Start = 906,
  gen9End = 1010;
// End of pokemon Ids as of Scarlet/Violet

export function generateDeck(
  deckSize,
  playerScore,
  playerDeck,
  generation = 1
) {
  const [min, max] = getGenerationIds(generation);
  let cardGeneratorFn;
  if (playerScore === 0) {
    cardGeneratorFn = () => generateFirstDeck(deckSize, min, max);
  } else if (playerScore < deckSize) {
    cardGeneratorFn = () =>
      generateLowScoreDeck(deckSize, min, max, playerScore, playerDeck);
  } else {
    cardGeneratorFn = () =>
      generateHighScoreDeck(deckSize, min, max, playerDeck);
  }

  return shuffleDeck(cardGeneratorFn());
}

/**
 * Get a random integer. Approx uniformly distributed.
 * @param {number} min Minimum possible value, inclusive.
 * @param {number} max Maximum possible value, inclusive.
 * @returns {number} Random integer between min and max inclusive.
 */
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max) + 1;
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function shuffleDeck(deck) {
  // knuth shuffle (Fisher-Yates)
  let shuffled = [...deck];
  let currentIndex = shuffled.length;

  while (currentIndex > 0) {
    let randIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // Do the swap
    [shuffled[currentIndex], shuffled[randIndex]] = [
      shuffled[randIndex],
      shuffled[currentIndex],
    ];
  }

  return shuffled;
}

function getRandomUniqueDeck(randomDeckSize, drawFrom, excludeValues = []) {
  let drawFromExcluded = [
    ...new Set(drawFrom).difference(new Set(excludeValues)),
  ];
  let randomDeck = [];

  for (let i = 0; i < randomDeckSize && drawFromExcluded.length > 0; i++) {
    const randIndex = getRandomInt(0, drawFromExcluded.length - 1);
    randomDeck.push(drawFromExcluded[randIndex]);
    drawFromExcluded.splice(randIndex, 1);
  }

  return randomDeck;
}

function generateFirstDeck(deckSize, minId, maxId) {
  return getRandomUniqueDeck(deckSize, range(minId, maxId + 1));
}

function generateLowScoreDeck(deckSize, minId, maxId, playerScore, playerDeck) {
  if (playerScore >= deckSize)
    throw new Error(
      `generateLowScoreDeck should not be called when player score (${playerScore}) equals deck size (${deckSize})`
    );
  const nRepeatCards =
    playerScore > 5
      ? playerDeck.length - getRandomInt(0, 2)
      : playerDeck.length;
  const repeatCardsDeck = getRandomUniqueDeck(nRepeatCards, playerDeck);
  const nCardsLeft = deckSize - nRepeatCards;
  const restOfDeck = getRandomUniqueDeck(
    nCardsLeft,
    range(minId, maxId + 1),
    playerDeck
  );

  return [...repeatCardsDeck, ...restOfDeck];
}

function generateHighScoreDeck(deckSize, minId, maxId, playerDeck) {
  const nNewCards = getRandomInt(1, 3);
  const nRepeatCards = deckSize - nNewCards;
  const repeatCardsDeck = getRandomUniqueDeck(nRepeatCards, playerDeck);
  const restOfDeck = getRandomUniqueDeck(
    nNewCards,
    range(minId, maxId + 1),
    playerDeck
  );

  const checkSize = new Set([...repeatCardsDeck, ...restOfDeck]).size;
  if (checkSize !== deckSize) {
    throw new Error(
      `Generated deck of size ${checkSize}. Deck should be of size ${deckSize}`
    );
  }

  return [...repeatCardsDeck, ...restOfDeck];
}

export function getGenerationIds(generation) {
  switch (generation) {
    case 1:
      return [gen1Start, gen1End];
    case 2:
      return [gen2Start, gen2End];
    case 3:
      return [gen3Start, gen3End];
    case 4:
      return [gen4Start, gen4End];
    case 5:
      return [gen5Start, gen5End];
    case 6:
      return [gen6Start, gen6End];
    case 7:
      return [gen7Start, gen7End];
    case 8:
      return [gen8Start, gen8End];
    case 9:
      return [gen9Start, gen9End];
    default:
      throw new Error(
        `Generation id error: ${generation} is not a valid generation.`
      );
  }
}
