const Category = require ('../db/models/category');
const Event = require ('../db/models/event');
const Status = require('../enumerators/status');

module.exports = {
    // Retorna todas as categorias e os eventos relacionados a elas.
    async index(req, res) {
        const categories = await Category.findAll({
            include: {
                association: 'events',
                attributes: {
                    exclude: ['id', 'id_instituicao', 'createdAt', 'updatedAt'],
                },
                through: { 
                    attributes: []
                } 
            },
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt'],
            }
        });

        return res.json(categories);
    },
    // Relaciona uma categoria a um evento
    async create(req, res) {
        const { id_event } = req.params;
        const { name } = req.body;

        try {
            const event = await Event.findByPk(id_event);

            if(!event)
                return res.json(Status.NOT_FOUND);

            const [ category ] = await Category.findOrCreate({
                where: { name }
            });

            console.log("alou");

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
            const category = await Category.findByPk(id);

            if(!category)
                return res.json(Status.NOT_FOUND);

            category.name = name;
            await category.save();

            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Deleta uma instituição
    async deleteById(req, res){
        const { id } = req.body;

        try {
            if(await category.destroy({ where: { id } }) == 1)
                return res.json(Status.SUCCESS);
            return res.json(Status.FAILED);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    }
};