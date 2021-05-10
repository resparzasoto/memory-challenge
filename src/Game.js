'use strict';

const randomWords = require('random-words');

const {
  BLINK,
  GAME_OVER,
  MAX_TIME,
  MAX_WORD_LENGTH,
  MIN_WORD_LENGTH,
  START_LEVEL,
  SUBLEVEL_TO_LEVEL_UP,
} = require('./utils/constants');

class Game {
  constructor() {
    this.initGame();
  }

  initGame = () => {
    this.words = [];
    this.configuration = {
      level: START_LEVEL,
      subLevel: 0,
      points: 0,
      strikes: 0,
      time: MAX_TIME,
      wordLength: MIN_WORD_LENGTH,
      wordsForLevel: 3,
    };
    this.createWords();
  };

  levelUp = () => {
    this.configuration.level++;
    this.configuration.subLevel = 0;
    this.configuration.time = this.calculateTimeDown();
    this.configuration.wordLength = this.calculateWordLengthUp();
    this.createWords();
  };

  levelDown = () => {
    if (this.configuration.level === START_LEVEL) {
      this.restartToStartLevel();
    } else {
      this.configuration.level--;
      this.configuration.strikes++;
      this.configuration.subLevel = 0;
      this.configuration.time = this.calculateTimeUp();
      this.configuration.wordLength = this.calculateWordLengthDown();
      this.createWords();
    }
  };

  subLevelUp = () => {
    this.configuration.subLevel++;
    this.configuration.points++;

    if (this.configuration.subLevel === SUBLEVEL_TO_LEVEL_UP) {
      this.levelUp();
    }
  };

  restartToStartLevel = () => {
    this.configuration.subLevel = 0;
    this.configuration.strikes++;
    this.createWords();
  };

  calculateTimeDown = () => {
    let newTime = Math.floor(this.configuration.time * 0.75);

    if (newTime < BLINK) {
      return BLINK;
    }

    return newTime;
  };

  calculateTimeUp = () => {
    let newTime = Math.floor(this.configuration.time * 1.25);

    if (newTime > MAX_TIME) {
      return MAX_TIME;
    }

    return newTime;
  };

  calculateWordLengthUp = () => {
    let wordLength = Math.ceil(this.configuration.wordLength * 1.25);

    if (wordLength > MAX_WORD_LENGTH) {
      return MAX_WORD_LENGTH;
    }

    return wordLength;
  };

  calculateWordLengthDown = () => {
    let wordLength = Math.ceil(this.configuration.wordLength * 0.75);

    if (wordLength < MIN_WORD_LENGTH) {
      return MIN_WORD_LENGTH;
    }

    return wordLength;
  };

  createWords = () => {
    this.words = [];

    for (let i = 0; i < this.configuration.wordsForLevel; i++) {
      this.words.push(this.createWord());
    }
  };

  createWord = () => {
    let randomWord = '';

    do {
      const words = randomWords({
        exactly: 1,
        maxLength: this.configuration.wordLength,
      });

      randomWord = words[0];
    } while (!this.isWordLengthValid(randomWord));

    return randomWord;
  };

  isWordLengthValid = (word) => word.length === this.configuration.wordLength;

  isCorrectWord = (word) => {
    let isCorrect = false;

    if (this.words[this.configuration.subLevel] === word) {
      this.subLevelUp();
      isCorrect = true;
    } else {
      this.levelDown();
      isCorrect = false;
    }

    return isCorrect;
  };

  isGameOver = () => {
    let isGameOver = false;

    if (this.configuration.strikes === GAME_OVER) {
      isGameOver = true;
    }

    return isGameOver;
  };

  getWord = () => this.words[this.configuration.subLevel];
}

module.exports = Game;
