const express = require('express');

const router = express.Router();
const tilesRoute = require('./tiles');
const tileJSONRoute = require('./get-tilejson');
const getStyleRoute = require('./get-style');
const getLayersRoute = require('./get-layers');
const getTimelineRoute = require('./get-timeline');
const getLegendRoute = require('./get-legend');
const searchRoute = require('./search');
const probeRoute = require('./probe');
const makeLayerRoute = require('./make-layer');
const makeTypeRoute = require('./make-type');
const getVisualRoute = require('./get-visual');
const featureRoute = require('./feature');
const changesetRoute = require('./changeset');

router.use('/tiles', tilesRoute);
router.use('/get/tilejson', tileJSONRoute);
router.use('/get/style', getStyleRoute);
router.use('/get/layers', getLayersRoute);
router.use('/get/timeline', getTimelineRoute);
router.use('/get/legend', getLegendRoute);
router.use('/search', searchRoute);
router.use('/make/feature', featureRoute);
router.use('/probe', probeRoute);
router.use('/make/layer', makeLayerRoute);
router.use('/make/type', makeTypeRoute);
router.use('/get/visual', getVisualRoute);
router.use('/feature', featureRoute);
router.use('/changeset', changesetRoute);


module.exports = router;
