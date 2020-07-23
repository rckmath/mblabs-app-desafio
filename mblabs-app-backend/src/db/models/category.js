const { Model, DataTypes } = require('sequelize');

class Category extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.UUID, primaryKey: true, field: 'id_categoria', defaultValue: DataTypes.UUIDV4, },
            name: { type: DataTypes.STRING, field: 'nome_categoria', },
        }, {
            sequelize,
            tableName: 'Categoria',
        });
    }

    /**
     * Função realiza os relacionamentos entre as tabelas do banco de dados
     * @param {*} models: modelos do banco de dados
     */
    static associate(models) {
        this.belongsToMany(models.Event, {
            foreignKey: 'id_categoria',
            through: 'EventoCategoria',
            as: 'events'
        });
    }
}

module.exports = Category;