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

app.get("/blog", function(req, res) {
    res.send("bem vindo ao meu blog");
});

app.get("/canal/youtube", function(req, res) {
    res.send("bem vindo ao meu canal");
});

app.listen(3000, function(erro) {
    if (erro) {
        console.log("ocorreu um erro: ")
        console.log(erro)
    } else {
        console.log("servidor iniciado com sucesso")
    }
});