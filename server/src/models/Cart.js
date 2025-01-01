const {Schema, SchemaTypes: Types, model} = require('mongoose');

const cartSchema = new Schema({
    books: [{
          type: Schema.Types.ObjectId,
          ref: 'Book'
}]
})


const Cart = model('Cart', cartSchema);

module.exports = {
    Cart
}