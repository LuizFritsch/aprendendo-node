let express = require("express");
let app = express();

app.get("/", (req, res) => {
    res.json({ success: true });
})

app.get("/color/:person", (req, res) => {
    let person = req.params.person;
    if (person == "luiz") {
        res.json({ color: "red", cor: "vermelho" })
    }
})

module.exports = app;