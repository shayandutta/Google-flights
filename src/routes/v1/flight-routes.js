const express = require('express');
const { FlightController } = require('../../controllers');
const { FlightMiddleware } = require('../../middlewares');
const router = express.Router();

router.post("/", FlightMiddleware.validateCreateFlight, FlightController.createFlight);
router.delete("/:id", FlightController.deleteFlight);
router.get("/", FlightController.getAllFlights);

module.exports = router;