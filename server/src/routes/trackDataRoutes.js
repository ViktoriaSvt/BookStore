const express = require("express");
const { getTrackingData, trackSlowQuery } = require("../services/trackingService");
const { trackPerformance } = require("../middleware/tracker");


const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const paymentQueryWithDelay = async () => {
    const start = performance.now();
    await simulateDelay(300); 
    const duration = performance.now() - start;
    await trackSlowQuery('paymentProcessing', duration, { simulated: true });
};

const router = express.Router();

router.get('/state', async ( res ) => {
    const data = await getTrackingData();
    res.json(data);
});

router.get("/test-error",  ( next ) => {
    const error = new Error("Simulated error!");
    error.status = 500; 
    next(error);
  });

  router.get("/test-slow-request",trackPerformance('fetchCart'), async ( next ) => {
    await  paymentQueryWithDelay()
    const error = new Error("Simulated error!");
    error.status = 500; 
    next(error);
  });

  



module.exports = router;