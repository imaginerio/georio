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
const featureRoute = require('./make-feature');
const probeRoute = require('./probe');
const getFeaturesRoute = require('./get-features');
const makeLayerRoute = require('./make-layer');

router.use('/tiles', tilesRoute);
router.use('/TileJSON', tileJSONRoute);
router.use('/layer', layerRoute);
router.use('/getStyle', getStyleRoute);
router.use('/get/layers', getLayersRoute);
router.use('/getTimeline', getTimelineRoute);
router.use('/getLegend', getLegendRoute);
router.use('/search', searchRoute);
router.use('/type', typeRoute);
router.use('/make/feature', featureRoute);
router.use('/probe', probeRoute);
router.use('/get/features', getFeaturesRoute);
router.use('/make/layer', makeLayerRoute);


module.exports = router;
