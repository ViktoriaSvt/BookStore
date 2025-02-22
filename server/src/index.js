const express = require('express');
const { configExpress } = require('./config/express');
const { configDatabase } = require('./config/database');
require('./config/eventHandler');
const bookRouter = require('./routes/bookDataRoutes');
const userRouter = require('./routes/userAuthRoutes');
const faqRouter = require('./routes/faqRoutes');
const stateTrackerRouter = require('./routes/trackDataRoutes');
const cartRouter = require('./routes/cartRoutes')
const languageRouter = require('./routes/translationRoutes')
const cookieParser = require('cookie-parser');
const { trackFailedRequest } = require('./services/trackingService');
const { validateAuth }  = require('./middleware/authValidator');
const { generateToken } = require('./util/JwtGenerator');





const PORT = process.env.PORT || 3000;

async function start() {
    const app = express();

    await configDatabase();
    configExpress(app)


    app.use(cookieParser())
    app.use(validateAuth)

    // const ownerIds = [
    //   "75736572-4964-3130-0000-000000000000",
    //   "75736572-4964-3130-3000-000000000000",
    //   "75736572-4964-3131-0000-000000000000",
    // ];
    
    // ownerIds.forEach(ownerId => {
    //   const token = generateTokenNOW(ownerId);
    //   console.log(`${token}`);
    // });
     
    app.use("/user", userRouter)
    app.use("/translations", languageRouter)
    app.use("/faq", faqRouter)
    app.use("/catalog", bookRouter)
    app.use("/cart", cartRouter)
    app.use("/stateTracker", stateTrackerRouter)



    app.use((err, req, res, next) => {
      const errorType = err.status || 'UnknownError';

      if (errorType >= 500) {
          trackFailedRequest(errorType);
      }
      next(err);
    });

    
    
    app.use((err, req, res, next) => {
      console.error('An error occurred:', err); 
      res.status(err.status || 500).json({ message: 'Internal Server Error' });
  });
    
   

    app.listen(PORT, () => {
        console.log(`Application running on port ${PORT}`)
    });
}

start();




