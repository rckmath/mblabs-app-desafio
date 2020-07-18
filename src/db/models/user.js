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
            name: {
                type: DataTypes.STRING,
                field: 'nome_cliente',
            },
            cpf: {
                type: DataTypes.STRING,
                field: 'cpf_cliente',
            },
            birthday: {
                type: DataTypes.DATE,
                field: 'dt_nasc_cliente',
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
    static associate(models) {
        this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
    }
}

module.exports = User;