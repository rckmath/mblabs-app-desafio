const Sequelize = require ('sequelize');
const dbConfig = require('./database');

/**
 * Importando models
 */
const User = require('./models/user');
const Address = require('./models/address');
const Institution = require('./models/institution');
const Event = require('./models/event');
const Category = require('./models/category');
const Order = require('./models/order')
const OrderItem = require('./models/orderitem')
const Ticket = require('./models/ticket');

// Definindo conexão entre ORM e banco de dados
const conn = new Sequelize(dbConfig);

/**
 * Inicializando models
 */
User.init(conn);
Address.init(conn);
Institution.init(conn);
Event.init(conn);
Category.init(conn);
Order.init(conn);
OrderItem.init(conn);
Ticket.init(conn);

/**
 * Passando os modelos de entidades para associá-las
 */
User.associate(conn.models);
Address.associate(conn.models);
Institution.associate(conn.models);
Event.associate(conn.models);
Category.associate(conn.models);
Order.associate(conn.models);
OrderItem.associate(conn.models);
Ticket.associate(conn.models);

// Exportando conexão
module.exports = conn;