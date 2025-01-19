const express = require('express');
const { configExpress } = require('./config/express');
const { configDatabase } = require('./config/database');
const bookRouter = require('./routes/bookDataRoutes');
const userRouter = require('./routes/userAuthRoutes');
const faqRouter = require('./routes/faqRoutes');
const cartRouter = require('./routes/cartRoutes')
const languageRouter = require('./routes/translationRoutes')
const cookieParser = require('cookie-parser');



const PORT = process.env.PORT || 3000;

async function start() {
    const app = express();

    await configDatabase();
    configExpress(app)



    app.use(cookieParser())
    app.use("/user", userRouter)
    app.use("/translations", languageRouter)
    app.use("/faq", faqRouter)
    app.use("/catalog", bookRouter)
    app.use("/cart", cartRouter)
    
   

    app.listen(PORT, () => {
        console.log(`Application running on port ${PORT}`)
    });
}

start();




