const httpStatus = require('http-status');
const { Type } = require('@models/');

/**
 * type
 * @public
 */

const create = async (id, layer, data) => Type.newType(layer, data);

const paths = { create };

exports.type = async (req, res, next) => paths[req.params.action](req.body.type, req.body.layer, req.body.data)
  .then((result) => {
    res.status(httpStatus.OK);
    return res.json({
      responseCode: httpStatus.OK,
      responseMessage: 'OK',
      response: result
    });
  }).catch((e) => {
    console.log(e);
    console.log(req.body);
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    return res.json({
      responseCode: httpStatus.INTERNAL_SERVER_ERROR,
      responseMessage: 'ERROR',
      response: e
    });
  });
