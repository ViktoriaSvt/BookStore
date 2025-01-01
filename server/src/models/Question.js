const { Schema, SchemaTypes: Types, model } = require('mongoose');

const questionSchema = new Schema({
    text: {
        type: String,
        reqired: true
    },
    answer: {
        type: String,
        default: undefined
    }
})


const Question = model('Question', questionSchema);

module.exports = {
    Question
}