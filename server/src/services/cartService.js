const { Cart } = require("../models/Cart");


async function getCart(cartId) {
    const cart = Cart.findById(cartId)
    return cart;
}

async function removeFromCart(bookId) {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return
    }

    
    const updatedCart = await Cart.findOneAndUpdate(
      { userId, 'books': bookId },
      { $pull: { books: bookId } },
      { new: true } 
    );
}


module.exports = { getCart , removeFromCart}