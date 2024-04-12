const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userFoodIntakeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    food: { type: Schema.Types.ObjectId, ref: 'Food', required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    // Add calories field to store the calories of the food item
    calories: { type: Number, required: true }
});

const UserFoodIntake = mongoose.model('UserFoodIntake', userFoodIntakeSchema);

module.exports = UserFoodIntake;
