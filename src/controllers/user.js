const User = require ('../db/models/user');
const Status = require('../enumerators/status');

module.exports = {
    // Busca todos os usuários cadastrados
    async index(req, res) {
        const users = await User.findAll();

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
            return res.status(400).json(Status.FAILED, err);
        }

        /**
         * Criação do usuário
         */
        try {
            const user_data = { name, cpf, birthday, email, password, type };
            const user = await User.create(user_data);

            if(!user)
                return res.json(Status.FAILED);

            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.status(400).json(Status.FAILED, err)
        }
    }
};