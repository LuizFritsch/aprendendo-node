class Dado {
    constructor(qtd_faces) {
        this.quantidade_faces = qtd_faces
    }

    Rolar() {
        console.log(this.quantidade_faces)
        var rolada = this.GetRandomIntInclusive(1, this.quantidade_faces);
        console.log(rolada)
    }

    GetRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

var d20 = new Dado(20);
console.log(d20.Rolar())