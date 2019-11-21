const express = require('express');
const validate = require('express-validation');
const controller = require('./make-layer.controller');
const validator = require('./make-layer.validator');

const router = express.Router();

/**
 * @api {post} api/v1/make/layer makeLayer
 * @apiDescription Create a layer with a given name and geometry and return the UUID for the new layer
 * @apiVersion 1.0.0
 * @apiName makeLayer
 * @apiPermission public
 * @apiGroup MAKE
 *
 * @apiParam  {String="point","line","polygon"} geometry  Geometry type for layer
 * @apiParam  {String}  title Layer title
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Layer UUID
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/')
  .post(validate(validator.joiSchema), controller.makeLayer);

module.exports = router;
