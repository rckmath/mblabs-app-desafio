'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ingresso', {
      id_ingresso: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      id_item_pedido: {
        type: Sequelize.UUID,
        references: { model: 'ItemPedido', key: 'id_item_pedido' },
      },
      id_usuario: {
        type: Sequelize.UUID,
        references: { model: 'Usuario', key: 'id_usuario' },
      },
      usado_em: Sequelize.DATE,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ingresso');
  }
};