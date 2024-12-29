const express = require("express");
const { registerUser, generateToken, logUser, verifyToken } = require("../services/authService");
const { getUserById } = require("../services/userService");
const { default: mongoose } = require("mongoose");




const router = express.Router();


router.post("/register", async (req, res) => {
    try {

        const data = req.body;
        const user = await registerUser(data);
        const token = generateToken(user);

        res.cookie('accessToken', token, {
            maxAge: 259200000,
            httpOnly: true,
            path: '/'
        });


        res.status(200).json({
            _id: user._id.toString(),
            email: user.email,
        });


    } catch (error) {
        res.status(500).json({ error: "Failed to register user" });
    }
});

router.post("/login", async (req, res) => {

    const userData = req.body;

    try {
        const user = await logUser(userData);
        const token = generateToken(user);

        res.cookie('accessToken', token, {
            maxAge: 259200000,
            httpOnly: true,
            path: '/'
        });

        res.status(200).json({
            _id: user._id,
            email: user.email,
        });



    } catch (error) {
        throw new Error(error.message);
    }
})

router.get('/session', async (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userData = verifyToken(token);

    const userId = new mongoose.Types.ObjectId(userData._id);
    const user = await getUserById(userId);

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





module.exports = router;