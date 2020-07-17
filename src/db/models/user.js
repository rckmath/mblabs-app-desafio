const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'id_usuario',
            },
            id_cli: {
                type: DataTypes.INTEGER,
                field: 'id_cliente',
            },
            email: {
                type: DataTypes.STRING,
                field: 'email_usuario',
            },
            password: {
                type: DataTypes.STRING,
                field: 'senha_usuario',
            },
            type: {
                type: DataTypes.INTEGER,
                field: 'tipo_usuario',
            },
        }, {
            sequelize,
            tableName: 'Usuario',
        });
    }
}

module.exports = User;