var calculadora = require("./calculadora.js");

console.log(calculadora.soma(1, 1) + calculadora.subtracao(2, 1))
console.log("nome atual da calculadora:");
console.log(calculadora.nome);
console.log("modificando nome de fora do modulo...");
calculadora.nome = "calculadore";
console.log("Nome modificado com sucesso");
console.log("a partir de agora a calculadora se chama: ");
console.log(calculadora.nome);