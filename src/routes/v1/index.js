const express = require('express');
const router = express.Router();

const AirplaneRoutes = require('./airplane-routes');
const CityRoutes = require('./city-routes');
const AirportRoutes = require('./airport-routes');
const FlightRoutes = require('./flight-routes');
const InfoRoute = require('./info-routes');


router.use('/airplanes', AirplaneRoutes);
router.use('/cities', CityRoutes);
router.use('/airports', AirportRoutes);
router.use('/flights', FlightRoutes)
router.use('/info', InfoRoute);


module.exports = router;