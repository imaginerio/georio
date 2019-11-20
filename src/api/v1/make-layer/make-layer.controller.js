const httpStatus = require('http-status');
const { Layer } = require('@models/');

/**
 * makeLayer
 * @public
 */
exports.makeLayer = async (req, res, next) => Layer.newLayer(req.body)
  .then((layer) => {
    res.status(httpStatus.OK);
    return res.json({
      responseCode: httpStatus.OK,
      responseMessage: 'OK',
      response: layer
    });
  });
