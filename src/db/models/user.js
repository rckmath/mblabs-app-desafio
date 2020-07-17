const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                field: 'id_usuario',
                defaultValue: DataTypes.UUIDV4,
            },
            id_cli: {
                type: DataTypes.UUID,
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