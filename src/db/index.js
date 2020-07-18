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

// Definindo conexão entre ORM e banco de dados
const conn = new Sequelize(dbConfig);

User.init(conn);
Address.init(conn);
Institution.init(conn);
Event.init(conn);
Category.init(conn);

User.associate(conn.models);
Address.associate(conn.models);
Institution.associate(conn.models);
Event.associate(conn.models);
Category.associate(conn.models);

// Exportando conexão
module.exports = conn;