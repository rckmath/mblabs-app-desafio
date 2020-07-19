const UserEntity = require ('../db/models/user');
const AddressController = require('../controllers/address');
const Status = require('../enumerators/status');
const bcrypt = require('bcrypt');
const Utils = require('../utilities/utils');

module.exports = {
    // Busca todos os usuários cadastrados
    async index(req, res) {
        const users = await UserEntity.findAll({
            include: {
                association: 'addresses',
                attributes: ['zipcode', 'num'],
            },
            attributes: {
                exclude: [].concat(Utils.excludeAttributes, 'password')
            }
        });

        return res.json(users);
    },
    // Cadastra um novo usuário no banco de dados
    async create(req, res) {
        const { name, cpf, birthday, email, password, type } = req.body;
        
        /**
         * Verifica se usuário já está cadastrado
         */
        try {
            exists = await UserEntity.findOne({ 
                where: { email },
            });
            
            if(exists)
                return res.json (Status.DUPLICATED);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }

        // Criação do usuário
        try {
            /**
             * Gera hash de senha usando bCrypt
             */
            const saltRounds = 10;
            await bcrypt.hash(password, saltRounds, function(err, hash) {
                if(err)
                    res.json(Status.FAILED);

                const user_data = { name, cpf, birthday, email, password: hash, type };
                const user = UserEntity.create(user_data);

                if(!user)
                    return res.json(Status.FAILED);
                return res.json(Status.SUCCESS);
            });
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
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