//email => Resolvida: ok - Reject: "falha";

//salvar => Cumprida: "dado salvos" || Rejeitada: "Deu ruim";

//tipo de contrato relacionado a coisas do futuro tipo salvar algo no banco


function envia_email(corpo, para) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var deuErro = false;
            console.log("email enviado");
            if (!deuErro) {
                resolve({ tempo: 123, para: "asudhsauid" }) //promessa ok
            } else {
                reject("falha no smtp") //promessa falhou
            }
            //console.log("oi");
        }, 1000);
    })
}
//then eh executado quando a promessa eh cumprida
/**
 envia_email("ola mundo", "emailgenerico@gmail.com").then(({ tempo, para }) => {
     console.log("promessa cumprida");
     console.log(tempo);
     console.log(para);
    }).catch((msgErro) => {
        console.log("promessa nao cumprida");
        console.log(msgErro);
    });
*/



/**
 * Promises aninhadas ou Promise hell
 */

function pegarId() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5);
        }, 1000);
    });
}

function buscarEmailNoBanco(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("gmail@gmail.com");
        }, 2000);
    })
}

pegarId().then((id) => {
    buscarEmailNoBanco(id).then((email) => {
        envia_email("nested promises", email).then(() => {
            console.log(`email enviado para o usuario com id ${id}`);
        }).catch(erro => {
            console.log(erro);
        });
    });
});