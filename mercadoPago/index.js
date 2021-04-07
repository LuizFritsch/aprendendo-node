const express = require("express");
const MercadoPago = require("mercadopago");
const app = express();
app.use(express.static("public"));
const { v4: uuidv4 } = require('uuid');

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-621142151203309-040716-78c52a18a132e78e7b4541edbeb08533-254886005"
});

app.get("/", (req, res) => {
    res.send("ola mundo")
});

app.get("/pagar", async(req, res) => {
    //id //itens.item.id //payer.email //status
    var id = '' + uuidv4();
    var id2 = '' + uuidv4();
    var id3 = '' + uuidv4();
    var email = "email@gmail.com";
    var dados = {
        items: [
            item = {
                id,
                title: "galera",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            },
            item = {
                id2,
                title: "sorvete",
                quantity: 5,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            },
            item = {
                id3,
                title: "sorvete galera",
                quantity: 3,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer: {
            email
        },
        external_reference: id
    }
    try {
        var pagamento = await MercadoPago.preferences.create(dados);
        console.log(pagamento);
        return res.redirect(pagamento.body.init_point);
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});

app.listen(80, () => { console.log("servidor rodando"); });