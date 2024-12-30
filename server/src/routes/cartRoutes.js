
const express = require("express");
const { getUserById, getUser, getCart } = require("../services/userService");
const { getBookById } = require("../services/bookService");
const { Cart } = require("../models/Cart");
const { removeFromCart } = require("../services/cartService");


const router = express.Router();


router.post("/:bookId", async (req, res) => {

    const bookId = req.params.bookId;
    const token = req.cookies.accessToken;

        const user = await getUser(token);
        const book = await getBookById(bookId);
        

        if (!user || !book) {
            return res.status(404).json({ message: "User or Book not found" });
        }

        const cart = await getCart(user.cartId);
        console.log(cart);
        

        if (!cart.books.includes(bookId)) {
            cart.books.push(bookId);
        }

        await cart.save()
        await user.save();

        res.status(200);

})

router.get("/items", async (req, res) => {

    const token = req.cookies.accessToken;
    const userRef = await getUser(token)

    console.log('referencing: ',userRef);
    

    const user = await userRef.populate('cartId');

    const cartRef = user.cartId;
    const cart = await Cart.findById(cartRef)
    console.log(cart);
    
    await cart.populate('books');

    console.log('Populated cart:', cart);
    


 res.status(200).json(cart.books)
})

router.delete("/remove/:bookId", async (req, res) => {
    const token = req.cookies.accessToken;
    const user =await getUser(token, res);
    const { bookId } = req.params

    console.log('USER');
    console.log(user);
    
    const cart = await getCart(user.cartId)

    console.log('CART');
    console.log(cart);

    const index = cart.books.indexOf(bookId);
    if (index !== -1) {
      cart.books.splice(index, 1);
      await cart.save(); 
    }
  
    res.status(200).send({ message: "Book removed from cart" });
})

module.exports = router;