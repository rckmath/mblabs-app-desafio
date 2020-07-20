const UserEntity = require ('../db/models/user');
const Status = require('../enumerators/status');
const bcrypt = require('bcrypt');
const Utils = require('../utilities/utils');
const UserRepository = require('../db/repositories/user');
const EmailUseCheck = require('../middlewares/email-use-check');

module.exports = {
    // Retorna todos os usuários cadastrados
    async index(req, res) {
        const include = {
            association: 'addresses',
            attributes: ['zipcode', 'num'],
        };
        
        const users = await UserRepository.selectAll({ include });
        
        return (!users ? res.json(Status.FAILED) : res.json(users));
    },
    // Cadastra um novo usuário no banco de dados
    async create(req, res) {
        
        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { name, cpf, birthday, email, password, type } = req.body;

        if(await EmailUseCheck(email) == Status.DUPLICATED)
            return res.json(Status.DUPLICATED);

        // Criação do usuário
        try {
            /**
             * Gera hash de senha usando bCrypt
             */
            const saltRounds = 10;
            await bcrypt.hash(password, saltRounds, function(err, hash) {
                if(err)
                    return res.json(Status.FAILED);

                const user_data = { name, cpf, birthday, email, password: hash, type };
                const user = UserRepository.create(user_data);

                if(!user)
                    return res.json(Status.FAILED);
            });
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
        return res.json(Status.SUCCESS);
    },
    // Atualiza data de nascimento de um usuário
    async updateById(req, res){
        const { id_user } = req.params;

        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { birthday } = req.body;
        
        try {
            const user = await UserEntity.findByPk(id_user);

            if(!user)
                return res.json(Status.NOT_FOUND);

            user.birthday = birthday;
            user.save();
                
            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }

    },
    // Delete um usúario
    async deleteById(req, res) {
        const { id_user } = req.params;

        try {
            user = await UserEntity.findByPk(id_user, {
                include: {
                    association: 'addresses',
                },
            });

            if(!user)
                return res.json(Status.NOT_FOUND);

            /**
             * Remove os endereços desse usuário
             */
            if(user.addresses){
                await user.addresses.forEach(address => {
                    address.destroy();
                });
            }

            if(await user.destroy())
                return res.json(Status.SUCCESS);

            return res.json(Status.FAILED);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    }
};