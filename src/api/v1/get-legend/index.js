const express = require('express');
const validate = require('express-validation');
const controller = require('./get-legend.controller');
const validator = require('./get-legend.validator');

const router = express.Router();

/**
 * @api {get} api/v1/get/legend getLegend
 * @apiDescription Returns layer and type hierarchy for all features for a given year range with a swatch color for a legend
 * @apiVersion 1.0.0
 * @apiName getLegend
 * @apiPermission public
 * @apiGroup GET
 *
 * @apiParam  (Query String) {Number} [start=0]  First year for legend
 * @apiParam  (Query String) {Number} [end=8888]  Last year for legend
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/')
  .get(validate(validator.joiSchema), controller.getLegend);

module.exports = router;
