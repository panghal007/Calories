const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).send('Authentication Error')
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        //attach the user to the job routes
        req.user = {userId : payload.userId, name: payload.name}
        next()
    } catch (error) {
        return res.status(401).send('Authentication Error')
    }
}

module.exports = auth