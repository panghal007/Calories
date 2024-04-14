const express = require('express')
const router = express.Router()

const loginController = require('../controllers/LoginController')
const registerController = require('../controllers/RegisterController')
const getUserFoodIntake= require('../controllers/UserFoodIntakeController')
const addUserFoodIntake= require('../controllers/FoodController')
const authenticateUser = require('../controllers/authenticateUser');


// router.route('/login').post(loginController)
// router.route('/register').post(registerController)
// router.route('/user-food-intake').post(addUserFoodIntake)
// router.route('/user-calories/:userId/:date').get(getUserFoodIntake)
router.post('/login', loginController)
router.post('/register', registerController)
router.post('/user-food-intake', addUserFoodIntake) // Change here
router.get('/user-calories/:userId/:date', getUserFoodIntake)

router.get('/profile', authenticateUser, (req, res) => {
    // Access authenticated user via req.user
    res.json({ user: req.user });
  });

module.exports = router