
const redis = require('../config/redis');

const LOCK_KEY = 'sync:lock:carts';
const LOCK_EXPIRATION = 10 * 1000; 

const acquireLock = async () => {
    console.log('aquiring lock');

    try {
        const result = await redis.set(LOCK_KEY, 'LOCKED', 'PX', LOCK_EXPIRATION, 'NX');
        return result === 'OK';
    } catch (error) {
        console.error('Error acquiring lock:', error);
        return false;
    }
};

const releaseLock = async () => {

    console.log('releasing lock');

    try {
        await redis.del(LOCK_KEY);
    } catch (error) {
        console.error('Error releasing lock:', error);
    }
};



module.exports = { acquireLock, releaseLock };