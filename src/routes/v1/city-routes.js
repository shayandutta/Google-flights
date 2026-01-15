const express = require('express');
const router = express.Router();
const { CityController } = require('../../controllers');
const { CityMiddleware } = require('../../middlewares');

router.post('/', CityMiddleware.validateCreateCity ,CityController.createCity);

module.exports = router;