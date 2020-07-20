const Status = require('../enumerators/status');
const UserRepository = require('../db/repositories/user');

async function emailUseCheck(email){
    try {
        const where = {
            email
        };
        const exists = await UserRepository.selectOne({ where });

        if(exists){
            return Status.DUPLICATED;
        }
            
    } catch (err) {
        return console.log(err);
    }
    return Status.SUCCESS;
}

module.exports = emailUseCheck;