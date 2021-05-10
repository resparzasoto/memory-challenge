'use strict';

const { EventEmitter } = require('events');

const Game = require('./Game');

const blessed = require('blessed');
const contrib = require('blessed-contrib');

const screen = blessed.screen();
const eventEmitter = new EventEmitter();

const start = () => {
  const game = new Game();

  var levelBox, subLevelBox, rememberBox, strikesBox, startButton, prompt;

  startButton = blessed.box({
    content: 'START',
    width: '13%',
    height: '6%',
    left: '50%',
    right: '50%',
    top: '45%',
    align: 'center',
    valign: 'center',
    style: {
      fg: 'black',
      bg: 'white',
    },
  });

  const welcomePage = (screen) => {
    const grid = new contrib.grid({
      rows: 10,
      cols: 12,
      screen,
    });

    grid.set(1, 1, 4, 10, blessed.text, {
      fg: 'white',
      align: 'center',
      border: {
        fg: 'blue',
      },
      label: 'Do you wanna play?',
      content: 'Welcome, test your memory!',
    });

    grid.set(5, 3, 2, 6, blessed.text, {
      fg: 'white',
      bg: 'gray',
      align: 'center',
      border: {
        fg: 'blue',
      },
      align: 'center',
      valign: 'middle',
      content: 'Move with -> to play!',
    });
  };

  const gamePage = (screen) => {
    const grid = new contrib.grid({
      rows: 10,
      cols: 12,
      screen: screen,
    });

    levelBox = grid.set(1, 1, 1, 3, blessed.text, {
      label: 'LEVEL',
      content: game.configuration.level.toString(),
      align: 'center',
    });

    subLevelBox = grid.set(1, 5, 1, 3, blessed.text, {
      label: 'SUBLEVEL',
      content: game.configuration.subLevel.toString(),
      align: 'center',
    });

    strikesBox = grid.set(1, 9, 1, 3, blessed.text, {
      label: 'STRIKES',
      content: game.configuration.strikes.toString(),
      align: 'center',
    });

    rememberBox = grid.set(3, 4, 1, 5, blessed.text, {
      hidden: true,
      label: 'Remember',
      shadow: true,
      style: {
        align: 'center',
        fg: 'black',
        bg: 'white',
        border: {
          fg: 'gray',
        },
      },
    });

    screen.append(startButton);
  };

  startButton.on('click', (data) => {
    prompt = blessed.prompt({
      left: 'center',
      top: 'center',
      height: 'shrink',
      width: 'shrink',
      border: 'line',
      style: {
        fg: 'blue',
        bg: 'black',
        bold: true,
        border: {
          fg: 'blue',
          bg: 'red',
        },
      },
    });

    screen.append(prompt);
    startButton.hide();

    eventEmitter.emit('randomWordEvent');
  });

  eventEmitter.on('randomWordEvent', () => {
    const currentWord = game.getWord();

    rememberBox.setContent(currentWord);
    rememberBox.show();
    screen.render();

    setTimeout(() => {
      eventEmitter.emit('timeOutEvent', currentWord);
    }, game.configuration.time);
  });

  eventEmitter.on('timeOutEvent', (currentWord) => {
    rememberBox.hide();

    prompt.readInput('Do you remember the word? ', '', (error, value) => {
      game.isCorrectWord(value);

      if (game.isGameOver()) {
        return process.exit(0);
      }

      levelBox.setContent(game.configuration.level.toString());
      subLevelBox.setContent(game.configuration.subLevel.toString());
      strikesBox.setContent(game.configuration.strikes.toString());
      screen.render();

      eventEmitter.emit('randomWordEvent');
    });

    screen.render();
  });

  screen.key(['escape', 'q', 'C-c'], (ch, key) => {
    return process.exit(0);
  });

  const carousel = new contrib.carousel([welcomePage, gamePage], {
    screen: screen,
    interval: 0,
    controlKeys: true,
  });

  carousel.start();
};

start();
