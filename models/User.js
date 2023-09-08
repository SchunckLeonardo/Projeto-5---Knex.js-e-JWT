const knex = require('../database/connection')
const bcrypt = require('bcrypt')

class User {

    async findAll() {
        try {
            let users = knex.select(["id", "name", "email", "role"]).from('users')
            return users

        } catch (err) {
            console.log(err)
            return []
        }
    }

    async findById(id) {
        try {
            let user = knex.select(["id", "name", "email", "role"]).where({ id }).from('users')
            if (user.length > 0) {
                return undefined
            } else {
                return user
            }

        } catch (err) {
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

    async updateUser(user) {
        let editUser = {}

        let findedUser = await this.findById(user.id)
        let registeredEmail = await this.validationEmail(user.email)

        if(findedUser != undefined) {

            if(user.email != undefined) {
                if(user.email != findedUser.email) {
                    if(registeredEmail) {
                        return {status: false, err: "O e-mail já está cadastrado!"}
                    } else {
                        editUser.email = user.email
                    }
                }
            }

            if(user.name != undefined) {
                editUser.name = user.name
            }

            if(user.role != undefined) {
                editUser.role = user.role
            }

            try {
                await knex.update(editUser).where({id: user.id}).from('users')
                return {status: true}
            } catch(err) {
                console.log(err)
                return {status: false}
            }

        } else {
            return {status: false, err: "O usuário não foi encontrado"}
        }

    }

    async deleteUser(id) {
        try {
            await knex.select("*").where({id}).from("users").del()
            return true
        } catch(err) {
            console.log(err)
            return false
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