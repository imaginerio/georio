const { sequelize, Document } = require('@models');

/**
 * NewVisual Service
 *
 */
const newVisualService = (props) => {
  const { properties, geometry, visual } = props;
  geometry.crs = { type: 'name', properties: { name: 'EPSG:4326' } };
  const geom = JSON.stringify(geometry);
  properties.geom = sequelize.fn('ST_GeomFromGeoJSON', geom);
  properties.geom_merc = sequelize.fn(
    'ST_Transform',
    sequelize.fn('ST_GeomFromGeoJSON', geom),
    3857
  );
  if (properties.longitude && properties.latitude) {
    properties.point = sequelize.fn(
      'ST_SetSRID',
      sequelize.fn('ST_MakePoint', properties.longitude, properties.latitude),
      4326
    );
    properties.point_merc = sequelize.fn('ST_Transform', properties.point, 3857);
  }
  properties.VisualId = visual.id;
  return Document.create(properties);
};

module.exports = newVisualService;
