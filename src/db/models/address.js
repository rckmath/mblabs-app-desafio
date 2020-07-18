const { Model, DataTypes } = require('sequelize');

class Address extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, primaryKey: true, field: 'id_endereco', defaultValue: DataTypes.UUIDV4, },
            zipcode: { type: DataTypes.STRING, field: 'cep_endereco', },
            num: { type: DataTypes.INTEGER, field: 'num_endereco', },
        }, {
            sequelize,
            tableName: 'Endereco',
        });
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'id_usuario',
            as: 'user'
        });
    }
}

module.exports = Address;