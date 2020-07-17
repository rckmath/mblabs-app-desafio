const User = require ('../db/models/user');
const Costumer = require('../db/models/costumer');
const CostumerAddress = require('../db/models/costumer-address');

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = { 

    // Cadastra um novo usuário no banco de dados
    async create(req, res) {
        const { name, cpf, birthday, email, pass, postal_code, num, profile_type} = req.body;
        
        /**
         * Agrupando dados por tabela
         */ 
        const costumer_data = { name, cpf, birthday };
        const user_data = { email, pass };
        const address_data = { postal_code, num };

        try {
            exists = await User.findOne({ 
                where: { email },
            });

            console.log("Aqui");
            if(exists)
                return res.json ({ status: "Este endereço de e-mail já está cadastrado!" });
        } catch (err) {
            return res.status(400).json({ status: err });
        }

        console.log("passou");

        try {
            const costumer = await Costumer.create(costumer_data); 
            const costumer_address = await CostumerAddress.create(address_data);

            await bcrypt.hash(user.pass, saltRounds, function(err, hash) {
                const user = User.create(user_data);
            });
        } catch (err) {
            return res.json({ status: "Falha na criação do usuário: " + err });
        }
        
        return res.json({ status: "Cadastrado com sucesso!" });
    }
};