const express = require('express')
const router = express.Router()

const calorieController = require('../controller/Calorie')

router.route('/:userId').post(calorieController.calculate)

module.exports = router