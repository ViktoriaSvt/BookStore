const express = require("express");
const { registerUser, generateToken, logUser, verifyToken } = require("../services/authService");
const { getUserById, getUser } = require("../services/userService");
const bcrypt = require('bcrypt');
const { User } = require("../models/User");





const router = express.Router();


router.post("/register", async (req, res) => {

    const data = req.body;

    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
        console.log('email taken!!');
        return res.status(200).json({ message: 'Email is already taken.' });
    }

    const user = await registerUser(data);

    if (!user) {
        return res.status(200).json({ message: "Invalid email or password." });
    }

    const token = generateToken(user);


    res.cookie('accessToken', token, {
        maxAge: 259200000,
        httpOnly: true,
        path: '/'
    });

    res.status(200).json({
        _id: user._id.toString(),
        email: user.email,
        role: user.role
    });



});

router.post("/login", async (req, res) => {

    const userData = req.body;

    const user = await logUser(userData);

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = generateToken(user);


    res.cookie('accessToken', token, {
        maxAge: 259200000,
        httpOnly: true,
        path: '/'
    });


    res.status(200).json({
        _id: user._id,
        email: user.email,
        role: user.role
    });


})

router.post("/logout", async (req, res) => {

    res.clearCookie('accessToken', { path: '/' });
    res.status(200).send('Logged out successfully');
})

router.get('/session', async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await getUser(token, res);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
})

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    if (userId) {
        const user = await getUserById(userId);

        res.status(200).json(user);
    }

})

router.post('/updateProfile', async (req, res) => {
    const { values } = req.body
    const token = req.cookies.accessToken;

    const user = await getUser(token);

    if (user.username) {
        user.username = values.username;
    }

    if (user.description) {
        user.description = values.description;
    }

    user.save()

})








module.exports = router;