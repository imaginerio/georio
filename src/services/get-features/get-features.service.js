const { omit } = require('underscore');
const { Layer } = require('@models/');

/**
 * GetFeatures Service
 *
 */
const getFeaturesService = (layerId, user) => Layer.findByPk(layerId)
  .then((layer) => {
    if (layer) {
      return layer.getGeo(user).then(async (features) => {
        const geojson = { type: 'FeatureCollection' };
        geojson.features = features.map((f) => {
          const properties = omit(f.dataValues, 'id', 'geom');
          const geometry = f.geom;
          const { id } = f;
          return {
            type: 'Feature',
            id,
            properties,
            geometry
          };
        });
        return geojson;
      });
    }
    return Promise.reject(new Error('Layer not found'));
  });

module.exports = getFeaturesService;
