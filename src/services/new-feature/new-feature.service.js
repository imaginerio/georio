const {
  sequelize,
  Type,
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
const newFeatureService = (body) => {
  const {
    geometry,
    type
  } = body;

  const dataType = body.dataType ? body.dataType : 'geojson';
  const feature = geoms[geometry];
  const geoFunc = dataType ? types[dataType] : types.geojson;

  if (!body.data || !body.data.geometry) return Promise.reject(new Error('Missing geometry'));
  let geom = body.data.geometry;
  if (dataType === 'geojson') {
    geom.crs = { type: 'name', properties: { name: 'EPSG:4326' } };
    geom = JSON.stringify(geom);
  }

  const params = body.data.properties;
  if (!params.firstyear || !params.lastyear) return Promise.reject(new Error('Missing year attributes'));

  params.id = body.data.id;
  params.geom = sequelize.fn('ST_Multi', geoFunc(geom));
  params.geom_merc = sequelize.fn('ST_Transform', sequelize.fn('ST_Multi', geoFunc(geom)), 3857);

  return Type.findByPk(type)
    .then((typeId) => {
      if (!typeId) return Promise.reject(new Error('Type not found'));
      return feature.create(params).then(feat => feat.setType(type));
    }).catch(e => Promise.reject(e));
};

module.exports = newFeatureService;
