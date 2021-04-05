var jwt = require("jsonwebtoken");

var secret = "secret!@&#*76328432409843*&@$^#*)&^#@";

module.exports = function(req, res, next) {
    const authToken = req.headers['authorization'];
    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        var token = bearer[1];
        try {
            var decoded = jwt.verify(token, secret);
            console.log(decoded);
            if (decoded.role == 1) {
                next();
            } else {
                res.status(403);
                res.send("you are not authorized...");
            }
        } catch (error) {
            res.status(403);
            res.send("not authenticated...");
        }
    } else {
        res.status(403);
        res.send("not authenticated...");
    }
}