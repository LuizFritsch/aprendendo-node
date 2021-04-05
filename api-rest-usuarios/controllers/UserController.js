var User = require('../models/User')
var PasswordToken = require('../models/PasswordToken')
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var secret = "secret!@&#*76328432409843*&@$^#*)&^#@";
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

    async login(req, res) {
        try {
            var { email, password } = req.body;
            if (email == undefined) {
                res.status(404);
                res.json({ msg: "invalid email..." })
            } else {
                if (password == undefined) {
                    res.status(404);
                    res.json({ msg: "invalid password..." })
                } else {
                    var user = await User.findByEmail(email);
                    if (user != undefined) {
                        var result = await bcrypt.compare(password, user.password);
                        if (result) {
                            var token = jwt.sign({ email: user.email, role: user.role }, secret);
                            res.status(200);
                            res.json({ token: token });
                        } else {
                            res.status(406);
                            res.send("password does not match...");
                        }
                    } else {
                        res.status(404);
                        res.send("user not found...");
                    }
                }
            }
        } catch (error) {
            console.log(error);
            res.json({ status: false });
        }
    }

}

module.exports = new UserController;