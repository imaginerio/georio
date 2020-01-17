const express = require('express');
const validate = require('express-validation');
const controller = require('./update-feature.controller');
const validator = require('./update-feature.validator');

const router = express.Router();

/**
 * @api {post} api/v1/update/feature/:layer/:id updateFeature
 * @apiDescription Update a feature properties or geography from a given feature ID by including one or more properties to update in the body
 * @apiVersion 1.0.0
 * @apiName updateFeature
 * @apiPermission public
 * @apiGroup UPDATE
 *
 * @apiParam  (URL) {String}  layer Layer ID for the feature being updated
 * @apiParam  (URL) {String}  id Feature ID for the feature being updated
 * @apiParam  (body)  {String} [name]  Property to update
 * @apiParam  (body)  {Number} [firstyear]  Property to update
 * @apiParam  (body)  {Number} [lastyear]  Property to update
 * @apiParam  (body)  {String} [type]  Property to update
 * @apiParam  (body)  {String} [tags]  Property to update
 * @apiParam  (body)  {Object} [geom]  Property to update
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/:layer/:id')
  .post(validate(validator.joiSchema), controller.updateFeature);

module.exports = router;
