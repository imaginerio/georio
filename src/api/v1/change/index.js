const express = require('express');
const controller = require('./change.controller');

const router = express.Router();

/**
 * @api {get} api/v1/change change
 * @apiDescription Convenience read method for accessing single change
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
router.route('/:id')
  .get(controller.change);

module.exports = router;
