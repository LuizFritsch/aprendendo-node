const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conn = require('./database/database');
const pergunta = require('./database/Pergunta');
const Pergunta = require("./database/Pergunta");

conn.authenticate().then(() => {
    console.log("conexao feita com o bd...");
}).catch((msgErro) => {
    console.log(msgErro);
});
//dizendo ao express q o ejs sera o view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    Pergunta.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(perguntas => {
        //console.log(perguntas);
        res.render("index", {
            perguntas
        });
    });

});

app.get("/perguntar", function(req, res) {
    res.render("perguntar");
});

app.post("/salvarpergunta", function(req, res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var resposta = Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    });

    //res.send("formulario recebido! titulo: " + titulo + " descricao:" + descricao + "");
});

app.listen(
    8080, () => {
        console.log("app rodando");
    }
);
/*
app.get("/", function(req, res) {
    res.send();
});
*/