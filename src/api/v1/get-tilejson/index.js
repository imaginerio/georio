const express = require('express');
const validate = require('express-validation');
const controller = require('./get-tilejson.controller');
const validator = require('./get-tilejson.validator');

const router = express.Router();

/**
 * @api {get} api/v1/get/tilejson getTileJSON
 * @apiDescription Returns TileJSON describing vector tiles
 * @apiVersion 1.0.0
 * @apiName tileJSON
 * @apiPermission public
 * @apiGroup GET
 *
 * @apiParam  (URL) {String}  [layer] Optional layer UUID returns TileJSON only for given layer
 * @apiParam  (Query String) {Number} [start=0]  First year for legend
 * @apiParam  (Query String) {Number} [end=8888]  Last year for legend
 *
 * @apiSuccess {Object} TileJSON  TileJSON 3.0.0 object
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/:layer?')
  .get(validate(validator.joiSchema), controller.tileJSON);

module.exports = router;
