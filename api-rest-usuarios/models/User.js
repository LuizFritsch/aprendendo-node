var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");
class User {

    async delete(id) {
        var user = await this.findByID(id);
        if (isNaN(id)) {
            return { status: 400, msg: "invalid id..." }
        }
        if (user != undefined) {
            try {
                await knex.delete().where({ id: id }).table("users");
                return { status: 200, msg: "success..." }
            } catch (error) {
                return { status: 406, msg: "server error..." }
            }
        } else {
            return { status: 404, msg: "user not found..." }
        }
    }

    async findAll() {
        try {
            var result = await knex.select(["id", "email", "role", "name"]).table("users");
            return result;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async findByID(id) {
        try {
            var result = await knex.select(["id", "email", "role", "name"]).table("users").where({ id: id });
            if (result.length > 0) {
                return result;
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async findByEmail(email) {
        try {
            var result = await knex.select(["id", "email", "role", "name"]).where({ email: email }).table("users");
            if (result.length > 0) {
                return result[0]
            } else {
                return undefined
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async new(user) {
        var { email, name, password, role } = user;
        try {

            var password = await bcrypt.hash(password, 10);

            await knex.insert({ email, name, password, role }).table("users");

        } catch (error) {
            console.log(error)
        }
    }

    async findEmail(email) {
        try {
            var result = await knex.select("*").from("users").where({ email: email });
            if (result.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async update(user, id) {
        var { email, name, role } = user;

        if (id == undefined || isNaN(id)) {
            return { status: 400, msg: "invalid id..." };
        }

        var user = await this.findByID(id);

        if (user == undefined) {
            return { status: 404, msg: "user not found..." };
        } else {
            var editUser = {};
            if (email != undefined) {
                if (email != user.email) {
                    var emailExists = await this.findEmail(email);
                    if (emailExists) {
                        return { status: 400, msg: "email already exists..." };
                    } else {
                        editUser.email = email;
                    }
                } else {
                    return { status: 400, msg: "the registered email is the same one sent..." };
                }
            } else {
                editUser.email = user.email;
            }
            if (name != undefined) {
                editUser.name = name;
            } else {
                editUser.name = user.name;
            }
            if (role != undefined || isNaN(role)) {
                editUser.role = role;
            } else {
                editUser.role = user.role;
            }
            try {
                await knex.update(editUser).where({ id: id }).table("users");
                return { status: 200, msg: "sucess..." };
            } catch (error) {
                console.log(error);
                return { status: 403, msg: "error updating..." };
            }
        }
    }

    async changePassword(newPassword, id, token) {
        if (newPassword == undefined || newPassword == '') {
            return { status: 400, msg: "invalid password..." };
        } else {
            try {
                var password = await bcrypt.hash(newPassword, 10);
                await knex.update({ password: password }).where({ id: id }).table("users");
                await PasswordToken.setUsed(token);
            } catch (error) {
                console.log(error);
            }
        }
    }

}
module.exports = new User;