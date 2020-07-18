const { Model, DataTypes } = require('sequelize');

class Institution extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, primaryKey: true, field: 'id_instituicao', defaultValue: DataTypes.UUIDV4, },
            name: { type: DataTypes.STRING, field: 'nome_instituicao', },
            cnpj: { type: DataTypes.INTEGER, field: 'cnpj_instituicao', },
        }, {
            sequelize,
            tableName: 'Instituicao',
        });
    }

    static associate(models) {
        this.hasMany(models.User, { foreignKey: 'id_evento', as: 'events' });
    }
}

module.exports = Institution;