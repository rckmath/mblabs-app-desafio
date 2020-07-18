const User = require ('../db/models/user');

module.exports = {
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
                return res.json ({ status: "Endereço de e-mail já está cadastrado!" });
        } catch (err) {
            return res.status(400).json({ err });
        }

        const user_data = { name, cpf, birthday, email, password, type };
        const user = await User.create(user_data);

        return res.json(user);
    }
};