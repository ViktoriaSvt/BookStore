const redis = require('../config/redis');
const { Cart } = require('../models/Cart');
const { acquireLock, releaseLock } = require('./redisLocks');

const syncRedisBatch = async () => {

    console.log('retrieving state from database(latest) before redis went down');
    

    try {
        const allCarts = await Cart.find();

        await Promise.all(allCarts.map(async (cart) => {
            const cartKey = `cart:${cart._id}`;
            const cachedCart = await redis.get(cartKey);
            const cartBooksJSON = JSON.stringify(cart.books); 
            

            if (!cachedCart || cartBooksJSON !== cachedCart) {
                await redis.setex(cartKey, 3600, cartBooksJSON);
            }

        }));
    } catch (error) {
        console.error('Error during Redis batch synchronization:', error);
    } 

};

module.exports = { syncRedisBatch };
