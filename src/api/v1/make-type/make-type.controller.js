const httpStatus = require('http-status');
const { Type, Layer } = require('@models/');

/**
 * makeType
 * @public
 */
exports.makeType = async (req, res, next) => Layer.findByPk(req.params.layer)
  .then((layer) => {
    if (layer) {
      return Type.newType(req.params.layer, { title: req.body.title })
        .then((type) => {
          res.status(httpStatus.OK);
          return res.json({
            responseCode: httpStatus.OK,
            responseMessage: 'OK',
            response: type
          });
        });
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    return res.json({
      responseCode: httpStatus.INTERNAL_SERVER_ERROR,
      responseMessage: 'Layer not found'
    });
  });
