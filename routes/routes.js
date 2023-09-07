const express = require('express')
const app = express()
const router = express.Router()
let HomeController = require('../controllers/HomeController')

router.get('/', HomeController.index)

module.exports = router