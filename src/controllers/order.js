const OrderEntity = require('../db/models/order');
const EventEntity = require('../db/models/event');
const UserEntity = require('../db/models/user');
const TicketEntity = require('../db/models/ticket');
const OrderItemEntity = require('../db/models/orderitem');
const Status = require('../enumerators/status');
const Utils = require('../utilities/utils');

module.exports = {
    // Busca todos os pedidos por usuario
    async index(req, res) {
        try {
            const orders = await OrderEntity.findAll({
                attributes: {
                    exclude: [].concat(Utils.excludeAttributes, 'id_usuario')

                },
                include: {
                    association: 'user',
                    attributes: {
                        exclude: [].concat(Utils.excludeAttributes, 'password')
                    }
                }
            });
    
            return res.json(orders);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Cadastra um novo pedido no banco de dados
    async create(req, res) {
        const { id_user } = req.params;

        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);
            
        const { order_date, user_note, event_name, item_qty } = req.body;

        try {
            const user = await UserEntity.findByPk(id_user);
            if(!user)
                return res.json(Status.NOT_FOUND);

            const event = await EventEntity.findOne({
                where: { name: event_name }
            })

            if(!event)
                return res.json(Status.NOT_FOUND);

            if(event.tickets_qty < item_qty)
                return res.json(Status.UNAUTHORIZED);

            const total_value = event.ticket_val * item_qty;

            const order_data = { order_val: total_value, order_date, user_note, order_status: Status.PENDING, id_usuario: id_user };
            const order = await OrderEntity.create(order_data);

            const orderitem_data = { item_qty, total_value, id_pedido: order.id, id_evento: event.id };
            const orderitem = await OrderItemEntity.create(orderitem_data);

            if(!orderitem)
                return res.json(Status.FAILED);

            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Atualiza os dados do pedido
    async updateById(req, res) {
        const { id_event } = req.params;

        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { name, description, tickets_qty, ticket_val, event_date, event_time, zipcode, num } = req.body;

        try {
            const event = await EventEntity.findByPk(id_event);
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
    // Deleta um pedido
    async deleteById(req, res){
        const { id_event } = req.params;
        try {
            const event = await EventEntity.findByPk(id_event, {
                include: {
                    association: 'categories'
                }
            });

            if(!event)
                return res.json(Status.NOT_FOUND);

            /**
             * Remove a relação entre este evento e as categorias com que ele se relacionava
             */
            if(event.categories){
                await event.categories.forEach(category => {
                    event.removeCategory(category);
                });
            }

            if(await EventEntity.destroy({ where: { id: id_event } }) == 1)
                return res.json(Status.SUCCESS);
            
            return res.json(Status.FAILED);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    }
};