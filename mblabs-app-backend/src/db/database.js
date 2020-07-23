const Constants = require('../utilities/constants');

module.exports = {
    dialect: 'postgres',
    host: Constants.database.host,
    username: Constants.database.username,
    password: Constants.database.password,
    database: Constants.database.name,
    define: {
        timestamps: true,
        underscored: true,
    },
};