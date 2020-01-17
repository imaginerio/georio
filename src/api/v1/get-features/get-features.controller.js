const httpStatus = require('http-status');
const _ = require('underscore');
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
        geojson.features = features.map((f) => {
          const properties = _.omit(f.dataValues, 'id', 'geom');
          const geometry = f.geom;
          const { id } = f;
          return {
            type: 'Feature',
            id,
            properties,
            geometry
          };
        });
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
