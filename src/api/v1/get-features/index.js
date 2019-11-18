const express = require('express');
const validate = require('express-validation');
const controller = require('./get-features.controller');
const validator = require('./get-features.validator');

const router = express.Router();

/**
 * @api {get} api/v1/get/features/:layer getFeatures
 * @apiDescription Get features as GeoJSON for a given layer
 * @apiVersion 1.0.0
 * @apiName getFeatures
 * @apiPermission public
 * @apiGroup GET
 *
 * @apiParam  {String} layer  Layer ID for features
 *
 * @apiSuccess {Object} responseCode     GeoJSON representation of all the features in the layer
 */
router.route('/:layer')
  .get(validate(validator.joiSchema), controller.getFeatures);

module.exports = router;
