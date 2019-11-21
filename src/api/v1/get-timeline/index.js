const express = require('express');
const validate = require('express-validation');
const controller = require('./get-timeline.controller');
const validator = require('./get-timeline.validator');

const router = express.Router();

/**
 * @api {get} api/v1/get/timeline getTimeline
 * @apiDescription Returns JSON with available timeline dates and recommended tile ranges
 * @apiVersion 1.0.0
 * @apiName getTimeline
 * @apiPermission public
 * @apiGroup GET
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "responseCode":200,
 *        "responseMessage":"OK",
 *        "response":[[1836,1941],[1942,1948],[1949,1950],[1951,1957],[1958,1961],[1962,1965],[1966,1969],[1970,1973]]
 *      }
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/')
  .get(validate(validator.joiSchema), controller.getTimeline);

module.exports = router;
