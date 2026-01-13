const express = require('express');
const router = express.Router();

const AirplaneRoutes = require('./airplane-routes');


router.use('/airplanes', AirplaneRoutes);


module.exports = router;