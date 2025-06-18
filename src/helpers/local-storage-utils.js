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

export function getHighScores() {
  const storedScores = localStorage.getItem(highScoreKey);
  return storedScores ? JSON.parse(storedScores) : defaultValue;
}

export function setHighScores(scoresObj) {
  localStorage.setItem(highScoreKey, JSON.stringify(scoresObj));
}
