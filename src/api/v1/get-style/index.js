const express = require('express');
const validate = require('express-validation');
const controller = require('./get-style.controller');
const validator = require('./get-style.validator');

const router = express.Router();

/**
 * @api {get} api/v1/getStyle getStyle
 * @apiDescription Get Mapbox JSON styles
 * @apiVersion 1.0.0
 * @apiName getStyle
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
  .get(validate(validator.joiSchema), controller.getStyle);

module.exports = router;
