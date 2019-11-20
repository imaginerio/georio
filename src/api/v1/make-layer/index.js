const express = require('express');
const validate = require('express-validation');
const controller = require('./make-layer.controller');
const validator = require('./make-layer.validator');

const router = express.Router();

/**
 * @api {post} api/v1/makeLayer makeLayer
 * @apiDescription Create a layer with a given name and geometry
 * @apiVersion 1.0.0
 * @apiName makeLayer
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
  .post(validate(validator.joiSchema), controller.makeLayer);

module.exports = router;
