const Institution = require ('../db/models/institution');
const Status = require('../enumerators/status');

module.exports = {
    // Busca todas as instituições cadastradas
    async index(req, res) {
        const institutions = await Institution.findAll();

        return res.json(institutions);
    },
    // Cadastra uma nova instituição no banco de dados
    async create(req, res) {
        const { name, cnpj } = req.body;

        try {
            const institution_data = { name, cnpj };
            const institution = await Institution.create(institution_data);

            if(!institution)
                return res.json(Status.FAILED);
              
            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Atualiza o nome da instituição
    async updateById(req, res) {
        const { id, name } = req.body;

        try {
            const institution = await Institution.findByPk(id);

            if(!institution)
                return res.json(Status.NOT_FOUND);

            institution.name = name;
            await institution.save();

            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Deleta uma instituição
    async deleteById(req, res){
        const { id } = req.body;

        try {
            if(await Institution.destroy({ where: { id } }) == 1)
                return res.json(Status.SUCCESS);
            return res.json(Status.FAILED);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    }
};