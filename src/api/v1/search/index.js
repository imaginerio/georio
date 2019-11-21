const express = require('express');
const validate = require('express-validation');
const controller = require('./search.controller');
const validator = require('./search.validator');

const router = express.Router();

/**
 * @api {get} api/v1/search search
 * @apiDescription Search by name across all base features
 * @apiVersion 1.0.0
 * @apiName search
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
router.route('/:string')
  .get(validate(validator.joiSchema), controller.search);

module.exports = router;
