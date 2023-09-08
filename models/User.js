const knex = require('../database/connection')
const bcrypt = require('bcrypt')

class User {

    async signIn(user) {
        try {

            let hash = await bcrypt.hash(user.password, 10)
            await knex.insert({
                name: user.name,
                email: user.email,
                password: hash,
                role: 0
            }).into('users')

        } catch(err) {
            console.log(err)
        }
    }

    async validationEmail(user) {
        try {
            let userEmail = await knex.select("*").from('users').where({email: user.email})
            if(userEmail.length > 0) {
                return true
            } else {
                return false
            }
        } catch(err) {
            console.log(err)
            return false
        }
    }

}

module.exports = new User()