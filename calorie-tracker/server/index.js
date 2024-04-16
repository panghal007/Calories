require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const authenticateUser = require('./middleware/authentication')

const routes = require('./routes/userRoute')
const calorieRoute = require('./routes/calculatorRoute')

app.use(express.json());
app.use(cors())

const connectDB = require('./db/connect')

app.use('/api/v1',routes)
app.use('/api/v1',calorieRoute)

app.get('/' , (req,res) => {
    res.send('<h1>Hello World</h1>')
})

const port = process.env.PORT || 5000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,() => console.log(`server is listening on port ${port}`));
    } catch (error) {
        console.log(error)
    }
}

start()