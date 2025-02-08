
const Redis = require('ioredis');
const redisEmitter = require('./eventEmitter');

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: 20,
  retryStrategy: () => null
});

let errors = false


redis.on('error', (err) => {
  if (err.message.includes('ECONNREFUSED')) {
    console.error('Redis is down. Using fallback mechanism.');
  } else {
    console.error('Redis error:', err);
  }

  errors = true
});

redis.on('connect', async () => {

  errors = false
  redisEmitter.emit('redisConnected');

});

redis.on('end', async () => {

  if (errors) return;

  redisEmitter.emit('redisDisconnected');
});


module.exports = redis;
