const AddressEntity = require ('../db/models/address');
const UserEntity = require('../db/models/user');
const Status = require('../enumerators/status');

module.exports = {
    // Endereços por usuário
    async index(req, res) {
        const { id_user } = req.params;
        
        try {
            const user = await UserEntity.findByPk(id_user, {
                include: {
                    association: 'addresses',
                    attributes: ['zipcode', 'num'],
                },
            });
    
            if(!user)
                return res.json(Status.NOT_FOUND);
            
            return res.json(user.addresses);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    // Cadastra um novo endereço no banco de dados
    async create(req, res) {
        const { id_user } = req.params;

        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { zipcode, num } = req.body;

        try {
            const user = await UserEntity.findByPk(id_user);
            
            if (!user)
                return res.json(Status.NOT_FOUND);

            address_data = { zipcode, num, id_usuario: id_user };

            const address = await AddressEntity.create(address_data);

            if(!address)
                return res.json(Status.FAILED);
              
            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    async updateById(req, res) {
        const { id_user, id_address } = req.params;

        if(Utils.bodyVerify(req) === 1)
            return res.json(Status.CANCELED);

        const { zipcode, num } = req.body;

        try {
            let auth = false;

            /**
             * Consulta se o endereço é pertencente ao usuário que fez a requisição
             */
            const user = await UserEntity.findByPk(id_user, {
                include: {
                    association: 'addresses',
                },
            });

            if(!user)
                return res.json(Status.NOT_FOUND);

            // Verifica se o ID se encontram em algum dos endereços do usuário
            user.addresses.forEach(address => {
                const { dataValues } = address;
                if(dataValues.id == id_address)
                    auth = true;
            });

            if(!auth)
                return res.json(Status.UNAUTHORIZED);

            if(!await AddressEntity.update({ zipcode, num }, { where: { id: id_address } }))
                return res.json(Status.FAILED);

            return res.json(Status.SUCCESS);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
    async deleteById(req, res) {
        const { id_user, id_address } = req.params;

        try {
            let auth = false;
            
            /**
            * Consulta se o endereço é pertencente ao usuário que fez a requisição
            */
            const user = await UserEntity.findByPk(id_user, {
                include: {
                    association: 'addresses',
                },
            });

            if(!user)
                return res.json(Status.NOT_FOUND);

            // Verifica se o ID se encontram em algum dos endereços do usuário
            user.addresses.forEach(address => {
                const { dataValues } = address;
                if(dataValues.id == id_address)
                    auth = true;
            });

            if(!auth)
                return res.json(Status.UNAUTHORIZED);

            if(await AddressEntity.destroy({ where: { id: id_address } }) == 1)
                return res.json(Status.SUCCESS);
            
            return res.json(Status.FAILED);
        } catch (err) {
            return res.json({ status: Status.FAILED, error: err });
        }
    },
};