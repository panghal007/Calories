const UserFoodIntake = require('../models/UserFoodIntake');

exports.addUserFoodIntake = async (req, res) => {
    try {
        const { userId, foodId, quantity } = req.body;

        const userFoodIntake = new UserFoodIntake({
            user: userId,
            food: foodId,
            quantity
        });

        await userFoodIntake.save();

        res.status(201).json({ message: 'User food intake added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
