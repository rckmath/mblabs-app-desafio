const Utils = require('../../utilities/utils');

class ModelRepository {
    /**
     * 
     * @param {*} ModelEntity Modelo da tabela do banco de dados
     * @param {*} data Dados que serão inclusos na query
     * @param {*} options Modificadores
     */
    static async create(ModelEntity, data, options) {
        let response = null;

        try {
            response = ModelEntity.build(data);

            response = await response.save({
                transaction: options ? options.transaction : null,
                returning: true,
            });
        } catch (err) {
            return null;
        }
        return response;
    }

    static async selectOne(ModelEntity, options) {
        let response = null;

        try {
            options = {
                ...options,
                attributes: {
                    exclude: Utils.excludeAttributes,
                },
            };
            response = await ModelEntity.findOne(options);
        } catch (err) {
            return null;
        }
        return response;
    }

    static async selectOnePrivate(ModelEntity, options) {
        let response = null;

        try {
            options = {
                ...options,
            };
            response = await ModelEntity.findOne(options);
        } catch (err) {
            return null;
        }
        return response;
    }

    static async selectAll(ModelEntity, options) {
        let response = null;
        
        try {
            options = {
                ...options,
                attributes: {
                    exclude: Utils.excludeAttributes,
                },
            };

            response = await ModelEntity.findAll(options);
        } catch (err) {
            return err;
        }
        return response;
    }

    static async selectWithPagination(ModelEntity, options) {
        let response = null;

        try {
            options = {
                ...options,
                attributes: {
                    exclude: Utils.excludeAttributes,
                },
            };
            response = await ModelEntity.findAndCountAll(options);
        } catch (err) {
            return null;
        }
        return response;
    }

    static async updateById(ModelEntity, id, data, options) {
        let response = null;

        try {
            response = await ModelEntity.update(data, {
                where: { id },
                transaction: options && options.transaction,
                returning: true,
            });

            [, [response]] = response;
        } catch (err) {
            return null;
        }
        return response;
    }
}

module.exports = ModelRepository;