const EventEmitter = require('events');
const { Cart } = require('../models/Cart');
const redis = require('../config/redis');
const cartEvents = new EventEmitter();


let updatedCarts = new Set();

const BATCH_INTERVAL = 30 * 1000;

 const syncCartsBatch = async () => {
   
    for (let cartId of updatedCarts) {
        const cart = await Cart.findById(cartId);
        
        
        const cartKey = `cart:${cartId}`;
        const cachedCart = await redis.get(cartKey);

        if (!cachedCart || JSON.stringify(cart.books) !== cachedCart) {
            await redis.setex(cartKey, 3600, JSON.stringify(cart.books));
            
        }
    }
    

    updatedCarts.clear();
};

setInterval(syncCartsBatch, BATCH_INTERVAL);

module.exports = { syncCartsBatch, updatedCarts }
