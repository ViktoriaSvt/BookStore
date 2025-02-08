const { acquireLock, releaseLock } = require('./redisLocks');

let updatedCarts = new Set();

const syncCartsBatch = async () => {
    console.log('interval on');

    const lockAcquired = await acquireLock();
    if (!lockAcquired) {
        console.log('Synchronization skipped - lock not acquired.');
        return;
    }

    try {
        for (let cartId of updatedCarts) {
            const cart = await Cart.findById(cartId);
            const cartKey = `cart:${cartId}`;
            const cachedCart = await redis.get(cartKey);

            if (cachedCart && JSON.stringify(cart.books) !== cachedCart) {
                const updatedBooks = JSON.parse(cachedCart);
                await Cart.findByIdAndUpdate(cartId, { books: updatedBooks });
            }
        }
    } catch (error) {
        console.error('Error during batch synchronization:', error);
    } finally {
        updatedCarts.clear();
        await releaseLock();
    }
};


module.exports = { syncCartsBatch, updatedCarts };