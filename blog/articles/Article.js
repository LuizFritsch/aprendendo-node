const Sequelize = require("sequelize");
const conn = require("../database/database");
const Category = require("../categories/Category");
const Article = conn.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }

});
Category.hasMany(Article); //1 to n
Article.belongsTo(Category); //1 to 1

Article.sync({ force: false });

module.exports = Article;