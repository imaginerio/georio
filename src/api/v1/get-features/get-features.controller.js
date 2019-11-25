const httpStatus = require('http-status');
const { Layer } = require('@models/');

/**
 * getFeatures
 * @public
 */
exports.getFeatures = async (req, res, next) => Layer.findByPk(req.params.layer)
  .then((layer) => {
    if (layer) {
      return layer.getGeo().then((features) => {
        const geojson = { type: 'FeatureCollection' };
        geojson.features = features;
        res.status(httpStatus.OK);
        return res.json(geojson);
      });
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    return res.json({
      responseCode: httpStatus.INTERNAL_SERVER_ERROR,
      responseMessage: 'Layer not found'
    });
  });
