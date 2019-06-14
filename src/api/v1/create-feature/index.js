const express = require('express');
const validate = require('express-validation');
const controller = require('./create-feature.controller');
const validator = require('./create-feature.validator');

const router = express.Router();

/**
 * @api {post} api/v1/createFeature createFeature
 * @apiDescription Create a new point / line / polygon feature
 * @apiVersion 1.0.0
 * @apiName createFeature
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
router.route('/:geom/:type/')
  .post(validate(validator.joiSchema), controller.createFeature);

module.exports = router;
