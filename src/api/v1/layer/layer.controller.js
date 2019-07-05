const httpStatus = require('http-status');
const { Layer } = require('@models/');
// const getExtentsService = require('@services/get-extents');
const makeParamsService = require('@services/make-params');

/**
 * getExtent
 * @public
 */

exports.layer = async (req, res, next) => {
  const params = makeParamsService(req);
  return Layer.getLayer(params.name).then((layer) => {
    if (layer) {
      if (params.output === 'extent') {
        return layer.getExtent(params).then((extents) => {
          res.status(httpStatus.OK);
          return res.json({
            responseCode: httpStatus.OK,
            responseMessage: 'OK',
            response: { extents }
          });
        });
      }
      if (params.output === 'geojson') {
        return layer.getGeoJSON(params).then(geojson => res.send(geojson));
      }
    }
    return res.sendStatus(404);
  });
};
