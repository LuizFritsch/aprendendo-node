let express = require("express");
let app = express()
let mongoose = require("mongoose");
let user = require("../models/Usuario");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

mongoose.connect("mongodb://localhost:27017/galeria", { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    //console.log("conectado com o banco...");
}).catch((err) => {
    console.log(err);
});

let Usuario = mongoose.model("Usuario", user);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", (req, res) => {
    res.json({});
});

app.post("/usuario", async(req, res) => {
    if (req.body.nome == undefined || req.body.nome == "" || req.body.nome == " ") {
        res.sendStatus(400);
        return;
    }
    if (req.body.email == undefined || req.body.email == "" || req.body.email == " ") {
        res.sendStatus(400);
        return;
    }
    if (req.body.senha == undefined || req.body.senha == "" || req.body.senha == " ") {
        res.sendStatus(400);
        return;
    }

    try {
        let user = await Usuario.findOne({ "email": req.body.email });
        if (user != undefined) {
            res.statusCode = 400;
            res.json({ erro: "Email já cadastrado..." })
            return;
        }
        let { email, senha, nome } = req.body;
        let salt = await bcrypt.genSalt(10);
        senha = await bcrypt.hash(senha, salt);
        novoUsuario = new Usuario({
            email,
            senha,
            nome
        })
        await novoUsuario.save();
        res.json({ email: email });
    } catch (error) {
        //console.log(error);
        res.sendStatus(500);
    }
});

/**
 * Metodo apenas pro modulo de testagem
 */
app.delete("/usuario/deleta/enigma/:email", async(req, res) => {
    await Usuario.deleteOne({ email: req.params.email });
    res.sendStatus(200);
});

module.exports = app;