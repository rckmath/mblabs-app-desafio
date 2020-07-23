const EventEntity = require('../db/models/event');
const UserEntity = require('../db/models/user');
const OrderEntity = require('../db/models/order');
const OrderItemEntity = require('../db/models/orderitem');
const TicketEntity = require('../db/models/ticket');
const ModelRepository = require('../db/repositories/models');
const Status = require('../enumerators/status');
const Utils = require('../utilities/utils');
const { Op } = require('sequelize');

module.exports = {
    // Retorna todos os itens de um pedido
    async index(req, res) {
        const { id_order } = req.params;
        const orderitemExcludeId = ['id_evento', 'id_pedido'];

        options = {
            where: { id: id_order },
            include: {
                association: 'items',
                attributes: {
                    exclude: [].concat(Utils.excludeAttributes, orderitemExcludeId)
                },
                include: {
                    association: 'event',
                    attributes: {
                        exclude: [].concat(Utils.excludeAttributes, 'tickets_qty')
                    }
                }
            },
        };

        return res.json(await ModelRepository.selectOne(OrderEntity, options));
    },
    // Insere um novo item em um pedido
    async create(req, res) {
        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { id_user, id_order } = req.params;
        const { name, item_qty } = req.body;
        const options = {
            where: { id: id_user },
            include: {
                association: 'orders',
                where: { id: id_order },
                required: true,
            }
        };
        let user;
        let event;
        try {
            if(!(user = await ModelRepository.selectOne(UserEntity, options)))
                return res.json(Status.NOT_FOUND);

            const where = {
                name,
                tickets_qty: { [Op.gte]: item_qty },
            };

            if(!(event = await ModelRepository.selectOne(EventEntity, { where })))
                return res.json(Status.NOT_FOUND);

            const total_value = event.ticket_val * item_qty;
            const orderitem_data = { item_qty, total_value, id_pedido: id_order, id_evento: event.id };
            const orderitem = await ModelRepository.create(OrderItemEntity, orderitem_data);

            if(!orderitem)
                res.json(Status.FAILED);

            // Atualiza valor do pedido e a quantidade de ingressos disponíveis do evento
            try {
                user.orders[0].order_val = (user.orders[0].order_val * 1.0)  + total_value;
                user.orders[0].save();
                event.tickets_qty = event.tickets_qty - item_qty;
                event.save();

                const ticket_data = { id_usuario: id_user, id_item_pedido: orderitem.id,  };

                for(var i = 0; i < item_qty; i++)
                    if(!await ModelRepository.create(TicketEntity, ticket_data))
                        return res.json(Status.FAILED);
                        
            } catch (err) {
                return res.json(err)
            }
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
        return res.json(Status.SUCCESS);
    },
    // Atualiza os dados do item
    async updateById(req, res) {
        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { id_user, id_order, id_item } = req.params;
        const { item_qty } = req.body;
        const options = {
            where: { id: id_user },
            include: {
                association: 'orders',
                where: { id: id_order },
                required: true,
                include: {
                    association: 'items',
                    where: { id: id_item },
                    required: true,
                }
            }
        };
        let user;
        let event;

        try {
            if(!(user = await ModelRepository.selectOne(UserEntity, options)))
                return res.json(Status.NOT_FOUND); 
            
            const where = { id: user.orders[0].items[0].id_evento };

            // Busca o evento relacionado ao item do pedido
            if(!(event = await ModelRepository.selectOne(EventEntity, { where })))
                return res.json(Status.NOT_FOUND);

            // Verifica se há ingressos disponíveis
            if(!event.tickets_qty >= item_qty)
                return res.json(Status.UNAUTHORIZED);

            const total_value = (user.orders[0].items[0].item_qty - item_qty) * event.ticket_val;

            // Atualiza valor do pedido e quantidade de ingressos disponíveis do evento
            try {
                user.orders[0].order_val = (user.orders[0].order_val * 1.0)  + total_value;
                user.orders[0].save();
                event.tickets_qty = event.tickets_qty - item_qty;
                event.save();
            } catch (err) {
                return res.json({ status: Status.FAILED, error: err });
            }
           
            return (!await ModelRepository.updateById(OrderItemEntity, id_item, { item_qty }) ? res.json(Status.FAILED) : res.json(Status.SUCCESS));
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Deleta um item de um pedido
    async deleteById(req, res){
        const { id_user, id_order, id_item } = req.params;
        try {
            // Verifica se usuário existe, se o pedido pertence a ele e se o item pertence ao seu pedido
            const user = await UserEntity.findByPk(id_user, {
                include: {
                    association: 'orders',
                    where: { id: id_order },
                    required: true,
                    include: {
                        association: 'items',
                        where: { id: id_item },
                        required: true,
                    }
                }
            });

            if(!user)
                return res.json(Status.NOT_FOUND);

            if(await OrderItemEntity.destroy({ where: { id: id_item }}) == 1)
                return res.json(Status.SUCCESS);

            return res.json(Status.FAILED);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    }
};