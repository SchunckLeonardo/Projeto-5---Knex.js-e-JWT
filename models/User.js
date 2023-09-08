const knex = require('../database/connection')
const bcrypt = require('bcrypt')

class User {

    async findAll() {
        try {
            let users = knex.select(["id", "name", "email", "role"]).from('users')
            return users

        } catch(err) {
            console.log(err)
            return []
        }
    }

    async findById(id) {
        try {
            let user = knex.select(["id", "name", "email", "role"]).where({id}).from('users')
            if(user.length > 0) {
                return undefined
            } else {
                return user
            }

        } catch(err) {
            console.log(err)
            return undefined
        }
    }

    async signIn(user) {
        try {

            let hash = await bcrypt.hash(user.password, 10)
            await knex.insert({
                name: user.name,
                email: user.email,
                password: hash,
                role: 0
            }).into('users')

        } catch (err) {
            console.log(err)
        }
    }

    async validationEmail(email) {
        try {
            let userEmail = await knex.select("*").from('users').where({ email })
            if (userEmail.length > 0) {
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log(err)
            return false
        }
    }

}

module.exports = new User()