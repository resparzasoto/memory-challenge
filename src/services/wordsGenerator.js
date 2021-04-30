'use strict';

const MAX_LENGTH = 10;

const levelOneWords = [
  'ahi',
  'cae',
  'mal',
  'voy',
  'uña',
  'uno',
  'soy',
  'sol',
  'tos',
  'sal',
];

const levelTwoWords = [
  'ancla',
  'ansia',
  'barista',
  'experto',
  'curso',
  'silencio',
  'extraño',
  'heroico',
  'laberinto',
  'fabrica',
];

const getWordLevelOne = () => {
  return [levelOneWords[getRandomWordIndex()]];
};

const getWordLevelTwo = () => {
  return [levelTwoWords[getRandomWordIndex()]];
};

const getWordLevelThree = () => {
  return [
    levelOneWords[getRandomWordIndex()],
    levelTwoWords[getRandomWordIndex()],
  ];
};

const getRandomWordIndex = () => {
  return Math.floor(Math.random() * MAX_LENGTH);
};

const getDelay = (level) => {
  let delay = 15000;

  switch (level) {
    case 1:
      delay = 1500;
      break;
    case 2:
      delay = 1000;
      break;
    case 3:
      delay = 900;
      break;
    default:
      delay = 1500;
      break;
  }

  return delay;
};

module.exports = {
  getWordLevelOne,
  getWordLevelTwo,
  getWordLevelThree,
  getRandomWordIndex,
  getDelay,
};
