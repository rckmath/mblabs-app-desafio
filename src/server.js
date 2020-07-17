require('./db/index');

const express = require('express');
const routes = require('./routes');

// Iniciando express
const app = express();

// Informando ao Express que lidaremos com dados em JSON
app.use(express.json());

// Iniciando rotas
app.use(routes);

// Escutando a porta 1335
app.listen(1335);