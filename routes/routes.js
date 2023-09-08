const express = require('express')
const app = express()
const router = express.Router()
let HomeController = require('../controllers/HomeController')
let UserController = require('../controllers/UserController')

router.get('/', HomeController.index)
router.post('/user', UserController.create)

module.exports = router