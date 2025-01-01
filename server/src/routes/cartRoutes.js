
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


        if(!user.cartId ) {
            return res.status(403).json({ message: "Unauthorized action for administrator roles" });
        }

        const cart = await getCart(user.cartId);
      
        if (!cart.books.includes(bookId)) {
            cart.books.push(bookId);
        }

        await cart.save()
        await user.save();

        res.status(200).json({ message: 'Book added!' });


})

router.get("/items", async (req, res) => {

    const token = req.cookies.accessToken;
    const userRef = await getUser(token)

    if(userRef.role == "admin") {
        res.status(403).json({ message: 'Access denied for administrator roles'})
        return
    }


    const user = await userRef.populate('cartId');

    const cartRef = user.cartId;
    const cart = await Cart.findById(cartRef)

    
    await cart.populate('books');

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