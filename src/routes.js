const express = require('express');
const UserController = require('./controllers/user');
const AddressController = require('./controllers/address');
const InstitutionController = require('./controllers/institution');
const EventController = require('./controllers/event');
const CategoryController = require('./controllers/category');
const OrderController = require('./controllers/order');
const OrderItemController = require('./controllers/orderitem');

const routes = express.Router();

/**
 * Rotas pertencentes ao usuário
 */
routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.post('/users/:id_user/addresses', AddressController.create);
routes.put('/users/:id_user/adresses/:id_address', AddressController.update);
routes.get('/users/:id_user/addresses', AddressController.index);
routes.delete('/users/:id_user/addresses/:id_address', AddressController.deleteById);
routes.delete('/users/:id_user', UserController.deleteById);

/**
 * Rotas pertencentes a instituição
 */
routes.get('/institutions', InstitutionController.index);
routes.post('/institutions', InstitutionController.create);
routes.put('/institutions', InstitutionController.updateById);
routes.delete('/institutions/:id_institution', InstitutionController.deleteById);

/**
 * Rotas pertencentes ao evento
 */
routes.get('/institutions/events', EventController.index);
routes.get('/institutions/:id_institution/events', EventController.indexByInstitution);
routes.get('/institutions/events/categories', CategoryController.index);
routes.post('/institutions/events/:id_event/categories', CategoryController.create);
routes.post('/institutions/:id_institution/events', EventController.create);
routes.put('/institutions/:id_institution/events/:id_event', EventController.updateById);
routes.delete('/institutions/:id_institution/events/:id_event', EventController.deleteById);

/**
 * Rotas pertencentes a categoria
 */
routes.get('/institutions/events/category', CategoryController.index);
routes.post('/institutions/events/category', CategoryController.create);

/**
 * Rotas pertencentes ao pedido
 */
routes.get('/users/orders', OrderController.index);
routes.get('/users/orders/:id_order', OrderItemController.index);
routes.post('/users/:id_user/orders', OrderController.create);
routes.post('/users/:id_user/orders/:id_order', OrderItemController.create);

// Exportando rotas
module.exports = routes;