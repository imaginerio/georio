const express = require('express');
const validate = require('express-validation');
const controller = require('./layer.controller');
const validator = require('./layer.validator');

const router = express.Router();

/**
 * @api {get} api/v1/getExtent getExtent
 * @apiDescription Get extent of a given feature type or layer for a given year
 * @apiVersion 1.0.0
 * @apiName getExtent
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
router.route('/:output/:name')
  .get(validate(validator.joiSchema), controller.layer);

module.exports = router;
