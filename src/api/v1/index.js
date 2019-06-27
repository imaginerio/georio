const express = require('express');

const router = express.Router();
const createFeatureRoute = require('./create-feature');
const tilesRoute = require('./tiles');


router.use('/create-feature', createFeatureRoute);
router.use('/tiles', tilesRoute);


module.exports = router;
