'use strict';

const express = require('express');
const gamesRouter = require('./gamesRouter');

const apiRouter = () => {
  const routes = express.Router();

  routes.use('/games', gamesRouter());

  return routes;
};

module.exports = apiRouter;
