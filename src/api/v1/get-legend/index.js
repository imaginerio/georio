const express = require('express');
const validate = require('express-validation');
const controller = require('./get-legend.controller');
const validator = require('./get-legend.validator');

const router = express.Router();

/**
 * @api {get} api/v1/getLegend getLegend
 * @apiDescription Returns layer and type hierarchy for all features for a given year
 * @apiVersion 1.0.0
 * @apiName getLegend
 * @apiPermission public
 *
 * @apiParam  {String} [param]  Put some parameter schema here
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
