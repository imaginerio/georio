const express = require('express');

const router = express.Router();
const tilesRoute = require('./tiles');
const tileJSONRoute = require('./tile-json');
const layerRoute = require('./layer');
const getStyleRoute = require('./get-style');
const getLayersRoute = require('./get-layers');
const getTimelineRoute = require('./get-timeline');
const getLegendRoute = require('./get-legend');
const searchRoute = require('./search');
const typeRoute = require('./type');
const featureRoute = require('./feature');
const probeRoute = require('./probe');

router.use('/tiles', tilesRoute);
router.use('/TileJSON', tileJSONRoute);
router.use('/layer', layerRoute);
router.use('/getStyle', getStyleRoute);
router.use('/get/layers', getLayersRoute);
router.use('/getTimeline', getTimelineRoute);
router.use('/getLegend', getLegendRoute);
router.use('/search', searchRoute);
router.use('/type', typeRoute);
router.use('/feature', featureRoute);
router.use('/probe', probeRoute);


module.exports = router;
