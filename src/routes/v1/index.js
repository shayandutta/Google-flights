const express = require('express');
const router = express.Router();

const AirplaneRoutes = require('./airplane-routes');
const CityRoutes = require('./city-routes');


router.use('/airplanes', AirplaneRoutes);
router.use('/cities', CityRoutes);


module.exports = router;