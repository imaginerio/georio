const httpStatus = require('http-status');
const { Layer } = require('@models/');

/**
 * layer
 * @public
 */
const create = async (id, data) => Layer.newLayer(data);

const modify = async (id, data) => Layer.updateLayer(id, data);

const paths = { create, modify };

exports.layer = async (req, res, next) => paths[req.params.action](req.body.layer, req.body.data)
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
