const express = require('express');
const validate = require('express-validation');
const controller = require('./tile-json.controller');
const validator = require('./tile-json.validator');

const router = express.Router();

/**
 * @api {get} api/v1/tileJSON tileJSON
 * @apiDescription Returns TileJSON describing vector tiles
 * @apiVersion 1.0.0
 * @apiName tileJSON
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
router.route('/:layer?')
  .get(validate(validator.joiSchema), controller.tileJSON);

module.exports = router;
