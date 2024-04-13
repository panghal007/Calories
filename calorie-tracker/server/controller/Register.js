const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')

const registerController = async(req,res) => {

    try {
        const {username, email, password, age, height, weight, targetWeight,gender,lifestyle} = req.body;
        const user = await User.create({username, email, password, age, height, weight, targetWeight,gender,lifestyle})
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({user: {name:user.username},token})
        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error,
        })
    }
}

module.exports = registerController