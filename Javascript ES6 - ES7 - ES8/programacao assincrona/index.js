function enviar_email(corpo, para, callback) {
    setTimeout(() => {
        console.log(`
            Para: ${para}
            ----------------------------------------
            ${corpo}
        `)
        var deuErro = false
        if (deuErro) {
            callback("ok", 5, "5s");
        } else {
            callback("not ok", 5, "5s");
        }
    }, 3000);
}
console.log("teste 1")

enviar_email("oi seja bem vindo", "hue@gmail.com", (status, amount, time) => {
    console.log(`
        status: ${status}
        ------------------
        contatos: ${amount}
        -------------------
        tempo: ${time}
    `);
    console.log("callback executado")
    console.log("email enviado")
})
console.log("teste 2")
console.log("teste 3")