const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, primaryKey: true, field: 'id_usuario', defaultValue: DataTypes.UUIDV4, },
            name: { type: DataTypes.STRING, field: 'nome_cliente', },
            cpf: { type: DataTypes.STRING, field: 'cpf_cliente', },
            birthday: { type: DataTypes.DATE, field: 'dt_nasc_cliente', },
            email: { type: DataTypes.STRING,  field: 'email_usuario', },
            password: { type: DataTypes.STRING, field: 'senha_usuario', },
            type: { type: DataTypes.INTEGER, field: 'tipo_usuario', },
        }, {
            sequelize,
            tableName: 'Usuario',
        });
    }

    /**
     * Função realiza os relacionamentos entre as tabelas do banco de dados
     * @param {*} models: modelos do banco de dados
     */
    static associate(models) {
        this.hasMany(models.Address, {
            foreignKey: 'id_usuario',
            as: 'addresses'
        });
        this.hasMany(models.Order, {
            foreignKey: 'id_usuario',
            as: 'orders'
        });
    }
}

module.exports = User;