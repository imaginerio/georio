const express = require('express');
const validate = require('express-validation');
const { authenticatedMiddleware } = require('@middlewares/authenticated');
const controller = require('./changeset.controller');
const validator = require('./changeset.validator');

const router = express.Router();

/**
 * @api {post} api/v1/changeset changeset
 * @apiDescription CRUD methods for working with changesets
 * @apiVersion 1.0.0
 * @apiName changeset
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
  .post(validate(validator.joiSchema), authenticatedMiddleware, controller.create);

module.exports = router;
