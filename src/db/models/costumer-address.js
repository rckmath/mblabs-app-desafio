const { Model, DataTypes } = require('sequelize');

class CostumerAddress extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                field: 'id_endereco',
                defaultValue: DataTypes.UUIDV4,
            },
            id_cli: {
                type: DataTypes.UUID,
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
            logradouro: {
                type: DataTypes.STRING,
                field: 'logradouro_endereco',
            },
        }, {
            sequelize,
            tableName: 'EnderecoCliente',
        });
    }
}

module.exports = CostumerAddress;