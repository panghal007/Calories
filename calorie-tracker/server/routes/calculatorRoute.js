const express = require('express')
const router = express.Router()

const calculatorController = require('../controller/Calculator')

router.route('/:userId').post(calculatorController.calculate)

module.exports = router