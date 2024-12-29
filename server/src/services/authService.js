const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');


async function registerUser(userData) {

    const hashPass = await bcrypt.hash(userData.password, 10);

    const user = new User({
        email: userData.email,
        password: hashPass
    })

    await user.save();



    return user;


}

async function logUser(userData) {

    const user = await User.findOne({ email: userData.email }).lean();

    if (!user) {
        throw new Error("Invalid email.");
    }

    const isValidPass = await bcrypt.compare(userData.password, user.password);

    if (!isValidPass) {
        throw new Error("Invalid password.");
    }

    return user
}


 function generateToken(userData) {

    const playload = {
        _id: userData._id,
        email: userData.email
    }



    const token = jwt.sign(playload, 'your-secret-key', { expiresIn: '3d' });

  

    return token;
}



function verifyToken(token) {
    try {
        const payload = jwt.verify(token, 'your-secret-key');
        return payload; // Returns the decoded payload if the token is valid
    } catch (error) {
        console.error("Token verification failed:", error.message);
      
    }
}

module.exports = { registerUser,logUser,  generateToken , verifyToken}