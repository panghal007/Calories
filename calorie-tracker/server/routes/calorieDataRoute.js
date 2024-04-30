// calorieDataRoute.js
const express = require('express');
const router = express.Router();
const calorieDataController  = require('../controller/calorieDataContoller');
const authenticateToken = require('../middleware/authentication')

// Route to get user's calorie data
router.get('/:userId',calorieDataController);

module.exports = router;
