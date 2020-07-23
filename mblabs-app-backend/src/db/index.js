const Sequelize = require ('sequelize');
const dbConfig = require('./database');

/**
 * Importando models
 */
const UserEntity = require('./models/user');
const AddressEntity = require('./models/address');
const InstitutionEntity = require('./models/institution');
const EventEntity = require('./models/event');
const CategoryEntity = require('./models/category');
const OrderEntity = require('./models/order')
const OrderItemEntity = require('./models/orderitem')
const TicketEntity = require('./models/ticket');

// Definindo conexão entre ORM e banco de dados
const conn = new Sequelize(dbConfig);

/**
 * Inicializando models
 */
UserEntity.init(conn);
AddressEntity.init(conn);
InstitutionEntity.init(conn);
EventEntity.init(conn);
CategoryEntity.init(conn);
OrderEntity.init(conn);
OrderItemEntity.init(conn);
TicketEntity.init(conn);

/**
 * Passando os modelos de entidades para associá-las
 */
UserEntity.associate(conn.models);
AddressEntity.associate(conn.models);
InstitutionEntity.associate(conn.models);
EventEntity.associate(conn.models);
CategoryEntity.associate(conn.models);
OrderEntity.associate(conn.models);
OrderItemEntity.associate(conn.models);
TicketEntity.associate(conn.models);

// Exportando conexão
module.exports = conn;