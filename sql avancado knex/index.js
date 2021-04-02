var database = require("./database");
/*
 * INSERT
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
var dados = [{
        name: "Minecraft",
        price: 30
    },
    {
        name: "Tibia",
        price: 60
    },
    {
        name: "Counter Strike: Global offensive",
        price: 0
    }
]

var query = database.insert(dados).into("games").then((data) => {
    console.log(data);
}).catch(error => {
    console.log(error)
});*/

/*
 * SELECT
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
database.select().table("games").then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});

database.select(["id", "price"]).table("games").then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});*/

/*
 * NESTED QUERIES
var query = database.insert({ name: "Dark Souls 3", price: 60 }).into("games").then((data) => {
    database.select().table("games").then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });
}).catch(error => {
    console.log(error)
});*/

/* RAW WHERE
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
database.where('name', 'like', "%dark%").table("games").then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});

database.whereRaw('price >50').table("games").then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});*/

/* DELETE
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
database.where({ id: 3 }).delete().table("games").then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});*/


/* UPDATE
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
database.where({ id: 5 }).update({ price: 15 }).table("games").then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});*/

/* ORDER BY
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
database.select().table("games").orderBy("price", "DESC").then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
}); */

/* ASSOCIETED INSERTS
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
database.insert({
    name: "valve",
    game_id: 5
}).table("studios").then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});*/


database.select(["games.*", "studios.id as studios_id", "games.name", "studios.name as studios_name"]).table("games").innerJoin("studios", "studios.game_id", "games.id").then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});