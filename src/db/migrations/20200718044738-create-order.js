'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedido', {
      id_pedido: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      id_usuario: {
        type: Sequelize.UUID,
        references: { model: 'Usuario', key: 'id_usuario' },
      },
      valor_pedido: Sequelize.DECIMAL,
      data_pedido: Sequelize.DATE,
      observacao_usuario: Sequelize.STRING,
      status_pedido: Sequelize.INTEGER,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pedido');
  }
};