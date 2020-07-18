const express = require('express');
const UserController = require('./controllers/user');
const AddressController = require('./controllers/address');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.post('/users/:id_user/address', AddressController.create);

// Exportando rotas
module.exports = routes;