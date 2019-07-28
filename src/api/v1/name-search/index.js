const express = require('express');
const validate = require('express-validation');
const controller = require('./name-search.controller');
const validator = require('./name-search.validator');

const router = express.Router();

/**
 * @api {get} api/v1/nameSearch nameSearch
 * @apiDescription Search by name across all base features
 * @apiVersion 1.0.0
 * @apiName nameSearch
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
router.route('/:string')
  .get(validate(validator.joiSchema), controller.nameSearch);

module.exports = router;
