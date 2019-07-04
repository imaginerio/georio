const express = require('express');

const router = express.Router();
const createFeatureRoute = require('./create-feature');
const tilesRoute = require('./tiles');
const tileJSONRoute = require('./tile-json');
const getExtentRoute = require('./get-extent');


router.use('/create-feature', createFeatureRoute);
router.use('/tiles', tilesRoute);
router.use('/TileJSON', tileJSONRoute);
router.use('/getExtent', getExtentRoute);


module.exports = router;
