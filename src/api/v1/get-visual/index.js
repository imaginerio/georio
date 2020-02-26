const express = require('express');
const validate = require('express-validation');
const controller = require('./get-visual.controller');
const validator = require('./get-visual.validator');

const router = express.Router();

/**
 * @api {get} api/v1/getVisual getVisual
 * @apiDescription Get visual layers for a given year
 * @apiVersion 1.0.0
 * @apiName getVisual
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
  .get(validate(validator.joiSchema), controller.getVisual);

module.exports = router;
