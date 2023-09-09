const knex = require('../database/connection')
const User = require('./User')
const { v4: uuidv4 } = require('uuid')

class PasswordToken {

    async createToken(email) {

        let user = await User.findByEmail(email)

        if (user) {

            let token = uuidv4()

            await knex.insert({
                user_id: user.id,
                used: 0,
                token
            }).into('passwordtoken')
            return { status: true, token }
        } else {
            return { status: false, err: "Usuário não encontrado no banco de dados!" }
        }

    }

    async validateToken(token) {
        let isValidToken = await knex.select().where({ token }).table("passwordtoken")
        if (isValidToken[0]) {

            if (isValidToken[0].used) {
                return { status: false, err: "O token já foi usado!" }
            } else {
                await knex('passwordtoken').update({ used: 1 }).where({ id: isValidToken[0].id })
                return { status: true, token: isValidToken[0] }
            }

        } else {
            return { status: false, err: "O token é inválido!" }
        }
    }

}

module.exports = new PasswordToken()