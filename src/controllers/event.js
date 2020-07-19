const Event = require ('../db/models/event');
const Institution = require ('../db/models/institution');
const Category = require ('../db/models/category');
const Status = require('../enumerators/status');

module.exports = {
    // Busca todos os eventos e retorna os disponiveis (que não ocorreram ainda)
    async index(req, res) {
        try {
            const systemDate = new Date();
            const events = await Event.findAll();

            var availableEvents = [];

            events.forEach(event => {
                if(event.event_date > systemDate)
                    availableEvents.push(event);
            });
    
            return res.json(availableEvents);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Busca todos os eventos de uma instituição
    async indexByInstitution(req, res){
        const { id_institution } = req.params;
        try {
             const events = await Event.findAll({
                 where: { id_instituicao: id_institution }
             });

             return res.json(events);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Cadastra um novo evento no banco de dados
    async create(req, res) {
        const { id_institution } = req.params;
        const { name, description, category_name, tickets_qty, ticket_val, event_date, event_time, zipcode, num } = req.body;

        const id = id_institution;

        try {
            const institution = await Institution.findByPk(id);
            if(!institution)
                return res.json(Status.NOT_FOUND);

            const [ category ] = await Category.findOrCreate({
                where: { name: category_name }
            });

            const event_data = { name, description, tickets_qty, ticket_val, event_date, event_time, zipcode, num, id_instituicao: id_institution };
            const event = await Event.create(event_data);

            await event.addCategory(category);

            if(!event)
                return res.json(Status.FAILED);

            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Atualiza os dados do evento
    async updateById(req, res) {
        const { id_event } = req.params;
        const { name, description, tickets_qty, ticket_val, event_date, event_time, zipcode, num } = req.body;

        try {
            const event = await Event.findByPk(id_event);
            if(!event)
                return res.json(Status.NOT_FOUND);

            const event_data = { name, description, tickets_qty, ticket_val, event_date, event_time, zipcode, num };

            if(!await event.update(event_data))
                return res.json(Status.FAILED);

            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Deleta um evento
    async deleteById(req, res){
        const { id_event } = req.params;

        try {
            if(!await Event.destroy({ where: { id: id_event } }) == 1)  
                return res.json(Status.FAILED);

            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    }
};