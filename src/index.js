'use strict';

const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi world');
});

app.listen(3000, () => {
  console.log(`App listening in http://localhost:3000`);
});
