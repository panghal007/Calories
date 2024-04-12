// const express = require('express');
// const router = express.Router();
// const UserFoodIntakeController = require('../controllers/UserFoodIntakeController');

// // Route for adding user food intake
// router.post('/user-food-intake', UserFoodIntakeController.addUserFoodIntake);

// module.exports = router;

const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// Endpoint to log user food intake
router.post('/user-food-intake', async (req, res) => {
    // try {
    //     const { foodName, quantity, servingSize, calories,timestamp } = req.body;
    //     console.log(foodName);
    //     // Create a new Food document
    //     const newFoodIntake = await Food.create({ 
    //         name: foodName, 
    //         quantity, 
    //         servingSize, 
    //         calories,
    //         timestamp 
    //     });

    //     res.status(201).json({ message: 'Food intake logged successfully', data: newFoodIntake });
    // } catch (error) {
    //     console.error('Error logging food intake2:', error);
    //     res.status(500).json({ message: 'Server error' });
    // }
    try {
        const foodItems = req.body;

        // Create an array to store all the new food intake documents
        const newFoodIntakes = [];

        // Iterate over each food item and create a new document for it
        for (const foodItem of foodItems) {
            const newFoodIntake = await Food.create({ 
                name: foodItem.foodName, 
                quantity: foodItem.quantity, 
                servingSize: foodItem.servingSize, 
                calories: foodItem.calories,
                timestamp: foodItem.timestamp 
            });

            newFoodIntakes.push(newFoodIntake);
        }

        res.status(201).json({ message: 'Food intake logged successfully', data: newFoodIntakes });
    } catch (error) {
        console.error('Error logging food intake:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

