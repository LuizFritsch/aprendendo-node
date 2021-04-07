let mongoose = require("mongoose");

let User = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String
});

module.exports = User;