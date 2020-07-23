'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Endereco', {
      id_endereco: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      id_usuario: {
        type: Sequelize.UUID,
        references: { model: 'Usuario', key: 'id_usuario' },
      },
      cep_endereco: Sequelize.STRING,
      num_endereco: Sequelize.INTEGER,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Endereco');
  }
};