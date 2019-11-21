const express = require('express');
const validate = require('express-validation');
const controller = require('./probe.controller');
const validator = require('./probe.validator');

const router = express.Router();

/**
 * @api {get} api/v1/probe probe
 * @apiDescription Return matching features by location or bounds
 * @apiVersion 1.0.0
 * @apiName probe
 * @apiPermission public
 * @apiGroup MAP
 *
 * @apiParam  {String} [param]  Put some parameter schema here
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/:location')
  .get(validate(validator.joiSchema), controller.probe);

module.exports = router;
