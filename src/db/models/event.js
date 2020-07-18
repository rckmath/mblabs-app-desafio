const { Model, DataTypes } = require('sequelize');

class Event extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, primaryKey: true, field: 'id_evento', defaultValue: DataTypes.UUIDV4, },
            name: { type: DataTypes.STRING, field: 'nome_categoria', },
            description: { type: DataTypes.STRING, field: 'descricacao_categoria', },
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

    static associate(models) {
        this.belongsToMany(models.Category, {
            foreignKey: 'id_evento',
            through: 'EventoCategoria',
            as: 'categories'
        });
    }
}

module.exports = Event;