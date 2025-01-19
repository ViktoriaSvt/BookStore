const {Schema, SchemaTypes: Types, model} = require('mongoose');


const bookSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    genre: {
        type:String,
        required: true
    },
    author: {
        type:String,
        required: true
    },
    bannerImageUrl: { 
        type: String,
        required: false
    },
    coverImageUrl: {  
        type: String,
        required: false
    },
    year: {
        type: Number,
        required:true,
        min: 1878,
        max:2100
    },
    price: {
        type: Number,
        required:true,
        min: 0,
    },
    description: {
        type:String,
        required: true,
        maxLength: 10000
    },
    creatorId: {
        type: Types.ObjectId,
        ref: 'User',
        default: undefined
    }
})

const Book = model('Book', bookSchema);

module.exports = {
    Book
}