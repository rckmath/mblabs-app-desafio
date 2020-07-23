'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuario', {
      id_usuario: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      nome_cliente: Sequelize.STRING,
      cpf_cliente: Sequelize.STRING,
      dt_nasc_cliente: Sequelize.DATE,
      email_usuario: Sequelize.STRING,
      senha_usuario: Sequelize.STRING,
      tipo_usuario: Sequelize.INTEGER,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Usuario');
  }
};
