const Category = require ('../db/models/category');
const Status = require('../enumerators/status');

module.exports = {
    // Busca todas as categoria cadastradas
    async index(req, res) {
        const categories = await Category.findAll();

        return res.json(categories);
    },
    // Cadastra uma nova categoria no banco de dados
    async create(req, res) {
        const { id_event } = req.params;
        const { name } = req.body;

        try {
            const category_data = { name, cnpj };
            const category = await Category.create(institution_data);

            if(!institution)
                return res.json(Status.FAILED);
              
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