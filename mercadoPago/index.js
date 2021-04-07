const express = require('express');
const MercadoPago = require("mercadopago");
const app = express();
app.use(express.static("public"));
const { v4: uuidv4 } = require('uuid');
const https = require('https');
const fs = require('fs');
const port = 80;

var key = fs.readFileSync(__dirname + '/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/selfsigned.crt');
var options = {
    key: key,
    cert: cert
};

app.get('/', (req, res) => {
    res.send('Now using https..');
});

var server = https.createServer(options, app);

server.listen(port, () => {
    console.log("server starting on port : " + port)
});


MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-621142151203309-040716-78c52a18a132e78e7b4541edbeb08533-254886005"
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

app.post("/notificacao", (req, res) => {

    var id = req.query.id;
    setTimeout(() => {
        var filtro = {
            "order.id": id
        }
        MercadoPago.payment.search({
            qs: filtro
        }).then((result) => {
            console.log(result.data);
            var pagamento = result.data.results[0];
            if (pagamento != undefined) {
                console.log(pagamento);
                res.send("OK");
            } else {
                console.log("pagamento nao existe");
            }
        }).catch((err) => {
            console.log(err);
        });

    }, 20000);
})