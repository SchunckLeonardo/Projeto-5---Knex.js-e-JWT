let jwt = require('jsonwebtoken')
let secret = 'asjfoiajwifawiopfmwmfpoawnmfn2i04jn1i02ndkamwpoi'

module.exports = function (req, res, next) {
    let authToken = req.headers['authorization']

    if (authToken != undefined) {

        let bearer = authToken.split(" ")
        let token = bearer[1]

        try {

            let decoded = jwt.verify(token, secret)

            if(decoded.role == 1) {
                next()
            } else {
                res.status(400)
                res.send('Você não tem permissão')
            }

        } catch (err) {
            res.status(403)
            res.send('Você não está autenticado')
        }

    } else {
        res.status(405)
        res.send('Sem token de autorização')
        return
    }

}