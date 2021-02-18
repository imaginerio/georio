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
const newFeatureService = (body, user) => {
  const dataType = body.dataType ? body.dataType : 'geojson';
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
  params.approved = false;
  params.geom = sequelize.fn('ST_Multi', geoFunc(geom));
  params.geom_merc = sequelize.fn('ST_Transform', sequelize.fn('ST_Multi', geoFunc(geom)), 3857);

  if (user) params.edited = user.id;

  let { type } = body;
  if (!type) ({ type } = params);

  return Type.findByPk(type)
    .then((typeId) => {
      if (!typeId) return Promise.reject(new Error('Type not found'));
      return typeId.getGeom().then((typeGeom) => {
        const feature = geoms[typeGeom];
        return feature.create(params)
          .then(feat => feat.setType(type)
            .then(() => typeId.getLayer())
            .then((layer) => {
              layer.changed('updatedAt', true);
              return layer.save();
            }).then(() => feat));
      });
    }).catch(e => Promise.reject(e));
};

module.exports = newFeatureService;
