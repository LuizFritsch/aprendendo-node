const mongoose = require("mongoose");

const consulta = new mongoose.Schema({
    nome: String,
    email: String,
    descricao: String,
    cpf: String,
    data: Date,
    horario: String,
    ja_aconteceu: Boolean
});

module.exports = consulta;