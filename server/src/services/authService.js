const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

async function registerUser(userData) {

    console.log('rregisterUser func');

    const hashPass = await bcrypt.hash(userData.password, 10);

    const user = new User ({
        email: userData.email,
        password: hashPass
    })

    await user.save();

    console.log('returning user');
    return user;


}


async function generateToken(userData) {

    console.log('generating token');
    

    const playload = {
        _id: userData._id,
        email: userData.email
    }

    const token = jwt.sign(playload, 'your-secret-key', {expiresIn: '3d'});

    return token;
}

module.exports = { registerUser, generateToken }