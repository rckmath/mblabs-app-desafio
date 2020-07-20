const EventEntity = require('../db/models/event');
const UserEntity = require('../db/models/user');
const OrderEntity = require('../db/models/order');
const OrderItemEntity = require('../db/models/orderitem');
const Status = require('../enumerators/status');
const Utils = require('../utilities/utils');

module.exports = {
    // Retorna todos os itens de um pedido
    async index(req, res) {
        const { id_order } = req.params;

        const orderitemExcludeId = ['id_evento', 'id_pedido'];

        try {
            order = await OrderEntity.findByPk(id_order, {
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
                }
            });

            if(!order)
                return res.json(Status.NOT_FOUND);

            return res.json(order.items);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Insere um novo item em um pedido
    async create(req, res) {
        const { id_user, id_order } = req.params;

        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);
        
        const { name, item_qty } = req.body;

        try {
            // Verifica se usuário existe e se a ordem pertence a ele
            const user = await UserEntity.findByPk(id_user, {
                include: {
                    association: 'orders',
                    where: { id: id_order },
                    required: true,
                }
            });

            if(!user)
                return res.json(Status.NOT_FOUND);

            const event = await EventEntity.findOne({
                where: { name }
            })
            
            if(!event)
                return res.json(Status.NOT_FOUND);

            if(event.tickets_qty < item_qty)
                return res.json(Status.UNAUTHORIZED);

            const total_value = event.ticket_val * item_qty;

            const orderitem_data = { item_qty, total_value, id_pedido: id_order, id_evento: event.id };
            const orderitem = await OrderItemEntity.create(orderitem_data);

            return (!orderitem ? res.json(Status.FAILED) : res.json(Status.SUCCESS));

        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Atualiza os dados do item
    async updateQty(req, res) {
        const { id_user, id_order, id_item } = req.params;

        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { item_qty } = req.body;

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

            

        
            return res.json(Status.SUCCESS);
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