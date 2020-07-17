const { Model, DataTypes } = require('sequelize');

class CostumerAddress extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'id_endereco',
            },
            id_cli: {
                type: DataTypes.INTEGER,
                field: 'id_cliente',
            },
            cep: {
                type: DataTypes.STRING,
                field: 'cep_endereco',
            },
            num: {
                type: DataTypes.INTEGER,
                field: 'num_endereco',
            },
        }, {
            sequelize,
            tableName: 'EnderecoCliente',
        });
    }
}

module.exports = CostumerAddress;