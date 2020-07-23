const EventEntity = require ('../db/models/event');
const InstitutionEntity = require ('../db/models/institution');
const CategoryEntity = require ('../db/models/category');
const ModelRepository = require('../db/repositories/models');
const Status = require('../enumerators/status');
const Utils = require('../utilities/utils');
const moment = require('moment-timezone');
const { Op } = require('sequelize');

module.exports = {
    // Busca todos os eventos e retorna os disponiveis (que não ocorreram ainda)
    async index(req, res) {
        const options = {
            where: {
                event_date: { [Op.gt]: moment().toDate() },
                tickets_qty: { [Op.gte]: 1 }
            },
            include: {
                association: 'categories',
                attributes: ['id', 'name'],
                through: { attributes: [] },
            },
        }

        return res.json(await ModelRepository.selectAll(EventEntity, options));
    },
    // Cadastra um novo evento no banco de dados
    async create(req, res) {
        const { id_institution } = req.params;

        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { name, description, category_name, tickets_qty, ticket_val, event_date, event_time, zipcode, num } = req.body;
        const where = { id: id_institution };
        let event;

        try {
            // Verifica se a instituição existe
            if(!await ModelRepository.selectOne(InstitutionEntity, { where }))
                return res.json(Status.NOT_FOUND);

            // Cria categoria
            const [ category ] = await CategoryEntity.findOrCreate({ where: { name: category_name } });
            if(!category)
                return res.json(Status.FAILED);

            const event_data = { name, description, tickets_qty, ticket_val, event_date, event_time, zipcode, num, id_instituicao: id_institution };
            event = await ModelRepository.create(EventEntity, event_data);

            if(!event)
                return res.json(Status.FAILED);

            // Associa categoria ao evento criado
            await event.addCategory(category);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
        return res.json(Status.SUCCESS);
    },
    // Atualiza os dados do evento
    async updateById(req, res) {
        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);
        
        const { id_event } = req.params;
        const event_data = { name, description, tickets_qty, ticket_val, event_date, event_time, zipcode, num } = req.body;

        return (!await ModelRepository.updateById(EventEntity, id_event, event_data) ? res.json(Status.FAILED) : res.json(Status.SUCCESS));
    },
    // Deleta um evento
    async deleteById(req, res){
        const { id_event } = req.params;

        const options = {
            where: { id: id_event },
            include: {
                association: 'categories'
            } 
        };
        let event;

        try {
            event = await ModelRepository.selectOne(EventEntity, options);

            if(!event)
                return res.json(Status.NOT_FOUND);

            // Remove a relação entre este evento e as categorias com que ele se relacionava
            if(event.categories){
                await event.categories.forEach(category => {
                    event.removeCategory(category);
                });
            }

            return (!await event.destroy() ? res.json(Status.FAILED) : res.json(Status.SUCCESS));
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    }
};