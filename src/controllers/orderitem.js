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
    // Cria um novo item associando ele com um pedido
    async create(req, res) {
        const { id_user, id_order } = req.params;
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

            if(!orderitem)
                return res.json(Status.FAILED);

            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Atualiza os dados do item
    async updateById(req, res) {
        try {
        
            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Deleta um item de um pedido
    async deleteById(req, res){
        const { id_order, id_orderitem } = req.params;
        try {
            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    }
};