import { modalTypes } from "./modalTypes";

const highScoreKey = "pmg-highScores";

const defaultValue = {
  gen1: 0,
  gen2: 0,
  gen3: 0,
  gen4: 0,
  gen5: 0,
  gen6: 0,
  gen7: 0,
  gen8: 0,
  gen9: 0,
};

export function getHighScoresLStorage() {
  const storedScores = localStorage.getItem(highScoreKey);
  return storedScores ? JSON.parse(storedScores) : defaultValue;
}

export function setHighScoresLStorage(scoresObj) {
  localStorage.setItem(highScoreKey, JSON.stringify(scoresObj));
}

export function handleCardClick({
  id,
  playerDeck,
  playerScore,
  highScore,
  generation,
  setPlayerDeck,
  setPlayerScore,
  setHighScore,
  setModalType,
  setEndScoreDisplay,
  setEndPlayerDeck,
}) {
  let newScore = playerScore;
  let newDeck = playerDeck;

  if (!playerDeck.includes(id)) {
    newScore += 1;
    newDeck = [...playerDeck, id];
    if (newScore > highScore[`gen${generation}`]) {
      const newHighScore = { ...highScore, [`gen${generation}`]: newScore };
      setHighScoresLStorage(newHighScore);
      setHighScore(newHighScore);
    }
  } else {
    setEndScoreDisplay(playerScore);
    setEndPlayerDeck(playerDeck);
    setModalType(modalTypes.gameEnd);
    newScore = 0;
    newDeck = [];
  }

  setPlayerDeck(newDeck);
  setPlayerScore(newScore);
}
