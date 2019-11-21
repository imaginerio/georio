const express = require('express');
const validate = require('express-validation');
const { tileCacheMiddleware } = require('@middlewares/tile-cache');
const controller = require('./tiles.controller');
const validator = require('./tiles.validator');

const router = express.Router();

/**
 * @api {get} api/v1/tiles tiles
 * @apiDescription Create vector tiles from Z/X/Y request
 * @apiVersion 1.0.0
 * @apiName tiles
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
router.route('/:layer?/:z/:x/:y.pbf')
  .get(validate(validator.joiSchema), tileCacheMiddleware, controller.tiles);

module.exports = router;
