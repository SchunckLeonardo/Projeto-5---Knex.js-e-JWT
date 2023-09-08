const express = require('express')
const router = express.Router()
let HomeController = require('../controllers/HomeController')
let UserController = require('../controllers/UserController')

router.get('/', HomeController.index)
router.post('/user', UserController.create)
router.get('/user', UserController.findAllUsers)
router.get('/user/:id', UserController.findUserById)
router.put('/user/:id', UserController.update)

module.exports = router