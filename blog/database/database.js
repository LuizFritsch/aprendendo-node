const Sequelize = require("sequelize");

const conn = new Sequelize("blog", "root", "", {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conn;