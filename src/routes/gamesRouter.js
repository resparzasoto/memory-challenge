'use strict';

const express = require('express');
const { gamesController } = require('../controllers');

const gamesRouter = () => {
  const router = express.Router();
  const controller = gamesController();

  router.route('/newGame').post(controller.newGame);

  return router;
};

module.exports = gamesRouter;
