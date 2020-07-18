const { Model, DataTypes } = require('sequelize');

class Ticket extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, primaryKey: true, field: 'id_ingresso', defaultValue: DataTypes.UUIDV4, },           
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
        this.belongsTo(models.Order, {
            foreignKey: 'id_pedido',
            as: 'order'
        });
        this.belongsTo(models.User, {
            foreignKey: 'id_usuario',
            as: 'user'
        })
    }
}

module.exports = Ticket;