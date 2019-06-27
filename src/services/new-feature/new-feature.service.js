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
  params.geom_merc = sequelize.fn('ST_Transform', sequelize.fn('ST_Multi', geoFunc(geom)), 3857);
  return newLayer(params.layer, params.geometry)
    .then(layer => newType(layer, params.type)
      .then(type => feature.create(params)
        .then(feat => feat.setType(type))))
    .catch((e) => {
      console.log(body);
      console.log(e);
    });
};

module.exports = newFeatureService;
