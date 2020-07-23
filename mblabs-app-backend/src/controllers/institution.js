const ModelRepository = require('../db/repositories/models');
const EventEntity = require ('../db/models/event');
const InstitutionEntity = require ('../db/models/institution');
const Status = require('../enumerators/status');
const Utils = require('../utilities/utils');

module.exports = {
    
    // Busca todas as instituições cadastradas
    async index(req, res) {
        return res.json(await ModelRepository.selectAll(InstitutionEntity));
    },
    // Busca todos os eventos de uma instituição
    async indexEventsByInstitution(req, res){
        const { id_institution } = req.params;
        const where = { id_instituicao: id_institution };

        return res.json(await ModelRepository.selectAll(EventEntity, { where }));
    },
    // Cadastra uma nova instituição no banco de dados
    async create(req, res) {
        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const institution_data = { name, cnpj } = req.body;

        return (!await ModelRepository.create(InstitutionEntity, institution_data) ? res.json(Status.FAILED) : res.json(Status.SUCCESS));
    },
    // Atualiza nome e/ou CNPJ da instituição
    async updateById(req, res) {
        if(Utils.bodyVerify(req) === 1)
        return res.json(Status.CANCELED);
    
        const { id_institution } = req.params;
        const { name, cnpj } = req.body;

        return (!await ModelRepository.updateById(InstitutionEntity, id_institution, { name, cnpj }) ? res.json(Status.FAILED) : res.json(Status.SUCCESS));
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