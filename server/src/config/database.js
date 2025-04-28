const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/bookstore';

async function configDatabase() {
    await mongoose.connect(connectionString);

    console.log('database connected');

}

module.exports = { configDatabase };