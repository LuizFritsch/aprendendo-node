var knex = require('../database/connection');
const User = require('./User');
const { v4: uuidv4 } = require('uuid');

class PasswordToken {
    async validate(token) {
        try {
            var result = await knex.select().where({ token: token }).table("password_tokens");
            if (result.length > 0) {
                var tk = result[0];
                if (tk.used) {
                    return { status: 400, msg: "this token has already been used...", tk };
                } else {
                    return { status: 200, msg: "success...", tk };
                }
            } else {
                return { status: 400, msg: "invalid token...", tk };
            }
        } catch (error) {
            console.log(error);
            return { status: 406, msg: "server error...", tk };
        }
    }

    async setUsed(token) {
        await knex.update({ used: 1 }).where({ token: token }).table("password_tokens");
    }

    async create(email) {
        var user = await User.findByEmail(email);
        var token = uuidv4();
        if (user != undefined) {
            try {
                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table("password_tokens")
                return { status: 200, msg: "success...", token: token }
            } catch (error) {
                console.log(error)
                return { status: 406, msg: "server error..." }
            }
        } else {
            return { status: 404, msg: "user not found..." }
        }
    }

}

module.exports = new PasswordToken;