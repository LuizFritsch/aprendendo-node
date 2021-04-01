const express = require("express")
const app = express()

const bodyparser = require("body-parser")
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

var db = {
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
app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(db.games);
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

        var game = db.games.find(g => g.id == id);
        console.log(game);
        if (game) {
            res.json(game);
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

app.listen(80, () => {
    console.log("api rodando...");
})