class UserController {

    async create(req, res) {
        let { email, name, password } = req.body

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
        }

        if (fieldValidation(name)) {
            res.status(400)
            res.json({ err: "O nome é inválido!" })
        }

        if (fieldValidation(password)) {
            res.status(400)
            res.json({ err: "A senha é inválida!" })
        }

        if (fieldValidation(email) == false && fieldValidation(name) == false && fieldValidation(password) == false) {
            res.status(200)
            res.send("Tudo OK!")
        }
    }

}

module.exports = new UserController()