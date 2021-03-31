function pegarUsuarios() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { name: "victor", lang: "python" },
                { name: "cuca", lang: "beludo" },
                { name: "lima", lang: "mei" }
            ])
        }, 1000);
    })
}

async function principal(params) {
    var usuarios = await pegarUsuarios();
    console.log(usuarios);
    //bloqueia o fluxo do codigo e so printa o ola dps, diferente dos outros
    console.log('ola');
}


principal();