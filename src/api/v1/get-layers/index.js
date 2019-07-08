const express = require('express');
const validate = require('express-validation');
const controller = require('./get-layers.controller');
const validator = require('./get-layers.validator');

const router = express.Router();

/**
 * @api {get} api/v1/getLayers getLayers
 * @apiDescription Returns JSON with layers and types
 * @apiVersion 1.0.0
 * @apiName getLayers
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
  .get(validate(validator.joiSchema), controller.getLayers);

module.exports = router;
