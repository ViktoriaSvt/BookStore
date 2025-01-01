const { Question } = require("../models/Question")


async function postQuestion(text) {

    console.log('creating question');
    console.log('with text', text);
    
    
    
const question = new Question ({
    text
})

console.log('saving... question');

await question.save()

console.log('returning... question', question);
return question

}

module.exports = {postQuestion}