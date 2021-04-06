var express = require("express");
var app = express();
//socket.io precisa estar rodando no mesmo serv q o express
//e precisa ser o nativo do node
var http = require("http").createServer(app);
var io = require("socket.io")(http);
app.set("view engine", "ejs");
io.on("connection", (socket) => {

    socket.on("disconnect", data => {
        console.log(socket.id + " desconectou-se");
    })

    socket.on("msg", data => {
        console.log(data);
        //envio global do servidor
        io.emit("msg", data);
    })

});


app.get("/", (req, res) => {
    res.render("index");
});


http.listen(80, () => {
    console.log("servidor rodando...")
})