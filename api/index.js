// const express = require('express');
// const mongoose = require('mongoose');
// const userFoodIntakeRoutes = require('./routes/userFoodIntakeRoutes');

// const app = express();

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://panghalunique:gDy1Dtlvd0POMRki@cluster0.nnlx5b2.mongodb.net/', {
   
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(error => console.error('MongoDB connection error:', error));

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api', userFoodIntakeRoutes);

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
// //gDy1Dtlvd0POMRki
const express = require('express');
const mongoose = require('mongoose');
const userFoodIntakeRoutes = require('./routes/userFoodIntakeRoutes');
const cors = require('cors'); // Import the cors package

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://panghalunique:gDy1Dtlvd0POMRki@cluster0.nnlx5b2.mongodb.net/your-database-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('MongoDB connection error:', error));

// Middleware
app.use(express.json());
app.use(cors()); 
// Routes
app.use('/api', userFoodIntakeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});