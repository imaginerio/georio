const express = require('express');
const validate = require('express-validation');
const controller = require('./feature.controller');
const validator = require('./feature.validator');

const router = express.Router();

/**
 * @api {post} api/v1/feature feature
 * @apiDescription CRUD methods for working with features
 * @apiVersion 1.0.0
 * @apiName feature
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
  .get(controller.read)
  .post(validate(validator.joiSchema), controller.create)
  .patch(validate(validator.joiSchema), controller.update)
  .delete(controller.delete);

module.exports = router;
