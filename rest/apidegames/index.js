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

app.listen(80, () => {
    console.log("api rodando...");
})