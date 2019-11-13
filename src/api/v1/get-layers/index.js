const express = require('express');
const validate = require('express-validation');
const controller = require('./get-layers.controller');
const validator = require('./get-layers.validator');

const router = express.Router();

/**
 * @api {get} api/v1/get/layers get-layers
 * @apiDescription Returns JSON with layers and types
 * @apiVersion 1.0.0
 * @apiName Get Layers
 * @apiPermission public
 * @apiGroup GET
 *
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "responseCode": 200,
 *      "responseMessage": "OK",
 *      "response": [
 *        {
 *          "title": "Hidrography",
 *          "id": "825f1178-054d-429b-97b3-219eb5cfaec0",
 *          "geometry": "line",
 *          "base": true,
 *          "Types": [
 *            {
 *              "id": "bdc9e99e-e589-46c3-8b25-1ea15a80d776",
 *              "title": "Bayou"
 *            },
 *            {
 *              "id": "21201069-77eb-4700-8251-3504fab06058",
 *              "title": "River"
 *            },
 *            {
 *              "id": "555fcd47-8399-4549-a0e6-9092c39cfea6",
 *              "title": "Stream"
 *            }
 *          ]
 *        }
 *      ]
 *    }
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/')
  .get(validate(validator.joiSchema), controller.getLayers);

module.exports = router;
