const express = require('express')
const router = express.Router()

const loginController = require('../controller/Login')
const registerController = require('../controller/Register')

router.route('/login').post(loginController)
router.route('/register').post(registerController)

module.exports = router


