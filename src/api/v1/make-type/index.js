const express = require('express');
const validate = require('express-validation');
const controller = require('./make-type.controller');
const validator = require('./make-type.validator');

const router = express.Router();

/**
 * @api {post} api/v1/make/type/:layer makeType
 * @apiDescription Create a feature type for a given layer and returns new type UUID
 * @apiVersion 1.0.0
 * @apiName makeType
 * @apiPermission public
 * @apiGroup MAKE
 *
 * @apiParam  (URL) {String} layer  UUID for parent layer
 * @apiParam  (Body)  {String}  title Title for type
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Type UUID
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/:layer')
  .post(validate(validator.joiSchema), controller.makeType);

module.exports = router;
