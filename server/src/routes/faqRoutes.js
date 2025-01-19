const express = require("express");
const { postQuestion, getAllUnanswered, postAnswer } = require("../services/faqService");
const { getUser } = require("../services/userService");
const { text } = require("body-parser");


const router = express.Router();

router.post('/postQuestion', async (req, res) => {

    const text = req.body.text;
    const token = req.cookies.accessToken;
    const user = await getUser(token)

    const question = await postQuestion(text, user._id)

    if (!token) {
        res.status(403).json({ message: 'unauthorized ' })
        return
    }

    user.questions.push(question)

    res.status(200).json({ message: 'succesfully posted' })
});

router.get('/all', async (req, res) => {
    const questions = await getAllUnanswered();
    res.status(200).json(questions)
})

router.post('/:questionId', async (req, res) => {

    const id = req.params.questionId;
    const { text } = req.body;

    await postAnswer(id, text);

    res.status(200).json({ message: 'successful' })
})



module.exports = router;