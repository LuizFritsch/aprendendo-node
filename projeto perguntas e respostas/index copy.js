const express = require("express");
const app = express();

//dizendo ao express q o ejs sera o view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/:nome/:lang", function(req, res) {
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos = [
        { nome: "doritos", preco: 5 },
        { nome: "coca-cola", preco: 7 },
        { nome: "banana", preco: 3 },
        { nome: "nesca", preco: 2 },
        { nome: "cenoura", preco: 1 },
        { nome: "cebola", preco: 0.8 },
    ];

    res.render("index", {
        nome,
        lang,
        empresa: "solutio",
        inscritos: 8000,
        msg: exibirMsg,
        produtos
    });
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