let express = require("express");
let app = express()
let mongoose = require("mongoose");
let user = require("../models/Usuario");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let secret = "S123E321C456R654E123456T654321";

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

app.post("/auth", async(req, res) => {
    let { email, senha } = req.body;
    /*if (email == undefined || email == "" || email == " ") {
        res.sendStatus(400);
        return;
    }
    if (senha == undefined || senha == "" || senha == " ") {
        res.sendStatus(400);
        return;
    }*/
    let user = await Usuario.findOne({ "email": email })
    if (user == undefined) {
        res.statusCode = 403;
        res.json({ errors: { email: "Email não cadastrado..." } });
        return;
    } else {
        let isSenhaValid = await bcrypt.compare(senha, user.senha);
        if (!isSenhaValid) {
            res.statusCode = 403;
            res.json({ errors: { email: 'ok', senha: "Senha incorreta..." } });
            return;
        }
    }

    jwt.sign({ email, name: user.name, id: user._id }, secret, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        } else {
            res.json({ token })
        }
    })


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