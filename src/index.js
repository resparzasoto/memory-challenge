'use strict';

const path = require('path');

const environment = require('./config/environment');
const routes = require('./routes/index');

const express = require('express');
const hbs = require('express-handlebars');
const cookieSession = require('cookie-session');

const app = express();

// app.engine('.hbs', hbs({ defaultLayout: 'main', extname: '.hbs' }));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'session',
    secret: 'not-reveal-this-secret',
  })
);

app.use('/api', routes());

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening in http://localhost:3000`);
});
