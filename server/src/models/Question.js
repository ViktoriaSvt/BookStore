const { Schema, SchemaTypes: Types, model } = require('mongoose');

const questionSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: 'pending'
    },
    creatorId: {
        type: Types.ObjectId,
        ref: 'User',
        default: undefined
    }
})



const Question = model('Question', questionSchema);

module.exports = {
    Question
}