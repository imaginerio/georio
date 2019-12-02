const express = require('express');
const validate = require('express-validation');
const controller = require('./make-feature.controller');
const validator = require('./make-feature.validator');

const router = express.Router();

/**
 * @api {post} api/v1/make/feature makeFeature
 * @apiDescription Create / modify / delete feature
 * @apiVersion 1.0.0
 * @apiName make-feature
 * @apiPermission public
 * @apiGroup MAKE
 *
 * @apiParam  {String} type Feature type UUID
 * @apiParam  {String} [dataType=geojson] File type for geographic data (geojson / wkt)
 * @apiParam  {Object} data Object containing geographic data and properties
 * @apiParam  {Object} data[properties] Feature attributes. Must include 'firstyear' and 'lastyear' and can include 'name' and 'tags'
 * @apiParam  {Object} data[geometry] GeoJSON or WKT object containing geographic data
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/')
  .post(validate(validator.joiSchema), controller.feature);

module.exports = router;
