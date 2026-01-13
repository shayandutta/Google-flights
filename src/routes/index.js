const express = require('express');
const v1Routes = require('./v1'); //named import from the v1 directory index.js file
const router = express.Router();

router.use('/v1', v1Routes);

module.exports = router;