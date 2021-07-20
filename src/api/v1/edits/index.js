const express = require('express');
const validate = require('express-validation');
const { authenticatedMiddleware } = require('@middlewares/authenticated');
const controller = require('./edits.controller');
const validator = require('./edits.validator');

const router = express.Router();

/**
 * @api {get} api/v1/edits edits
 * @apiDescription Simple method for determining if user has any active edits
 * @apiVersion 1.0.0
 * @apiName edits
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
  .get(validate(validator.joiSchema), authenticatedMiddleware, controller.edits);

module.exports = router;
