const Sequelize = require("sequelize");
const conn = require('./database');
const Resposta = conn.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    id_pergunta: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
Resposta.sync({ force: false }).then(() => { console.log("tabela resposta criada") });

module.exports = Resposta;