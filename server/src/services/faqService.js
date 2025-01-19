const { Question } = require("../models/Question");
const { getUser } = require("./userService");


async function postQuestion(text, creatorId) {

    const question = new Question({
        text,
        creatorId
    })

    await question.save()

    return question

}

async function postAnswer(text, questionId) {

    const question =await Question.findById(questionId);
    question.answer = text;
    question.status = 'answered'
    

    question.save()
    return question;
}

async function getAllUnanswered() {
    const questions = await Question.find({});
    return questions;
}


module.exports = { postQuestion , postAnswer, getAllUnanswered}