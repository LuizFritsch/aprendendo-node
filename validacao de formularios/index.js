const express = require("express");
var app = express();

const bodyParser = require('body-parser')
const session = require("express-session");
const flash = require('express-flash');
// View engine
app.set('view engine', 'ejs');
app.use(flash());


const cookieParser = require("cookie-parser");
app.use(cookieParser("QualquerCoisaAqui"));

// Sessions
app.use(session({
    secret: "qualquercoisa",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}))

// Static
app.use(express.static('public'));

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", (req, res) => {
    var emailError = req.flash("emailError");
    var pointsError = req.flash("pointsError");
    var nameError = req.flash("nameError");
    var email = req.flash("email");
    var points = req.flash("points");
    var name = req.flash("name");

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    pointsError = (pointsError == undefined || pointsError.length == 0) ? undefined : pointsError;
    nameError = (nameError == undefined || nameError.length == 0) ? undefined : nameError;

    erros = {
        emailError,
        pointsError,
        nameError
    }
    console.log(erros);
    res.render("index", { emailError, pointsError, nameError, email, points, name })
});

app.post("/form", (req, res) => {
    var { email, name, points } = req.body;
    var emailError;
    var pointsError;
    var nameError;
    if (email == undefined || email == "") {
        emailError = "email can not be empty";
    }
    if (isNaN(points)) {
        pointsError = "points must be numeric";
    } else if (points < 20) {
        pointsError = "points must be higher than 20"
    }
    if (name == undefined || name == "") {
        nameError = "name can not be empty";
    }
    if (emailError != undefined || pointsError != undefined || nameError != undefined) {
        //flash sessions
        req.flash("emailError", emailError);
        req.flash("pointsError", pointsError);
        req.flash("nameError", nameError);

        req.flash("email", email);
        req.flash("points", points);
        req.flash("name", name);

        res.redirect("/")
    } else {
        res.send("form seems good")
    }
});

app.listen(80, (req, res) => {
    console.log("Server is running on 80...")
});