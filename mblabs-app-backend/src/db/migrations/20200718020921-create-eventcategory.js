'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EventoCategoria', {
      id_evento_categoria: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_evento: {
        type: Sequelize.UUID,
        references: { model: 'Evento', key: 'id_evento' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_categoria: {
        type: Sequelize.UUID,
        references: { model: 'Categoria', key: 'id_categoria' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('EventoCategoria');
  }
};