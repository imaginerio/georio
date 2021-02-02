const express = require('express');
const validate = require('express-validation');
const controller = require('./change.controller');
const validator = require('./change.validator');

const router = express.Router();

/**
 * @api {post} api/v1/change change
 * @apiDescription CRUD methods for working with changes
 * @apiVersion 1.0.0
 * @apiName change
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
router.route('/:id?')
  .post(validate(validator.joiSchema), controller.update)
  .delete(controller.delete)
  .get(controller.read);

module.exports = router;
