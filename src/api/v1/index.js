const express = require('express');

const router = express.Router();
const createFeatureRoute = require('./create-feature');
const tilesRoute = require('./tiles');
const tileJSONRoute = require('./tile-json');
const layerRoute = require('./layer');
const getStyleRoute = require('./get-style');


router.use('/create-feature', createFeatureRoute);
router.use('/tiles', tilesRoute);
router.use('/TileJSON', tileJSONRoute);
router.use('/layer', layerRoute);
router.use('/getStyle', getStyleRoute);


module.exports = router;
