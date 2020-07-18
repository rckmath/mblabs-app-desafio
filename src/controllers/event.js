const Event = require ('../db/models/event');
const Institution = require ('../db/models/institution');
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
            return res.json(Status.FAILED);
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
            return res.json(Status.FAILED);
        }
    },
    // Cadastra um novo evento no banco de dados
    async create(req, res) {
        const { id_institution } = req.params;
        const { name, description, category, tickets_qty, ticket_val, event_date, event_time, zipcode, num } = req.body;

        const id = id_institution;

        try {
            const institution = await Institution.findByPk(id);
            if(!institution)
                return res.json(Status.NOT_FOUND);

            const event_data = { name, description, tickets_qty, ticket_val, event_date, event_time, zipcode, num, id_instituicao: id_institution };

            const event = await Event.create(event_data);

            Event.addCategory(category);

            if(!event)
                return res.json(Status.FAILED);

            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json(Status.FAILED);
        }
    },
    // Atualiza os dados do evento
    async updateById(req, res) {
        const { id, name, description, tickets_qty, ticket_val, event_date, event_time, zipcode, num } = req.body;

        try {
            const event = await Event.findByPk(id);
            if(!event)
                return res.json(Status.NOT_FOUND);

            const event_data = { id, name, description, tickets_qty, ticket_val, event_date, event_time, zipcode, num };
            
            if(name)
                event.name = name;
            
            if(description)
                event.description = description;
            
            if(tickets_qty)
                event.tickets_qty = tickets_qty;

            if(ticket_val)
                event.ticket_val = ticket_val;

            if(event_date)
                event.event_date = event_date;

            if(event_time)
                event.event_time = event_time;

            if(zipcode)
                event.zipcode = zipcode;
            
            if(num)
                event.num = num;
            
            await event.save();

            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json(err);
        }
    },
    // Deleta um evento
    async deleteById(req, res){
        const { id } = req.body;

        try {
            if(await Event.destroy({ where: { id } }) == 1)
                return res.json(Status.SUCCESS);
            return res.json(Status.FAILED);
        } catch (err) {
            return res.json(Status.FAILED, err);
        }
    }
};