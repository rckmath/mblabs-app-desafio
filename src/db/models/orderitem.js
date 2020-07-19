const { Model, DataTypes } = require('sequelize');

class OrderItem extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, primaryKey: true, field: 'id_item_pedido', defaultValue: DataTypes.UUIDV4, },
            item_qty: { type: DataTypes.INTEGER, field: 'qtd_item', },
            total_value: { type: DataTypes.DECIMAL, field: 'valor_total', },
        }, {
            sequelize,
            tableName: 'ItemPedido',
        });
    }

    /**
     * Função realiza os relacionamentos entre as tabelas do banco de dados
     * @param {*} models: modelos do banco de dados
     */
    static associate(models) {
        this.belongsTo(models.Order, {
            foreignKey: 'id_pedido',
            as: 'order'
        });
        this.belongsTo(models.Event, {
            foreignKey: 'id_evento',
            as: 'event'
        });
    }
}

module.exports = OrderItem;