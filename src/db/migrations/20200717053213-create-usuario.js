'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuario', {
      id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        references: { model: 'Cliente', key: 'id_cliente' },
      },
      email_usuario: Sequelize.STRING,
      senha_usuario: Sequelize.STRING,
      tipo_usuario: Sequelize.INTEGER,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Usuario');
  }
};
