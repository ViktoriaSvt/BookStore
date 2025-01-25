
const { Cart } = require('../models/Cart');
const redis = require('../config/redis');
;

let updatedCarts = new Set();

const BATCH_INTERVAL = 30 * 1000; 
const LOCK_KEY = 'sync:lock:carts'; 
const LOCK_EXPIRATION = 10 * 1000; 

const acquireLock = async () => {
    const result = await redis.set(LOCK_KEY, 'LOCKED', 'NX', 'PX', LOCK_EXPIRATION);
    return result === 'OK';
};

const releaseLock = async () => {
    await redis.del(LOCK_KEY);
};

 const syncCartsBatch = async () => {
    
    if (!redis.connected) {
        console.log('Redis is not connected. Skipping batch synchronization.');
        return;
    }

    const lockAcquired = await acquireLock();
    if (!lockAcquired) {
        console.log('Batch synchronization skipped - lock not acquired.');
        return;
    }
   
    for (let cartId of updatedCarts) {
        const cart = await Cart.findById(cartId);
        
        
        const cartKey = `cart:${cartId}`;
        const cachedCart = await redis.get(cartKey);

        if (!cachedCart || JSON.stringify(cart.books) !== cachedCart) {
            await redis.setex(cartKey, 3600, JSON.stringify(cart.books));
            
        }
    }
    

    updatedCarts.clear();
    await releaseLock();
};

setInterval(syncCartsBatch, BATCH_INTERVAL);

module.exports = { syncCartsBatch, updatedCarts }
