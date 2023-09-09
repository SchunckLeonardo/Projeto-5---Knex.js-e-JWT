const express = require('express')
const router = express.Router()
let HomeController = require('../controllers/HomeController')
let UserController = require('../controllers/UserController')
let AdminAuth = require('../middlewares/AdminAuth')

router.get('/', HomeController.index)
router.post('/user', UserController.create)
router.get('/user',AdminAuth, UserController.findAllUsers)
router.get('/user/:id',AdminAuth, UserController.findUserById)
router.put('/user/:id',AdminAuth, UserController.update)
router.delete('/user/:id',AdminAuth, UserController.delete)
router.post('/recoverpassword', UserController.recoverPassword)
router.post('/changepassword/:token', UserController.changePassword)
router.post('/login', UserController.login)

module.exports = router