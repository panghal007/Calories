const mongoose = require('mongoose')

const calorieSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    bmr: {
        type: Number
    },
    tdee: {
        type: Number
    },
    targetCalories: {
        type: Number
    },
    dailyProtein: {
        type: Number
    },
    dailyFats: {
        type: Number
    },
    targetCaloriesLoss:{
        type: Number
    },
    targetCaloriesGain:{
        type: Number
    },
    dailyCarb: {
        type: Number
    }
})

module.exports = mongoose.model('calorieData',calorieSchema)