const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    userId: {  type: String,  required: true }, // Reference to the user who logged the intake
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    servingSize: { type: Number, required: true },
    calories:{ type: Number, required: true},
    proteins:{ type: Number, required: true},
    fats:{ type: Number, required: true},
    timestamp: { type: Date, default: Date.now }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;