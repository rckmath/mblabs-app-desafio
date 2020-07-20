const excludeAttributes = ['createdAt', 'updatedAt'];

/**
 * Verifica se o corpo da requisição esta vazio
 * @param {*} req: Objeto da requisição 
 */
function bodyVerify(req){
    if(req.body.constructor === Object && Object.keys(req.body).length === 0)
        return 1;
    return 0;
}



module.exports.excludeAttributes = excludeAttributes;
module.exports.bodyVerify = bodyVerify;