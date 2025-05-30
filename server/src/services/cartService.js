const { Cart } = require("../models/Cart");
const { getUserById } = require("./userService");

async function getCart(cartId) {
    const cart = await Cart.findById(cartId);
    return cart;
}

async function removeFromCart(userId, bookId) {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
        throw new Error("Cart not found");
    }

    const updatedCart = await Cart.findOneAndUpdate(
        { userId, 'books': bookId },
        { $pull: { books: bookId } },
        { new: true }
    );
    
    return updatedCart.books;
}

async function updateCartInDb(userId, book) {
    const user = await getUserById(userId);
    const dbCart = await Cart.findById(user.cartId);
    let cartBooks = dbCart ? dbCart.books : [];

    if (!cartBooks.some(cartBook => cartBook.id.toString() === book.id.toString())) {
        cartBooks.push(book);
        await Cart.findByIdAndUpdate(user.cartId, { books: cartBooks }, { new: true });
    }

    return cartBooks;
}

async function getCartBooksFromDb(cartId) {
    const cart = await Cart.findById(cartId).populate('books');
    return cart.books;
}

module.exports = { getCart, removeFromCart, updateCartInDb, getCartBooksFromDb };
