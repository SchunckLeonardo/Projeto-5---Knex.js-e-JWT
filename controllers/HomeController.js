class HomeController {
    async index(req, res) {
        res.send('APP Express - Guia do programador')
    }
}

module.exports = new HomeController()