const Sequelize = require("sequelize");

const conn = new Sequelize("perguntas", "root", "", {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conn;