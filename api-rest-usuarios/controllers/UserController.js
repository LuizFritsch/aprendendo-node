var User = require('../models/User')
var PasswordToken = require('../models/PasswordToken')
class UserController {
    async index(req, res) {
        try {
            var users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.log(error);
        }
    }

    async findUser(req, res) {
        var id = req.params.id;
        if (id == undefined || isNaN(id)) {
            res.status(400);
            res.json({ msg: "invalid id..." });
        } else {
            try {
                var user = await User.findByID(id);
                if (user == undefined) {
                    res.status(400);
                    res.json({ msg: "user not found..." });
                } else {
                    res.status(200);
                    res.json(user);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

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

    async edit(req, res) {
        try {
            var result = await User.update(req.body, req.params.id);
            res.status(result.status);
            res.json(result.msg)
        } catch (error) {
            console.log(error)
        }
    }

    async delete(req, res) {
        try {
            var result = await User.delete(req.params.id);
            res.status(result.status);
            res.json(result.msg)
        } catch (error) {
            console.log(error)
        }
    }

    async recoverPassword(req, res) {
        var email = req.body.email;
        var result = await PasswordToken.create(email);
        if (result.status == 200) {
            //console.log(result.token);
            res.status(result.status);
            res.json("" + result.token);
        } else {
            res.status(result.status);
            res.json(result.msg);
        }
    }

    async changePassword(req, res) {
        var token = req.body.token;
        var password = req.body.password;
        if (password == undefined || password == '') {
            res.status(400);
            res.send("invalid password...")
        } else {
            var response = await PasswordToken.validate(token);
            if (response.status == 200) {
                try {
                    await User.changePassword(password, response.tk.user_id, response.tk.token);
                    res.status(200);
                    res.send("success");
                } catch (error) {
                    console.log(error)
                }
            } else {
                res.status(response.status);
                res.send(response.msg)
            }
        }
    }

}

module.exports = new UserController;