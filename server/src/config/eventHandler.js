const redisEmitter = require('../config/eventEmitter');
const { syncRedisBatch } = require('../util/cacheSynch');
const { syncCartsBatch } = require('../util/synchCart');

const BATCH_INTERVAL = 30 * 1000;
let intervalId = null

redisEmitter.on('redisConnected', async () => {
  console.log('Redis connection event triggered.');
     intervalId = setInterval(syncCartsBatch, BATCH_INTERVAL);
  await syncRedisBatch();
});

redisEmitter.on('redisDisconnected', async () => {
  console.log('Redis disconnection event triggered.');


  await syncCartsBatch();
  clearInterval(intervalId)
});
