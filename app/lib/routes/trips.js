const express = require('express');
const logger = require('../services/logger-service');
const TripService = require("../services/trip-service");
const router = express.Router();

router.get('/fetchTrips', async (req, res) => {
    logger.info('Retrieving trips based on input');
    try {
        const tripService = new TripService();
        const size = req.query.size ? parseInt(req.query.size) : 0;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        const tripsResponse = await tripService.getAll(size, page <= 0 ? 1 : page);
        res.json(tripsResponse);
    } catch (error) {
        logger.error('Error while retrieving the trips' + error.message)
        res.status(500).send(error.stack || error.message);
    }
});

module.exports = router;
