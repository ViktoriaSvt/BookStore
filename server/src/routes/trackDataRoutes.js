const express = require("express");
const { getTrackingData } = require("../services/trackingService");


const router = express.Router();

router.get('/state', async (req, res) => {
    const data = await getTrackingData();
    res.json(data);
});

router.get("/test-error", (req, res, next ) => {
    const error = new Error("Simulated error!");
    error.status = 543; 
    next(error);
  });



module.exports = router;