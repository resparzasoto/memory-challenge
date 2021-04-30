'use strict';

require('dotenv').config();

const environment = () => {
  const environment = {
    app: {
      port: process.env.PORT,
    },
  };

  return environment;
};

module.exports = environment();
