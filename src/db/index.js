const Sequelize = require ('sequelize');
const dbConfig = require('./database');

/**
 * Importando models
 */
const Address = require('./models/address');
const User = require('./models/user');

// Definindo conexão entre ORM e banco de dados
const conn = new Sequelize(dbConfig);

User.init(conn);
Address.init(conn);

Address.associate(conn.models);

// Exportando conexão
module.exports = conn;