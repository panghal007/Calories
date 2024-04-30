// const User = require('../models/userSchema')
// const jwt = require('jsonwebtoken')

// const auth = (req,res,next) => {

//     const authHeader = req.headers.authorization

//     if(!authHeader || !authHeader.startsWith('Bearer ')){
//         return res.status(401).send('Authentication Error')
//     }
//     const token = authHeader.split(' ')[1]

//     try {
//         const payload = jwt.verify(token,process.env.JWT_SECRET)
//         //attach the user to the job routes
//         req.user = {userId : payload.userId, name: payload.name}
//         next()
//     } catch (error) {
//         return res.status(401).send('Authentication Error')
//     }
// }

// module.exports = auth

// authenticateToken.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get the authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // If token is not provided, return 401 Unauthorized error
    return res.status(401).json({ error: 'Unauthorized: Token is required' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // If token verification fails, return 403 Forbidden error
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    // If token is valid, set user object in request and call next middleware
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
