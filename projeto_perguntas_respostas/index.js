const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conn = require('./database/database');
const Resposta = require('./database/Resposta');
const Pergunta = require("./database/Pergunta");

conn.authenticate().then(() => {
    console.log("conexao feita com o bd...");
}).catch((msgErro) => {
    console.log(msgErro);
});
//dizendo ao express q o ejs sera o view engine
app.set('view engine', 'ejs');
//defini a pasta public pra arquivos estaticos
app.use(express.static('public'));
//bodyparser
app.use(express.urlencoded({ extended: true }));

/**
 * Rota index pra visualizar todas perguntas
 */
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

/**
 * Rota pra visualizar perguntar - view
 */
app.get("/perguntar", function(req, res) {
    res.render("perguntar");
});

/**
 * Rota para inserir pergunta - inserir
 */
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

/**
 * Rota pra visualizar uma pergunta em especifico e responder - view
 */
app.get("/pergunta/:id", function(req, res) {
    var id = req.params.id;
    Pergunta.findOne({
        where: {
            id: id
        }
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: {
                    id_pergunta: pergunta.id
                },
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("resposta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else {
            res.redirect("/");
        }
    });
});

/**
 * Rota pra inserir respostas - inserir
 */
app.post("/responder", function(req, res) {
    var corpo = req.body.resposta;
    var id = req.body.id_pergunta;
    //console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    //console.log(corpo);
    //console.log(id);
    //console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
    /**
     * Estava com errro pois estava enviando id aqui
     * e no banco o nome da coluna eh id_usuario...
     */
    Resposta.create({
        corpo: corpo,
        id_pergunta: id
    }).then(() => {
        res.redirect("/pergunta/" + id);
    });
});

app.listen(
    80, () => {
        console.log("app rodando");
    }
);


/*
app.get("/", function(req, res) {
    res.send();
});
*/