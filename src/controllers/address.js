const AddressEntity = require ('../db/models/address');
const UserEntity = require('../db/models/user');
const Status = require('../enumerators/status');
const Utils = require('../utilities/utils');
const ModelRepository = require('../db/repositories/models');

module.exports = {
    // Endereços por usuário
    async index(req, res) {
        const { id_user } = req.params;
        const options = {
            where: { id: id_user },
            include: {
                association: 'addresses',
                attributes: ['id', 'zipcode', 'num']
            }
        }
        const user = await ModelRepository.selectOne(UserEntity, options);

        return (!user ? res.json(Status.NOT_FOUND) : res.json(user.addresses));
    },
    // Cadastra um novo endereço no banco de dados
    async create(req, res) {
        const { id_user } = req.params;

        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { zipcode, num } = req.body;
        const where = { id: id_user };
        const address_data = { zipcode, num, id_usuario: id_user };
        let user;
        let address;
        
        try {
            user = await ModelRepository.selectOne(UserEntity, { where });

            if (!user)
                return res.json(Status.NOT_FOUND);

            address = await ModelRepository.create(AddressEntity, address_data);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
        return (!address ? res.json(Status.FAILED) : res.json(Status.SUCCESS));
    },
    async updateById(req, res) {
        const { id_user, id_address } = req.params;

        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const data = { zipcode, num } = req.body;
        const options = {
            where: { id: id_user },
            include: {
                association: 'addresses',
                where: { id: id_address },
                required: true,
            },
        }

        let user;
        try {
            // Consulta se o endereço é pertencente ao usuário que fez a requisição
            user = await ModelRepository.selectOne(UserEntity, options)

            if(!user)
                return res.json(Status.NOT_FOUND);

            return (!await ModelRepository.updateById(AddressEntity, id_address, data) ? res.json(Status.FAILED) : res.json(Status.SUCCESS));
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    async deleteById(req, res) {
        const { id_user, id_address } = req.params;

        const options = {
            where: { id: id_user },
            include: {
                association: 'addresses',
                where: { id: id_address },
                required: true,
            },
        }

        try {
            // Consulta se o endereço é pertencente ao usuário que fez a requisição
            const user = await ModelRepository.selectOne(UserEntity, options);

            if(!user)
                return res.json(Status.NOT_FOUND);

            if(await AddressEntity.destroy({ where: { id: id_address } }) == 1)
                return res.json(Status.SUCCESS);
            
            return res.json(Status.FAILED);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
};