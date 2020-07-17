'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cliente', {
      id_cliente: {
        type: Sequelize.UUID,
        primaryKey: true,
        autoIncrement: true,
      },
      nome_cliente: Sequelize.STRING,
      cpf_cliente: Sequelize.STRING,
      dt_nasc_cliente: Sequelize.DATE,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Cliente');
  }
};
