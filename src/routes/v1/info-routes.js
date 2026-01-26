const express = require('express');
const router = express.Router();
const { InfoController } = require('../../controllers');

router.get('/', InfoController.info);

module.exports = router;