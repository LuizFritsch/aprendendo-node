class Filme {

    constructor(titulo, ano, genero, diretor, atores, duracao) {
        this.titulo = titulo
        this.ano = ano
        this.genero = genero
        this.diretor = diretor
        this.atores = atores
        this.duracao = duracao
    }

    Reproduzir() {
        console.log('reproduzindo...')
    }
    Pausar() {
        console.log('pausando...')
    }
    Avancar() {
        console.log('avancando...')
    }
    Fechar() {
        console.log('fechando...')
    }

}

var vingadores = new Filme("vingadores", 2006, "acao", "sla", "202938");
//vingadores.titulo = "vingadores";
//vingadores.ano = 2006;
//vingadores.genero = 'acao';
console.log(vingadores);