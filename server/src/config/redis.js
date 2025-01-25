
const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: 20,
  retryStrategy: () => null
});


redis.on('error', (err) => {
  if (err.message.includes('ECONNREFUSED')) {
      console.error('Redis is down. Using fallback mechanism.');
      redisAvailable = false; // Mark Redis as unavailable
  } else {
      console.error('Redis error:', err);
  }
});

module.exports = redis;
