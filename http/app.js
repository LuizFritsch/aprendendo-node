var http = require("http");

http.createServer(function(requisicao, resposta) {
    resposta.end("<h1>bem vindo ao meu site...</h1>")
}).listen(3000);

console.log("meu server esta rodando...");