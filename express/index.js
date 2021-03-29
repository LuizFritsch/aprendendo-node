const express = require("express"); //importando o express

const app = express(); //iniciando o exmpress

app.get("/", function(req, res) {
    res.send("bem vindo");
    /**
     * So pode enviar a resposta uma vez, 
     * todo resto da rota n funciona
     */
    //res.send("bem vindo de novo");
});

/**
 * ola
 * :nome parametro get obrigatorio na url
 * :empresa parametro get obrigatorio na url
 * Para pegar o que foi passado na url a gente usa:
 * req.params.
 * 
 */
app.get("/ola/:nome/:empresa", function(req, res) {
    res.send("<h1>oi " + req.params.nome + ", da " + req.params.empresa + "</h1>")
});

/**
 * blog
 * :artigo? parametro get NAO obrigatorio na url
 * 
 */
app.get("/blog/:artigo?", function(req, res) {

    var artigo = req.params.artigo;

    if (!artigo) {
        res.send("bem vindo ao meu blog");
    } else {
        res.send("<h2>Artigo: </h2>" + artigo)
    }

});

/**
 * Query parameter
 */
app.get("/canal/youtube", function(req, res) {
    var canal = req.query["canal"];
    if (canal) {
        res.send(canal);
    } else {
        res.send("nenhum canal fornecido");
    }
});

app.listen(3000, function(erro) {
    if (erro) {
        console.log("ocorreu um erro: ")
        console.log(erro)
    } else {
        console.log("servidor iniciado com sucesso")
    }
});