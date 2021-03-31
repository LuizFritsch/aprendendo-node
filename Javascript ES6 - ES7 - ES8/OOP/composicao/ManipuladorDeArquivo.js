class Leitor {
    Ler(caminho) {
        return "conteudo do arquiuvoi";
    }
}
class Escritor {
    Escrever(arquivo, conteudo) {
        console.log("arquivo escrito");
    }
}
class Criador {
    Criar(nome) {
        console.log("arquivo criado");
    }
}
class Destruidor {
    Deletar(caminho) {
        console.log("arquivo destruido");
    }
}
class ManipuladorDeArquivo {
    constructor(nome) {
        this.arquivo = nome
        this.leitor = new Leitor();
        this.escritor = new Escritor();
        this.criador = new Criador();
        this.destruidor = new Destruidor();
    }
}

var manipulador = new ManipuladorDeArquivo("arquivo.txt");

manipulador.leitor.Ler();
manipulador.escritor.Escrever();
manipulador.criador.Criar();
manipulador.destruidor.Deletar();