let User = require('../models/User')
let PasswordToken = require('../models/PasswordToken')
let Validation = require('../models/Validation')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

let secret = 'asjfoiajwifawiopfmwmfpoawnmfn2i04jn1i02ndkamwpoi'

class UserController {

    async findAllUsers(req, res) {
        try {
            let allUsers = await User.findAll()
            res.status(200)
            res.json(allUsers)
        } catch (err) {
            console.log(err)
        }
    }

    async findUserById(req, res) {
        let id = req.params.id

        if (isNaN(id)) {
            res.status(400)
            res.json({ err: "O ID tem que ser um número" })
            return
        }

        let user = await User.findById(id)
        res.status(200)
        res.json(user)
    }

    async create(req, res) {
        let { email, name, password } = req.body

        let user = {
            name,
            email,
            password
        }

        if (Validation.fieldValidation(email)) {
            res.status(400)
            res.json({ err: "O e-mail é inválido!" })
            return
        }

        if (Validation.fieldValidation(name)) {
            res.status(400)
            res.json({ err: "O nome é inválido!" })
            return
        }

        if (Validation.fieldValidation(password)) {
            res.status(400)
            res.json({ err: "A senha é inválida!" })
            return
        }

        let emailExist = await User.validationEmail(user.email)

        if (emailExist) {
            res.status(406)
            res.json({ err: "O e-mail já está cadastrado!" })
            return
        }


        await User.signIn(user)
        res.status(200)
        res.send("Tudo OK!")
    }

    async update(req, res) {
        let { name, email, role } = req.body
        let id = req.params.id
        let user = {
            id,
            name,
            email,
            role
        }

        if (isNaN(id)) {
            res.status(404)
            res.json({ err: "O id tem que ser um número" })
            return
        }

        let updatedUser = await User.updateUser(user)
        if (updatedUser.status) {
            res.status(200)
            res.send("Atualizado com sucesso!")
        } else {
            res.status(406)
            res.send(updatedUser.err)
        }
    }

    async delete(req, res) {
        let id = req.params.id

        if (isNaN(id)) {
            res.status(404)
            res.json({ err: "O id tem que ser um número" })
            return
        }

        let deletedUser = await User.deleteUser(id)
        if (deletedUser.status) {
            res.status(200)
            res.send("O usuário foi deletado")
        } else {
            res.status(400)
            res.send(deletedUser.err)
        }
    }

    async recoverPassword(req, res) {
        let email = req.body.email
        if (Validation.fieldValidation(email)) {
            res.status(400)
            res.send("O e-mail é inválido!")
            return
        }

        let tokenGenerated = await PasswordToken.createToken(email)

        if (tokenGenerated.status) {
            res.status(200)
            res.send(tokenGenerated.token)
        } else {
            res.status(406)
            res.send(tokenGenerated.err)
        }

    }

    async changePassword(req, res) {
        let token = req.params.token
        let password = req.body.password
        if (Validation.fieldValidation(password)) {
            res.status(400)
            res.send("A senha é inválida!")
            return
        }

        let isValidToken = await PasswordToken.validateToken(token)
        if (isValidToken.status) {
            await User.newPassword(password, isValidToken.token.user_id)
            res.status(200)
            res.send('Senha alterada com sucesso!')
        } else {
            res.status(406)
            res.send(isValidToken.err)
        }
    }

    async login(req, res) {
        let {email, password} = req.body
        
        let user = await User.findByEmail(email)

        if(user) {

            let isValidPassword = await bcrypt.compare(password, user.password)

            if(isValidPassword) {
                let token = jwt.sign({ email: user.email, role: user.role }, secret);
                res.status(200)
                res.json({token})
            } else {
                res.status(400)
                res.json({err: "Senha incorreta"})
            }

        } else {
            res.status(404)
            res.json({err: "Usuário não identificado"})
        }

    }

}

module.exports = new UserController()