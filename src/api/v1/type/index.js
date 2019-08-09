const express = require('express');
const validate = require('express-validation');
const controller = require('./type.controller');
const validator = require('./type.validator');

const router = express.Router();

/**
 * @api {post} api/v1/type type
 * @apiDescription Create / modify / delete feature type
 * @apiVersion 1.0.0
 * @apiName type
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
router.route('/:action/')
  .post(validate(validator.joiSchema), controller.type);

module.exports = router;
