'use strict';

const randomWords = require('random-words');

const BLINK = 300;
const MAX_TIME = 1500;
const START_LEVEL = 1;
const SUBLEVEL_TO_LEVEL_UP = 2;
const GAME_OVER = 3;
const MIN_WORD_LENGTH = 5;
const MAX_WORD_LENGTH = 12;

class Game {
  constructor() {
    this.initGame();
  }

  initGame = () => {
    this.words = [];
    this.gameConfiguration = {
      level: 1,
      subLevel: 0,
      points: 0,
      strikes: 0,
      time: 1500,
      wordLength: 5,
      wordsForLevel: 3,
    };
    this.createWords();
  };

  levelUp = () => {
    this.gameConfiguration.level++;
    this.gameConfiguration.subLevel = 0;
    this.gameConfiguration.time = this.calculateTimeDown();
    this.gameConfiguration.wordLength = this.calculateWordLengthUp();
    this.createWords();
  };

  levelDown = () => {
    if (this.gameConfiguration.level === START_LEVEL) {
      this.restartToStartLevel();
    } else {
      this.gameConfiguration.level--;
      this.gameConfiguration.strikes++;
      this.gameConfiguration.subLevel = 0;
      this.gameConfiguration.time = this.calculateTimeUp();
      this.gameConfiguration.wordLength = this.calculateWordLengthDown();
      this.createWords();
    }
  };

  subLevelUp = () => {
    this.gameConfiguration.subLevel++;
    this.gameConfiguration.points++;

    if (this.gameConfiguration.subLevel === SUBLEVEL_TO_LEVEL_UP) {
      this.levelUp();
    }
  };

  restartToStartLevel = () => {
    this.gameConfiguration.subLevel = 0;
    this.gameConfiguration.strikes++;
    this.createWords();
  };

  calculateTimeDown = () => {
    let newTime = Math.floor(this.gameConfiguration.time * 0.75);

    if (newTime < BLINK) {
      return BLINK;
    }

    return newTime;
  };

  calculateTimeUp = () => {
    let newTime = Math.floor(this.gameConfiguration.time * 1.25);

    if (newTime > MAX_TIME) {
      return MAX_TIME;
    }

    return newTime;
  };

  calculateWordLengthUp = () => {
    let wordLength = Math.ceil(this.gameConfiguration.wordLength * 1.25);

    if (wordLength > MAX_WORD_LENGTH) {
      return MAX_WORD_LENGTH;
    }

    return wordLength;
  };

  calculateWordLengthDown = () => {
    let wordLength = Math.ceil(this.gameConfiguration.wordLength * 0.75);

    if (wordLength < MIN_WORD_LENGTH) {
      return MIN_WORD_LENGTH;
    }

    return wordLength;
  };

  createWords = () => {
    this.words = [];

    for (let i = 0; i < this.gameConfiguration.wordsForLevel; i++) {
      this.words.push(this.createWord());
    }
  };

  createWord = () => {
    let randomWord = '';

    do {
      const words = randomWords({
        exactly: 1,
        maxLength: this.gameConfiguration.wordLength,
      });

      randomWord = words[0];
    } while (!this.isWordLengthValid(randomWord));

    return randomWord;
  };

  isWordLengthValid = (word) =>
    word.length === this.gameConfiguration.wordLength;

  isCorrectWord = (word) => {
    let isCorrect = false;

    if (this.words[this.gameConfiguration.subLevel] === word) {
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

    if (this.gameConfiguration.strikes === GAME_OVER) {
      isGameOver = true;
    }

    return isGameOver;
  };

  getWord = () => this.words[this.gameConfiguration.subLevel];
}

const newGame = new Game();

console.log(newGame.words);
console.log(newGame.getWord());

newGame.levelUp();

console.log(newGame.gameConfiguration);
console.log(newGame.words);
console.log(newGame.getWord());

newGame.levelUp();

console.log(newGame.gameConfiguration);
console.log(newGame.words);
console.log(newGame.getWord());

newGame.levelUp();

console.log(newGame.gameConfiguration);
console.log(newGame.words);
console.log(newGame.getWord());

newGame.levelDown();

console.log(newGame.gameConfiguration);
console.log(newGame.words);
console.log(newGame.getWord());

newGame.levelDown();

console.log(newGame.gameConfiguration);
console.log(newGame.words);
console.log(newGame.getWord());

newGame.levelDown();

console.log(newGame.gameConfiguration);
console.log(newGame.words);
console.log(newGame.getWord());

newGame.levelDown();

console.log(newGame.gameConfiguration);
console.log(newGame.words);
console.log(newGame.getWord());

newGame.levelDown();

console.log(newGame.gameConfiguration);
console.log(newGame.words);
console.log(newGame.getWord());
