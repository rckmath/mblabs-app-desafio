const { Model, DataTypes } = require('sequelize');

class Costumer extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'id_cliente',
            },
            name: {
                type: DataTypes.STRING,
                field: 'nome_cliente',
            },
            cpf: {
                type: DataTypes.STRING,
                field: 'cpf_cliente',
            },
            birthDate: {
                type: DataTypes.DATE,
                field: 'dt_nasc_cliente',
            },
        }, {
            sequelize,
            tableName: 'Cliente',
        });
    }
}

module.exports = Costumer;