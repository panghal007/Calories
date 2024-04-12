// const express = require('express');
// const router = express.Router();
// const Food = require('../models/Food');
// const UserFoodIntake = require('../models/UserFoodIntake');

// // Endpoint to log user food intake
// router.post('/user-food-intake', async (req, res) => {
//     try {
//         const { userId, foodId, quantity } = req.body;

//         // Check if the food item exists
//         const foodItem = await Food.findById(foodId);
//         if (!foodItem) {
//             return res.status(404).json({ message: 'Food item not found' });
//         }

//         // Create a new UserFoodIntake document and associate it with the user and food item
//         const newUserFoodIntake = await UserFoodIntake.create({ 
//             user: userId, // Associate food intake with the user
//             food: foodId, // Associate food intake with the food item
//             quantity 
//         });

//         res.status(201).json({ message: 'Food intake logged successfully', data: newUserFoodIntake });
//     } catch (error) {
//         console.error('Error logging food intake:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const Food = require('../models/Food');

// // Endpoint to log user food intake
// router.post('/user-food-intake', async (req, res) => {
//     try {
//         const { foodName, quantity, servingSize, timestamp } = req.body;

//         // Create a new Food document
//         const newFoodIntake = await Food.create({ 
//             name: foodName, 
//             quantity, 
//             servingSize, 
//             timestamp 
//         });

//         res.status(201).json({ message: 'Food intake logged successfully', data: newFoodIntake });
//     } catch (error) {
//         console.error('Error logging food intake:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;

