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

    static associate(models) {
        this.belongsToMany({
            foreignKey: 'id_categoria',
            through: 'EventoCategoria',
            as: 'events'
        });
    }
}

module.exports = Category;