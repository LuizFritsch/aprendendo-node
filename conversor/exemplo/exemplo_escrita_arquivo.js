const fs = require("fs");
fs.writeFile("leitura.txt", "FS METEU O RJ NO TEXTO", (erro) => {
    if (erro) {
        console.log(erro);
    }
});