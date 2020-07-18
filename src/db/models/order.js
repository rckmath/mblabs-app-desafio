const { Model, DataTypes } = require('sequelize');

class Order extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, primaryKey: true, field: 'id_pedido', defaultValue: DataTypes.UUIDV4, },
            order_val: { type: DataTypes.DECIMAL, field: 'valor_pedido', },
            order_date: { type: DataTypes.DATE, field: 'data_pedido', },
            user_note: { type: DataTypes.STRING, field: 'observacao_usuario', },
            order_status: { type: DataTypes.INTEGER, field: 'status_pedido', },            
        }, {
            sequelize,
            tableName: 'Pedido',
        });
    }

    /**
     * Função realiza os relacionamentos entre as tabelas do banco de dados
     * @param {*} models: modelos do banco de dados
     */
    static associate(models) {
        this.hasMany(models.OrderItem, {
            foreignKey: 'id_pedido',
            as: 'items'
        });
        this.hasMany(models.Ticket, {
            foreignKey: 'id_pedido',
            as: 'tickets'
        });
        this.belongsTo(models.User, {
            foreignKey: 'id_usuario',
            as: 'user'
        });
    }
}

module.exports = Order;