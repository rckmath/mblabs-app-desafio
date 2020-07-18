'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EventoCategoria', {
      id_evento_categoria: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      id_evento: {
        type: Sequelize.UUID,
        references: { model: 'Evento', key: 'id_evento' },
      },
      id_categoria: {
        type: Sequelize.UUID,
        references: { model: 'Categoria', key: 'id_categoria' },
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('EventoCategoria');
  }
};