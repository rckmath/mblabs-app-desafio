const Address = require ('../db/models/address');
const User = require('../db/models/user');

module.exports = {
    // Cadastra um novo usuário no banco de dados
    async create(req, res) {
        const { id_user } = req.params;
        const { zipcode, num } = req.body;

        try {
            const user = await User.findByPk(id_user);

            if (!user)
                return res.status(400).json({ status: 'Usuário não encontrado!' });

            const address = await Address.create({
                zipcode: zipcode,
                num: num,
                id_usuario: id_user,
            });
              
            return res.json(address);
        } catch (err) {
            return res.json({ err });
        }
    }
};