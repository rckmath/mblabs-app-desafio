const { Model, DataTypes } = require('sequelize');

class Ticket extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, primaryKey: true, field: 'id_ingresso', defaultValue: DataTypes.UUIDV4, },
            used_at: { type: DataTypes.DATE, field: 'usado_em' }
        }, {
            sequelize,
            tableName: 'Ingresso',
        });
    }

    /**
     * Função realiza os relacionamentos entre as tabelas do banco de dados
     * @param {*} models: modelos do banco de dados
     */
    static associate(models) {
        this.belongsTo(models.OrderItem, {
            foreignKey: 'id_item_pedido',
            as: 'orderitem'
        });
        this.belongsTo(models.User, {
            foreignKey: 'id_usuario',
            as: 'user'
        })
    }
}

module.exports = Ticket;