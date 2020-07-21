const CategoryEntity = require ('../db/models/category');
const EventEntity = require ('../db/models/event');
const ModelRepository = require('../db/repositories/models');
const Status = require('../enumerators/status');
const Utils = require('../utilities/utils');

module.exports = {
    // Retorna todas as categorias e os eventos relacionados a elas
    async index(req, res) {
        const options = {
            include: {
                association: 'events',
                attributes: {
                    exclude: 'id' + 'id_instituicao' + Utils.excludeAttributes,
                },
                through: { 
                    attributes: []
                } 
            },
        };

        return res.json(await ModelRepository.selectAll(CategoryEntity, options));
    },
    // Retorna os eventos de uma determinada categoria
    async indexByCategory(req, res) {
        const { id_category } = req.params;

        const options = {
            where: { id: id_category },
            include: {
                association: 'events',
                attributes: {
                    exclude: Utils.excludeAttributes,
                },
                through: { attributes: [] } 
            }
        };

        return res.json(await ModelRepository.selectAll(CategoryEntity, options));
    },
    // Relaciona uma categoria a um evento
    async create(req, res) {
        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { id_event } = req.params;
        const { name } = req.body;
        const where = { id: id_event };

        let event;
        try {
            event = await ModelRepository.selectOne(EventEntity, { where });

            if(!event)
                return res.json(Status.NOT_FOUND);

            const [ category ] = await CategoryEntity.findOrCreate({
                where: { name }
            });

            if(!category)
                return res.json(Status.FAILED);

            await event.addCategory(category);   
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
        return res.json(Status.SUCCESS);
    },
    
    // Atualiza o nome da categoria
    async updateById(req, res) {
        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);
        
        const { id_category } = req.params;
        const { name } = req.body;

        return (!await ModelRepository.updateById(CategoryEntity, id_category, { name }) ? res.json(Status.FAILED) : res.json(Status.SUCCESS));
    },
    // Deleta uma categoria
    async deleteById(req, res){
        const { id_category } = req.params;

        const options = {
            where: { id: id_category },
            include: {
                association: 'events'
            }
        };
        let category;

        try {
            category = await ModelRepository.selectOne(CategoryEntity, options);

            if(!category)
                return res.json(Status.NOT_FOUND);

            // Remove a relação entre esta categoria e os eventos com que ela se relacionava
            if(category.events){
                await category.events.forEach(event => {
                    category.removeEvent(event);
                });
            }

            return (!await category.destroy() ? res.json(Status.FAILED) : res.json(Status.SUCCESS));
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    }
};