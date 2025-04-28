const { trackSlowQuery } = require("../services/trackingService");
const { performance } = require('perf_hooks');
const TRACKING_CONFIG = require('../config/tresholdConfig');


const trackPerformance = (operationName) => async (req, res, next) => {
    const start = performance.now();

    res.on('finish', async () => {
        const duration = performance.now() - start;
        const threshold = TRACKING_CONFIG[operationName]?.threshold || 100

        if (duration > threshold) {
            await trackSlowQuery(operationName, duration);
        }
    })
    next();
};

module.exports = { trackPerformance }