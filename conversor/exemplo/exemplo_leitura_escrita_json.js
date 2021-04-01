const fs = require("fs");

function lerUsuario() {
    fs.readFile('./usuario.json', { encoding: "utf-8" }, (erro, dados) => {
        if (erro) {
            console.log("erro:");
            console.log(erro);
        } else {
            var conteudo = JSON.parse(dados);
            return conteudo
        }
    })
}

function modificarUsuario(nome, curso, categoria) {
    fs.readFile('./usuario.json', { encoding: "utf-8" }, (erro, dados) => {
        if (erro) {
            console.log("erro:");
            console.log(erro);
        } else {
            conteudo = JSON.parse(dados);
            conteudo.nome = nome
            conteudo.curso = curso
            conteudo.categoria = categoria
            fs.writeFile("./usuario.json", JSON.stringify(conteudo), (erro) => {
                if (erro) {
                    console.log(`erro: ${erro}`)
                }
            })
        }
    })
}
console.log(lerUsuario());