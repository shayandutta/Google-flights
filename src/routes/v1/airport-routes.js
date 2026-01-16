const express = require("express");
const router = express.Router();
const { AirportController } = require("../../controllers");
const { AirportMiddleware } = require("../../middlewares");

router.post('/', AirportMiddleware.validateCreateAirport, AirportController.createAirport);
router.get('/', AirportController.getAirports);
router.get('/:id', AirportController.getAirport);
router.delete('/:id', AirportController.deletedAirport);
router.patch('/:id',  AirportMiddleware.validateUpdateAirport, AirportController.updateAirport);

module.exports = router;