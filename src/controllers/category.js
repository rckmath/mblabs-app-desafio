const CategoryEntity = require ('../db/models/category');
const EventEntity = require ('../db/models/event');
const Status = require('../enumerators/status');
const Utils = require('../utilities/utils');

module.exports = {
    // Retorna todas as categorias e os eventos relacionados a elas.
    async index(req, res) {
        const categories = await CategoryEntity.findAll({
            include: {
                association: 'events',
                attributes: {
                    exclude: 'id' + 'id_instituicao' + Utils.excludeAttributes,
                },
                through: { 
                    attributes: []
                } 
            },
            attributes: {
                exclude: 'id' + Utils.excludeAttributes,
            }
        });

        return res.json(categories);
    },
    // Relaciona uma categoria a um evento
    async create(req, res) {
        const { id_event } = req.params;

        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { name } = req.body;

        try {
            const event = await EventEntity.findByPk(id_event);

            if(!event)
                return res.json(Status.NOT_FOUND);

            const [ category ] = await CategoryEntity.findOrCreate({
                where: { name }
            });

            if(!category)
                return res.json(Status.FAILED);

            await event.addCategory(category);
              
            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    
    // Atualiza o nome da categoria
    async updateById(req, res) {
        const { id, name } = req.body;

        try {
            const category = await CategoryEntity.findByPk(id);

            if(!category)
                return res.json(Status.NOT_FOUND);

            category.name = name;
            await category.save();

            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Deleta uma categoria
    async deleteById(req, res){
        const { id_category } = req.params;

        try {
            return res.json(Status.FAILED);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    }
};