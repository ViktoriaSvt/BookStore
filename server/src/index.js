const express = require('express');
const { configExpress } = require('./config/configExpress');
const { configDatabase } = require('./config/configDatabase');
const { getAllBooks } = require('./services/bookService');
const bookRouter = require('./routes/bookData');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');



const PORT = process.env.PORT || 3000;

async function start() {
    const app = express();

    await configDatabase();
    configExpress(app)

    app.use(cookieParser())
    app.use("/account", userRouter)
    app.use("/", bookRouter)
   

    app.listen(PORT, () => {
        console.log(`Application running on port ${PORT}`)
    });
}

start();




