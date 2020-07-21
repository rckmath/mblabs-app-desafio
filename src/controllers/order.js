const OrderEntity = require('../db/models/order');
const EventEntity = require('../db/models/event');
const UserEntity = require('../db/models/user');
const TicketEntity = require('../db/models/ticket');
const OrderItemEntity = require('../db/models/orderitem');
const ModelRepository = require('../db/repositories/models');
const Status = require('../enumerators/status');
const Utils = require('../utilities/utils');
const { Op } = require('sequelize');

module.exports = {
    // Lista todos os pedidos por usuario
    async index(req, res) {
        const include = {
            association: 'user',
            attributes: {
                exclude: [].concat(Utils.excludeAttributes, 'password')
            }
        };

        return res.json(await ModelRepository.selectAll(OrderEntity, { include }));
    },
    async indexByUser(req, res) {
        const { id_user } = req.params;
        const options = { 
            where: { id: id_user },
            include: {
                association: 'orders',
                attributes: {
                    exclude: [].concat(Utils.excludeAttributes, 'id_usuario')
                }
            }
        };

        const user = await ModelRepository.selectOne(UserEntity, options);

        return res.json(user.orders);

    },
    // Cadastra um novo pedido no banco de dados
    async create(req, res) {
        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { id_user } = req.params;
        const { order_date, user_note, event_name, item_qty } = req.body;
        let where = { id: id_user }
        let event;
        let order;
        let orderitem;

        try {
            if(!await ModelRepository.selectOne(UserEntity, { where }))
                return res.json(Status.NOT_FOUND);

            where = {
                name: event_name,
                tickets_qty: { [Op.gte]: item_qty }
            }

            if(!(event = await ModelRepository.selectOne(EventEntity, { where })))
                return res.json(Status.UNAUTHORIZED);

            const order_val = event.ticket_val * item_qty; // Qtd de tickets * valor unitário = valor total da ordem
            const order_data = { order_val, order_date, user_note, order_status: Status.PENDING, id_usuario: id_user };

            if(!(order = await ModelRepository.create(OrderEntity, order_data)))
                return res.json(Status.FAILED);

            const orderitem_data = { item_qty, total_value: order_val, id_pedido: order.id, id_evento: event.id };
            if(!(orderitem = await ModelRepository.create(OrderItemEntity, orderitem_data)))
                return res.json(Status.FAILED);

            event.tickets_qty = event.tickets_qty - item_qty;
            await event.save();

            const ticket_data = { id_usuario: id_user, id_item_pedido: orderitem.id,  };

            for(var i = 0; i < item_qty; i++)
                if(!await ModelRepository.create(TicketEntity, ticket_data))
                    return res.json(Status.FAILED);

            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Atualiza os dados do pedido
    async updateById(req, res) {
        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { id_order } = req.params;
        const order_data = { order_val, order_date, user_note, order_status } = req.body;

        return (!await ModelRepository.updateById(OrderEntity, id_order, order_data) ? res.json(Status.FAILED) : res.json(Status.SUCCESS));
    },
    // Deleta um pedido
    async deleteById(req, res){
    
    }
};