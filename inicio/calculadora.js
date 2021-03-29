function soma(a, b) {
    return a + b;
}

function multiplicacao(a, b) {
    return a * b;
}

function divisao(a, b) {
    return a / b;
}

function subtracao(a, b) {
    return a - b;
}

var nome = "calculador";

module.exports = {
    soma,
    multiplicacao,
    divisao,
    subtracao,
    nome
};