require('./db/index');
require('dotenv').config();

var cookieParser = require('cookie-parser');
const Constants = require('./utilities/constants');
const express = require('express');
const routes = require('./routes');

// Iniciando express
const app = express();

// Informando ao Express que lidaremos com dados em JSON
app.use(express.json());

// Iniciando rotas
app.use(routes);
app.use(cookieParser());

// Escutando a porta
app.listen(Constants.port);

module.exports = app;