var User = require('../models/User')
class UserController {
    async index(req, res) {}

    async create(req, res) {
        var { email, name, password, role } = req.body;
        if (email == undefined) {
            res.status(400);
            res.json({ msg: "invalid email..." });
            return;
        }
        if (name == undefined) {
            res.status(400);
            res.json({ msg: "invalid name..." });
            return;
        }
        if (password == undefined) {
            res.status(400);
            res.json({ msg: "invalid password..." });
            return;
        }
        if (role == undefined) {
            res.status(400);
            res.json({ msg: "invalid role..." });
            return;
        }

        var emailExists = await User.findEmail(email);

        if (emailExists) {
            res.status(406);
            res.json({ msg: "email already exists..." })
            return;
        }

        try {
            await User.new(req.body);
            res.status(200);
            res.json({ msg: "success" })
        } catch (error) {
            res.status(403);
            res.json({ msg: "error inserting user on db..." })
        }
    }

}

module.exports = new UserController;