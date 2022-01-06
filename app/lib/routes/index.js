const express = require('express');
const markersRouter = require('./markers');
const tripsRouter = require('./trips');

const router = express.Router();
router.use('/markers', markersRouter);
router.use('/trips', tripsRouter);

module.exports = router;
