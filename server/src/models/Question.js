const { Schema, SchemaTypes: Types, model } = require('mongoose');

const questionSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        default: null
    }
})



const Question = model('Question', questionSchema);

module.exports = {
    Question
}