let express = require("express");
let app = express()
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/galeria", { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    console.log("conectado com o banco...");
}).catch((err) => {
    console.log(err);
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", (req, res) => {
    res.json({});
});

module.exports = app;