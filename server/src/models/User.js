const { Schema, SchemaTypes: Types, model } = require('mongoose');


const userSchema = new Schema({
    username: {
        type: String,
        default: function () {
            return `User_${new Date().getTime()}`;
        }
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'standart'
    }

},
    {
        collation: {
            locale: 'en', strength: 2

        }

    })

const User = model('User', userSchema)

module.exports = { User }

