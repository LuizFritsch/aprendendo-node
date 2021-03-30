const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//database
const conn = require('./database/database');

/**
 * import controllers
 */
const categoriesController = require('./categories/categoriesController')
const articlesController = require('./articles/articlesController')

const Article = require('./articles/Article');
const Category = require("./categories/Category");

conn.authenticate().then(() => {
    console.log("successful db connection ...");
}).catch((msgErro) => {
    console.log(msgErro);
});

//view engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'));

//bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * categories route import from controller
 */
app.use("/", categoriesController);

/**
 * articles route import from controller
 */
app.use("/", articlesController);


/**
 * index route 
 */
app.get("/", function(req, res) {
    res.render("index")
});


app.listen(
    80, () => {
        console.log("Server is runing on 80...");
    }
);


/*
app.get("/", function(req, res) {
    res.send();
});
*/