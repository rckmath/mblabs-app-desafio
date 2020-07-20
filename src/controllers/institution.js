const InstitutionEntity = require ('../db/models/institution');
const Status = require('../enumerators/status');
const Utils = require('../utilities/utils');

module.exports = {
    
    // Busca todas as instituições cadastradas
    async index(req, res) {
        const institutions = await InstitutionEntity.findAll({
            attributes: {
                exclude: Utils.excludeAttributes
            }
        });

        return res.json(institutions);
    },
    // Cadastra uma nova instituição no banco de dados
    async create(req, res) {
        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { name, cnpj } = req.body;

        try {
            const institution_data = { name, cnpj };
            const institution = await InstitutionEntity.create(institution_data);

            if(!institution)
                return res.json(Status.FAILED);
              
            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Atualiza o nome da instituição
    async updateById(req, res) {
        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { id, name } = req.body;

        try {
            const institution = await InstitutionEntity.findByPk(id);

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
        const { id_institution } = req.params;

        try {
            const institution = await InstitutionEntity.findByPk(id_institution, {
                include: {
                    association: 'events',
                }
            });

            if(!institution)
                return res.json(Status.NOT_FOUND);

            /**
             * Desvincula os eventos (passados) deste instituicao sem apagá-los
             */
            if(institution.events){
                await institution.events.forEach(event => {
                    event.id_instituicao = null;
                    event.save();
                });
            }

            if(!await InstitutionEntity.destroy({ where: { id: id_institution } }) == 1)
                return res.json(Status.FAILED);

            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    }
};