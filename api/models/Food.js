const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    servingSize: { type: String, required: true },
    calories:{ type: String , required: true},
    timestamp: { type: Date, default: Date.now }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;