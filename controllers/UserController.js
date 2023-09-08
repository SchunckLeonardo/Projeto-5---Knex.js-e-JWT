let User = require('../models/User')

class UserController {

    async create(req, res) {
        let { email, name, password } = req.body

        let user = {
            name,
            email,
            password
        }

        let fieldValidation = field => {
            if (field == undefined || field == "" || field == " ") {
                return true
            } else {
                return false
            }
        }

        if (fieldValidation(email)) {
            res.status(400)
            res.json({ err: "O e-mail é inválido!" })
            return
        }

        if (fieldValidation(name)) {
            res.status(400)
            res.json({ err: "O nome é inválido!" })
            return
        }

        if (fieldValidation(password)) {
            res.status(400)
            res.json({ err: "A senha é inválida!" })
            return
        }

        let emailExist = await User.validationEmail(user)

        if(emailExist) {
            res.status(406)
            res.json({err: "O e-mail já está cadastrado!"})
            return
        }

        
        await User.signIn(user)
        res.status(200)
        res.send("Tudo OK!")
    }

}

module.exports = new UserController()