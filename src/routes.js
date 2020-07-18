const express = require('express');
const UserController = require('./controllers/user');
const AddressController = require('./controllers/address');
const InstitutionController = require('./controllers/institution');
const EventController = require('./controllers/event');
const CategoryController = require('./controllers/category');


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
routes.put('/institutions', InstitutionController.updateById);
routes.delete('/institutions', InstitutionController.deleteById);

/**
 * Rotas pertencentes ao evento
 */
routes.get('/institutions/events', EventController.index);
routes.get('/institutions/:id_institution/events', EventController.indexByInstitution);
routes.post('/institutions/:id_institution/events', EventController.create);
routes.put('/institutions/events', EventController.updateById);
routes.delete('/institutions/events', EventController.deleteById);

/**
 * Rotas pertencens a categoria
 */
routes.get('/institutions/events/category', CategoryController.index);
routes.post('/institutions/events/category', CategoryController.create);



// Exportando rotas
module.exports = routes;