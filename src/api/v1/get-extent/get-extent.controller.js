const httpStatus = require('http-status');
const { Layer, Type } = require('@models/');
const getExtentsService = require('@services/get-extents');
const makeParamsService = require('@services/make-params');

/**
 * getExtent
 * @public
 */

const sendResponse = async (res, extents) => {
  res.status(httpStatus.OK);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: { extents }
  });
};

exports.getExtent = async (req, res, next) => {
  const params = makeParamsService(req);
  return Layer.getLayer(params.layer).then((layer) => {
    if (layer) {
      if (params.type) {
        return Type.getType(params.type).then((type) => {
          if (type) {
            return getExtentsService(params, layer, type).then(extents => sendResponse(res, extents));
          }
          return res.sendStatus(404);
        });
      }
      return getExtentsService(params, layer).then(extents => sendResponse(res, extents));
    }
    return res.sendStatus(404);
  });
};
