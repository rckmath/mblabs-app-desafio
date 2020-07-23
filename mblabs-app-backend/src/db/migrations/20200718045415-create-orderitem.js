'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ItemPedido', {
      id_item_pedido: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      id_pedido: {
        type: Sequelize.UUID,
        references: { model: 'Pedido', key: 'id_pedido' },
      },
      id_evento: {
        type: Sequelize.UUID,
        references: { model: 'Evento', key: 'id_evento' },
      },
      qtd_item: Sequelize.INTEGER,
      valor_total: Sequelize.DECIMAL,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ItemPedido');
  }
};