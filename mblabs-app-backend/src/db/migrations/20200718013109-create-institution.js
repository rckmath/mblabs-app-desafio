'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Instituicao', {
      id_instituicao: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      nome_instituicao: Sequelize.STRING,
      cnpj_instituicao: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Instituicao');
  }
};