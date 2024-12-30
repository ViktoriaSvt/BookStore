const express = require('express');
const { configExpress } = require('./config/configExpress');
const { configDatabase } = require('./config/configDatabase');
const bookRouter = require('./routes/bookDataRoutes');
const userRouter = require('./routes/userAuthRoutes');
const cartRouter = require('./routes/cartRoutes')
const cookieParser = require('cookie-parser');



const PORT = process.env.PORT || 3000;

async function start() {
    const app = express();

    await configDatabase();
    configExpress(app)

    app.use(cookieParser())
    app.use("/user", userRouter)
    app.use("/catalog", bookRouter)
    app.use("/cart", cartRouter)
   

    app.listen(PORT, () => {
        console.log(`Application running on port ${PORT}`)
    });
}

start();




