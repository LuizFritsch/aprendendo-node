const fs = require("fs");
fs.readFile('./leitura.txt', { encoding: "utf-8" }, (erro, dados) => {
    if (erro) {
        console.log("erro:");
        console.log(erro);
    } else {
        console.log(dados);
    }
})