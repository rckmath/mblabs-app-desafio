module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '@p4ssdb.',
    database: 'swift-events',
    define: {
        timestamps: true,
        underscored: true,
    },
};