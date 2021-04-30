'use strict';

const { getWordLevelOne, getDelay } = require('../services/wordsGenerator');
const { validateWords } = '../services/gameValidator';

module.exports = () => {
  const newGame = (req, res) => {
    res.send({
      level: 1,
      strikes: 0,
      word: getWordLevelOne(),
      delay: getDelay(),
    });
  };

  const playGame = (req, res) => {
    const { level, strikes, word, input } = req.body;

    if (!validateWords(word, input)) {
    }

    res.send({});
  };

  return {
    newGame,
  };
};
