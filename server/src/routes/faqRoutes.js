const express = require("express");
const { postQuestion } = require("../services/faqService");
const { getUser } = require("../services/userService");


const router = express.Router();

router.post('/postQuestion', async (req, res) => {

    const text = req.body.text;

    const question = await postQuestion(text)

    const token = req.cookies.accessToken;

    if(!token) {
        res.status(403).json({message: 'unauthorized '})
        return
    }

    const user = await getUser(token)

    

    user.questions.push(question)

    


    res.status(200).json({message: 'succesfully posted'})
});


module.exports = router;