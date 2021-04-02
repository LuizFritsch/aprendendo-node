const express = require("express")
const app = express()
const cors = require("cors")
const bodyparser = require("body-parser")
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const jwt = require("jsonwebtoken")

const jwtSecret = "12030912bnkbdsLKSDHFLKSDGHF98yudas08f7fyg8*";

var db = {
    users: [{
            id: 1,
            name: "luiz",
            email: "fritsch.guilherm3@gmail.com",
            password: "123"
        },
        {
            id: 2,
            name: "guilherme",
            email: "fritsch.luiz@gmail.com",
            password: "123"
        }
    ],
    games: [{
            id: 1,
            name: "tibia",
            year: "1997",
            price: 60
        },
        {
            id: 2,
            name: "minecraft",
            year: "2014",
            price: 239
        },
        {
            id: 3,
            name: "cs",
            year: "1997",
            price: 15
        }
    ]
}

/**
 * endpoint
 * list all games
 */
app.get("/games", auth, (req, res) => {

    var HATEOS = [{
            href: "http://localhost/game/0",
            method: "DELETE",
            rel: "delete_game"
        },
        {
            href: "http://localhost/game/0",
            method: "GET",
            rel: "get_game"
        },
        {
            href: "http://localhost/auth",
            method: "POST",
            rel: "login"
        }
    ]
    res.statusCode = 200;
    res.json({ games: db.games, _links: HATEOS });
});

/**
 * endpoint
 * list game by id
 */
app.get("/game/:id", (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        //not numeric
        //invalid parameter
        res.sendStatus(400);
    } else {
        id = parseInt(id);

        var HATEOS = [{
                href: "http://localhost/game/" + id,
                method: "DELETE",
                rel: "delete_game"
            },
            {
                href: "http://localhost/game/" + id,
                method: "PUT",
                rel: "edit_game"
            },
            {
                href: "http://localhost/games/",
                method: "GET",
                rel: "get_games"
            }
        ]

        var game = db.games.find(g => g.id == id);
        console.log(game);
        if (game) {
            res.json({ game: game, _links: HATEOS });
        } else {
            //game with id not found
            res.sendStatus(404);
        }

    }
    //res.statusCode = 200;
    //res.json(db.games);
});

/**
 * endpoint
 * insert game
 */
app.post("/game", (req, res) => {
    var { name, price, year } = req.body;
    console.log(req.body);
    db.games.push({
        id: Math.floor(Math.random() * 11),
        name,
        price,
        year
    });
    res.sendStatus(200);
});
/**
 * endpoint
 * delete game by id
 */
app.delete("/game/:id", (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        //not numeric
        //invalid parameter
        res.sendStatus(400);
    } else {
        id = parseInt(id);

        var index = db.games.findIndex(g => g.id == id);
        console.log(index);
        if (index == -1) {
            //game with id not found
            res.sendStatus(404);
        } else {
            db.games.splice(index, 1);
            res.sendStatus(200);
        }

    }
});

app.put("/game/:id", (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        //not numeric
        //invalid parameter
        res.sendStatus(400);
    } else {
        id = parseInt(id);

        var game = db.games.find(g => g.id == id);
        console.log(game);
        if (game != undefined) {
            var { name, price, year } = req.body;
            if (name != undefined) {
                game.name = name;
            }
            if (price != undefined) {
                game.price = price;
            }
            if (year != undefined) {
                game.year = year;
            }

            res.sendStatus(200);
        } else {
            //game with id not found
            res.sendStatus(404);
        }

    }
});
/**
 * middleware 
 */
function auth(req, res, next) {
    const authToken = req.headers['authorization'];
    console.log(authToken);
    if (authToken != undefined) {
        const bearer = authToken.split(" ");
        const token = bearer[1];
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.status(401)
                res.json({ err: "token invalido" })
            } else {
                console.log(data);
                req.token = token;
                req.loggedUser = { id: data.id, email: data.email };
                next();
            }
        })

    } else {
        res.status(401)
        res.json("token invalido")
    }
}
app.post("/auth", (req, res) => {
    var { email, password } = req.body
    console.log(req.body)
    if (email != undefined) {
        var user = db.users.find(u => email == email);
        console.log(user);
        if (user != undefined) {
            if (user.password == password) {
                jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '48h' }, (err, token) => {
                    if (err) {
                        res.status(400)
                        res.json({ err: "falha interna" })
                    } else {
                        res.status(200)
                        res.json({ token: token })
                    }
                })
            } else {
                res.status(401)
                res.json("credenciais invalidas")
            }
        } else {
            res.status(404)
            res.json("email enviado nao encontrado")
        }
    } else {
        res.status(404)
        res.json("email invalido")
    }
});

app.listen(80, () => {
    console.log("api rodando...");
})