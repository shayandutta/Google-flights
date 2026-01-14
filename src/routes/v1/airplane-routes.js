const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');
const router = express.Router();


//  /api/v1/airplanes --> POST request
router.post('/', AirplaneMiddlewares.validateCreateRequest,AirplaneController.createAirplane);
router.get('/',AirplaneController.getAirplanes);
router.get('/:id', AirplaneController.getAirplane);
router.delete('/:id', AirplaneController.deleteAirplane);
router.patch('/:id', AirplaneController.updateAirplane);

module.exports = router;