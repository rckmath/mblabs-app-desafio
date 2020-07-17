const Sequelize = require ('sequelize');
const dbConfig = require('./database');

// Definindo conexão entre ORM e banco de dados
const conn = new Sequelize(dbConfig);

// Exportando conexão
module.exports = conn;