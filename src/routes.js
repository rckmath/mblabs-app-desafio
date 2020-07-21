const express = require('express');
const UserController = require('./controllers/user');
const AddressController = require('./controllers/address');
const InstitutionController = require('./controllers/institution');
const EventController = require('./controllers/event');
const CategoryController = require('./controllers/category');
const OrderController = require('./controllers/order');
const OrderItemController = require('./controllers/orderitem');
const TicketController = require('./controllers/ticket');
const { verifyToken } = AuthController = require('./controllers/auth');

const routes = express.Router();

/**
 * Rotas pertencentes ao usuário
 */
routes.get('/users', verifyToken, UserController.index);
routes.get('/users/:id_user/addresses', AddressController.index);
routes.get('/users/:id_user/tickets', TicketController.index);
routes.get('/users/:id_user/orders', OrderController.indexByUser);
routes.post('/users', UserController.create);
routes.post('/users/:id_user/addresses', AddressController.create);
routes.put('/users/:id_user/addresses/:id_address', AddressController.updateById);
routes.put('/users/:id_user', UserController.updateById);
routes.delete('/users/:id_user/addresses/:id_address', AddressController.deleteById);
routes.delete('/users/:id_user', UserController.deleteById);

/**
 * Rotas pertencentes a instituição
 */
routes.get('/institutions', InstitutionController.index);
routes.get('/institutions/:id_institution/events', InstitutionController.indexEventsByInstitution);
routes.post('/institutions', InstitutionController.create);
routes.put('/institutions/:id_institution', InstitutionController.updateById);
routes.delete('/institutions/:id_institution', InstitutionController.deleteById);


/**
 * Rotas pertencentes ao evento
 */
routes.get('/institutions/events', EventController.index);
routes.get('/institutions/events/categories', CategoryController.index);
routes.post('/institutions/events/:id_event/categories', CategoryController.create);
routes.post('/institutions/:id_institution/events', EventController.create);
routes.put('/institutions/:id_institution/events/:id_event', EventController.updateById);
routes.delete('/institutions/:id_institution/events/:id_event', EventController.deleteById);

/**
 * Rotas pertencentes a categoria
 */
routes.get('/institutions/events/category', CategoryController.index);
routes.get('/institutions/events/category/:id_category', CategoryController.indexByCategory);
routes.post('/institutions/events/category', CategoryController.create);
routes.put('/institutions/events/category/:id_category', CategoryController.updateById);
routes.delete('/institutions/events/category/:id_category', CategoryController.deleteById);

/**
 * Rotas pertencentes ao pedido
 */
routes.get('/users/orders', OrderController.index);
routes.get('/users/orders/:id_order/items', OrderItemController.index);
routes.post('/users/:id_user/orders', OrderController.create);
routes.post('/users/:id_user/orders/:id_order', OrderItemController.create);
routes.put('/users/:id_user/orders/:id_order', OrderController.updateById);
routes.put('/users/:id_user/orders/:id_order/items/:id_item', OrderItemController.updateById);
routes.delete('/users/:id_user/orders/:id_order/items/:id_item', OrderItemController.deleteById);

/**
 * Rotas pertencentes aos ingresso
 */
routes.post('/users/:id_user/orders/:id_order/items/:id_item/tickets', TicketController.create);
routes.put('/users/:id_user/tickets/:id_ticket', TicketController.updateById);

/**
 * Rotas de login, logout e cadastro
 */
routes.post('/login', AuthController.login);
routes.post('/logout', AuthController.logout);

// Exportando rotas
module.exports = routes;