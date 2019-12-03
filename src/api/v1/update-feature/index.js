const express = require('express');
const validate = require('express-validation');
const controller = require('./update-feature.controller');
const validator = require('./update-feature.validator');

const router = express.Router();

/**
 * @api {post} api/v1/update/feature updateFeature
 * @apiDescription Update a feature properties or geography from a given feature ID
 * @apiVersion 1.0.0
 * @apiName updateFeature
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
router.route('/:layer/:id')
  .post(validate(validator.joiSchema), controller.updateFeature);

module.exports = router;
