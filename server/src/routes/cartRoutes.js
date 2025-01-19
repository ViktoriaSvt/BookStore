
const express = require("express");
const { getUser, getCart } = require("../services/userService");
const { getBookById } = require("../services/bookService");
const { Cart } = require("../models/Cart");
const redis = require("../config/redis");
const { PaymentModel } = require("../models/PaymentModel");
const stripe = require('stripe')('sk_test_51QcrYKJdrx2Bl88huhlvnfqPxrqBmfo9BM6wxg0mlYJugCMEpw9CHlspF8I9tTEzL0gq9NeWcFTNCEoLgDjMTbfu00idvkIYJK');




const router = express.Router();
const returnUrl = "http://localhost:5173/cart";


router.post('/payment', async (req, res, next) => {
    const { paymentMethodId, amount } = req.body
    const token = req.cookies.accessToken;
    const user = await getUser(token)

    if (!user) {
        const error = new Error("User not found .");
        error.status = 404
        return next(error);
    }

    const userId = user._id

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
            return res.status(200).send({
                requiresAction: true,
                paymentIntentClientSecret: paymentIntent.client_secret,
            });
        }

        if (paymentIntent.status === "requires_payment_method") {
            const error = new Error("Payment failed. Authentication or payment method issue.");
            error.status = 402; // Payment required
            return next(error);
        }

        await PaymentModel.create({ userId, amount, paymentIntentId: paymentIntent.id, paymentStatus: "succeeded" });



        const cart = await getCart(user.cartId);
        cart.books = [];
        cart.save()


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

    const cart = await getCart(user.cartId);

    if (!cart.books.includes(bookId)) {
        cart.books.push(bookId);
    }

    await cart.save()
    await user.save();

    res.status(200).json({ message: 'Book added!' });


})

router.get("/items", async (req, res, next) => {

    const token = req.cookies.accessToken;
    const userRef = await getUser(token)

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


    const user = await userRef.populate('cartId');


    const cartRefId = user.cartId;

    const cachedCart = await redis.get(`cart:${cartRefId}`)

    if (cachedCart) {

        return res.status(200).json(JSON.parse(cachedCart))

    } else {
        const cart = await Cart.findById(cartRefId).populate('books');

        redis.setex(`cart:${cartRefId}`, 3600, JSON.stringify(cart.books));


        res.status(200).json(cart.books)

    }


})

router.delete("/remove/:bookId", async (req, res, next) => {
    const token = req.cookies.accessToken;
    const user = await getUser(token, res);
    const { bookId } = req.params

    const cart = await getCart(user.cartId)


    const index = cart.books.indexOf(bookId);

    if (index !== -1) {
        cart.books.splice(index, 1);
        await cart.save();
    }

    res.status(200).send({ message: "Book removed from cart" });
})

module.exports = router;