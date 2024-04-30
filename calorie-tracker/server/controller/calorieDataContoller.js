// calorieDataController.js
const CalorieData = require('../models/calorieSchema');

// Controller function to get user's calorie data
const calorieDataController = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if there is calorie data for the specified userId
    const calorieData = await CalorieData.findOne({ user: userId });

    if (calorieData) {
      // If data exists, send it in the response
      res.json(calorieData);
    } else {
      // If no data found, send an empty response
      res.json({});
    }
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error fetching calorie data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = calorieDataController ;
