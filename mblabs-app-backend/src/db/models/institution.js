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

    /**
     * Função realiza os relacionamentos entre as tabelas do banco de dados
     * @param {*} models: modelos do banco de dados
     */
    static associate(models) {
        this.hasMany(models.Event, { foreignKey: 'id_instituicao', as: 'events' });
    }
}

module.exports = Institution;