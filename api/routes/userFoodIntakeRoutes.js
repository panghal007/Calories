const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// Endpoint to get user's calorie intake for a specific day
router.get('/user-calories/:userId/:date', async (req, res) => {
    try {
        const userId = req.params.userId;
        const date = new Date(req.params.date);

        // Find user's food intake records for the specified day
        const userFoodIntake = await Food.find({
            userId: userId,
            timestamp: {
                $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()), // Start of day
                $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1) // End of day
            }
        });

        // Calculate total calories consumed
        const totalCalories = userFoodIntake.reduce((total, intake) => total + intake.calories, 0);
        const totalProteins = userFoodIntake.reduce((total1, intake) => total1 + intake.proteins, 0);
        const totalFats = userFoodIntake.reduce((total2, intake) => total2 + intake.fats, 0);

        res.json({ userId, date, totalCalories ,totalFats,totalProteins});
    } catch (error) {
        console.error('Error fetching user calories:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



// Endpoint to log user food intake
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
    router.post('/user-food-intake', async (req, res) => {
        try {
        const foodItems = req.body;
            // console.log(userId);
        // Create an array to store all the new food intake documents
        const newFoodIntakes = [];

        // Iterate over each food item and create a new document for it
        for (const foodItem of foodItems) {
            const newFoodIntake = await Food.create({ 
                userId:foodItem.userId,
                name: foodItem.foodName, 
                quantity: foodItem.quantity, 
                servingSize: foodItem.servingSize, 
                calories: foodItem.calories,
                proteins:foodItem.proteins,
                fats:foodItem.fats,
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

