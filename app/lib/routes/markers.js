const express = require('express');
const GeoService = require('../services/geo-service');
const logger = require('../services/logger-service');
const router = express.Router();

router.post('/fetchLocations', async (req, res) => {
    logger.info('Retrieving markers based on input');
    try {
        const geoService = new GeoService();
        const maxRadiusKm = req.body.radius;
        const maxScootersCount = req.body.maxCount;
        const currentLatitude = req.body.latitude;
        const currentLongitude = req.body.longitude;
        const incidentResponse = await geoService.getAll(currentLatitude, currentLongitude, maxRadiusKm, maxScootersCount);
        res.json(incidentResponse);
    } catch (error) {
        logger.error('Error while retrieving the markers' + error.message)
        res.status(500).send(error.stack || error.message);
    }
});

module.exports = router;
