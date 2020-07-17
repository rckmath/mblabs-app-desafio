const express = require('express');
const UserController = require('./controllers/user');

const routes = express.Router();

routes.post('/users/create', UserController.create);

// Exportando rotas
module.exports = routes;