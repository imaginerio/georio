const express = require('express');
const validate = require('express-validation');
const controller = require('./get-timeline.controller');
const validator = require('./get-timeline.validator');

const router = express.Router();

/**
 * @api {get} api/v1/getTimeline getTimeline
 * @apiDescription Returns JSON with available timeline dates and recommended tile ranges
 * @apiVersion 1.0.0
 * @apiName getTimeline
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
  .get(validate(validator.joiSchema), controller.getTimeline);

module.exports = router;
