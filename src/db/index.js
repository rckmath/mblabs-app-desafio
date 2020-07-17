const Sequelize = require ('sequelize');
const dbConfig = require('./database');

/**
 * Importando models
 */
const Costumer = require('./models/costumer');
const CostumerAddress = require('./models/costumer-address');
const User = require('./models/user');

// Definindo conexão entre ORM e banco de dados
const conn = new Sequelize(dbConfig);

Costumer.init(conn);
CostumerAddress.init(conn);
User.init(conn);

// Exportando conexão
module.exports = conn;