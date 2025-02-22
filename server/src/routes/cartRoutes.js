
const express = require("express");
const { getUser, getUserById } = require("../services/userService");
const { getBookById } = require("../services/bookService");
const { Cart } = require("../models/Cart");
const redis = require("../config/redis");
const { PaymentModel } = require("../models/PaymentModel");
const { trackSlowQuery } = require("../services/trackingService");
const { trackPerformance } = require("../middleware/tracker");
const { updateCartInDb, getCartBooksFromDb } = require("../services/cartService");
const stripe = require('stripe')('sk_test_51QcrYKJdrx2Bl88huhlvnfqPxrqBmfo9BM6wxg0mlYJugCMEpw9CHlspF8I9tTEzL0gq9NeWcFTNCEoLgDjMTbfu00idvkIYJK');


const router = express.Router();
const returnUrl = "http://localhost:5173/cart";



router.post('/payment', trackPerformance('orderProcessing'), async (req, res, next) => {

    const { paymentMethodId, amount } = req.body
    const token = req.cookies.accessToken;
    const user = await getUser(token)

    if (!user) {
        const error = new Error("User not found .");
        error.status = 404
        return next(error);
    }

    const userId = user._id
    const cartKey = `cart:${user.cartId}`

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            payment_method: paymentMethodId,
            confirm: true,
            automatic_payment_methods: { enabled: true },
            return_url: returnUrl
        });
        
        if (paymentIntent.status === "requires_action" || paymentIntent.status === "requires_source_action") {
            await PaymentModel.create({ userId, amount, paymentIntentId: paymentIntent.id, paymentStatus: "denied" });

            return res.status(200).send({
                requiresAction: true,
                paymentIntentClientSecret: paymentIntent.client_secret,
            });
        }

        if (paymentIntent.status === "requires_payment_method") {
            await PaymentModel.create({ userId, amount, paymentIntentId: paymentIntent.id, paymentStatus: "denied" });

            const error = new Error("Payment failed. Authentication or payment method issue.");
            error.status = 402;
            return next(error);
        }

        const cartBooks = JSON.parse(await redis.get(cartKey)) || [];
        await Cart.findByIdAndUpdate(user.cartId, { books: cartBooks });

        const bookTitles = cartBooks.map(book => book.title);
        await PaymentModel.create({ userId, amount, paymentIntentId: paymentIntent.id, paymentStatus: "succeeded", bookTitles });


        await Cart.findByIdAndUpdate(user.cartId, { books: [] });
        await redis.del(cartKey);


        res.status(200).send({ success: true });

    } catch (err) {

        if (err.type === 'StripeCardError') {

            const error = new Error(err.message);
            error.status = 402;
            return next(error);
        }

        next(err)
    }
})

router.post("/:bookId", trackPerformance('addToCart'), async (req, res, next) => {


    const bookId = req.params.bookId;
    const userRef = req.user;
    let user = null;

    if (userRef) {
        user = await getUserById(userRef._id)
    };

    const book = await getBookById(bookId);



    if (!user || !book) {
        const error = new Error("User or book not found.");
        error.status = 404
        return next(error);
    }


    if (!user.cartId) {
        const error = new Error("unauthorised action for admin roles");
        error.status = 403
        return next(error);
    }

    const cartKey = `cart:${user.cartId}`
    let cartBooks = [];

    if (redis.connected) {
        await redis.watch(cartKey);

        const cachedCart = await redis.get(cartKey);

        if (cachedCart) {
            console.log('in cache');
            cartBooks = JSON.parse(cachedCart);

            if (!cartBooks.some(cartBook => cartBook.id.toString() === book.id.toString())) {
                cartBooks.push(book);
                await redis.multi()
                    .set(cartKey, JSON.stringify(cartBooks))
                    .exec(); //
                updatedCarts.add(user.cartId);
            }
        } else {
            cartBooks = await updateCartInDb(user._id, book);

            await redis.set(cartKey, JSON.stringify(cartBooks));
            updatedCarts.add(user.cartId);
        }
    } else {
        cartBooks = await updateCartInDb(user._id, book);
    }

    res.status(200).json({ message: 'Book added!' });

})

router.get("/items", trackPerformance('fetchCart'), async (req, res, next) => {

    const userRef = req.user;
    let user = null;

    if (userRef) {
        user = await getUserById(userRef._id)
    };

    if (!user) {
        const error = new Error("User not found or not authenticated.");
        error.status = 401
        return next(error);
    }

    if (user.role == "admin") {
        const error = new Error("Access denied for admin roles.");
        error.status = 403
        return next(error);
    }

    const cartId = user.cartId;
    const cartKey = `cart:${cartId}`;
    let cartBooks = null

    if (redis.connected) {
        cartBooks = await redis.get(cartKey);

        if (cartBooks) {
            return res.status(200).json(JSON.parse(cartBooks));
        }

        cartBooks = await getCartBooksFromDb(cartId)
        await redis.set(cartKey, JSON.stringify(cartBooks));
    } else {
        cartBooks = await getCartBooksFromDb(cartId)
    }

    res.status(200).json(cartBooks)

})

router.delete("/remove/:bookId", async (req, res, next) => {
    const { bookId } = req.params;
    const userRef = req.user;
    let user = null;

    if (userRef) {
        user = await getUserById(userRef._id)
    };

    const cartKey = `cart:${user.cartId}`;

    if (redis.connected) {
        let cartBooks = await redis.get(cartKey);

        if (cartBooks) {

            cartBooks = JSON.parse(cartBooks);
            cartBooks = cartBooks.filter(book => book.id.toString() !== bookId);
            await redis.set(cartKey, JSON.stringify(cartBooks));

            updatedCarts.add(user.cartId);
            return res.status(200).send({ message: "Book removed from cart" });
        }
    }

    const cart = await Cart.findById(user.cartId);

    if (!cart) {
        return res.status(404).send({ message: "Cart not found" });
    }

    cart.books = cart.books.filter(book => book.id.toString() !== bookId);

    await cart.save();

    if (redis.connected) {
        await redis.set(cartKey, JSON.stringify(cart.books));
    }

    return res.status(200).send({ message: "Book removed from cart" });
});






module.exports = router;