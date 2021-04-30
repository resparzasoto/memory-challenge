'use strict';

const validateWords = (word, input) => {
  let isValid = true;
  for (let index = 0; index < word.length; index++) {
    if (word[index] !== input[index]) {
      isValid = false;

      break;
    }
  }

  return isValid;
};

const checkStrikes = (level, strikes) => {};

module.exports = {
  validateWords,
};
