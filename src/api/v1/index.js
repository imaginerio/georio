const express = require('express');

const router = express.Router();
const createFeatureRoute = require('./create-feature');
const tilesRoute = require('./tiles');
const tileJSONRoute = require('./tile-json');
const layerRoute = require('./layer');
const getStyleRoute = require('./get-style');
const getLayersRoute = require('./get-layers');
const getTimelineRoute = require('./get-timeline');
const getLegendRoute = require('./get-legend');


router.use('/create-feature', createFeatureRoute);
router.use('/tiles', tilesRoute);
router.use('/TileJSON', tileJSONRoute);
router.use('/layer', layerRoute);
router.use('/getStyle', getStyleRoute);
router.use('/getLayers', getLayersRoute);
router.use('/getTimeline', getTimelineRoute);
router.use('/getLegend', getLegendRoute);


module.exports = router;
