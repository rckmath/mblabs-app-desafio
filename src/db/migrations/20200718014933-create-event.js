'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Evento', {
      id_evento: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      id_instituicao: {
        type: Sequelize.UUID,
        references: { model: 'Instituicao', key: 'id_instituicao' },
      },
      nome_evento: Sequelize.STRING,
      descricao_evento: Sequelize.STRING,
      qtd_ingr_disponiveis: Sequelize.INTEGER,
      valor_ingresso: Sequelize.DECIMAL,
      data_evento: Sequelize.DATE,
      hora_evento: Sequelize.TIME,
      cep_endereco: Sequelize.STRING,
      num_endereco: Sequelize.INTEGER,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Evento');
  }
};