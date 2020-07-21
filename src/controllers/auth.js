const moment = require('moment-timezone');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const Utils = require('../utilities/utils');
const Status = require('../enumerators/status');
const UserEntity = require ('../db/models/user');
const ModelRepository = require('../db/repositories/models');
var jwt = require('jsonwebtoken');

module.exports = {
    // Login
    async login(req, res, next){
        const { email, password } = req.body;
        if(!req.body.email || !req.body.password)
            return res.json(Status.CANCELED);

            where = { email };

        let user;
        if(!(user = await ModelRepository.selectOnePrivate(UserEntity, { where })))
            return res.status(httpStatus.NOT_FOUND).json(Status.NOT_FOUND);

        bcrypt.compare(password, user.password, function(err, result) {
            if(err || !result)
                return res.status(httpStatus.UNAUTHORIZED).json({ result, err });

            const payload = { id: user.id, name: user.name, email: user.email };
            var token = jwt.sign({ payload }, process.env.SECRET, {
                expiresIn: 300 // Tempo de expiração em segundos
            });
            return res.json({ auth: true, token: token });
        });
    },
    // Logout
    async logout(req, res, next) {
        res.json({ auth: false, token: null });
    },
    // Cadastro
    async signup(req, res) {

    },
    // Verificação de token
    async verifyToken(req, res, next) {
        var token = req.header('X-Access-Token');
    
        if (!token)
            return res.status(401).json({ auth: false, message: 'Token não fornecido.' });
    
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err)
                return res.status(500).json({ auth: false, message: 'Falha ao autenticar token' });
      
            // se tudo estiver ok, salva no request para uso posterior
            req.id_user = decoded.id;
            next();
        });
    }
}