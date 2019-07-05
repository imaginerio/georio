const express = require('express');

const router = express.Router();
const createFeatureRoute = require('./create-feature');
const tilesRoute = require('./tiles');
const tileJSONRoute = require('./tile-json');
const layerRoute = require('./layer');


router.use('/create-feature', createFeatureRoute);
router.use('/tiles', tilesRoute);
router.use('/TileJSON', tileJSONRoute);
router.use('/layer', layerRoute);


module.exports = router;
