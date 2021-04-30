'use strict';

const $btnStart = document.getElementById('btn-start');
const $formGame = document.getElementById('form-game');

$formGame.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
}
