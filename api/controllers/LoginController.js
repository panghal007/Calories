
// const express = require('express');
// const router = express.Router();
// const User = require('../models/userSchema');
// const jwt = require('jsonwebtoken');
// const bcrypt = require("bcrypt");

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Please provide email and password' });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const isPasswordValid = await user.comparePassword(password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // console.log(req.body);
//     //find a user by their email
//     const user = await User.findOne({ email });

//     //  console.log(user);
//     //if user email is found, compare password with bcrypt
//     if (user) {
//       const isSame = await bcrypt.compare(password, user.password);

//       //if password is the same
//       //generate token with the user's id and the secretKey in the env file

//       if (isSame) {
//         const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

//         //if password matches wit the one in the database
//         //go ahead and generate a cookie for the user
//         res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
//         // console.log("user", JSON.stringify(user, null, 2));
//         // console.log(token);
//         //send user data
//         return res.status(201).json({ user, token });

//       } else {
//         return res.status(401).send("Authentication failed 1");
//       }
//     } else {
//       return res.status(401).send("Authentication failed");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
// module.exports = router;
// module.exports = {
//   // signup,
//   login,
// };

// exports.loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Fetch user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: 'Authentication failed' });
//     }

//     // Verify password
//     const isPasswordValid = await user.isValidPassword(password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Authentication failed' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

//     res.status(200).json({ token });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        // Generate the JWT token using the createJWT method from the user instance
        const token = await user.createJWT();
        console.log(token);
        const userData = {
          username: user.username,
          email: user.email,
          // Add other user data fields as needed
        };
        // Send the token and user data back to the client
        return res.status(200).json({ user:userData, token });
      } else {
        return res.status(401).send("Authentication failed: Incorrect password");
      }
    } else {
      return res.status(401).send("Authentication failed: User not found");
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = loginController;
