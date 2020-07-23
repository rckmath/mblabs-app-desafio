const { Model, DataTypes } = require('sequelize');

class Event extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, primaryKey: true, field: 'id_evento', defaultValue: DataTypes.UUIDV4, },
            name: { type: DataTypes.STRING, field: 'nome_evento', },
            description: { type: DataTypes.STRING(1000), field: 'descricao_evento', },
            tickets_qty: { type: DataTypes.INTEGER, field: 'qtd_ingr_disponiveis', },
            ticket_val: { type: DataTypes.DECIMAL,  field: 'valor_ingresso', },
            event_date: { type: DataTypes.DATE, field: 'data_evento', },
            event_time: { type: DataTypes.TIME, field: 'hora_evento', },
            zipcode: { type: DataTypes.STRING, field: 'cep_endereco', },
            num: { type: DataTypes.INTEGER, field: 'num_endereco', },
        }, {
            sequelize,
            tableName: 'Evento',
        });
    }

    /**
     * Função realiza os relacionamentos entre as tabelas do banco de dados
     * @param {*} models: modelos do banco de dados
     */
    static associate(models) {
        this.belongsTo(models.Institution, {
            foreignKey: 'id_instituicao',
            as: 'institution'
        });
        this.belongsToMany(models.Category, {
            foreignKey: 'id_evento',
            through: 'EventoCategoria',
            as: 'categories'
        });
    }
}

module.exports = Event;