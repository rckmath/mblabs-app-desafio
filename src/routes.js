const express = require('express');
const UserController = require('./controllers/user');
const AddressController = require('./controllers/address');
const InstitutionController = require('./controllers/institution');
const EventController = require('./controllers/event');

const routes = express.Router();

/**
 * Rotas pertencentes ao usuário
 */
routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.post('/users/:id_user/address', AddressController.create);

/**
 * Rotas pertencentes a instituição
 */
routes.get('/institutions', InstitutionController.index);
routes.post('/institutions', InstitutionController.create);
routes.post('/institutions/updt', InstitutionController.updateById);
routes.delete('/institutions', InstitutionController.deleteById);

/**
 * Rotas pertencentes ao evento
 */

// Exportando rotas
module.exports = routes;