const newLayer = require('@services/new-layer');
const newType = require('@services/new-type');
const {
  sequelize,
  Point,
  Line,
  Polygon
} = require('@models');

const geoms = {
  point: Point,
  line: Line,
  polygon: Polygon
};
const types = {
  geojson: geom => sequelize.fn('ST_GeomFromGeoJSON', geom),
  wkt: geom => sequelize.fn('ST_GeomFromText', geom, 4326)
};

/**
 * NewFeature Service
 *
 */
const newFeatureService = (primitive, dataType, body) => {
  const feature = geoms[primitive];
  const geoFunc = types[dataType];
  const { geom } = body;
  const params = body;
  params.geom = sequelize.fn('ST_Multi', geoFunc(geom));
  return newLayer(params.layer)
    .then(layer => newType(layer, params.type)
      .then(type => feature.create(params)
        .then(feat => feat.setType(type))));
};

module.exports = newFeatureService;
