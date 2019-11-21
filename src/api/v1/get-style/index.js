const express = require('express');
const validate = require('express-validation');
const controller = require('./get-style.controller');
const validator = require('./get-style.validator');

const router = express.Router();

/**
 * @api {get} api/v1/get/style getStyle
 * @apiDescription Returns Mapbox JSON styles
 * @apiVersion 1.0.0
 * @apiName getStyle
 * @apiPermission public
 * @apiGroup GET
 *
 * @apiParam  (Query String) {Number} [start=0]  First year for legend
 * @apiParam  (Query String) {Number} [end=8888]  Last year for legend
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/')
  .get(validate(validator.joiSchema), controller.getStyle);

module.exports = router;
