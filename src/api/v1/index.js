const express = require('express');

const router = express.Router();
const createFeatureRoute = require('./create-feature');


router.use('/create-feature', createFeatureRoute);


module.exports = router;
