const express = require("express");
const { registerUser, generateToken } = require("../services/authService");



const router = express.Router();
console.log("Registering user route...");

router.post("/register", async (req, res) => {
    try {

        console.log('in request: /register');
        const data = req.body;
        const user = await registerUser(data)
        const token = generateToken(user)

        res.cookie('accessToken', token, {
            maxAge: 259200000,
            httpOnly: false, 
            path: '/'
        });
        console.log('cookie sent: /register');
       
        res.status(200).json({
            _id: user._id,
            email: user.email,
            accessToken: token
        });


    } catch (error) {
        res.status(500).json({ error: "Failed to register user" });
    }
});

module.exports = router;