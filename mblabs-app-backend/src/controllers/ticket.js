const UserEntity = require ('../db/models/user');
const OrderItemEntity = require('../db/models/orderitem');
const TicketEntity = require('../db/models/ticket');
const Status = require('../enumerators/status');
const Utils = require('../utilities/utils');
const ModelRepository = require('../db/repositories/models');
const { Op } = require('sequelize');
const moment = require('moment-timezone');

module.exports = {
    // Retorna todos os ingressos válidos de um usuário
    async index(req, res) {
        const { id_user } = req.params;
        const options = {
            where: { id: id_user },
            include: {
                association: 'tickets',
                // where: { used_at: { [Op.is]: null } },
                attributes: { exclude: [].concat(Utils.excludeAttributes, 'id_usuario') },
                include: {
                    association: 'orderitem',
                    attributes: ['id_pedido', 'id_evento'],
                    include: {
                        association: 'event',
                        attributes: {
                            exclude: [].concat(Utils.excludeAttributes, 'tickets_qty', 'id')
                        }
                    }
                }
            },
        };
        return res.json(await ModelRepository.selectAll(UserEntity, options));
    },
    // Cria um novo ingresso no banco de dados
    async create(req, res) {
        const { id_user, id_item } = req.params;
        const data = { id_usuario: id_user, id_item_pedido: id_item };
        const where = { id: id_item };

        const orderitem = await ModelRepository.selectOne(OrderItemEntity, { where });
        
        for(var i = 0; i < orderitem.item_qty; i++)
            if(!await ModelRepository.create(TicketEntity, data))
                return res.json(Status.FAILED);

        return res.json(Status.SUCCESS);
    },
    // Atualiza validade do ingresso
    async updateById(req, res){
        const { id_ticket } = req.params;

        return (!await ModelRepository.updateById(TicketEntity, id_ticket, { used_at: moment().toDate() }) ? res.json(Status.FAILED) : res.json(Status.SUCCESS));
    },
    // Delete um ingresso
    async deleteById(req, res) {
        
    }
};