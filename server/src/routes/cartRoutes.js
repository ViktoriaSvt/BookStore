
const express = require("express");
const { getUser, getCart } = require("../services/userService");
const { getBookById } = require("../services/bookService");
const { Cart } = require("../models/Cart");
const redis = require("../config/redis");
const { PaymentModel } = require("../models/PaymentModel");
const { updatedCarts } = require("../util/batchSynch");
const { trackSlowQuery } = require("../services/trackingService");
const stripe = require('stripe')('sk_test_51QcrYKJdrx2Bl88huhlvnfqPxrqBmfo9BM6wxg0mlYJugCMEpw9CHlspF8I9tTEzL0gq9NeWcFTNCEoLgDjMTbfu00idvkIYJK');


const router = express.Router();
const returnUrl = "http://localhost:5173/cart";


router.post('/payment', async (req, res, next) => {

    const start = performance.now();

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

        const duration = performance.now() - start;
        await trackSlowQuery('paymenntProcessing', duration, { userId, amount })

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
            error.status = 402; // Payment required
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


router.post("/:bookId", async (req, res, next) => {

    const start = performance.now();

    const bookId = req.params.bookId;
    const token = req.cookies.accessToken;

    const user = await getUser(token);
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
    let cartBooks = JSON.parse(await redis.get(cartKey)) || [];


    if (!cartBooks.some(cartBook => cartBook._id.toString() === book._id.toString())) {
        cartBooks.push(book);
        await redis.setex(cartKey, 3600, JSON.stringify(cartBooks))

        updatedCarts.add(user.cartId);

    }

    const duration = performance.now() - start;
    await trackSlowQuery('cartUpdate', duration, { userId: user._id, bookId });


    res.status(200).json({ message: 'Book added!' });

})

router.get("/items", async (req, res, next) => {

    // const token = req.cookies.accessToken;
    // const userRef = await getUser(token)
    console.log('PROBLEM');
    
    const userRef = req.user

    console.log(userRef);
    

    if (!userRef) {
        const error = new Error("User not found or not authenticated.");
        error.status = 401
        return next(error);
    }

    if (userRef.role == "admin") {
        const error = new Error("Access denied for admin roles.");
        error.status = 403
        return next(error);
    }


    const cartKey = `cart:${userRef.cartId}`;
    let cartBooks = await redis.get(cartKey);


    if (cartBooks) {

        return res.status(200).json(JSON.parse(cartBooks));
    }



    const cart = await Cart.findById(userRef.cartId).populate('books');
    cartBooks = cart.books.map(book => book._id.toString());
    redis.setex(cartKey, 3600, JSON.stringify(cartBooks));

    res.status(200).json(cart.books)

})

router.delete("/remove/:bookId", async (req, res, next) => {
    const { bookId } = req.params;
    const token = req.cookies.accessToken;

    const user = await getUser(token);
    const cartKey = `cart:${user.cartId}`;

    const cachedCart = await redis.get(cartKey);

    if (cachedCart) {
        let cartBooks = JSON.parse(cachedCart)

        cartBooks = cartBooks.filter(book => book._id.toString() !== bookId);
        await redis.setex(cartKey, 3600, JSON.stringify(cartBooks))

        updatedCarts.add(user.cartId);

    }



    res.status(200).send({ message: "Book removed from cart" });
})



module.exports = router;