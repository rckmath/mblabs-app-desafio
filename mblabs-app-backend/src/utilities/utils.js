const Status = require('../enumerators/status');
const ModelRepository = require('../db/repositories/models');
const UserEntity = require('../db/models/user');
const excludeAttributes = ['createdAt', 'updatedAt', 'password'];
const cep = require('cep-promise');

/**
 * Verifica se o corpo da requisição esta vazio
 * @param {*} req: Objeto da requisição 
 */
function bodyVerify(req){
    if(req.body.constructor === Object && Object.keys(req.body).length === 0)
        return 1;
    return 0;
}

async function emailAlreadyInUse(email){
    try {
        const where = { email };
        const exists = await ModelRepository.selectOne(UserEntity, { where });

        if(exists)
            return true;
    } catch (err) {
        return console.log(err);
    }
    return false;
}

async function getAddress(req, res){
    await cep(req.query.val)
    .then(address => {
        return res.status(200).json(address);
    })
    .catch(err => {
        return res.status(404).json(err);
    });
}

module.exports.emailAlreadyInUse = emailAlreadyInUse;
module.exports.excludeAttributes = excludeAttributes;
module.exports.bodyVerify = bodyVerify;
module.exports.getAddress = getAddress;