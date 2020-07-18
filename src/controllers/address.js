const Address = require ('../db/models/address');
const User = require('../db/models/user');
const Status = require('../enumerators/status');

module.exports = {
    // Cadastra um novo endereço no banco de dados
    async create(req, res) {
        const { id_user } = req.params;
        const { zipcode, num } = req.body;

        try {
            const user = await User.findByPk(id_user);
            
            if (!user)
                return res.status(400).json({ status: 'Usuário não encontrado!' });

            address_data = { zipcode, num, id_usuario: id_user };

            const address = await Address.create(address_data);
              
            return res.json(address);
        } catch (err) {
            return res.json(err);
        }
    }
};