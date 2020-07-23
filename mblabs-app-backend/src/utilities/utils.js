const Status = require('../enumerators/status');
const ModelRepository = require('../db/repositories/models');
const UserEntity = require('../db/models/user');
const excludeAttributes = ['createdAt', 'updatedAt', 'password'];

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
            return Status.DUPLICATED;
    } catch (err) {
        return console.log(err);
    }
    return Status.SUCCESS;
}

module.exports.emailAlreadyInUse = emailAlreadyInUse;
module.exports.excludeAttributes = excludeAttributes;
module.exports.bodyVerify = bodyVerify;