var nome = "Luiz Fritsch"
var idade = 20

var empresa = {
    nome: "nome generico",
    cidade: "taquari",
    email: "empresagenerica@gmail.com",
    site: "empresagenerica.com.br"
}

/**
 * operator spread
 */
var user = {
    nome,
    idade,
    ... { empresa }
}

/**
 * Desestruturação
 */
var nome = user.nome;
var { nome } = user;
var { nome, idade } = user;

/**
 * Arrow function
 * so com callback ou salvar funcao dentro de uma variavel
 */
var arrowFunction = (a, b) => a * b;
var arrowFunction = a => a * 2;

/**
 * Busca em array
 * filter
 * forEach
 * ->find<-
 */
var luiz = {
    nome: "luiz",
    empresa: "estudante"
}

var johnlennon = {
    nome: "joun lenom",
    empresa: "os biltom"
}

var tobimaguire = {
    nome: "omiranha",
    empresa: "vigilante noturno"
}

var users = [luiz, johnlennon, tobimaguire];

users.find(user => { user.nome === "luiz" }); //pra cada array ele verifica e retorna o primeiro q encontrar

/**
 * Template literals
 *
 */
var sobre = "programador desempregado";

var frase = `
            Ola meu nome eh ${nome}, e eu sou ${sobre}`;