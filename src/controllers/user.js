const UserEntity = require ('../db/models/user');
const Status = require('../enumerators/status');
const bcrypt = require('bcrypt');
const Utils = require('../utilities/utils');
const ModelRepository = require('../db/repositories/models');

module.exports = {
    // Retorna todos os usuários cadastrados
    async index(req, res) {
        const include = {
            association: 'addresses',
            attributes: ['zipcode', 'num'],
        };

        return res.json(await ModelRepository.selectAll(UserEntity, { include }));
    },
    // Cadastra um novo usuário no banco de dados
    async create(req, res) {
        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { name, cpf, birthday, email, password, type } = req.body;

        if(await Utils.emailAlreadyInUse(email) == Status.DUPLICATED)
            return res.json(Status.DUPLICATED);

        // Gera hash de senha usando bCrypt
        const saltRounds = 10;
        await bcrypt.hash(password, saltRounds, function(err, hash) {
            if(err)
                return res.json({ status: Status.FAILED, error: err });

            const user_data = { name, cpf, birthday, email, password: hash, type };

            return (!ModelRepository.create(UserEntity, user_data) ? res.json(Status.FAILED) : res.json(Status.SUCCESS));
        });
    },
    // Atualiza data de nascimento de um usuário
    async updateById(req, res){
        const { id_user } = req.params;

        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const data = { birthday } = req.body;

        return (!await ModelRepository.updateById(UserEntity, id_user, data) ? res.json(Status.NOT_FOUND) : res.json(Status.SUCCESS));
    },
    // Delete um usúario
    async deleteById(req, res) {
        const { id_user } = req.params;
        const options = {
            where: { id: id_user },
            association: 'addresses',
        }
        try {
            user = await ModelRepository.selectOne(UserEntity, options)

            if(!user)
                return res.json(Status.NOT_FOUND);

            // Remove os endereços desse usuário
            if(user.addresses){
                await user.addresses.forEach(address => {
                    address.destroy();
                });
            }

            return (!await user.destroy() ? res.json(Status.FAILED) : res.json(Status.SUCCESS));
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    }
};