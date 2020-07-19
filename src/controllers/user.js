const User = require ('../db/models/user');
const Status = require('../enumerators/status');
const bcrypt = require('bcrypt');

module.exports = {
    // Busca todos os usuários cadastrados
    async index(req, res) {
        const users = await User.findAll({
            include: {
                association: 'addresses',
                attributes: ['zipcode', 'num'],
            },
            attributes: {
                exclude: ['createdAt', 'updateAt', 'password']
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
            exists = await User.findOne({ 
                where: { email },
            });
            
            if(exists)
                return res.json (Status.DUPLICATED);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }

        /**
         * Criação do usuário
         */
        try {
            /**
             * Gera hash de senha usando bCrypt
             */
            const saltRounds = 10;
            await bcrypt.hash(password, saltRounds, function(err, hash) {
                if(err)
                    res.json(Status.FAILED);

                const user_data = { name, cpf, birthday, email, password: hash, type };
                console.log(user_data);

                const user = User.create(user_data);

                if(!user)
                    return res.json(Status.FAILED);
                return res.json(Status.SUCCESS);
            });
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
};